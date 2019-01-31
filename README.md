![splash](https://media.giphy.com/media/26mZGEi6KH3zNhN7vh/source.gif)

# Flapper (Winter Edition)

---

Play [Flapper (Winter Edition)](https://spark1031.github.io/flapper-voice/)

Flapper (Winter Edition) is a version of Flappy Bird, with a twist. The player's job is to help Flapper navigate the winter terrain and migrate South to rejoin her flock. The player has the option of using keyboard controls or voice commands to direct Flapper.

This project was built over the course of 5 days, and plans to improve voice commands are in the works.

---

## Technologies
*HTML5* | *CSS3* | *Canvas* | *Google Speech Recoginition API*

This game environment and game objects was drawn on **HTML5 Canvas** and were animated through **JavaScript**. The voice commands were implemented using the **Google Speech Recognition API**. 

---

## Features
[Sprite Animation](#sprite-animation) | [Collision Detection](#collision-detection) | [Voice Commands](#voice-commands)

### Sprite Animation:
*Game objects are animated throughout game play*

HTML5 canvas animation sprite sheets were made for each game object (example below) and the frame index (current frame along sprite sheet) was incremented consistently with game updates. Each game object class had it's own update method that updated it's own animation frame.

Bird object sprite sheet:

![sprite-sheet](https://github.com/spark1031/flapper-voice/blob/master/images/bird.png)


### Collision Detection: 
*Collision between bird and obstacle objects triggers 'game over' logic*

This project utilized the axis-aligned bounding boxes (AABB) algorithm to detect collision between two game entities. Upon collision detection, the player is notified that the game is over and shown his/her final score.

![collision-detection](https://media.giphy.com/media/4T5xwp4iumC40kb5Mz/source.gif)

```javascript
  //AABB collision detection logic
  if (this.x + this.width >= pipe.x && this.x <= pipe.x + pipe.width) {
    this.scored = false;
    if (this.y <= pipe.height) {
      isGameOver = true;
    }
  } else if (this.x > (pipe.x + pipe.width)) {
    if (!this.scored) {
      this.scored = true;
      score++;
    }
  }
```

### Voice Commands: 
*Players can control bird object's movement via voice commands*

A custom VoiceControl object was created using Google's Speech Recognition API. The list of voice commands were placed into a 'commands' object and the commands vocalized by the player were captured, transcribed, and subsequently looked up in the 'commands' object with O(1) look up. 

```javascript
const VoiceControl = function () {
  const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  this.recognition = new SpeechRecognition();
  this.commands = {};
  this.spokenTranscript = '';

  this.recognition.onresult = (e) => {
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
```
