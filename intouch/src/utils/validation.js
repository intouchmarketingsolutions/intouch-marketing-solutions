/**
 * Validation utilities for forms and file uploads
 */

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePhone = (phone) => {
  // Accepts +91XXXXXXXXXX, +1XXXXXXXXXX, or 10-15 digits
  const regex = /^(\+\d{1,3})?[\s-]?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/
  return regex.test(phone.replace(/\s/g, ''))
}

export const validateURL = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validatePrice = (price) => {
  const num = parseFloat(price)
  return !isNaN(num) && num > 0
}

export const validateFileSize = (file, maxSizeMB = 5) => {
  const maxBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxBytes
}

export const validateFileType = (file, allowedTypes = []) => {
  return allowedTypes.some(type => {
    if (type.includes('*')) {
      const [mainType] = type.split('/')
      return file.type.startsWith(mainType)
    }
    return file.type === type
  })
}

export const validateImageFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp']
  return validateFileType(file, allowedTypes) && validateFileSize(file, 2)
}

export const validatePDFFile = (file) => {
  const allowedTypes = ['application/pdf']
  return validateFileType(file, allowedTypes) && validateFileSize(file, 10)
}

export const validateDocFile = (file) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]
  return validateFileType(file, allowedTypes) && validateFileSize(file, 10)
}

export const getFileValidationError = (file, validationType = 'image') => {
  if (validationType === 'image') {
    if (!validateImageFile(file)) {
      return 'Please upload a valid image file (JPG, PNG, GIF, SVG, WebP) under 2MB'
    }
  } else if (validationType === 'pdf') {
    if (!validatePDFFile(file)) {
      return 'Please upload a valid PDF file under 10MB'
    }
  } else if (validationType === 'doc') {
    if (!validateDocFile(file)) {
      return 'Please upload a valid document (PDF, DOC, DOCX) under 10MB'
    }
  }
  return null
}

export const formatPhoneDisplay = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) return cleaned.replace(/(\d{5})(\d{5})/, '$1 $2')
  if (cleaned.length === 12) return '+91 ' + cleaned.slice(2).replace(/(\d{5})(\d{5})/, '$1 $5')
  return phone
}

export const formatCurrency = (value) => {
  const num = parseFloat(value)
  if (isNaN(num)) return ''
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(num)
}
