import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

export interface ChatMessage {
  message: string;
  session_id?: string;
}

export interface AIResponse {
  success: boolean;
  response: string;
  session_id: string;
  guidelines?: FoodSafetyGuideline[];
}

export interface FoodSafetyGuideline {
  title: string;
  description: string;
  icon: string;
}

export class AIService {
  async handleChat(data: ChatMessage, ipAddress?: string): Promise<AIResponse> {
    try {
      const sessionId = data.session_id || uuidv4();
      const userMessage = data.message;

      const chatData = {
        session_id: sessionId,
        user_message: userMessage,
        timestamp: new Date().toISOString(),
        ip_address: ipAddress,
        chat_type: 'food_donation'
      };

      await supabase.table('chat_interactions').insert(chatData);
      const aiResponse = this.generateAIResponse(userMessage);

      const responseData = {
        session_id: sessionId,
        ai_response: aiResponse,
        timestamp: new Date().toISOString(),
        response_type: 'food_safety_guidance'
      };

      await supabase.table('ai_responses').insert(responseData);

      return {
        success: true,
        response: aiResponse,
        session_id: sessionId,
        guidelines: this.getFoodSafetyGuidelines()
      };
    } catch (error) {
      console.error('Error in AI chat:', error);
      throw new Error('Failed to process chat message');
    }
  }

  private generateAIResponse(userMessage: string): string {
    const messageLower = userMessage.toLowerCase();

    if (messageLower.includes('food safety') || messageLower.includes('safe')) {
      return "I can help you with food safety guidelines! Here are the key points: Food must be within expiry date, prepared food should be donated within 2 hours, keep food at proper temperature, and package food securely. What specific food safety question do you have?";
    }

    if (messageLower.includes('expiry') || messageLower.includes('expire')) {
      return "Food donations must be within their expiry date. For prepared foods, they should be donated within 2 hours of preparation. Please check the expiry date on packaged foods before donating.";
    }

    if (messageLower.includes('temperature') || messageLower.includes('cold') || messageLower.includes('hot')) {
      return "Temperature control is crucial! Keep cold foods below 40°F (4°C) and hot foods above 140°F (60°C). If you're unsure about temperature safety, it's better to be cautious.";
    }

    if (messageLower.includes('packaging') || messageLower.includes('package')) {
      return "Please package food securely to prevent contamination. Use clean containers, seal properly, and label with preparation time if applicable. Original packaging is preferred when possible.";
    }

    if (messageLower.includes('donate') || messageLower.includes('donation')) {
      return "I'm here to help you donate food safely! I can guide you through our food safety guidelines and help you prepare your donation. What type of food are you looking to donate?";
    }

    if (messageLower.includes('hello') || messageLower.includes('hi')) {
      return "Hello! Welcome to FoodShare AI. I'm here to help you donate surplus food safely and efficiently. How can I assist you with your food donation today?";
    }

    return "I'm here to help you with food donations and safety guidelines. You can ask me about food safety, expiry dates, proper packaging, or temperature requirements. How can I assist you?";
  }

  getFoodSafetyGuidelines(): FoodSafetyGuideline[] {
    return [
      {
        title: 'Food must be within expiry date',
        description: 'Check all expiry dates before donating',
        icon: '⚠️'
      },
      {
        title: 'Prepared food should be donated within 2 hours',
        description: 'Freshly prepared food has a 2-hour window for safe donation',
        icon: '⏰'
      },
      {
        title: 'Keep food at proper temperature',
        description: 'Cold foods below 40°F, hot foods above 140°F',
        icon: '🌡️'
      },
      {
        title: 'Package food securely',
        description: 'Use clean containers and proper sealing',
        icon: '📦'
      },
      {
        title: 'Label with preparation time if applicable',
        description: 'Include preparation time for homemade items',
        icon: '🏷️'
      }
    ];
  }

  async submitDonationForm(formData: any): Promise<{ success: boolean; donation_id?: string }> {
    try {
      const donationData = {
        donor_name: formData.donor_name,
        donor_email: formData.donor_email,
        donor_phone: formData.donor_phone,
        food_type: formData.food_type,
        quantity: formData.quantity,
        expiry_date: formData.expiry_date,
        pickup_location: formData.pickup_location,
        preferred_pickup_time: formData.preferred_pickup_time,
        special_instructions: formData.special_instructions,
        submission_time: new Date().toISOString(),
        status: 'pending'
      };

      const result = await supabase.table('food_donations').insert(donationData).select();

      return {
        success: true,
        donation_id: result.data?.[0]?.id
      };
    } catch (error) {
      console.error('Error submitting donation form:', error);
      throw new Error('Failed to submit donation form');
    }
  }
}

export const aiService = new AIService();