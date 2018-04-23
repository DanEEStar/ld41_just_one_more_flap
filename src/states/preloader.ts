import * as AssetUtils from '../utils/assetUtils';
import Music from "../utils/music";
import * as Assets from '../assets';

export default class Preloader extends Phaser.State {
    public preload(): void {
        AssetUtils.Loader.loadAllAssets(this.game, this.waitForSoundDecoding, this);
    }

    public create(): void {
        window.flappyMusic = this.game.add.audio(Assets.Audio.FlappyMusic.getName());
        window.menuMusic = this.game.add.audio(Assets.Audio.MenuMusic.getName());
    }

    private waitForSoundDecoding(): void {
        AssetUtils.Loader.waitForSoundDecoding(this.startGame, this);
    }

    private startGame(): void {
        this.loadTitle();
    }

    private loadTitle(): void {
        this.game.state.start('title', true, false, 1);
    }
}
