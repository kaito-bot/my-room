import { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap";

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
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
    console.log(this.roomChildren);
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.firstIntroTimeline = new GSAP.timeline();
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
            onComplete: resolve,
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
            onComplete: resolve,
          });
      }
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondIntroTimeline = new GSAP.timeline();

      this.secondIntroTimeline
        .to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.out",
          },
          "secondIntro"
        )
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

        .to(this.roomChildren.floor_items.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(0.8)",
          duration: 0.5,
        })
        .to(this.roomChildren.posters.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(1)",
          duration: 0.5,
        })
        .to(this.roomChildren.small_table.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.board.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(1)",
          duration: 0.5,
        })

        .to(this.roomChildren.table_stands.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2)",
          duration: 0.5,
        })

        .to(this.roomChildren.desk_items.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
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
    await this.secondIntro();
  }
}
