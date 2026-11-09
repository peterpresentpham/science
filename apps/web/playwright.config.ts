import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: `http://localhost:${PORT}`, trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Test chạy trên bản build tĩnh (out/), giống hệt khi deploy
  webServer: {
    command: `pnpm exec serve out -l ${PORT} --no-clipboard`,
    url: `http://localhost:${PORT}/vi/`,
    reuseExistingServer: !process.env.CI,
  },
});
