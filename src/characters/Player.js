import * as Phaser from "phaser";
import config from "../config";
import HpBar from "../ui/HpBar";
import { loseGame } from "../utils/sceneManager";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, config.width / 2, config.height / 2, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.scale = 1.3;
    this.m_moving = false;
    this.m_canBeAttacked = true;
    this.m_hpBar = new HpBar(scene, this, 100);
    this.setDepth(20);
    this.setBodySize(30, 50);
  }

  move(vector) {
    const PLAYER_SPEED = 3;

    this.x += vector[0] * PLAYER_SPEED;
    this.y -= vector[1] * PLAYER_SPEED;

    if (vector[0] === -1) {
      this.flipX = true;
    } else if (vector[0] === 1) {
      this.flipX = false;
    }
  }

  hitByMob(damage) {
    if (!this.m_canBeAttacked) {
      return;
    }

    this.getCooldown();

    this.m_hpBar.decrease(damage);

    if (this.m_hpBar.m_currentHp <= 0) {
      loseGame(this.scene);
    }
  }

  getCooldown() {
    this.m_canBeAttacked = false;
    this.tint = 0xdb4455;
    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.tint = 0xffffff;
        this.m_canBeAttacked = true;
      },
      callbackScope: this,
      loop: false,
    });
  }
}
