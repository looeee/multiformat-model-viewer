import { GridHelper, AxesHelper, Group } from "three";
import HTMLControl from "../HTMLControl.js";

export default class Grid {
  constructor(app) {
    this.app = app;

    this.size = 0;

    this.gridHelper = new GridHelper();
    this.axesHelper = new AxesHelper();

    this.helpers = new Group();

    this.helpers.add(this.gridHelper, this.axesHelper);
    this.helpers.visible = false;

    this.initButton();
  }

  setSize() {
    this.size = Math.floor(this.app.camera.far * 0.5);
    if (this.size % 2 !== 0) this.size++;
    this.updateGrid();
    this.updateAxes();
  }

  updateGrid() {
    const gridHelper = new GridHelper(this.size, 10);
    this.helpers.remove(this.gridHelper);
    this.gridHelper = gridHelper;
    this.helpers.add(this.gridHelper);
  }

  updateAxes() {
    const axesHelper = new AxesHelper(this.size / 2);
    this.helpers.remove(this.axesHelper);
    this.axesHelper = axesHelper;
    this.helpers.add(this.axesHelper);
  }

  initButton() {
    HTMLControl.controls.toggleGrid.addEventListener("click", (e) => {
      e.preventDefault();

      this.setSize();
      this.helpers.visible = !this.helpers.visible;
    });
  }
}
