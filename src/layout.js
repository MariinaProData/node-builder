import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import layoutData from "./data/layout.js";

export async function renderLayout({ DEV, data, template }) {
	return html`
		<!DOCTYPE html>
		<html lang="ru">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>
					${layoutData.projectName} : ${data.title || "Страница не найдена"}
				</title>
				<link rel="stylesheet" href="css/style.css" />
				${DEV
					? html`
							<script src="js/dev.js"></script>
							<script></script>
							<script
								src="https://efiand.github.io/pixelperfect-tool/pixelperfect.min.js"
								defer
							></script>
					  `
					: ""}
			</head>
			<body>
				${renderHeader()}

				<main>${template}</main>

				${renderFooter()}
			</body>
		</html>
	`;
}
