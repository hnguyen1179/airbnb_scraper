const data = require("./user_and_reviews.json");
const raw = require("./raw_data/raw_data_revised_5.json");

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
	const price = listing.price;
	const cleaningFee = listing.cleaningFee;
	let occupancyTax = 0;

	if (listing.region in occupancyTaxRate) {
		occupancyTax =
			occupancyTaxRate[listing.region] *
			(price * numNights + cleaningFee);
	}

	const serviceFee = (price + cleaningFee + occupancyTax) * 0.12;

	return (price + cleaningFee + occupancyTax + serviceFee).toFixed(2);
};

// Service fee is 12% of total ( $ x nights, cleaning fee, occupancy fee )

// Generating previous reservations
const dataAndPastReservations = data.map((obj) => {
	const reservations = obj.reviews.map((review) => {
		const reviewDate = new Date(review.date);

		const lengthStay = Math.ceil(gaussianRandom(8) * 12);
		const daysBefore = Math.ceil(Math.random() * 3) + lengthStay;

		const dateStart = new Date(review.date);
		dateStart.setDate(reviewDate.getDate() - daysBefore);

		const dateEnd = new Date(dateStart);
		dateEnd.setDate(dateEnd.getDate() + lengthStay);

		const listing = listings.find(
			(listing) => listing.id === review.listingId
		);

		return {
			userId: review.authorId,
			listingId: review.listingId,
			dateStart: dateStart.toString(),
			dateEnd: dateEnd.toString(),
			totalPrice: calculateTotal(listing, lengthStay),
		};
	});

	obj["reservations"] = reservations;
	return obj;
});

// Generating future reservations
// 73 places, 248 users
// Give each user approximately 10 future bookings (Gaussian Dist) to total to 2480 total future bookings 
// This means that each listing will average 33 future bookings 
// 33 future bookings * an average of 5 nights of stay means 165 total days booked for the future
// This is roughly 6-8 months out. Assuming we're being spotty with bookings 

// datesUnavailable = ['January 3 2022', 'January 4 2022', 'January 5 2022', 'January 7 2022', ...];
// Devise an algorithm that checks for datesUnavailable and books days, randomly into the future 8 months 

console.log(listings.length)
console.log(248 * 10)
console.log(2480 / 73)
console.log(33 * 5)