import EventEmitter from "events";
import Experience from "../Experience.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;

    this.assets = assets;
    //console.log(assets);
    this.items = {};
    this.queue = this.assets.length;
    //loading counter
    this.loaded = 0;
    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    console.log("loading with gltf loader");
    this.loaders.gltfLoader = new GLTFLoader();
    console.log("loading with draco loader");
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }

  startLoading() {
    console.log("assets length", this.assets.length);
    for (const asset of this.assets) {
      if (asset.type === "glbModel") {
        console.log("loading this asset", asset);
        this.loaders.gltfLoader.load(asset.path, (file) => {
          console.log("this is gltf file ->", file);
          this.singleAssetLoaded(asset, file);
        });
        console.log("loaded glt file");
      }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;
    console.log("asset is loading");
    if (this.loaded === this.queue) {
      console.log("all assets are loaded");
      this.emit("ready");
      console.log("ready is emitted");
    }
  }
}
