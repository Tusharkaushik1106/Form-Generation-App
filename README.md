# Form Builder - Modern Form Generation App

A powerful, modern form builder application built with Next.js, TypeScript, and MongoDB. Create beautiful, responsive forms with an intuitive drag-and-drop interface, real-time analytics, and seamless sharing capabilities.

![Form Builder](https://img.shields.io/badge/Next.js-15.4.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-6.18.0-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 **Modern UI/UX**
- Beautiful, responsive design with dark/light mode support
- Smooth animations powered by Framer Motion
- Intuitive drag-and-drop form builder
- Mobile-first responsive design

### 🔧 **Form Builder**
- Drag-and-drop interface for easy form creation
- Multiple question types: text, multiple choice, checkboxes, etc.
- Real-time preview of forms
- Customizable styling and themes

### 📊 **Analytics & Insights**
- Real-time response tracking
- Beautiful charts and graphs using Chart.js
- Export data to CSV format
- Response analytics and insights

### 🔐 **Authentication & Security**
- Secure user authentication with NextAuth.js
- Password hashing with bcrypt
- Protected routes and form access
- User role management

### 🌐 **Sharing & Collaboration**
- Public form sharing with unique URLs
- No registration required for respondents
- Easy form distribution
- Response collection from anywhere

### 📱 **Responsive Design**
- Works perfectly on desktop, tablet, and mobile
- Touch-friendly interface
- Optimized for all screen sizes

## 🚀 Tech Stack

- **Frontend**: Next.js 15.4.2, React 19.1.0, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Charts**: Chart.js, React-Chartjs-2
- **Icons**: Lucide React, Heroicons
- **UI Components**: Headless UI

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tusharkaushik1106/Form-Generation-App.git
   cd Form-Generation-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
Form-Generation-App/
├── src/
│   ├── app/                    # Next.js 13+ app directory
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── forms/         # Form management APIs
│   │   │   └── public/        # Public form endpoints
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── form-builder/      # Form builder interface
│   │   └── public/            # Public form pages
│   ├── components/            # Reusable React components
│   │   ├── ui/               # UI components and animations
│   │   └── ...               # Other components
│   ├── lib/                  # Utility libraries
│   ├── models/               # MongoDB models
│   ├── store/                # State management
│   └── styles/               # Global styles
├── public/                   # Static assets
└── ...                      # Configuration files
```

## 🎯 Usage

### Creating Forms
1. Sign up or log in to your account
2. Navigate to the Form Builder
3. Use the drag-and-drop interface to add questions
4. Customize question types and settings
5. Preview your form in real-time
6. Save and publish your form

### Sharing Forms
1. After creating a form, get the unique sharing link
2. Share the link with your audience
3. Respondents can fill out forms without registration
4. View responses in real-time on your dashboard

### Analyzing Responses
1. Access your dashboard to view all forms
2. Click on any form to see detailed responses
3. View analytics and charts
4. Export data to CSV for further analysis

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/[...nextauth]` - NextAuth.js endpoints

### Forms
- `GET /api/forms` - Get user's forms
- `POST /api/forms` - Create new form
- `GET /api/forms/[id]` - Get specific form
- `PUT /api/forms/[id]` - Update form
- `DELETE /api/forms/[id]` - Delete form
- `GET /api/forms/[id]/responses` - Get form responses

### Public Forms
- `GET /api/public/[publicId]` - Get public form
- `POST /api/public/[publicId]/response` - Submit form response

## 🎨 Customization

### Themes
The app supports both light and dark themes with automatic system preference detection.

### Styling
- Customize colors and styling using Tailwind CSS
- Modify animations in `src/components/ui/animations.tsx`
- Update global styles in `src/styles/globals.css`

### Components
- All components are modular and reusable
- Easy to extend and customize
- TypeScript interfaces for type safety

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tushar Kaushik**
- GitHub: [@Tusharkaushik1106](https://github.com/Tusharkaushik1106)
- LinkedIn: [Tushar Kaushik](https://linkedin.com/in/tushar-kaushik)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [MongoDB](https://www.mongodb.com/) for the database
- [NextAuth.js](https://next-auth.js.org/) for authentication

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Reach out to the maintainers

---

⭐ **Star this repository if you found it helpful!** 
