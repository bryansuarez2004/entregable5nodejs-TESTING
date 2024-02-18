const request = require("supertest");
const app = require("../app");

const URL_ACTORS = "/actors";
const actor = {
  firstName: "massiel",
  lastName: "suarez",
  nationality: "peruana",
  image:
    "https://static.wikia.nocookie.net/doblaje/images/b/b9/Diego-0.jpg/revision/latest?cb=20171022045818&path-prefix=es",
  birthday: "2024-07-15",
};
let actorId;

test("Post -> URL_ACTORS, should return status code 201, and res.body to be defined and res.body.firstName = actor.firstName", async () => {
  const res = await request(app).post(URL_ACTORS).send(actor);

  actorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test("Get -> URL_ACTORS, should return status code 200, and res.body to be defined and res.body.length = 1", async () => {
  const res = await request(app).get(URL_ACTORS);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);
});

test("Get -> URL_ACTORS/:id, should return status code 200, and res.body to be defined and res.body.firstName = actor.firstName", async () => {
  const res = await request(app).get(`${URL_ACTORS}/${actorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test("Put -> URL_ACTORS/:id, should return status code 201, and res.body to be defined", async () => {
  const res = await request(app)
    .put(`${URL_ACTORS}/${actorId}`)
    .send({ firstName: "Young mi" });

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe("Young mi");
});

test("Delete -> URL_ACTORS/:id, should return status code 204", 
async () => {
  const res = await request(app).delete(`${URL_ACTORS}/${actorId}`);

  expect(res.status).toBe(204);
});
