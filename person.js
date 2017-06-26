var socket = io.connect('https://guassa.herokuapp.com/');
var yourname;

socket.on('receive', receiveMsg);

socket.on('here', nowonline);

socket.on('somethinghapenswithaname', vollgeilername);

function nowonline(online) {
  console.log(online + " persons are online");
}

function selname() {
  if (document.getElementById("name").value == "") {
    alert("Please write a name");
  } else {
    if (yourname == null) {
      yourname = document.getElementById("name").value;
      var newname = yourname + " has joined";
    } else {
      var oldname = yourname;
      yourname = document.getElementById("name").value;
      var newname = oldname + " has changed his name to: " + yourname;
    }
    socket.emit('somethinghapenswithaname', newname);
  }
}

function vollgeilername(newname) {
  var messagekasten =  document.createElement("DIV");
  messagekasten.style.width = "90%";
  messagekasten.align = "center";
  messagekasten.style.backgroundColor = "#C3F0FF";
  messagekasten.style.marginLeft = "5%";
  messagekasten.style.wordWrap = "break-word";
  messagekasten.style.borderRadius = "25px";
  document.getElementById("chat").appendChild(messagekasten);

  var m = document.createElement("P");
  var text = document.createTextNode(newname);
  m.style.fontSize = "20px";
  m.style.color = "black";
  m.style.margin = "0px";
  m.appendChild(text);

  messagekasten.appendChild(m);
}

function receiveMsg(data) {
  var messagekasten =  document.createElement("DIV");
  messagekasten.style.width = "40%";
  messagekasten.style.backgroundColor = "white";
  messagekasten.style.wordWrap = "break-word";
  messagekasten.style.borderRadius = "25px";
  document.getElementById("chat").appendChild(messagekasten);

  var m = document.createElement("P");
  var text = document.createTextNode(data.message);
  m.style.fontSize = "20px";
  m.style.color = "black";
  m.style.margin = "0px";
  m.appendChild(text);

  var n = document.createElement("P");
  var name = document.createTextNode(data.name);
  n.style.color = "black";
  m.style.margin = "0px";
  n.style.fontSize = "15px";
  n.appendChild(name);

  m.style.marginLeft = "5%";
  n.style.marginLeft = "5%";
  m.style.marginRight = "5%";
  n.style.marginRight = "5%";

  messagekasten.appendChild(n);
  messagekasten.appendChild(m);
}


function Send() {
  if (document.getElementById("message").value != "") {
    if (yourname != null) {
      var data = {
        name: yourname,
        message: document.getElementById("message").value
      }
      var messagekasten =  document.createElement("DIV");
      messagekasten.style.width = "40%";
      messagekasten.style.marginLeft = "60%";
      messagekasten.style.wordWrap = "break-word";
      messagekasten.style.backgroundColor = "#9FF781";
      messagekasten.style.borderRadius = "25px";

      document.getElementById("chat").appendChild(messagekasten);

      var m = document.createElement("P");
      var text = document.createTextNode(data.message);
      m.style.fontSize = "20px";
      m.style.color = "black";
      m.style.margin = "0px";
      m.appendChild(text);

      var n = document.createElement("P");
      var name = document.createTextNode(data.name);
      n.style.color = "black";
      m.style.margin = "0px";
      n.style.width = "25%";
      n.style.fontSize = "15px";
      n.appendChild(name);

      m.style.marginLeft = "5%";
      n.style.marginLeft = "5%";
      m.style.marginRight = "5%";
      n.style.marginRight = "5%";

      messagekasten.appendChild(n);
      messagekasten.appendChild(m);

      socket.emit('send', data);

      document.getElementById("message").value = "";
    } else {
      alert("Please write a name");
    }
  }
}
