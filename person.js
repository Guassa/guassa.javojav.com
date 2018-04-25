const socket = io.connect('https://guassa.herokuapp.com/');
let yourname;
let settingname = true;

socket.on('receive', receiveMessage);

const askforname = () => {
  document.getElementById("askforname").style.display = 'block';
  settingname = true
}

const setname = newname => {
  if (newname != "") {
    if (newname != yourname) {
      if (yourname == null) socket.emit('namechange', newname + " joined");
        else socket.emit('namechange', yourname + " has changed his name to: " + newname);
        yourname = newname;
      }
      settingname = false;
      document.getElementById("name").innerHTML = yourname;
      document.getElementById("askforname").style.display = 'none';
    }
}

socket.on('namechanged', message => {
  const messagebox =  document.createElement("DIV");
  messagebox.className = "newnamemessage";
  messagebox.align = "center";
  document.getElementById("chat").appendChild(messagebox);
  const messagetext = document.createElement("P");
  messagebox.appendChild(messagetext.appendChild(document.createTextNode(message)));
  document.getElementById("chat").scrollTop += 100;
});

document.addEventListener('keypress', (event) => {
  if (event.key == "Enter") {
    if (settingname) setname(document.getElementById('NameInput').value);
    else sendMessage();
  }
});

function receiveMessage(data) {
  const messagebox =  document.createElement("DIV");
  messagebox.className = "receivedmessage";
  document.getElementById("chat").appendChild(messagebox);

  const messagetext = document.createElement("P");
  messagetext.className = "messagetext";
  messagetext.appendChild(document.createTextNode(data.message));

  const name = document.createElement("P");
  name.className = "messagename";
  name.appendChild(document.createTextNode(data.name));

  messagebox.appendChild(name);
  messagebox.appendChild(messagetext);
  document.getElementById("chat").scrollTop += 100;
}

const imleaving = () => {
  if (yourname != null) socket.emit('namechange', yourname + " left");
}

function sendMessage() {
  if (document.getElementById("message").value != "" && yourname != null) {
    const data = {
      name: yourname,
      message: document.getElementById("message").value
    }
    const messagebox =  document.createElement("DIV");
    messagebox.className = "receivedmessage";
    messagebox.style.backgroundColor = "#9FF781";
    messagebox.style.marginLeft = "60%";
    document.getElementById("chat").appendChild(messagebox);

    const messagetext = document.createElement("P");
    messagetext.className = "messagetext";
    messagetext.appendChild(document.createTextNode(data.message));

    const name = document.createElement("P");
    name.className = "messagename";
    name.appendChild(document.createTextNode(data.name));

    messagebox.appendChild(name);
    messagebox.appendChild(messagetext);
    socket.emit('send', data);

		document.getElementById("chat").scrollTop += 100;
    document.getElementById("message").value = "";
  }
}
