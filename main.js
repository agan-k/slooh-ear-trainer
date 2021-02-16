function playRandomPitch(range) {// range is picked in accordance to level difficulty. Choices of different Node lists could unlock different levels. (diatonic, chromatic, number of octaves etc.)
   const random_index = Math.floor(
      Math.random() * Math.floor(range))
    
   const all_pitches = document.querySelectorAll('audio')
   
   setTimeout(function() {
      return all_pitches[random_index].play();
    }, 1000)
}

function playPianoOnKeydown(e) {
   if (e.repeat) return; //stops event 'keydown' from continous fireing
   const playedSound = document.querySelector(`audio[data-key="${e.keyCode}"]`);
   const pianoKey = document.querySelector(`.key[data-key="${e.keyCode}"]`);
   if (!playedSound) return; //exits function if computer keys without assigned sound pressed
   playedSound.currentTime = 0; 
   playedSound.play();
   pianoKey.classList.add('finger-down');// Transition style for pressed piano key
   playRandomPitch(15);
}

const pianoKeys = document.querySelectorAll('.key');

///// This part removes transition style
function fingerUp(e) {
   if (e.propertyName !== 'transform') return;
   this.classList.remove('finger-down');
}

pianoKeys.forEach(pianoKey => pianoKey.addEventListener('transitionend', fingerUp));

window.addEventListener('keydown', playPianoOnKeydown);


//////////// Playing notes with the mouse (trackpad, touchscreen)
function PlayPianoOnClick(e) {
   const clickedSound = document.querySelector(`audio[data-key="${e.path[0].attributes[0].value}"]`)
   clickedSound.play();
   playRandomPitch(15);
}

document.querySelectorAll('.key').forEach(item => {
   item.addEventListener('click', PlayPianoOnClick)
   })





