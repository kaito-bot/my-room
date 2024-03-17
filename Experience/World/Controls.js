import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.sizes = this.experience.sizes;
    this.room = this.experience.world.room.actualRoom;

    GSAP.registerPlugin(ScrollTrigger);

    this.setScrollTrigger();
  }

  setScrollTrigger() {
    // create
    let mm = GSAP.matchMedia();

    //Desktop
    mm.add("(min-width: 969px)", () => {
      //first section
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
          invalidateOnRefresh: true,
        },
      });

      this.firstMoveTimeline.to(this.room.position, {
        x: () => {
          return -this.sizes.width * 0.00185;
        },
      });

      //second section
      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25,
          invalidateOnRefresh: true,
        },
      });

      this.secondMoveTimeline.to(
        this.camera.orthographicCamera.position,
        {
          x: () => {
            return -this.sizes.width * 0.002;
          },
          y: () => {
            return -this.sizes.height * 0.003;
          },
          z: () => {
            return -this.sizes.height * 0.011;
          },
        },
        "play at same time"
      );

      this.secondMoveTimeline.to(
        this.camera.orthographicCamera.scale,
        {
          x: 0.32,
          y: 0.32,
          z: 0.32,
        },
        "play at same time"
      );

      //third section
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
          invalidateOnRefresh: true,
        },
      });

      this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
        x: -2.5,
        y: -3.5,
      });
    });

    mm.add("(max-width: 968px)", () => {
      console.log("fired mobile");
    });
  }
  resize() {}

  update() {}
}
