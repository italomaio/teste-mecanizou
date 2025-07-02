import { test, expect } from "@playwright/test";

test("Should login, navigate to products, open a product and logout", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/", {
    waitUntil: "domcontentloaded",
  });

  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();

  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Login" })).toBeEnabled();

  await page.getByRole("button", { name: "Login" }).click();

  expect(page.getByLabel(/Login form errors/i)).toBeVisible();

  await page.getByRole("textbox", { name: "email" }).fill("teste@teste.com");
  await page.getByRole("textbox", { name: "password" }).fill("123456");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/products/);

  await page.waitForLoadState("networkidle");

  const paginationButton = page.getByLabel(/Go to page 2/i);
  await expect(paginationButton).toBeDefined();
  await paginationButton.click();

  await page.waitForLoadState("networkidle");

  const product = page.getByRole("link", { name: /View product 11/i }).first();
  await expect(product).toBeDefined();
  await product.click();

  await page.waitForLoadState("networkidle");

  await expect(page).toHaveURL(/products\/11/);
  await page.getByRole("button", { name: /User menu/i }).click();

  const logoutOption = page.getByRole("menuitem", { name: /Logout/i });
  await expect(logoutOption).toBeVisible();

  await logoutOption.click();
  await expect(page).toHaveURL(/auth/);
});
