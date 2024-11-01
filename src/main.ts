import Phaser from "phaser";
import { World } from "./scenes/World";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
  },
  scene: World,
};

new Phaser.Game(config);
