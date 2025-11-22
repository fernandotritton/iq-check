/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [],
    },
    typescript: {
        // ⚠️ Peligrosamente permite que el build pase incluso con errores de TypeScript
        ignoreBuildErrors: true,
    },
    eslint: {
        // ⚠️ Peligrosamente permite que el build pase incluso con errores de ESLint
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
