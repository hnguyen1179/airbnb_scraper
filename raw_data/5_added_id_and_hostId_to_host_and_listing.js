const hash = require("object-hash");
const fs = require("fs");
const d = require("./raw_data_revised_4.json");

// Generate a unique ID based on host.firstName host.dateJoined
// Add that hostId to each listing and host as id
for (let obj of d) {
	const host = obj.host;
	const listing = obj.listing;

	const id = hash({
		firstName: obj.host.firstName,
		dateJoined: obj.host.dateJoined,
	});

	listing.hostId = id;
	host.id = id;
}

fs.writeFile("raw_data_revised_5.json", JSON.stringify(d), (e) => {
	if (e) return console.log(e);
	console.log("done");
});
