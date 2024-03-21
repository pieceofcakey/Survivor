import * as Phaser from "phaser";
import config from "../config";
import Button from "../ui/Button";
import { setBackground } from "../utils/backgroundManager";
import { getTimeString } from "../utils/time";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("gameOverScene");
  }

  init(data) {
    this.m_killCount = data.killCount;
    this.m_level = data.level;
    this.m_secondElapsed = data.secondElapsed;
  }

  create() {
    setBackground(this, "background1");

    this.add
      .bitmapText(config.width / 2, 150, "pixelFont", "GAME OVER...", 100)
      .setOrigin(0.5);

    this.add
      .bitmapText(
        config.width / 2,
        340,
        "pixelFont",
        `Survived For ${getTimeString(this.m_secondElapsed)}`,
        50,
      )
      .setOrigin(0.5);

    this.add
      .bitmapText(
        config.width / 2,
        410,
        "pixelFont",
        `Killed ${this.m_killCount} Mobs`,
        50,
      )
      .setOrigin(0.5);

    this.add
      .bitmapText(
        config.width / 2,
        480,
        "pixelFont",
        `Died At Level ${this.m_level}`,
        50,
      )
      .setOrigin(0.5);

    new Button(
      config.width / 2 - 100,
      config.height / 2 + 150,
      "Try Again?",
      this,
      () => {
        this.scene.start("playGame");
      },
    );

    new Button(
      config.width / 2 + 100,
      config.height / 2 + 150,
      "Go To Main",
      this,
      () => {
        this.scene.start("mainScene");
      },
    );
  }
}
