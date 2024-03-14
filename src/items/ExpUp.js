import Phaser from "phaser";

const ITEM_PROPERTY = {
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
    const x = mob.x;
    const y = mob.y + 30;

    super(scene, x, y, "expUp");
    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    this.m_exp = ITEM_PROPERTY[mob.texture.key].exp;
    this.play(ITEM_PROPERTY[mob.texture.key].color);

    this.scale = 1.5;
    this.setDepth(7);
    this.setBodySize(20, 20);
  }
}
