const fs = require("fs");
const data = require("./1_host_data.json");

// Fixed host.details of some hosts
for (let obj of data) {
	if (
		obj.id === "be535ba0698f5380c787f78e4afc37249a1be962" ||
		obj.id === "aa3a5cd4b1ba2545000963c1571435b0a22a8c18"
	) {
		obj.details = ["Response rate: 100%", "Response time: within an hour"];
	} else if (obj.id === "2f24b5d660bbfd88723d5d947729abec2bb0c68e") {
		obj.details = [
			"Languages: English, Русский, Українська",
			"Response rate: 100%",
			"Response time: within an hour",
		];
	}
}

fs.writeFile("2_host_data.json", JSON.stringify(data), (e) => {
	if (e) return console.log(e);
	console.log("ye");
});
