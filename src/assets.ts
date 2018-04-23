/* AUTO GENERATED FILE. DO NOT MODIFY. YOU WILL LOSE YOUR CHANGES ON BUILD. */

export namespace Images {
    export class Background {
        static getName(): string { return 'background'; }

        static getPNG(): string { return require('assets/background.png'); }
    }

    export class Ground {
        static getName(): string { return 'ground'; }

        static getPNG(): string { return require('assets/ground.png'); }
    }

    export class Playbar {
        static getName(): string { return 'playbar'; }

        static getPNG(): string { return require('assets/playbar.png'); }
    }


    export class Help {
        static getName(): string { return 'help'; }

        static getPNG(): string { return require('assets/help.png'); }
    }
}

export namespace Spritesheets {
    export class Bird {
        static getName(): string { return 'bird'; }

        static getPNG(): string { return require('assets/bird.png'); }
        static getFrameWidth(): number { return 34; }
        static getFrameHeight(): number { return 24; }
        static getFrameMax(): number { return 8; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }

    export class PipeUp {
        static getName(): string { return 'pipeup'; }

        static getPNG(): string { return require('assets/pipeup.png'); }
        static getFrameWidth(): number { return 54; }
        static getFrameHeight(): number { return 700; }
        static getFrameMax(): number { return 1; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }

    export class PipeDown {
        static getName(): string { return 'pipedown'; }

        static getPNG(): string { return require('assets/pipedown.png'); }
        static getFrameWidth(): number { return 54; }
        static getFrameHeight(): number { return 700; }
        static getFrameMax(): number { return 1; }
        static getMargin(): number { return 0; }
        static getSpacing(): number { return 0; }
    }
}

export namespace Atlases {
}

export namespace Audio {
    export class FlappyMusic {
        static getName(): string { return 'flappy'; }
        static getMP3(): string { return require('assets/flappy.mp3'); }
    }
    export class MenuMusic {
        static getName(): string { return 'menumusic'; }
        static getMP3(): string { return require('assets/menu.mp3'); }
    }
    export class Jump {
        static getName(): string { return 'jump'; }
        static getMP3(): string { return require('assets/jump.mp3'); }
    }
    export class HitSound {
        static getName(): string { return 'hit'; }
        static getMP3(): string { return require('assets/hit.mp3'); }
    }

    export class Powerup {
        static getName(): string { return 'powerup'; }
        static getMP3(): string { return require('assets/powerup.mp3'); }
    }
}

export namespace Audiosprites {
}

export namespace CustomWebFonts {
    export class ThirteenPixelFont {
        static getName(): string { return 'thirteen_pixel_fonts'; }

        static getFamily(): string { return 'Thirteen Pixel Fonts Regular'; }

        static getCSS(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/thirteen_pixel_fonts.css'); }
        static getEOT(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/thirteen_pixel_fonts.eot'); }
        static getSVG(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/thirteen_pixel_fonts.svg'); }
        static getTTF(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/thirteen_pixel_fonts.ttf'); }
        static getWOFF(): string { return require('!file-loader?name=assets/fonts/[name].[ext]!assets/fonts/thirteen_pixel_fonts.woff'); }
    }
}
