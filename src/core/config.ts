import dotenv from 'dotenv';
dotenv.config();

export const config = {
  headless: process.env.HEADLESS === 'true',
  screenshotPath: 'screenshots/',
  sessionPath: 'sessions/',
  slowMo: 100,
};
