require("dotenv").config({ path: __dirname + "/.denv" });
const fs = require("fs");
const puppeteer = require("puppeteer");

const LA_URL =
	"https://www.airbnb.com/s/Los-Angeles--CA--United-States/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_dates%5B%5D=august&flexible_trip_dates%5B%5D=september&flexible_trip_lengths%5B%5D=weekend_trip&date_picker_type=flexible_dates&search_type=user_map_move&ne_lat=34.28128357811729&ne_lng=-117.85726835397077&sw_lat=33.63200856318738&sw_lng=-118.81170560983014&zoom=10&search_by_map=true&place_id=ChIJE9on3F3HwoAR9AhGJW_fL-I";

// class: _fhph4u
// Contains list of listings
// 20 places per listing

// class: _1olmjjs6
// Contains type of listing & location

// class: _1whrsux9
// Contains name of the listing

// class: _3c0zz1
// Contains #guests, #bedrooms, #baths, #beds
// Contains info on basic amenities

// class: _18khxk1
// Contains #reviews and average score

// class: _ls0e43
// Contains price breakdown
// document.getElementsByClassName('_ls0e43')[0].innerText
// document.getElementsByClassName('_ls0e43')[2].innerText

// query: document.querySelectorAll('._1h6n1zu > picture')[0].children[0].getAttribute('srcset')
// Get current image

// class: _177jc1o
// Next image button

// Can iterate through the elements by listing list and then extract information per listing per iteration

const LISTINGS_COUNT = 15;
/**
 * This function grabs:
 *  1. Type of Listing
 *  2. Location
 *  3. Name of Listing
 *  4. #guests
 *  5. #bedrooms
 *  6. #bathrooms
 *  7. #beds
 *  8. Basic amenities
 *  9. average review score
 *  10. #reviews
 *  11. Price per night
 */

const scrollDown = () => {
	const scrollable = document.querySelector("._8rtpcxs ._3j8fry");

	const heightToScroll =
		document.querySelector("._8rtpcxs ._3j8fry").offsetHeight;

	console.log(heightToScroll);

	scrollable.scrollTo({
		left: 0,
		top: heightToScroll,
		behavior: "smooth",
	});
};

const basicListingExtraction = (idx) => {
	const [listingType, location] = document
		.querySelectorAll("._1olmjjs6")
		[idx].innerText.split(" in ");

	const title = document.querySelectorAll("._1whrsux9")[idx].innerText;

	const [numGuests, numBedrooms, numBeds, numBaths] = document
		.querySelectorAll("._3c0zz1")
		[idx * 2].innerText.split(" · ")
		.map((x) => Number(x.match(/\d+/)));

	const basicAmenities = document
		.querySelectorAll("._3c0zz1")
		[idx * 2 + 1].innerText.split(" · ");

	const price = Number(
		document.querySelectorAll("._1p7iugi")[idx].innerText.match(/\d+/)[0]
	);

	const [reviewScore, numReviews] = document
		.querySelectorAll("._18khxk1")
		[idx].innerText.match(/\d+.\d+/g)
		.map((x) => Number(x));

	return {
		listingType,
		location,
		title,
		numGuests,
		numBedrooms,
		numBeds,
		numBaths,
		price,
		basicAmenities,
		reviewScore,
		numReviews,
	};
};

const detailedListingExtraction = () => {
	const city = document.querySelector("._pbq7fmm")?.innerText?.split(", ")[0];

	const highlights = [
		...document.querySelectorAll(
			"div[data-section-id='HIGHLIGHTS_DEFAULT'] ._1vjikx5 ._1mqc21n"
		),
	]
		?.map((x) => x?.innerText.split("\n"))
		?.filter((x) => !x[0].includes("cancellation"));

	const listingDescription = document.querySelector(
		"div[data-section-id='DESCRIPTION_DEFAULT']"
	)?.innerText;

	const amenities = [
		...document.querySelectorAll("._1byskwn ._19xnuo97 ._17tdr0j"),
	]?.map((x) => x?.innerText);

	const priceBreakdown = [...document.querySelectorAll("._j0jkxv ._1bgajnx")]
		?.map((x) => {
			const output = x?.innerText.split("\n");
			return [output?.[0], output?.[2]?.slice(1)];
		})
		?.filter((x) => {
			return !x[0].includes("nights");
		});

	const locationDescription =
		document.querySelector("._vd6w38n span")?.innerText;

	const hostDescription =
		document.querySelectorAll("._1d784e5")?.[0]?.innerText;

	const stayDescription = document.querySelectorAll(
		".bs4u5d4.v6231dh.dir.dir-ltr ._1d784e5"
	)?.[2]?.innerText;

	const hostMedals = [
		...document.querySelectorAll(".tq6hspd .tpa8qb9 .l1dfad8f"),
	]
		?.map((x) => x?.innerText)
		?.filter((x) => !x.includes("Review"));

	const hostDetails = document
		.querySelector(".fhhmddr")
		.innerText.split("\n")
		.filter((x) => !x.includes("Policy"));

	const houseRules = [
		...document
			.querySelectorAll(".cihcm8w")?.[0]
			?.querySelectorAll(".i1303y2k span"),
	]
		?.map((x) => {
			return x?.innerText;
		})
		?.filter((x) => x.length > 2);

	const healthAndSafety = [
		...document
			.querySelectorAll(".cihcm8w")?.[1]
			?.querySelectorAll(".i1303y2k span"),
	]
		?.map((x) => {
			return x?.innerText;
		})
		?.filter((x) => x.length > 2);

	return {
		city,
		highlights,
		amenities,
		priceBreakdown,
		listingDescription,
		locationDescription,
		hostDescription,
		stayDescription,
		hostMedals,
		hostDetails,
		houseRules,
		healthAndSafety,
	};
};

