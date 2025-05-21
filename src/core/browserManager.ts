import { chromium, Browser, Page, BrowserContext } from 'playwright';
import { config } from './config';

/**
 * Launches a Chromium browser with predefined settings.
 * @returns An object containing the browser instance, context, and page.
 */
export const launchBrowser = async (): Promise<{
  browser: Browser;
  context: BrowserContext;
  page: Page;
}> => {
  try {
    // Launch browser with custom settings (headless, slowMo)
    const browser: Browser = await chromium.launch({
      headless: config.headless ?? true,
      slowMo: config.slowMo ?? 100,
    });

    // Create isolated browser context (cookies, localStorage, etc.)
    const context: BrowserContext = await browser.newContext();

    // Open a new tab/page within the context
    const page: Page = await context.newPage();

    return { browser, context, page };
  } catch (error) {
    console.error('❌ Failed to launch browser:', error);
    throw new Error('Browser launch failed');
  }
};
