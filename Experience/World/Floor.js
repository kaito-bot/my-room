import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
  }

  //0xa1aed5
  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xd5a1a1,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);

    this.scene.add(this.plane);
    this.plane.rotation.x = -Math.PI / 2;
    this.plane.position.y = -0.1;
    this.plane.receiveShadow = true;
  }
  resize() {}

  update() {}
}
