// NEW HOST MODEL
// 	firstName					String
// 	dateJoined				DateTime			// Generated
// 	hostDescription		String
// 	hostDetails				String[]			// ex. ['Languages: English, French', 'Response Rate: fast', 'Response Time: faster']
// 	hostMedals				String[] 			// ex. ['Identity verified', 'Superhost'],

// NEW LISTING MODEL
// 	id								Int						// Given
// 	title							String
// 	street						String				// Generated
// 	city							String
// 	location					String
// 	listingDescription	String
// 	locationDescription	String
// 	stayDescription		String
// 	zipCode						Int						// Generated
// 	price							Int
// 	priceBreakdown		String[][]		// ex. [['Cleaning fee', '106'], ['Service fee', '50']]
// 	numGuests					Int
// 	numBedrooms				Int
// 	numBeds						Int
// 	numBaths					Int
// 	smokingRule			  Boolean
// 	petsRule				  Boolean
// 	superhost					Boolean
// 	languages					String[]      // ex. ['हिन्दी','ਪੰਜਾਬੀ','Español']
// 	imageComments			String[]
// 	listingType				String
// 	basicAmenities		String[]
// 	amenities					String[]
// 	houseRules				String[] 			// ex. ['Check-in: After 3:00 PM', 'Checkout: 11:00 AM', 'Self Check In', ''No Smoking', 'No pets', 'No parties', ...]
// 	healthAndSafety 	String[] 			// ex. ['Committed to Airbnb's enhanced cleaning process', 'Airbnb's social-distancing and other COVID-19...', ...]
// 	highlights				String[][] 		// ex. [['Entire Home', 'You'll have the place to yourself'], ['x','y'], ...]
// 	scores						String[][]		// ex. [['Cleanliness', '5.0'], ['Location', '3.9'], ...]

// NEW REVIEW MODEL
// 	id 							  Int						// Generated
// 	listingId			  	String				// Given
// 	createdAt			  	DateTime			
// 	content				  	String
// 	authorId			  	Int						// Generated
// 	scores				  	String[][]    // ex. [['Cleanliness', '5.0'], ['Location', '3.9'], ...]			

// NEW USERS MODEL
//  id                Int           // Generated
//  firstName         String        // Randomly Generated
//  lastName          String        // Randomly Generated
//  email             String        // Randomly Generated
//  password          String        // Randomly Generated
//  reviews           Review[]      // Randomly Created as we loop through listings
//  reservations      Reservation[] // Randomly Created as we loop through listings

// NEW RESERVATION MODEL
//  id                Int          // Generated
//  userId            Int          // Generated
//  listingId         Int          // Given
//  dateStart         DateTime     // Generated based on review date (up to a week before review date)
//  dateEnd           DateTime     // Generated based on dateStart
//  totalPrice        Int          
