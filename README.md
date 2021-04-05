# Three.js Multiformat Model Viewer

Loader and viewer for models in several formats.

## Instructions

Clone/download the repo. Node.js and NPM are required.

Run this command once.

``` bash
> npm install
```

Then run this command to build code and start the server.

``` bash
> npm start
```

## Supported Formats

* FBX
* glTF
* Collada

Any other three.js loaders can be easily added. Pull request welcome!

## Supported Image Formats

* All standard formats (PNG, GIF, JPG, etc.)
* DDS

## Export Functions

Once you have loaded a model, you can export an animation clip as JSON, or the entire model as glTF.

## Limitations/issues

* Color management is incorrect
* Environment maps are incorrect (should use PRMREM)

