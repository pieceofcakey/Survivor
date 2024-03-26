import * as Phaser from "phaser";
import config from "../config";

import Player from "../characters/Player";
import Mob from "../characters/Mob";

import { setBackground } from "../utils/backgroundManager";
import { addMobEvent, removeAllMobEvent } from "../utils/mobManager";
import {
  addAttackEvent,
  setAttackDamage,
  setAttackRepeatGap,
  setAttackScale,
} from "../utils/attackManager";
import { createTime } from "../utils/time";
import { pause } from "../utils/pauseManager";

import ExpBar from "../ui/ExpBar";
import StatusBar from "../ui/StatusBar";
import Shield from "../effects/Shield";

export default class PlayingScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    setBackground(this, "background1");

    this.m_player = new Player(this);

    this.cameras.main.startFollow(this.m_player);

    this.m_mobs = this.physics.add.group();
    this.m_mobs.add(new Mob(this, 0, 0, "mob1", "mob1Run", 10, 0.9, 0.01));
    this.m_mobEvents = [];

    addMobEvent(this, 300, "mob1", "mob1Run", 10, 0.9, 0.01);

    createTime(this);

    this.m_expBar = new ExpBar(this, 50);
    this.m_statusBar = new StatusBar(this);

    this.m_weaponDynamic = this.add.group();
    this.m_weaponStatic = this.add.group();
    this.m_weaponStaticShield = this.add.group();
    this.m_attackEvents = {};

    this.m_shieldAngle = 0.05;

    addAttackEvent(this, "arrow", 10, 1.5, 1000);

    this.physics.add.overlap(
      this.m_player,
      this.m_mobs,
      (player, mob) => {
        switch (mob.texture.key) {
          case "mob1":
            this.m_player.hitByMob(5);
            break;
          case "mob2":
            this.m_player.hitByMob(10);
            break;
          case "mob3":
            this.m_player.hitByMob(20);
            break;
          case "mob4":
            this.m_player.hitByMob(25);
            break;
          case "mob5":
            this.m_player.hitByMob(33);
            break;
          case "mobBoss":
            this.m_player.hitByMob(50);
            break;
        }
      },
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
    this.physics.add.overlap(
      this.m_weaponStaticShield,
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

    this.m_items = this.physics.add.group();

    this.physics.add.overlap(
      this.m_player,
      this.m_items,
      (player, items) => {
        switch (items.m_itemName) {
          case "magnet":
            items.m_itemFunction(this.m_expUps.getChildren(), player);
            break;
          case "freeze":
            items.m_itemFunction(this.m_mobs.getChildren());
            break;
          case "potion":
            items.m_itemFunction(player);
            break;
          case "allkill":
            items.m_itemFunction(this.m_mobs.getChildren());
            break;
        }

        items.disableBody(true, true);
        items.destroy();
      },
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

    this.time.addEvent({
      delay: 10000,
      callback: () => {
        switch (this.m_secondElapsed) {
          case 20:
            removeAllMobEvent(this);
            addMobEvent(this, 300, "mob2", "mob2Run", 20, 0.8, 0.01);

            break;
          case 40:
            removeAllMobEvent(this);
            addMobEvent(this, 300, "mob3", "mob3Run", 30, 0.7, 0.01);

            break;
          case 60:
            removeAllMobEvent(this);
            addMobEvent(this, 300, "mob4", "mob4Run", 40, 0.6, 0.01);

            break;
          case 80:
            removeAllMobEvent(this);
            addMobEvent(this, 300, "mob5", "mob5Run", 50, 0.5, 0.01);

            break;
          case 100:
            removeAllMobEvent(this);
            addMobEvent(this, 300, "mobBoss", "mobBossRun", 60, 0.5, 0.01);

            break;
          case 120:
            removeAllMobEvent(this);
            addMobEvent(this, 100, "mob1", "mob1Run", 10, 0.9, 0.01);
            addMobEvent(this, 100, "mob2", "mob2Run", 20, 0.8, 0.01);
            addMobEvent(this, 100, "mob3", "mob3Run", 30, 0.7, 0.01);
            addMobEvent(this, 100, "mob4", "mob4Run", 40, 0.6, 0.01);
            addMobEvent(this, 100, "mob5", "mob5Run", 50, 0.5, 0.01);
            addMobEvent(this, 100, "mobBoss", "mobBossRun", 60, 0.5, 0.01);

            break;
        }
      },
      callbackScope: this,
      loop: true,
    });
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
    this.m_weaponStaticShield.rotateAroundDistance(
      this.m_player,
      this.m_shieldAngle,
      150,
    );
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

    this.m_weaponStatic.children.each((weapon) => {
      if (weapon.texture.key === "lightning") {
        return;
      }

      weapon.move(vector);
    }, this);

    this.m_weaponStaticShield.children.each((weapon) => {
      weapon.move(vector);
    }, this);
  }

  pickExpUp(player, expUp) {
    expUp.disableBody(true, true);
    expUp.destroy();
    this.m_expBar.increase(expUp.m_exp);

    if (this.m_expBar.m_currentExp >= this.m_expBar.m_maxExp) {
      pause(this, "levelup");
    }

    if (expUp.m_expEvents.length > 0) {
      this.time.removeEvent(expUp.m_expEvents);
    }
  }

  afterLevelUp() {
    this.m_statusBar.gainLevel();

    switch (this.m_statusBar.m_level) {
      case 2:
        addAttackEvent(this, "whip", 10, 1.5, 1000);
        break;
      case 3:
        addAttackEvent(this, "sword", 10, 1.8, 500);
        break;
      case 4:
        addAttackEvent(this, "shield", 10, 2);
        break;
      case 5:
        addAttackEvent(this, "fireball", 20, 0.25, 1000);
        break;
      case 6:
        addAttackEvent(this, "lightning", 10, 1, 1000);
        break;
      case 7:
        setAttackRepeatGap(this, "arrow", 500);
        break;
      case 8:
        setAttackScale(this, "whip", 3);
        break;
      case 9:
        this.m_weaponStaticShield.clear(true, true);

        addAttackEvent(this, "shield", 10, 2);
        new Shield(this, [this.m_player.x - 100, this.m_player.y], 10, 2);
        new Shield(this, [this.m_player.x, this.m_player.y + 100], 10, 2);
        new Shield(this, [this.m_player.x, this.m_player.y - 100], 10, 2);
        break;
      case 10:
        setAttackRepeatGap(this, "sword", 250);
        break;
      case 11:
        setAttackRepeatGap(this, "fireball", 500);
        break;
      case 12:
        setAttackRepeatGap(this, "lightning", 500);
        break;
      case 13:
        setAttackRepeatGap(this, "arrow", 100);
        break;
      case 14:
        setAttackRepeatGap(this, "whip", 500);
        break;
      case 15:
        this.m_weaponStaticShield.clear(true, true);

        addAttackEvent(this, "shield", 10, 2);
        new Shield(this, [this.m_player.x - 100, this.m_player.y], 10, 2);
        new Shield(this, [this.m_player.x, this.m_player.y + 100], 10, 2);
        new Shield(this, [this.m_player.x, this.m_player.y - 100], 10, 2);
        new Shield(
          this,
          [this.m_player.x + Math.cos(50), this.m_player.y - Math.sin(45)],
          10,
          2,
        );
        new Shield(
          this,
          [this.m_player.x - Math.cos(50), this.m_player.y - Math.sin(45)],
          10,
          2,
        );
        new Shield(
          this,
          [this.m_player.x + Math.cos(50), this.m_player.y + Math.sin(45)],
          10,
          2,
        );
        new Shield(
          this,
          [this.m_player.x - Math.cos(50), this.m_player.y + Math.sin(45)],
          10,
          2,
        );
        break;
      case 16:
        setAttackRepeatGap(this, "sword", 100);
        break;
      case 17:
        addAttackEvent(this, "fireball", 20, 0.25, 500);
        addAttackEvent(this, "fireball", 20, 0.25, 500);
        addAttackEvent(this, "fireball", 20, 0.25, 500);
        addAttackEvent(this, "fireball", 20, 0.25, 500);
        break;
      case 18:
        addAttackEvent(this, "lightning", 10, 1, 500);
        addAttackEvent(this, "lightning", 10, 1, 500);
        addAttackEvent(this, "lightning", 10, 1, 500);
        addAttackEvent(this, "lightning", 10, 1, 500);
        break;
      case 19:
        this.m_shieldAngle = 0.1;
        break;
      case 20:
        setAttackDamage(this, "arrow", 30);
        setAttackDamage(this, "sword", 30);
        setAttackDamage(this, "whip", 30);
        break;
      default:
        break;
    }
  }
}
