import { test, expect } from "@playwright/test";

test.describe("ArticleList Component Pagination", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should paginate articles correctly", async ({ page }) => {
    const articlesPerPage = 10; // Assuming 10 articles per page

    // Verify the number of articles on the first page
    const articleItemsLocator = page
      .locator("[data-test-id='article-list']")
      .locator("li");
    const articlesCount = await articleItemsLocator.count();
    expect(articlesCount).toBeLessThanOrEqual(articlesPerPage);

    // Ensure the pagination controls are visible
    const paginationControls = page.getByRole("navigation", {
      name: "Pagination controls",
    });
    await expect(paginationControls).toBeVisible();

    // Check if the "Next" button is visible and click it
    const nextButton = page.getByRole("button", { name: "Next" });
    await expect(nextButton).toBeVisible();
    await nextButton.click();
    await page.waitForTimeout(1000); // Wait for the page to load

    // Verify the number of articles on the second page
    const articlesCountSecondPage = await articleItemsLocator.count();
    expect(articlesCountSecondPage).toBeLessThanOrEqual(articlesPerPage);

    // Check if the "Previous" button is visible and click it
    const prevButton = page.getByRole("button", { name: "Previous" });
    await expect(prevButton).toBeVisible();
    await prevButton.click();
    await page.waitForTimeout(1000); // Wait for the page to load

    // Verify the number of articles on the first page again
    const articlesCountFirstPageAgain = await articleItemsLocator.count();
    expect(articlesCountFirstPageAgain).toBeLessThanOrEqual(articlesPerPage);
  });
});