const reviewsExtraction = () => {
	return [...document.querySelectorAll("._1gjypya")]?.map(
		(x) => [...x.children][1].innerText
	);
};

const scraperMain = async (browser, page) => {
	const output = [];

	try {
		for (let i = 0; i < LISTINGS_COUNT; i++) {
			const basicListing = await page.evaluate(basicListingExtraction, i);

			// Grab the detailed listing link
			const DETAILED_LISTING_LINK =
				"https://www.airbnb.com" +
				(await page.evaluate((idx) => {
					console.log(idx);
					return document
						.querySelectorAll("._8s3ctt > a")
						[idx].getAttribute("href");
				}, i));

			// Go Into Listing and Grab Information
			const listingPage = await browser.newPage();

			await Promise.all([
				listingPage.setViewport({ width: 1440, height: 1000 }),
				listingPage.goto(DETAILED_LISTING_LINK),
				listingPage.waitForNavigation({
					waitUntil: "networkidle2",
				}),
				listingPage.waitForDuration,
			]);

			const detailedListing = await listingPage.evaluate(
				detailedListingExtraction
			);

			// Go into reviews and extract some users & reviews
			const moreReviews = await listingPage.evaluate(() =>
				document.querySelector(".b1sec48q.v7aged4.dir.dir-ltr")
			);

			let listingReviews;

			if (moreReviews !== null) {
				await Promise.all([
					listingPage.click(".b1sec48q.v7aged4.dir.dir-ltr"),
					listingPage.waitForNavigation({
						waitUntil: "networkidle2",
					}),
					listingPage.waitForTimeout(1000),
				]);

				await Promise.all([
					listingPage.evaluate(scrollDown),
					listingPage.waitForTimeout(500),
				]);

				listingReviews = await listingPage.evaluate(reviewsExtraction);
			} else {
				listingReviews = await listingPage.evaluate(() =>
					[...document.querySelectorAll(".rici162.dir.dir-ltr")].map(
						(x) => x.children[1].innerText
					)
				);
			}

			listingPage.close();

			console.log(detailedListing);
			console.log(basicListing);
			console.log(listingReviews);

			// output.push(basicListing);
		}
	} catch (e) {
		console.log(e);
	}

	return output;
};

/**
	LISTING MODEL
  -title            String		
  -street            String  //Randomly Generate
  -city             String
  -houseDescription String
  -zipCode           Int			//Randomly Generate
  -price            Int
  -numGuests        Int
  -numBedrooms      Int
  -numBeds          Int
  -numBaths         Int
  -listingType      String
  -amenities       String[]
  xcheckIn         Int // DELETE
  xcheckOut        Int // DELETE
  xselfCheckIn     Boolean // DELETE
  xruleDescription String	// DELETE
  xsmokingRule     Boolean // DELETE
  xpartiesRule     Boolean // DELETE
  xpetsRule        Boolean // DELETE

	ADD:
	-basicAmenities 	String[]
	-priceBreakdown		String[][]
	-houseRules				String[] ex. ['Check-in: After 3:00 PM', 'Checkout: 11:00 AM', 'Self Check In', ''No Smoking', 'No pets', 'No parties']
	-healthAndSafety 	String[] ex. ['Committed to Airbnb's enhanced cleaning process', 'Airbnb's social-distancing and other COVID-19...'...]
	-highlights 			String[][] ex. [['Entire Home', 'You'll have the place to yourself'], ['x','y'], ]
	-stayDescription	String 



	HOST MODEL
  -firstName     String
  -lastName      String  	 //Randomly Generate
  -dateJoined    DateTime  //Randomly Generate
  -description   String
  -languages     String[] // DELETE
  -responseRate  Int			// DELETE
  -responseTime  String 	// DELETE
  -superHost     Boolean	
  -enhancedClean Boolean   

	ADD:
	-hostDetails  String[] ex. ['Languages: English, French', 'Response Rate: fast', 'Response Time: faster']
	-verified			Boolean

	NEW HOST MODEL 
		firstName					String
		lastName 					String				//Generated
		dateJoined				DateTime			//Generated
		hostDescription		String
		hostDetails				String[]			// ex. ['Languages: English, French', 'Response Rate: fast', 'Response Time: faster']
		hostMedals				String[] 			// ex. ['Identity verified', 'Superhost'],
		superHost					Boolean
		enhancedClean			Boolean
		verified					Boolean

	NEW LISTING MODEL
		title							String
		street						String				//Generated
		city							String
		location					String			
		listingDescription	String		
		locationDescription	String
		stayDescription		String
		zipCode						Int						//Generated
		price							Int
		priceBreakdown		String[][]		// ex. [['Cleaning fee', '106'], ['Service fee', '50']]
		numGuests					Int
		numBedrooms				Int
		numBeds						Int
		numBaths					Int
		listingType				String
		basicAmenities		String[] 
		amenities					String[]
		houseRules				String[] 			// ex. ['Check-in: After 3:00 PM', 'Checkout: 11:00 AM', 'Self Check In', ''No Smoking', 'No pets', 'No parties']
		healthAndSafety 	String[] 			// ex. ['Committed to Airbnb's enhanced cleaning process', 'Airbnb's social-distancing and other COVID-19...'...]
		highlights				String[][] 		// ex. [['Entire Home', 'You'll have the place to yourself'], ['x','y'], ]
 */

