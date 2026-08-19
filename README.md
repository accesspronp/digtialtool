# DigitalToolsNepal - Complete Website

A complete static storefront with:
- Premium homepage
- Product catalogue with search + category filters
- Subscription plan selection
- eSewa / Khalti / Bank QR payment screen
- QR download button
- "I have paid" screenshot selection
- Screenshot preview
- Direct WhatsApp order redirect
- Responsive desktop + mobile design
- Product data in one simple `app.js` file

## Important: replace the WhatsApp number
Open `app.js` and change:
`whatsapp: "9779800000000"`
to your real WhatsApp number, without `+` or spaces.

## Replace / update QR images
The website currently uses the supplied images in:
- `assets/esewa-qr.png`
- `assets/khalti-qr.png`
- `assets/bank-qr.png`

Replace those PNGs with the current QR images whenever your payment details change.

## Run
Unzip and open `index.html`. No npm, Node, or build step is required.

## Product prices
Edit the `products` array in `app.js`. Each product has a `plans` array.

### Latest product update
- Added ChatGPT Pro with 3 Months = Rs. 4,500.
- Added subscription badges and improved ChatGPT / Claude product logo styling.
