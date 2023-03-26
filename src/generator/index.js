/**
 * @iamdual/html2pdf
 * @author Ekin Karadeniz <iamdual@icloud.com>
 * @source https://github.com/iamdual/html2pdf
 */

const puppeteer = require('puppeteer');
const chromiumPath = process.env.CHROMIUM_PATH ? process.env.CHROMIUM_PATH : undefined;

module.exports = async function generator(config) {

    // Create a browser instance
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: chromiumPath,
    });

    // Create a new page
    const page = await browser.newPage();

    // Set timeout
    page.setDefaultNavigationTimeout(config.timeout * 1000);

    // Set JavaScript enabled
    await page.setJavaScriptEnabled(config.javascript);

    // Set CSS media type
    await page.emulateMediaType(config.mediaType);

    if (config.isUrl) {
        // https://pptr.dev/api/puppeteer.page.goto
        await page.goto(config.source, { waitUntil: 'networkidle0' });
    } else {
        // https://pptr.dev/api/puppeteer.page.setcontent
        await page.setContent(config.source, { waitUntil: 'networkidle0' });
    }

    // https://pptr.dev/api/puppeteer.pdfoptions
    const pdf = await page.pdf({
        timeout: config.timeout * 1000,
        pageRanges: config.pageRanges,
        printBackground: config.printBackground,
        format: config.format,
        width: config.width,
        height: config.height,
        scale: config.scale,
        landscape: config.landscape,
        margin: {
            top: config.margin.top,
            right: config.margin.right,
            bottom: config.margin.bottom,
            left: config.margin.left,
        },
    });

    // Close the browser instance
    await browser.close();

    return pdf;
}
