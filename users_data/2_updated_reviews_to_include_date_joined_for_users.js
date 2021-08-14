const download = require("image-downloader");
const fs = require("fs");
// const reviewsDist = require("./users_reviews_dist_data.json");
// const raw = require("../raw_data/raw_data_revised_5.json");
const reviews = require("./reviews.json");

// Current distribution of your users data
// { '2': 1, '3': 15, '4': 69, '5': 87, '6': 53, '7': 20, '8': 3 }

/* Randomize array in-place using Durstenfeld shuffle algorithm */
// function shuffleArray(array) {
// 	for (var i = array.length - 1; i > 0; i--) {
// 		var j = Math.floor(Math.random() * (i + 1));
// 		var temp = array[i];
// 		array[i] = array[j];
// 		array[j] = temp;
// 	}
// }

// reviews is an array of all the reviews shuffled up
// const reviews = raw
// 	.map((obj) => {
// 		return obj.reviews;
// 	})
// 	.reduce((cv, acc) => acc.concat(cv), []);

// shuffleArray(reviews);

// reviews for each user with the correct allocation per use to total to 1240 [][] format
// const reviews = reviewsDist.map((num) => {
// 	const output = [];

// 	while (output.length < num) {
// 		const randomIndex = Math.floor(Math.random() * reviews.length);

// 		if (
// 			!output.find((r) => r.listingId === reviews[randomIndex].listingId)
// 		) {
// 			output.push(reviews[randomIndex]);
// 			reviews.splice(randomIndex, 1);
// 		}
// 	}

// 	return output;
// });

// fs.writeFile("reviews.json", JSON.stringify(reviews), (e) => {
// 	if (e) return console.log(e);
// 	console.log("yes");
// });

/**
 *  TODO:
 *  ✓ 1. Create a user for each item within usersAndReviews. Making sure to generate a unique
 *     hashed Id based on some unique combination within the user. Maybe just give them a uuid?
 *      {
 *          user : {
 *              ...
 *          },
 *          reviews: [
 *            { ... },
 *            { ... },
 *          ]
 *      }
 *
 *  ✓ 2. Download avatars for hosts and users
 *  ✓ 3. Create past-reservations and future-reservations for each user based on reviews and randomly generating from listings data
 *  ✓ 3. Finalize datasets free of bugs in data
 *  ✓ 4. Uploaded images to Cloudinary
 *
 */

// const usersAndReviews = reviews.map((group) => {
// 	const user = {};
// });

const earliestReview = reviews
	.map((group) =>
		group
			.map((review) => review.date.split(" ")[3])
			.sort((a, b) => {
				return Date.parse(a) > Date.parse(b);
			})
	)
	.map((group) => group[0]);

const updatedReviews = reviews.map((reviewGroup, i) => {
	return {
		user: {
			dateJoined: `Joined in ${earliestReview[i]}`,
		},
		reviews: reviewGroup,
	};
});

fs.writeFile("2_reviews_data.json", JSON.stringify(updatedReviews), (e) => {
	if (e) return console.log(e);
	console.log("yes");
});
