const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const { URL } = require('url');
const path = require('path');
const fs = require('fs');
const customConfig = require('./config');
function generateReport(runnerResult) {
    const now = new Date();
    const Y = now.getFullYear();
    const M = now.getMonth();
    const D = now.getDate();
    const H = now.getHours();
    const m = now.getMinutes();
    const filename = `lhr-report@${Y}-${M + 1 < 10 ? '0' + (M + 1) : M + 1}-${D}-${H}-${m}.html`;
    const htmlReportPath = path.join(__dirname, filename);
    fs.writeFileSync(htmlReportPath, runnerResult.report, 'utf8')
}
(async () => {
    const url = 'https://m.toutiao.com/search?keyword=%E5%88%98%E5%BE%B7%E5%8D%8E&source=search_history&pd=synthesis&original_source=';
    const browser = await puppeteer.launch({
        headless: false, // 调试时设为 false，可显式的运行Chrome
        defaultViewport: null,
    });
    const lhr = await lighthouse(
        url,
        {
            port: (new URL(browser.wsEndpoint())).port,
            output: 'html',
            logLevel: 'info'
        },
        customConfig
    );
    generateReport(lhr);
    await browser.close();
})();