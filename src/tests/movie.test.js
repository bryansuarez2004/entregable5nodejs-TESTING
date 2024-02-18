require('../models')

const request = require("supertest");
const app = require("../app");
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

const URL_MOVIE = "/movies";
const movie = {
    name: "Avengers",
    image: "https://lumiere-a.akamaihd.net/v1/images/the_avengers_001_ef260f78.jpeg?region=0,0,540,304",
    synopsis: "avengers unidos",
    releaseYear: 2010,
};
let movieId;

test("Post -> URL_MOVIE, should return status code 201, and res.body to be defined and res.body.name = movie.name", async () => {
    const res = await request(app).post(URL_MOVIE).send(movie);
  
    movieId = res.body.id;
  
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(movie.name);
  });

  test("Get -> URL_MOVIE, should return status code 200, and res.body to be defined and res.body.length = 1", async()=>{
    const res = await request(app)
    .get(URL_MOVIE)
    //  console.log(res.body);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);  

    expect(res.body[0].genres).toBeDefined()
    expect(res.body[0].genres).toHaveLength(0)

    expect(res.body[0].directors).toBeDefined()
    expect(res.body[0].directors).toHaveLength(0)

    expect(res.body[0].actors).toBeDefined()
    expect(res.body[0].actors).toHaveLength(0)
})  

test("Get -> URL_MOVIE/:id, should return status code 200, and res.body to be defined and res.body.name = movie.name", async()=>{
    const res = await request(app)
    .get(`${URL_MOVIE}/${movieId}`)
    // console.log(res.body);


    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(movie.name);  

    expect(res.body.genres).toBeDefined()
    expect(res.body.genres).toHaveLength(0)

    expect(res.body.directors).toBeDefined()
    expect(res.body.directors).toHaveLength(0)

    expect(res.body.actors).toBeDefined()
    expect(res.body.actors).toHaveLength(0)
})

test("Put -> URL_MOVIE/:id, should return status code 201, and res.body to be defined", async()=>{
    const res = await request(app)
    .put(`${URL_MOVIE}/${movieId}`)
    .send({name:"Flaming hot"})

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe("Flaming hot");  
})


//testeo de la ruta para setear generos
test("Post -> URL_MOVIE/:id/genres, should return status code 200", async()=>{
    const genre = {
        name: "Terror",
      };
    //creo un genero en la tabla de generos para poder asignar este genero creado en el arreglo de generos de cada movie
      const genreToSet = await Genre.create(genre)
     
      const res = await request(app)
      .post(`${URL_MOVIE}/${movieId}/genres`)  
      .send([genreToSet.id])

      expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body.length).toBe(1)

    //destruyo el genero que cree en su tabla para que en el test de generos no haya un genero creado de más, y se mantenga el entorno controlado
      await genreToSet.destroy()
})


//testeo de la ruta para setear actores
test("Post -> URL_MOVIE/:id/actors, should return status code 200", async()=>{
    const actor = {
        firstName: "massiel",
        lastName: "suarez",
        nationality: "peruana",
        image:
          "https://static.wikia.nocookie.net/doblaje/images/b/b9/Diego-0.jpg/revision/latest?cb=20171022045818&path-prefix=es",
        birthday: "2024-07-15",
      };
    //creo un actor en la tabla de actores para poder asignar este actor creado en el arreglo de actores de cada movie
      const actorToSet = await Actor.create(actor)
     
      const res = await request(app)
      .post(`${URL_MOVIE}/${movieId}/actors`)  
      .send([actorToSet.id])

      expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body.length).toBe(1)

    //destruyo el actor que cree en su tabla para que en el test de actores no haya un actor creado de más, y se mantenga el entorno controlado
      await actorToSet.destroy()
})


//testeo de la ruta para setear directores
test("Post -> URL_MOVIE/:id/directors, should return status code 200", async()=>{
    const director = {
        firstName: "bryan",
        lastName: "suarez",
        nationality: "peruana",
        image:
          "https://static.wikia.nocookie.net/doblaje/images/b/b9/Diego-0.jpg/revision/latest?cb=20171022045818&path-prefix=es",
        birthday: "2024-02-03",
      };
    //creo un director en la tabla de directores para poder asignar este director creado en el arreglo de directores de cada movie
      const directorToSet = await Director.create(director)
     
      const res = await request(app)
      .post(`${URL_MOVIE}/${movieId}/directors`)  
      .send([directorToSet.id])

      expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body.length).toBe(1)

    //destruyo el director que cree en su tabla para que en el test de directores no haya un director creado de más, y se mantenga el entorno controlado
      await directorToSet.destroy()
})

//el test de delete al final para eliminar la movie creada y mantener el entorno controlado
test("Delete -> URL_MOVIE/:id, should return status code 204", async()=>{
    const res = await request(app)
    .delete(`${URL_MOVIE}/${movieId}`)
    

    expect(res.status).toBe(204);
    
})