import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AppService {
  async screenshot(url: string): Promise<string> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const folderPath = path.join(__dirname, '..', 'screenshots');
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    const filePath = path.join(folderPath, `${Date.now()}.png`);
    await page.screenshot({ path: filePath });

    await browser.close();
    return filePath;
  }
}
