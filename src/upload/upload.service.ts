import { Inject, Injectable, HttpException, HttpStatus, UploadedFile, UploadedFiles } from '@nestjs/common';
import { extname } from 'path';
import { GlobalService } from 'src/utils/global.service';


@Injectable()
export class UploadService {

    async uploadedFile(userId: string, @UploadedFile() file) {
      const fs = require('fs');
      const sharp = require('sharp');
      const now = Date.now();
      const fileExtName = extname(file.originalname);
      const uploadFileName = GlobalService.rootPath + GlobalService.uploadPrefix + userId + '-' + now + fileExtName;
      const thumbnailFileName = GlobalService.rootPath + GlobalService.thumbnailsPrefix + userId + '-' + now + fileExtName;
      fs.rename(file.path , uploadFileName, function (err) {
        if (err) throw err;
      });
      sharp(uploadFileName).resize({
        width: GlobalService.thumbnailsImageWidth,
        height: GlobalService.thumbnailsImageHeight
      }).toFile(thumbnailFileName, function(err) {
        if (err) {
          throw err;
        }
    })
      const response = {
        upload: uploadFileName,
        thumbnail: thumbnailFileName,
      };
      return response;
    }

    async uploadMultipleFiles(userId: string, @UploadedFiles() files) {
      const response = [];
      let now = Date.now();
      files.forEach(file => {
        now++;
        const fs = require('fs');
        const sharp = require('sharp');
        const fileExtName = extname(file.originalname);
        const newFileName = GlobalService.rootPath + GlobalService.uploadPrefix + userId + '-' + now + fileExtName;
        const thumbnailFileName = GlobalService.rootPath + GlobalService.thumbnailsPrefix + userId + '-' + now + fileExtName;
        fs.rename(file.path , newFileName, function (err) {
          if (err) throw err;
        });
        sharp(newFileName).resize({
          width: GlobalService.thumbnailsImageWidth,
          height: GlobalService.thumbnailsImageHeight
        }).toFile(thumbnailFileName, function(err) {
          if (err) {
            throw err;
          }
      })
        const fileReponse = {
          upload: newFileName,
          thumbnail: thumbnailFileName,
        };
        response.push(fileReponse);
      });
      return response;
    }
}
