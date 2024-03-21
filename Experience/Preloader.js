import { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import divToSpan from "./Utils/divToSpan";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;
    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });

    this.world.on("worldIsReady", () => {
      this.setAssets();
      this.playFirstIntro();
    });
  }
  setAssets() {
    divToSpan(document.querySelector(".intro-text"));
    divToSpan(document.querySelector(".hero-main-title"));
    divToSpan(document.querySelector(".hero-main-description"));
    divToSpan(document.querySelector(".hero-second-title"));
    divToSpan(document.querySelector(".hero-second-subtitle"));
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
    console.log(this.roomChildren);
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.firstIntroTimeline = new GSAP.timeline();
      this.firstIntroTimeline.set(".animate-it", {
        y: 0,
        yPercent: 100,
      });
      this.firstIntroTimeline.to(".preloader", {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          document.querySelector(".preloader").classList.add(".hidden");
        },
      });
      if (this.device === "desktop") {
        this.firstIntroTimeline
          .to(this.roomChildren.preloader_cube.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            x: -1,
            ease: "power1.out",
            duration: 0.7,
          });
      } else {
        this.firstIntroTimeline
          .to(this.roomChildren.preloader_cube.scale, {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            z: -1,
            ease: "power1.out",
            duration: 0.7,
          });
      }
      this.firstIntroTimeline
        .to(".intro-text .animate-it", {
          yPercent: 0,
          stagger: 0.07,
          ease: "back.out(1.2)",
          duration: 0.2,
          onComplete: resolve,
        })
        .to(".arrow-svg-wrapper", {
          opacity: 1,
          onComplete: resolve,
        });
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondIntroTimeline = new GSAP.timeline();

      this.secondIntroTimeline
        .to(
          ".intro-text .animate-it",
          {
            yPercent: 100,
            stagger: 0.07,
            ease: "back.in(1.7)",
            duration: 0.2,
          },
          "fadeout"
        )
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 0,
          },
          "fadeout"
        );
      if (this.device === "desktop") {
        this.secondIntroTimeline.to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.out",
          },
          "secondIntro"
        );
      } else {
        this.secondIntroTimeline.to(
          this.room.position,
          {
            x: 0.25,
            y: 0,
            z: 0,
            ease: "power1.out",
          },
          "secondIntro"
        );
      }

      this.secondIntroTimeline
        .to(
          this.roomChildren.preloader_cube.rotation,
          {
            y: 2 * Math.PI + Math.PI / 4,
          },
          "secondIntro"
        )
        .to(
          this.roomChildren.preloader_cube.scale,
          { x: 5, y: 5, z: 5 },
          "secondIntro"
        )
        .to(this.camera.orthographicCamera.position, { y: 4.7 }, "secondIntro")
        .to(
          this.roomChildren.preloader_cube.position,
          {
            x: 0,
            y: 250,
            z: 1,
          },
          "secondIntro"
        )
        .set(this.roomChildren.walls.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .to(this.roomChildren.preloader_cube.scale, { x: 0, y: 0, z: 0 })
        .to(
          ".hero-main-title .animate-it",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.2)",
          },
          "hero-text"
        )
        .to(
          ".hero-main-description .animate-it",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.2)",
          },
          "hero-text"
        )
        .to(
          ".hero-second-title .animate-it",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.2)",
          },
          "hero-text"
        )
        .to(
          ".hero-second-subtitle .animate-it",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.2)",
          },
          "hero-text"
        )

        .to(
          this.roomChildren.floor_items.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(0.8)",
            duration: 0.5,
          },
          ">-0.8"
        )
        .to(
          this.roomChildren.posters.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1)",
            duration: 0.5,
          },
          ">-0.6"
        )
        .to(
          this.roomChildren.small_table.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.4"
        )
        .to(
          this.roomChildren.board.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.5)",
            duration: 0.5,
          },
          ">-0.3"
        )

        .to(
          this.roomChildren.table_stands.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2)",
            duration: 0.5,
          },
          ">-0.2"
        )

        .to(
          this.roomChildren.desk_items.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.1"
        )
        .to(this.roomChildren.laptop.scale, {
          x: 0.5,
          y: 0.5,
          z: 0.5,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.chair.scale, {
          x: 1.5,
          y: 1.5,
          z: 1.5,
          ease: "back.out(2.2)",
          duration: 0.5,
          onComplete: resolve,
        })
        .to(".arrow-svg-wrapper", {
          opacity: 1,
        });
    });
  }
  onScroll(e) {
    if (e.deltaY > 0) {
      console.log("added event");
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onTouch(e) {
    this.initialY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initialY - currentY;
    if (difference > 0) {
      console.log("swiped up");
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }
  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
  }

  async playFirstIntro() {
    await this.firstIntro();
    this.moveFlag = true;
    console.log("continuing");
    //desktop view
    this.scrollOnceEvent = this.onScroll.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    //for mobile view
    this.touchStart = this.onTouch.bind(this);
    window.addEventListener("touchstart", this.touchStart);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("touchmove", this.touchMove);
  }

  async playSecondIntro() {
    this.moveFlag = false;
    this.scaleFlag = true;
    await this.secondIntro();
    this.emit("enable-controls");
    this.scaleFlag = false;
  }

  move() {
    if (this.device === "desktop") {
      this.room.position.set(-1, 0, 0);
    } else {
      this.room.position.set(0, 0, -1);
    }
  }

  scale() {
    if (this.device === "desktop") {
      this.room.scale.set(0.7, 0.7, 0.7);
    } else {
      this.room.scale.set(0.45, 0.45, 0.45);
    }
  }

  update() {
    if (this.moveFlag) {
      this.move();
    }
    if (this.scaleFlag) {
      this.scale();
    }
  }
}
