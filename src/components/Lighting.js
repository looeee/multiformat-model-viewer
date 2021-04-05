// import throttle from "lodash-es";

import { AmbientLight, DirectionalLight, PointLight } from "three";

import HTMLControl from "../HTMLControl.js";

export default class Lighting {
  constructor(app) {
    this.app = app;

    this.initLights();

    this.initSlider();

    this.initialStrength = this.light.intensity;

    HTMLControl.lighting.slider.value = String(this.light.intensity);
  }

  initLights() {
    const ambientLight = new AmbientLight(0xffffff, 0.3);
    this.app.scene.add(ambientLight);

    // const backLight = new DirectionalLight( 0xffffff, 0.325 );
    // backLight.position.set( 2.6, 1, 3 );

    // const keyLight = new DirectionalLight( 0xffffff, 0.475 );
    // keyLight.position.set( -2, -1, 0 );

    // this.app.scene.add( backLight, keyLight );

    // this.light = new DirectionalLight( 0xffffff, 1.2 );
    this.light = new PointLight(0xffffff, 1.2);

    this.app.camera.add(this.light);
    this.app.scene.add(this.app.camera);
  }

  initSlider() {
    this.sliderInputEvent = (e) => {
      e.preventDefault();
      this.light.intensity = HTMLControl.lighting.slider.value;
    };

    HTMLControl.lighting.slider.addEventListener(
      "input",
      this.sliderInputEvent,
      false
    );

    this.symbolClickEvent = (e) => {
      e.preventDefault();
      this.reset();
    };

    HTMLControl.lighting.symbol.addEventListener(
      "click",
      this.symbolClickEvent,
      false
    );
  }

  reset() {
    this.light.intensity = this.initialStrength;
    HTMLControl.lighting.slider.value = String(this.light.intensity);

    // HTMLControl.lighting.slider.removeEventListener( 'input', this.sliderInputEvent, false );
    // HTMLControl.lighting.symbol.removeEventListener( 'click', this.symbolClickEvent, false );
  }
}
