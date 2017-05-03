$(document).ready(function(){

	 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC1N6Zp23DEZeSNQp5oNMvVo1v8RZ1Qyu0",
    authDomain: "rps-multiplayer-7edb8.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-7edb8.firebaseio.com",
    projectId: "rps-multiplayer-7edb8",
    storageBucket: "rps-multiplayer-7edb8.appspot.com",
    messagingSenderId: "915002561083"
  };
	firebase.initializeApp(config);

	// creating instance db
	var db = firebase.database();

	// initializng variables
	var wins = 0;
	var looses = 0;
	var name;
	var rock = "rock";
	var paper = "paper";
	var scissors = "scissors";
	var user1;
	var user2;
	// keep track of connections
	var connect = 0;
	
  	var connectedRef = db.ref(".info/connected");
	console.log(connectedRef);
	db.ref(".info/connected").on('value', function(snapshot) {
  		if (snapshot.val()) {
    		console.log(snapshot.val());
    		connect++;
    		console.log(connect);

  		}
  // 		db.ref("/connections").push({
		// 	connect: connect
		// });
  		

	});

	// players are ready
	// var p = $("<p>");
	// p.text("Waiting For Player 1");
	$("#player1-choice").html("<p>Waiting For Player 1</p>");
	$("#player2-choice").html("<p>Waiting For Player 2</p>");

	
	// giving user name from input
	$("#add-user").on("click", function(event){
		event.preventDefault();
		//db.ref("/players").on('value', function(snapshot){
			// var svArr = Object.keys(snapshot.val());
   //    		var firstUserKey = svArr[0];
   //    		var secondUserKey = svArr[1];
   console.log(db.ref().hasChild("players"));
   			
			if(db.ref().hasChild("players")){
				user1 = $("#start").val().trim();
				db.ref("/players").push({
					user1:{
					name: user1,
					looses: 0,
					wins: 0}
					
				});

			}else{
				user2 = $("#start").val().trim();
				db.ref("/players").push({
					user2:{name: user2,
					looses: 0,
					wins: 0}
					
			
				});
				return false;
			}


		// push user  info to firebase db
		// db.ref("/players").push({
		// 	user1: user1,
		// 	user2: user2
		// });
	//});
		
		

		

		
		
	});
	
	// retreiving data from database
	db.ref("/players").on("child_added", function(snapshot){
		var sv = snapshot.val();

		// Getting an array of each key In the snapshot object
      	var svArr = Object.keys(sv);
      	var firstUserKey = svArr[0];
      	var secondUserKey = svArr[1];


		console.log(firstUserKey);
		$("#players").show();

		if(firstUserKey){
  			// players
  			$("#round").append("<p>Hi "+sv.user1+" you are player 1.</p>");
  		}
		$("#player1-choice").html("<p>"+sv.user1+"</p>");
		$("#player1").html("<p>"+sv.user1+"</p>");


	});
	var ref = firebase.database().ref("/players");
	ref.onDisconnect().remove();
});




