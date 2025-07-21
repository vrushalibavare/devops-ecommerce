/**
 * Utility function to normalize image paths
 * @param {string} imagePath - The image path to normalize
 * @returns {string} - The normalized image path
 */
export const normalizeImagePath = (imagePath) => {
  if (!imagePath) return '';
  
  // Extract just the filename if it contains a path
  if (imagePath.includes('/')) {
    return imagePath.split('/').pop();
  }
  
  return imagePath;
};