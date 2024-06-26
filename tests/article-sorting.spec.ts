import { test, expect } from "@playwright/test";

test.describe("ArticleList Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should sort articles by date and author", async ({ page }) => {
    const dropdownButton = page.getByRole("button", { name: "Sort by" });

    await expect(dropdownButton).toBeVisible({ timeout: 10000 });

    await dropdownButton.click();

    // Add a delay to see if the menu appears
    await page.waitForTimeout(1000);

    await expect(page.getByRole("menu")).toBeVisible({ timeout: 10000 });

    // Sort by date ascending
    const sortDateButton = page.getByRole("menuitem", { name: /Sort by Date/ });
    await sortDateButton.click();
    await page.waitForTimeout(500); // Wait for the sort to be applied

    // Verify the articles are sorted by date ascending
    const articleItemsLocator = page
      .locator("[data-test-id='article-list']")
      .locator("li");
    const articleDates = await articleItemsLocator.evaluateAll((articles) =>
      articles
        .map((article) =>
          new Date(
            article.querySelector("p:nth-of-type(2)")?.textContent || ""
          ).getTime()
        )
        .filter((date) => !isNaN(date))
    );
    for (let i = 1; i < articleDates.length; i++) {
      expect(articleDates[i]).toBeGreaterThanOrEqual(articleDates[i - 1]);
    }

    // Open the dropdown menu again
    await dropdownButton.click();
    await page.waitForTimeout(1000);
    await expect(page.getByRole("menu")).toBeVisible({ timeout: 10000 });

    // Sort by author ascending
    const sortAuthorButton = page.getByRole("menuitem", {
      name: /Sort by Author/,
    });
    await sortAuthorButton.click();
    await page.waitForTimeout(500); // Wait for the sort to be applied

    // Verify the articles are sorted by author ascending
    const articleAuthors = await articleItemsLocator.evaluateAll((articles) =>
      articles.map(
        (article) =>
          article.querySelector("p:nth-of-type(1)")?.textContent || ""
      )
    );

    for (let i = 1; i < articleAuthors.length; i++) {
      if (articleAuthors[i] && articleAuthors[i - 1]) {
        expect(
          articleAuthors[i].localeCompare(articleAuthors[i - 1])
        ).toBeGreaterThanOrEqual(0);
      }
    }
  });
});
