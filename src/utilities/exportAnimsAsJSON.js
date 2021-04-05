import { AnimationClip } from "three";

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

const exportAsJSON = (anim) => {
  let output = JSON.stringify(AnimationClip.toJSON(anim), null, "\t");

  // remove first '[' and last ']' from json
  output = output.replace(/[^{]*/i, "").replace(/\]$/i, "");

  saveString(output, "three-animation-clip.json");
};

export default exportAsJSON;
