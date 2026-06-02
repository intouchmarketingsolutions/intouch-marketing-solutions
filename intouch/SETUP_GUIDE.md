# Intouch Marketing Solutions - SETUP GUIDE

## 🔧 Environment Configuration

### Step 1: Create `.env.local` File

Copy the `.env.example` file and rename it to `.env.local`:

```bash
# Linux/Mac
cp .env.example .env.local

# Windows PowerShell
Copy-Item .env.example -Destination .env.local
```

### Step 2: Fill in Your Environment Variables

Edit `.env.local` and add your Supabase credentials:

```
# Supabase Configuration (Get from your Supabase project settings)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Career Page API (same as above)
VITE_SUPABASE_API_URL=https://your-project.supabase.co
VITE_SUPABASE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# WhatsApp & Email Configuration
VITE_WHATSAPP_NUMBER=917483649426
VITE_EMAIL_TO=intouchmarketingsolution01@gmail.com
```

### Step 3: Never Commit `.env.local`

The `.env.local` file should NEVER be committed to git. It's already in `.gitignore`.

---

## ✅ What Was Fixed

### 🔴 CRITICAL ISSUES FIXED

#### 1. **Security: Hardcoded API Key**
- ❌ **Before**: API key visible in `Career.jsx` source code
- ✅ **After**: Moved to `.env.local` environment variables

#### 2. **Error Handling**
- ❌ **Before**: Empty catch blocks, silent failures
- ✅ **After**: Proper error messages shown to users

#### 3. **File Validation**
- ❌ **Before**: No validation on file uploads
- ✅ **After**: Added file type, size, and format validation

#### 4. **Input Validation**
- ❌ **Before**: Minimal validation on form inputs
- ✅ **After**: Email, phone, price, URL validation

#### 5. **Error Boundary**
- ❌ **Before**: One component error crashes entire app
- ✅ **After**: Error Boundary component catches and handles errors gracefully

---

## 📋 Files Modified

### New Files Created
- `.env.example` - Environment variable template
- `src/components/ErrorBoundary.jsx` - Error boundary component
- `src/utils/validation.js` - Validation utilities

### Files Updated
- `src/App.jsx` - Added Error Boundary wrapper
- `src/admin/supabase/client.js` - Added env var validation
- `src/pages/Career/Career.jsx` - Added validation & error handling
- `src/pages/Contact/Contact.jsx` - Added validation & error handling
- `src/pages/StartProject/StartProject.jsx` - Added validation & error handling
- `src/admin/pages/AdminClients.jsx` - Added file validation & error handling
- `src/admin/pages/AdminJobs.jsx` - Added error handling
- `src/admin/pages/AdminApplications.jsx` - Added error handling

---

## 🧪 Validation Functions Available

### Email Validation
```javascript
import { validateEmail } from '@/utils/validation'
validateEmail('user@example.com') // true
```

### Phone Validation
```javascript
import { validatePhone } from '@/utils/validation'
validatePhone('+91 74836 49426') // true
```

### File Validation
```javascript
import { validateImageFile, getFileValidationError } from '@/utils/validation'

const error = getFileValidationError(file, 'image')
if (error) {
  // Show error to user
  console.log(error)
}
```

### URL Validation
```javascript
import { validateURL } from '@/utils/validation'
validateURL('https://example.com') // true
```

### Price Validation
```javascript
import { validatePrice } from '@/utils/validation'
validatePrice('999.99') // true
```

---

## 🚀 How to Use the Error Boundary

The app is now wrapped with ErrorBoundary in `App.jsx`. It will:
- ✅ Catch any React component errors
- ✅ Show a user-friendly error page
- ✅ Provide a refresh button
- ✅ Log error details in development mode

---

## 🎯 Next Steps

1. **Add `.env.local`** with your Supabase credentials
2. **Test the app** locally:
   ```bash
   npm install
   npm run dev
   ```
3. **Verify no console errors** related to missing environment variables
4. **Test forms** to verify validation works correctly
5. **Test file uploads** to verify file validation works

---

## 📚 Validation Rules Applied

### Career Form
- ✅ Name: Required, non-empty
- ✅ Email: Required, valid email format
- ✅ Phone: Required, valid phone format
- ✅ Resume File: PDF/DOC, max 10MB

### Contact Form
- ✅ Name: Required, non-empty
- ✅ Phone: Required, valid phone format
- ✅ Email: Optional, but if provided must be valid
- ✅ Message: Required, non-empty

### Start Project Form
- ✅ Project Name: Required
- ✅ Owner Name: Required
- ✅ Mobile: Required, valid format
- ✅ Address: Required
- ✅ Category: Required
- ✅ Description: Required
- ✅ Requirements: Required
- ✅ Price: Required, valid number > 0

### Admin Forms
- ✅ Client Name: Required
- ✅ Client Logo: Optional, PNG/JPG/GIF/SVG/WebP, max 2MB
- ✅ Job Title: Required
- ✅ Job Description: Required

---

## 🆘 Troubleshooting

### Missing Environment Variables
**Error**: "Configuration error: Missing Supabase API key"
**Solution**: Create `.env.local` and add `VITE_SUPABASE_API_KEY`

### File Upload Fails
**Error**: "Please upload a valid image file..."
**Solution**: Ensure file is PNG/JPG/GIF/SVG/WebP and under 2MB

### Validation Messages Not Showing
**Error**: Form submits without validation
**Solution**: Check browser console for errors, verify imports are correct

---

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify `.env.local` is created and filled correctly
3. Review the validation rules in `src/utils/validation.js`
4. Check the Error Boundary component in `src/components/ErrorBoundary.jsx`
