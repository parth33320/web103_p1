const { test, expect } = require('@playwright/test');

test.describe('Top 10 Agentic AI Frameworks Listicle E2E & Verification Tests', () => {

  test('Front page renders all 10 agentic AI listicle items with Pico.css styling', async ({ page }) => {
    await page.goto('/');

    // Check main heading
    await expect(page.locator('h1')).toContainText('Top 10 Agentic AI Frameworks');

    // Verify exactly 10 cards rendered initially
    const cards = page.locator('.item-card');
    await expect(cards).toHaveCount(10);

    // Verify first item is LangGraph
    await expect(cards.first().locator('.card-title')).toContainText('LangGraph');
  });

  test('Filtering and searching works correctly in the card grid', async ({ page }) => {
    await page.goto('/');

    // Search for "protocol"
    await page.fill('#searchInput', 'protocol');
    const filteredCards = page.locator('.item-card');
    await expect(filteredCards).toHaveCount(1);
    await expect(filteredCards.first().locator('.card-title')).toContainText('Model Context Protocol');

    // Clear search and filter by Category "Compute & Inference"
    await page.fill('#searchInput', '');
    await page.selectOption('#categoryFilter', 'Compute & Inference');
    await expect(filteredCards).toHaveCount(1);
    await expect(filteredCards.first().locator('.card-title')).toContainText('Groq');
  });

  test('Quick Preview Modal overlay opens and displays highlights', async ({ page }) => {
    await page.goto('/');

    // Click "Quick Preview" on first item (LangGraph)
    await page.locator('.item-card').first().locator('button.preview-btn').click();

    // Check modal visibility and content
    const modal = page.locator('#previewModal');
    await expect(modal).toHaveClass(/active/);
    await expect(modal.locator('h2')).toContainText('LangGraph');
    await expect(modal.locator('ul.feature-list')).toBeVisible();

    // Close modal
    await page.click('#modalCloseBtn');
    await expect(modal).not.toHaveClass(/active/);
  });

  test('Each list item navigates to its dedicated detail page', async ({ page }) => {
    await page.goto('/');

    // Click "Full Page ->" for MCP (item #2)
    const mcpCard = page.locator('.item-card[data-id="mcp"]');
    await mcpCard.locator('a[href*="item.html"]').click();

    // Verify navigation to item.html?id=mcp
    await expect(page).toHaveURL(/item\.html\?id=mcp/);
    await expect(page.locator('h1')).toContainText('Model Context Protocol (MCP)');

    // Verify technical specs section
    await expect(page.locator('.specs-grid')).toBeVisible();
    await expect(page.locator('.specs-grid')).toContainText('TypeScript / Python / Go');

    // Click Return to Listicle
    await page.click('a:has-text("Return to Listicle")');
    await expect(page).toHaveURL(/\/$/);
  });

  test('API Endpoint Security & Audit Logging Verification', async ({ request }) => {
    // Test API GET /api/items
    const res = await request.get('/api/items');
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.total).toBe(10);

    // Test API GET /api/items/langgraph
    const resItem = await request.get('/api/items/langgraph');
    expect(resItem.status()).toBe(200);

    // Test 404 for invalid item ID
    const resNotFound = await request.get('/api/items/non-existent-tool-id');
    expect(resNotFound.status()).toBe(404);

    // Verify audit log endpoint returns recorded requests
    const resAudit = await request.get('/api/audit-logs');
    expect(resAudit.status()).toBe(200);
    const auditData = await resAudit.json();
    expect(auditData.count).toBeGreaterThan(0);
  });

});
