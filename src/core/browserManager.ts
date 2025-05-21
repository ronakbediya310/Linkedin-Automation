// src/core/browserManager.ts

import {
  chromium,
  Browser,
  Page,
  BrowserContext,
  LaunchOptions,
} from "playwright";
import { config } from "./config";
import { log } from "./logger";

/**
 * Initializes and launches a Chromium browser instance using provided configuration.
 *
 * @returns An object containing the browser instance, browser context, and a new page.
 */
export const launchBrowser = async (): Promise<{
  browser: Browser;
  context: BrowserContext;
  page: Page;
}> => {
  const launchOptions: LaunchOptions = {
    headless: config.headless ?? true,
    slowMo: config.slowMo ?? 100,
  };

  try {
    // Launch the browser with specified options (e.g. headless mode, slowMo delay)
    log.info("Launching Chromium browser...");
    const browser: Browser = await chromium.launch(launchOptions);

    // Create a new isolated browser context for independent sessions
    const context: BrowserContext = await browser.newContext();

    // Open a new tab (page) within the created context
    const page: Page = await context.newPage();

    log.success("Browser launched successfully");

    return { browser, context, page };
  } catch (error) {
    // Handle and log errors during browser launch
    log.error(`Failed to launch browser: ${(error as Error).message}`);
    throw new Error(
      "Browser launch failed. Check your configuration settings."
    );
  }
};
