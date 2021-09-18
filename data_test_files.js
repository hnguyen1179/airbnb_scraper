const fs = require("fs");
const userAndReviews = require("./user_and_reviews_reservations.json");
const hostAndListings = require("./host_and_listings.json");
const raw = require("./raw_data/raw_data_revised_5.json");
const { start } = require("repl");

const listings = raw.map((obj) => obj.listing);

const gaussianRandom = (v) => {
	let r = 0;
	for (let i = 0; i < v; i++) {
		r += Math.random();
	}
	return r / v;
};

// occupacny tax = x% of ( $ x nights, cleaning fee )
const occupancyTaxRate = {
	"San Diego": 0.105,
	"Los Angeles": 0.14,
	"Palm Springs": 0.11,
	"Big Bear": 0.7,
};

const calculateTotal = (listing, numNights) => {
	const price = listing.price * numNights;
	const cleaningFee = listing.cleaningFee;
	let occupancyTax = 0;

	if (listing.region in occupancyTaxRate) {
		occupancyTax = occupancyTaxRate[listing.region] * (price + cleaningFee);
	}

	const serviceFee = (price + cleaningFee + occupancyTax) * 0.12;

	return +(price + cleaningFee + occupancyTax + serviceFee).toFixed(2);
};

// Service fee is 12% of total ( $ x nights, cleaning fee, occupancy fee )

// 1. Generate datesUnavailable array...
// 2. Generate lengthOfStay
// 3. Pick at random within the next 6 months a date; Gaussian random to average closer to the earlier months
// 4. If valid, remove those dates from the datesAvailable array

const generateReservation = (user, listing) => {
	let flag = true;
	const daysUsed = [];
	const reservation = {};

	while (flag) {
		const lengthOfStay = Math.ceil(gaussianRandom(2) * 5);
		// 240 is 8 months out from current; makeing bookings spotty
		const randomPointInFuture = Math.ceil(Math.random() * 240);

		const startOfStay = new Date();
		startOfStay.setDate(startOfStay.getDate() + randomPointInFuture);

		const endOfStay = new Date(startOfStay);
		endOfStay.setDate(endOfStay.getDate() + lengthOfStay);

		const date = new Date(startOfStay);
		for (let i = 0; i < lengthOfStay; i++) {
			date.setDate(date.getDate() + 1);
			daysUsed.push(date.toLocaleDateString());
		}

		// Check to see if any any dates within datesUnavailable are in daysUsed
		// This would be an M * N operation...
		const successCheck = daysUsed.every((day) => {
			return day in listing.datesUnavailable === false;
		});

		// Exit condition
		if (successCheck) {
			reservation.userId = user.id;
			reservation.listingId = listing.id;
			reservation.dateStart = startOfStay;
			reservation.dateEnd = endOfStay;
			reservation.totalPrice = calculateTotal(listing, lengthOfStay);

			flag = false;
		} else {
			daysUsed.length = 0;
		}
	}

	// Adding days in daysUsed into datesUnavailable
	daysUsed.forEach((day) => {
		listing.datesUnavailable[day] = true;
	});

	// Adding future reservation into user's reservations
	user.reservations.push(reservation);
};

// Generating future reservations
// 73 places, 248 users
// Give each user approximately 10 future bookings (Gaussian Dist) to total to 2480 total future bookings
// This means that each listing will average 34 future bookings
// 34 future bookings * an average of 3-4 nights of stay means 102-136 total days booked for the future per listing (3-4 months worth)
// This is roughly 8 months out. Assuming we're being spotty with bookings

// datesAvailable = ['January 3 2022', 'January 4 2022', 'January 5 2022', 'January 7 2022', ...];
// Devise a function that checks for datesUnavailable and books days, randomly into the future 8 months

// Each user will have an average of 10 bookings...

const resDist = require("./future_res_dist.json");

const listingsId = hostAndListings
	.map((host) => {
		return host.listings.map((listing) => listing.id);
	})
	.reduce((cv, acc) => acc.concat(cv), []);

for (let i = 0; i < resDist.length; i++) {
	const numReservations = resDist[i];
	const user = userAndReviews[i];

	for (let j = 0; j < numReservations; j++) {
		const randomListingIdx = Math.floor(Math.random() * listings.length);
		const listingId = listingsId[randomListingIdx];

		const host = hostAndListings.find((h) => {
			return h.listings.map((l) => l.id).includes(listingId);
		});

		const listing = host.listings.find((l) => {
			return l.id === listingId;
		});

		generateReservation(user, listing);
	}
}

// convert each totalPrice to a number
userAndReviews.forEach((user) => {
	const reservations = user.reservations;
	reservations.forEach((reservation) => {
		reservation.totalPrice = Number(reservation.totalPrice);
	});
});

fs.writeFile("proper_reservations.json", JSON.stringify(userAndReviews), (e) =>
	e ? console.log(e) : console.log("yes")
);

// // Convert all totalPrices to numbers
// userAndReviews.forEach((user) => {
// 	const reservations = user.reservations;

// 	reservations.forEach((review) => {
// 		review.totalPrice = +review.totalPrice;
// 	});
// });

// fs.writeFile(
// 	"host_and_listings2.json",
// 	JSON.stringify(hostAndListings),
// 	(e) => {
// 		if (e) console.log(e);
// 	}
// );

// fs.writeFile(
// 	"user_and_reviews_reservations2.json",
// 	JSON.stringify(userAndReviews),
// 	(e) => {
// 		if (e) console.log(e);
// 	}
// );
