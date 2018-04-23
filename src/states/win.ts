import * as Assets from '../assets';

export default class Win extends Phaser.State {

    create() {
        let image = this.game.add.image(0, 0, Assets.Images.Background.getName());

        image.inputEnabled = true;
        image.events.onInputDown.add(() => {
            this.game.state.start('title');
        });

        let style = { font: '42px Thirteen Pixel Fonts Regular', fill: 'black', align: 'center' };
        let startText1 = this.game.add.text(200, 200, 'Fly away bird!', style);
        startText1.anchor.x = 0.5;
        let titleText = this.game.add.text(400, 60, 'You Win!', {
            font: '66px Thirteen Pixel Fonts Regular', fill: 'black', align: 'center'
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
        this.hero.x += 2;
        this.hero.y -= 1;
    }

}
