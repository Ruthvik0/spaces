export class Player extends Phaser.Physics.Arcade.Sprite {
  username: string;
  characterName: string;
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
    this.characterName = characterName;

    // Display username text above the player
    this.usernameText = scene.add
      .text(x, y - 50, username, {
        font: "16px Arial",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    scene.physics.world.enable(this);
    this.setScale(3);
    this.setCollideWorldBounds(true);

    // Play unique idle animation on creation
    this.play(`${username}_${characterName}_idle`);

    // Add the player to the scene
    scene.add.existing(this);
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    this.setVelocity(0); // Reset velocity
    const speed = cursors.shift.isDown ? 320 : 160;
    const animationPrefix = `${this.username}_${this.characterName}_`;

    if (cursors.left.isDown) {
      this.setVelocityX(-speed);
      this.setFlipX(true);
      this.play(
        animationPrefix + (cursors.shift.isDown ? "run" : "walk"),
        true
      );
    } else if (cursors.right.isDown) {
      this.setVelocityX(speed);
      this.setFlipX(false);
      this.play(
        animationPrefix + (cursors.shift.isDown ? "run" : "walk"),
        true
      );
    } else if (cursors.up.isDown) {
      this.setVelocityY(-speed);
      this.play(
        animationPrefix + (cursors.shift.isDown ? "run" : "walk"),
        true
      );
    } else if (cursors.down.isDown) {
      this.setVelocityY(speed);
      this.play(
        animationPrefix + (cursors.shift.isDown ? "run" : "walk"),
        true
      );
    } else {
      this.play(animationPrefix + "idle", true);
    }

    // Update the username text position to follow the player
    this.usernameText.setPosition(this.x, this.y - 50);
  }
}
