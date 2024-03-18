import config from "../config";

export function getRandomPosition(x, y) {
  const randomRadius = Math.random() * Math.PI * 2;
  const radius =
    Math.sqrt(config.width * config.width + config.height * config.height) / 2;
  const randomX = x + radius * Math.cos(randomRadius);
  const randomY = y + radius * Math.sin(randomRadius);
  return [randomX, randomY];
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
