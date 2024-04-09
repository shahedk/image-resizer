const downloader = require('./downloader');
const paramHelper = require('./param-helper');
const resizer = require('./resizer');
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const fileExists = util.promisify(fs.exists);

// Handle request
async function resizeImage(req, res) {

    const params = paramHelper.getParams(req);
    const fileName = paramHelper.getFileName(params);
    const resizedFileName = paramHelper.getResizedFileName(params);

    const originalFilePath = './tmp/' + fileName;
    const resizedFilePath = './tmp/' + resizedFileName;


    // Resize file if not available in cache
    if (!await fileExists(resizedFilePath)) {

        // Download file if not available in cache
        if (!await fileExists(originalFilePath)) {
            await downloader.download(params.url, fileName);
        }

        await resizer.resize(originalFilePath, params);
    }

    const file = await readFile(resizedFilePath);
    res.write(file);
    res.end();

}

async function landingPage(req, res) {
    const file = await readFile('./src/wwwroot/index.html');
    res.write(file);
    res.end();
}


module.exports = {
    resizeImage,
    landingPage
}