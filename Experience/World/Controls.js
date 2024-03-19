import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";
import ASScroll from "@ashthornton/asscroll";
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
    document.querySelector(".page").style.overflow = "visible";
    this.setSmoothScroll();
    this.setScrollTrigger();
  }

  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      // ease: 0.05,
      disableRaf: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        ),
      });
    });
    return asscroll;
  }
  setSmoothScroll() {
    this.asscroll = this.setupASScroll();
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

    mm.add("(min-width:20px)", () => {
      this.sections = document.querySelectorAll(".section");

      this.sections.forEach((section) => {
        this.progressWrapper = section.querySelector(".progress-wrapper");
        this.progressBar = section.querySelector(".progress-bar");

        if (section.classList.contains("right")) {
          GSAP.to(section, {
            borderTopLeftRadius: 10,
            scrollTrigger: {
              trigger: section,
              markers: true,
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
            },
          });
          GSAP.to(section, {
            borderBottomLeftRadius: 200,
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        } else {
          GSAP.to(section, {
            borderTopRightRadius: 10,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
            },
          });
          GSAP.to(section, {
            borderBottomRightRadius: 200,
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }

        GSAP.from(this.progressBar, {
          scaleY: 0,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
            pin: this.progressWrapper,
            pinSpacing: false,
          },
        });
      });
    });
  }
  resize() {}

  update() {}
}
