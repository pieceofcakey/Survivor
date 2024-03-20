import * as Phaser from "phaser";
import config from "../config";
import { clamp } from "../utils/math";

export default class ExpBar extends Phaser.GameObjects.Graphics {
  constructor(scene, maxExp) {
    super(scene);

    this.HEIGHT = 40;
    this.BORDER = 4;

    this.m_x = 0;
    this.m_y = 0;

    this.m_maxExp = maxExp;
    this.m_currentExp = 0;
    this.m_overflowExp = 0;

    this.draw();
    this.setDepth(100);
    this.setScrollFactor(0);

    scene.add.existing(this);
  }

  increase(amount) {
    if (this.m_currentExp + amount > this.m_maxExp) {
      this.m_overflowExp = this.m_currentExp + amount - this.m_maxExp;
    }

    this.m_currentExp = clamp(this.m_currentExp + amount, 0, this.m_maxExp);

    this.draw();
  }

  reset() {
    this.m_currentExp = this.m_overflowExp;

    this.draw();

    this.m_overflowExp = 0;
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

    this.fillStyle(0x677ced);

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
