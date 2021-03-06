require("dotenv").config({ path: __dirname + "/.env" });
const fs = require("fs");
const puppeteer = require("puppeteer");
const download = require("image-downloader");
const hash = require("object-hash");

const AMENITIES_DIR = "./svgs/amenities/";
const HOUSE_DIR = "./svgs/houserules/";

const LA =
	"https://www.airbnb.com/s/Los-Angeles--CA--United-States/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_dates%5B%5D=august&flexible_trip_dates%5B%5D=september&flexible_trip_lengths%5B%5D=weekend_trip&date_picker_type=flexible_dates&search_type=user_map_move&ne_lat=34.28128357811729&ne_lng=-117.85726835397077&sw_lat=33.63200856318738&sw_lng=-118.81170560983014&zoom=10&search_by_map=true&place_id=ChIJE9on3F3HwoAR9AhGJW_fL-I";
const SAN_DIEGO =
	"https://www.airbnb.com/s/San-Diego/homes?refinement_paths%5B%5D=%2Fhomes&search_type=filter_change&tab_id=home_tab&place_id=ChIJSx6SrQ9T2YARed8V_f0hOg0&flexible_trip_dates%5B%5D=august&flexible_trip_dates%5B%5D=september&flexible_trip_lengths%5B%5D=weekend_trip&date_picker_type=calendar&superhost=true";
const LAS_VEGAS =
	"https://www.airbnb.com/s/Las-Vegas/homes?place_id=ChIJ7dBoVF7EyIARYktBuOpjhPk&refinement_paths%5B%5D=%2Fhomes&search_type=section_navigation";
const HENDERSON =
	"https://www.airbnb.com/s/Henderson/homes?refinement_paths%5B%5D=%2Fhomes&search_type=filter_change&tab_id=home_tab&flexible_trip_dates%5B%5D=august&flexible_trip_dates%5B%5D=september&flexible_trip_lengths%5B%5D=weekend_trip&date_picker_type=calendar&ne_lat=36.10405042175236&ne_lng=-114.88410968248763&sw_lat=35.93355029647225&sw_lng=-115.07122058336654&zoom=12&search_by_map=true&place_id=ChIJkUJfH67JyIARtWEgyjgqG-8&price_min=173";
const PARADISE =
	"https://www.airbnb.com/s/Paradise/homes?refinement_paths%5B%5D=%2Fhomes&search_type=filter_change&tab_id=home_tab&flexible_trip_dates%5B%5D=august&flexible_trip_dates%5B%5D=september&flexible_trip_lengths%5B%5D=weekend_trip&date_picker_type=calendar&ne_lat=36.122026529295326&ne_lng=-115.10161052782621&sw_lat=36.0368420575403&sw_lng=-115.19516597826566&zoom=13&search_by_map=true&place_id=ChIJS1WID53hwogRYIVTxbCfnYo&price_min=113";
const BIG_BEAR =
	"https://www.airbnb.com/s/Big-Bear-Lake/homes?place_id=ChIJZYdwAomzxIARv1O7X3ZFbfQ&refinement_paths%5B%5D=%2Fhomes&search_type=section_navigation";
const PALM_SPRINGS =
	"https://www.airbnb.com/s/Palm-Springs/homes?refinement_paths%5B%5D=%2Fhomes&search_type=filter_change&tab_id=home_tab&flexible_trip_dates%5B%5D=august&flexible_trip_dates%5B%5D=september&flexible_trip_lengths%5B%5D=weekend_trip&date_picker_type=calendar&price_min=442&place_id=ChIJs-Xb_9Qa24ARfHntwodp5aE&superhost=true";
const SANTA_BARBARA =
	"https://www.airbnb.com/s/Santa-Barbara/homes?place_id=ChIJ1YMtb8cU6YARSHa612Q60cg&refinement_paths%5B%5D=%2Fhomes&search_type=section_navigation";
const HOME = "https://www.airbnb.com/";

const LISTINGS_COUNT = 12;

