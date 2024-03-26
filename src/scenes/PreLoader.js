import * as Phaser from "phaser";

import fontPng from "/assets/font/font.png";
import fontXml from "/assets/font/font.xml?url";

import background from "/assets/images/background.png";
import main from "/assets/images/main.png";

import arrowImg from "/assets/images/arrow.png";
import shieldImg from "/assets/images/shield.png";
import swordImg from "/assets/images/sword.png";

import explosionImg from "/assets/spritesheets/explosion.png";
import playerImg from "/assets/spritesheets/player.png";
import expUpImg from "/assets/spritesheets/expUp.png";
import itemsImg from "/assets/spritesheets/items.png";
import mobImg1 from "/assets/spritesheets/mob1.png";
import mobImg2 from "/assets/spritesheets/mob2.png";
import mobImg3 from "/assets/spritesheets/mob3.png";
import mobImg4 from "/assets/spritesheets/mob4.png";
import mobImg5 from "/assets/spritesheets/mob5.png";
import mobImgBoss from "/assets/spritesheets/mobBoss.png";
import whipImg from "/assets/spritesheets/whip.png";
import lightningImg from "/assets/spritesheets/lightning.png";
import fireballImg from "/assets/spritesheets/fireball.png";

export default class PreLoader extends Phaser.Scene {
  constructor() {
    super("loadGame");
  }

  preload() {
    this.load.image("background1", background);
    this.load.image("main", main);
    this.load.image("arrow", arrowImg);
    this.load.image("shield", shieldImg);
    this.load.image("sword", swordImg);

    this.load.spritesheet("player", playerImg, {
      frameWidth: 80,
      frameHeight: 80,
    });

    this.load.spritesheet("mob1", mobImg1, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("mob2", mobImg2, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("mob3", mobImg3, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("mob4", mobImg4, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("mob5", mobImg5, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("mobBoss", mobImgBoss, {
      frameWidth: 160,
      frameHeight: 128,
    });
    this.load.spritesheet("whip", whipImg, {
      frameWidth: 65,
      frameHeight: 27,
    });
    this.load.spritesheet("lightning", lightningImg, {
      frameWidth: 72,
      frameHeight: 72,
    });
    this.load.spritesheet("fireball", fireballImg, {
      frameWidth: 512,
      frameHeight: 384,
    });

    this.load.spritesheet("explosion", explosionImg, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("expUp", expUpImg, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("items", itemsImg, {
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
      key: "whip_anim",
      frames: this.anims.generateFrameNumbers("whip"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });
    this.anims.create({
      key: "lightning_anim",
      frames: this.anims.generateFrameNumbers("lightning"),
      frameRate: 40,
      repeat: 0,
      hideOnComplete: true,
    });
    this.anims.create({
      key: "fireball_anim",
      frames: this.anims.generateFrameNumbers("fireball"),
      frameRate: 40,
      repeat: -1,
    });

    this.anims.create({
      key: "mob1Run",
      frames: this.anims.generateFrameNumbers("mob1"),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "mob2Run",
      frames: this.anims.generateFrameNumbers("mob2"),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "mob3Run",
      frames: this.anims.generateFrameNumbers("mob3"),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "mob4Run",
      frames: this.anims.generateFrameNumbers("mob4"),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "mob5Run",
      frames: this.anims.generateFrameNumbers("mob5"),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "mobBossRun",
      frames: this.anims.generateFrameNumbers("mobBoss"),
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

    this.anims.create({
      key: "magnet",
      frames: this.anims.generateFrameNumbers("items", {
        start: 0,
        end: 0,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "freeze",
      frames: this.anims.generateFrameNumbers("items", {
        start: 1,
        end: 1,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "potion",
      frames: this.anims.generateFrameNumbers("items", {
        start: 2,
        end: 2,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "allkill",
      frames: this.anims.generateFrameNumbers("items", {
        start: 3,
        end: 3,
      }),
      frameRate: 20,
      repeat: 0,
    });
  }
}
