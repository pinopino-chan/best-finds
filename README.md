# Best Finds USA — YouTube Shorts → Amazon

Static GitHub Pages storefront for Amazon Associates.

## 1. Add products

Edit `products.json`.

Each product:

- `id`: unique ID
- `title`: product title
- `price`: optional display price
- `category`: category name
- `tags`: search terms
- `image`: image URL allowed by your Amazon Associates/Program Content rules
- `amazon`: your Amazon Associates Special Link
- `featured`: true/false
- `shorts`: IDs of Shorts that feature this product

Example:

```json
{
  "id": "101",
  "title": "Example Product",
  "price": "$29.99",
  "category": "Tech",
  "tags": "desk gadget",
  "image": "YOUR_ALLOWED_IMAGE_URL",
  "amazon": "YOUR_AMAZON_ASSOCIATES_SPECIAL_LINK",
  "featured": true,
  "shorts": ["short-101"]
}
```

## 2. Shorts-specific links

Use:

`https://YOURNAME.github.io/YOUR-REPO/?p=001`

The page will show products whose `id` is `001` or whose `shorts` array contains `001`.

For example:

`?p=short-001`

shows all products tagged with `short-001`.

## 3. Google Analytics

In `index.html`, replace:

`G-XXXXXXXXXX`

with your Google Analytics measurement ID.

The site sends an `amazon_click` event with product ID, product name, and category.

## 4. GitHub Pages

Create a public repository and upload:

- index.html
- style.css
- app.js
- products.json
- README.md

Then open:

Settings → Pages

Choose the `main` branch and `/ (root)` as the source.

GitHub Pages publishes static HTML/CSS/JS directly from the repository.

## Important Amazon note

Do not scrape Amazon pages or copy product images/prices into the repository without checking the current Associates Program rules. Use Amazon-approved Program Content / Creators API / approved tools where applicable, and use your own valid Special Links.

The old Product Advertising API documentation says PA-API is deprecated as of May 15, 2026 and points developers to Creators API. Check the current Amazon documentation before automating product data.
