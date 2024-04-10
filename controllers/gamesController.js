const data = require("../starter files/data");
const sharp = require("sharp");
const multer = require("multer");
const games = data.games;

const storageEngine = multer.memoryStorage();

const upload = multer({
  storage: storageEngine,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload only images."), false);
    }
  },
});

exports.uploadImage = upload.single("profilePhoto");
exports.uploadImages = upload.fields([
  { name: "profilePhoto" },
  { name: "gallery" },
]);

exports.processImages = async (req, res, next) => {
  if (!req.file) return next();
  const fileName = `game-cover-images-${Date.now()}.jpg`;
  const filePath = `images/${fileName}`;

  await sharp(req.file.buffer)
    .rotate()
    .resize(1080)
    .jpeg({ quality: 90 })
    .toFile(`public/${filePath}`);

  //Create thumbnails
  await sharp(req.file.buffer)
    .rotate()
    .resize({ width: 336, height: 188 })
    .jpeg({ quality: 50 })
    .toFile(`public/images/thumbnails/${fileName}`);

  req.body.image = filePath;

  next();
};

exports.getGame = (req, res, next) => {
  const game = games.find((elemet) => elemet.id === parseInt(req.params.id));
  res.status(200).json({ status: "success", data: game });
};

exports.getAllGames = (req, res, next) => {
  res.status(200).json({ status: "success", data: games });
};

exports.createGame = (req, res) => {
  const game = {
    id: games.length + 1,
    name: req.body.name,
    platform: req.body.platform,
    rating: req.body.rating || 0,
    image: req.body.image,
  };

  games.push(game);
  res.status(201).json({ status: "success", data: games });
};

exports.updateGame = (req, res, next) => {
  const game = games.find((element) => element.id === parseInt(req.params.id));
  game.name = req.body.name || game.name;
  game.rating = req.body.rating || game.rating;
  game.platform = req.body.platform || game.platform;

  games.splice(req.params.id, 1, game);

  res.status(200).json({ status: "success", data: game });
};

exports.playground = async (req, res, next) => {
  console.log(req.files.profilePhoto.length);
  res.status(200).json({ status: "success" });
};

exports.deleteGame = (req, res, next) => {
  const indexOfGame = games.findIndex(
    (element) => element.id === parseInt(req.params.id)
  );

  games.splice(indexOfGame, 1);

  res.status(204).json({ status: "success", data: games });
};
