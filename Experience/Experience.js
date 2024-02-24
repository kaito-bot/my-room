import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Renderer from "./Renderer";
import Camera from "./Camera";

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
  }
}
