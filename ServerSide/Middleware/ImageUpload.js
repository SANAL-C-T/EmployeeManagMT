const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads");
    },
    filename: function (req, file, cb) {
        console.log("FormData:", req.body);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + Date.now() + ext);
    },
});

const upload = multer({ storage: storage });

const profileImage = (req, res, next) => {
    console.log("multermiddleware::::", req.body);

    // Update the field name to "file" as per your FormData
    upload.single("file")(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log("Multer Error:", err);
            return res.status(500).send("Multer Error");
        } else if (err) {
            console.log("Unknown Error:", err);
            return res.status(500).send("Unknown Error");
        }
        console.log("Image uploaded successfully");
        next();
    });
};

module.exports = { profileImage };
