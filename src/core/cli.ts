// src/core/cli.ts

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

/**
 * Parses and validates command-line arguments using yargs.
 *
 * Supported options:
 *  --site <site>: Required. Specify which site to automate.
 *  --headless: Optional. Run browser in headless mode (default: false).
 */
export const args = yargs(hideBin(process.argv))
  .scriptName("web-automation")
  .usage("Usage: $0 --site <site> [--headless]")
  .option("site", {
    type: "string",
    demandOption: true,
    choices: ["linkedin"], // Extend choices here when adding support for more sites
    description: "Target site for automation (e.g., linkedin)",
  })
  .option("headless", {
    type: "boolean",
    default: false,
    description:
      "Run browser in headless mode (useful for CI or background execution)",
  })
  .strict() // Disallow unknown arguments
  .help()
  .alias("help", "h")
  .parseSync();
