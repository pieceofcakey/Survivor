import * as Phaser from "phaser";

export default class Lightning extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, startingPosition, damage, scale) {
    super(scene, startingPosition[0], startingPosition[1] + 30, "lightning");

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    scene.m_weaponStatic.add(this);

    this.DURATION = 400;
    this.m_damage = damage;
    this.scale = scale;
    this.setDepth(30);
    this.play("lightning_anim");

    scene.time.addEvent({
      delay: this.DURATION,
      callback: () => {
        this.destroy();
      },
      loop: false,
    });
  }
}
