var tileImages = []; // main container for game images
var tileArray = [];
var tileFlippedOver = [];
var cardFlipped = -1;
var timer = '';
var playLockout = false;
var gamePlay = false; // controls if we rebuild the board restart

var startButton = document.getElementById('start');
var gameBoard = document.getElementById('gameboard');
var message = document.getElementById('message');

//event listens
startButton.addEventListener('click', startGame);

var options = {
  "particles":{
     "number":{
        "value":99,
        "density":{
           "enable":true,
           "value_area":552.4033491425909
        }
     },
     "color":{
        "value":"#ffffff"
     },
     "shape":{
        "type":"circle",
        "stroke":{
           "width":0,
           "color":"#000000"
        },
        "polygon":{
           "nb_sides":3
        },
        "image":{
           "src":"img/github.svg",
           "width":70,
           "height":100
        }
     },
     "opacity":{
        "value":1,
        "random":true,
        "anim":{
           "enable":false,
           "speed":1,
           "opacity_min":0.1,
           "sync":false
        }
     },
     "size":{
        "value":2,
        "random":true,
        "anim":{
           "enable":false,
           "speed":40,
           "size_min":0.1,
           "sync":false
        }
     },
     "line_linked":{
        "enable":false,
        "distance":150,
        "color":"#ffffff",
        "opacity":0.4,
        "width":1
     },
     "move":{
        "enable":true,
        "speed":1.5782952832645452,
        "direction":"none",
        "random":true,
        "straight":false,
        "out_mode":"out",
        "bounce":false,
        "attract":{
           "enable":false,
           "rotateX":600,
           "rotateY":1200
        }
     }
  },
  "interactivity":{
     "detect_on":"canvas",
     "events":{
        "onhover":{
           "enable":false,
           "mode":"repulse"
        },
        "onclick":{
           "enable":true,
           "mode":"repulse"
        },
        "resize":true
     },
     "modes":{
        "grab":{
           "distance":400,
           "line_linked":{
              "opacity":1
           }
        },
        "bubble":{
           "distance":400,
           "size":40,
           "duration":2,
           "opacity":8,
           "speed":3
        },
        "repulse":{
           "distance":200,
           "duration":0.4
        },
        "push":{
           "particles_nb":4
        },
        "remove":{
           "particles_nb":2
        }
     }
  },
  "retina_detect":false
};

particlesJS('particles-js', options);

function startGame() {
  cardFlipped = -1;
  playLockout = false;
  startButton.style.display = 'none';
  if (!gamePlay) {
    gamePlay = true;
    buildArray();
    tileArray = tileImages.concat(tileImages);
    shuffleArray(tileArray);
    buildBoard();
    message.innerHTML = "Click any tile!";
  }
}

function buildArray() {
  for (var x = 1; x < 7; x++) {
    tileImages.push(x + '.jpg');
  }
}
function buildBoard() {
  var html = "";
  for (var x = 0; x <= (tileArray.length - 1); x++) {
    html += '<div class="gameTile"><div class="gameTile">';
    html += '<img id="cardz' + x + '" src="images/back.jpg" onclick="pickCard(' + x + ',this)" class="flipImage"></div></div>';
  }
  gameBoard.innerHTML = html;
}

function pickCard(tileIndex, t) {
  if (!isinArray(t.id, tileFlippedOver) && !playLockout) {
    if (cardFlipped >= 0) {
      cardFlip(t, tileIndex);
      playLockout = true;
      if (checkSrc(tileFlippedOver[tileFlippedOver.length - 1]) == checkSrc(tileFlippedOver[tileFlippedOver.length - 2])) {
        message.innerHTML = "Match Found.  Click more tiles";
        playLockout = false;
        cardFlipped = -1;
        if (tileFlippedOver.length == tileArray.length) {
          gameover();
          startButton.style.display = 'none';
          message.addEventListener('click', startGame);
        }
      } else {
        message.innerHTML = "No Match";
        timer = setInterval(hideCard, 1000);
      }
    } else {
      cardFlipped = tileIndex;
      cardFlip(t, tileIndex);
    }
  } else {
    message.innerHTML = "Not clickable";
  }
}

function hideCard() {
  for (var x = 0; x < 2; x++) {
    var vid = tileFlippedOver.pop();
    document.getElementById(vid).src = "images/back.jpg";
  }
  clearInterval(timer);
  playLockout = false;
  cardFlipped = -1;
  message.innerHTML = "Click any tile";
}

function gameover() {
  startButton.style.display = 'block';
  message.innerHTML = "Click to start new game";
  gamePlay = false;
  tileImages = [];
  tileFlippedOver = [];
}

function isinArray(v, array) {
  return array.indexOf(v) > -1;
}

function cardFlip(t, ti) {
  t.src = "images/" + tileArray[ti];
  tileFlippedOver.push(t.id);
}

function checkSrc(v) {
  var v = document.getElementById(v).src;
  return v;
}

function shuffleArray(array) {
  for (var x = array.length - 1; x > 0; x--) {
    var holder = Math.floor(Math.random() * (x + 1));
    var itemValue = array[x];
    array[x] = array[holder];
    array[holder] = itemValue;
  }
  return array;
}
