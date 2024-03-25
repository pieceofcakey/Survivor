import * as Phaser from "phaser";

export default class Fireball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, startingPosition, damage, scale) {
    super(scene, startingPosition[0], startingPosition[1], "fireball");

    this.SPEED = 150;
    this.DURATION = 5000;

    scene.add.existing(this);
    scene.physics.world.enableBody(this);
    scene.m_weaponDynamic.add(this);

    this.mobList = scene.m_mobs.getChildren();
    this.randomMob = Math.floor(Math.random() * (this.mobList.length - 1));
    this.m_damage = damage;
    this.scale = scale;
    this.setDepth(30);
    this.play("fireball_anim");
    this.setBodySize(150, 100);

    this.setVelocity(this.mobList, this.randomMob);
    this.setAngle(this.mobList, this.randomMob);

    scene.time.addEvent({
      delay: this.DURATION,
      callback: () => {
        this.destroy();
      },
      loop: false,
    });
  }

  setVelocity(mobList, randomMob) {
    if (!mobList.length) {
      this.setVelocityY(-250);
      return;
    }

    const xVelocity = mobList[randomMob].x - this.x;
    const yVelocity = mobList[randomMob].y - this.y;
    const rootVelocity =
      Math.sqrt(xVelocity * xVelocity + yVelocity * yVelocity) / 2;
    this.body.velocity.x = (xVelocity / rootVelocity) * this.SPEED;
    this.body.velocity.y = (yVelocity / rootVelocity) * this.SPEED + 30;
  }

  setAngle(mobList, randomMob) {
    if (!mobList.length) {
      return;
    }

    const angleToMob = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      mobList[randomMob].x,
      mobList[randomMob].y,
    );

    this.rotation = angleToMob;
    this.body.setAngularVelocity(0);
  }
}
