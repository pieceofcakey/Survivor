import * as Phaser from "phaser";

import fontPng from "/assets/font/font.png";
import fontXml from "/assets/font/font.xml?url";

import background from "/assets/images/background.png";
import arrowImg from "/assets/images/arrow.png";

import explosionImg from "/assets/spritesheets/explosion.png";
import playerImg from "/assets/spritesheets/player.png";
import expUpImg from "/assets/spritesheets/expUp.png";
import mobImg1 from "/assets/spritesheets/mob1.png";

export default class PreLoader extends Phaser.Scene {
  constructor() {
    super("loadGame");
  }

  preload() {
    this.load.image("background1", background);
    this.load.image("arrow", arrowImg);

    this.load.spritesheet("player", playerImg, {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet("mob1", mobImg1, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("explosion", explosionImg, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("expUp", expUpImg, {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.bitmapFont("pixelFont", fontPng, fontXml);
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("mainScene");

    this.anims.create({
      key: "playerRun",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "playerIdle",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 0,
      }),
      frameRate: 1,
      repeat: 0,
    });

    this.anims.create({
      key: "mob1Run",
      frames: this.anims.generateFrameNumbers("mob1"),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: "green",
      frames: this.anims.generateFrameNumbers("expUp", {
        start: 0,
        end: 0,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "yellow",
      frames: this.anims.generateFrameNumbers("expUp", {
        start: 1,
        end: 1,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "pink",
      frames: this.anims.generateFrameNumbers("expUp", {
        start: 2,
        end: 2,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "blue",
      frames: this.anims.generateFrameNumbers("expUp", {
        start: 3,
        end: 3,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("expUp", {
        start: 4,
        end: 4,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "purple",
      frames: this.anims.generateFrameNumbers("expUp", {
        start: 5,
        end: 5,
      }),
      frameRate: 20,
      repeat: 0,
    });
  }
}
