import { expect, Page, TestInfo } from "@playwright/test";

export function baseURL() {
  let baseURLEnv: string;
  switch (process.env.ENV) {
    case "docker":
      baseURLEnv = "http://host.docker.internal:4400";
      break;
    case "stage":
      baseURLEnv = ""; //To set
      break;
    default:
      baseURLEnv = "http://localhost:4400";
      break;
  }
  return baseURLEnv;
}

export async function expectToMatchSnapshot(
  page: Page,
  testInfo: TestInfo,
  component: string,
  story: string,
  i: number,
  name: string
) {
  if (testInfo.retry > 0 || testInfo.config.updateSnapshots === "all")
    await page.waitForTimeout(1000);
  expect(await page.screenshot({ animations: "disabled" })).toMatchSnapshot(
    `${component}-${story.split("--")[1]}-${name}-${i}.png`
  );
}
