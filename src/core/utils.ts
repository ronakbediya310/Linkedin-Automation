import { Page } from 'playwright';

/**
 * Generates a random delay (in milliseconds) between min and max.
 * @param min Minimum delay in ms (default 300ms)
 * @param max Maximum delay in ms (default 1500ms)
 */
export const randomDelay = async (min = 300, max = 1500): Promise<void> => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

/**
 * Types the provided text into the given selector on the page,
 * simulating human typing with randomized delay between keystrokes.
 *
 * @param page Playwright Page object
 * @param selector Selector string to type into
 * @param text Text to type
 * @param charDelayMin Minimum delay between keystrokes in ms (default 100)
 * @param charDelayMax Maximum delay between keystrokes in ms (default 300)
 */
export const typeWithDelay = async (
  page: Page,
  selector: string,
  text: string,
  charDelayMin = 100,
  charDelayMax = 300
): Promise<void> => {
  try {
    for (const char of text) {
      const delay = Math.floor(Math.random() * (charDelayMax - charDelayMin + 1)) + charDelayMin;
      await page.type(selector, char, { delay });
      // Small pause between characters for extra naturalness
      await randomDelay(50, 150);
    }
  } catch (error) {
    console.error(`❌ Error typing into selector "${selector}":`, error);
    throw error;
  }
};
