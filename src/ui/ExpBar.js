import * as Phaser from "phaser";
import config from "../config";

export default class ExpBar extends Phaser.GameObjects.Graphics {
  constructor(scene, maxExp) {
    super(scene);

    this.HEIGHT = 40;
    this.BORDER = 4;

    this.m_x = 0;
    this.m_y = 0;

    this.m_maxExp = maxExp;
    this.m_currentExp = 0;

    this.draw();
    this.setDepth(100);
    this.setScrollFactor(0);

    scene.add.existing(this);
  }

  draw() {
    this.clear();

    this.fillStyle(0x000000);
    this.fillRect(this.m_x, this.m_y, config.width, this.HEIGHT);

    this.fillStyle(0xffffff);
    this.fillRect(
      this.m_x + this.BORDER,
      this.m_y + this.BORDER,
      config.width - 2 * this.BORDER,
      this.HEIGHT - 2 * this.BORDER,
    );

    this.fillStyle(0x3665d5);

    const exp = Math.floor(
      ((config.width - 2 * this.BORDER) / this.m_maxExp) * this.m_currentExp,
    );

    this.fillRect(
      this.m_x + this.BORDER,
      this.m_y + this.BORDER,
      exp,
      this.HEIGHT - 2 * this.BORDER,
    );
  }
}
