import config from "../config";

export function setBackground(scene, backgroundTexture) {
  scene.m_background = scene.add
    .tileSprite(0, 0, config.width, config.height, backgroundTexture)
    .setOrigin(0, 0);
}
