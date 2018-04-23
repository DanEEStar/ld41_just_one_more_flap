import * as Assets from '../assets';
import Music from '../utils/music';

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

const levels = [
    [
        // level 1
        {
            type: 'double',
            x: 400,
            y: 250,
            size: 120
        }
    ], [
        // level 2
        {
            type: 'double',
            x: 250,
            y: 200,
            size: 120,
        }, {
            type: 'double',
            x: 550,
            y: 250,
            size: 160
        }
    ], [
        // level 3
        {
            type: 'double',
            x: 200,
            y: 200,
            size: 120
        }, {
            type: 'double',
            x: 400,
            y: 300,
            size: 140
        }, {
            type: 'double',
            x: 600,
            y: 200,
            size: 160
        }
    ], [
        // level 4
        {
            type: 'double',
            x: 160,
            y: 180,
            size: 100
        }, {
            type: 'double',
            x: 320,
            y: 320,
            size: 120
        }, {
            type: 'double',
            x: 480,
            y: 180,
            size: 140
        }, {
            type: 'double',
            x: 640,
            y: 320,
            size: 160
        }
    ], [
        // level 5
        {
            type: 'double',
            x: 100,
            y: 250,
            size: 100
        }, {
            type: 'double',
            x: 200,
            y: 250,
            size: 100
        }, {
            type: 'double',
            x: 300,
            y: 250,
            size: 100
        }, {
            type: 'double',
            x: 400,
            y: 250,
            size: 100
        }, {
            type: 'double',
            x: 500,
            y: 250,
            size: 100
        }, {
            type: 'double',
            x: 600,
            y: 250,
            size: 100
        }, {
            type: 'double',
            x: 700,
            y: 250,
            size: 100
        }
    ], [
        // level 6
        {
            type: 'double',
            x: 140,
            y: 180,
            size: 100
        }, {
            type: 'double',
            x: 280,
            y: 320,
            size: 100
        }, {
            type: 'double',
            x: 420,
            y: 180,
            size: 100
        }, {
            type: 'double',
            x: 560,
            y: 320,
            size: 100
        }, {
            type: 'double',
            x: 700,
            y: 180,
            size: 100
        }
    ], [
        // level 7
        {
            type: 'double',
            x: 90,
            y: 250,
            size: 100
        }, {
            type: 'double',
            x: 180,
            y: 250,
            size: 100
        }, {
            type: 'double',
            x: 270,
            y: 200,
            size: 100
        }, {
            type: 'double',
            x: 360,
            y: 150,
            size: 100
        }, {
            type: 'double',
            x: 450,
            y: 100,
            size: 100
        }, {
            type: 'double',
            x: 540,
            y: 130,
            size: 100
        }, {
            type: 'double',
            x: 630,
            y: 160,
            size: 100
        }, {
            type: 'double',
            x: 720,
            y: 190,
            size: 100
        }
    ]
];

export default class GameState extends Phaser.State {
    private levelNumber = 0;

    localFontText: Phaser.Text = null;

    jumpSound: Phaser.Sound;
    hitSound: Phaser.Sound;
    powerupSound: Phaser.Sound;

    hero: Phaser.Sprite = null;

    xSpeed = 4;
    ySpeed = 0;
    jumpSpeed = 7;
    fallingConstant = 0.7;
    jumps = [];
    runTurn: boolean = false;
    planeLastX = 0;
    gameOver: boolean = false;
    cheatMode: boolean = false;
    levels = [];
    pipes: Phaser.Group = null;
    resetHero: boolean = false;

    public init(level) {
        this.levelNumber = level;
        //this.levelNumber = 8;
        this.cheatMode = false;
        console.log(levels.length);
    }

    preload() {
    }

