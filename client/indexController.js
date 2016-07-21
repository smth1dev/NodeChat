
function register(){

var reguser = {};

reguser.firstName = $("#firstName").val();
reguser.lastName = $("#lastName").val();
reguser.email = $("#email").val();
reguser.usernameReg = $("#usernameReg").val();
reguser.passwordReg = $("#passwordReg").val();
reguser.passwordRegRepeat = $("#passwordRegRepeat").val();	


	// $.post( "http://localhost:3000/register", reguser, function( data ) {
	// 	  alert(JSON.stringify(data));
	// 	});

	$.ajax({
        url : "http://localhost:3000/register",
        type: "POST",
        data: JSON.stringify(reguser),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success    : function(response){
            alert(JSON.stringify(response))
            if(response.status != 200){
                alert(response.message);
            }else{
                window.location = "http://localhost:3000/chatrooms";
            }
            
        }
    });

}

function login(){
var loguser = {};

loguser.username = $("#username").val();
loguser.password = $("#password").val();

	$.ajax({
        url : "http://localhost:3000/login",
        type: "POST",
        data: JSON.stringify(loguser),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success    : function(response){
        	if(response.status != 200){
                alert(response.message);
            }else{
                 window.location = "http://localhost:3000/chatrooms";
            }
        }
    });
}