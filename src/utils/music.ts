import * as Assets from '../assets';

export default class Music {
    private static _instance: Music;

    public static createInstance(game: Phaser.Game) {
        this._instance = new Music(game);
    }

    public static getInstance(): Music {
        return Music._instance;
    }

    public flappyMusic = null
    private game: Phaser.Game = null;

    private playbackRate = 1.0;

    private stopped = false;

    public constructor(game: Phaser.Game) {
        this.game = game;
    }

    public create(): void {
        this.flappyMusic = this.game.add.audio(Assets.Audio.FlappyMusic.getName());
    }

    public play(): void {
        this.stopped = false;
        this.playLoop(0);
    }

    public stop(): void {
        this.stopped = true;
    }

    public pause(): void {
        this.flappy.pause();
    }

    public unpause(): void {
        this.flappy.play();
    }

    private playLoop() {
        if (this.stopped) {
            return;
        }

        const self = this;
        const trackLoop = [
            //[1],
            [1, 2, 5],
            [1, 2, 3, 4, 5],
            [3, 4, 5],
            //[3]
        ];

        loopCounter = loopCounter % 3;

        trackLoop[loopCounter].forEach(function(value, index) {
            const audio = self['track' + value];
            audio.onStop.removeAll();
            audio.play();
            audio._sound.playbackRate.value = self.playbackRate;
            if (index === 0) {
                audio.onStop.add(function() {
                    self.playLoop(loopCounter + 1);
                });
            }
        });
    }
}
