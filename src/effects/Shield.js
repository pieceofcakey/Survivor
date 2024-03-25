import * as Phaser from "phaser";

export default class Shield extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, startingPosition, damage, scale) {
    super(scene, startingPosition[0], startingPosition[1], "shield");

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    scene.m_weaponStaticShield.add(this);

    this.m_damage = damage;
    this.scale = scale;
    this.setDepth(30);
  }

  move(vector) {
    this.x += vector[0] * 3;
    this.y -= vector[1] * 3;
  }
}
