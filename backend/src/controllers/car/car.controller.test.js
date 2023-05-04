const carController = require("./car.controller");
const createError = require("http-errors");
const carService = require("./car.service");
jest.mock("./car.service.js");
const { mockRequest, mockResponse } = require("jest-mock-req-res");

describe("CarController test", () => {
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
        id: 2,
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
        id: 3,
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
    ];

    carService.__setMockData(mockData);
    next = jest.fn();
    res = mockResponse();
  });

  test("Should findById() with valid id get car", () => {
    const VALID_CAR_ID = 2;

    const req = mockRequest({
      params: {
        id: VALID_CAR_ID,
      },
    });

    return carController.findById(req, res, next).then(() => {
      expect(carService.findById).toBeCalledWith(VALID_CAR_ID);
      expect(carService.findById).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith(
        mockData.find((car) => car.id === VALID_CAR_ID)
      );
    });
  });

  test("Should findById() with invalid id get error", () => {
    const INVALID_CAR_ID = 5;

    const req = mockRequest({
      params: {
        id: INVALID_CAR_ID,
      },
    });

    return carController.findById(req, res, next).then(() => {
      expect(carService.findById).toBeCalledWith(INVALID_CAR_ID);
      expect(carService.findById).toBeCalledTimes(1);
      expect(res.json).not.toBeCalled();
      expect(next).toBeCalledWith(
        new createError.NotFound(`Car with ${INVALID_CAR_ID} ID was not found`)
      );
    });
  });

  test("Should create() with valid car", () => {
    const VALIDCAR = {
      make: "bmw",
      model: "x5",
      price: 60000,
      fuel: "diesel",
      year: 2017,
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

    const req = mockRequest({
      body: VALIDCAR,
    });

    return carController.create(req, res, next).then(() => {
      expect(carService.create).toBeCalledWith(VALIDCAR);
      expect(carService.create).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith({
        ...VALIDCAR,
        id: mockData.length,
      });
    });
  });

  test("should delete() remove one element from the database", () => {
    const VALID_CAR_ID = 1;

    const req = mockRequest({
      params: {
        id: VALID_CAR_ID,
      },
    });

    return carController.delete(req, res, next).then(() => {
      expect(carService.delete).toBeCalledWith(VALID_CAR_ID);
      expect(carService.delete).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith({});
      expect(mockData.length).toEqual(2);
    });
  });

  test("should update() remove one element in the database", () => {
    const VALID_CAR_ID = 3;

    const UPDATE = {
      year: 2020,
    };

    const req = mockRequest({
      body: UPDATE,
      params: {
        id: VALID_CAR_ID,
      },
    });

    const UPDATEDCAR = {
      id: 3,
      make: "renault",
      model: "talisman",
      price: 20000,
      fuel: "diesel",
      year: 2020,
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
    };

    return carController.update(req, res, next).then(() => {
      expect(carService.update).toBeCalledWith(VALID_CAR_ID, UPDATE);
      expect(carService.update).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith(UPDATEDCAR);
    });
  });
});
