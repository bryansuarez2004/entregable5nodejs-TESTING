const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

// primera tabla pivote de peliculas y generos
Genre.belongsToMany(Movie,{through:'genreMovie'})
Movie.belongsToMany(Genre,{through:'genreMovie'})

// segunda tabla pivote de peliculas y actores

Director.belongsToMany(Movie,{through:'directorMovie'})
Movie.belongsToMany(Director,{through:'directorMovie'})

// tercera tabla pivote de peliculas y directores

Actor.belongsToMany(Movie,{through:'actorMovie'})
Movie.belongsToMany(Actor,{through:'actorMovie'})

