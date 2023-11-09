// docs https://playwright.dev/docs/test-advanced#global-setup-and-teardown

import { FullConfig } from "@playwright/test";
import dotenv from "dotenv";

async function globalSetup(config: FullConfig) {
  
  if(process.env.test_env) {

    // Use env-specific config
    dotenv.config({
      path: `.env.${process.env.test_env}`, // set path to parent project config
      override: true
    })

  }

}

export default globalSetup;