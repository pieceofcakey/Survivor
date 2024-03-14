import config from "../config";

export function createTime(scene) {
  scene.m_secondElapsed = 0;

  scene.m_timeText = scene.add
    .text(config.width / 2, 100, "00:00", { fontSize: 30 })
    .setOrigin(0.5)
    .setDepth(100)
    .setScrollFactor(0);

  scene.time.addEvent({
    callback: () => {
      scene.m_secondElapsed += 1;
      scene.m_timeText.setText(getTimeString(scene.m_secondElapsed));
    },
    delay: 1000,
    loop: true,
  });
}

export function getTimeString(seconds) {
  const timeMinute = Math.floor((seconds / 60) % 60)
    .toString()
    .padStart(2, "0");

  const timeSecond = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${timeMinute}:${timeSecond}`;
}
