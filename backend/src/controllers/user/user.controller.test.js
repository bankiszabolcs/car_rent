const userController = require("./user.controller");
const createError = require("http-errors");
const userService = require("./user.service");
jest.mock("./user.service.js");
const { mockRequest, mockResponse } = require("jest-mock-req-res");
const User = require("../../models/user.model");

describe("UserController Tests", () => {
  let mockData;
  let res;
  let next;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    mockData = [
      {
        id: 1,
        email: "bankiszabolcs@yahoo.com",
        username: "Szabi1112",
        password: "Szabi1112.",
        firstName: "Szabolcs",
        lastName: "Bánki",
        birthDate: "1994-10-22T00:00:00Z",
        phone: "+36204300000",
        personalId: "233747ZA",
        drivingLicense: "323TAT33",
        address: {
          city: "Budapest",
          street: "Fehérvári",
          houseNumber: 22,
          floor: 1,
          flatNumber: 77,
          zip: "1116",
        },
        role: "admin",
        orders: [],
        favourites: [],
      },
      {
        id: 2,
        email: "aladar@gmail.com",
        username: "Alattomos1",
        password: "asdsad232",
        firstName: "János",
        lastName: "Tóth",
        birthDate: "1999-05-18T00:00:00Z",
        phone: "06-70-0332-703",
        personalId: "233747ZA",
        drivingLicense: "323TAT33",
        address: {
          city: "Nagyatád",
          street: "Fő",
          houseNumber: 1,
          floor: 1,
          flatNumber: 2,
          zip: 1543,
        },
        role: "user",
        orders: [],
        favourites: [],
      },
      {
        id: 3,
        email: "angyalka@gmail.com",
        username: "Angyalka",
        password: "qwertz1",
        firstName: "János",
        lastName: "Tóth",
        birthDate: "1997-05-18T00:00:00Z",
        phone: "06-30-0332-703",
        personalId: "233747ZA",
        drivingLicense: "323TAT33",
        address: {
          city: "Nagyatád",
          street: "Fő",
          houseNumber: 1,
          floor: 2,
          flatNumber: 1,
          zip: 1311,
        },
        role: "user",
        orders: [],
        favourites: [],
      },
    ];

    userService.__setMockData(mockData);
    next = jest.fn();
    res = mockResponse();
  });

  test("Should findById() with valid id get user", () => {
    const VALID_USER_ID = 2;

    const req = mockRequest({
      params: {
        id: VALID_USER_ID,
      },
    });

    return userController.findById(req, res, next).then(() => {
      expect(userService.findById).toBeCalledWith(VALID_USER_ID);
      expect(userService.findById).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith(
        mockData.find((user) => user.id === VALID_USER_ID)
      );
    });
  });

  test("Should findById() with invalid id get error", () => {
    const INVALID_USER_ID = 5;

    const req = mockRequest({
      params: {
        id: INVALID_USER_ID,
      },
    });

    return userController.findById(req, res, next).then(() => {
      expect(userService.findById).toBeCalledWith(INVALID_USER_ID);
      expect(userService.findById).toBeCalledTimes(1);
      expect(res.json).not.toBeCalled();
      expect(next).toBeCalledWith(
        new createError.NotFound(
          `User with ${INVALID_USER_ID} ID was not found`
        )
      );
    });
  });

  test("Should create() with valid user", () => {
    const VALIDUSER = {
      email: "bankiszabolcs@yahoo.com",
      username: "Szabi1112",
      password: "Szabi1112.",
      firstName: "Szabolcs",
      lastName: "Bánki",
      birthDate: "1994-10-22T00:00:00Z",
      phone: "+36204300000",
      personalId: "233747ZA",
      drivingLicense: "323TAT33",
      address: {
        city: "Budapest",
        street: "Fehérvári",
        houseNumber: 22,
        floor: 1,
        flatNumber: 77,
        zip: 1116,
      },
      orders: [],
      favourites: [],
    };

    const req = mockRequest({
      body: VALIDUSER,
    });

    return userController.create(req, res, next).then(() => {
      expect(userService.create).toBeCalledWith({ ...VALIDUSER, role: "user" });
      expect(userService.create).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith({
        ...VALIDUSER,
        role: "user",
      });
    });
  });

  test("Should create() with invalid properties get error", () => {
    const INVALIDUSER = {
      username: "Szabi1112",
      password: "Szabi1112.",
      firstName: "Szabolcs",
      lastName: "Bánki",
      birthDate: "1994-10-22T00:00:00Z",
      phone: "+36204300000",
      personalId: "233747ZA",
      drivingLicense: "323TAT33",
      address: {
        city: "Budapest",
        street: "Fehérvári",
        houseNumber: 22,
        floor: 1,
        flatNumber: 77,
        zip: "1116",
      },
      role: "admin",
      orders: [],
      favourites: [],
    };

    const req = mockRequest({
      body: INVALIDUSER,
    });

    return userController.create(req, res, next).then(() => {
      expect(res.json).not.toBeCalled();
      expect(next).toBeCalledWith(
        new createError.BadRequest(new User(req.body).validateSync().message)
      );
    });
  });

  test("should delete() remove one element from the database", () => {
    const VALID_USER_ID = 1;
    const oldDataLength = mockData.length;

    const req = mockRequest({
      params: {
        id: VALID_USER_ID,
      },
    });

    return userController.delete(req, res, next).then(() => {
      expect(userService.delete).toBeCalledWith(VALID_USER_ID);
      expect(userService.delete).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith({});
      expect(mockData.length).toEqual(oldDataLength - 1);
    });
  });

  test("should update() remove one element in the database", () => {
    const VALID_USER_ID = 1;
    const UPDATE = {
      email: "kismiska@yahoo.com",
    };

    const req = mockRequest({
      body: UPDATE,
      params: {
        id: VALID_USER_ID,
      },
    });

    const UPDATEDUSER = {
      id: 1,
      email: "kismiska@yahoo.com",
      username: "Szabi1112",
      password: "Szabi1112.",
      firstName: "Szabolcs",
      lastName: "Bánki",
      birthDate: "1994-10-22T00:00:00Z",
      phone: "+36204300000",
      personalId: "233747ZA",
      drivingLicense: "323TAT33",
      address: {
        city: "Budapest",
        street: "Fehérvári",
        houseNumber: 22,
        floor: 1,
        flatNumber: 77,
        zip: "1116",
      },
      role: "admin",
      orders: [],
      favourites: [],
    };

    return userController.update(req, res, next).then(() => {
      expect(userService.update).toBeCalledWith(VALID_USER_ID, UPDATE);
      expect(userService.update).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith(UPDATEDUSER);
    });
  });

  test("should isEmailUsed() give back whether the email is already used or not", () => {
    const email = "email123@gmail.com";

    const req = mockRequest({
      body: { email },
    });

    return userController.isEmailUsed(req, res, next).then(() => {
      expect(userService.isEmailUsed).toBeCalledWith(email);
      expect(userService.isEmailUsed).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith(false);
    });
  });

  test("should isUsernameUsed() give back whether the username is already used or not", () => {
    const username = "Szabi1112";

    const req = mockRequest({
      body: { username },
    });

    return userController.isUsernameUsed(req, res, next).then(() => {
      expect(userService.isUsernameUsed).toBeCalledWith(username);
      expect(userService.isUsernameUsed).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith(true);
    });
  });

  test("should checkPassword() give back whether the password is correct or not", () => {
    const password = "asdsad232";
    const id = 2;

    const req = mockRequest({
      body: { id, password },
    });

    return userController.checkPassword(req, res, next).then(() => {
      expect(userService.checkPassword).toBeCalledWith(id, password);
      expect(userService.checkPassword).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith(true);
    });
  });
});
