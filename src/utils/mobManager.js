import Mob from "../characters/Mob";
import { getRandomPosition } from "./math";

export function addMobEvent(
  scene,
  repeatGap,
  mobTexture,
  mobAnim,
  mobHp,
  mobDropRate,
) {
  const timer = scene.time.addEvent({
    delay: repeatGap,
    callback: () => {
      const [randomX, randomY] = getRandomPosition(
        scene.m_player.x,
        scene.m_player.y,
      );
      scene.m_mobs.add(
        new Mob(
          scene,
          randomX,
          randomY,
          mobTexture,
          mobAnim,
          mobHp,
          mobDropRate,
        ),
      );
    },
    loop: true,
  });

  scene.m_mobEvents.push(timer);
}

export function removeOldestMobEvent(scene) {
  scene.m_mobEvents[0].remove();
  scene.m_mobEvents.shift();
}
