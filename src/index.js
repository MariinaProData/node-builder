import { createServer } from "node:http";
import { access } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import { renderIndexPage } from "./routes/index.js";
import { renderCss } from "./routes/css.js";
import { renderSprite } from "./routes/sprite.js";

const STATIC_MIME_TYPES = {
	".css": "text/css; charset=utf-8",
	".jpg": "image/jpeg",
	".js": "application/javascript; charset=utf-8",
	".png": "image/png",
	".ico": "image/x-icon",
	".svg": "image/svg+xml; charset=utf-8",
	".txt": "plain/text; charset=utf-8",
	".webmanifest": "application/json; charset=utf-8",
	".webp": "image/webp",
	".woff2": "application/font-woff2",
};

const ROUTES = {
	"/index.html": renderIndexPage,
	"/css/style.css": renderCss,
	"/img/sprite.svg": renderSprite,
};

let sseData = "reload";
const staticExtensions = new Set(Object.keys(STATIC_MIME_TYPES));

global.html = (raw, ...values) => {
	return String.raw({ raw }, ...values);
};

function sendReload(res) {
	res.writeHead(200, {
		"Content-Type": "text/event-stream",
		"Cache-Control": "no-cache",
		Connection: "keep-alive",
	});
	res.write(`retry: 33\ndata: ${sseData}\nid: ${Date.now()}\n\n`);
	sseData = "";
}

const server = createServer(async (req, res) => {
	const { pathname } = new URL(`https://localhost:3333${req.url}`);
	const ext = path.extname(pathname);

	if (req.url === "/dev/watch") {
		sendReload(res);
		return;
	}

	res.writeHead(200, { "Content-Type": STATIC_MIME_TYPES[ext] || "text/html" });

	if (!ROUTES[pathname] && staticExtensions.has(ext)) {
		try {
			const folder = pathname.startsWith("/pixelperfect") ? "./" : "./public";
			const filePath = path.join(process.cwd(), folder, pathname);
			await access(filePath);
			createReadStream(filePath).pipe(res);
			return;
		} catch (error) {}
	}

	const template = (await ROUTES[pathname]?.({ DEV: process.env.DEV })) || "";
	res.end(template.trim());
});

server.listen(3333, "localhost", () => {
	console.info(`Сервер запущен по адресу: http://localhost:3333/index.html`);
});