// CITY
// document.querySelector('._pbq7fmm')?.innerText.split(', ')[0]

// LISTING HIGHLIGHTS
// SVGS:
// 	[...document.querySelectorAll("div[data-section-id='HIGHLIGHTS_DEFAULT'] ._1vjikx5 ._1t2btyf")].map(x => x.innerHTML)
// Type & description: [['Entire Home', 'You'll have the place to yourself']...]
//  [...document.querySelectorAll("div[data-section-id='HIGHLIGHTS_DEFAULT'] ._1vjikx5 ._1mqc21n")].map(x => x?.innerText.split("\n"))

// LISTING DESCRIPTION
// 	document.querySelector("div[data-section-id='DESCRIPTION_DEFAULT']").innerText

// AMENITIES (WHAT THIS PLACE OFFERS)
// SVGS: (array)
// 	[...document.querySelectorAll('._1byskwn ._19xnuo97 ._17tdr0j ._hff5rgi')].map(x => x.innerHTML)
// TYPE: ['Kitchen', 'Shower', 'Bathroom'...]
//  [...document.querySelectorAll('._1byskwn ._19xnuo97 ._17tdr0j')].map(x => x.innerText)

// PRICE BREAKDOWN ex. [['Service fee', '$42']...]
// [...document.querySelectorAll('._j0jkxv ._1bgajnx')].map(x => {
//    const output = x.innerText.split('\n');
//    return [output[0], Number(output[2].slice(1))]
// })

// HOST DESCRIPTION
// document.querySelectorAll('._1d784e5')[0]?.innerText

// STAY DESCRIPTION
// document.querySelectorAll('._1d784e5')[1]?.innerText

// HOST MEDALS (array) ex. ['333 Reviews', 'Identity Verified', 'Superhost']
// [...document.querySelectorAll('.tq6hspd .tpa8qb9 .l1dfad8f')].map(x => x.innerText)

// LANGUAGES (array)
// document.querySelectorAll('.f19phm7j')[1]?.innerText.slice(11).split(", ")

// RESPONSE RATE (number)
// Number(document.querySelectorAll('.f19phm7j')[2]?.innerText.match(/\d+/g)[0])

// RESPONSE TIME (string) ex. within an hour
// document.querySelectorAll('.f19phm7j')[3]?.innerText.slice(15)

// CHECK IN TIME

// CHECK OUT TIME

// HOUSE RULES
// SVGS: (array)
// 	[...document.querySelectorAll('.cihcm8w')[0].querySelectorAll('.i1303y2k .iv1oy2i')].map(x => x.innerHTML)
// DESCRIPTION:
// [...document.querySelectorAll('.cihcm8w')[0].querySelectorAll('.i1303y2k span')].map(x => {
//   return x.innerText
// }).filter(x => x.length > 2)

// HEALTH & SAFETY
// SVGS: (array)
// 	[...document.querySelectorAll('.cihcm8w')[0].querySelectorAll('.i1303y2k .iv1oy2i')].map(x => x.innerHTML)
// DESCRIPTION:
// [...document.querySelectorAll('.cihcm8w')[1].querySelectorAll('.i1303y2k span')].map(x => {
//   return x.innerText
// }).filter(x => x.length > 2)

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
	});

	const page = await browser.newPage();
	await Promise.all([
		page.setViewport({ width: 1440, height: 1000 }),
		page.goto(LA_URL),
	]);

	const data = await scraperMain(browser, page);
	console.log("data: ", data);
})();
