import * as Phaser from "phaser";

export default class Whip extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, startingPosition, isHeadingLeft, damage, scale) {
    super(scene, startingPosition[0], startingPosition[1], "whip");

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    scene.m_weaponStatic.add(this);

    this.DURATION = 200;
    this.m_damage = damage;
    this.scale = scale;
    this.setDepth(30);
    this.play("whip_anim");

    if (isHeadingLeft) {
      this.flipX = true;
    }

    scene.time.addEvent({
      delay: this.DURATION,
      callback: () => {
        this.destroy();
      },
      loop: false,
    });

    this.setBodySize(80, 20);
  }

  move(vector) {
    this.x += vector[0] * 3;
    this.y -= vector[1] * 3;
  }
}
