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
    //console.log(this.actualRoom);

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.onMouseMove();
  }
  setModel() {
    this.child1 = this.actualRoom.children[0].children[0].children;
    //console.log(this.child1);
    this.child1.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child.isObject3D) {
        console.log("it's running");
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }
    });
    this.actualRoom.scale.set(0.75, 0.75, 0.75);
    //this.actualRoom.rotation.y = -Math.PI / 2;
    this.scene.add(this.actualRoom);
  }

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
