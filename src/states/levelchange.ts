import Music from "../utils/music";

export default class LevelChange extends Phaser.State {
    private level = 1;

    init(level): void {
        this.level = level;
    }

    public create(): void {
        this.game.state.start('game', true, false, this.level);
    }
}
