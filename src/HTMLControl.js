const canvas = document.querySelector("canvas");
const container = document.querySelector("body");
const reset = document.querySelector("#reset");
const exportBtn = document.querySelector("#export");
const exportAnims = document.querySelector("#export-anims");
const fullscreenButton = document.querySelector("#fullscreen-button");

const modelInfo = {
  bbDepth: document.querySelector("#bb-depth"),
  bbWidth: document.querySelector("#bb-width"),
  bbHeight: document.querySelector("#bb-height"),
  faces: document.querySelector("#faces"),
  vertices: document.querySelector("#vertices"),
  infoBox: document.querySelector(".model-info"),
};

const animation = {
  slider: document.querySelector("#animation-slider"),
  playButton: document.querySelector("#play-button"),
  pauseButton: document.querySelector("#pause-button"),
  playbackControl: document.querySelector("#playback-control"),
  clipsSelection: document.querySelector("#animation-clips"),
  controls: document.querySelector("#animation-controls"),
};

const fileUpload = {
  input: document.querySelector("#file-upload-input"),
  button: document.querySelector("#file-upload-button"),
  form: document.querySelector("#file-upload-form"),
};

const lighting = {
  slider: document.querySelector("#lighting-slider"),
  symbol: document.querySelector("#light-symbol"),
};

const loading = {
  bar: document.querySelector("#loading-bar"),
  overlay: document.querySelector("#loading-overlay"),
  progress: document.querySelector("#progress"),
};

const screenshot = {
  button: document.querySelector("#screenshot-button"),
};

const controls = {
  links: document.querySelector(".controls").querySelectorAll("span"),
  toggleGrid: document.querySelector("#toggle-grid"),
  toggleInfo: document.querySelector("#toggle-info"),
  toggleBackground: document.querySelector("#toggle-background"),
  toggleEnvironment: document.querySelector("#toggle-environment"),
  sliders: document.querySelectorAll("input[type=range]"),
  exampleDuck: document.querySelector("#example-duck"),
  exportGLTF: document.querySelector("#export-gltf"),
};

export default class HTMLControl {
  static setInitialState() {
    loading.overlay.classList.remove("hide");
    fileUpload.form.classList.remove("hide");
    loading.bar.classList.add("hide");
    loading.progress.style.width = 0;

    animation.controls.classList.add("hide");
    animation.playButton.classList.add("hide");
    animation.pauseButton.classList.remove("hide");

    // reset animations options
    const base = animation.clipsSelection.children[0];
    animation.clipsSelection.innerHTML = "";
    animation.clipsSelection.appendChild(base);
  }

  static setOnLoadStartState() {
    fileUpload.form.classList.add("hide");
    loading.bar.classList.remove("hide");
  }

  static setOnLoadEndState() {
    loading.overlay.classList.add("hide");
  }
}

HTMLControl.canvas = canvas;
HTMLControl.container = container;
HTMLControl.reset = reset;
HTMLControl.fullscreenButton = fullscreenButton;
HTMLControl.animation = animation;
HTMLControl.fileUpload = fileUpload;
HTMLControl.lighting = lighting;
HTMLControl.loading = loading;
HTMLControl.screenshot = screenshot;
HTMLControl.controls = controls;
HTMLControl.export = exportBtn;
HTMLControl.exportAnims = exportAnims;
HTMLControl.modelInfo = modelInfo;
