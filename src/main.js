import { Cache, Group } from "three";

import "./components/fullscreen.js";

import App from "./App/App.js";

import AnimationControls from "./components/AnimationControls.js";
import Background from "./components/Background.js";
import Environment from "./components/Environment.js";
import LightingSetup from "./components/Lighting.js";
import ScreenshotHandler from "./components/Screenshot.js";
import Grid from "./components/Grid.js";
import HTMLControl from "./HTMLControl.js";
import Info from "./components/Info.js";

import "./components/fileReader.js";
import exportGLTF from "./utilities/exportGLTF.js";

/* ******************************************************** */

Cache.enabled = true;

class Main {
  constructor(canvas) {
    const self = this;

    this.canvas = canvas;

    this.app = new App(this.canvas);

    // this.app.renderer.setClearColor( 0xf7f7f7, 1.0 );

    this.animationControls = new AnimationControls();

    // Put any per frame calculation here
    this.app.onUpdate = function () {
      // NB: use self inside this function

      self.animationControls.update(self.app.delta);
    };

    // put any per resize calculations here (throttled to once per 250ms)
    this.app.onWindowResize = function () {
      // NB: use self inside this function
    };

    this.loadedObjects = new Group();
    this.loadedMaterials = [];
    this.app.scene.add(this.loadedObjects);

    this.lighting = new LightingSetup(this.app);
    this.grid = new Grid(this.app);
    this.background = new Background(this.app);
    this.environment = new Environment(this.loadedMaterials);
    this.info = new Info(this.app, this.loadedObjects);

    this.app.scene.add(this.grid.helpers);

    this.app.initControls();

    this.screenshotHandler = new ScreenshotHandler(this.app);

    this.initReset();
    this.initExport();
  }

  addObjectToScene(object) {
    if (object === undefined) {
      console.error("Oops! An unspecified error occurred :(");
      return;
    }

    this.animationControls.initAnimation(object);

    this.loadedObjects.add(object);

    // fit camera to all loaded objects
    this.app.fitCameraToObject(this.loadedObjects, 0.9);

    this.app.play();

    this.info.update();

    this.loadedObjects.traverse((child) => {
      if (child.material !== undefined) {
        this.loadedMaterials.push(child.material);
      }
    });

    this.environment.default();
  }

  initExport() {
    HTMLControl.controls.exportGLTF.addEventListener("click", (e) => {
      e.preventDefault();

      exportGLTF(this.loadedObjects);
    });
  }

  initReset() {
    HTMLControl.reset.addEventListener("click", () => {
      while (this.loadedObjects.children.length > 0) {
        let child = this.loadedObjects.children[0];

        this.loadedObjects.remove(child);
        child = null;
      }

      this.loadedMaterials = [];

      this.animationControls.reset();
      this.lighting.reset();
      HTMLControl.setInitialState();
    });
  }
}

const main = new Main(HTMLControl.canvas);

export default main;
