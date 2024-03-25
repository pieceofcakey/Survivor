import * as Phaser from "phaser";

export default class Sword extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, startingPosition, damage, scale) {
    super(scene, startingPosition[0], startingPosition[1], "sword");

    this.SPEED = 2;
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
    const keyboard = this.scene.m_cursorKeys;

    if (keyboard.left.isDown && keyboard.down.isDown) {
      this.body.setVelocity(-200 * this.SPEED, 200 * this.SPEED);
    } else if (keyboard.left.isDown && keyboard.up.isDown) {
      this.body.setVelocity(-200 * this.SPEED, -200 * this.SPEED);
    } else if (keyboard.right.isDown && keyboard.down.isDown) {
      this.body.setVelocity(200 * this.SPEED, 200 * this.SPEED);
    } else if (keyboard.right.isDown && keyboard.up.isDown) {
      this.body.setVelocity(200 * this.SPEED, -200 * this.SPEED);
    } else if (keyboard.left.isDown) {
      this.body.setVelocity(-250 * this.SPEED, 0);
    } else if (keyboard.right.isDown) {
      this.body.setVelocity(250 * this.SPEED, 0);
    } else if (keyboard.down.isDown) {
      this.body.setVelocity(0, 250 * this.SPEED);
    } else if (keyboard.up.isDown) {
      this.body.setVelocity(0, -250 * this.SPEED);
    } else {
      if (!this.scene.lastVelocity) {
        this.body.setVelocity(250 * this.SPEED, 0);

        return;
      }

      this.body.setVelocity(
        this.scene.lastVelocity.x,
        this.scene.lastVelocity.y,
      );
    }

    this.scene.lastVelocity = this.body.velocity;
  }

  setAngle() {
    this.rotation = Math.PI / 2 + Math.PI / 4;
    this.body.setAngularVelocity(800);
  }
}
