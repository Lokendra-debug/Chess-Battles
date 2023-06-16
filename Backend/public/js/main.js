const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
//chess move
var board;
var game;

window.onload = function () {
    initGame();
};

var initGame = function () {
    var cfg = {
        draggable: true,
        position: 'start',
        onDrop: handleMove,
    };

    board = new ChessBoard('gameBoard', cfg);
    game = new Chess();
};

var handleMove = function (source, target) {
    var move = game.move({ from: source, to: target });

    if (move === null) return 'snapback';
};
//getting query params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const username = urlParams.get("username");
const room = urlParams.get("room");


const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const socket = io();

//emitting room name
socket.emit('join-room', { username, room });

var handleMove = function (source, target) {
    var move = game.move({ from: source, to: target });

    if (move === null) return 'snapback';
    else socket.emit('move', move);

};

socket.on('move', function (msg) {
    game.move(msg);
    board.position(game.fen()); // fen is the board layout
});

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit('chatMsg', msg);

    //Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})
socket.on('roomUsers',({room,users})=>{
    outputRoomName(room);
    outputUsers(users);
})
socket.on('message', (data) => {
    console.log(data);
    appendMsg(data);

    //Scroll Down
    chatMessages.scrollTop = chatMessages.scrollHeight


})

function appendMsg(msg) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${msg.username}<span>${msg.time}</span></p>
						<p class="text">
							${msg.message}
						</p>`
    document.querySelector('.chat-messages').appendChild(div);

}

function outputRoomName(room) {
    roomName.innerText = room
}
function outputUsers(users){
    userList.innerHTML = `${users.map(user=>`<li>${user.username}</li>`).join('')}`
}