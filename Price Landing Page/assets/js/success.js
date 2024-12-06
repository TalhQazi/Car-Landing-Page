document.addEventListener("DOMContentLoaded", function () {
  // Retrieve data from local storage or set default
  const carsData =
    localStorage.getItem("carsData") ||
    '[{"make": "Aston Martin", "model": "DBS"}, {"make": "Toyota", "model": "Camry"}]';
  const carJson = JSON.parse(carsData); // Parse the JSON string to an array of objects
  console.log(carJson);

  // Retrieve other details from storage or set default values
  const destination =
    localStorage.getItem("destinationLocation") || "Miami, Florida";
  const pickupLocation =
    sessionStorage.getItem("pickup") || "Charlotte, North Carolina";
  const shippingDate =
    localStorage.getItem("moveDate") || "29th September 2024";
  const destinationLocation = JSON.parse(destination);
  // Display pickup, destination, and shipping date
  document.getElementById("pickupLocation").textContent = pickupLocation;
  document.getElementById("destinationLocation").textContent =
    destinationLocation.address;
  document.getElementById("shippingDate").textContent = shippingDate;

  // Display all cars in the carList container
  const carListContainer = document.getElementById("carList");

  // Ensure carJson is an array and iterate through it
  carJson.splice(1, 29).map((car, index) => {
    const carElement = document.createElement("p");
    carElement.textContent = `Car ${index + 1}: ${car.make} ${car.model}`;
    carListContainer.appendChild(carElement);
  });
});
