class Shot extends Entity {
    constructor(game, character) {
        const width = SHOT_WIDTH * game.width / 100;
        const height = SHOT_HEIGHT * game.width / 100;
        const x = character.x + character.width / 2 - width / 2;
        const y = character.y + (character instanceof Player ? -height : character.height);
        const speed = SHOT_SPEED;
        const myImage = character instanceof Player ? SHOT_PICTURE_PLAYER : SHOT_PICTURE_OPPONENT;

        super(game, width, height, x, y, speed, myImage);
        this.type = character instanceof Player ? "PLAYER" : "ENEMY";  // Identify who fired the shot
    }

    update() {
        if (this.type === "PLAYER") {
            this.y -= this.speed;  // Player's shot moves up
        } else {
            this.y += this.speed;  // Opponent's shot moves down
        }

        // Remove shot if it goes off-screen
        if (this.y < 0 || this.y > this.game.height) {
            this.game.removeShot(this);
            document.body.removeChild(this.image);
        }
    }
}
