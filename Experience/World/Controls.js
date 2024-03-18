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

    //Desktop---------------------------------------------------------------------
    mm.add("(min-width: 969px)", () => {
      this.room.scale.set(0.7, 0.7, 0.7);

      //first section-------------------------------------------------------------
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

      //second section--------------------------------------------------------
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

      //third section------------------------------------------------------------
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
          invalidateOnRefresh: true,
        },
      });
      this.thirdMoveTimeline.to(
        this.camera.orthographicCamera.scale,
        {
          x: 0.28,
          y: 0.28,
          z: 0.28,
        },
        "third"
      );
      this.thirdMoveTimeline.to(
        this.camera.orthographicCamera.position,
        {
          x: () => {
            return -this.sizes.width * 0.002;
          },
          y: () => {
            return -this.sizes.height * 0.004;
          },
        },
        "third"
      );
    });
    //tablet
    mm.add("(max-width: 968px)", () => {
      //resets
      this.room.scale.set(0.6, 0.6, 0.6);
      this.room.position.x = 0.25;

      //first section-------------------------------------------------------------
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
          invalidateOnRefresh: true,
        },
      });

      this.firstMoveTimeline.to(this.room.scale, {
        x: 0.7,
        y: 0.7,
        z: 0.7,
      });
      //second section------------------------------------------------------------
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
            return this.sizes.width * 0.001;
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
      //third section------------------------------------------------------------
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
          invalidateOnRefresh: true,
        },
      });
      this.thirdMoveTimeline.to(
        this.camera.orthographicCamera.scale,
        {
          x: 0.28,
          y: 0.28,
          z: 0.28,
        },
        "third"
      );
      this.thirdMoveTimeline.to(
        this.camera.orthographicCamera.position,
        {
          x: () => {
            return -this.sizes.width * 0.0007;
          },
          y: () => {
            return -this.sizes.height * 0.003;
          },
        },
        "third"
      );
    });

    //mobile----------------------------------------------------------------------
    mm.add("(max-width: 450px)", () => {
      //resets
      this.room.scale.set(0.45, 0.45, 0.45);
      this.room.position.x = 0.25;

      //first section-------------------------------------------------------------
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
          invalidateOnRefresh: true,
        },
      });

      this.firstMoveTimeline.to(this.room.scale, {
        x: 0.6,
        y: 0.6,
        z: 0.6,
      });
      //second section------------------------------------------------------------
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
            return this.sizes.width * 0.0018;
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
      //third section------------------------------------------------------------
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.1,
          invalidateOnRefresh: true,
        },
      });
      this.thirdMoveTimeline.to(
        this.camera.orthographicCamera.scale,
        {
          x: 0.28,
          y: 0.28,
          z: 0.28,
        },
        "third"
      );
      this.thirdMoveTimeline.to(
        this.camera.orthographicCamera.position,
        {
          x: () => {
            return -this.sizes.width * 0.0015;
          },
          y: () => {
            return -this.sizes.height * 0.0035;
          },
        },
        "third"
      );
    });
  }
  resize() {}

  update() {}
}
