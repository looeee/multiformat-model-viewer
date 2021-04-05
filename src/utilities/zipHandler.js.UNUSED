import OnLoadCallbacks from './OnLoadCallbacks.js';

const zipHandler = ( file ) => {
  JSZip.loadAsync( file ).then( ( zip ) => {

    // First loop over the zip's contents and extract the FBX file and any images
    const imagesZipped = [];

    let fbxFileZipped = false;

    for ( const entry in zip.files ) {

      const zippedFile = zip.files[ entry ];

      // skip if the entry is a directory
      if ( zippedFile.dir === false ) {

        const extension = zippedFile.name.split( '.' ).pop().toLowerCase();

        if ( extension === 'fbx' ) {

          if ( fbxFileZipped ) {

            console.error(
              `Warning: more than one FBX file found in archive,
              skipping subsequent files.`
            );

          } else {

            fbxFileZipped = zippedFile;

          }

        } else if ( extension === 'png' || extension === 'jpg' || extension === 'jpeg' || extension === 'gif' ) {

          // should check if it's an image here - not completely neccessary as it will
          // work anyway, but maybe more efficient
          imagesZipped.push( zippedFile );
        }

      }

    }

    // if there was no FBX file found exit with an error here
    if ( !fbxFileZipped ) {

      console.error( 'No FBX file found in archive.' );
      return;

    }

    // At this point the FBX file should be contained in fbxFileZipped and images are in
    // imagesZipped - these are still compressed, so we'll need to set up a Promise and
    // uncompress them all before calling the FBXParser

    const images = {};

    const URL = window.URL || window.webkitURL || window.mozURL;

    const promises = imagesZipped.map( ( zippedFile ) => {

      return zippedFile.async( 'arrayBuffer' )
        .then( ( image ) => {

          const buffer = new Uint8Array( image );
          const blob = new Blob( [ buffer.buffer ] );
          const url = URL.createObjectURL( blob );

          // drop any directories from the name
          const split = zippedFile.name.split( /[\\\/]/ );
          let fileName;

          if ( split.length > 0 ) {

            fileName = split[ split.length - 1 ];

          } else {

            fileName = zippedFile.name;

          }

          if ( images[ fileName ] !== undefined ) {

            console.error( 'Warning: the archive contains multiple images with the same name:'  + fileName );

          } else {

            images[ fileName ] = url;

          }

        }, ( err ) => { console.error( 'JSZip error unpacking image: ' + err ); } );

    } );

    let fbxFile = null;
    const fbxFilePromise = fbxFileZipped.async( 'arrayBuffer' )
      .then(
        ( data ) => { fbxFile = data; },
        ( err ) => { console.error( 'JSZip error unpacking FBX: ' + err ); }
      );

    promises.push( fbxFilePromise );

    Promise.all( promises ).then( () => {

      console.log( images )

      OnLoadCallbacks.onZipLoad( fbxFile, images );

    } );

  } );

};

export default zipHandler;
