/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent @axe-core/react from being bundled in the SSR bundle.
  // The package references `window` at the module level, which breaks
  // server-side rendering. By externalising it, Node.js only loads it
  // when the dynamic import() inside useEffect fires (client only).
  serverExternalPackages: ["@axe-core/react"],
};
export default nextConfig;
