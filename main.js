// The keys and notes variables store the piano keys
const keys = ['c-key', 'd-key', 'e-key', 'f-key', 'g-key', 'a-key', 'b-key', 'high-c-key', 'c-sharp-key', 'd-sharp-key', 'f-sharp-key', 'g-sharp-key', 'a-sharp-key'];
const notes = [];
keys.forEach(function(key){
  notes.push(document.getElementById(key));
})

// Frequencies (Hz) for each key, starting at middle C (C4)
const frequencies = {
  'c-key': 261.63, 'c-sharp-key': 277.18, 'd-key': 293.66, 'd-sharp-key': 311.13,
  'e-key': 329.63, 'f-key': 349.23, 'f-sharp-key': 369.99, 'g-key': 392.0,
  'g-sharp-key': 415.3, 'a-key': 440.0, 'a-sharp-key': 466.16, 'b-key': 493.88,
  'high-c-key': 523.25,
};

// Computer keyboard bindings, laid out like a piano on the home row
const keyboardMap = {
  a: 'c-key', w: 'c-sharp-key', s: 'd-key', e: 'd-sharp-key', d: 'e-key',
  f: 'f-key', t: 'f-sharp-key', g: 'g-key', y: 'g-sharp-key', h: 'a-key',
  u: 'a-sharp-key', j: 'b-key', k: 'high-c-key',
};

let audioCtx;
const voices = {};

const startTone = (id) => {
  audioCtx = audioCtx || new AudioContext();
  if (voices[id]) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.value = frequencies[id];
  gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.3, audioCtx.currentTime + 0.02);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  voices[id] = { osc, gain };
}

const stopTone = (id) => {
  const voice = voices[id];
  if (!voice) return;
  voice.gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
  voice.osc.stop(audioCtx.currentTime + 0.3);
  delete voices[id];
}

// Write named functions that change the color of the keys below
const keyPlay = (note) => {
  note.style.backgroundColor = '#6df0c2';
  startTone(note.id);
}

const keyReturn = (note) => {
  note.style.backgroundColor = '';
  stopTone(note.id);
}

// Write a named function with event handler properties
const named = (note) => {
  note.onmousedown = () => keyPlay(note);
  note.onmouseup = () => keyReturn(note);
  note.onmouseleave = () => keyReturn(note);
}

document.addEventListener('keydown', (event) => {
  const id = keyboardMap[event.key.toLowerCase()];
  if (id && !event.repeat) keyPlay(document.getElementById(id));
});

document.addEventListener('keyup', (event) => {
  const id = keyboardMap[event.key.toLowerCase()];
  if (id) keyReturn(document.getElementById(id));
});

// Write a loop that runs the array elements through the function
notes.forEach(named);

// These variables store the buttons that progress the user through the lyrics
let nextOne = document.getElementById('first-next-line');
let nextTwo = document.getElementById('second-next-line');
let nextThree = document.getElementById('third-next-line');
let startOver = document.getElementById('fourth-next-line');

// This variable stores the '-END' lyric element
let lastLyric = document.getElementById('column-optional');

// These statements are "hiding" all the progress buttons, but the first one
nextTwo.hidden = true;
nextThree.hidden = true;
startOver.hidden= true;

// Write anonymous event handler property and function for the first progress button
nextOne.onclick = () => {
  nextTwo.hidden = false;
  nextOne.hidden = true;
  document.getElementById('letter-note-five').innerHTML = 'D';
  document.getElementById('letter-note-six').innerHTML = 'C';
}

// Write anonymous event handler property and function for the second progress button
nextTwo.onclick =  () => {
  
  nextThree.hidden = false;
  nextTwo.hidden = true;
  
  document.getElementById('word-five').innerHTML = 'DEAR';
  document.getElementById('word-six').innerHTML = 'FRI-';

  lastLyric.style.display = 'inline-block';
  
  document.getElementById('letter-note-three').innerHTML = 'G';
  document.getElementById('letter-note-four').innerHTML = 'E';
document.getElementById('letter-note-five').innerHTML = 'C';
  document.getElementById('letter-note-six').innerHTML = 'B';
}
// Write anonymous event handler property and function for the third progress button
nextThree.onclick = function() {
  startOver.hidden = false;
  nextThree.hidden = true;
  
  document.getElementById('word-one').innerHTML = 'HAP';
  document.getElementById('word-two').innerHTML = 'PY';
  document.getElementById('word-three').innerHTML = 'BIRTH';
  document.getElementById('word-four').innerHTML = 'DAY';
  document.getElementById('word-five').innerHTML = 'TO';
  document.getElementById('word-six').innerHTML = 'YOU!';

  document.getElementById('letter-note-one').innerHTML = 'F';
  document.getElementById('letter-note-two').innerHTML = 'F';
  document.getElementById('letter-note-three').innerHTML = 'E';
  document.getElementById('letter-note-four').innerHTML = 'C';
  document.getElementById('letter-note-five').innerHTML = 'D';
  document.getElementById('letter-note-six').innerHTML = 'C';

  lastLyric.style.display = 'none';
}

// This is the event handler property and function for the startOver button
startOver.onclick = function() {
  nextOne.hidden = false;
  startOver.hidden = true;
   document.getElementById('word-one').innerHTML = 'HAP-';
  document.getElementById('letter-note-one').innerHTML = 'G';
  document.getElementById('word-two').innerHTML = 'PY';
  document.getElementById('letter-note-two').innerHTML = 'G';
  document.getElementById('word-three').innerHTML = 'BIRTH-';
  document.getElementById('letter-note-three').innerHTML = 'A';
  document.getElementById('word-four').innerHTML = 'DAY';
  document.getElementById('letter-note-four').innerHTML = 'G';
  document.getElementById('word-five').innerHTML = 'TO';
  document.getElementById('letter-note-five').innerHTML = 'C';
  document.getElementById('word-six').innerHTML = 'YOU!';
  document.getElementById('letter-note-six').innerHTML = 'B';
}
