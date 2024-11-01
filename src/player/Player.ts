import Phaser from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
  username: string;
  usernameText: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    characterName: string,
    username: string
  ) {
    super(scene, x, y, characterName);
    this.username = username;
    this.usernameText = scene.add
      .text(x, y - 50, username, {
        font: "16px Arial",
        color: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5);

    scene.physics.world.enable(this);
    this.setScale(3);
    this.setCollideWorldBounds(true);
    this.play("idle");

    // Add the player to the scene
    scene.add.existing(this);
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    // Reset velocity
    this.setVelocityX(0);
    this.setVelocityY(0);

    const speed = cursors.shift.isDown ? 320 : 160;

    if (cursors.left.isDown) {
      this.setVelocityX(-speed);
      this.setFlipX(true);
      this.play(cursors.shift.isDown ? "run" : "walk", true);
    } else if (cursors.right.isDown) {
      this.setVelocityX(speed);
      this.setFlipX(false);
      this.play(cursors.shift.isDown ? "run" : "walk", true);
    } else if (cursors.up.isDown) {
      this.setVelocityY(-speed);
      this.play(cursors.shift.isDown ? "run" : "walk", true);
    } else if (cursors.down.isDown) {
      this.setVelocityY(speed);
      this.play(cursors.shift.isDown ? "run" : "walk", true);
    } else {
      this.play("idle", true);
    }

    // Update username text position
    this.usernameText.setPosition(this.x, this.y - 50);
  }
}
