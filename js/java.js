var messageList = [];
var userName = '';

function enter() {
	var newName = document.getElementById('name_account');
	userName = newName.value;
	newName.value = '';
	var chatName = document.getElementById('greeting');
	chatName.innerHTML = 'Hello, ' + userName + '!';
}
var uniqueId = function() {
	var date = Date.now();
	var random = Math.random() * Math.random();

	return Math.floor(date * random).toString();
};
var theMessage = function(text,name) {
	return {
		username: name,
		message: text,
		id: uniqueId()
	};
};

function run() {
	var dialogPanel = document.getElementsByClassName('dialog-panel')[0];
	dialogPanel.addEventListener('click', delegateEvent);
	var allMessages = restore();
	createAllMessages(allMessages);
}

function createAllMessages(allMessages) {
	for(var i = 0; i < allMessages.length; i++)
		addMessage(allMessages[i]);
}

function delegateEvent(evtObj) {
	if(evtObj.type === 'click' && evtObj.target.classList.contains('btn-primary'))
			onSendMessageButtonClick(userName);
}

function onSendMessageButtonClick(userName) {
	if(userName == '')
		userName = "Name";
	var textMessage = document.getElementById('message');
	var newMessage = theMessage(textMessage.value, userName);
	if(textMessage.value == '')
		return;
	addMessage(newMessage);
	textMessage.value = '';
	store(messageList);
}



function addMessage(message) {
	var tmpMessage = createMessage(message);
	var sentMessages = document.getElementsByClassName('sent')[0];
	messageList.push(message);
	sentMessages.appendChild(tmpMessage);
}

function createMessage(message) {
	var temp = document.createElement('div');
	var htmlAsText = '<div id="sent-message-area" mes-id="идентификатор"> user name: Message text </div><br>';
	temp.innerHTML = htmlAsText;
	update(temp.firstChild, message);
	return temp.firstChild;
}

function update(divItem, message) {
	divItem.setAttribute('mes-id', message.id);
	divItem.lastChild.textContent = message.username + ": "+ '\n' + message.message;
}

function store(listToSave) {
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	localStorage.setItem("History", JSON.stringify(listToSave));
}
function restore() {
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	var item = localStorage.getItem("History");
	return item && JSON.parse(item);
}

/*var sc = getElementById('message-history');
	sc.scrollTop = element.scrollHeight;*/