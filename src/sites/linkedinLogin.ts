/**
 * LinkedIn login automation using Playwright with human-like behavior and robust error handling.
 */

import { Page } from 'playwright';
import { typeWithDelay, randomDelay } from '../core/utils';
import dotenv from 'dotenv';
import { log } from '../core/logger';

dotenv.config();

const EMAIL: string = process.env.LINKEDIN_EMAIL ?? '';
const PASSWORD: string = process.env.LINKEDIN_PASSWORD ?? '';

if (!EMAIL || !PASSWORD) {
  throw new Error('Missing LinkedIn credentials in .env file');
}

/**
 * Automates the LinkedIn login process with human-like typing and delays.
 *
 * @param page - Playwright Page instance for browser automation
 * @throws Will throw an error if login fails or elements are not found in time
 */
export const loginToLinkedIn = async (page: Page): Promise<void> => {
  try {
    log.info('Navigating to LinkedIn login page...');
    await page.goto('https://www.linkedin.com/login', { waitUntil: 'networkidle' });

    log.info('Waiting for username input to be visible...');
    await page.waitForSelector('input#username', { state: 'visible', timeout: 10000 });

    log.info('Typing username...');
    await page.click('input#username');
    await typeWithDelay(page, 'input#username', EMAIL);

    await randomDelay(800, 1200);

    log.info('Typing password...');
    await page.click('input#password');
    await typeWithDelay(page, 'input#password', PASSWORD);

    await randomDelay(1000, 2000);

    log.info('Submitting login form...');
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }),
      page.click('button[type="submit"]'),
    ]);

    log.success('LinkedIn login successful.');

  } catch (error) {
    log.error(`LinkedIn login failed: ${(error as Error).message}`);
    throw error;
  }
};
