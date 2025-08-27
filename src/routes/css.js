import { readFile, readdir } from "node:fs/promises";

const cache = {};

const stylesheets = ["global.css", ...(await readdir("./src/style/blocks"))];

await Promise.all(
  stylesheets.map(async (name) => {
    const dir = name === "global.css" ? "" : "/blocks";
    try {
      cache[name] = await readFile(`./src/style${dir}/${name}`, "utf-8");
    } catch (error) {}
  })
);
export async function renderCss() {
  return stylesheets
    .map((name) => {
      return cache[name];
    })
    .join("\n");
}
