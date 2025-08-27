const eventSource = new EventSource("/dev/watch");

function onMessage({ data }) {
	if (data === "reload") {
		eventSource.removeEventListener("message", onMessage);
		eventSource.close();
		window.location.reload();
	}
}

eventSource.addEventListener("message", onMessage);

window.pixelperfect = {
	breakpoints: [375, 1280],
};
