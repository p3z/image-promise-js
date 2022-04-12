# image-promise-js
A direct js port of [image-promise](https://www.npmjs.com/package/image-promise) but in vanilla js. This is literally a direct clone of the original package. It does exactly the same thing in exactly the same way.

The only differences:
- it's a vanilla js file (as opposed to typescript)
- it exports each function manually so you can require only the needed parts into your project
- each function is exported as its function name so may differ slightly to the image-promise docs (but there's lit. 3 functions, so it's not rocket science)

Available functions:
 - isArrayLike
 - loadSingleImage
 - loadImages
