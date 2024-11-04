import { UserManager } from "../player/UserManager";
import Phaser from "phaser";

export class World extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  userManager!: UserManager;

  preload() {
    this.load.setBaseURL("/assets");

    // Load character spritesheets
    const characters = [
      "goat_black",
      "goat_brown",
      "goat_gold",
      "goat_red",
      "goat_white",
      "bird",
      "frog",
      "pig",
      "sheep",
    ];
    characters.forEach((name) => {
      this.load.spritesheet(name, `/${name}.png`, {
        frameWidth: 24,
        frameHeight: 24,
      });
    });
  }

  create() {
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    this.userManager = new UserManager(this);
    this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);

    // Create some initial users
    this.userManager.addUser("John", "bird", 100, 100);
    this.userManager.addUser("Jane", "pig", 150, 100);
  }

  update() {
    this.userManager.updateUsers(this.cursors);
  }
}
