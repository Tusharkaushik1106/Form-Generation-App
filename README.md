# Form Generation App

A modern, full-stack form builder application built with Next.js, TypeScript, and MongoDB. Create, share, and analyze forms with a beautiful, responsive interface.

## 🚀 Features

### ✨ Core Functionality
- **Drag & Drop Form Builder** - Create forms with multiple question types
- **Real-time Analytics** - View responses with beautiful charts and graphs
- **Easy Sharing** - Share forms with simple links
- **Secure Authentication** - User registration and login with NextAuth.js
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle between themes for better user experience

### 📝 Question Types
- **Short Answer** - Single line text input
- **Paragraph** - Multi-line text area
- **Multiple Choice** - Radio button selection
- **Checkboxes** - Multiple selection options
- **Dropdown** - Select from predefined options

### 📊 Analytics & Export
- **Real-time Response Tracking** - See responses as they come in
- **Visual Charts** - Bar charts for response analysis
- **CSV Export** - Download response data for further analysis
- **Response Management** - View and manage all form responses

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Beautiful charts and graphs
- **NextAuth.js** - Authentication solution

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB database
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd form-generation-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Database Setup**
   - Ensure MongoDB is running
   - The application will automatically create collections on first use

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
form-generation-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── forms/         # Form management API
│   │   │   └── public/        # Public form endpoints
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── form-builder/      # Form builder interface
│   │   └── public/            # Public form pages
│   ├── components/            # Reusable React components
│   │   ├── ui/               # UI components
│   │   ├── FormBuilder.tsx   # Form builder component
│   │   ├── Navbar.tsx        # Navigation component
│   │   └── ThemeProvider.tsx # Theme management
│   ├── lib/                  # Utility libraries
│   │   ├── authOptions.ts    # NextAuth configuration
│   │   └── mongodb.ts        # Database connection
│   ├── models/               # Mongoose models
│   │   ├── Form.ts          # Form schema
│   │   ├── Response.ts      # Response schema
│   │   └── User.ts          # User schema
│   ├── middleware/           # Next.js middleware
│   └── store/               # State management
├── public/                   # Static assets
└── package.json             # Dependencies and scripts
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js endpoints

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

## 🎨 Key Components

### FormBuilder
The core component for creating and editing forms. Features:
- Dynamic question addition/removal
- Multiple question types
- Real-time preview
- Form validation

### ThemeProvider
Manages dark/light theme switching with:
- Local storage persistence
- System preference detection
- Smooth transitions

### Dashboard
User interface for managing forms with:
- Form listing and management
- Quick actions (edit, delete, share)
- Response analytics
- CSV export functionality

## 🔐 Authentication & Security

- **NextAuth.js** handles user authentication
- **JWT tokens** for secure session management
- **Password hashing** with bcryptjs
- **Protected routes** with middleware
- **Role-based access** control

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** - Full-featured interface
- **Tablet** - Touch-friendly controls
- **Mobile** - Streamlined mobile experience

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

## 🎯 Roadmap

- [ ] Advanced form templates
- [ ] File upload questions
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Team collaboration
- [ ] API rate limiting
- [ ] Form versioning
- [ ] Multi-language support

---

**Built with ❤️ using Next.js, TypeScript, and MongoDB** 
