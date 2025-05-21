# LinkedIn Automation with Playwright

Automate LinkedIn login and browser interactions with Playwright using human-like typing behavior, session management, and error handling.

---

## Features

- Headless or headed browser automation using Playwright
- Human-like typing with randomized delays to mimic real user behavior
- Session management: save and load cookies to maintain login state
- Error handling with screenshots for easier debugging
- Configurable via environment variables and CLI arguments
- Detailed logging with color-coded console output and file logging

---

## Requirements

- Node.js v16 or later
- npm
- A LinkedIn account with valid credentials

---

## Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/ronakbediya310/Linkedin-Automation.git
   cd Linkedin-Automation
   ```
2. Install dependencies:
    ```bash
   npm install
   ```
3. Create a .env file in the project root and add your LinkedIn credentials;


## Usage
 ```bash
   npx ts-node src/main.ts --site linkedin --headless
   ```
   - Options:

      -  --site: Specify the site to automate (currently supports linkedin)

      -  --headless: Run browser in headless mode (default is false)

