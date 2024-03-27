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

    // console.log("loading scene....");
    this.scene = new THREE.Scene();
    //console.log("loaded scene.....Now loading sizes");
    this.sizes = new Sizes();
    // console.log("loaded sizes.....Now loading camera");
    this.camera = new Camera();
    //console.log("loaded camera.....Now loading renderer");
    this.renderer = new Renderer();
    //console.log("loaded renderer.....Now loading time");
    this.time = new Time();
    // console.log("loaded time.....Now loading resources");
    this.resources = new Resources(assets);
    // console.log("loaded resources.....Now loading world");
    this.world = new World();
    //console.log("loaded world.....Now loading preloader");
    this.preloader = new Preloader();
    //console.log("loaded preloader.... now ready");


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
