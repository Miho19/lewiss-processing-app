/// <reference types="vitest" />

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // configuration options
    globals: true, // Optional: allows use of 'describe', 'it', 'expect' without importing
  },
});
