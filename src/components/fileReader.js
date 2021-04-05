import loadingManager from "./loadingManager.js";
import OnLoadCallbacks from "./OnLoadCallbacks.js";
import HTMLControl from "../HTMLControl.js";

import readFileAs from "../utilities/promiseFileReader.js";

// Check support for the File API support
const checkForFileAPI = () => {
  if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    console.error(
      "This loader requires the File API. Please upgrade your browser"
    );
  }
};

checkForFileAPI();

const isAsset = (type) =>
  new RegExp("(png|jpg|jpeg|gif|bmp|dds|tga|bin|vert|frag|txt|mtl)$").test(
    type
  );

const isModel = (type) =>
  new RegExp("(json|js|fbx|gltf|glb|dae|obj)$").test(type);

const isValid = (type) => isAsset(type) || isModel(type);

let models = [];
let assets = {};
let promises = [];

const loadFile = (details) => {
  const file = details[0];
  const type = details[1];
  const originalFile = details[2];

  switch (type) {
    case "fbx":
      loadingManager.onStart();
      OnLoadCallbacks.onFBXLoad(file);
      break;
    case "gltf":
    case "glb":
      loadingManager.onStart();
      OnLoadCallbacks.onGLTFLoad(file);
      break;
    case "obj":
      loadingManager.onStart();
      OnLoadCallbacks.onMTLLoad(
        assets[originalFile.name.replace(".obj", ".mtl")]
      )
        .then((materials) => {
          OnLoadCallbacks.onOBJLoad(file, materials);
        })
        .catch((err) => console.error(err));
      break;
    case "dae":
      loadingManager.onStart();
      OnLoadCallbacks.onDAELoad(file);
      break;
    case "json":
    case "js":
      loadingManager.onStart();
      OnLoadCallbacks.onJSONLoad(file, originalFile);
      break;
    default:
      console.error(
        "Unsupported file type " +
          type +
          " - please load one of the supported model formats."
      );
  }
};

loadingManager.setURLModifier((url) => {
  if (url[url.length - 3] === "." || url[url.length - 4] === ".") {
    const type = url.split(".").pop().toLowerCase();

    if (isAsset(type)) {
      url = url.replace("data:application/", "");
      url = url.split("/");
      url = url[url.length - 1];
    }
  }

  if (assets[url] === undefined) return url;
  return assets[url];
});

const processFile = (file) => {
  const type = file.name.split(".").pop().toLowerCase();

  if (!isValid(type)) return;

  if (type === "js" || type === "json") {
    const promise = readFileAs(file, "Text")
      .then((data) => {
        models.push([data, type, file]);
      })
      .catch((err) => console.error(err));

    promises.push(promise);
  } else {
    const promise = readFileAs(file, "DataURL")
      .then((data) => {
        if (isModel(type)) {
          if (type === "obj") models.push([data, type, file]);
          else models.push([data, type]);
        } else if (isAsset(type)) {
          assets[file.name] = data;
        }
      })
      .catch((err) => console.error(err));

    promises.push(promise);
  }
};

const processFiles = (files) => {
  models = [];
  assets = {};
  promises = [];

  for (let i = 0; i < files.length; i++) {
    processFile(files[i]);
  }

  Promise.all(promises)
    .then(() => {
      models.forEach((model) => loadFile(model));
    })
    .catch((err) => console.error(err));
};

const form = HTMLControl.fileUpload.form;
const button = HTMLControl.fileUpload.button;

button.addEventListener(
  "click",
  (e) => {
    e.preventDefault();
    HTMLControl.fileUpload.input.click();
  },
  false
);

HTMLControl.fileUpload.input.addEventListener(
  "change",
  (e) => {
    e.preventDefault();

    const files = e.target.files;

    processFiles(files);
  },
  false
);

[
  "drag",
  "dragstart",
  "dragend",
  "dragover",
  "dragenter",
  "dragleave",
  "drop",
].forEach((event) =>
  form.addEventListener(event, (e) => {
    e.preventDefault();
    e.stopPropagation();
  })
);

[
  "drag",
  "dragstart",
  "dragend",
  "dragover",
  "dragenter",
  "dragleave",
  "drop",
].forEach((event) =>
  document.addEventListener(event, (e) => {
    e.preventDefault();
    e.stopPropagation();
  })
);

["dragover", "dragenter"].forEach((event) =>
  form.addEventListener(event, () => {
    form.classList.add("border");
    button.classList.add("highlight");
  })
);

["dragend", "dragleave", "drop"].forEach((event) =>
  form.addEventListener(event, () => {
    form.classList.remove("border");
    button.classList.remove("highlight");
  })
);

HTMLControl.fileUpload.form.addEventListener("drop", (e) => {
  const files = e.dataTransfer.files;

  processFiles(files);
});

HTMLControl.controls.exampleDuck.addEventListener("click", (e) => {
  e.preventDefault();

  loadingManager.onStart();
  OnLoadCallbacks.onGLTFLoad("/assets/models/Duck.gltf");
});
