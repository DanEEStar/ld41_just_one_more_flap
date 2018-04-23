import * as Assets from '../assets';

export default class Title extends Phaser.State {

    hero: Phaser.Sprite = null;
    xSpeed = 4;

    create() {
        this.game.add.image(0, 0, Assets.Images.Background.getName());

        let style = { font: '42px Thirteen Pixel Fonts Regular', fill: 'black', align: 'center' };
        let startText = this.game.add.text(400, 200, 'Start', style);
        startText.anchor.x = 0.5;
        startText.inputEnabled = true;
        startText.events.onInputDown.add(() => {
            this.game.state.start('levelchange', true, false, 1);
        });

        let helpText = this.game.add.text(400, 260, 'Help', style);
        helpText.anchor.x = 0.5;
        helpText.inputEnabled = true;
        helpText.events.onInputDown.add(() => {
            this.game.state.start('help');
        });

        let titleText = this.game.add.text(400, 100, 'Just One More Flap', {
            font: '60px Thirteen Pixel Fonts Regular', fill: 'black', align: 'center'
        });
        titleText.anchor.x = 0.5;

        this.hero = this.game.add.sprite(260, 460, Assets.Spritesheets.Bird.getName());
        this.hero.anchor.set(0.5, 0.5);
        this.hero.scale.set(3);
        this.hero.animations.add('fly', [0, 1, 2, 1]);
        this.hero.animations.play('fly', 15, true);

        if(window.flappyMusic.isPlaying) {
            window.flappyMusic.stop();
        }
        if(!window.menuMusic.isPlaying) {
            window.menuMusic.loopFull(0.8);
        }
    }

    update() {
        this.hero.x += this.xSpeed;

        if(this.hero.x > 700) {
            this.xSpeed = -4;
            this.hero.scale.x = -3;
        }
        if(this.hero.x < 100) {
            this.xSpeed = 4;
            this.hero.scale.x = 3;
        }
    }

}
