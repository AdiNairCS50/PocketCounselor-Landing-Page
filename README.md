# 🌟 PocketCounselor Waitlist Page

<div align="center">
  <img src="public/images/PC-WhiteBackground.png" alt="PocketCounselor Logo" width="200" />
  
  <h3>Join the future of mental health support</h3>
  <p><em>Be among the first to experience personalized AI-powered counseling</em></p>
  
  [![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5-purple?style=for-the-badge&logo=vite)](https://vitejs.dev/)
  [![SCSS](https://img.shields.io/badge/SCSS-Styling-pink?style=for-the-badge&logo=sass)](https://sass-lang.com/)
</div>

## 📖 About PocketCounselor

PocketCounselor is revolutionizing mental health support by making personalized counseling accessible anytime, anywhere. Our AI-powered platform provides intelligent, empathetic, and evidence-based mental health guidance tailored to your unique needs.

This repository contains the beautifully crafted waitlist landing page that introduces users to PocketCounselor and allows them to join our early access program.

## ✨ Features

### 🎨 **Beautiful Landing Page**

- **Hero Section** - Compelling introduction with clear value proposition
- **Features Showcase** - Highlight key PocketCounselor capabilities
- **App Demo** - Preview of the actual application interface
- **Testimonials** - Social proof from early users
- **Contact Information** - Easy ways to get in touch

### 🛠 **Technical Excellence**

- **Responsive Design** - Perfect experience on all devices
- **Dark/Light Theme** - User preference support
- **Modern React** - Built with latest React 18 & TypeScript
- **Optimized Performance** - Fast loading with Vite build system
- **Email Integration** - Google Apps Script powered waitlist management

### 📧 **Waitlist Management**

- **Seamless Signup** - Simple modal-based registration
- **Email Verification** - Automated confirmation system
- **Spam Prevention** - Built-in security measures
- **Data Management** - Organized Google Sheets integration

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/PavanCodesNY/Waitlist-Page-PC.git
   cd Waitlist-Page-PC
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── landing/              # Landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── AppDemoSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── FooterSection.tsx
│   ├── shared/               # Reusable components
│   │   ├── Header.tsx
│   │   └── ThemeToggle.tsx
│   └── WaitlistModal.tsx     # Signup modal
├── styles/                   # SCSS styling
│   ├── components/           # Component-specific styles
│   ├── globals.css           # Global styles
│   └── variables.css         # CSS custom properties
└── assets/                   # Static assets
    └── images/
```

## 🛠 Technology Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite for fast development and optimized builds
- **Styling:** SCSS with CSS custom properties
- **Backend Integration:** Google Apps Script for email management
- **Email Service:** Gmail API for automated responses
- **Data Storage:** Google Sheets for waitlist management

## 📧 Email System

The project includes a comprehensive email management system:

- **`Enhanced-Google-Apps-Script.js`** - Main backend logic
- **`Email-Management-Functions.js`** - Email handling utilities
- **`Simple-5-Field-Script.js`** - Streamlined form processing
- **`Debug-Email-Script.js`** - Development and testing tools

## 🎯 Getting Started with PocketCounselor

1. **Visit the Landing Page** - Learn about our mission and features
2. **Join the Waitlist** - Click "Join Waitlist" and fill out the simple form
3. **Verify Your Email** - Check your inbox for confirmation
4. **Stay Updated** - Receive exclusive updates about our launch

## 🤝 Contributing

We welcome contributions! Whether it's:

- 🐛 Bug reports and fixes
- ✨ Feature suggestions and implementations
- 📚 Documentation improvements
- 🎨 Design enhancements

Please feel free to open issues or submit pull requests.

## 📱 Connect with PocketCounselor

- **Website:** [Coming Soon]
- **Email:** [Contact through waitlist]
- **LinkedIn:** [PocketCounselor]
- **Twitter:** [@PocketCounselor]

## 📄 License

This project is proprietary software developed for PocketCounselor. All rights reserved.

---

<div align="center">
  <p><strong>Ready to transform your mental health journey?</strong></p>
  <p><a href="https://pockecounselor-waitlist.com">🚀 Join the Waitlist Today</a></p>
</div>
