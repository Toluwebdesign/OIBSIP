const form = document.getElementById("converter-form");
const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const errorMessage = document.getElementById("error-message");
const resultsSection = document.getElementById("results");

const celsiusResult = document.getElementById("celsius-result");
const fahrenheitResult = document.getElementById("fahrenheit-result");
const kelvinResult = document.getElementById("kelvin-result");

function showError(message) {
  errorMessage.textContent = message;
  resultsSection.hidden = true;
}

function formatTemperature(value, unit) {
  return `${value.toFixed(2)} ${unit}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const rawValue = temperatureInput.value.trim();
  const temperature = Number(rawValue);
  const inputUnit = unitSelect.value;

  if (rawValue === "" || !Number.isFinite(temperature)) {
    showError("Please enter a valid numeric temperature.");
    return;
  }

  // Absolute zero expressed in each possible input unit.
  if (
    (inputUnit === "C" && temperature < -273.15) ||
    (inputUnit === "F" && temperature < -459.67) ||
    (inputUnit === "K" && temperature < 0)
  ) {
    showError("That temperature is below absolute zero. Please enter a valid value.");
    return;
  }

  let celsius;
  if (inputUnit === "C") {
    celsius = temperature;
  } else if (inputUnit === "F") {
    celsius = (temperature - 32) * 5 / 9;
  } else {
    celsius = temperature - 273.15;
  }

  const fahrenheit = (celsius * 9 / 5) + 32;
  const kelvin = celsius + 273.15;

  celsiusResult.textContent = formatTemperature(celsius, "°C");
  fahrenheitResult.textContent = formatTemperature(fahrenheit, "°F");
  kelvinResult.textContent = formatTemperature(kelvin, "K");

  errorMessage.textContent = "";
  resultsSection.hidden = false;
});
