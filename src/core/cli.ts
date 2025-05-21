import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/**
 * Parses command-line arguments using yargs.
 * Supports options like --site and --headless.
 */
export const args = yargs(hideBin(process.argv))
  .scriptName('web-automation')
  .usage('Usage: $0 --site <site> [--headless]')
  .option('site', {
    type: 'string',
    demandOption: true,
    choices: ['linkedin'], // Add more options here: ['linkedin', 'gmail']
    description: 'Site to automate (e.g. linkedin)',
  })
  .option('headless', {
    type: 'boolean',
    default: false,
    description: 'Run the browser in headless mode',
  })
  .strict() // Disallow unknown args
  .help()
  .alias('help', 'h')
  .parseSync();
