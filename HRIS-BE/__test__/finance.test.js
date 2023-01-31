const supertest = require("supertest");
const app = require("../app.js")

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY3Mjc1MDU5MH0.Dsf1L4nafxzjpOqN_-5M0dEEQVWOE59IUGo9Eqxxikc';

describe("FINANCE API", () => {
    it('should show response data of finance', async () => {
        const res = await supertest(app).get('/reimbursement/all').set({
            'Authorization': token,
            'Accept': 'application/json',
        });
        expect(res.statusCode).toEqual(200)
    })
})