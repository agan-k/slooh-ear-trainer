


function playRandomPitch(range, test) { // range is picked in accordance to level difficulty. Choices of different Node lists could unlock different levels. (diatonic, chromatic, number of octaves etc.)
   const random_index = Math.floor(
      Math.random() * Math.floor(range));
   const all_pitches = document.querySelectorAll('audio');
   test_note = all_pitches[random_index];
   // return test_note;
   setTimeout(function() {
      test_note.play();
   }, 1000) 
   console.log(test_note)
}

function evaluateGuess(e) {
   let correct_note = test_note.getAttribute('data-key');
   let guess;
   if (e.type == 'click') {
      guess = e.path[1].dataset.key
   } else if (e.type == 'keydown') {
      guess = e.keyCode
   };
   
   if (guess == correct_note) {
      alert('yeah!')
   } else {
      alert(`Nope! it was ${test_note}`)
   }
   // if (e.type == 'click') {
   //    console.log(e.path[1].dataset.key)
   // } else {
   //    console.log(e.keyCode)
   // }
   //  console.log(e)
   //  console.log(test_note.getAttribute('data-key'))
 }

function playPiano(e) {
   let playedSound;
   let pianoKey;
   let range = 15;// passed arg 'range' reflects size of the pool out of which random note was picked 
   let test;
   if (e.repeat) return; //stops event 'keydown' from continuously fireing
   if (document.querySelector('.blink')) return evaluateGuess(e);
   if (e.type == 'keydown') {
      playedSound = document.querySelector(`audio[data-key="${e.keyCode}"]`);
      pianoKey = document.querySelector(`.key[data-key="${e.keyCode}"]`);
   } else {
      playedSound = document.querySelector(`audio[data-key="${e.path[0].attributes[0].value}"]`)
      pianoKey = document.querySelector(`.key[data-key="${e.path[0].attributes[0].value}"]`)
   };
   if (!playedSound) return; //exits function if computer keys without assigned sound pressed
   playedSound.currentTime = 0; // rewinds before entire audio sample (ca 4s) rings out
   playedSound.play();
   pianoKey.classList.add('finger-down');// Transition style for pressed piano key
   if (!document.querySelector('.piano.et-mode')) return; // if Ear Train mode not active, exit function
   playRandomPitch(range); 
   blinkAll();
}

function blinkAll() {
   const blinking_keys = document.querySelectorAll('.key');
   setTimeout(function() {
      blinking_keys.forEach(item => item.classList.add('blink'))
   }, 1700)
}

function toggleEarTrainMode() {
   const piano = document.querySelector('.piano');
   piano.classList.toggle('et-mode');
   const button = document.getElementById('et-mode-toggle');
   if (button.innerHTML === 'start') {
      button.innerHTML = 'exit';
   } else {
      location.reload()
   }
}

function fingerUp(e) {
   if (e.propertyName !== 'transform') return;
   this.classList.remove('finger-down');
}

const pianoKeys = document.querySelectorAll('.key');
pianoKeys.forEach(pianoKey => pianoKey.addEventListener('transitionend', fingerUp));

window.addEventListener('keydown', playPiano);
window.addEventListener('click', playPiano);








