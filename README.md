- [Setup](#setup)

# Setup
1. Install [nodejs & npm](https://nodejs.org/en/) 
2. Clone this repo
3. Run these commands in the project root folder:
   1. `npm i`
   2. `npm i -g ts-node`
   3. `npx playwright install --with-deps`
   *if you encounter an `EACCESS` error - try the same command with `sudo` at the beginning
4. Run `npm run template` - if test passes then you did everything right :)
5. HTML report is published at https://alexzavg.github.io/playwright_automation_showcase/
6. See available commands in `package.json`