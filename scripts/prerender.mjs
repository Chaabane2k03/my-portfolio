import { createServer } from "node:http";
import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const DIST = fileURLToPath(new URL("../dist", import.meta.url));
const PORT = 4174;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".ico": "image/x-icon",
};

async function serve(dir, port) {
  const server = createServer(async (req, res) => {
    try {
      let pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      let filePath = join(dir, normalize(pathname));
      if (pathname.endsWith("/")) filePath = join(filePath, "index.html");

      let data = await readFile(filePath);
      const mime = MIME[extname(filePath)] || "application/octet-stream";
      res.writeHead(200, { "Content-Type": mime });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });
  await new Promise((resolve) => server.listen(port, resolve));
  return server;
}

const server = await serve(DIST, PORT);
const browser = await puppeteer.launch({ headless: "new" });

try {
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
  );

  await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle0", timeout: 60000 });

  await page.waitForSelector("#hero h1", { timeout: 30000 });
  await page.waitForFunction(
    () => !document.querySelector('[aria-label="Chargement du portfolio"]'),
    { timeout: 30000 }
  );

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 2500));
  await page.waitForSelector("#contact", { timeout: 30000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 800));

  const html = await page.content();
  const target = join(DIST, "index.html");
  await writeFile(target, html, "utf-8");
  console.log(`Prerendered index.html (${(html.length / 1024).toFixed(1)} KB)`);
} finally {
  await browser.close();
  server.close();
}
