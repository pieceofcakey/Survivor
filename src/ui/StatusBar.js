import * as Phaser from "phaser";
import config from "../config";

export default class StatusBar extends Phaser.GameObjects.Graphics {
  constructor(scene) {
    super(scene);

    this.m_killCount = 0;
    this.m_killCountLabel = scene.add
      .bitmapText(
        0,
        25,
        "pixelFont",
        `KILLED ${this.m_killCount.toString().padStart(6, "0")}`,
        30,
      )
      .setScrollFactor(0)
      .setDepth(100);

    this.m_level = 1;
    this.m_levelLabel = scene.add
      .bitmapText(
        config.width - 130,
        25,
        "pixelFont",
        `LVL ${this.m_level.toString().padStart(3, "0")}`,
        30,
      )
      .setScrollFactor(0)
      .setDepth(100);

    scene.add.existing(this);
  }

  gainMobsKilled() {
    this.m_killCount += 1;
    this.m_killCountLabel.text = `KILLED ${this.m_killCount
      .toString()
      .padStart(6, "0")}`;
  }

  gainLevel() {
    this.m_level += 1;
    this.m_levelLabel.text = `LVL ${this.m_level.toString().padStart(3, "0")}`;

    this.scene.m_expBar.m_maxExp *= 1.3;
    this.scene.m_expBar.reset();
  }
}
