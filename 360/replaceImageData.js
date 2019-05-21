console.log("Using './images/' as image subfolder");
const imagesFolder = './images/';
var fs = require('fs');

var images = [];
var htmlScript = [];

//console.log("Adding the following to the array: ");
fs.readdirSync(imagesFolder).forEach(file => {
  var name = file.substring(0,file.lastIndexOf('.'));
  images.push(name);
  htmlScript.push('<img id="' + name + '" src="images/' + file + '">');
});

var imagesScriptString = "\n";
var htmlString = "\n";
for(var i = 0; i < images.length; i++) {
  //console.log("	" + images[i] + ":	" + htmlScript[i]);
  imagesScriptString += "	'" + images[i] + "',\n";
  htmlString += "				" + htmlScript[i] + "\n";
}

function readWriteHTML() {
  var htmlIdentifier1 = 'id="assets-container">';
  var htmlIdentifier2 = '			</a-assets>';
  var firstHalf = "";
  var secondHalf = "";
  try {
	  var readFile = fs.readFileSync("./index.html");
	  var data = readFile.toString('utf8');
	  firstHalf = data.substring(0,data.indexOf(htmlIdentifier1) + htmlIdentifier1.length);
	  secondHalf = data.substring(data.indexOf(htmlIdentifier2));
	  
	  var newValue = firstHalf + htmlString + secondHalf;
	  
	  fs.writeFile('index.html', newValue, function (err) {
		if (err) console.log(err);
		console.log('index.html has been overwritten');
	  });
  } catch(err) {
	console.log(err);
  }
}


function readWriteScript() {
  var firstHalf = "";
  var secondHalf = "";
  try {
	  var readFile = fs.readFileSync("./script.js");
	  var data = readFile.toString('utf8');
	  firstHalf = data.substring(0,data.indexOf('[') + 1);
	  secondHalf = data.substring(data.indexOf(']'));
	  
	  var newValue = firstHalf + imagesScriptString + secondHalf;
	  
	  fs.writeFile('script.js', newValue, function (err) {
		if (err) console.log(err);
		console.log('script.js has been overwritten');
	  });
  }catch(err) { 
    console.log(err);
  }
}

readWriteHTML();
readWriteScript();

console.log("Done");