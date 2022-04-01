const Busboy = require('busboy');
const cloudinary = require('../config/cloudinary');

formData = (req, res, next) => {
    let uploadingFile = false;
    let updaloadingCount = 0;

    function done() {
        if (uploadingFile) return;
        if (updaloadingCount > 0) return;

        next();
    }

    const busboy = Busboy({ headers: req.headers });

    req.body = {};

    busboy.on('avatar', async (key, file) => {
        uploadingFile = true;
        updaloadingCount++;

        const upload = await cloudinary.uploader.upload_stream(
            { upload_stream: 'MakeItReal' },
            (err, res) => {
                if (err) throw new Error('Error uploading file');

                req.body[key] = res;
                uploadingFile = false;
                updaloadingCount--;
                done();
            }
        );

        file.on('data', (data) => {
            upload.write(data);
        });

        file.on('end', () => {
            upload.end();
        });
    });

    busboy.on('finish', () => {
        console.log('finish');
        done();
    });

    req.pipe(busboy);
};

module.exports = formData;