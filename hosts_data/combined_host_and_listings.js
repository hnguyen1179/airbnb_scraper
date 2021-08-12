const fs = require("fs");
const hostData = require("./2_host_data.json");
const rawData = require("../raw_data/raw_data_revised_5.json");

// Integrate reservations into hosts
/**
 *  host: {
 *    ...
 *    listings: [
 *      { ... },
 *      { ... }
 *    ]
 *  }
 */

for (let host of hostData) {
	const filteredListings = rawData
		.filter((obj) => {
			return obj.listing.hostId === host.id;
		})
		.map((obj) => obj.listing);

	host.listings = filteredListings;
}

fs.writeFile("host_and_listings.json", JSON.stringify(hostData), (e) => {
	if (e) return console.log(e);
	console.log("yes");
});
