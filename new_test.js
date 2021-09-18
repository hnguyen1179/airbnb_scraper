const fs = require("fs");

const resDist = require("./future_res_dist.json");
const users = require("./user_and_reviews_reservations.json");
const proper_reservations = require("./proper_reservations.json");
const hosts = require("./host_and_listings.json");
const objectHash = require("object-hash");

// console.log(users[0])

// users.forEach((user, idx) => {
// 	if (user.id !== proper_reservations[idx].id) {
// 		console.log("ERROR");
// 	} else {
// 		user.reservations = proper_reservations[idx].reservations;
// 	}
// });
const listings = hosts
	.map((host) => host.listings)
	.reduce((cv, acc) => acc.concat(cv), []);

const reservations = users
	.map((user) => user.reservations)
	.reduce((cv, acc) => acc.concat(cv), []);

const reviews = users
	.map((user) => user.reviews)
	.reduce((c, a) => a.concat(c), []);

console.log(
	reviews.filter(
		(review) =>
			review.listingId === "849675a406194f61216dfa41fb9d76a786448066"
	)
);

// console.log(reviews.length);

// const data = {
// 	dateStart: new Date("June 29, 1994"),
// 	dateEnd: new Date("July 4, 1994"),
// };

// const start = data.dateStart;
// const end = data.dateEnd;

// const dates = [];

// while (start.toLocaleDateString() !== end.toLocaleDateString()) {
// 	dates.push(start.toLocaleDateString());
// 	start.setDate(start.getDate() + 1);
// }

// console.log(data.dateStart)
// console.log(dates);

// console.log(users[0]);
