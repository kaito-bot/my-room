import Experience from "./Experience.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.canvas = this.experience.canvas;

    // cameras
    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();

    //console.log(this.experience, this.scene, this.sizes);
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );

    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.x = 11;
    this.perspectiveCamera.position.y = 5;
    this.perspectiveCamera.position.z = 23;
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -10,
      10
    );

    this.scene.add(this.orthographicCamera);

    this.helper = new THREE.CameraHelper(this.orthographicCamera);
    this.scene.add(this.helper);

    //grid helper
    const size = 20;
    const divisions = 20;
    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);
    //axes helper
    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
  }

  resize() {
    // updation of perspective camera on resize
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    // updation of orthographic camera on resize
    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    //console.log(this.perspectiveCamera.position);
    this.controls.update();
    this.helper.matrixWorldNeedsUpdate = true;
    this.helper.update();
    //console.log(this.orthographicCamera.position);
    this.helper.position.copy(this.orthographicCamera.position);
    this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}
