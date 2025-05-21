import { args } from './core/cli';
import { log } from './core/logger';
import { captureErrorScreenshot } from './core/errorHandler';
import { saveSession, loadSession } from './core/sessionManager';
import { launchBrowser } from './core/browserManager';
import { loginToLinkedIn } from './sites/linkedinLogin';

(async () => {
  const { browser, context, page } = await launchBrowser();

  const site = args.site?.toLowerCase();

  log.info(`Starting automation for: ${site}`);

  try {
    // Load cookies/session to preserve login state if available
    await loadSession(context, site);

    // Dispatch to site-specific automation
    if (site === 'linkedin') {
      await loginToLinkedIn(page);
    } else {
      log.warn(`No automation implemented for site: ${site}`);
    }

    // Save updated session cookies for next runs
    await saveSession(context, site);

    log.success('Automation completed successfully.');
  } catch (error) {
    log.error(`Automation failed: ${(error as Error).message}`);
    log.error((error as Error).stack || '');

    // Take screenshot for debugging
    try {
      await captureErrorScreenshot(page, site);
    } catch (screenshotError) {
      log.error(`Failed to capture error screenshot: ${(screenshotError as Error).message}`);
    }
  } finally {
    await browser.close();
    log.info('Browser closed.');
  }
})();
