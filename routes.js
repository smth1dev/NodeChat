
module.exports.handler = function (app){

var sess;

app.get('/', function(req, res) {
	if(req.session.username)
		res.sendFile(__dirname + '/client/chatrooms/home.html');
	else
	 	res.sendFile(__dirname + '/client/appIndex.html');
	
});

app.post('/login',function(req, res){
	var user = req.body;
	DAO.logUser(user,function(err,foundUser){
		if(err){
			var response = {};
			response.message = "Wrong Credentials";
			response.status = 404;
			res.send(response);
		}else{
			var response = {};
			response.message = "Successfull Log in";
			response.status = 200;
			req.session.username = foundUser.usernameReg ;
			res.send(response);
		}
	});
});

app.post('/register',function(req, res){

	var user = req.body;
	DAO.insertUser(user,function(err){
		if(err){
			console.log(err);
			var response = {};
			response.message = "Error while trying to register User...";
			response.status = 500;
			res.send(response);
		}else{

			var response = {};
			response.message = "Successfull Registration";
			response.status = 200;
			req.session.username = user.usernameReg ;
			console.log(req.session.username);
			res.send(response);
		}

		
	});
});


app.get('/users', function (req, res) {
  DAO.getUsers(function (err,users){

  	if(err){

  	}else{

  		var usersResult = [];
  		for(var i=0;i<users.length;i++){
  			console.log(users[i]);
  			var user = {};
  			user.username = users[i].usernameReg;
  			user.email = users[i].email;
  			user.firstName = users[i].firstName;
  			user.lastName = users[i].lastName;
  			usersResult.push(user);
  		}

  		res.send(usersResult);
  	}
  });
  res.end();
});


app.get('/chatrooms',function(req, res){
	if(req.session.username)
		res.sendFile(__dirname + '/client/chatrooms/home.html');
	else
		res.send("No auth")
});

app.get('/private',function(req, res){
	if(req.session.username)
		res.sendFile(__dirname + '/client/chatrooms/private.html');
	else
		res.send("No auth")
});

}