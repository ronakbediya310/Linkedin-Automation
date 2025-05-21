import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// Log file path (you can customize or move this to config)
const logFilePath = path.resolve(__dirname, '../../logs/app.log');

// Ensure log directory exists
const logDir = path.dirname(logFilePath);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Utility to append message to log file with timestamp
const appendToFile = (level: string, msg: string) => {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] [${level}] ${msg}\n`;
  fs.appendFile(logFilePath, logLine, (err) => {
    if (err) {
      // If writing to file fails, fallback to console.error
      console.error(chalk.red(`[LOGGER ERROR] Failed to write to log file: ${err.message}`));
    }
  });
};

export const log = {
  info: (msg: string) => {
    console.log(`${chalk.blue('[INFO]')} ${msg}`);
    appendToFile('INFO', msg);
  },
  success: (msg: string) => {
    console.log(`${chalk.green('[SUCCESS]')} ${msg}`);
    appendToFile('SUCCESS', msg);
  },
  error: (msg: string) => {
    console.error(`${chalk.red('[ERROR]')} ${msg}`);
    appendToFile('ERROR', msg);
  },
  warn: (msg: string) => {
    console.warn(`${chalk.yellow('[WARN]')} ${msg}`);
    appendToFile('WARN', msg);
  },
};
