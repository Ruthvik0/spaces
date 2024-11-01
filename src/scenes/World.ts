import Phaser from "phaser";
import { Player } from "../player/Player"; // Adjust import path as necessary

interface User {
  username: string;
  characterName: string; // Include characterName in the User interface
  player: Player; // Reference to the Player instance
}

export class World extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  users: User[] = []; // Array to store all players

  preload() {
    this.load.setBaseURL("/assets");
    const spritesheetProperties = {
      frameWidth: 24,
      frameHeight: 24,
      startFrame: 0,
    };

    const goatTypes: string[] = ["black", "brown", "gold", "red", "white"];
    goatTypes.forEach((goatType) => {
      this.load.spritesheet(
        `${goatType}_goat`,
        `/goat/${goatType}.png`,
        spritesheetProperties
      );
    });

    this.load.spritesheet("bird", "bird.png", spritesheetProperties);
    this.load.spritesheet("frog", "frog.png", spritesheetProperties);
    this.load.spritesheet("pig", "pig.png", spritesheetProperties);
    this.load.spritesheet("sheep", "sheep.png", spritesheetProperties);
  }

  create() {
    const ruthvik: User = {
      username: "John",
      characterName: "bird", // Added characterName
      player: new Player(
        this,
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "bird",
        "John"
      ),
    };
    this.users.push(ruthvik);

    const anotherUser: User = {
      username: "Jane",
      characterName: "pig", // Added characterName
      player: new Player(
        this,
        this.cameras.main.width / 2 + 50,
        this.cameras.main.height / 2,
        "pig",
        "Jane"
      ),
    };
    this.users.push(anotherUser);

    // Create animations for all unique character types in users array
    const characterNames = [
      ...new Set(this.users.map((user) => user.characterName)),
    ];
    this.createAnimations(characterNames);

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  }

  createAnimations(characterNames: string[]) {
    const animationsConfig = [
      { AnimationName: "walk", FrameStart: 6, FrameEnd: 11 },
      { AnimationName: "idle", FrameStart: 0, FrameEnd: 3 },
      { AnimationName: "hurt", FrameStart: 12, FrameEnd: 15 },
      { AnimationName: "kick", FrameStart: 18, FrameEnd: 20 },
      { AnimationName: "run", FrameStart: 30, FrameEnd: 35 },
    ];

    characterNames.forEach((character) => {
      animationsConfig.forEach((config) => {
        this.anims.create({
          key: config.AnimationName, // Unique key for each character's animation
          frames: this.anims.generateFrameNumbers(character, {
            start: config.FrameStart,
            end: config.FrameEnd,
            first: 0,
          }),
          frameRate: 10,
          repeat: -1,
        });
      });
    });
  }

  update() {
    this.users.forEach((user) => {
      user.player.update(this.cursors);
    });
  }
}
