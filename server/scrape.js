const puppeteer = require("puppeteer");

async function scrapePost(url) {
    const browser = await puppeteer.launch({
        headless: "new", // true in prod
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    // Wait for tweet container
    await page.waitForSelector("article");

    const data = await page.evaluate(() => {
        const tweet = document.querySelector("article");

        // Profile + text
        const profile_img = tweet.querySelector('img[src*="profile_images"]')?.src || "";
        const nameSpans = tweet.querySelectorAll('div[dir="ltr"] span');
        const displayName = nameSpans?.[0]?.textContent || "";
        const handleAnchor = Array.from(tweet.querySelectorAll("a"))
            .find(a => a.getAttribute("href")?.match(/^\/[^\/]+$/)); // matches "/elonmusk", not "/status/123..."
        const handle = handleAnchor?.getAttribute("href")?.replace("/", "") || "";

        // Extract tweet text as HTML to preserve emojis
        const tweetTextHTML = tweet.querySelector('div[data-testid="tweetText"]')?.innerHTML || "";

        // Clean emoji images (Twemoji) and convert to Unicode if needed
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tweetTextHTML;

        tempDiv.querySelectorAll("img").forEach(img => {
            const alt = img.getAttribute("alt") || "";
            img.replaceWith(document.createTextNode(alt));
        });
        const text = tempDiv.innerText;

        // Extract media
        const mediaNodes = tweet.querySelectorAll('img[src*="twimg.com/media"], img[src*="ext_tw_video_thumb"]');
        const media = [...mediaNodes].map(img => {
            return {
                url: img.src,
                type: img.src.includes("video_thumb") ? "video" : "image"
            };
        });

        return { displayName, handle, text, profile_img, media };
    });


    await browser.close();
    return data;
}

module.exports = scrapePost;
