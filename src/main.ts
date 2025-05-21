import { args } from './core/cli';
import { log } from './core/logger';
import { captureErrorScreenshot } from './core/errorHandler';
import { saveSession, loadSession } from './core/sessionManager';
import { launchBrowser } from './core/browserManager';
import { loginToLinkedIn } from './sites/linkedinLogin';

async function main(): Promise<void> {
  const { browser, context, page } = await launchBrowser();

  const siteRaw = args.site ?? '';
  const site = siteRaw.toLowerCase();

  log.info(`Starting automation for site: ${site}`);

  try {
    // Attempt to load session/cookies, log but do not fail if unsuccessful
    try {
      await loadSession(context, site);
      log.info(`Session loaded for site: ${site}`);
    } catch (loadError) {
      log.warn(`Failed to load session for site "${site}": ${(loadError as Error).message}`);
    }

    switch (site) {
      case 'linkedin':
        await loginToLinkedIn(page);
        break;
      default:
        log.warn(`No automation implemented for site: ${site}`);
        break;
    }

    // Attempt to save session after automation
    try {
      await saveSession(context, site);
      log.info(`Session saved for site: ${site}`);
    } catch (saveError) {
      log.warn(`Failed to save session for site "${site}": ${(saveError as Error).message}`);
    }

    log.success('Automation completed successfully.');
  } catch (error) {
    log.error(`Automation failed: ${(error as Error).message}`);
    log.error((error as Error).stack || '');

    try {
      await captureErrorScreenshot(page, site);
      log.info('Captured error screenshot.');
    } catch (screenshotError) {
      log.error(`Failed to capture error screenshot: ${(screenshotError as Error).message}`);
    }
  } finally {
    await browser.close();
    log.info('Browser closed.');
  }
}

main().catch((fatalError) => {
  log.error(`Fatal error in automation script: ${(fatalError as Error).message}`);
  process.exit(1);
});
