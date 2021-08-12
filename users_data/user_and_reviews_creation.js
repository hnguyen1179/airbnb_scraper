const fs = require("fs");
const users = require("./2_reviews_data.json");
const usersRand = require("./248_random_users_data.json");
const hash = require("object-hash");

// {
//   name: { title: 'Mr', first: 'Ronald', last: 'Cox' },
//   email: 'ronald.cox@example.com',
//   login: {
//     uuid: 'd28eb442-d5bb-44d8-abf7-b300641612da',
//     username: 'yellowladybug767',
//     password: 'public',
//     salt: 'YuRRq1F5',
//     md5: '27f61fbd36fa51eca0055d97285d2460',
//     sha1: 'bdc5e7e1e794e4e9f5c270471b3e7ddaf9080029',
//     sha256: 'c8ea2c0a612f60d29e55459f25f70a15a3599491d3a262e7b012dc9cce688757'
//   },
//   picture: {
//     large: 'https://randomuser.me/api/portraits/men/0.jpg',
//     medium: 'https://randomuser.me/api/portraits/med/men/0.jpg',
//     thumbnail: 'https://randomuser.me/api/portraits/thumb/men/0.jpg'
//   }
// }

users.forEach((obj, idx) => {
  const user = obj.user;
  const reviews = obj.reviews;
	const rando = usersRand[idx];

  const id = hash(rando)

	user["id"] = id;
	user["firstName"] = rando.name.first;
	user["lastName"] = rando.name.last;
	user["email"] = rando.email;
  user["password"] = rando.login.password;
  
  reviews.forEach(listing => {
    listing['authorId'] = id
  })
});

fs.writeFile('../user_and_reviews.json', JSON.stringify(users), (e) => {
  if (e) return console.log(e)
  console.log('success')
})
