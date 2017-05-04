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
	var counter = 0;
	var currentUser;
	
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
		db.ref().once('value', function(snapshot){
			
   			console.log(snapshot.val());
   			
			if(snapshot.val() == null){
				user1 = $("#start").val().trim();
				 currentUser = user1;
				$("#start-col").remove();
				db.ref().push({
					user1:{
					name: user1,
					looses: 0,
					wins: 0
				}
				});
				counter++;
				$("#players").show();
	  			// players
	  			$("#round").html("<p>Hi "+currentUser+" you are player 1.</p>");
	  			$("#player1-choice").html("<p>"+user1+"</p>");
				$("#player1").html("<p>"+user1+"</p>");
				
			}else{

				user2 = $("#start").val().trim();
				$("#start-col").remove();
				db.ref().push({
					user2:{
					name: user2,
					looses: 0,
					wins: 0,
					
					}
			
				});
				counter++;
				$("#players").show();
	  			$("#round").html("<p>Hi "+user2+" you are player 2.</p>");
	  			$("#player2-choice").html("<p>"+user2+"</p>");
				$("#player2").html("<p>"+user2+"</p>");
				

			}
			console.log(user1);
			// if(!user1 == null){
			// 	$("#players").show();
	  // 			// players
	  // 			$("#round").html("<p>Hi "+currentUser+" you are player 1.</p>");
	  // 			$("#player1-choice").html("<p>"+user1+"</p>");
			// 	$("#player1").html("<p>"+user1+"</p>");
	  // 		}else if(!user2 == null){
	  // 			$("#players").show();
	  // 			$("#round").html("<p>Hi "+user2+" you are player 2.</p>");
	  // 			$("#player2-choice").html("<p>"+user2+"</p>");
			// 	$("#player2").html("<p>"+user2+"</p>");
	  // 		}
		
				// var svArr = Object.keys(snapshot.val());
    //    			var firstUserKey = svArr[0];
   	//     		var secondUserKey = svArr[1];
				// console.log(firstUserKey.name);

		// push user  info to firebase db
		// db.ref("/players").push({
		// 	user1: user1,
		// 	user2: user2
		// });
	});
		
		

	$("#rock").on('click', function(){

	});

		
		
	});
	// $(window).load(function(){});
	// retreiving data from database
	db.ref().on("child_added", function(childSnapshot){
		var sv = childSnapshot.val();

		// Getting an array of each key In the snapshot object
      	var svArr = Object.keys(sv);
      	var firstUserKey = svArr[0];
      	console.log(firstUserKey);
      	var secondUserKey = svArr[svArr.length-1];
      	console.log(secondUserKey);


		console.log(sv[firstUserKey].name);
		




	});
	var ref = firebase.database().ref();
	
	ref.onDisconnect().remove();
});




