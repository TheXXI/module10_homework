const message = document.querySelector('#input-message');
const submitBtn = document.querySelector('#submit');
const geoBtn = document.querySelector('#geo');
const output = document.querySelector('#messages-box');

const url = "wss://echo-ws-service.herokuapp.com";

const ws = new WebSocket(url);
    
ws.onopen = () => {
    console.log("CONNECTED");
}

ws.onmessage = (e) => {
    console.log('[SERVER]: ' + e.data + ' ' + new Date());
    createAndDisplayMessage(`Сообщение сервера: ${e.data}`, 'server');
}

ws.onclose = () => {
    console.log("DISCONNECTED");
}

ws.onerror = (e) => {
    console.log("ERROR:" + e.data);
}

    

function createAndDisplayMessage (text, sender='user') {
    if (output.innerHTML == '') {
        output.style.display = "block";
    }
    const whoSender = (sender == 'user') ? ' text-align:right;' : '' ;
    const message = `<div style="margin: 0 5px 24px 5px;${whoSender}"><span class="message">${text}</span></div>`;
    output.innerHTML += message;
}

function createGeoLink () {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        return createAndDisplayMessage(`<a href=${link} target="_blank">Гео-локация</a>`);
    });
}

submitBtn.addEventListener('click', () => {
    const msg = message.value;
    createAndDisplayMessage(`Сообщение отправителя: ${msg}`);
    ws.send(msg);
});

geoBtn.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        createGeoLink();
    } else {
        alert('Geolocation не поддерживается вашим браузером');
    }
});

