var root = "/root/apps/jourycms-project/";

module.exports = {
  apps: [
    {
      name: "backend",
      // script: "./backend/src/app.js", // Adjust this to the entry point of your backend
      script: "build/app.js",
      cwd: root + "backend", // Set the context folder for the backend app
      instances: 2, // Use all available CPU cores
      env: {
        NODE_ENV: "production",
        PORT: 3032,
      },
      watch: [root + "backend/build"], // Watch for file changes in backend
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
      cwd: root + "frontend", // Set the context folder for the backend app
      script: "npm",
      args: "run start", // Use your frontend start command here (e.g., "next start" for Next.js)
      instances: 1, // Frontend is usually single instance
      env: {
        NODE_ENV: "production",
      },
      watch: [root + "frontend/src"], // Watch for file changes in frontend
      ignore_watch: ["node_modules"], // Ignore node_modules folder
      max_memory_restart: "2G",
      error_file: "./logs/frontend-error.log",
      out_file: "./logs/frontend-output.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      restart_delay: 5000,
    },
  ],
};
