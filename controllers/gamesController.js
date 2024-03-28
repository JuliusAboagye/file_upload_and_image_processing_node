const games = [
  { id: 1, name: "God of war 3", platform: "pc", rating: 4 },
  { id: 2, name: "Prototype", platform: "pc", rating: 4.5 },
  { id: 3, name: "Tom Clancy's Splinter Cell", platform: "pc", rating: 3.9 },
  { id: 4, name: "Grand Theft Auto V", platform: "PS5", rating: 5 },
  { id: 5, name: "Apex Legends", platform: "pc", rating: 0 },
];

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

exports.deleteGame = (req, res, next) => {
  const indexOfGame = games.findIndex(
    (element) => element.id === parseInt(req.params.id)
  );

  games.splice(indexOfGame, 1);

  res.status(204).json({ status: "success", data: games });
};
