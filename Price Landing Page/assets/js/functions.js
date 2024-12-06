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
      sessionStorage.setItem(
        "selectedLocation",
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
