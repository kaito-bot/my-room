import * as THREE from "three";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import assets from "./Utils/Assets";
import Resources from "./Utils/Resources";

import Renderer from "./Renderer";
import Camera from "./Camera";

import Preloader from "./Preloader";
import World from "./World/World";
import Controls from "./World/Controls";

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.time = new Time();
    this.resources = new Resources(assets);
    this.world = new World();
    this.preloader = new Preloader();

    this.preloader.on("enable-controls", () => {
      this.controls = new Controls();
    });

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("update", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.preloader.update();
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }
}
