import { Page } from 'playwright';

/**
 * Waits for a random duration between the given min and max milliseconds.
 *
 * @param min - Minimum delay in milliseconds (default: 300)
 * @param max - Maximum delay in milliseconds (default: 1500)
 */
export const randomDelay = async (min = 300, max = 1500): Promise<void> => {
  const boundedMin = Math.max(0, min);
  const boundedMax = Math.max(boundedMin, max);
  const delay = Math.floor(Math.random() * (boundedMax - boundedMin + 1)) + boundedMin;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

/**
 * Types text into a specified selector on the page, simulating human typing
 * with randomized delays between keystrokes.
 *
 * @param page - Playwright Page instance
 * @param selector - Selector for the input element
 * @param text - Text to type into the element
 * @param charDelayMin - Minimum delay between keystrokes in milliseconds (default: 100)
 * @param charDelayMax - Maximum delay between keystrokes in milliseconds (default: 300)
 */
export const typeWithDelay = async (
  page: Page,
  selector: string,
  text: string,
  charDelayMin = 100,
  charDelayMax = 300
): Promise<void> => {
  if (!selector || typeof selector !== 'string') {
    throw new Error('Invalid selector provided to typeWithDelay.');
  }

  if (!text || typeof text !== 'string') {
    throw new Error('Invalid text provided to typeWithDelay.');
  }

  const boundedMin = Math.max(0, charDelayMin);
  const boundedMax = Math.max(boundedMin, charDelayMax);

  try {
    for (const char of text) {
      const delay = Math.floor(Math.random() * (boundedMax - boundedMin + 1)) + boundedMin;
      await page.type(selector, char, { delay });
      await randomDelay(50, 150);
    }
  } catch (error) {
    throw new Error(`Failed to type text into selector "${selector}": ${(error as Error).message}`);
  }
};
