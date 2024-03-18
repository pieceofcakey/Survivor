import * as Phaser from "phaser";
import config from "../config";

import Player from "../characters/Player";
import Mob from "../characters/Mob";

import { setBackground } from "../utils/backgroundManager";
import { addMobEvent } from "../utils/mobManager";
import { addAttackEvent } from "../utils/attackManager";
import { createTime } from "../utils/time";
import { pause } from "../utils/pauseManager";

import ExpBar from "../ui/ExpBar";
import StatusBar from "../ui/StatusBar";

export default class PlayingScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.m_player = new Player(this);

    this.cameras.main.startFollow(this.m_player);

    this.m_mobs = this.physics.add.group();
    this.m_mobs.add(new Mob(this, 0, 0, "mob1", "mob1Run", 10, 0.9));
    this.m_mobEvents = [];

    addMobEvent(this, 100, "mob1", "mob1Run", 10, 0.9);

    createTime(this);

    this.m_expBar = new ExpBar(this, 50);
    this.m_statusBar = new StatusBar(this);

    this.m_weaponDynamic = this.add.group();
    this.m_weaponStatic = this.add.group();
    this.m_attackEvents = {};

    addAttackEvent(this, "arrow", 10, 1.5, 200);

    setBackground(this, "background1");

    this.physics.add.overlap(
      this.m_player,
      this.m_mobs,
      () => this.m_player.hitByMob(10),
      null,
      this,
    );

    this.physics.add.overlap(
      this.m_weaponDynamic,
      this.m_mobs,
      (weapon, mob) => {
        mob.hitByDynamic(weapon, weapon.m_damage);
      },
      null,
      this,
    );

    this.physics.add.overlap(
      this.m_weaponStatic,
      this.m_mobs,
      (weapon, mob) => {
        mob.hitByStatic(weapon.m_damage);
      },
      null,
      this,
    );

    this.m_expUps = this.physics.add.group();

    this.physics.add.overlap(
      this.m_player,
      this.m_expUps,
      this.pickExpUp,
      null,
      this,
    );

    this.m_cursorKeys = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on(
      "keydown-ESC",
      () => {
        pause(this, "pause");
      },
      this,
    );
  }

  update() {
    this.movePlayerManager();

    this.m_background.setX(this.m_player.x - config.width / 2);
    this.m_background.setY(this.m_player.y - config.height / 2);

    this.m_background.tilePositionX = this.m_player.x - config.width / 2;
    this.m_background.tilePositionY = this.m_player.y - config.height / 2;

    const closest = this.physics.closest(
      this.m_player,
      this.m_mobs.getChildren(),
    );

    this.m_closest = closest;
  }

  movePlayerManager() {
    if (
      this.m_cursorKeys.left.isDown ||
      this.m_cursorKeys.right.isDown ||
      this.m_cursorKeys.up.isDown ||
      this.m_cursorKeys.down.isDown
    ) {
      if (!this.m_player.m_moving) {
        this.m_player.play("playerRun");
      }

      this.m_player.m_moving = true;
    } else {
      if (this.m_player.m_moving) {
        this.m_player.play("playerIdle");
      }

      this.m_player.m_moving = false;
    }

    const vector = [0, 0];

    if (this.m_cursorKeys.left.isDown) {
      vector[0] -= 1;
    } else if (this.m_cursorKeys.right.isDown) {
      vector[0] += 1;
    }

    if (this.m_cursorKeys.down.isDown) {
      vector[1] -= 1;
    } else if (this.m_cursorKeys.up.isDown) {
      vector[1] += 1;
    }

    this.m_player.move(vector);
  }

  pickExpUp(player, expUp) {
    expUp.disableBody(true, true);
    expUp.destroy();
    this.m_expBar.increase(expUp.m_exp);

    if (this.m_expBar.m_currentExp >= this.m_expBar.m_maxExp) {
      pause(this, "levelup");
    }
  }

  afterLevelUp() {
    this.m_statusBar.gainLevel();
  }
}
