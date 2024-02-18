const request = require("supertest");
const app = require("../app");

const URL_DIRECTORS = "/directors";
const director = {
  firstName: "bryan",
  lastName: "suarez",
  nationality: "peruana",
  image:
    "https://static.wikia.nocookie.net/doblaje/images/b/b9/Diego-0.jpg/revision/latest?cb=20171022045818&path-prefix=es",
  birthday: "2024-02-03",
};
let directorId;

test("Post -> URL_DIRECTORS, should return status code 201, and res.body to be defined and res.body.name = director.name", async () => {
  const res = await request(app).post(URL_DIRECTORS).send(director);

  directorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

test("Get -> URL_DIRECTORS, should return status code 200, and res.body to be defined and res.body.length = 1", async () => {
  const res = await request(app).get(URL_DIRECTORS);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("Get -> URL_DIRECTORS/:id, should return status code 200, and res.body to be defined and res.body.firstName = director.firstName", async () => {
  const res = await request(app).get(`${URL_DIRECTORS}/${directorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

test("Put -> URL_DIRECTORS/:id, should return status code 201, and res.body to be defined", async () => {
  const res = await request(app)
    .put(`${URL_DIRECTORS}/${directorId}`)
    .send({ firstName: "alejandro" });

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe("alejandro");
});

test("Delete -> URL_DIRECTORS/:id, should return status code 204", async () => {
  const res = await request(app).delete(`${URL_DIRECTORS}/${directorId}`);

  expect(res.status).toBe(204);
});
