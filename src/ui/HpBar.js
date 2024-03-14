import * as Phaser from "phaser";
import { clamp } from "../utils/math";

export default class HpBar extends Phaser.GameObjects.Graphics {
  constructor(scene, player, maxHp) {
    super(scene);

    this.WIDTH = 80;
    this.HEIGHT = 12;
    this.BORDER = 2;

    this.m_x = player.x - this.WIDTH / 2;
    this.m_y = player.y + 40;

    this.m_maxHp = maxHp;
    this.m_currentHp = maxHp;

    this.draw();
    this.setScrollFactor(0);
    this.setDepth(20);

    scene.add.existing(this);
  }

  increase(amount) {
    this.m_currentHp = clamp(this.m_currentHp + amount, 0, this.m_maxHp);
    this.draw();
  }

  decrease(amount) {
    this.m_currentHp = clamp(this.m_currentHp - amount, 0, this.m_maxHp);
    this.draw();
  }

  draw() {
    this.clear();

    this.fillStyle(0x000000);
    this.fillRect(this.m_x, this.m_y, this.WIDTH, this.HEIGHT);

    this.fillStyle(0xffffff);
    this.fillRect(
      this.m_x + this.BORDER,
      this.m_y + this.BORDER,
      this.WIDTH - 2 * this.BORDER,
      this.HEIGHT - 2 * this.BORDER,
    );

    if (this.m_currentHp < 30) {
      this.fillStyle(0xff0000);
    } else {
      this.fillStyle(0x00ff00);
    }

    const hp = Math.floor(
      ((this.WIDTH - 2 * this.BORDER) / this.m_maxHp) * this.m_currentHp,
    );
    this.fillRect(
      this.m_x + this.BORDER,
      this.m_y + this.BORDER,
      hp,
      this.HEIGHT - 2 * this.BORDER,
    );
  }
}
