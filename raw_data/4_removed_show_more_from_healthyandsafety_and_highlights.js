const fs = require("fs");
const data = require("./raw_data_revised_3.json");

// Removing "Show more" from data
for (let x of data) {
	const listing = x.listing;
	listing.highlights = listing.highlights.map((highlight) => {
		highlight[1] = highlight[1].replace("Show more", "").trim();
		return [highlight[0], highlight[1]];
	});
}

// Removing "Show more" from health and safety
for (let x of data) {
	const listing = x.listing;
	listing.healthAndSafety = listing.healthAndSafety.map((hns) => {
		return hns.replace("Show more", "").trim();
	});
}

fs.writeFile("raw_data_revised_4.json", JSON.stringify(data), (e) => {
	if (e) return console.log(e);
	console.log("good");
});
