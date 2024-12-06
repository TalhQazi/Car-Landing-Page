function renderFormsBasedOnQuantity() {
  const selectedQuantity = document.getElementById("selectQuantity").value;
  const formsContainer = document.getElementById("dynamicFormsContainer");

  // Clear any existing forms
  formsContainer.innerHTML = "";

  // Generate forms based on the selected quantity
  for (let i = 1; i <= selectedQuantity; i++) {
    const formSection = document.createElement("div");
    formSection.classList.add("mb-4");

    formSection.innerHTML = `
      <h5 class="mt-4 fw-bold">Car ${i} Details</h5>
      <div class="mb-3">
        <label for="selectYear${i}" class="form-label">Year</label>
        <select class="form-select" id="selectYear${i}" onChange="saveFormData(${i})">
          <option value="">Select Year</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="selectMake${i}" class="form-label">Make</label>
        <select class="form-select" id="selectMake${i}" onChange="saveFormData(${i})">
          <option value="">Select or Type</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="Ford">Ford</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="selectModel${i}" class="form-label">Model</label>
        <select class="form-select" id="selectModel${i}" onChange="saveFormData(${i})">
          <option value="">Select or Type</option>
          <option value="Camry">Camry</option>
          <option value="Civic">Civic</option>
          <option value="Mustang">Mustang</option>
        </select>
      </div>
      `;

    formsContainer.appendChild(formSection);
  }
}

// Save form data to local storage for each form
function saveFormData(carIndex) {
  // Get the values for the current car form
  const year = document.getElementById(`selectYear${carIndex}`).value;
  const make = document.getElementById(`selectMake${carIndex}`).value;
  const model = document.getElementById(`selectModel${carIndex}`).value;

  // Validate that all fields are filled
  if (!year || !make || !model) {
    console.log("Please fill in all fields before saving.");
    return; // Exit the function if any field is empty
  }

  // Retrieve the array of cars data or initialize it as an empty array
  const allCarsData = JSON.parse(localStorage.getItem("carsData")) || [];

  // Create an object for the current car
  const carData = { year, make, model };

  // Update the car at the correct index or add it to the array
  allCarsData[carIndex] = carData;

  // Save the updated array back to local storage
  localStorage.setItem("carsData", JSON.stringify(allCarsData));
}

// Save the entered shipping address in local storage
function saveShippingAddress() {
  const shippingAddress = document.getElementById("locationInput").value;
  localStorage.setItem("shippingAddress", shippingAddress);
}

// Save contact information to local storage
function saveContactInfo() {}

window.onload = localStorage.clear();

function sendSuccessEmail() {
  // Retrieve user input
  const fullName = document.getElementById("fullName").value;
  const emailAddress = document.getElementById("emailAddress").value;
  const phoneNumber = document.getElementById("phoneNumber").value;

  // Create an object with the contact information
  const contactInfo = {
    fullName,
    emailAddress,
    phoneNumber,
  };

  // Save the contact information to local storage
  localStorage.setItem("email", emailAddress);

  // Retrieve and parse car data from local storage
  const carModel = localStorage.getItem("carsData") || "[]"; // Ensure it's a JSON array
  const carJson = JSON.parse(carModel);

  // Check if carJson is an array and not empty
  if (!Array.isArray(carJson) || carJson.length === 0) {
    console.error("No car data found");
    return; // Exit the function if there are no cars
  }

  const destination =
    localStorage.getItem("shippingAddress") || "Miami, Florida";
  const pickupLocation = sessionStorage.getItem("pickup") || "";
  const shippingDate =
    localStorage.getItem("moveData") || "29th September 2024";

  // Construct the email body with all selected cars
  let carDetails = carJson.splice(1, 23).map((car, index) => {
    return ` Car ${index + 1}: ${car.year} ${car.make} ${car.model}`;
  });

  // Check if carDetails is being constructed correctly
  console.log("Car Details:", carDetails);

  const successPageHtml = `
    Success!
    Your Quote Has Been Saved To Your Profile.
    Check Your Phone & Email, Your Coordinator Will Call You Shortly With Your Full Quote & To Go Over Options Such As; Open Trailer, Enclosed Trailer, And Carrier Tier Pricing
    Your Cars : ${carDetails}
    Pickup: ${pickupLocation}
    Address: ${destination}
    Date: ${shippingDate}
  
`;
  console.log("Success Page HTML:", successPageHtml);

  const templateParams = {
    to_email: "defa07701@gmail.com", // Recipient's email address
    subject: "Success Page",
    message: successPageHtml,
  };

  // Send the email
  emailjs
    .send("service_8lryhja", "template_mm6iitm", templateParams)
    .then((response) => {
      console.log("Email sent successfully!", response.status, response.text);
      window.location.href = "/success.html";
    })
    .catch((error) => {
      console.error("Failed to send email:", error);
    });
}
// Initialize Google Places Autocomplete
function initAutocomplete() {
  const locationInput = document.getElementById("locationInput");
  const autocomplete = new google.maps.places.Autocomplete(locationInput);

  // Specify location data types (name and address components)
  autocomplete.setFields(["name", "geometry", "address_components"]);

  // Event listener for when a user selects a location from the suggestions
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    // Verify if the place has geometry (coordinates)
    if (place.geometry) {
      // Get the full address by parsing address components
      const address = place.address_components
        ? place.address_components
            .map((component) => component.long_name)
            .join(", ")
        : "N/A";

      // Save the address to localStorage
      localStorage.setItem(
        "destinationLocation",
        JSON.stringify({
          address: address,
        })
      );
    }
  });
}

// Load the autocomplete when the page is loaded
window.onload = initAutocomplete;

async function fetchLocation() {
  const location = document.getElementById("locationInput").value;
  const apiKey = "AIzaSyAikl5rTmhg-UJJ4CDgZ3heseJTbHXDZAw";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    location
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data.status === "OK") {
      const { formatted_address } = data.results[0];

      const address = localStorage.setItem("addres", formatted_address);
      console.log(address);
    } else {
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
    document.getElementById("locationResult").textContent =
      "Failed to fetch location data.";
  }
}
