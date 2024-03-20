import * as Phaser from "phaser";

export default class Button extends Phaser.GameObjects.Text {
  constructor(x, y, label, scene, callback) {
    super(scene, x, y, label);

    this.setOrigin(0.5)
      .setPadding(10)
      .setStyle({ backgroundColor: "#677ced", fontSize: 20 })
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => {
        this.setStyle({ fill: "#000000" });
      })
      .on("pointerout", () => {
        this.setStyle({ fill: "#ffffff" });
      })
      .on("pointerdown", () => {
        callback();
      });

    scene.add.existing(this);
  }
}
