import Arrow from "../effects/Arrow";
import Lightning from "../effects/Lightning";
import Shield from "../effects/Shield";
import Whip from "../effects/Whip";
import Fireball from "../effects/Fireball";
import Sword from "../effects/Sword";

export function addAttackEvent(scene, attackType, damage, scale, repeatGap) {
  switch (attackType) {
    case "arrow":
      const timerArrow = scene.time.addEvent({
        delay: repeatGap,
        callback: () => {
          doAttackOneSet(scene, attackType, damage, scale);
        },
        loop: true,
      });

      scene.m_attackEvents[attackType] = {
        timer: timerArrow,
        damage,
        scale,
        repeatGap,
      };

      break;
    case "whip":
      const timerWhip = scene.time.addEvent({
        delay: repeatGap,
        callback: () => {
          doAttackOneSet(scene, attackType, damage, scale);
        },
        loop: true,
      });
      scene.m_attackEvents[attackType] = {
        timer: timerWhip,
        damage,
        scale,
        repeatGap,
      };

      break;
    case "shield":
      const shield = new Shield(
        scene,
        [scene.m_player.x + 100, scene.m_player.y],
        damage,
        scale,
      );

      scene.m_attackEvents[attackType] = { object: shield, damage };

      break;
    case "sword":
      const timerSword = scene.time.addEvent({
        delay: repeatGap,
        callback: () => {
          doAttackOneSet(scene, attackType, damage, scale);
        },
        loop: true,
      });

      scene.m_attackEvents[attackType] = {
        timer: timerSword,
        damage,
        scale,
        repeatGap,
      };

      break;
    case "fireball":
      const timerFireball = scene.time.addEvent({
        delay: repeatGap,
        callback: () => {
          doAttackOneSet(scene, attackType, damage, scale);
        },
        loop: true,
      });

      scene.m_attackEvents[attackType] = {
        timer: timerFireball,
        damage,
        scale,
        repeatGap,
      };

      break;
    case "lightning":
      const timerLightning = scene.time.addEvent({
        delay: repeatGap,
        callback: () => {
          doAttackOneSet(scene, attackType, damage, scale);
        },
        loop: true,
      });

      scene.m_attackEvents[attackType] = {
        timer: timerLightning,
        damage,
        scale,
        repeatGap,
      };

      break;
  }
}

function doAttackOneSet(scene, attackType, damage, scale) {
  switch (attackType) {
    case "arrow":
      new Arrow(scene, [scene.m_player.x, scene.m_player.y], damage, scale);
      break;
    case "whip":
      const isHeadingLeft = scene.m_player.flipX;

      if (!isHeadingLeft) {
        new Whip(
          scene,
          [scene.m_player.x + 150, scene.m_player.y],
          isHeadingLeft,
          damage,
          scale,
        );

        scene.time.addEvent({
          delay: 200,
          callback: () => {
            new Whip(
              scene,
              [scene.m_player.x - 150, scene.m_player.y],
              !isHeadingLeft,
              damage,
              scale,
            );
          },
          loop: false,
        });
      } else {
        new Whip(
          scene,
          [scene.m_player.x - 150, scene.m_player.y],
          isHeadingLeft,
          damage,
          scale,
        );

        scene.time.addEvent({
          delay: 200,
          callback: () => {
            new Whip(
              scene,
              [scene.m_player.x + 150, scene.m_player.y],
              !isHeadingLeft,
              damage,
              scale,
            );
          },
          loop: false,
        });
      }

      break;
    case "sword":
      new Sword(scene, [scene.m_player.x, scene.m_player.y], damage, scale);
      break;
    case "fireball":
      new Fireball(scene, [scene.m_player.x, scene.m_player.y], damage, scale);
      break;
    case "lightning":
      let mobs = scene.m_mobs.getChildren();
      let randomMob = Math.floor(Math.random() * (mobs.length - 1));

      if (mobs.length === 0 || randomMob < 0 || !mobs[randomMob]) {
        break;
      }

      new Lightning(
        scene,
        [mobs[randomMob].x, mobs[randomMob].y],
        damage,
        scale,
      );

      mobs = scene.m_mobs.getChildren();
      randomMob = Math.floor(Math.random() * (mobs.length - 1));

      scene.time.addEvent({
        delay: 200,
        callback: () => {
          if (mobs.length === 0 || randomMob < 0 || !mobs[randomMob]) {
            return;
          }

          new Lightning(
            scene,
            [mobs[randomMob].x || 0, mobs[randomMob].y],
            damage,
            scale,
          );
        },
        loop: false,
      });

      break;
  }
}

export function removeAttack(scene, attackType) {
  scene.time.removeEvent(scene.m_attackEvents[attackType].timer);
}

export function setAttackDamage(scene, attackType, newDamage) {
  const scale = scene.m_attackEvents[attackType].scale;
  const repeatGap = scene.m_attackEvents[attackType].repeatGap;

  removeAttack(scene, attackType);
  addAttackEvent(scene, attackType, newDamage, scale, repeatGap);
}

export function setAttackScale(scene, attackType, newScale) {
  const damage = scene.m_attackEvents[attackType].damage;
  const repeatGap = scene.m_attackEvents[attackType].repeatGap;

  removeAttack(scene, attackType);
  addAttackEvent(scene, attackType, damage, newScale, repeatGap);
}

export function setAttackRepeatGap(scene, attackType, newRepeatGap) {
  const damage = scene.m_attackEvents[attackType].damage;
  const scale = scene.m_attackEvents[attackType].scale;

  removeAttack(scene, attackType);
  addAttackEvent(scene, attackType, damage, scale, newRepeatGap);
}
