# 🚀 Deployment Guide

## Current Configuration

**Frontend**: Deployed on Netlify  
**Backend**: Deployed on Render at `https://demo-deployment-zisp.onrender.com`

## 📋 Step-by-Step Netlify Environment Variable Update

### 1. Access Netlify Dashboard
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Log in to your account
3. Select your deployed site

### 2. Navigate to Environment Variables
1. Click on **"Site settings"** in the top navigation
2. In the left sidebar, click **"Environment variables"**
3. You should see the build environment variables section

### 3. Update API Base URL
1. Look for existing `VITE_API_BASE_URL` variable
   - If it exists: Click **"Edit"** next to it
   - If it doesn't exist: Click **"Add environment variable"**

2. Set the following values:
   ```
   Key: VITE_API_BASE_URL
   Value: https://demo-deployment-zisp.onrender.com
   ```

3. Click **"Save"**

### 4. Trigger Redeploy
**Option A: Automatic (Recommended)**
1. Make a small change to your repository (like updating this file)
2. Commit and push to your main branch
3. Netlify will automatically redeploy

**Option B: Manual**
1. In your Netlify site dashboard
2. Go to **"Deploys"** tab
3. Click **"Trigger deploy"** → **"Deploy site"**

## 🔍 Verification Steps

### 1. Check Environment Variable
After deployment, verify the environment variable is set:
1. Go to your deployed site
2. Open browser Developer Tools (F12)
3. Go to Console tab
4. You should see: `🔧 App Configuration: { apiBaseUrl: "https://demo-deployment-zisp.onrender.com", ... }`

### 2. Test API Calls
1. Open Network tab in Developer Tools
2. Try to log in or register
3. Check that API calls go to `https://demo-deployment-zisp.onrender.com/api/*`
4. Verify responses are successful (status 200/201)

### 3. Test Functionality
- ✅ User registration
- ✅ User login
- ✅ Product loading
- ✅ Cart functionality
- ✅ Admin features (if applicable)

## 🐛 Troubleshooting

### API Calls Still Going to Localhost
- **Cause**: Environment variable not set or deployment not triggered
- **Solution**: Double-check environment variable and redeploy

### CORS Errors
- **Cause**: Backend doesn't allow your Netlify domain
- **Solution**: Update backend CORS configuration to include your Netlify URL

### 404 Errors on API Calls
- **Cause**: Backend service might be sleeping (Render free tier)
- **Solution**: Wait a few seconds for the service to wake up, or visit the backend URL directly

### Environment Variable Not Loading
- **Cause**: Variable name typo or caching
- **Solution**: 
  1. Verify exact spelling: `VITE_API_BASE_URL`
  2. Clear browser cache
  3. Try incognito/private browsing mode

## 📝 Current Environment Variables

| Environment | Variable | Value |
|-------------|----------|-------|
| Development | `VITE_API_BASE_URL` | `http://localhost:8082` |
| Production | `VITE_API_BASE_URL` | `https://demo-deployment-zisp.onrender.com` |

## 🔄 Future Updates

If the backend URL changes:
1. Update the environment variable in Netlify
2. Update `.env.production.example` in the repository
3. Redeploy the frontend
4. Test all functionality

---

**Last Updated**: Current deployment  
**Backend URL**: https://demo-deployment-zisp.onrender.com  
**Frontend**: Netlify (environment-based configuration)
