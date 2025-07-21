/**
 * Simple utility to handle image paths
 * If the image path contains a directory structure, extract just the filename
 */
export const getImagePath = (imagePath) => {
  if (!imagePath) return '';
  
  // If the path contains a slash, extract just the filename
  if (imagePath.includes('/')) {
    return imagePath.split('/').pop();
  }
  
  return imagePath;
};