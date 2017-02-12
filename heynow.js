// canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
canvas.style = "position:absolute; left: 50%; width: 500px; margin-left: -250px;";
document.body.appendChild(canvas);

// background
var bgLoaded = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgLoaded = true;
};
bgImage.src = "bg.png";

// bob
var bobLoaded = false;
var bobImage = new Image();
bobImage.onload = function () {
	bobLoaded = true;
};
bobImage.src = "bob.png";

// notbob
var notbobLoaded = false;
var notbobImage = new Image();
notbobImage.onload = function () {
	notbobLoaded = true;
};
notbobImage.src = "notbob.png";

// objects
var bob = {
	speed: 256 // movement
};
var notbob = {};
var notbobsCaught = 0;

// controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// caught!
var reset = function () {
	bob.x = canvas.width / 2;
	bob.y = canvas.height / 2;

	// resurrect notbob
	notbob.x = 64 + (Math.random() * (canvas.width - 128));
	notbob.y = 64 + (Math.random() * (canvas.height - 128));
};

// update
var update = function (modifier) {
	if (38 in keysDown) { // up
		bob.y -= bob.speed * modifier;
	}
	if (40 in keysDown) { // down
		bob.y += bob.speed * modifier;
	}
	if (37 in keysDown) { // left
		bob.x -= bob.speed * modifier;
	}
	if (39 in keysDown) { // right
		bob.x += bob.speed * modifier;
	}

	// caught?
	if (
		bob.x <= (notbob.x + 64)
		&& notbob.x <= (bob.x + 64)
		&& bob.y <= (notbob.y + 64)
		&& notbob.y <= (bob.y + 64)
	) {
		++notbobsCaught;
		reset();
	}
};

// draw
var render = function () {
	if (bgLoaded) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (bobLoaded) {
		ctx.drawImage(bobImage, bob.x, bob.y);
	}

	if (notbobLoaded) {
		ctx.drawImage(notbobImage, notbob.x, notbob.y);
	}

	// Score
	ctx.font = "italic 70px impact";	
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.textBaseline = "top";
	ctx.fillText(notbobsCaught + " !", 60, 20);
};

// loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// again
	requestAnimationFrame(main);
};

// browser support
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// go!
var then = Date.now();
reset();
main();