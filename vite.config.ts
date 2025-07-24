import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // For GitHub Pages, the base should be the repository name
  // Get from GITHUB_REPOSITORY env var or default to current directory name
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || path.basename(process.cwd());
  const base = mode === 'production' ? `/${repoName}/` : '/';
  
  return {
  base,
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
