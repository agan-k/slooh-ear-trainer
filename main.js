



function playRandomPitch(range) {// range is picked in accordance to level difficulty. Choices of different Node lists could unlock different levels. (diatonic, chromatic, number of octaves etc.)
   
   const random_index = Math.floor(
      Math.random() * Math.floor(range))
    
   const all_pitches = document.querySelectorAll('audio')
   const random_note = all_pitches[random_index]


   
   setTimeout(function() {
      return random_note.play();
   }, 1000)


}

function playPiano(e) {
   let playedSound;
   let pianoKey;
   if (e.repeat) return; //stops event 'keydown' from continuously fireing
   if (e.type == 'keydown') {
      playedSound = document.querySelector(`audio[data-key="${e.keyCode}"]`);
      pianoKey = document.querySelector(`.key[data-key="${e.keyCode}"]`);
   } else {
      playedSound = document.querySelector(`audio[data-key="${e.path[0].attributes[0].value}"]`)
      pianoKey = document.querySelector(`.key[data-key="${e.path[0].attributes[0].value}"]`)
   }
   if (!playedSound) return; //exits function if computer keys without assigned sound pressed
   playedSound.currentTime = 0; 
   playedSound.play();
   pianoKey.classList.add('finger-down');// Transition style for pressed piano key
   if (!document.querySelector('.piano.et-mode')) return; // activate ear-trainer mode
   playRandomPitch(15); // passed arg num reflects size of the pool out of which random note was picked 
}

const pianoKeys = document.querySelectorAll('.key');

///// This part removes transition style
function fingerUp(e) {
   if (e.propertyName !== 'transform') return;
   this.classList.remove('finger-down');
}

pianoKeys.forEach(pianoKey => pianoKey.addEventListener('transitionend', fingerUp));

window.addEventListener('keydown', playPiano);
window.addEventListener('click', playPiano);

function toggleEarTrainMode() {
   const piano = document.querySelector('.piano');
   piano.classList.toggle('et-mode');
   const button = document.getElementById('et-mode-toggle');
   if (button.innerHTML === 'start') {
      button.innerHTML = 'exit';
   } else {
      button.innerHTML = 'start';
   }
}






