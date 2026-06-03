/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: 's3.amazonaws.com' },
      { protocol: 'https', hostname: 'placeholder.ia-artisan.fr' },
    ],
  },
  // Allow large file uploads in API routes
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
};

export default nextConfig;
