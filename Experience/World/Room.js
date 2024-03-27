import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.roomChildren = {};
    //console.log(this.actualRoom);

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.onMouseMove();
  }

  //to enable shadows on every object present in the model
  setModel() {
    this.child1 = this.actualRoom.children[0].children[0].children;
    // console.log("model things", this.child1);
    this.child1.forEach((child) => {
      if (child.name === "directional_light") {
        child.isDirectionalLight = false;
      }
      child.castShadow = true;
      child.receiveShadow = true;
      //console.log(child);
      if (child.isObject3D) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
          if (groupChild.isObject3D) {
            groupChild.children.forEach((groupgroupChild) => {
              groupgroupChild.castShadow = true;
              groupgroupChild.receiveShadow = true;
            });
          }
        });
      }

      child.scale.set(0, 0, 0);
      if (child.name === "preloader_cube") {
        child.scale.set(0.7, 0.7, 0.7);
        child.position.set(0, 20, 0);
        child.rotation.y = Math.PI / 4;
      }
      // created key-value pairs of room objects
      this.roomChildren[child.name.toLowerCase()] = child;
    });
    // console.log("roomChildren", this.roomChildren);
    this.actualRoom.scale.set(0.75, 0.75, 0.75);
    this.scene.add(this.actualRoom);
  }

  //model's rotation movement along x-axis
  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    this.actualRoom.rotation.y = this.lerp.current;
  }
}
