import time
from playwright.sync_api import sync_playwright

def run_cuj(page):
    page.goto("http://localhost:3000")
    page.wait_for_timeout(1000)

    # Search
    page.fill("#searchInput", "LangGraph")
    page.wait_for_timeout(1000)
    page.fill("#searchInput", "")
    page.wait_for_timeout(500)

    # Open Modal Preview
    page.locator(".item-card").first.locator("button.preview-btn").click()
    page.wait_for_timeout(1000)

    # Take screenshot of preview modal
    page.screenshot(path="verification/screenshots/verification.png")

    # Close modal
    page.click("#modalCloseBtn")
    page.wait_for_timeout(500)

    # Navigate to detail page
    page.locator('.item-card[data-id="mcp"]').locator('a[href*="item.html"]').click()
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
