  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCbQ64M69CwypQ_M05yxEtn3FwmQu84bKs",
    authDomain: "my-awesome-project-a194c.firebaseapp.com",
    databaseURL: "https://my-awesome-project-a194c.firebaseio.com",
    projectId: "my-awesome-project-a194c",
    storageBucket: "my-awesome-project-a194c.appspot.com",
    messagingSenderId: "44364381826"
  };
  firebase.initializeApp(config);

  var database  = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var name = $("#train-name-input").val().trim();
  var dest = $("#destination-input").val().trim();
  var time = moment($("#time-input").val().trim(), "hh:mm").format("X");
  var freq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: name,
    destination: dest,
    time: time,
    frequency: freq
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var name = childSnapshot.val().name;
  var dest = childSnapshot.val().destination;
  var time = childSnapshot.val().time;
  var freq = childSnapshot.val().frequency;

  // Employee Info
  console.log(name);
  console.log(dest);
  console.log(time);
  console.log(freq);

  // Prettify the employee start
  var timePretty = moment.unix(time).format("HH:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trainMin = moment().diff(moment.unix(time, "HH:mm"), "minuetes");
  console.log(trainMin);

  // Calculate the total billed rate
  var minAway = time - trainMin;
  console.log(minAway);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" +
  timePretty + "</td><td>" + trainMin + "</td><td>" + freq + "</td><td>" + minAway + "</td></tr>");
});

var whistle



// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
