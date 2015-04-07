var ListOfMessages = [];
var account_name = '';

function enterInAccount() {
	var newName = document.getElementById('account_name');
	account_name = newName.value;
	newName.value = '';
	var greeting = document.getElementById('greeting');
	greeting.innerHTML =  'Hello,' + account_name;
}

function send() {
	var message = document.getElementById('message').value;
	var name = account_name;
	createMessage(message, name);
	document.getElementById('message').value = '';
}

function createMessage(mesage, name) {
	var element = document.getElementById('messages');
	
	var newEl = document.createElement("div");
	newEl.id = "message_box_in";
	element.appendChild(newEl);
	
	var name_mes = document.createElement("a");
	name_mes.id = "name_in_mes";
	name_mes.innerHTML = '<u><b>' + name + " :" + '</b></u>';
	newEl.appendChild(name_mes);
	
	var newButtonDel = document.createElement("input");
	newButtonDel.id = "button_d";
	newButtonDel.type = "button";
	newEl.appendChild(newButtonDel);
	
	var value = document.createElement("a");
	value.innerHTML = '<br>' + mesage + ' ';
	newEl.appendChild(value);
	
	var p = document.createElement("p");
	newEl.appendChild(p);
	
	element.scrollTop = element.scrollHeight;
}


function exit(){
	window.close(true);
}

var http = require('http');
var util = require('util');
var getIp = require('..\\getIp');

var ip = getIp();
var port = 31337;

var token = 0;
var body = '';
var period = 10000;

function get() {
	var optionsGet = {
 		hostname: getIp(),
 		port: port,
  		path: '/',
  		method: 'GET'
	};

	optionsGet.path = setUrl(token);
	var get = http.get(optionsGet, function(response) {
		onDataFromServer(response, function(incoming) {
			incomingObj = JSON.parse(incoming);
			//console.log('client token: ' + token);
			//console.log('incoming token: ' + incomingObj.token);
			if ( token < incomingObj.token ) {
				token = incomingObj.token;
				incomingObj.messages.forEach(function(message) {
					console.log(message);
				}) 	
			}
			
		})
	
	});

	get.on('error', function(e){
		process.exit();
	});
}



