const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
	await page.goto("http://localhost:3000");
	await page.waitForLoadState("domcontentloaded", { timeout: 15000 });
});

test("1280x720", async ({ page }) => {
	await new Promise((e) => setTimeout(e, 2000));
	expect(await page.screenshot()).toMatchSnapshot();
});
