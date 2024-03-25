import * as Phaser from "phaser";
import Explosion from "../effects/Explosion";
import ExpUp from "../items/ExpUp";
import Items from "../items/Items";

export default class Mob extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene,
    x,
    y,
    texture,
    animKey,
    initHp,
    expDropRate,
    itemDropRate,
  ) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.play(animKey);
    this.setDepth(10);

    this.scale = 2;
    this.m_speed = 60;
    this.m_hp = initHp;
    this.m_expDropRate = expDropRate;
    this.m_itemDropRate = itemDropRate;

    this.m_canBeAttacked = true;

    if (texture === "mob1") {
      this.setBodySize(24, 32);
      this.setOffset(20, 32);
    } else if (texture === "mob2") {
      this.setBodySize(24, 32);
      this.setOffset(20, 32);
    } else if (texture === "mob3") {
      this.setBodySize(24, 32);
      this.setOffset(20, 32);
    } else if (texture === "mob4") {
      this.setBodySize(20, 32);
      this.setOffset(20, 32);
    } else if (texture === "mob5") {
      this.setBodySize(20, 32);
      this.setOffset(20, 32);
    } else if (texture === "mobBoss") {
      this.scale = 3;
      this.m_speed = 50;

      this.setBodySize(40, 50);
      this.setOffset(60, 64);
    }

    this.m_events = [];
    this.m_events.push(
      this.scene.time.addEvent({
        delay: 100,
        callback: () => {
          scene.physics.moveToObject(
            this,
            { x: scene.m_player.x, y: scene.m_player.y - 30 },
            this.m_speed,
          );
        },
        loop: true,
      }),
    );

    scene.events.on("update", (time, delta) => {
      this.update(time, delta);
    });
  }

  hitByDynamic(weaponDynamic, damage) {
    this.m_hp -= damage;

    this.displayHit();
    weaponDynamic.destroy();
  }

  hitByStatic(damage) {
    if (!this.m_canBeAttacked) {
      return;
    }

    this.m_hp -= damage;

    this.displayHit();
    this.getCoolDown();
  }

  displayHit() {
    this.tint = 0xdb4455;
    this.scene.time.addEvent({
      delay: 200,
      callback: () => {
        if (!this.active) {
          this.tint = 0x4169e1;

          return;
        }
        this.tint = 0xffffff;
      },
      loop: false,
    });
  }

  getCoolDown() {
    this.m_canBeAttacked = false;
    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.m_canBeAttacked = true;
      },
      loop: false,
    });
  }

  die() {
    new Explosion(this.scene, this.x, this.y + 30);

    if (Math.random() < this.m_expDropRate) {
      const expUp = new ExpUp(this.scene, this);
      this.scene.m_expUps.add(expUp);
    }

    if (Math.random() < this.m_itemDropRate) {
      const item = new Items(this.scene, this);
      this.scene.m_items.add(item);
    }

    this.scene.m_statusBar.gainMobsKilled();
    this.scene.time.removeEvent(this.m_events);
    this.destroy();
  }

  update() {
    if (!this.body) {
      return;
    }

    if (this.x > this.scene.m_player.x) {
      this.flipX = true;
    } else {
      this.flipX = false;
    }

    if (this.m_hp <= 0) {
      this.die();
    }
  }
}
