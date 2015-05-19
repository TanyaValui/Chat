var userNameGlobal = '';
var messagesForDeleting = [];
var messageCounter = 0;

var uniqueId = function() {
	var date = Date.now();
	var random = Math.random() * Math.random();

	return Math.floor(date * random).toString();
};

var singleMessage = function ( message){
	return {
        sender: userNameGlobal,
        sent: message,
        id: uniqueId()
	};
};

var correspondenceList = [];
function run(){
    var buttonLogin = document.getElementsByClassName('login')[0];
    var buttonChange = document.getElementsByClassName('change-name')[0];
    var buttonSend = document.getElementsByClassName('send-message')[0];
    var messagesList = document.getElementById('correspondence');
    var deleteButton = document.getElementsByClassName('delete')[0];
    var editButton = document.getElementsByClassName('edit')[0];
    userNameGlobal = restore() || "username";
    setUserName();
    var allMessages = restoreMsg() || [];
    recreateAllMessages(allMessages);
    buttonLogin.addEventListener('click', onLoginButtonClick);
    buttonChange.addEventListener('click', onChangeButtonClick);
    buttonSend.addEventListener('click', onSendButtonClick);
    messagesList.addEventListener('click', emit);
    deleteButton.addEventListener('click', onDeleteButtonClick);
}

function setUserName(){
	document.getElementsByClassName("current-user")[0].innerHTML = userNameGlobal;
}

function recreateAllMessages(allMessages){
	if(allMessages.length > 0){
	for(var i=0; i<allMessages.length; i++)
		addNewMessage(allMessages[i]);
    }
}	

function onLoginButtonClick(){
	var userName = document.getElementById('name-field');

    if(!userName.value){
		return;
	}
	userNameGlobal = userName.value;
	document.getElementsByClassName("current-user")[0].innerHTML = userName.value;
	store();
	userName.value = "";
	
} 

function onChangeButtonClick(){
	var userName = document.getElementById('name-field');

    if(!userName.value){
		return;
	}
	userNameGlobal = userName.value;
	document.getElementsByClassName("current-user")[0].innerHTML = userName.value;
	store();
	userName.value = "";
	
} 

function onSendButtonClick(){
	messageCounter++;
	var userName = document.getElementsByClassName('current-user')[0];
	var message =  document.getElementsByClassName('write-message')[0];
	var newMessage = singleMessage(message.value);
	if(!message.value){
		return;
	}
	addNewMessage(newMessage);
	storeMsg(correspondenceList);
	message.value = "";
}

function addNewMessage(msg){
	var message = createMessage(msg);
	correspondenceList.push(msg);
	document.getElementById('correspondence').getElementsByTagName('ul')[0].appendChild(message);
}

function createMessage(msg){
	var itemDiv = document.createElement('div');
	var senderLi = document.createElement('li');
	var text = document.createTextNode(msg.sender);
	itemDiv.classList.add('item');
	itemDiv.setAttribute('id', msg.id);
	senderLi.appendChild(text);
	senderLi.setAttribute('id', 'user1');
	var sentLi = document.createElement('li');
	text = document.createTextNode(msg.sent);
	sentLi.appendChild(text);
	sentLi.setAttribute('id', 'message');
	itemDiv.appendChild(senderLi);
	itemDiv.appendChild(sentLi);
	return itemDiv;
}

function emit(evtObj){
	if(evtObj.type === 'click' && evtObj.target.nodeName == 'LI'){
		var clickedMessage = evtObj.target.parentElement;
		if(!clickedMessage.classList.contains("emit-style")){
		clickedMessage.classList.add("emit-style");
		messagesForDeleting.push(clickedMessage.id);
	}
	else{
		clickedMessage.classList.remove("emit-style");
		messagesForDeleting.splice(messagesForDeleting.indexOf(clickedMessage.id), 1);
	}

	}

}


function onDeleteButtonClick(){
	var parentElement = document.getElementById('correspondence').getElementsByTagName('ul')[0];
    for(var i=0; i<messagesForDeleting.length; i++){
    	var childElement = document.getElementById(messagesForDeleting[i]);
    	parentElement.removeChild(childElement);
    }
    for(var i=0; i<messagesForDeleting.length; i++){   	
    	for(var k=0; k<correspondenceList.length; k++){
    		if( messagesForDeleting[i] == correspondenceList[k].id){
    		correspondenceList.splice(k, 1);
    		break;
    	    }
    	}
    }
    storeMsg(correspondenceList);
    messagesForDeleting.splice(0, messagesForDeleting.length);
}

function store() {

	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	localStorage.setItem("current user", userNameGlobal);
}

function storeMsg(listToSave) {
	
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	localStorage.setItem("correspondence", JSON.stringify(listToSave));
}

function restore() {
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	var item = localStorage.getItem("current user");

	return item;
}


function restoreMsg() {
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	var item = localStorage.getItem("correspondence");

	return item && JSON.parse(item);
}