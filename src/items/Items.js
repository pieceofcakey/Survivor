import * as Phaser from "phaser";

const ITEM_PROPERTY = {
  magnet: (exps, player) => {
    for (let i = 0; i < exps.length; i++) {
      if (exps[i].m_expEvents.length > 0) {
        continue;
      }

      exps[i].m_expEvents.push(
        exps[i].scene.time.addEvent({
          delay: 100,
          callback: () => {
            if (!exps[i]) {
              return;
            }

            exps[i].scene.physics.moveToObject(exps[i], player, 1000);
          },
          loop: true,
        }),
      );
    }
  },
  freeze: (mobs) => {
    for (let i = 0; i < mobs.length; i++) {
      mobs[i].active = false;
      mobs[i].m_speed = 0;
      mobs[i].tint = 0x4169e1;

      mobs[i].scene.time.addEvent({
        delay: 5000,
        callback: () => {
          if (!mobs[i]) {
            return;
          }
          mobs[i].active = true;
          mobs[i].m_speed = 60;
          mobs[i].tint = 0xffffff;
        },
        loop: false,
      });
    }
  },
  potion: (player) => {
    player.m_hpBar.increase(20);
  },
  allkill: (mobs) => {
    while (mobs.length > 0) {
      mobs[0].die();
    }
  },
};

export default class Items extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, mob) {
    let x = 0;
    let y = 0;

    if (mob.texture.key === "mobBoss") {
      x = mob.x;
      y = mob.y + 100;
    } else {
      x = mob.x;
      y = mob.y + 60;
    }

    super(scene, x, y, "items");
    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    this.m_itemName = "";
    this.m_itemFunction;

    const randomNumber = Phaser.Math.RND.integerInRange(0, 3);

    switch (randomNumber) {
      case 0:
        this.m_itemName = "magnet";
        this.m_itemFunction = ITEM_PROPERTY[this.m_itemName];
        break;
      case 1:
        this.m_itemName = "freeze";
        this.m_itemFunction = ITEM_PROPERTY[this.m_itemName];
        break;
      case 2:
        this.m_itemName = "potion";
        this.m_itemFunction = ITEM_PROPERTY[this.m_itemName];
        break;
      case 3:
        this.m_itemName = "allkill";
        this.m_itemFunction = ITEM_PROPERTY[this.m_itemName];
        break;
    }

    this.play(this.m_itemName);

    this.scale = 1.5;
    this.setDepth(7);
    this.setBodySize(20, 20);
  }
}
