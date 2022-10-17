// type "npm test" on terminal to start spammer

import { faker } from "@faker-js/faker";
import puppeteer from "puppeteer";

// registration form's URL
const APP = "https://b2b-fair.online/profiles-add/";

//spammer settings
const registrationsCount = 100;
const delay = registrationsCount * 7000;

// browser settings
let page;
let browser;
const width = 1920;
const height = 1080;

//init spammer function
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 0,
    args: [`--window-size=${width},${height}`],
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});
afterAll(() => {
  browser.close();
});

//spam script
describe("Registration form", () => {
  test(
    "spam registration form",
    async () => {
      for (let i = 0; i <= registrationsCount; i++) {
        const lead = {
          company: faker.company.name(),
          name: faker.name.firstName(),
          secondName: faker.name.lastName(),
          phone: faker.phone.number(`89#########`),
          email: faker.internet.email(),
          password: "1234567890",
        };

        await page.goto(APP);
        await page.waitForSelector(".clearfix");
        await page.click("#elm_8", { clickCount: 3 });
        await page.type("#elm_8", lead.company);
        await page.click("#elm_6", { clickCount: 3 });
        await page.type("#elm_6", lead.name);
        await page.click("#elm_7", { clickCount: 3 });
        await page.type("#elm_7", lead.secondName);
        await page.click("#elm_9", { clickCount: 3 });
        await page.type("#elm_9", lead.phone);
        await page.click("#email", { clickCount: 3 });
        await page.type("#email", lead.email);
        await page.click("#password1", { clickCount: 3 });
        await page.type("#password1", lead.password);
        await page.click("#password2", { clickCount: 3 });
        await page.type("#password2", lead.password);
        await page.click("#gdpr_agreements_user_registration");
        await page.click("#elm_8");
        await page.click("#gdpr_agreements_newsletters_subscribe");
        page.keyboard.press("Enter");
        await page.waitForSelector(".alert-warning");
      }
    },
    delay
  );
});
