/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind v4 uses CSS-first configuration
  // Custom theme values are defined in CSS using @theme directive
}

// tailwind.config.js
module.exports = {
  content: ['./index.html','./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3B7FBF',
        'primary-hover': '#2B6FA8',
        'success-green': '#10B981',
        'success-green-light': '#D1FAE5',
        danger: '#EF4444',
        'muted-50': '#F9FAFB',
        'muted-100': '#F3F4F6',
        'muted-200': '#E5E7EB',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
        md: '0 4px 6px -1px rgba(0,0,0,0.1)',
      },
      fontSize: {
        '2xl': ['24px', '1.25'],
        xl: ['20px', '1.25'],
        lg: ['18px', '1.25'],
        base: ['16px','1.5'],
        sm: ['14px','1.5'],
        xs: ['12px','1.5']
      }
    }
  },
  plugins: [],
};

