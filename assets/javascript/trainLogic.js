var config = {
  apiKey: "AIzaSyAiGaTe2yeRrRM_VTM7Ou_kIjROK9NxDkM",
  authDomain: "traintime-97434.firebaseapp.com",
  databaseURL: "https://traintime-97434.firebaseio.com",
  projectId: "traintime-97434",
  storageBucket: "traintime-97434.appspot.com",
  messagingSenderId: "1028867773899"
};
firebase.initializeApp(config);
var database = firebase.database();



$("#add-train-btn").on("click", function (event) {
  event.preventDefault();


  var trainName = $("#train-name1-input").val().trim();
  var trainDest = $("#dest-input").val().trim();
  var trainTime = $("#time-input").val().trim();
  var trainFreq = $("#frequency1-input").val().trim();
  var trainCost = $("#cost1-input").val().trim();
  
  var newTrain = {
    name: trainName,
    destination: trainDest,
    time: trainTime,
    frequency: trainFreq,
    cost: trainCost};

database.ref().push(newTrain);

  alert("Choo Coo your train has been added");

  $("#train-name1-input").val("");
  $("#dest-input").val("");
  $("#time-input").val("");
  $("#frequency1-input").val("");
  $("#cost1-input").val("");

});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().frequency;
  var trainCost = childSnapshot.val().cost;
  var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % trainFreq;
  var tMinutesTillTrain = trainFreq - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTime = moment(nextTrain).format("hh:mm");
  
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);
  console.log(trainCost);

  $("#train-table").append("<tr><td>"
    + trainName + "</td><td>"
    + trainDest + "</td><td>"
    + trainTime + "</td><td>"
    + trainFreq + "</td><td>"
    + nextTime + "</td><td>"
    + tMinutesTillTrain + "</td><td>"
    + trainCost + "</td></tr>");
});

