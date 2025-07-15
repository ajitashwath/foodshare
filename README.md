# Food Share - Rescuing Food, Feeding Communities
A web application designed to bridge the gap between food waste and food scarcity by connecting food donors with NGOs and communities in need.

## 🌟 Overview

Food Share is a web-based platform that rescues edible surplus from food businesses and redistributes it to local hunger relief organizations. With innovative technology and a nationwide network, we're working to ensure that food is shared — not wasted.

## 🚀 Features

### Core Functionality
- **Food Rescue Services**: Multiple service tiers including Retail Rescue, Wholesale Rescue, and Direct Link
- **AI-Powered Matching**: Intelligent system to connect food donors with appropriate NGOs
- **Real-time Tracking**: Live data tracking of food distribution and impact
- **Partnership Network**: Established connections with verified NGOs and community organizations

### User Experience
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Interactive Animations**: Smooth transitions and engaging user interactions using Framer Motion
- **Accessibility**: Designed with accessibility standards in mind
- **Multi-language Support**: Prepared for localization

### Technical Features
- **Modern React Architecture**: Built with Next.js 13+ and React 18
- **TypeScript Support**: Full type safety throughout the application
- **Component-based Design**: Reusable UI components with Tailwind CSS
- **Performance Optimized**: Lazy loading and efficient rendering

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: React Intersection Observer

### Backend Services
- **API Routes**: Next.js API routes for backend functionality
- **Database**: Integration ready for PostgreSQL/MongoDB
- **Authentication**: JWT-based authentication system
- **File Storage**: Support for media uploads and management

### Development Tools
- **Package Manager**: npm/yarn
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git
- **Deployment**: Vercel-ready configuration

## 📁 Project Structure

```
food-share/
├── public/
│   ├── images/
│   │   └── logo.png
│   └── videos/
│       └── herosection.mp4
├── src/
│   ├── app/
│   │   ├── ai-chat/
│   │   ├── api/v1/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── partnership/
│   │   ├── signup/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       ├── ai-service.ts
│       ├── config.ts
│       ├── database.ts
│       ├── partnership-service.ts
│       └── supabase.ts
├── .gitignore
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ajitashwath/foodshare.git
   cd foodshare
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   DATABASE_URL=your_database_url
   NEXTAUTH_SECRET=your_nextauth_secret
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Features & Pages

### Landing Page (`/`)
- Hero section with video background
- Mission statement and impact statistics
- Service offerings (Retail, Wholesale, Direct Link)
- Partnership information
- Contact form and social links

### AI Chat (`/ai-chat`)
- Intelligent food donation assistant
- Real-time chat interface
- Donation guidance and recommendations
- Partner matching system

### Partnership (`/partnership`)
- Detailed partnership information
- NGO profiles and contact details
- Partnership application process
- Food safety guidelines

### Authentication
- **Login** (`/login`): Partner and admin authentication
- **Signup** (`/signup`): New partner registration
- **Dashboard** (`/dashboard`): Partner management interface

## 🤝 Partnership Network

### Current NGO Partners

#### HEEALS NGO
- **Focus**: Public Health, Education, WASH, Mental Health
- **Location**: Gurgaon, Haryana
- **Contact**: communications@heeals.org
- **Website**: [heeals.org](http://heeals.org/)

#### Punjabi Samvad NGO
- **Focus**: Women Empowerment, Child Welfare, Cultural Preservation
- **Location**: Amritsar, Punjab
- **Established**: 2004

### Partnership Process
1. **Food Collection**: Partner NGOs identify surplus food
2. **Quality Assessment**: Safety standards verification
3. **Distribution**: Community network delivery

## 🔧 Development

### Available Scripts
```bash
# Development
npm run dev          # Start development server
npm run build        # Build production application
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Code Style
- **ESLint**: Configured for Next.js and TypeScript
- **Prettier**: Code formatting standards
- **Husky**: Pre-commit hooks for code quality

### Contributing Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔐 Security & Privacy

### Data Protection
- GDPR compliant data handling
- Secure authentication with JWT tokens
- Encrypted data transmission
- Regular security audits

### Food Safety
- Expiry date verification
- Temperature monitoring guidelines
- Packaging and labeling standards
- 2-hour donation window for prepared foods

## 📊 Analytics & Monitoring

### Performance Metrics
- Food rescue volume tracking
- Distribution efficiency monitoring
- Partner engagement analytics
- Impact measurement dashboard

### Technical Monitoring
- Application performance monitoring
- Error tracking and logging
- User experience analytics
- SEO optimization tracking


## 📞 Support & Contact

### Development Team
- **Email**: dev@foodshare.com
- **Location**: Phagwara, Punjab, India

### Community
- **Website**: [foodshare.com](https://foodshare.com)
- **Social Media**: Follow us on Instagram, Facebook, Twitter

### Support Channels
- **Technical Issues**: GitHub Issues
- **Partnership Inquiries**: partnership@foodshare.com
- **General Questions**: info@foodshare.com

## 🙏 Acknowledgments

- Partner NGOs for their dedication to community service
- Food donors and volunteers for their continuous support
- Open source community for the amazing tools and libraries
- All contributors who help make this project possible

## 🔄 Roadmap

### Long-term Goals
- Expand to 50+ cities across India
- Integrate with government food programs
- Develop food waste prediction models
- Create food security impact measurements

---

**Food Share** - *Rescuing Food, Feeding Communities*

For more information, visit our [website](https://foodshare.com) or contact us at [info@foodshare.com](mailto:info@foodshare.com).
