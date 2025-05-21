// src/core/logger.ts

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

/**
 * Path to the log file where all logs will be persisted.
 * You can change this or configure via environment variables if needed.
 */
const logFilePath = path.resolve(__dirname, '../../logs/app.log');

/**
 * Ensure the log directory exists to prevent write failures.
 */
const logDir = path.dirname(logFilePath);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

/**
 * Writes a formatted log entry to the file with a timestamp.
 * If writing fails, logs an error to the console.
 *
 * @param level - Log level (INFO, ERROR, etc.)
 * @param msg - Log message
 */
const appendToFile = (level: string, msg: string): void => {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] [${level}] ${msg}\n`;

  fs.appendFile(logFilePath, logLine, (err) => {
    if (err) {
      console.error(chalk.red(`[LOGGER ERROR] Failed to write to log file: ${err.message}`));
    }
  });
};

/**
 * Logger object for standardized logging across the application.
 * Logs messages both to the console (with color) and to a persistent file.
 */
export const log = {
  info: (msg: string): void => {
    console.log(`${chalk.blue('[INFO]')} ${msg}`);
    appendToFile('INFO', msg);
  },

  success: (msg: string): void => {
    console.log(`${chalk.green('[SUCCESS]')} ${msg}`);
    appendToFile('SUCCESS', msg);
  },

  error: (msg: string): void => {
    console.error(`${chalk.red('[ERROR]')} ${msg}`);
    appendToFile('ERROR', msg);
  },

  warn: (msg: string): void => {
    console.warn(`${chalk.yellow('[WARN]')} ${msg}`);
    appendToFile('WARN', msg);
  },
};
