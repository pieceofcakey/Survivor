import game from "../main";
import config from "../config";

let scene_paused = null;
let time_paused = Date.now() - 100;
let type_pause;

const PAUSE_TEXT_BY_TYPE = {
  pause: {
    text: "P A U S E",
    fontSize: 80,
  },
  levelup: {
    text: "LEVEL UP",
    fontSize: 80,
  },
};

export function pause(scene, type) {
  if (Date.now() - time_paused > 100 && game.scene.isActive(scene)) {
    game.scene.pause(scene);

    scene_paused = scene;
    time_paused = Date.now();
    type_pause = type;

    createVeil(scene);
    createPauseText(scene, type_pause);
  }
}

document.addEventListener("keydown", (event) => {
  if (
    ((type_pause === "pause" && event.key === "Escape") ||
      (type_pause === "levelup" && event.key === "Escape")) &&
    Date.now() - time_paused > 100 &&
    scene_paused
  ) {
    const previousScene = game.scene.getScene(scene_paused);

    game.scene.resume(scene_paused);
    togglePauseScreen(previousScene, false);

    if (type_pause === "levelup") {
      previousScene.afterLevelUp();
    }

    scene_paused = null;
    time_paused = Date.now();
  }
});

function createVeil(scene) {
  scene.m_veil = scene.add
    .graphics({ x: 0, y: 0 })
    .fillStyle(0x000000, 0.3)
    .fillRect(0, 0, config.width, config.height)
    .setDepth(110)
    .setScrollFactor(0);
}

function createPauseText(scene, type) {
  scene.m_pauseText = scene.add
    .bitmapText(
      config.width / 2,
      config.height / 2 - 150,
      "pixelFont",
      PAUSE_TEXT_BY_TYPE[type].text,
      PAUSE_TEXT_BY_TYPE[type].fontSize,
    )
    .setOrigin(0.5)
    .setDepth(120)
    .setScrollFactor(0);
}

function togglePauseScreen(scene, isVisible) {
  scene.m_veil.setVisible(isVisible);
  scene.m_pauseText.setVisible(isVisible);
}
