import * as Assets from '../assets';

export class Loader {
    private static game: Phaser.Game = null;
    private static soundKeys: string[] = [];
    private static soundExtensionsPreference: string[] = SOUND_EXTENSIONS_PREFERENCE;

    private static loadImages() {
        for (let image in Assets.Images) {
            if (!this.game.cache.checkImageKey(Assets.Images[image].getName())) {
                for (let option in Assets.Images[image]) {
                    if (option !== 'getName') {
                        this.game.load.image(Assets.Images[image].getName(), Assets.Images[image][option]());
                    }
                }
            }
        }
    }

    private static loadSpritesheets() {
        for (let spritesheet in Assets.Spritesheets) {
            if (!this.game.cache.checkImageKey(Assets.Spritesheets[spritesheet].getName())) {
                let imageOption = null;

                for (let option in Assets.Spritesheets[spritesheet]) {
                    if (option !== 'getName' && option !== 'getFrameWidth' && option !== 'getFrameHeight' && option !== 'getFrameMax' && option !== 'getMargin' && option !== 'getSpacing') {
                        imageOption = option;
                    }
                }

                this.game.load.spritesheet(Assets.Spritesheets[spritesheet].getName(), Assets.Spritesheets[spritesheet][imageOption](), Assets.Spritesheets[spritesheet].getFrameWidth(), Assets.Spritesheets[spritesheet].getFrameHeight(), Assets.Spritesheets[spritesheet].getFrameMax(), Assets.Spritesheets[spritesheet].getMargin(), Assets.Spritesheets[spritesheet].getSpacing());
            }
        }
    }

    private static loadAtlases() {
    }

    private static orderAudioSourceArrayBasedOnSoundExtensionPreference(soundSourceArray: string[]): string[] {
        let orderedSoundSourceArray: string[] = [];

        for (let e in this.soundExtensionsPreference) {
            let sourcesWithExtension: string[] = soundSourceArray.filter((el) => {
                return (el.substring(el.lastIndexOf('.') + 1, el.length) === this.soundExtensionsPreference[e]);
            });

            orderedSoundSourceArray = orderedSoundSourceArray.concat(sourcesWithExtension);
        }

        return orderedSoundSourceArray;
    }

    private static loadAudio() {
        for (let audio in Assets.Audio) {
            let soundName = Assets.Audio[audio].getName();
            this.soundKeys.push(soundName);

            if (!this.game.cache.checkSoundKey(soundName)) {
                let audioTypeArray = [];

                for (let option in Assets.Audio[audio]) {
                    if (option !== 'getName') {
                        audioTypeArray.push(Assets.Audio[audio][option]());
                    }
                }

                audioTypeArray = this.orderAudioSourceArrayBasedOnSoundExtensionPreference(audioTypeArray);

                this.game.load.audio(soundName, audioTypeArray, true);
            }
        }
    }

    public static loadAllAssets(game: Phaser.Game, onComplete?: Function, onCompleteContext?: any) {
        this.game = game;

        if (onComplete) {
            this.game.load.onLoadComplete.addOnce(onComplete, onCompleteContext);
        }

        this.loadImages();
        this.loadSpritesheets();
        this.loadAudio();
    }

    public static waitForSoundDecoding(onComplete: Function, onCompleteContext?: any) {
        if (this.soundKeys.length > 0) {
            this.game.sound.setDecodedCallback(this.soundKeys, onComplete, onCompleteContext);
        } else {
            onComplete.call(onCompleteContext);
        }
    }
}
