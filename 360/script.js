// Data
var images = [
	'Cafe - Plaza Level 1',
	'Entrance - Plaza Level 1',
	'Lounge Area - Plaza Level 1',
	'Roof - Plaza',
	'South Wing Lift - Plaza Level 2',
	'Top Deck Foyer - Plaza Level 2',
];

//var loadedBefore = {};

// Init
(function() {
var scene = document.querySelector('a-scene');
var animator = document.querySelector('a-animation');
var sky = document.getElementById('sky');

function getPath(name) {
  return 'images/' + name + '.jpg';
}

function getSrc(name) {
  return '#' + name;
}

function MotionDetection (event) {
  if (event.rotationRate.alpha || event.rotationRate.beta ||
	  event.rotationRate.gamma) {
	document.querySelector('a-animation').stop();
	window.removeEventListener('devicemotion', MotionDetection);
  }
}

function HideSpinner() {
	document.getElementsByClassName("spinner")[0].style.display = "none";
	document.getElementById('loading-screen').style.display = "none";
}

function ShowSpinner() { //(useLoadingScreen) {
	document.getElementsByClassName("spinner")[0].style.display = "block";
	document.getElementById('loading-screen').style.display = "block";
}

sky.addEventListener('materialtextureloaded', function() {
	HideSpinner();
});

var currentIndex = 0;

// Animation stopping
scene.addEventListener('mousedown', function() {
  animator.stop();
});
scene.addEventListener('ontouchstart', function() {
  animator.stop();
});
scene.addEventListener('ontouchmove', function() {
  animator.stop();
});

// Create arrows
var scrollbox = document.getElementsByClassName("scene-container")[0];

var leftArrow = document.createElement('button');
leftArrow.innerHTML = "<i class='left' id='arrow'></i>";
leftArrow.id = 'left-arrow';
leftArrow.className = 'arrow';
leftArrow.style.cursor = "pointer";
leftArrow.addEventListener('click', (e)=>{
	currentIndex--;
	SelectImage()
});
scrollbox.appendChild(leftArrow);

var rightArrow = document.createElement('button');
rightArrow.innerHTML = "<i class='right' id='arrow'></i>";
rightArrow.id = 'right-arrow';
rightArrow.className = 'arrow';
rightArrow.style.cursor = "pointer";
rightArrow.addEventListener('click', (e)=>{
	currentIndex++;
	SelectImage();
});
scrollbox.appendChild(rightArrow);


function CheckForArrows() {
	scrollbox.style.paddingLeft = 20;
	scrollbox.style.paddingRight = 20;
}

function SelectImage() {
	if (currentIndex < 0) {
		currentIndex = images.length - 1;
	}
	else if (currentIndex > images.length - 1) {
		currentIndex = 0
	}

	let src = images[currentIndex]
	ShowSpinner(); // (!loadedBefore[src]);
	//if (!loadedBefore[src]) loadedBefore[src] = true;
	document.getElementById('scene-name').innerHTML = src;
	sky.setAttribute('src', getSrc(src));
	animator.start();

	// Read the devicemotion listener and show the loader
	window.addEventListener('devicemotion', MotionDetection);
}


window.onresize = (e)=> {
	CheckForArrows();
};

// Prevent highlight selection
document.body.style = "user-select: none; -moz-user-select: none;";


// Run the last functions
SelectImage(images[0])
CheckForArrows();
})();