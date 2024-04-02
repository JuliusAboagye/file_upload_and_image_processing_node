const fileNameFunction = function (req, file, cb) {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  cb(null, file.fieldname + "-" + uniqueSuffix);
};

const destinationFunction = function (req, file, cb) {
  cb(null, "/public/uploads");
};

const filterFunction = function fileFilter(req, file, cb) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  cb(null, false);

  // To accept the file pass `true`, like so:
  cb(null, true);

  // You can always pass an error if something goes wrong:
  cb(new Error("I don't have a clue!"));
};

const imageFilterFunction = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const thumbnailConfig = { width: 336, height: 188 };
