module.exports = {
  apps: [
    {
      name: "backend",
      // script: "./backend/src/app.js", // Adjust this to the entry point of your backend
      script: "npm",
      args: "run start", // Use your frontend start command here (e.g., "next start" for Next.js)

      instances: 2, // Use all available CPU cores
      env: {
        NODE_ENV: "production",
        PORT: 3032,
        // DB_URI: process.env.DB_URI,
        // MONGODB_LOCAL_URI: process.env.DB_URI,
        // CACHE_MANAGER_REDIS_URL: process.env.CACHE_MANAGER_REDIS_URL,
      },
      watch: ["./backend/build"], // Watch for file changes in backend
      ignore_watch: ["node_modules", "uploads"], // Ignore uploads folder to prevent unnecessary restarts
      max_memory_restart: "2G", // Restart the app if it exceeds 1GB of memory usage
      error_file: "./logs/backend-error.log",
      out_file: "./logs/backend-output.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      restart_delay: 5000, // Delay before restarting if the app crashes
    },
    {
      name: "frontend",
      script: "npm",
      args: "run start", // Use your frontend start command here (e.g., "next start" for Next.js)
      instances: 1, // Frontend is usually single instance
      env: {
        NODE_ENV: "production",
        // SDK_BASE_URL: process.env.SDK_BASE_URL,
        // NEXT_PUBLIC_API_BASE_URL_PROD: process.env.SDK_BASE_URL,
        // NEXT_PUBLIC_API_BASE_URL_DEV: process.env.SDK_BASE_URL,
      },
      watch: ["./frontend/src"], // Watch for file changes in frontend
      ignore_watch: ["node_modules"], // Ignore node_modules folder
      max_memory_restart: "1G",
      error_file: "./logs/frontend-error.log",
      out_file: "./logs/frontend-output.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      restart_delay: 5000,
    },
  ],
};
