import Experience from "../Experience";
import * as THREE from "three";
import { EventEmitter } from "events";
import Room from "./Room";
import Environment from "./Environment";
import Controls from "./Controls";
import Floor from "./Floor";

export default class World extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;

    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.room = new Room();
      console.log("created room");
      this.floor = new Floor();
      this.emit("worldIsReady");
      // this.controls = new Controls();
    });
  }

  resize() {}

  update() {
    if (this.controls) {
      this.controls.update();
    }
    if (this.room) {
      this.room.update();
    }
  }
}
