const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log('BROWSER LOG:', msg.text());
  });
  
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 10000 });
    
    const count = await page.evaluate(async () => {
       // Wait for elements to appear
       await new Promise(r => setTimeout(r, 2000));
       // Get all resident elements
       const els = document.querySelectorAll('.group.block.w-full.text-left');
       return els.length;
    });
    console.log("RESIDENT CARDS COUNT:", count);
    
  } catch (e) {
    console.error('Goto error', e.message);
  }
  await browser.close();
})();
