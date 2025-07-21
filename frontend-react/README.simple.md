# Simplified ShopMate Frontend

This is a simplified version of the ShopMate frontend, focusing only on displaying products with images.

## Quick Start

To build and run the simplified version:

```bash
# Build the Docker image
docker build -f Dockerfile.simple -t shopmate-simple .

# Run the container
docker run -p 8080:8080 shopmate-simple
```

Then open your browser to http://localhost:8080

## Image Requirements

All product images should be placed in the `public/assets` directory. The application expects:

- handbag.jpg
- mobilephone.jpg
- sunglasses.jpg

## Troubleshooting

If images don't appear:

1. Check that the images exist in the `public/assets` directory
2. Verify the image filenames match exactly what's expected
3. Check browser console for any errors loading images