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
// 	[...document.querySelectorAll('.cihcm8w')[1].querySelectorAll('.i1303y2k .iv1oy2i')].map(x => x.innerHTML)
// DESCRIPTION:
// [...document.querySelectorAll('.cihcm8w')[1].querySelectorAll('.i1303y2k span')].map(x => {
//   return x.innerText
// }).filter(x => x.length > 2)

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
  -smokingRule     Boolean 
  -petsRule        Boolean
  xcheckIn         Int // DELETE
  xcheckOut        Int // DELETE
  xselfCheckIn     Boolean // DELETE
  xruleDescription String	// DELETE
  xpartiesRule     Boolean // DELETE

	ADD:
	-languages				String[]
	-imageComments		String[]
	-superhost			  Boolean
	-basicAmenities 	String[]
	-priceBreakdown		String[][]
	-houseRules				String[] ex. ['Check-in: After 3:00 PM', 'Checkout: 11:00 AM', 'Self Check In', ''No Smoking', 'No pets', 'No parties']
	-healthAndSafety 	String[] ex. ['Committed to Airbnb's enhanced cleaning process', 'Airbnb's social-distancing and other COVID-19...'...]
	-highlights 			String[][] ex. [['Entire Home', 'You'll have the place to yourself'], ['x','y'], ]
	-stayDescription	String 



	HOST MODEL
  -firstName     String
	-lastName 		 String   // DELETE
  -dateJoined    DateTime  //Randomly Generate
  -description   String
  -languages     String[] // DELETE
  -responseRate  Int			// DELETE
  -responseTime  String 	// DELETE
  -superHost     Boolean	// DELETE
  -enhancedClean Boolean  // DELETE

	ADD:
	-hostDetails  String[] ex. ['Languages: English, French', 'Response Rate: fast', 'Response Time: faster']
	-hostMedals		String[] ex. ['Identity Verified', 'Superhost']

	NEW HOST MODEL 
		firstName					String
		dateJoined				DateTime			
		hostDescription		String
		hostDetails				String[]			// ex. ['Languages: English, French', 'Response Rate: fast', 'Response Time: faster']
		hostMedals				String[] 			// ex. ['Identity verified', 'Superhost'],

	NEW LISTING MODEL
		id								Int						//User Generated via UUID
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
		smokingRule			  Boolean
		petsRule				  Boolean
		superhost					Boolean 
		languages					String[]      // ex. ['Chinese', 'Japanese', 'English']
		imageComments			String[]
		listingType				String
		basicAmenities		String[] 
		amenities					String[]
		houseRules				String[] 			// ex. ['Check-in: After 3:00 PM', 'Checkout: 11:00 AM', 'Self Check In', ''No Smoking', 'No pets', 'No parties', ...]
		healthAndSafety 	String[] 			// ex. ['Committed to Airbnb's enhanced cleaning process', 'Airbnb's social-distancing and other COVID-19...', ...]
		highlights				String[][] 		// ex. [['Entire Home', 'You'll have the place to yourself'], ['x','y'], ...]
		scores						String[][]		// ex. [['Cleanliness', '5.0'], ['Location', '3.9'], ...]				

	
 */