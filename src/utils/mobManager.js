import Mob from "../characters/Mob";
import { getRandomPosition } from "./math";

export function addMobEvent(
  scene,
  repeatGap,
  mobTexture,
  mobAnim,
  mobHp,
  mobExpDropRate,
  mobItemDropRate,
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
          mobExpDropRate,
          mobItemDropRate,
        ),
      );
    },
    loop: true,
  });

  scene.m_mobEvents.push(timer);
}

export function removeAllMobEvent(scene) {
  while (scene.m_mobEvents.length > 0) {
    scene.m_mobEvents.at(-1).remove();
    scene.m_mobEvents.pop();
  }
}
