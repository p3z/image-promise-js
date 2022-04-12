function isArrayLike(input) {
    return input.length !== undefined;
}

function loadSingleImage(image) {
    const promise = new Promise((resolve, reject) => {
        if (image.naturalWidth) {
            // If the browser can determine the naturalWidth the image is already loaded successfully
            resolve(image);
        }
        else if (image.complete) {
            // If the image is complete but the naturalWidth is 0px it is probably broken
            reject(image);
        }
        else {
            image.addEventListener('load', fulfill);
            image.addEventListener('error', fulfill);
        }
        function fulfill() {
            if (image.naturalWidth) {
                resolve(image);
            }
            else {
                reject(image);
            }
            image.removeEventListener('load', fulfill);
            image.removeEventListener('error', fulfill);
        }
    });
    return Object.assign(promise, { image });
}

function loadImages(input, attributes = {}) {
    if (input instanceof HTMLImageElement) {
        return loadSingleImage(input);
    }
    if (typeof input === 'string') {
        /* Create a <img> from a string */
        const src = input;
        const image = new Image();
        Object.keys(attributes).forEach(name => image.setAttribute(name, attributes[name]));
        image.src = src;
        return loadSingleImage(image);
    }
    if (isArrayLike(input)) {
        // Momentarily ignore errors
        const reflect = (img) => loadImages(img, attributes).catch((error) => error);
        const reflected = [].map.call(input, reflect);
        const tsFix = Promise.all(reflected).then((results) => {
            const loaded = results.filter((x) => x.naturalWidth);
            if (loaded.length === results.length) {
                return loaded;
            }
            return Promise.reject({
                loaded,
                errored: results.filter((x) => !x.naturalWidth)
            });
        });
        // Variables named `tsFix` are only here because TypeScript hates Promise-returning functions.
        return tsFix;
    }
    const tsFix = Promise.reject(new TypeError('input is not an image, a URL string, or an array of them.'));
    return tsFix;
}
exports.loadImages = loadImages;
exports.loadSingleImage = loadSingleImage;
exports.isArrayLike = isArrayLike;