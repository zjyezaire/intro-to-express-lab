import express from "express";

const app = express();

const username = "zjyezaire";

//----------------------------------------- 1. Be Polite, Greet the User ------------------------------------------------------------------------------------------------------

// Route to handle /greetings/<username>
app.get("/greeting/username", (req, res) => {
  username = req.params.username; // Extract the username from the URL

  // Create the response message using the extracted username
  const responseMessage = `Hello there, ${username}! What a delight it is to see you once more, ${username}.`;

  // Send the message as the response
  res.send(responseMessage);
});

//----------------------------------------- 2. Rolling the Dice ------------------------------------------------------------------------------------------------------
app.get("/roll/:parameter", (req, res) => {
  const parameter = req.params.parameter;

  // Validate if the parameter is a number
  if (!isNaN(parameter)) {
    const maxNumber = parseInt(parameter, 10); // Convert parameter to a number
    const rolledNumber = Math.floor(Math.random() * (maxNumber + 1)); // Generate random number between 0 and maxNumber
    res.send(`You rolled a ${rolledNumber}.`);
  } else {
    res.status(400).send("You must specify a number.");
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

//----------------------------------------- 3. I want THAT One ------------------------------------------------------------------------------------------------------

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

app.get("/collectibles/:index", (req, res) => {
  const index = req.params.index;

  // Validate if the index is a valid number and within bounds
  if (!isNaN(index) && index >= 0 && index < collectibles.length) {
    const collectible = collectibles[parseInt(index, 10)];
    res.send(`Collectible: ${collectible.name}, Price: $${collectible.price}`);
  } else {
    res.status(404).send("Collectible not found.");
  }
});

//----------------------------------------- 4. Filter SHoes by Query Parameters ------------------------------------------------------------------------------------------------------

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];
app.get("/shoes", (req, res) => {
  const { "min-price": minPrice, "max-price": maxPrice, type } = req.query;

  let filteredShoes = shoes;

  if (minPrice) {
    filteredShoes = filteredShoes.filter(
      (shoe) => shoe.price >= parseInt(minPrice)
    );
  }

  if (maxPrice) {
    filteredShoes = filteredShoes.filter(
      (shoe) => shoe.price <= parseInt(maxPrice)
    );
  }

  if (type) {
    filteredShoes = filteredShoes.filter(
      (shoe) => shoe.type.toLowerCase() === type.toLowerCase()
    );
  }

  res.send(filteredShoes);
});
