import { Loader } from "three";

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";
import { DDSLoader } from "three/examples/jsm/loaders/DDSLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

import loadingManager from "./loadingManager.js";

loadingManager.addHandler(/\.dds$/i, new DDSLoader());

let fbxLoader = null;
let gltfLoader = null;
let objLoader = null;
let mtlLoader = null;
let colladaLoader = null;

let objLoaderInternal = null;

const promisifyLoader = (loader) => (url) =>
  new Promise((resolve, reject) => {
    loader.load(url, resolve, loadingManager.onProgress, reject);
  });

export default class Loaders {
  constructor() {
    return {
      get fbxLoader() {
        if (fbxLoader === null) {
          fbxLoader = promisifyLoader(new FBXLoader(loadingManager));
        }
        return fbxLoader;
      },

      get gltfLoader() {
        if (gltfLoader === null) {
          gltfLoader = promisifyLoader(new GLTFLoader(loadingManager));
        }
        return gltfLoader;
      },

      get objLoader() {
        if (objLoaderInternal === null) {
          objLoaderInternal = new OBJLoader(loadingManager);

          objLoader = promisifyLoader(objLoaderInternal);

          objLoader.setMaterials = (materials) => {
            objLoaderInternal.setMaterials(materials);
          };
        }

        return objLoader;
      },

      get mtlLoader() {
        if (mtlLoader === null) {
          mtlLoader = promisifyLoader(new MTLLoader(loadingManager));
        }
        return mtlLoader;
      },

      get colladaLoader() {
        if (colladaLoader === null) {
          colladaLoader = promisifyLoader(new ColladaLoader(loadingManager));
        }
        return colladaLoader;
      },
    };
  }
}
