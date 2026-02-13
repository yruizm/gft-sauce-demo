import { Before, After } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from 'playwright';
import { CustomWorld } from './world';
import fs from 'fs';
import path from 'path';

Before(async function (this: CustomWorld, scenario) {

  this.browser = await chromium.launch({
    headless: process.env.HEADLESS === 'true'
  });

  this.context = await this.browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: 'reports/videos',
      size: { width: 1920, height: 1080 }
    }
  });

  this.page = await this.context.newPage();

  this.scenarioName = scenario.pickle.name
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '_')
    .toLowerCase();
});

After(async function (this: CustomWorld, scenario) {

  const videoPath = await this.page.video()?.path();

  // 📸 SOLO si falla
  if (scenario.result?.status === 'FAILED') {

    const screenshotBuffer = await this.page.screenshot({
      fullPage: true
    });

    // 🔥 Adjuntar al reporte HTML
    await this.attach(screenshotBuffer, 'image/png');

    // Guardar físicamente también
    const screenshotsDir = 'reports/screenshots';
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(screenshotsDir, `${this.scenarioName}.png`),
      screenshotBuffer
    );

    console.log('📸 Screenshot adjuntado y guardado');
  }

  await this.context.close();
  await this.browser.close();

  // 🎥 Guardar video siempre
  if (videoPath) {

    const finalDir = 'reports/videos';
    if (!fs.existsSync(finalDir)) {
      fs.mkdirSync(finalDir, { recursive: true });
    }

    const newPath = path.join(finalDir, `${this.scenarioName}.webm`);
    fs.renameSync(videoPath, newPath);

    console.log('🎥 Video guardado:', newPath);
  }
});