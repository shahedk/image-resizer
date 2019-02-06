const paramHelper = require('./param-helper');
const sharp = require('sharp');


async function resize(filePath, params) {

    try {

        const resizedImageName = paramHelper.getResizedFileName(params);
        const resizedImagePath = './tmp/' + resizedImageName;

        if( params.format === "jpg" || params.format == "jpeg") {

            await sharp(filePath)
            .resize(params.width, params.height)
                .jpeg()
            .toFile(resizedImagePath);
        }
        else if(params.format === "webp"){

            await sharp(filePath)
                .resize(params.width, params.height)
                .webp()
                .toFile(resizedImagePath);
        }
        else if(params.format === "tiff"){

            await sharp(filePath)
                .resize(params.width, params.height)
                .tiff()
                .toFile(resizedImagePath);
        }
        else{

            // Default - PNG

            await sharp(filePath)
                .resize(params.width, params.height)
                .png()
                .toFile(resizedImagePath);
        }

        return Promise.resolve(resizedImageName);
    }
    catch (e) {
        return Promise.reject(e);
    }
}



module.exports = {
    resize
}