    public create(): void {
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        if(window.menuMusic.isPlaying) {
            window.menuMusic.stop();
        }
        if(!window.flappyMusic.isPlaying) {
            window.flappyMusic.loopFull(0.8);
        }

        this.game.add.image(0, 0, Assets.Images.Background.getName());
        this.game.add.image(0, 538, Assets.Images.Ground.getName());

        this.jumpSound = this.game.add.sound(Assets.Audio.Jump.getName());
        this.hitSound = this.game.add.sound(Assets.Audio.HitSound.getName());
        this.powerupSound = this.game.add.sound(Assets.Audio.Powerup.getName());

        this.game.input.keyboard.addCallbacks(this, undefined, (e) => {
            console.log(e.keyCode);
            if(e.keyCode === 67) {
                this.cheatMode = !this.cheatMode;
            }
        });

        this.hero = this.game.add.sprite(39, 320, Assets.Spritesheets.Bird.getName());
        this.hero.animations.add('fly', [0, 1, 2, 1]);
        this.hero.animations.play('fly', 15, true);
        this.game.physics.p2.enable(this.hero);

        this.pipes = this.game.add.group();
        const pipeData = levels[this.levelNumber - 1];
        pipeData.forEach((p) => {
            if(p.type === 'double') {
                const p1 = this.pipes.create(p.x, p.y - 350, 'pipedown');
                this.game.physics.p2.enable(p1);
                p1.body.static = true;
                const p2 = this.pipes.create(p.x, p.y + 350 + p.size, 'pipeup');
                this.game.physics.p2.enable(p2);
                p2.body.static = true;
            }
            else if(p.type === 'pipeup' || p.type === 'pipedown') {

                let y = p.y;
                if(p.type === 'pipeup') {
                    y += 350;
                }
                else if(p.type === 'pipedown') {
                    y -= 350;
                }
                const pipe = this.pipes.create(p.x, y, p.type);
                this.game.physics.p2.enable(pipe);
                pipe.body.static = true;
            }
        });

        this.hero.body.onBeginContact.add(() => {
            console.log('begin contact');
            this.birdCollision();
        });

        /*
        this.game.physics.p2.onBeginContact.add((body1, body2) => {
            console.log(body1, body2);
        });
        */

        /*
        this.hero.body.collides(this.pipe, () => {
            console.log('hero pipe collision');
        });
        */


        const jumpPointsPseudoRect = this.add.sprite(40, 560);
        jumpPointsPseudoRect.anchor.set(0, 0);
        jumpPointsPseudoRect.width = 720;
        jumpPointsPseudoRect.height = 40;
        jumpPointsPseudoRect.inputEnabled = true;
        jumpPointsPseudoRect.events.onInputDown.add((target, pointer) => {
            console.log('down on testSprite');
            console.log(pointer);
            const x = Math.floor(pointer.x);
            const coin = this.add.sprite(x, 566, 'bird');
            coin.anchor.set(0.5, 0);
            coin.inputEnabled = true;
            coin.events.onInputDown.add(() => {
                coin.destroy();
                const index = this.jumps.indexOf(coin);
                if(index > -1) {
                    this.jumps.splice(index, 1);
                }
            });
            this.jumps.push(coin);
        });

        const nextTurnPseudoSprite = this.add.sprite(760, 560);
        nextTurnPseudoSprite.anchor.set(0, 0);
        nextTurnPseudoSprite.width = 40;
        nextTurnPseudoSprite.height = 40;
        nextTurnPseudoSprite.inputEnabled = true;
        nextTurnPseudoSprite.events.onInputDown.add(() => {
            console.log('nextTurnPseudoSprite down on testSprite');
            this.runTurn = true;
        });

        const cheatPseudoSprite = this.add.sprite(760, 0);
        cheatPseudoSprite.anchor.set(0, 0);
        cheatPseudoSprite.width = 40;
        cheatPseudoSprite.height = 40;
        cheatPseudoSprite.inputEnabled = true;
        cheatPseudoSprite.events.onInputDown.add(() => {
            console.log('cheat button pressed');
            this.cheatMode = true;
        });

        const deleteJumpsSprite = this.add.sprite(0, 560);
        deleteJumpsSprite.anchor.set(0, 0);
        deleteJumpsSprite.width = 40;
        deleteJumpsSprite.height = 40;
        deleteJumpsSprite.inputEnabled = true;
        deleteJumpsSprite.events.onInputDown.add(() => {
            console.log('deleteJumpsSprite button pressed');
            this.jumps.forEach((j) => j.destroy());
            this.jumps = [];
        });
        const playbar = this.add.image(0, 560, Assets.Images.Playbar.getName());

        this.localFontText = this.game.add.text(10, 10, 'level ' + this.levelNumber + ' / ' + levels.length, {
            font: '30px ' + Assets.CustomWebFonts.ThirteenPixelFont.getFamily(),
            fill: 'white',
            stroke: 'yellow'
        });
    }

    private createPowerString(powerValuePercent) {
        const len = Math.floor(powerValuePercent * 70 + 1);
        return 'Power ' + Array(len).join('|');
    }

    birdJump() {
        this.ySpeed = this.jumpSpeed;
        this.jumpSound.play();
    }

    birdCollision(playSound: boolean = true) {
        console.log('bird collision');
        if(playSound) {
            this.hitSound.play();
        }
        this.resetHero = true;
        this.hero.body.reset(39, 320, true, true);
        this.hero.body.rotation = 0;
        this.runTurn = false;
        this.planeLastX = 39;
        this.ySpeed = 0;
        console.log(this.hero.body);
    }

    public update(): void {
        if(this.resetHero) {
            this.birdCollision(false);
            this.resetHero = false;
        }

        if(!this.gameOver) {
            this.planeLastX = this.hero.body.x;

            if(this.runTurn) {
                this.hero.body.x += (this.xSpeed);
                this.hero.body.y -= (this.ySpeed);
                this.ySpeed -= this.fallingConstant;
            }

            this.jumps.forEach((spr) => {
                if(spr && spr.x >= this.planeLastX && spr.x < this.hero.body.x) {
                    this.birdJump();
                }
            });


            if(this.hero.body.y > 560) {
                this.birdCollision();
            }
            if(this.hero.body.y < 0) {
                this.birdCollision();
            }

            if(this.hero.body.x >= 760) {
                this.runTurn = false;
                this.hero.body.x = 759;
                this.ySpeed = 0;
                this.jumps.forEach((x) => {
                    x.destroy();
                });
                this.jumps = [];
                this.powerupSound.play();
                setTimeout(() => {
                    console.log('level change ' + (this.levelNumber + 1));
                    const nextLevelNumber = this.levelNumber + 1;
                    if(nextLevelNumber > levels.length) {
                        this.game.state.start('win', true, false);
                    }
                    else {
                        this.game.state.start('levelchange', true, false, this.levelNumber + 1);
                    }
                }, 1000);
            }
        }
    }

    renderDebugPosition() {
        let x = this.hero.body.x;
        let lastX = x;
        let y = this.hero.body.y;
        let ySpeed = this.ySpeed;

        const jumps = this.jumps.map((j) => j.x);
        //console.log(jumps);

        for(let t = 0; t < 250; t++) {
            lastX = x;
            x += this.xSpeed;
            y -= ySpeed;
            ySpeed -= this.fallingConstant;

            for(let i = 0; i < jumps.length; i++) {
                if(jumps[i] >= lastX && jumps[i] < x) {
                    ySpeed = this.jumpSpeed;
                }
            }

            this.game.debug.pixel(x, y, 'rgba(255,0,255,1)');
        }
    }

    public render(): void {
        if(this.cheatMode) {
            this.renderDebugPosition();
        }
    }
}
