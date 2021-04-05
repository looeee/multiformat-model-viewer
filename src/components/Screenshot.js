// import throttle from "lodash-es";

import HTMLControl from "../HTMLControl.js";

export default class Screenshot {
  constructor(app) {
    this.camera = app.camera;
    this.scene = app.scene;
    this.renderer = app.renderer;

    this.initButton();
  }

  initButton() {
    HTMLControl.screenshot.button.addEventListener("click", (e) => {
      e.preventDefault();

      this.takeScreenshot();
    });
  }

  // take a screenshot at a given width and height
  // and return an img element
  takeScreenshot() {
    // render scene
    this.renderer.render(this.scene, this.camera, null, false);

    const dataURL = this.renderer.domElement.toDataURL("image/png");

    const iframe = `
      <iframe
        src="${dataURL}"
        frameborder="0"
        style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;"
        allowfullscreen>
      </iframe>`;

    const win = window.open();
    win.document.open();
    win.document.write(iframe);
    win.document.close();
  }
}
