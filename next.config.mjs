/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Next maps quality far more aggressively than sharp does, so the
    // gradients need the top of the scale to avoid banding.
    qualities: [85, 100],
  },
};

export default nextConfig;
