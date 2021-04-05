import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

// saving function taken from three.js editor
const link = document.createElement("a");
link.style.display = "none";
document.body.appendChild(link); // Firefox workaround, see #6594

const save = (blob, filename) => {
  link.href = URL.createObjectURL(blob);
  link.download = filename || "data.json";
  link.click();
};

const saveString = (text, filename) => {
  save(new Blob([text], { type: "text/plain" }), filename);
};

function exportGLTF(input) {
  const gltfExporter = new GLTFExporter();

  const options = {
    trs: false,
    onlyVisible: true,
    truncateDrawRange: true,
    binary: false,
    embedImages: true,
  };

  console.log(input);

  gltfExporter.parse(
    input.children[0].children[0],
    (result) => {
      // if ( result instanceof ArrayBuffer ) {

      //   saveArrayBuffer( result, 'scene.glb' );

      // } else {

      const output = JSON.stringify(result, null, 2);
      saveString(output, "blackThreadGLTF.gltf");

      // }
    },
    options
  );
}

export default exportGLTF;
