const BadRequestError = require('../errors/bad-request-err');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
  .then((moviesDate) => {
    if (!moviesDate) {

    }
  })



};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const { country, director, duration, year, description, image, trailer, thumbnail, owner, movieId, nameRU, nameEN } = req.body;

  Movie.create({
    country, director, duration, year, description, image, trailer, thumbnail, owner, movieId, nameRU, nameEN,
  })
    .then((movie) => {
      if (!movie) {
        throw new BadRequestError('Переданы некорректные данные для создания карточки фильма');
      }
      res.send({ movie });
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
  .orFail(new NotFoundError('Карточки этого фильма не существует'))
  .then((movie) => {
    if (movie.owner.toString() === req.user._id) {
      Movie.deleteOne({ _id: movie._id })
        .then(res.send({ message: 'Карточка фильма удалена' }));
    } else { throw new ForbiddenError('Нельзя удалять карточки фильмов других пользователей'); }
  })
  .catch(next);
};
