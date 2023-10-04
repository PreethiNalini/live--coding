// A user array of objects will be provided with name, age and zip Code

// The frontend should contain an input box with Search button

// Each user has a unique US zip code.

// Find the city, state and country using the zip code API. The user list provided might contain invalid zip codes. The Scenario should be handled properly with a valid error message “User found and Invalid Zip code”.

// When a user’s name is provided in the input field, one of the below scenarios should occur

// If,

// User found and the age is above 18 and contains a valid zip code- display a message named “User found” along with the country, state and city.

// User found and the age is above 18 and contains an invalid zip code - display a message named “User found and Invalid Zip code”

// User found and the age is below 18 – display message “User found but under the age limit”

// User is not found – display a message “User not found”

const invalidZipcode = 92493;

const users = [
  { name: "Steve", age: 18, zipcode: 35004 },

  { name: "John", age: 34, zipcode: 99501 },

  { name: "Jack", age: 19, zipcode: 99535 },

  { name: "Jonas", age: 26, zipcode: 85001 },

  { name: "Smith", age: 39, zipcode: 71601 },

  { name: "Casey", age: 26, zipcode: 32003 },

  { name: "Robert", age: 17, zipcode: 96701 },

  { name: "Daniel", age: 21, zipcode: 83201 },

  { name: "Joseph", age: 42, zipcode: 70001 },

  { name: "Jessica", age: 31, zipcode: 59001 },

  { name: "Tom", age: 32, zipcode: 37010 },

  { name: "Trevor", age: 24, zipcode: 24701 },

  { name: "Mark", age: 54, zipcode: 96910 },

  { name: "Jamie", age: 39, zipcode: 84001 },

  { name: "Alex", age: 15, zipcode: 88595 },
];

async function submit() {
  const input = document.querySelector(".userName").value;
  //check the user name
  const user = users.find((user) => user.name === input);
  //display result
  const display = document.querySelector(".result");

  if (user) {
    const { age, zipcode } = user;
    if (age > 18) {
      const information = await locationInformation(zipcode);
      if (information) {
        display.innerText = `user found ${information}`;
      } else {
        display.innerText = "User found and Invalid Zip code";
      }
    } else {
      display.innerText = "User found but under the age limit";
    }
  } else {
    display.innerText = "user not found";
  }
}

async function locationInformation(zipcode) {
  try {
    const response = await fetch(`https://ziptasticapi.com/${zipcode}`);
    const msg = await response.json();
    console.log(msg);
    if (msg.error) {
      return false;
    }
    const state = msg.state;
    const country = msg.country;
    const city = msg.city;
    return `state:${state},country:${country},city:${city}`;
  } catch (error) {
    console.log(error);
  }
}

//fetch(`https://ziptasticapi.com/01094`).then((res) => console.log(res.json()));
