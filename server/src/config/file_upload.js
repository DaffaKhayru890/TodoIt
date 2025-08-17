import muler from 'multer';

const storage = muler.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"profiles/")
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname);
    }
});

export default storage;