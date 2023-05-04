const app = require("./server");
const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("./models/user.model");
const Car = require("./models/car.model");
const Order = require("./models/order.model");
const RefreshToken = require("./models/refreshToken.model");

describe("REST API integration tests", () => {
  let ACCESS_TOKEN;
  let REFRESH_TOKEN;

  const password = "Aladar14.";

  const dataToInsert = {
    users: [
      {
        address: {
          city: "Abony",
          street: "Szolnoki",
          houseNumber: 2,
          floor: 1,
          flatNumber: 1,
          zip: 5030,
        },
        _id: "641c66cd65e3a80c7774b77d",
        email: "meszarosD@gmail.com",
        username: "meszi12",
        password:
          "$2a$10$qLaDIQKUt6VRIpIg9NspruUUcrEYhPszjybTV2UywEvqq2F0YFYdy",
        firstName: "Dániel",
        lastName: "Mészáros",
        birthDate: "2000-05-18T00:00:00Z",
        phone: "06-30-0976-703",
        personalId: "233747ZA",
        drivingLicense: "323TAT33",
        role: "admin",
        orders: [],
        favourites: [],
      },
      {
        address: {
          city: "Abony",
          street: "Szolnoki",
          houseNumber: 22,
          floor: 1,
          flatNumber: 10,
          zip: 5030,
        },
        _id: "641c66cd65e3a80c7774b780",
        email: "botond@gmail.com",
        username: "boti55",
        password:
          "$2a$10$qLaDIQKUt6VRIpIg9NspruUUcrEYhPszjybTV2UywEvqq2F0YFYdy",
        firstName: "Botond",
        lastName: "Pálinkás",
        birthDate: "1999-05-18T00:00:00Z",
        phone: "06-30-0976-703",
        personalId: "233747ZA",
        drivingLicense: "323TAT33",
        role: "user",
        orders: [],
        favourites: [],
      },
      {
        address: {
          city: "Abony",
          street: "Szolnoki",
          houseNumber: 2,
          floor: 1,
          flatNumber: 1,
          zip: 5030,
        },
        _id: "643546c67e0decaa58cfd636",
        email: "meszarosD@gmail.com",
        username: "meszi12",
        password:
          "$2a$10$qLaDIQKUt6VRIpIg9NspruUUcrEYhPszjybTV2UywEvqq2F0YFYdy",
        firstName: "Dániel",
        lastName: "Mészáros",
        birthDate: "2000-05-18T00:00:00Z",
        phone: "06-30-0976-703",
        personalId: "233747ZA",
        drivingLicense: "323TAT33",
        role: "admin",
        orders: [],
        favourites: [],
      },
    ],

    cars: [
      {
        _id: "641c5a5565e3a80c7748e316",
        make: "bmw",
        model: "x1",
        price: 40000,
        fuel: "diesel",
        year: 2016,
        transmission: "automatic",
        features: {
          color: "other",
          bodyStyle: "suv",
          numberOfDoors: 5,
          numberOfSeats: 5,
          powerHp: 150,
          cubicCapacity: 1995,
          fuelConsumption: 10,
          airCondition: true,
        },
        discount: true,
        available: true,
      },
      {
        _id: "641c5a5565e3a80c7748e317",
        make: "renault",
        model: "clio",
        price: 10000,
        fuel: "petrol",
        year: 2018,
        transmission: "manual",
        features: {
          color: "blue",
          bodyStyle: "estate",
          numberOfDoors: 5,
          numberOfSeats: 5,
          powerHp: 90,
          cubicCapacity: 986,
          fuelConsumption: 5,
          airCondition: true,
        },
        discount: false,
        available: true,
      },
      {
        _id: "641c5a5565e3a80c7748e318",
        make: "renault",
        model: "talisman",
        price: 20000,
        fuel: "diesel",
        year: 2018,
        transmission: "manual",
        features: {
          color: "black",
          bodyStyle: "estate",
          numberOfDoors: 5,
          numberOfSeats: 5,
          powerHp: 110,
          cubicCapacity: 1461,
          fuelConsumption: 6,
          airCondition: true,
        },
        discount: false,
        available: true,
      },
      {
        _id: "641c5a5565e3a80c7748e319",
        make: "bmw",
        model: "3",
        price: 30000,
        fuel: "diesel",
        year: 2019,
        transmission: "automatic",
        features: {
          color: "grey",
          bodyStyle: "sedan",
          numberOfDoors: 5,
          numberOfSeats: 5,
          powerHp: 258,
          cubicCapacity: 2993,
          fuelConsumption: 7,
          airCondition: true,
        },
        discount: false,
        available: false,
      },
    ],

    orders: [
      {
        _id: "641c66cd65e3a80c7774b781",
        userId: "641c66cd65e3a80c7774b77d",
        carId: "641c5a5565e3a80c7748e316",
        date: "2023-01-22T23:00:00.000Z",
        startDate: "2023-01-22T23:00:00.000Z",
        endDate: "2023-01-29T22:00:00.000Z",
        duration: 7,
        price: 280000,
      },
      {
        _id: "641c66cd65e3a80c7774b782",
        userId: "641c66cd65e3a80c7774b77d",
        carId: "641c5a5565e3a80c7748e316",
        date: "2023-03-19T18:37:26.085Z",
        startDate: "2023-03-14T23:00:00.000Z",
        endDate: "2023-03-22T23:00:00.000Z",
        duration: 9,
        price: 360000,
      },
      {
        _id: "641c66cd65e3a80c7774b783",
        userId: "641c66cd65e3a80c7774b77d",
        carId: "641c5a5565e3a80c7748e316",
        date: "2023-01-22T23:00:00.000Z",
        startDate: "2023-01-22T23:00:00.000Z",
        endDate: "2023-01-29T22:00:00.000Z",
        duration: 2,
        price: 28000,
      },
    ],
    refreshToken: [
      {
        refreshToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbmtpbW9vbiIsInJvbGUiOiJhZG1pbiIsInVzZXJfaWQiOiI2NDFjNjZjZDY1ZTNhODBjNzc3NGI3N2QiLCJpYXQiOjE2ODExNDY1MTJ9.ZvfwSlTsHWBhCxRnL30_6xyuu4dyjWfQrkQSQ1eJm9g",
      },
    ],
  };

  beforeEach(async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/SuperTestDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connection established!");
    } catch (err) {
      console.log(err);
      process.exit();
    }
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  });

  test("POST /login endpoint with valid logindata (admin)", async () => {
    const users = await User.insertMany(dataToInsert.users);
    const adminUser = users.find((user) => user.role === "admin");
    const response = await supertest(app).post("/api/login").send({
      username: adminUser.username,
      password: password,
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body.accessToken).toBeTruthy();
    expect(response.body).toHaveProperty("refreshToken");
    expect(response.body.refreshToken).toBeTruthy();
    expect(response.body.user.role).toBe("admin");
    expect(response.body.user.username).toBe(adminUser.username);
  });

  test("POST /refresh endpoint with valid refreshToken", async () => {
    await RefreshToken.insertMany(dataToInsert.refreshToken);
    const refreshToken = {
      refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbmtpbW9vbiIsInJvbGUiOiJhZG1pbiIsInVzZXJfaWQiOiI2NDFjNjZjZDY1ZTNhODBjNzc3NGI3N2QiLCJpYXQiOjE2ODExNDY1MTJ9.ZvfwSlTsHWBhCxRnL30_6xyuu4dyjWfQrkQSQ1eJm9g",
    };

    const response = await supertest(app)
      .post("/api/refresh")
      .send(refreshToken);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body.accessToken).toBeTruthy();
  });

  test("POST /api/logout endpoint with valid refreshToken", async () => {
    await RefreshToken.insertMany(dataToInsert.refreshToken);
    const refreshToken = {
      refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbmtpbW9vbiIsInJvbGUiOiJhZG1pbiIsInVzZXJfaWQiOiI2NDFjNjZjZDY1ZTNhODBjNzc3NGI3N2QiLCJpYXQiOjE2ODExNDY1MTJ9.ZvfwSlTsHWBhCxRnL30_6xyuu4dyjWfQrkQSQ1eJm9g",
    };

    const response = await supertest(app)
      .post("/api/logout")
      .send(refreshToken);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({});
  });

  test("POST /api/me endpoint as user logined", async () => {
    const users = await User.insertMany(dataToInsert.users);
    const adminUser = users.find((user) => user.role === "admin");
    const loginResponse = await supertest(app).post("/api/login").send({
      username: adminUser.username,
      password: password,
    });

    const ACCESS_TOKEN = loginResponse.body.accessToken;

    const meResponse = await supertest(app)
      .get("/api/me")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

    expect(meResponse.statusCode).toBe(200);
  });

  test("GET /users endpoint as admin", async () => {
    const users = await User.insertMany(dataToInsert.users);

    const res = await supertest(app).post("/api/login").send({
      username: users[0].username,
      password: password,
    });

    ACCESS_TOKEN = res.body.accessToken;
    REFRESH_TOKEN = res.body.refreshToken;

    const response = await supertest(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(dataToInsert.users.length);

    response.body.forEach((user, index) => {
      for (let userKeys in dataToInsert.users[0]) {
        if (
          userKeys !== "address" &&
          userKeys !== "favourites" &&
          userKeys !== "orders" &&
          userKeys !== "password"
        ) {
          expect(user[userKeys]).toBe(dataToInsert.users[index][userKeys]);
        } else if (userKeys === "address") {
          for (let addressProperties in user.address) {
            expect(user.address[addressProperties]).toBe(
              dataToInsert.users[index].address[addressProperties]
            );
          }
        }
      }
    });
  });

  test("GET /users endpoint as user --not authorized--", async () => {
    const users = await User.insertMany(dataToInsert.users);
    const simpleUser = users.find((user) => user.role === "user");

    const res = await supertest(app).post("/api/login").send({
      username: simpleUser.username,
      password: "Aladar14.",
    });
    const REFRESH_TOKEN = res.body.refreshToken;
    const ACCESS_TOKEN = res.body.accessToken;

    const response = await supertest(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);

    expect(response.statusCode).toBe(401);
  });

  test("GET /users/:id endpoint as user", async () => {
    const users = await User.insertMany(dataToInsert.users);

    const res = await supertest(app).post("/api/login").send({
      username: users[0].username,
      password: password,
    });

    ACCESS_TOKEN = res.body.accessToken;
    REFRESH_TOKEN = res.body.refreshToken;

    const firstUserId = users[0]._id;
    const response = await supertest(app)
      .get(`/api/users/${firstUserId.toString()}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .expect(200);
    const actualUser = response.body;

    for (let userKeys in dataToInsert.users[0]) {
      if (
        userKeys !== "address" &&
        userKeys !== "favourites" &&
        userKeys !== "orders" &&
        userKeys !== "password"
      ) {
        expect(actualUser[userKeys]).toBe(dataToInsert.users[0][userKeys]);
      } else if (userKeys === "address") {
        for (let addressProperties in actualUser[userKeys]) {
          expect(actualUser.address[addressProperties]).toBe(
            dataToInsert.users[0].address[addressProperties]
          );
        }
      }
    }
  });

  test("GET /users/:id endpoint with invalid id as user (or admin)", async () => {
    const users = await User.insertMany(dataToInsert.users);

    const INVALID_PERSON_ID = "6425a3c92c876dfbfbf0af8a";

    const res = await supertest(app).post("/api/login").send({
      username: users[0].username,
      password: password,
    });

    ACCESS_TOKEN = res.body.accessToken;
    REFRESH_TOKEN = res.body.refreshToken;

    const response = await supertest(app)
      .get(`/api/users/${INVALID_PERSON_ID}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .expect(404);

    expect(response.body.hasError).toBe(true);
    expect(response.body.message).toBe(
      `User with ${INVALID_PERSON_ID} ID was not found`
    );
  });

  test("POST /users endpoint test", async () => {
    const newUser = {
      address: {
        city: "Füzesabony",
        street: "Kossuth Lajos",
        houseNumber: 12,
        floor: 10,
        flatNumber: 1,
        zip: 5030,
      },
      email: "bfdfdfd@gmail.com",
      username: "bofdfdti55",
      password: "asdasd",
      firstName: "András",
      lastName: "Pálinkás",
      birthDate: "1999-05-18T00:00:00Z",
      phone: "06-30-0976-703",
      personalId: "233747ZA",
      drivingLicense: "323TAT33",
      role: "user",
    };

    const res = await supertest(app).post(`/api/users`).send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBeTruthy();
    expect(Array.isArray(res.body.orders)).toBeTruthy();
    expect(Array.isArray(res.body.favourites)).toBeTruthy();
    for (let userKeys in newUser) {
      if (userKeys !== "address" && userKeys !== "password") {
        expect(res.body[userKeys]).toBe(newUser[userKeys]);
      } else if (userKeys === "address") {
        for (let addressProperties in newUser.address) {
          expect(res.body.address[addressProperties]).toBe(
            newUser.address[addressProperties]
          );
        }
      }
    }
  });

  test("POST /users endpoint test with invalid body", async () => {
    await User.insertMany(dataToInsert.users);
    const newUser = {
      address: {
        city: "Füzesabony",
        street: "Kossuth Lajos",
        houseNumber: 12,
        floor: 10,
        flatNumber: 1,
        zip: 5030,
      },
      email: "bfdfdfd@gmail.com",
      username: "bofdfdti55",
      password: "asdfgfdfhjkl1",
      firstName: "András",
      lastName: "Pálinkás",
      birthDate: "1999-05-18T00:00:00Z",
      role: "user",
    };
    const res = await supertest(app).post(`/api/users`).send(newUser);
    expect(res.statusCode).toBe(400);
    expect(res.body._id).toBeUndefined();
    expect(res.body.drivingLicense).toBeUndefined();
    expect(res.body.personalId).toBeUndefined();
    expect(res.body.phone).toBeUndefined();
    expect(res.body.hasError).toBe(true);
    expect(res.body.message).toBeTruthy();
  });

  test("PUT /users/:id endpoint", async () => {
    const users = await User.insertMany(dataToInsert.users);

    const res = await supertest(app).post("/api/login").send({
      username: users[0].username,
      password: password,
    });

    ACCESS_TOKEN = res.body.accessToken;
    REFRESH_TOKEN = res.body.refreshToken;

    const userToTest = users[0];
    const firstUserId = userToTest._id;
    const updatedProperty = { lastName: "Pálinkás" };
    const response = await supertest(app)
      .put(`/api/users/${firstUserId.toString()}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .send(updatedProperty)
      .expect(200);

    const updatedUser = response.body;

    expect(updatedUser.lastName).toBe(updatedProperty.lastName);
    expect(updatedUser.firstName).toBe(userToTest.firstName);
    expect(updatedUser.birthDate).toBe(userToTest.birthDate);
  });

  test("POST /emailUsed endpoint", async () => {
    const users = await User.insertMany(dataToInsert.users);

    const response = await supertest(app)
      .post(`/api/users/emailUsed`)
      .send("asdasd@gmail.com")
      .expect(200);

    expect(response.body).toBe(false);
  });

  test("POST /usernameUsed endpoint", async () => {
    const users = await User.insertMany(dataToInsert.users);

    const response = await supertest(app)
      .post(`/api/users/usernameUsed`)
      .send("szabi")
      .expect(200);

    expect(response.body).toBe(false);
  });

  test("POST /checkPassword endpoint", async () => {
    const users = await User.insertMany(dataToInsert.users);

    const reqBody = {
      password: password,
      id: users[0]._id,
    };

    const response = await supertest(app)
      .post(`/api/users/checkPassword`)
      .send(reqBody)
      .expect(200);

    expect(response.body).toBe(true);
  });

  test("GET /cars", async () => {
    const cars = await Car.insertMany(dataToInsert.cars);

    const response = await supertest(app).get("/api/cars").expect(200);

    const incomingCars = response.body;

    expect(incomingCars.length).toBe(cars.length);
    expect(incomingCars[1].make).toEqual(
      cars.sort((a, b) => a.make.localeCompare(b.make))[1].make
    );
  });

  test("GET /cars/:id", async () => {
    const cars = await Car.insertMany(dataToInsert.cars);

    const carToHave = cars[1];

    const response = await supertest(app)
      .get(`/api/cars/${carToHave._id}`)
      .expect(200);

    const incomingCar = response.body;

    expect(JSON.stringify(incomingCar._id)).toStrictEqual(
      JSON.stringify(carToHave._id)
    );
    expect(incomingCar.make).toBe(carToHave.make);
    expect(incomingCar.model).toBe(carToHave.model);
    expect(incomingCar.price).toBe(carToHave.price);
    expect(incomingCar.fuel).toBe(carToHave.fuel);
  });

  test("GET /cars/:id endpoint with id that no exist", async () => {
    const cars = await Car.insertMany(dataToInsert.cars);

    const ID_NOT_EXIST = "6425a3c92c876dfbfbf0af8a";

    const response = await supertest(app)
      .get(`/api/cars/${ID_NOT_EXIST}`)
      .expect(404);

    expect(response.body.hasError).toBe(true);
    expect(response.body.message).toBe(
      `Car with ${ID_NOT_EXIST} ID was not found`
    );
  });

  test("GET /cars/:id endpoint with invalid ID", async () => {
    const cars = await Car.insertMany(dataToInsert.cars);

    const INVALID_ID = "112";

    const response = await supertest(app)
      .get(`/api/cars/${INVALID_ID}`)
      .expect(400);

    expect(response.body.hasError).toBe(true);
    expect(response.body.message).toBe(`Invalid ObjectID: ${INVALID_ID}`);
  });

  test("POST /cars endpoint test with invalid body", async () => {
    await Car.insertMany(dataToInsert.cars);
    const users = await User.insertMany(dataToInsert.users);

    const newCar = {
      make: "opel",
      model: "astra",
      fuel: "diesel",
      year: 2016,
      transmission: "automatic",
      features: {
        color: "other",
        bodyStyle: "suv",
        numberOfDoors: 5,
        numberOfSeats: 5,
        powerHp: 150,
        cubicCapacity: 1995,
        fuelConsumption: 10,
        airCondition: true,
      },
      discount: true,
      available: true,
    };

    const adminUser = users.find((user) => user.role === "admin");

    const res = await supertest(app).post("/api/login").send({
      username: users[0].username,
      password: password,
    });

    ACCESS_TOKEN = res.body.accessToken;
    REFRESH_TOKEN = res.body.refreshToken;

    const validationErrors = new Car(newCar).validateSync();

    const response = await supertest(app)
      .post(`/api/cars`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .send(newCar);

    expect(response.statusCode).toBe(400);
    expect(response.body.hasError).toBe(true);
    expect(response.body.message).toBeTruthy();
    expect(response.body.message).toEqual(validationErrors.message);
  });

  test("POST /cars endpoint test with valid body", async () => {
    await Car.insertMany(dataToInsert.cars);
    const users = await User.insertMany(dataToInsert.users);

    const newCar = {
      make: "renault",
      model: "megane",
      price: 10000,
      fuel: "petrol",
      year: 2018,
      transmission: "manual",
      features: {
        color: "blue",
        bodyStyle: "estate",
        numberOfDoors: 5,
        numberOfSeats: 5,
        powerHp: 90,
        cubicCapacity: 986,
        fuelConsumption: 5,
        airCondition: true,
      },
      discount: false,
      available: true,
    };

    const adminUser = users.find((user) => user.role === "admin");

    const response = await supertest(app).post("/api/login").send({
      username: users[0].username,
      password: password,
    });

    ACCESS_TOKEN = response.body.accessToken;
    REFRESH_TOKEN = response.body.refreshToken;

    const res = await supertest(app)
      .post(`/api/cars`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .send(newCar);

    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBeTruthy();
    for (let carKeys in newCar) {
      if (carKeys !== "features") {
        expect(res.body[carKeys]).toBe(newCar[carKeys]);
      } else if (carKeys === "features") {
        for (let featuresProperties in newCar.features) {
          expect(res.body.features[featuresProperties]).toBe(
            newCar.features[featuresProperties]
          );
        }
      }
    }
  });

  test("PUT /cars/:id endpoint", async () => {
    const cars = await Car.insertMany(dataToInsert.cars);
    const users = await User.insertMany(dataToInsert.users);
    const adminUser = users.find((user) => user.role === "admin");

    const carToUpdate = cars[0];
    const updatedProperty = { make: "Trabant" };

    const response = await supertest(app).post("/api/login").send({
      username: users[0].username,
      password: password,
    });

    ACCESS_TOKEN = response.body.accessToken;
    REFRESH_TOKEN = response.body.refreshToken;

    const res = await supertest(app)
      .put(`/api/cars/${carToUpdate._id}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .send(updatedProperty)
      .expect(200);

    const updatedCar = res.body;

    expect(updatedCar.make).toBe(updatedProperty.make);
    expect(updatedCar.model).toBe(carToUpdate.model);
    expect(updatedCar.fuel).toBe(carToUpdate.fuel);
  });

  test("DELETE /cars/:id endpoint", async () => {
    const cars = await Car.insertMany(dataToInsert.cars);
    const users = await User.insertMany(dataToInsert.users);
    const adminUser = users.find((user) => user.role === "admin");

    const carToDelete = cars[0];

    const response = await supertest(app).post("/api/login").send({
      username: users[0].username,
      password: password,
    });

    ACCESS_TOKEN = response.body.accessToken;
    REFRESH_TOKEN = response.body.refreshToken;

    const res = await supertest(app)
      .delete(`/api/cars/${carToDelete._id}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .expect(200);

    expect(res.body).toStrictEqual({});
  });

  test("GET /orders", async () => {
    const cars = await Car.insertMany(dataToInsert.cars);
    const users = await User.insertMany(dataToInsert.users);

    const orders = dataToInsert.orders.map((order, index) => {
      order.carId = cars[index]._id;
      order.userId = users[0]._id;
      return order;
    });

    const ordersWithValidId = await Order.insertMany(orders);

    const res = await supertest(app).post("/api/login").send({
      username: users[0].username,
      password: password,
    });

    ACCESS_TOKEN = res.body.accessToken;
    REFRESH_TOKEN = res.body.refreshToken;

    const response = await supertest(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .expect(200);

    const incomingOrders = response.body;

    expect(incomingOrders.length).toBe(ordersWithValidId.length);
    expect(incomingOrders[1].make).toEqual(ordersWithValidId[1].make);
  });

  test("GET /orders/:id", async () => {
    const cars = await Car.insertMany(dataToInsert.cars);
    const users = await User.insertMany(dataToInsert.users);

    const orders = dataToInsert.orders.map((order, index) => {
      order.carId = cars[index]._id;
      order.userId = users[0]._id;
      return order;
    });

    const ordersWithValidId = await Order.insertMany(orders);

    const adminUser = users.find((user) => user.role === "admin");

    const orderToHave = ordersWithValidId[1];

    const res = await supertest(app).post("/api/login").send({
      username: users[0].username,
      password: password,
    });

    ACCESS_TOKEN = res.body.accessToken;
    REFRESH_TOKEN = res.body.refreshToken;

    const response = await supertest(app)
      .get(`/api/orders/${orderToHave._id}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .expect(200);

    const incomingOrder = response.body;

    expect(JSON.stringify(incomingOrder._id)).toStrictEqual(
      JSON.stringify(orderToHave._id)
    );
    expect(incomingOrder.startDate).toBe(orderToHave.startDate);
    expect(incomingOrder.price).toBe(orderToHave.price);
    expect(incomingOrder.duration).toBe(orderToHave.duration);
    expect(incomingOrder.endDate).toBe(orderToHave.endDate);
  });

  test("GET /orders/:id endpoint with id that no exist", async () => {
    const cars = await Car.insertMany(dataToInsert.cars);
    const users = await User.insertMany(dataToInsert.users);

    const orders = dataToInsert.orders.map((order, index) => {
      order.carId = cars[index]._id;
      order.userId = users[0]._id;
      return order;
    });

    await Order.insertMany(orders);

    const res = await supertest(app).post("/api/login").send({
      username: users[0].username,
      password: password,
    });

    ACCESS_TOKEN = res.body.accessToken;
    REFRESH_TOKEN = res.body.refreshToken;

    const ID_NOT_EXIST = "6425a3c92c876dfbfbf0af8a";

    const response = await supertest(app)
      .get(`/api/orders/${ID_NOT_EXIST}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .expect(404);

    expect(response.body.hasError).toBe(true);
    expect(response.body.message).toBe(
      `Order with ${ID_NOT_EXIST} ID was not found`
    );
  });

  test("GET orders/user/:id endpoint", async () => {
    const cars = await Car.insertMany(dataToInsert.cars);
    const users = await User.insertMany(dataToInsert.users);

    const orders = dataToInsert.orders.map((order, index) => {
      order.carId = cars[index]._id;
      order.userId = users[index]._id;
      return order;
    });

    await Order.insertMany(orders);

    const res = await supertest(app).post("/api/login").send({
      username: users[0].username,
      password: password,
    });

    ACCESS_TOKEN = res.body.accessToken;
    REFRESH_TOKEN = res.body.refreshToken;

    const response = await supertest(app)
      .get(`/api/orders/user/${users[1]._id}`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .expect(200);

    expect(response.body.length).toBe(1);
  });

  test("POST /orders endpoint test with invalid body", async () => {
    const cars = await Car.insertMany(dataToInsert.cars);
    const users = await User.insertMany(dataToInsert.users);

    const orders = dataToInsert.orders.map((order, index) => {
      order.carId = cars[index]._id;
      order.userId = users[0]._id;
      return order;
    });

    const ordersWithValidId = await Order.insertMany(orders);

    const response = await supertest(app).post("/api/login").send({
      username: users[0].username,
      password: password,
    });

    ACCESS_TOKEN = response.body.accessToken;
    REFRESH_TOKEN = response.body.refreshToken;

    const newOrder = {
      userId: ordersWithValidId[0].userId,
      carId: ordersWithValidId[0].carId,
      date: "2023-03-19T18:37:26.085Z",
      startDate: "2023-03-14T23:00:00.000Z",
    };

    const validationErrors = new Order(newOrder).validateSync();

    const res = await supertest(app)
      .post(`/api/orders`)
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`)
      .send(newOrder);

    expect(res.statusCode).toBe(400);
    expect(res.body.hasError).toBe(true);
    expect(res.body.message).toBeTruthy();
    expect(res.body.message).toEqual(validationErrors.message);
  });
});
