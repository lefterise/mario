class Sound{
    constructor(path, volume, numSimultanious){
        this.sounds = [];
        for (let i = 0; i < numSimultanious; ++i){
            let s = new Audio(path);
            s.volume = volume;
            this.sounds.push(s);
        }
        
        this.numSimultanious = numSimultanious;
        this.soundIndex = 0;
    }

    play(){
        this.sounds[this.soundIndex].play();
        this.soundIndex = (this.soundIndex + 1) % this.numSimultanious;
    }
}


var sound = {	
    die:        new Sound('sounds/die.wav', 0.2, 1),
    bump:       new Sound('sounds/bump.wav', 0.2, 3),
    coin:       new Sound('sounds/coin.wav', 0.1, 5),
    life:       new Sound('sounds/life.wav', 0.2, 1),    
    jump:       new Sound('sounds/jump.wav', 0.2, 3),
    kick:       new Sound('sounds/kick.wav', 0.2, 3),
    break:      new Sound('sounds/break.wav', 0.2, 3),
    pause:      new Sound('sounds/pause.wav', 0.2, 3),
    stomp:      new Sound('sounds/stomp.wav', 0.2, 3),
    sprout:     new Sound('sounds/sprout.wav', 0.2, 2),
    powerup:    new Sound('sounds/powerup.wav', 0.2, 2),
    mushroom:   new Sound('sounds/mushroom.wav', 0.2, 1),    
    fireball:   new Sound('sounds/fireball.wav', 0.2, 3),    
    jumplong:   new Sound('sounds/jumplong.wav', 0.2, 3),    
	powerdown:  new Sound('sounds/powerdown.wav', 0.2, 2),
    levelstart: new Sound('sounds/levelstart.wav', 0.2, 1),
    star:       new Sound('sounds/star.mp3', 0.4, 1),
    pipe:       new Sound('sounds/pipe.mp3', 0.4, 2)
};