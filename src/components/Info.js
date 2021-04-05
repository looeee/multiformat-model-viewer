import { Box3 } from "three";

import HTMLControl from "../HTMLControl.js";

export default class Info {
  constructor(app, objects) {
    this.renderer = app.renderer;
    this.objects = objects;
    this.modelInfo = this.boundingBox = new Box3();

    this.initButton();
  }

  update() {
    this.boundingBox.expandByObject(this.objects);

    const depth = Math.abs(this.boundingBox.max.z - this.boundingBox.min.z);
    const width = Math.abs(this.boundingBox.max.x - this.boundingBox.min.x);
    const height = Math.abs(this.boundingBox.max.y - this.boundingBox.min.y);

    HTMLControl.modelInfo.bbDepth.innerHTML = depth.toPrecision(4);
    HTMLControl.modelInfo.bbWidth.innerHTML = width.toPrecision(4);
    HTMLControl.modelInfo.bbHeight.innerHTML = height.toPrecision(4);

    HTMLControl.modelInfo.faces.innerHTML = this.renderer.info.render.faces;
    HTMLControl.modelInfo.vertices.innerHTML = this.renderer.info.render.vertices;
  }

  initButton() {
    HTMLControl.controls.toggleInfo.addEventListener("click", (e) => {
      e.preventDefault();

      HTMLControl.modelInfo.infoBox.classList.toggle("hide");
    });
  }
}
