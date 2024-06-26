process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let popsicle = { name : "popsicle", price : 1.50 };

beforeEach(function() {
    items.push(popsicle);
})

afterEach(function() {
    // mutates, not redefines, 'items'
    items.length = 0;
})

describe("GET /items", function() {
    test("Gets all items", async function() {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([popsicle]);
    });
})

describe("POST /items", function() {
    test("Add an item to the shopping list", async function() {
        const cabbage = { name : "cabbage", price : 2.00 };
        const resp = await request(app).post('/items').send(cabbage);
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({ added : cabbage });
    });
    test("Returns status code 400 if name/price is not found", async function() {
        const resp1 = await request(app).post('/items').send({});
        expect(resp1.statusCode).toBe(400);
    });
})

describe("GET /items/:name", function() {
    test("Get an item from the shopping list", async function() {
        const resp = await request(app).get(`/items/${popsicle.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(popsicle);
    });
    test("Returns 404 if item is not found", async function() {
        const resp1 = await request(app).get('/items/chips');
        expect(resp1.statusCode).toBe(404);
        expect(resp1.body).toEqual({ error : "Item Not Found"});
    });
})

describe("PATCH /items/:name", function() {
    test("Update item", async function() {
        const resp = await request(app).patch(`/items/${popsicle.name}`).send({ name : 'otter pop', price : 1.00 });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ updated : { name: 'otter pop', price : 1.00 }})
    });
    test("Returns 404 if item is not found", async function() {
        const resp1 = await request(app).patch('/items/beans').send({ name : 'rice' });
        expect(resp1.statusCode).toBe(404);
        expect(resp1.body).toEqual({ error : "Item Not Found"});
    });
})

describe("DELETE /items/:name", function() {
    test("Delete item", async function() {
        const resp = await request(app).delete(`/items/${popsicle.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message : 'Deleted' });
        expect(items.length).toEqual(0);
    })
    test("Returns 404 if item is not found", async function() {
        const resp1 = await request(app).delete('/items/beans');
        expect(resp1.statusCode).toBe(404);
        expect(resp1.body).toEqual({ error : "Item Not Found"});
    });
})