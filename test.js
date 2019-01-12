var voice = new Wad({ source: 'mic' }); // At this point, your browser will ask for permission to access your microphone.
var tuner = new Wad.Poly();
console.log(tuner);
console.log(voice);
tuner.setVolume(0); // If you're not using headphones, you can eliminate microphone feedback by muting the output from the tuner.
tuner.add(voice);

voice.play(); // You must give your browser permission to access your microphone before calling play().

tuner.updatePitch() // The tuner is now calculating the pitch and note name of its input 60 times per second. These values are stored in <code>tuner.pitch</code> and <code>tuner.noteName</code>.

// var logPitch = function () {
//   console.log(tuner.pitch, tuner.noteName)
//   requestAnimationFrame(logPitch)
// };
// logPitch();
// If you sing into your microphone, your pitch will be logged to the console in real time.

// tuner.stopUpdatingPitch(); // Stop calculating the pitch if you don't need to know it anymore.