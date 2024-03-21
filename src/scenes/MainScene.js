import * as Phaser from "phaser";
import config from "../config";
import Button from "../ui/Button";

import { setBackground } from "../utils/backgroundManager";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("mainScene");
  }

  create() {
    setBackground(this, "background1");

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
      () => {
        this.scene.start("playGame");
      },
    );
  }
}
