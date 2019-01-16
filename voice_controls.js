const VoiceControl = function () {
  const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  this.recognition = new SpeechRecognition();
  this.commands = {};
  this.spokenTranscript = '';

  this.recognition.onresult = (e) => {
    console.log(e);
    if (typeof (e.results) === 'undefined') {
      this.recognition.stop();
      return;
    }

    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) {
        this.spokenTranscript += e.results[i][0].transcript;
      }
    }

    if (this.spokenTranscript !== '') {
      this.spokenTranscript = this.spokenTranscript.toLowerCase().trim();
      Object.keys(this.commands).forEach((command) => {
        if (this.spokenTranscript === command) {
          this.commands[command]();
        }
      });
      this.spokenTranscript = '';
    }
  };

  this.recognition.onend = (e) => {
    if (this.recognition.continuous) {
      this.recognition.start();
    }
  };
  return this;
};

VoiceControl.prototype.addCommand = function (command, callback) {
  this.commands[command.toLowerCase()] = callback;
};

VoiceControl.prototype.start = function () {
  this.recognition.continuous = true;
  this.recognition.start();
};

VoiceControl.prototype.stop = function () {
  this.recognition.continuous = false;
  this.recognition.stop();
};
