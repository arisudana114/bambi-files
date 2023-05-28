/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: "https://bambi-files-bojt037yo-arisudana114.vercel.app",
    DB_URI:
      "mongodb+srv://bambi:Risingsun1@cluster0.bvfk6.mongodb.net/bambi?retryWrites=true&w=majority",
    CLOUD_NAME: "dxqxkdc0r",
    CLOUDINARY_API_KEY: "424185237794643",
    CLOUDINARY_API_SECRET: "hfjmH0Rva2tj7gAkEOrDWkJEA1s",
    STRIPE_PUBLIC_KEY:
      "pk_test_51LVp6iGocQKkA8uOy7Qo8zZz0tNZ7Wxr7ylvYZh81j6ieMj49gLrccMEbODuJ6bRNlOEInlJhjJPYo1vaDfzx0VK004hnQOAwN",
    STRIPE_PRIVATE_KEY:
      "sk_test_51LVp6iGocQKkA8uOo3JNnCx7liz3HXa16RsbHas3q1obngNSDU5UoB7KPDpACKJHPdWx8AgaQIYAEDHHGODKdydW00J6LuNvzi",
    STRIPE_WEBHOOK_SECRET:
      "whsec_68233a6fcaa46f96098ae24273191a218a75cda03cbd5652befb742e0a2c28f0",
    NEXTAUTH_SECRET: "bambifiles",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
