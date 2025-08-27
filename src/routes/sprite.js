import { readFile, readdir } from "node:fs/promises";

const cache = {};

const icons = await readdir("./src/icons");

await Promise.all(
	icons.map(async (name) => {
		try {
			cache[name] = (await readFile(`./src/icons/${name}`, "utf-8")).replace(
				"<svg",
				`<svg id="${name.replace(".svg", "")}"`
			);
		} catch (error) {}
	})
);

export async function renderSprite() {
	return html`
		<svg xmlns="http://www.w3.org/2000/svg">
			<style>
				:root svg:not(:target) {
					display: none;
				}
			</style>
			${icons.map((name) => cache[name]).join("\n\n")}
		</svg>
	`;
}
