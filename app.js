userOrder = [];
computerOrder = [];
const maxLevels = 20;
let id = 0;
let color = 0;
let level = 0;

let strict = false;
let error = false;

const boardSound = [
'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
];

$(document).ready(function() {
  $(".start").click(function() {
    level++;
    level = 0;
    strict = false;
    error = false;
    computerOrder = [];
    userOrder = [];
    startOrder();
  })

  //user
  $(".circle").click(function() {
    id = $(this).attr("id");
    color = $(this).attr("class").split(" ")[1];
    userOrder.push(id);
    console.log(id+" "+color);
    addClassSound(id, color);

    if(!checkUserOrder()) {
      if(strict) {
        console.log("strict mode");
        computerOrder = [];
        level = 1;
      }

      error = true;
      displayError();
      userOrder = [];
      startOrder();
    } else
      if (userOrder.length == computerOrder.length && userOrder.length < maxLevels) {
      level++;
      userOrder = [];
      error = false;
      startOrder();
    }

    //check for winner
    if(userOrder.length == maxLevels) {
      $('#scoreNumber').text("YOU WIN");
    }

  })

  $(".strict").click(function() {
    $('.strictText').text("Strict Mode On");
    level = 0;
    computerOrder = [];
    userOrder = [];
    strict = true;
    startOrder();
  })

});

//check computer order vs. user order
function checkUserOrder() {
  for(let i = 0; i < userOrder.length; i++) {
    if(userOrder[i] != computerOrder[i]) { return false; }
  }
   return true;
}
//

function displayError() {
  console.log("wrong!");
  let counter = 0;
  const wrong = setInterval(function() {
    $('#scoreNumber').text("wrong");
    counter++;
    if(counter == 5) {
      $('#scoreNumber').text(level);
      clearInterval(wrong);
      userOrder = [];
      counter = 0;
    }
  }, 500);
}

function startOrder() {
  console.log(level);
  $("#scoreNumber").text(level);
  if (!error) {
    getRandomOrder();
  }
  if(error && strict) {
    userOrder = [];
    computerOrder = [];
    level = 0;
    $('#reset').css({'color' : 'white', 'background-color' : 'red', 'border' : 'none' });
  }

  let i = 0;
  let myInterval = setInterval(function() {
    id = computerOrder[i];
    color = $('#'+id).attr('class').split(' ')[1];
    console.log(id+' '+color);
    addClassSound(id, color);
    i++;

    if(i == computerOrder.length) {
      clearInterval(myInterval);
    }

   }, 800);
  }


function getRandomOrder() {
  const random = Math.floor(Math.random() * 4);
  computerOrder.push(random);
}

function addClassSound(id, color) {
  $('#'+id).addClass(color+"-select");
  playSound(id);
  setTimeout(function() {
    $('#'+id).removeClass(color+"-select");
  }, 500);
}

//play sound
function playSound(id) {
  const sound = new Audio(boardSound[id]);
  sound.play();
}

$('#reset').click(function() {
  location.reload(true);
});
