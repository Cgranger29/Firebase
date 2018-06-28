// add in config for firebase DB

 var config = {
	apiKey: "AIzaSyCI625HMTX21ok0yaQTnYL_uxw9bWQIFJo",
	authDomain: "train-schedule-4d533.firebaseapp.com",
	databaseURL: "https://train-schedule-4d533.firebaseio.com",
	projectId: "train-schedule-4d533",
	storageBucket: "",
	messagingSenderId: "117242632960"
 };
 
 firebase.initializeApp(config);
 
 //add DB ref variable
 let database = firebase.database();
 
let now = moment();

let x = "2018-06-25 16:00:00";

let start_time = moment(x, 'YYYY-MM-DD hh:mm');
console.log(start_time.format('YYYY-MM-DD hh:mm A'));

console.log(now.format('YYYY-MM-DD hh:mm A'));

let diff = start_time.diff(now, 'minutes');

console.log(diff);

//Submit function definition
$(".btnsubmit").click(function(e) {
	//define variable for all user inputs on page
	let name = $("#name").val().trim();
	let dest = $("#destination").val().trim();
	let train_time = $("#first").val().trim();
	let freq = $("#freq").val().trim();
	let arrival = "TBD";
	let min_away = "TBD";
	let timeDifference = moment().diff(moment(train_time,"hh:mm A"),'m');
	//prevents page from refreshing on submit
	e.preventDefault();
	//reset the form on submit
	$("#form")[0].reset();
		
		//pushes the values from user input to database. Will most likely be replaced with append so as to not overwrite the data
		database.ref().push({
		Train_Name: name,
		Destination: dest,
		First_Train_Time: train_time,
		Frequency: freq,
		Time_To_Arrival: timeDifference,
	
	});
	
});
	
	
//update html page values based on values returned from the database	
 database.ref().on('child_added', function(snapshot){
	 console.log(snapshot.val());
	 console.log(snapshot.val().Train_Name);
	let name = snapshot.val().Train_Name;
	let dest = snapshot.val().Destination;
	let train_time = snapshot.val().First_Train_Time;
	let freq = snapshot.val().Frequency;
	let arrival = "TBD";
	let min_away = "TBD";
    let timeDifference = moment().diff(moment(train_time,"hh:mm A"),'m');

	$("#table_data").append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + train_time + "</td><td>" + timeDifference*-1 + "</td></tr>");
	 
 });
 
 
 //30 second refreshes to show updated data
 setTimeout(function(){
    location = ''
  },60000)