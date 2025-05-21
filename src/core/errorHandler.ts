import { Page } from 'playwright';
import fs from 'fs';
import path from 'path';
import { config } from './config';
import { log } from './logger';

/**
 * Captures a full-page screenshot on error and saves it with a timestamped filename.
 *
 * @param page - Playwright Page instance
 * @param name - Short identifier for the screenshot filename
 */
export const captureErrorScreenshot = async (page: Page, name: string): Promise<void> => {
  try {
    const dir = config.screenshotPath ?? 'screenshots';

    // Ensure screenshot directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Format timestamp for filename safety
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}-${timestamp}.png`;
    const filepath = path.join(dir, filename);

    // Take full page screenshot
    await page.screenshot({ path: filepath, fullPage: true });
    log.info(`📸 Screenshot saved: ${filepath}`);
  } catch (error) {
    log.error(`❌ Failed to capture screenshot: ${(error as Error).message}`);
  }
};
