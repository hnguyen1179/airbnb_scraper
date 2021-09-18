require("dotenv").config({ path: __dirname + "/.env" });
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const hosts = require("./host_and_listings.json");
const users = require("./user_and_reviews_reservations.json");

const listings = hosts
	.map((host) => host.listings)
	.reduce((cv, acc) => acc.concat(cv), []);

const reservations = users
	.map((user) => user.reservations)
	.reduce((cv, acc) => acc.concat(cv), []);

const reviews = users
	.map((user) => user.reviews)
	.reduce((c, a) => a.concat(c), []);

const regions = [...new Set(listings.map((listing) => listing.region))].map(
	(region) => region.replace(" ", "_").toLowerCase()
);

const regionsObject = {};
listings.forEach((listing) => {
	const region = listing.region.replace(" ", "_").toLowerCase();

	if (!(region in regionsObject)) {
		regionsObject[region] = [listing.id];
	} else {
		regionsObject[region].push(listing.id);
	}
});

console.log(users[3]);
