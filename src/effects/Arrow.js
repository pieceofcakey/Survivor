import * as Phaser from "phaser";

export default class Arrow extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, startingPosition, damage, scale) {
    super(scene, startingPosition[0], startingPosition[1], "arrow");

    this.SPEED = 250;
    this.DURATION = 1500;

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    scene.m_weaponDynamic.add(this);

    this.m_damage = damage;
    this.scale = scale;
    this.setDepth(30);

    this.setVelocity();
    this.setAngle();

    scene.time.addEvent({
      delay: this.DURATION,
      callback: () => {
        this.destroy();
      },
      loop: false,
    });
  }

  setVelocity() {
    if (!this.scene.m_closest) {
      this.setVelocityY(-250);

      return;
    }

    const xVelocity = this.scene.m_closest.x - this.x;
    const yVelocity = this.scene.m_closest.y - this.y;
    const rootVelocity =
      Math.sqrt(xVelocity * xVelocity + yVelocity * yVelocity) / 2;
    this.body.velocity.x = (xVelocity / rootVelocity) * this.SPEED;
    this.body.velocity.y = (yVelocity / rootVelocity) * this.SPEED + 30;
  }

  setAngle() {
    if (!this.scene.m_closest) {
      return;
    }

    const angleToMob = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      this.scene.m_closest.x,
      this.scene.m_closest.y,
    );

    this.rotation = angleToMob + Math.PI / 2 + Math.PI / 4;
    this.body.setAngularVelocity(0);
  }
}