const scrollDown = () => {
	const scrollable = document.querySelector("._1v5ksyp");

	const heightToScroll =
		document.querySelector("._8rtpcxs ._3j8fry").offsetHeight;

	scrollable.scrollTo({
		left: 0,
		top: heightToScroll,
		behavior: "smooth",
	});
};

const saveIMGs = async (page, id) => {
	await Promise.all([
		page.click("._1h6n1zu"),
		page.waitForNavigation({ waitUntil: "networkidle2" }),
		page.waitForTimeout(800),
	]);

	await Promise.all([
		page.click("._1oaklsk ._skzmvy ._1h6n1zu picture img"),
		page.waitForNavigation({ waitUntil: "networkidle2" }),
		page.waitForTimeout(1000),
	]);

	const totalNumberImages = await page.evaluate(() =>
		Number(document.querySelector("._1b1whhx").innerText.split(" / ")[1])
	);

	const randomNumber = Math.ceil(Math.random() * 6) + 4;

	const numberImages =
		randomNumber > totalNumberImages ? totalNumberImages : randomNumber;

	const comments = [];

	const dir = `./images/santa_barbara/${id}`;

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	for (let i = 0; i < numberImages; i++) {
		const comment = await page.evaluate(
			() => document.querySelector("._s8zm01 span")?.innerText || ""
		);

		comments.push(comment);

		const link = await page.evaluate(() =>
			document
				.querySelector("._26mmnvh img")
				.getAttribute("src")
				.replace("w=720", "w=1200")
		);

		download
			.image({
				url: link,
				dest: dir + `/image-${i}.webp`,
			})
			.then(({ fileName }) => {})
			.catch((err) => console.log(err));

		const nextButton = await page.evaluate(() =>
			document.querySelector("button[aria-label='Next']")
		);

		if (nextButton !== null) {
			await Promise.all([
				page.click("._14x8wq27 button[aria-label='Next']"),
				page.waitForNavigation({ waitUntil: "networkidle2" }),
				page.waitForTimeout(900),
			]);
		}
	}

	return comments;
};

const saveSVG = (path, names, svgs) => {
	const directoryFiles = fs.readdirSync(path);

	const cleanedDirectory = directoryFiles.map((x) =>
		x.slice(0, x.length - 4).replaceAll("_", " ")
	);

	for (let i = 0; i < names.length; i++) {
		const item = names[i];
		if (!cleanedDirectory.includes(item)) {
			const fileName = item.replaceAll(/[\s\/]/g, "_") + ".svg";
			fs.writeFileSync(path + fileName, svgs[i]);
		}
	}
};

const saveSVGs = (listing) => {
	// amenities,
	// amenitiesSVG,
	// houseRules,
	// houseRulesSVG,
	// healthAndSafety,
	// healthAndSafetySVG;

	saveSVG(AMENITIES_DIR, listing.amenities, listing.amenitiesSVG);
	saveSVG(
		HOUSE_DIR,
		listing.houseRules.slice(2),
		listing.houseRulesSVG.slice(2)
	);
};

