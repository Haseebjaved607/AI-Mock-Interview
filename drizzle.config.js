/** @type { import("drizzle-kit").Config } */

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: './utils/schema.js', // Adjust the path based on your schema location
  dialect: 'postgresql',        // Directory where migrations or outputs will be stored
  dbCredentials: {
    url: 'postgresql://neondb_owner:DkAxI9cR7PFy@ep-plain-sky-a5g80ble.us-east-2.aws.neon.tech/neondb?sslmode=require', // Use your environment variable
  },
});
