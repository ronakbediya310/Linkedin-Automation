import { BrowserContext } from 'playwright';
import fs from 'fs';
import path from 'path';
import { config } from './config';
import { log } from './logger';

/**
 * Returns the full file path to store session cookies for a specific site.
 * @param site - Name of the site (e.g., 'linkedin')
 */
const sessionFile = (site: string): string =>
  path.join(config.sessionPath ?? 'sessions', `${site}.json`);

/**
 * Saves cookies from the given browser context to a session file.
 * Useful for maintaining login state across runs.
 * @param context - Playwright BrowserContext instance
 * @param site - Site identifier
 */
export const saveSession = async (context: BrowserContext, site: string): Promise<void> => {
  try {
    const cookies = await context.cookies();

    fs.mkdirSync(config.sessionPath ?? 'sessions', { recursive: true });
    fs.writeFileSync(sessionFile(site), JSON.stringify(cookies, null, 2));
    log.info(`💾 Session saved: ${sessionFile(site)}`);
  } catch (error) {
    log.error(`❌ Failed to save session for ${site}: ${(error as Error).message}`);
  }
};

/**
 * Loads cookies from a session file into the given browser context.
 * Automatically skips if no session file exists.
 * @param context - Playwright BrowserContext instance
 * @param site - Site identifier
 */
export const loadSession = async (context: BrowserContext, site: string): Promise<void> => {
  const filePath = sessionFile(site);

  if (!fs.existsSync(filePath)) {
    log.warn(`⚠️ No session found for ${site}, starting fresh.`);
    return;
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const cookies = JSON.parse(raw);
    await context.addCookies(cookies);
    log.info(`✅ Session loaded: ${filePath}`);
  } catch (error) {
    log.error(`❌ Failed to load session for ${site}: ${(error as Error).message}`);
  }
};
