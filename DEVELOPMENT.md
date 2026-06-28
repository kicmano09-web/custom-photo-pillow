# Development & Deployment Guide

## Local Development

### Prerequisites
- Node.js 14+ and npm
- Shopify CLI
- Git

### Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   shopify theme dev
   ```

3. **Preview in browser**
   - Development store preview will open automatically
   - Hot reload enabled for CSS and Liquid changes

### File Watching
The development server automatically watches for changes in:
- `assets/` - CSS and JavaScript files
- `sections/` - Liquid section templates
- `snippets/` - Liquid snippet templates
- `templates/` - JSON page templates

## Deployment

### To Development Store
```bash
shopify theme dev --store=your-store.myshopify.com
```

### To Production
```bash
shopify theme push --store=your-store.myshopify.com
```

### Create a New Release
```bash
shopify theme push --store=your-store.myshopify.com --publish
```

## Testing

### Desktop Testing
- Chrome DevTools
- Firefox Developer Tools
- Safari Developer Tools

### Mobile Testing
- Responsive design mode in browsers
- Actual device testing (iOS/Android)
- Chrome DevTools device emulation

### Performance Testing
- Google PageSpeed Insights
- Lighthouse audit
- WebPageTest

### Accessibility Testing
- axe DevTools
- Wave accessibility checker
- Screen reader testing

## Troubleshooting

### Issue: Changes not reflecting
**Solution:** Clear browser cache (Ctrl+Shift+Delete) and refresh

### Issue: JavaScript not working
**Solution:** Check browser console for errors (F12 → Console tab)

### Issue: Styling conflicts
**Solution:** Ensure unique class names and use CSS specificity wisely

### Issue: Cart not updating
**Solution:** Verify Shopify API credentials and cart.json endpoint

## Performance Optimization

1. **Image Optimization**
   - Use Shopify CDN for all images
   - Lazy load images below fold
   - Use appropriate image formats

2. **CSS Optimization**
   - Minify production CSS
   - Remove unused styles
   - Use critical CSS inlining

3. **JavaScript Optimization**
   - Minify JavaScript
   - Defer non-critical scripts
   - Use async loading where appropriate

4. **Caching**
   - Set proper cache headers
   - Enable browser caching
   - Use Shopify CDN

## Maintenance

### Weekly
- Check for new Shopify API updates
- Monitor error logs
- Review customer feedback

### Monthly
- Update dependencies
- Performance audits
- Security updates

### Quarterly
- A/B testing analysis
- SEO audit
- Conversion rate analysis

## Version Control

### Commit Messages
```
Fix: Brief description of the fix
Feature: New feature description
Refactor: Code refactoring description
Docs: Documentation updates
Style: CSS/styling changes
Perf: Performance improvements
```

### Branch Strategy
- `main` - Production ready
- `develop` - Development branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches
