import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
      remotePatterns:[
          {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
          },
          {
              protocol: 'https',
              hostname: 'images.unsplash.com',
          },
      ],
  },
    experimental:{
        typedRoutes: true,
    },
    env:{
      NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? 'https://localhost:3000',
    },

}

export default nextConfig;
