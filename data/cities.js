/**
 * CITIES DATA FILE
 *
 * This file contains a curated list of 24 cities from around the world,
 * one for each major timezone. Each city has:
 * - name: The city name to display
 * - country: The country it's in
 * - timezone: The IANA timezone identifier (used by JavaScript's Date API)
 * - utcOffset: The typical UTC offset (for reference)
 * - funFacts: An array of 2-3 interesting facts about the city
 *
 * WHY THESE CITIES?
 * I picked cities that are:
 * 1. Well-known and interesting
 * 2. Spread across all 24 major timezone offsets
 * 3. Have fun, memorable facts
 */

const cities = [
  {
    name: "Baker Island",
    country: "US Territory",
    timezone: "Pacific/Enderbury", // Closest available, UTC-12 equivalent
    utcOffset: -12,
    funFacts: [
      "Baker Island is uninhabited and has no permanent population",
      "It's one of the last places on Earth to see each new day",
      "The island is a wildlife refuge home to seabirds and sea turtles"
    ]
  },
  {
    name: "Pago Pago",
    country: "American Samoa",
    timezone: "Pacific/Pago_Pago",
    utcOffset: -11,
    funFacts: [
      "Pago Pago has one of the deepest natural harbors in the South Pacific",
      "The name is pronounced 'Pango Pango' - the 'g' is silent!",
      "It receives over 5 meters (200 inches) of rain per year"
    ]
  },
  {
    name: "Honolulu",
    country: "USA",
    timezone: "Pacific/Honolulu",
    utcOffset: -10,
    funFacts: [
      "Honolulu means 'sheltered harbor' in Hawaiian",
      "It's the only US state capital with a royal palace (Iolani Palace)",
      "The city has hosted the Pro Bowl almost every year since 1980"
    ]
  },
  {
    name: "Anchorage",
    country: "USA",
    timezone: "America/Anchorage",
    utcOffset: -9,
    funFacts: [
      "Anchorage receives over 19 hours of daylight during summer solstice",
      "About 40% of Alaska's population lives in Anchorage",
      "Moose outnumber people in some Anchorage neighborhoods"
    ]
  },
  {
    name: "Los Angeles",
    country: "USA",
    timezone: "America/Los_Angeles",
    utcOffset: -8,
    funFacts: [
      "LA's full name is 'El Pueblo de Nuestra Senora la Reina de los Angeles'",
      "The Hollywood sign originally said 'Hollywoodland' in 1923",
      "LA has more museums per capita than any other US city"
    ]
  },
  {
    name: "Denver",
    country: "USA",
    timezone: "America/Denver",
    utcOffset: -7,
    funFacts: [
      "Denver is exactly one mile above sea level (5,280 feet)",
      "The Colorado State Capitol's 13th step is exactly one mile high",
      "Denver has 300 days of sunshine per year - more than San Diego!"
    ]
  },
  {
    name: "Chicago",
    country: "USA",
    timezone: "America/Chicago",
    utcOffset: -6,
    funFacts: [
      "Chicago reversed the flow of its river using engineering in 1900",
      "The first-ever Ferris wheel debuted at Chicago's 1893 World's Fair",
      "Deep-dish pizza was invented in Chicago in 1943"
    ]
  },
  {
    name: "New York",
    country: "USA",
    timezone: "America/New_York",
    utcOffset: -5,
    funFacts: [
      "New York City has 520 miles of subway track",
      "More than 800 languages are spoken in NYC - most in the world!",
      "Central Park is larger than the country of Monaco"
    ]
  },
  {
    name: "Halifax",
    country: "Canada",
    timezone: "America/Halifax",
    utcOffset: -4,
    funFacts: [
      "Halifax sent aid ships to Boston after the 1917 explosion disaster",
      "Boston still sends Halifax a Christmas tree every year in thanks",
      "The Titanic victims were brought to Halifax after the sinking"
    ]
  },
  {
    name: "Buenos Aires",
    country: "Argentina",
    timezone: "America/Argentina/Buenos_Aires",
    utcOffset: -3,
    funFacts: [
      "Buenos Aires has the widest avenue in the world (9 de Julio Avenue)",
      "Tango was born in the working-class neighborhoods of Buenos Aires",
      "The city has more bookstores per capita than any other city"
    ]
  },
  {
    name: "South Georgia Island",
    country: "British Territory",
    timezone: "Atlantic/South_Georgia",
    utcOffset: -2,
    funFacts: [
      "South Georgia is home to millions of penguins",
      "Explorer Ernest Shackleton is buried on the island",
      "There are no permanent residents, only research scientists"
    ]
  },
  {
    name: "Praia",
    country: "Cape Verde",
    timezone: "Atlantic/Cape_Verde",
    utcOffset: -1,
    funFacts: [
      "Cape Verde was uninhabited until Portuguese settlers arrived in 1456",
      "The islands are named after the Cap-Vert peninsula in Senegal",
      "Cesaria Evora, the 'Barefoot Diva,' was from Cape Verde"
    ]
  },
  {
    name: "London",
    country: "United Kingdom",
    timezone: "Europe/London",
    utcOffset: 0,
    funFacts: [
      "Big Ben is actually the name of the bell, not the tower",
      "London has over 170 museums, many of which are free",
      "The London Underground is the oldest metro system in the world (1863)"
    ]
  },
  {
    name: "Paris",
    country: "France",
    timezone: "Europe/Paris",
    utcOffset: 1,
    funFacts: [
      "The Eiffel Tower was meant to be temporary and almost demolished",
      "Paris has only one stop sign in the entire city",
      "There are 6,100 streets in Paris - none have stop signs except one!"
    ]
  },
  {
    name: "Cairo",
    country: "Egypt",
    timezone: "Africa/Cairo",
    utcOffset: 2,
    funFacts: [
      "The Great Pyramid of Giza was the tallest structure for 3,800 years",
      "Cairo is the largest city in the Arab world and Africa",
      "The city is called 'The City of a Thousand Minarets'"
    ]
  },
  {
    name: "Moscow",
    country: "Russia",
    timezone: "Europe/Moscow",
    utcOffset: 3,
    funFacts: [
      "Moscow's metro stations are nicknamed 'underground palaces'",
      "The Kremlin is the largest medieval fortress in the world",
      "Moscow has more billionaires than any city except New York"
    ]
  },
  {
    name: "Dubai",
    country: "UAE",
    timezone: "Asia/Dubai",
    utcOffset: 4,
    funFacts: [
      "The Burj Khalifa is so tall it spans 3 different temperature zones",
      "Dubai's police fleet includes Lamborghinis and Ferraris",
      "There are no income taxes in Dubai"
    ]
  },
  {
    name: "Karachi",
    country: "Pakistan",
    timezone: "Asia/Karachi",
    utcOffset: 5,
    funFacts: [
      "Karachi is one of the world's largest cities by population",
      "The city was once a small fishing village called 'Kolachi'",
      "Karachi's port handles 95% of Pakistan's foreign trade"
    ]
  },
  {
    name: "Mumbai",
    country: "India",
    timezone: "Asia/Kolkata",
    utcOffset: 5.5,
    funFacts: [
      "Mumbai produces more films per year than Hollywood",
      "The city was built on seven islands that are now connected",
      "Mumbai's dabbawalas deliver 200,000 lunches daily with 99.99% accuracy"
    ]
  },
  {
    name: "Dhaka",
    country: "Bangladesh",
    timezone: "Asia/Dhaka",
    utcOffset: 6,
    funFacts: [
      "Dhaka is known as the 'City of Rickshaws' with 400,000 in operation",
      "The city is one of the most densely populated in the world",
      "Bangladesh produces most of the world's clothing exports"
    ]
  },
  {
    name: "Bangkok",
    country: "Thailand",
    timezone: "Asia/Bangkok",
    utcOffset: 7,
    funFacts: [
      "Bangkok's full ceremonial name has 169 characters - world's longest!",
      "The city has over 400 Buddhist temples (called 'wats')",
      "Bangkok was once called the 'Venice of the East' for its canals"
    ]
  },
  {
    name: "Singapore",
    country: "Singapore",
    timezone: "Asia/Singapore",
    utcOffset: 8,
    funFacts: [
      "Chewing gum has been banned in Singapore since 1992",
      "Singapore is one of only three surviving city-states in the world",
      "The country has the world's best airport (Changi) for years running"
    ]
  },
  {
    name: "Tokyo",
    country: "Japan",
    timezone: "Asia/Tokyo",
    utcOffset: 9,
    funFacts: [
      "Tokyo's Shibuya Crossing sees 2,500 people cross per light change",
      "There are more vending machines in Japan than people in New Zealand",
      "Tokyo has the most Michelin-starred restaurants in the world"
    ]
  },
  {
    name: "Sydney",
    country: "Australia",
    timezone: "Australia/Sydney",
    utcOffset: 10,
    funFacts: [
      "The Sydney Opera House has over 1 million roof tiles",
      "Sydney Harbour Bridge is nicknamed 'The Coathanger'",
      "Sydney is larger in area than Los Angeles and London combined"
    ]
  },
  {
    name: "Nouméa",
    country: "New Caledonia",
    timezone: "Pacific/Noumea",
    utcOffset: 11,
    funFacts: [
      "New Caledonia has the world's largest lagoon (UNESCO World Heritage)",
      "The island has been called 'the closest thing to paradise'",
      "New Caledonia has unique plants found nowhere else on Earth"
    ]
  },
  {
    name: "Auckland",
    country: "New Zealand",
    timezone: "Pacific/Auckland",
    utcOffset: 12,
    funFacts: [
      "Auckland is built on 50 volcanic cones",
      "The city is known as the 'City of Sails' - more boats per capita than anywhere",
      "Auckland was New Zealand's capital until 1865"
    ]
  }
];

// We export the cities array so other files can use it
export default cities;
