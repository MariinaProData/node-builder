import "../src/index.js";
import { writeFile } from "node:fs/promises";

await Promise.all(
	["index.html", "css/style.css", "img/sprite.svg"].map((file) =>
		fetch(`http://localhost:3333/${file}`)
			.then((res) => res.text())
			.then(async (text) => await writeFile(`./public/${file}`, text))
	)
);

process.exit();
