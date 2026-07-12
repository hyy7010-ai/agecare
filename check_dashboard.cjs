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
    
    // Click Caregiver
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const caregiverBtn = btns.find(b => b.textContent.includes('Caregiver') || b.textContent.includes('护工'));
      if (caregiverBtn) caregiverBtn.click();
    });
    
    await new Promise(r => setTimeout(r, 1000));
    
    // Click Login
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const loginBtn = btns.find(b => b.type === 'submit');
      if (loginBtn) loginBtn.click();
    });
    
    await new Promise(r => setTimeout(r, 3000));
    
  } catch (e) {
    console.error('Goto error', e.message);
  }
  await browser.close();
})();
