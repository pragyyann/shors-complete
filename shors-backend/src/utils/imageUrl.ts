export const getImageUrl = (publicId: string): string => {
  if (!publicId) return "";
  // Assuming basic Cloudinary URL generation placeholder
  // In reality, this might use the cloudinary v2 client to generate transformed URLs
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`;
};
