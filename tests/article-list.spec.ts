import { test, expect } from "@playwright/test";

test.describe("ArticleList Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should render the article list and articles", async ({ page }) => {
    // Wait for the article list to be visible
    const articleListLocator = page.locator('[data-test-id="article-list"]');
    await expect(articleListLocator).toBeVisible();

    // Check the number of articles in the list
    const articleItemsLocator = articleListLocator.locator(
      '[data-test-id^="article-item-"]'
    );
    const articleCount = await articleItemsLocator.count();

    // Expect at least one article to be present
    expect(articleCount).toBeGreaterThan(0);

    // Optionally, check the content of the first article
    const firstArticleLocator = articleItemsLocator.first();
    await expect(firstArticleLocator.locator("h2")).toHaveText(/.+/);
    await expect(firstArticleLocator.locator("p")).toHaveCount(2); // Check for author and date paragraphs
  });
});
