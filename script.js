// Write your JavaScript code here!
function display() {
  let destination = document.querySelector("#missionTarget");
  fetch("https://handlers.education.launchcode.org/static/planets.json").then(
    function(response) {
      response.json().then(function(json) {
        let index = Math.floor(Math.random() * json.length);
        destination.innerHTML = `
            <h2>Mission Destination</h2>
            <ull>
               <li>Name: ${json[index].name}</li>
               <li>Diameter: ${json[index].diameter}</li>
               <li>Star: ${json[index].star}</li>
               <li>Distance from Earth: ${json[index].distance}</li>
               <li>Number of Moons: ${json[index].moons}</li>
            </ul>
            <img src="${json[index].image}">
         `;
        index = (index + 1) % json.length;
      });
    }
  );
}

function validateForm() {
  let pilot = document.querySelector("input[name=pilotName]");
  let copilot = document.querySelector("input[name=copilotName]");
  let fuel = document.querySelector("input[name=fuelLevel]");
  let mass = document.querySelector("input[name=cargoMass]");
  let items = document.querySelector("#faultyItems");
  let form = document.querySelector("form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (!pilot.value || !copilot.value || !fuel.value || !mass.value) {
      alert("All fields are required!");
    } else if (isNaN(fuel.value) || isNaN(mass.value)) {
      alert("Make sure to enter valid information for each field!");
    } else {
      let cargoStatus;
      let launchStatus;
      document.querySelector(
        "#pilotStatus"
      ).innerHTML = `Pilot ${pilot.value} is ready for launch`;
      document.querySelector(
        "#copilotStatus"
      ).innerHTML = `Co-pilot ${copilot.value} is ready for launch`;
      if (+mass.value > 9999) {
        document.querySelector("#cargoStatus").innerHTML =
          "Cargo mass is too high to launch";
        cargoStatus = false;
      } else {
        document.querySelector("#cargoStatus").innerHTML =
          "Cargo mass is low enough to launch";
        cargoStatus = true;
      }

      if (+fuel.value < 10000) {
        document.querySelector("#fuelStatus").innerHTML =
          "Fuel level is too low for launch";
        launchStatus = false;
      } else {
        document.querySelector("#fuelStatus").innerHTML = "Fuel level is good";
        launchStatus = true;
      }
      if (launchStatus === false || cargoStatus === false) {
        document.querySelector("#launchStatus").innerHTML =
          "Shuttle Not Ready for Launch";
      } else {
        document.querySelector("#launchStatus").innerHTML =
          "Shuttle Ready for Launch";
      }
      document.querySelector("#faultyItems").style.visibility = "visible";
    }
  });
}

window.onload = function() {
  display();
  validateForm();
};
