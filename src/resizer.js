const paramHelper = require('./param-helper');
const sharp = require('sharp');


async function resize(filePath, params) {

    try {

        const resizedImageName = paramHelper.getResizedFileName(params) + ".png";
        const resizedImagePath = './tmp/' + resizedImageName;

        await sharp(filePath)
            .resize(params.width, params.height)
            .png()
            .toFile(resizedImagePath);

        return Promise.resolve(resizedImageName);
    }
    catch (e) {
        return Promise.reject(e);
    }
}



module.exports = {
    resize
}