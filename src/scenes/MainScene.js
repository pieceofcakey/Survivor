import * as Phaser from "phaser";
import config from "../config";
import Button from "../ui/Button";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("mainScene");
  }

  create() {
    this.add
      .graphics()
      .fillStyle(0x000000)
      .fillRect(0, 0, config.width, config.height)
      .setScrollFactor(0);

    this.add
      .bitmapText(config.width / 2, 150, "pixelFont", "SURVIVOR", 100)
      .setOrigin(0.5);

    this.add
      .sprite(config.width / 2, config.height / 2, "player")
      .setScale(3)
      .play("playerRun");

    new Button(
      config.width / 2,
      config.height / 2 + 150,
      "Start Game!",
      this,
      () => this.scene.start("playGame"),
    );
  }
}
