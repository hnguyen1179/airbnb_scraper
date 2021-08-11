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
