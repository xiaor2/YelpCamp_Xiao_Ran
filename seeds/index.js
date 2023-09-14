const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.set('strictQuery', false)

mongoose.connect('mongodb://127.0.0.1:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!")
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedBD = async() => {
  await Campground.deleteMany({})
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      // My user Id
      author: '63e47bcd1f9706af694e9d97',
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi repellendus error voluptatem inventore eius fugiat, veritatis quaerat ea nesciunt odio magni voluptatibus minima dolorum, rem tempore eaque omnis commodi expedita.',
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude, 
          cities[random1000].latitude,
        ]
      },
      images: [{
        url: 'https://res.cloudinary.com/dc1707za2/image/upload/v1676323341/YelpCamp/a3egdgmbhykyhgpvdskx.jpg',
        filename: 'YelpCamp/a3egdgmbhykyhgpvdskx'
      },
      {
        url: 'https://res.cloudinary.com/dc1707za2/image/upload/v1676323341/YelpCamp/n25cfttggvs7uoxe6lud.jpg',
        filename: 'YelpCamp/n25cfttggvs7uoxe6lud'
      }]
    })
    await camp.save()
  }
}

seedBD().then(() => {
  mongoose.connection.close()
})