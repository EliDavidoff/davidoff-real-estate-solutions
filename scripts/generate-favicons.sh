#!/bin/bash

# Generate favicons from SVG using ImageMagick
# Install ImageMagick: brew install imagemagick

SVG="public/favicon.svg"
OUTPUT_DIR="public"

sizes=(16 32 48 96 180 192 512)

for size in "${sizes[@]}"; do
  convert "$SVG" -resize "${size}x${size}" "${OUTPUT_DIR}/favicon-${size}x${size}.png"
  echo "✓ Generated favicon-${size}x${size}.png"
done

echo ""
echo "✅ All favicons generated successfully!"


