import { Player } from "./Player";

export class UserManager {
  private scene: Phaser.Scene;
  private users: Map<string, Player> = new Map();

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  addUser(username: string, characterName: string, x: number, y: number) {
    this.createPlayerAnimations(username, characterName);
    const player = new Player(this.scene, x, y, characterName, username);

    this.users.set(username, player);
    return player;
  }

  removeUser(username: string) {
    const player = this.users.get(username);
    if (player) {
      this.removePlayerAnimations(username, player.characterName);
      player.destroy();
      this.users.delete(username);
    }
  }

  updateUsers(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    this.users.forEach((player) => player.update(cursors));
  }

  private createPlayerAnimations(username: string, characterName: string) {
    const animationsConfig = [
      { key: "walk", start: 6, end: 11 },
      { key: "idle", start: 0, end: 3 },
      { key: "run", start: 30, end: 35 },
    ];

    animationsConfig.forEach((config) => {
      const animationKey = `${username}_${characterName}_${config.key}`;
      if (!this.scene.anims.exists(animationKey)) {
        this.scene.anims.create({
          key: animationKey,
          frames: this.scene.anims.generateFrameNumbers(characterName, {
            start: config.start,
            end: config.end,
          }),
          frameRate: 10,
          repeat: -1,
        });
      }
    });
  }

  private removePlayerAnimations(username: string, characterName: string) {
    const animationKeys = ["walk", "idle", "run"];
    animationKeys.forEach((key) => {
      const animationKey = `${username}_${characterName}_${key}`;
      if (this.scene.anims.exists(animationKey)) {
        this.scene.anims.remove(animationKey);
      }
    });
  }
}
