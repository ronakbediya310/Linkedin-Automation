// src/core/cli.ts

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/**
 * Parses and validates command-line arguments using yargs.
 *
 * Supported options:
 *   --site <site>      Required. Specify which site to automate (e.g., linkedin).
 *   --headless         Optional. Run browser in headless mode (default: false).
 */
export const args = yargs(hideBin(process.argv))
  .scriptName('web-automation')
  .usage('Usage: $0 --site <site> [--headless]')
  .options({
    site: {
      type: 'string',
      choices: ['linkedin'], // Add more supported sites here
      demandOption: true,
      describe: 'Target site for automation',
    },
    headless: {
      type: 'boolean',
      default: false,
      describe: 'Run browser in headless mode',
    },
  })
  .strict() // Disallow unknown arguments
  .help()
  .alias('h', 'help')
  .parseSync();
