
(() => {
	const os = document.getElementsByClassName("os");
	document.getElementById("os-injection_select").addEventListener("change", function() {
		const v = this.value;
		Array.from(os).forEach(e => {
			e.classList.add("hidden");
		});
		document.getElementById(v).classList.remove("hidden");
	});
})();