const basicListingExtraction = (idx) => {
	const [listingType, location] = document
		.querySelectorAll("._1olmjjs6")
		[idx].innerText.split(" in ");

	const title = document.querySelectorAll("._1whrsux9")[idx].innerText;

	const [numGuests, numBedrooms, numBeds, numBaths] = document
		.querySelectorAll("._3c0zz1")
		[idx * 2].innerText.split(" ?? ")
		.map((x) => Number(x.match(/\d+/)));

	const basicAmenities = document
		.querySelectorAll("._3c0zz1")
		[idx * 2 + 1].innerText.split(" ?? ");

	const price = Number(
		document.querySelectorAll("._1p7iugi")[idx].innerText.match(/\d+/)[0]
	);

	const [reviewScore, _] = document
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

	const amenitiesSVG = [
		...document.querySelectorAll(
			"._1byskwn ._19xnuo97 ._17tdr0j ._hff5rgi"
		),
	].map((x) => x.innerHTML);

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

	const hostName = document
		.querySelector(".hnwb2pb.dir.dir-ltr")
		.innerText.split(" ")[2];

	const hostJoined = document.querySelector(".s9fngse.dir.dir-ltr").innerText;

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

	const houseRulesSVG = [
		...document
			.querySelectorAll(".cihcm8w")[0]
			.querySelectorAll(".i1303y2k .iv1oy2i"),
	].map((x) => x.innerHTML);

	const healthAndSafety = [
		...document
			.querySelectorAll(".cihcm8w")?.[1]
			?.querySelectorAll(".i1303y2k span"),
	]
		?.map((x) => {
			return x?.innerText;
		})
		?.filter((x) => x.length > 2);

	const healthAndSafetySVG = [
		...document
			.querySelectorAll(".cihcm8w")[1]
			.querySelectorAll(".i1303y2k .iv1oy2i"),
	].map((x) => x.innerHTML);

	const scores = [
		...document.querySelectorAll(".ciubx2o.dir.dir-ltr ._1s11ltsf"),
	]?.map((x) => {
		const score = x.querySelector("._4oybiu").innerText;
		const label = x.querySelector("._y1ba89").innerText;

		return [label, score];
	});

	return {
		city,
		highlights,
		amenities,
		amenitiesSVG,
		priceBreakdown,
		listingDescription,
		locationDescription,
		hostDescription,
		stayDescription,
		hostMedals,
		hostName,
		hostJoined,
		hostDetails,
		houseRules,
		houseRulesSVG,
		healthAndSafety,
		healthAndSafetySVG,
		scores,
	};
};

const extractReviews = async (page, id, scores) => {
	const moreReviews = await page.evaluate(() =>
		document.querySelector(".sngb06w .b1sec48q.v7aged4.dir.dir-ltr")
	);

	let query = ".rici162.dir.dir-ltr";

	if (moreReviews !== null) {
		query = "._1gjypya";

		await Promise.all([
			page.evaluate(() =>
				document
					.querySelector(".sngb06w .b1sec48q.v7aged4.dir.dir-ltr")
					.click()
			),
			page.waitForNavigation({
				waitUntil: "networkidle2",
			}),
			page.waitForTimeout(1000),
		]);

		const scrollFactor = +(Math.random() * 5 + 2).toFixed(0);

		for (let i = 0; i < scrollFactor; i++) {
			await Promise.all([
				page.evaluate(scrollDown),
				page.waitForTimeout(500),
			]);
		}
	}

	const review = await page.evaluate(
		({ query, listingId, scores }) =>
			[...document.querySelectorAll(query)].map((x) => {
				const generateRandDate = (dateString) => {
					const date = new Date(dateString);
					const numDays = new Date(
						date.getFullYear(),
						date.getMonth(),
						0
					).getDate();

					return new Date(
						date.getFullYear(),
						date.getMonth(),
						Math.ceil(Math.random() * numDays)
					).toString();
				};

				const date = x
					.querySelector("._1ixuu7m")
					.innerText.split("\n,")[0];

				const reviewScore = scores.map((score) => {
					const modifier = Math.random() > 0.5 ? 0.1 : -0.1;
					let newScore = (Number(score[1]) + modifier).toFixed(2);
					if (newScore > 5) newScore = 5.0;

					return [score[0], newScore.toString()];
				});

				return {
					listingId,
					scores: reviewScore,
					date: generateRandDate(date),
					content: x.children[1].innerText,
				};
			}),
		{ query, listingId: id, scores }
	);

	return review;
};

