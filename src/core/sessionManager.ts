// src/core/sessionManager.ts

import { BrowserContext } from 'playwright';
import fs from 'fs';
import path from 'path';
import { config } from './config';
import { log } from './logger';

/**
 * Returns the full file path where session cookies will be stored.
 * @param site - Name of the site (e.g., 'linkedin')
 */
const getSessionFilePath = (site: string): string => {
  const sessionDir = config.sessionPath || 'sessions';
  return path.join(sessionDir, `${site}.json`);
};

/**
 * Saves browser context cookies to a session file.
 * This allows preserving login state between automation runs.
 *
 * @param context - Playwright browser context
 * @param site - Identifier of the site (e.g., 'linkedin')
 */
export const saveSession = async (context: BrowserContext, site: string): Promise<void> => {
  try {
    const cookies = await context.cookies();
    const filePath = getSessionFilePath(site);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(cookies, null, 2));

    log.info(`Session saved to: ${filePath}`);
  } catch (error) {
    log.error(`Failed to save session for "${site}": ${(error as Error).message}`);
  }
};

/**
 * Loads cookies from a session file and injects them into the browser context.
 * Skips loading if the session file does not exist.
 *
 * @param context - Playwright browser context
 * @param site - Identifier of the site (e.g., 'linkedin')
 */
export const loadSession = async (context: BrowserContext, site: string): Promise<void> => {
  const filePath = getSessionFilePath(site);

  if (!fs.existsSync(filePath)) {
    log.warn(`Session file not found for "${site}". A fresh session will be used.`);
    return;
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const cookies = JSON.parse(raw);
    await context.addCookies(cookies);

    log.info(`Session loaded from: ${filePath}`);
  } catch (error) {
    log.error(`Failed to load session for "${site}": ${(error as Error).message}`);
  }
};
