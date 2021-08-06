import multer, { Multer } from 'multer';

const uploadRelations = (): Multer => {
  return multer({
		// storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      const allowedMimes = [
        'application/json'
      ];
      console.log(file.mimetype);
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid type, only json file is acceptable'));
      }
    },
    limits: {
      files: 1,
      fileSize: (1024 * 1024 * 30),
    }
  })
}

export default uploadRelations;