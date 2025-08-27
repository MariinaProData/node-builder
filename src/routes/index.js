import data from "../data/index.js";
import { renderLayout } from "../layout.js";

export async function renderIndexPage({ DEV }) {
	const template = html`
		<section class="container">
			<h1>${data.title}</h1>
		</section>
	`;

	return renderLayout({ DEV, data, template });
}
