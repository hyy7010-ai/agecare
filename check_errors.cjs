const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log('BROWSER LOG:', msg.type(), msg.text());
  });
  
  page.on('pageerror', error => {
    console.error('PAGE UNCAUGHT EXCEPTION:', error.message);
  });
  
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 10000 });
  } catch (e) {
    console.error('Goto error', e.message);
  }
  await browser.close();
})();
