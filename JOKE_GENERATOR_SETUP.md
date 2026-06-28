# Joke Generator - Shopify Integration Guide

## Overview

The Joke Generator is a fun, interactive section that fetches random jokes from the **JokeAPI** and displays them on your Shopify store.

**API Used:** [JokeAPI v2](https://jokeapi.dev/)
- **Endpoint:** `https://v2.jokeapi.dev/joke/Any`
- **No authentication required**
- **Rate limit:** 120 requests per minute
- **Safe mode enabled** (no offensive content)

## Features

✨ **Random Joke Fetching**
- Integrates with JokeAPI for unlimited jokes
- Supports single and two-part jokes
- Safe-mode enabled for family-friendly content

👍 **Rating System**
- Thumbs up/down voting
- Track rating percentage over time
- Persistent stats saved to browser

📊 **Statistics Tracking**
- Count total jokes viewed
- Calculate like/dislike ratio
- LocalStorage persistence

🔗 **Social Sharing**
- Native share API support
- Fallback to clipboard copy
- Pre-formatted share text

## Installation Steps

### Step 1: Add Section to Shopify Theme

1. In your Shopify Admin, go to **Online Store > Themes**
2. Click **Edit code** on your theme
3. Create a new section:
   - Click **Add a new section**
   - Name it `joke-generator.liquid`
   - Copy the content from `sections/joke-generator.liquid`

### Step 2: Upload JavaScript Asset

1. In the theme editor, go to **Assets**
2. Upload the `joke-generator.js` file from `assets/`
3. This file will be automatically linked in the Liquid section

### Step 3: Add Section to Page

**Option A: Homepage**
1. Go to **Online Store > Pages > Home**
2. Edit the page
3. Add the "Joke Generator" section
4. Configure title, subtitle, and button text
5. Save and publish

**Option B: Product Page**
1. Go to **Online Store > Themes**
2. Edit code
3. Open `templates/product.liquid` or `templates/product.json`
4. Add the joke-generator section to the page layout

**Option C: Custom Landing Page**
1. Create a new page in **Pages**
2. Add the "Joke Generator" section
3. Customize as needed

## Configuration

The section includes these customizable settings:

```json
{
  "title": "Random Joke Generator",           // Section heading
  "subtitle": "Get a laugh delivered...",     // Description text
  "button_text": "Get a Joke"                // Button label
}
```

These can be edited directly in the Shopify Admin theme customizer.

## API Endpoints

### Single Joke
```
GET https://v2.jokeapi.dev/joke/Any?format=json&safe-mode
```

**Response:**
```json
{
  "error": false,
  "category": "General",
  "type": "single",
  "joke": "Why don't scientists trust atoms? Because they make up everything!",
  "flags": {
    "nsfw": false,
    "religious": false,
    "political": false,
    "racist": false,
    "sexist": false,
    "explicit": false
  },
  "id": 123
}
```

### Two-Part Joke
```json
{
  "error": false,
  "category": "Knock-Knock",
  "type": "twopart",
  "setup": "Knock knock!",
  "delivery": "Who's there?",
  "flags": { ... },
  "id": 456
}
```

## Customization

### Change Joke Category

Edit `assets/joke-generator.js` line with API URL:

```javascript
// Current (any category)
this.apiUrl = 'https://v2.jokeapi.dev/joke/Any?format=json&safe-mode';

// Programming jokes only
this.apiUrl = 'https://v2.jokeapi.dev/joke/Programming?format=json&safe-mode';

// Knock-knock jokes
this.apiUrl = 'https://v2.jokeapi.dev/joke/Knock-Knock?format=json&safe-mode';

// Available categories: Any, Programming, Knock-Knock, General, Miscellaneous
```

### Modify Colors

Edit `sections/joke-generator.liquid` style section:

```css
/* Change primary color */
.joke-category {
  background: #YOUR_COLOR;  /* was #d4a574 */
}

.rating-btn.active {
  background: #YOUR_COLOR;
  border-color: #YOUR_COLOR;
}
```

### Add Custom Styling

Add CSS classes to override theme styles:

```css
.joke-text {
  font-size: 1.5rem;  /* Make jokes bigger */
  font-style: italic;  /* Italicize text */
  color: #your-color;
}
```

## Troubleshooting

### Joke API Not Loading

**Problem:** "Couldn't fetch a joke" error

**Solutions:**
1. Check internet connection
2. Verify JokeAPI is accessible: https://v2.jokeapi.dev/joke/Any
3. Check browser console for CORS errors (F12 → Console)
4. Verify safe-mode parameter is included

### Ratings Not Saving

**Problem:** Stats reset after page refresh

**Solution:** 
- Check if localStorage is enabled in browser
- Disable private/incognito browsing
- Clear browser cache if stuck

### Section Not Appearing

**Problem:** Joke Generator section missing from editor

**Solutions:**
1. Refresh the theme editor (Ctrl+R)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Verify `joke-generator.liquid` is in sections folder
4. Check that JavaScript asset is uploaded

### Styling Issues

**Problem:** Section looks broken or misaligned

**Solutions:**
1. Clear CSS cache (hard refresh: Ctrl+Shift+R)
2. Check for CSS conflicts with theme styles
3. Open browser DevTools (F12) to inspect elements
4. Test in different browsers

## Performance Considerations

### Caching
- JokeAPI responses are not cached by default
- Each button click fetches a new joke
- Consider caching if you add multiple instances

### Rate Limiting
- 120 requests per minute per IP
- ~2 requests per second per visitor
- Should be fine for most stores

### Mobile Optimization
- Responsive design included
- Touch-friendly buttons (44px minimum)
- Works on all modern mobile browsers

## Analytics

To track joke generator usage, add this to your analytics:

```javascript
// Track joke fetched
window.dataLayer?.push({
  event: 'joke_fetched',
  category: this.currentJoke.category
});

// Track rating
window.dataLayer?.push({
  event: 'joke_rated',
  rating: isLiked ? 'like' : 'dislike'
});
```

## Security Notes

✅ **Safe Features:**
- HTTPS only (JokeAPI uses SSL)
- Safe-mode enabled (filters offensive content)
- No user data collected
- No authentication tokens
- CORS-enabled for cross-origin requests

⚠️ **Considerations:**
- External API dependency (if JokeAPI is down, section won't work)
- LocalStorage used for stats (user's device only)
- No sensitive data stored

## Support & Resources

- **JokeAPI Docs:** https://jokeapi.dev/
- **Shopify Liquid Docs:** https://shopify.dev/api/liquid
- **GitHub Issues:** Open an issue in your repo

## Future Enhancements

💡 Ideas to extend the section:

1. **Custom joke categories** - Let users filter by type
2. **Favorite jokes** - Save liked jokes to wishlist
3. **Email jokes** - Send jokes via email
4. **Joke history** - Show previously told jokes
5. **Difficulty rating** - Rate joke cleverness
6. **Language support** - Multi-language jokes
7. **Dark mode** - Toggle dark/light theme
8. **Advanced analytics** - Track which jokes are most liked

## License

JokeAPI is free to use under the Creative Commons License.
This integration is part of your Custom Photo Pillow theme.
