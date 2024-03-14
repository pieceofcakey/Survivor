import Arrow from "../effects/Arrow";

export function addAttackEvent(
  scene,
  attackType,
  attackDamage,
  attackScale,
  repeatGap,
) {
  switch (attackType) {
    case "arrow":
      const timerArrow = scene.time.addEvent({
        delay: repeatGap,
        callback: () => {
          shootArrow(scene, attackDamage, attackScale);
        },
        loop: true,
      });

      scene.m_attackEvents.arrow = timerArrow;

      break;
  }
}

function shootArrow(scene, damage, scale) {
  new Arrow(scene, [scene.m_player.x, scene.m_player.y], damage, scale);
}

export function removeAttack(scene, attackType) {
  scene.time.removeEvent(scene.m_attackEvents[attackType]);
}

export function setAttackScale(scene, attackType, scale) {
  const repeatGap = scene.m_attackEvents[attackType].delay;
  removeAttack(scene, attackType);
  addAttackEvent(scene, attackType, 10, scale, repeatGap);
}

export function setArrowDuration(duration) {
  Arrow.DURATION = duration;
}
