import * as Assets from '../assets';

export default class Help extends Phaser.State {

    create() {
        let image = this.game.add.image(0, 0, Assets.Images.Help.getName());

        image.inputEnabled = true;
        image.events.onInputDown.add(() => {
            this.game.state.start('title');
        });
    }

}
