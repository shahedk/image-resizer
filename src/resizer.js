const paramHelper = require('./param-helper');
const sharp = require('sharp');
const config = require('../config');

async function resize(filePath, params) {

    try {

        const resizedImageName = paramHelper.getResizedFileName(params);
        const resizedImagePath = './tmp/' + resizedImageName;

        const original = await sharp(filePath)
        const metadata = await original.metadata()
        let targetImage = original
                .resize(params.width, params.height, {
                    kernel: sharp.kernel.nearest,
                    fit: params.fit,
                    background: config.ImageBackground
                })
                .toFormat(params.format)
       
        if(Number.isInteger(metadata.orientation)){
            switch (metadata.orientation) {
                case 3:
                    targetImage = targetImage.rotate(180)
                    break;
                case 6:
                    targetImage = targetImage.rotate(90)
                    break;
                case 8:
                    targetImage = targetImage.rotate(-90)
                    break;
                default:
                    break
            }
        }

        await targetImage.toFile(resizedImagePath)
        return Promise.resolve(resizedImageName);
    }
    catch (e) {
        return Promise.reject(e);
    }
}



module.exports = {
    resize
}