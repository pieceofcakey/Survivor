import * as Phaser from "phaser";

const EXP_PROPERTY = {
  mob1: {
    exp: 10,
    color: "green",
  },
  mob2: {
    exp: 20,
    color: "yellow",
  },
  mob3: {
    exp: 30,
    color: "pink",
  },
  mob4: {
    exp: 40,
    color: "blue",
  },
  mob5: {
    exp: 50,
    color: "red",
  },
  mobBoss: {
    exp: 60,
    color: "purple",
  },
};

export default class ExpUp extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, mob) {
    let x = 0;
    let y = 0;

    if (mob.texture.key === "mobBoss") {
      x = mob.x;
      y = mob.y + 70;
    } else {
      x = mob.x;
      y = mob.y + 30;
    }

    super(scene, x, y, "expUp");
    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    this.m_exp = EXP_PROPERTY[mob.texture.key].exp;
    this.play(EXP_PROPERTY[mob.texture.key].color);

    this.scale = 1.5;
    this.setDepth(7);
    this.setBodySize(20, 20);

    this.m_expEvents = [];
  }
}
