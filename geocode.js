require("dotenv").config({ path: "./.env" });
const hostObj = require("./host_and_listings.json");
const axios = require("axios");
const fs = require("fs");

const geocodeKey = "&key=" + process.env.GEOCODE_API_KEY;

const base = "https://maps.googleapis.com/maps/api/geocode/json?address=";

async function getLatLong(address) {
	try {
		const formattedAddress = address.replaceAll(" ", "+");
		const options = {
			url: base + address + geocodeKey,
		};

		const response = await axios(options);
		return response.data;
	} catch (error) {
		console.log("In error");
		console.log(error.response);
		console.log(error.message);
	}
}

(async function main() {
	const coordinates = {};

	for (let i = 0; i < hostObj.length; i++) {
		const host = hostObj[i];

		for (let j = 0; j < host.listings.length; j++) {
			const listing = host.listings[j];
			const listingAddress = listing.address;
			console.log(listingAddress);

			// const data = await getLatLong(listingAddress);
			// const coordinate = data.results[0].geometry.location;

			coordinates[listingAddress] = coordinate;
		}
	}

	// fs.writeFile("coordinates.json", JSON.stringify(coordinates), (e) => {
	// 	if (e) return console.log(e);
	// 	console.log("success");
	// });
})();
