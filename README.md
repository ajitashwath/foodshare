# FoodShare: Rescuing Food, Feeding Communities 🍽️

![FoodShare Banner](snpathaks/foodshare/foodshare-f14f1878156e93d9d3c97023ab413bec2b225c8f/public/images/logo.png)

**FoodShare** is a cutting-edge web application developed for the **Walmart Hackathon 2025** to tackle the critical issues of food waste and hunger in India. By leveraging technology, we connect food businesses with surplus food to non-profit organizations, ensuring that perfectly good food reaches those who need it most.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io/)

## 🌟 Our Mission

> In India, nearly **40% of food** goes to waste while **190 million people** go hungry. At FoodShare, we believe this is a solvable problem. Our mission is to create a sustainable network to combat food waste and hunger by rescuing edible surplus food and redistributing it to local hunger relief organizations.

## ✨ Key Features

-   **🤖 AI-Powered Chatbot**: An intelligent assistant to guide users through food safety protocols and donation guidelines, making the process seamless and secure.
-   **🤝 Partnership Platform**: A dedicated portal for NGOs to register, manage food requests, and track their impact, fostering a strong community of partners.
-   **📊 User-Specific Dashboards**: Tailored dashboards for NGOs, Admins, and Cafes to manage their activities, view real-time statistics, and monitor recent activities.
-   **🔄 Donation Matching**: An automated system that intelligently matches food donations with requests from our partner NGOs, ensuring efficient distribution.
-   **🔐 Secure Authentication**: A robust and secure login and registration system for all user types, ensuring data privacy and security.
-   **📈 Impact Tracking**: The platform provides detailed statistics on the amount of food distributed and the number of meals provided, offering transparency and accountability.

## 💻 Technology Stack

This project is built with a modern, scalable, and efficient technology stack:

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Backend & Database**: [Supabase](https://supabase.io/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18.18.0 or later)
-   npm

### Installation

1.  **Clone the repo:**
    ```sh
    git clone [https://github.com/snpathaks/foodshare.git](https://github.com/snpathaks/foodshare.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd foodshare
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Set up your environment variables:**
    Create a `.env` file in the root and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```
5.  **Run the development server:**
    ```sh
    npm run dev
    ```
6.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## 🔑 Usage

The application supports three user roles: **NGO**, **Admin**, and **Cafe**. You can use the following demo credentials to log in and explore the various dashboards and features:

-   **NGO**:
    -   **Username**: `ngo@gmail.com`
    -   **Password**: `ngo123`
-   **Admin**:
    -   **Username**: `admin@gmail.com`
    -   **Password**: `admin123`
-   **Cafe**:
    -   **Username**: `cafe@gmail.com`
    -   **Password**: `cafe123`

## 🌐 API Endpoints

The application exposes a set of well-defined RESTful API endpoints under the `/api/v1/` prefix:

-   `/ai/chat`: Handles all AI chat interactions.
-   `/ai/donation-form`: Submits the food donation form.
-   `/ai/guidelines`: Fetches the latest food safety guidelines.
-   `/donate`: Initiates the food donation process.
-   `/health`: Checks the health and status of the database connection.
-   `/partner/login`: Processes partner login attempts.
-   `/partnership/food-requests`: Manages food requests from partner NGOs.
-   `/partnership/match-donations`: Intelligently matches donations with requests.
-   `/partnership/overview`: Provides a comprehensive overview of the partnership program.
-   `/partnership/partners`: Fetches a list of all registered NGO partners.
-   `/partnership/register`: Handles new partner registrations.

## 🗃️ Database Schema

Our database is powered by **Supabase** and includes the following tables to manage the application's data efficiently:

-   `donation_logs`
-   `partner_logins`
-   `chat_interactions`
-   `ai_responses`
-   `food_donations`
-   `ngo_partners`
-   `food_requests`
-   `partnerships`
-   `donation_matches`
-   `health_check`

For a more detailed schema, please refer to the `src/lib/database.ts` file.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## 🙏 Acknowledgements

We would like to thank the organizers of the **Walmart Hackathon 2025** for providing us with the platform to build this project and contribute to a cause we are passionate about. We also extend our gratitude to the open-source community for the amazing tools and libraries that made this project possible.
