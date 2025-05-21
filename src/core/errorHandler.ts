import { Page } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { config } from './config';
import { log } from './logger';

/**
 * Captures a full-page screenshot when an error occurs and saves it with a timestamped filename.
 *
 * @param page - Playwright Page instance
 * @param name - Identifier for the screenshot filename
 */
export const captureErrorScreenshot = async (page: Page, name: string): Promise<void> => {
  const screenshotDir: string = config.screenshotPath?.trim() || 'screenshots';

  // Fallback and sanitization for filename
  const baseName = typeof name === 'string' && name.trim() !== '' ? name.trim() : 'error';
  const safeName = baseName.replace(/[^a-zA-Z0-9-_]/g, '_');

  const timestamp = new Date().toISOString()
    .replace(/T/, '_')
    .replace(/:/g, '-')
    .split('.')[0];

  const filename = `${safeName}-${timestamp}.png`;
  const filePath = path.join(screenshotDir, filename);

  try {
    await fs.mkdir(screenshotDir, { recursive: true });
    await page.screenshot({ path: filePath, fullPage: true });
    log.info(`Screenshot saved: ${filePath}`);
  } catch (error) {
    log.error(`Failed to capture screenshot: ${(error as Error).message}`);
  }
};
