# Custom Photo Pillow - Premium Shopify Storefront

## Overview
A modern, luxury one-product Shopify theme optimized for custom photo pillow sales. Features live image customization, premium design, mobile-first responsive layout, and Printful integration.

## 🎨 Features
- **Live Image Customizer** - Upload, drag, zoom, rotate, crop with instant pillow preview
- **Mobile-First Design** - Perfect on desktop, tablet, and mobile
- **Performance Optimized** - Core Web Vitals optimized, lazy-loaded images
- **Secure Checkout** - Multiple payment methods (Visa, Mastercard, PayPal, Apple Pay, Google Pay, Shop Pay)
- **International Shipping** - Country selector and estimated delivery
- **Customer Reviews** - 5-star reviews with verified purchase badges
- **Premium Design** - Luxury aesthetic inspired by Apple, Gymshark, Ridge, MVMT
- **SEO Optimized** - JSON-LD schema, meta descriptions, Open Graph tags
- **Printful Ready** - Image uploads attached as line item properties for fulfillment

## 📋 Tech Stack
- Shopify Liquid
- HTML5 & CSS3
- JavaScript (ES6)
- Canvas API (Image Editor)
- Responsive Design (Mobile-First)

## 📁 Directory Structure
```
sections/          - Reusable Liquid sections
  ├── main-product.liquid
  ├── hero.liquid
  ├── product-customizer.liquid
  ├── gallery.liquid
  ├── reviews.liquid
  ├── faq.liquid
  ├── trust-badges.liquid
  └── footer.liquid

templates/         - Page templates
  ├── product.json
  └── index.json

snippets/          - Reusable Liquid snippets
  ├── product-form.liquid
  ├── cart-drawer.liquid
  ├── payment-icons.liquid
  └── seo-schema.liquid

assets/            - CSS, JavaScript, Images
  ├── theme.css
  ├── customizer.js
  ├── cart-drawer.js
  ├── gallery.js
  └── images/
      ├── hero-lifestyle.jpg
      └── product-showcase.jpg
```

## 🚀 Installation
1. Clone: `git clone https://github.com/kicmano09-web/custom-photo-pillow.git`
2. Install Shopify CLI: `npm install -g @shopify/cli @shopify/theme`
3. Authenticate: `shopify login --shop=yourstore.myshopify.com`
4. Serve theme: `shopify theme serve`
5. Visit: `https://yourstore.myshopify.com?preview_theme_id=<theme-id>`

## ⚙️ Configuration
- **Product Images**: Add/replace in `assets/images/`
- **Colors & Typography**: Modify `assets/theme.css`
- **Product Options**: Edit `sections/main-product.liquid`
- **Payment Methods**: Configure in Shopify admin
- **Printful Integration**: Set up fulfillment in Shopify settings

## 📊 Performance
- Lazy-loaded images
- CSS animations with GPU acceleration
- Minified JavaScript
- Optimized Core Web Vitals (LCP, FID, CLS)
- Mobile-first responsive design

## 🔒 Security & Compliance
- Secure checkout with PCI compliance
- Privacy policy and terms included
- Customer data protection
- GDPR ready

## 📝 License
Proprietary - Custom Shopify Theme
