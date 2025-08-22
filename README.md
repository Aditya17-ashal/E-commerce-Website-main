# E-commerce Website

A modern React-based e-commerce application with TypeScript, Tailwind CSS, and Spring Boot backend integration.

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-commerce-Website-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and update the API URL if your backend runs on a different port.

4. **Start the development server**
   ```bash
   npm run dev
   ```

### Production Deployment

#### Frontend (Netlify)

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set environment variables in Netlify**
   - Go to your Netlify site settings
   - Navigate to "Environment variables"
   - Add: `VITE_API_BASE_URL` = `https://demo-deployment-zisp.onrender.com`

3. **Deploy**
   - Connect your repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`

#### Backend Configuration

Make sure your Spring Boot backend (deployed on Render) includes CORS configuration for your Netlify domain:

```java
@CrossOrigin(origins = {"http://localhost:5173", "https://your-netlify-app.netlify.app"})
```

**Current Backend URL**: `https://demo-deployment-zisp.onrender.com`

## 🔧 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8082` | Yes |
| `VITE_DEBUG` | Enable debug logging | `false` | No |

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts (Auth, Cart, Products)
├── lib/           # Utilities and configurations
├── pages/         # Page components
└── main.tsx       # Application entry point
```

## 🛠 Technologies

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Spring Boot (separate repository)
- **Deployment**: Netlify (frontend), Render (backend)
