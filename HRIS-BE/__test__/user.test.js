const supertest = require("supertest");
const app = require("../app.js")

describe('User API', () => {
    it('should show response unauthorized', async () => {
      const res = await supertest(app).get("/getUser")
      expect(res.statusCode).toEqual(401)
    })

    it('should login successfully', async () => {
      const res = await supertest(app).post("/checkLogin").send({
        username: "admin",
        password: "admin",
      })
      expect(res.statusCode).toEqual(200)
    })
  })