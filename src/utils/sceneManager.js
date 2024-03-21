export function loseGame(playingScene) {
  playingScene.scene.start("gameOverScene", {
    killCount: playingScene.m_statusBar.m_killCount,
    level: playingScene.m_statusBar.m_level,
    secondElapsed: playingScene.m_secondElapsed,
  });
}
