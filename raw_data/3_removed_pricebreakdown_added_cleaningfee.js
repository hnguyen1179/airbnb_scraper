const fs = require("fs");
const data = require("./raw_data_revised_2.json");

// Remove occupancy taxes & fees
for (let obj of data) {
	const listing = obj.listing;

	const includesOccTax = listing.priceBreakdown.some((breakdown) => {
		return breakdown[0] === "Occupancy taxes and fees";
	});

	if (includesOccTax) {
		listing.priceBreakdown.pop();
	}
}

for (let obj of data) {
	const listing = obj.listing;

	const includesOccTax = listing.priceBreakdown.some((breakdown) => {
		return breakdown[0] === "Service fee";
	});

	if (includesOccTax) {
		listing.priceBreakdown.pop();
	}

	if (listing.price === 1) listing.price = 1149;

	let cleaningFee = Math.ceil(listing.price * 0.3);

	if (listing.priceBreakdown.length > 0) {
		cleaningFee = Number(listing.priceBreakdown[0][1]);
	}

	delete listing.priceBreakdown;
	listing.cleaningFee = cleaningFee;
}

fs.writeFile("raw_data_revised_3.json", JSON.stringify(data), (e) => {
	if (e) return console.log(e);
	console.log("write good");
});