const scraperMain = async (browser, page) => {
	let output;

	try {
		await page.waitForTimeout(2000);

		output = await page.evaluate(() => {
			return [...document.querySelector("._fyxf74").children].map((child) => {
				const title = child.querySelector("._3na96d").innerText;
				const list = [...child.querySelector("._yuolfv").children].map(
					(x) => x.innerText
				);

				return {
					title,
					list,
				};
			});
		})

		// for (let i = 0; i < LISTINGS_COUNT; i++) {
		// 	const basicListing = await page.evaluate(basicListingExtraction, i);

		// 	// Grab the detailed listing link
		// 	const DETAILED_LISTING_LINK =
		// 		"https://www.airbnb.com" +
		// 		(await page.evaluate((idx) => {
		// 			return document
		// 				.querySelectorAll("._8s3ctt > a")
		// 				[idx].getAttribute("href");
		// 		}, i));

		// 	// Navigate to listing page
		// 	const listingPage = await browser.newPage();
		// 	await Promise.all([
		// 		listingPage.setViewport({ width: 1440, height: 1000 }),
		// 		listingPage.goto(DETAILED_LISTING_LINK),
		// 		listingPage.waitForNavigation({
		// 			waitUntil: "networkidle2",
		// 		}),
		// 	]);

		// 	// Extracted detailed information from each listing
		// 	const detailedListing = await listingPage.evaluate(
		// 		detailedListingExtraction
		// 	);

		// 	// Added a unique, deterministic ID to each listing
		// 	detailedListing.id = hash(detailedListing);

		// 	// Save SVGs and Images of each listing into files
		// 	saveSVGs(detailedListing);
		// 	const comments = await saveIMGs(listingPage, detailedListing.id);
		// 	detailedListing.imageComments = comments;

		// 	// Go into reviews and extract some users & reviews
		// 	const listingReviews = await extractReviews(
		// 		listingPage,
		// 		detailedListing.id,
		// 		detailedListing.scores
		// 	);

		// 	// Close listing page
		// 	listingPage.close();

		// 	// Set up massive object for seed purposes

		// 	// console.log(detailedListing); // Object
		// 	// console.log(basicListing); // Object
		// 	// console.log(listingReviews); // Array of Objects

		// 	const languagesString =
		// 		detailedListing.hostDetails.find((x) =>
		// 			x.includes("Language")
		// 		) || "";
		// 	const listingLanguages = languagesString.split(" ").slice(1);

		// 	const listing = {
		// 		id: detailedListing.id,
		// 		title: basicListing.title,
		// 		street: "",
		// 		city: detailedListing.city,
		// 		location: basicListing.location,
		// 		listingDescription: detailedListing.listingDescription,
		// 		locationDescription: detailedListing.locationDescription,
		// 		stayDescription: detailedListing.stayDescription,
		// 		zipcode: 0,
		// 		price: basicListing.price,
		// 		priceBreakdown: detailedListing.priceBreakdown,
		// 		numGuests: basicListing.numGuests,
		// 		numBedrooms: basicListing.numBedrooms,
		// 		numBeds: basicListing.numBeds,
		// 		numBaths: basicListing.numBaths,
		// 		smokingRule:
		// 			detailedListing.houseRules.includes("Smoking is allowed"),
		// 		petsRule:
		// 			detailedListing.houseRules.includes("Pets are allowed"),
		// 		superhost: detailedListing.hostMedals.includes("Superhost"),
		// 		languages: listingLanguages,
		// 		imageComments: detailedListing.imageComments,
		// 		listingType: basicListing.listingType,
		// 		basicAmenities: basicListing.basicAmenities,
		// 		amenities: detailedListing.amenities,
		// 		houseRules: detailedListing.houseRules,
		// 		healthAndSafety: detailedListing.healthAndSafety,
		// 		highlights: detailedListing.highlights,
		// 		score: basicListing.reviewScore,
		// 		scoreBreakdown: detailedListing.scores,
		// 	};

		// 	const host = {
		// 		firstName: detailedListing.hostName,
		// 		dateJoined: detailedListing.hostJoined,
		// 		description: detailedListing.hostDescription,
		// 		details: detailedListing.hostDetails,
		// 		medals: detailedListing.hostMedals,
		// 	};

		// 	// Push massive object into 'output' array
		// 	output.push({
		// 		host,
		// 		listing,
		// 		reviews: listingReviews,
		// 	});
		// }
	} catch (e) {
		console.log(e);
	}

	return output;
};

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null,
		args: ["--start-maximized"],
	});

	const page = await browser.newPage();
	await Promise.all([page.goto(HOME)]);

	const data = await scraperMain(browser, page);

	fs.writeFile("./HOME.json", JSON.stringify(data), (e) => {
		if (e) return console.log(e);
		console.log("Output file successfully written");
	});
})();
