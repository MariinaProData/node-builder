export function renderIcon({
	className,
	name,
	width = 16,
	height = width,
} = {}) {
	return html`
		<svg
			${className ? `class="${className}"` : ""}
			width="${width}"
			height="${height}"
			aria-hidden="true"
			focusable="false"
		>
			<use href="img/sprite.svg#${name}" />
		</svg>
	`;
}
