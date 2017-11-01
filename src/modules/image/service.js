import fs from 'fs';
import request from 'request';
import path from 'path';
import _ from 'lodash';
import configOption from '../../../config';

export const ImageService = {};
export default { ImageService };

ImageService.downloadImage = (uri, fileName, options) => new Promise((resolve, reject) => {
  request.head(uri, (err, res) => {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    const rootPath = path.dirname(require.main.filename).split('/');
    rootPath.pop();
    const dirImages = `${configOption.publicPath}/image`;
    if (!fs.existsSync(dirImages)) fs.mkdirSync(dirImages);
    fileName = `${_.get(options, 'type', '')}-${fileName}.jpg`;
    const filePath = `${dirImages}/${fileName}`;

    return request(uri).pipe(fs.createWriteStream(filePath)).on('close', (err2) => {
      if (err2) reject(err2);
      resolve(`${fileName}`);
    });
  });
});

ImageService.deleteImage = (fileName) => {
  if (fileName === null || fileName === '') return;
  fileName = path.basename(fileName);
  const dirImages = `${configOption.publicPath}/image`;
  fs.stat(path.join(dirImages, fileName), (err) => {
    if (err) return true;
    return fs.unlink(path.join(dirImages, fileName));
  });
};

ImageService.getFullPathImage = (fileName) => {
  const fullPath = (fileName && fileName !== '') ? `${configOption.cdnPath}/image/${fileName}` : null;
  return fullPath;
};

ImageService.getFullPathVideo = (fileName) => {
  const fullPath = (fileName && fileName !== '') ? `${configOption.cdnPath}/video/${fileName}` : null;
  return fullPath;
};
