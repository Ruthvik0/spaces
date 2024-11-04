import Phaser from "phaser";
import { World } from "./scenes/World";

const config = {
  type: Phaser.AUTO,
  width: 800, // Set to your desired canvas width
  height: 600, // Set to your desired canvas height
  physics: {
    default: "arcade",
    arcade: {
      debug: true, // Set to true temporarily to visualize boundaries
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [World],
};

new Phaser.Game(config);
