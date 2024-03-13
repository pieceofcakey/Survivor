import * as Phaser from "phaser";
import config from "../config";
import Button from "../ui/Button";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("gameOverScene");
  }

  create() {
    this.add
      .graphics()
      .fillStyle(0x000000)
      .fillRect(0, 0, config.width, config.height)
      .setScrollFactor(0);

    this.add
      .bitmapText(config.width / 2, 150, "pixelFont", "GAME OVER...", 100)
      .setOrigin(0.5);

    new Button(
      config.width / 2 - 100,
      config.height / 2 + 150,
      "Try Again?",
      this,
      () => this.scene.start("playGame"),
    );

    new Button(
      config.width / 2 + 100,
      config.height / 2 + 150,
      "Go To Main",
      this,
      () => this.scene.start("mainScene"),
    );
  }
}
