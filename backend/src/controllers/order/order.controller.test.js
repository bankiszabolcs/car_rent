const orderController = require("./order.controller");
const createError = require("http-errors");
const orderService = require("./order.service");
jest.mock("./order.service.js");
const { mockRequest, mockResponse } = require("jest-mock-req-res");
const Order = require("../../models/order.model");
const Car = require("../../models/car.model");
const User = require("../../models/user.model");
const mongoose = require("mongoose");

describe("OrderController test", () => {
  let mockData;
  let res;
  let next;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    mockData = [
      {
        userId: "1",
        carId: "1",
        date: "2023. 03. 19.",
        startDate: "2023-03-22T23:00:00.000Z",
        endDate: "2023-03-29T22:00:00.000Z",
        duration: 7,
        price: 280000,
        id: 1,
      },
      {
        userId: "2",
        carId: "1",
        date: "2023-03-19T18:37:26.085Z",
        startDate: "2023-03-14T23:00:00.000Z",
        endDate: "2023-03-22T23:00:00.000Z",
        duration: 9,
        price: 360000,
        id: 2,
      },
      {
        userId: "1",
        carId: "1",
        date: "2023-03-19T18:37:26.085Z",
        startDate: "2023-03-14T23:00:00.000Z",
        endDate: "2023-03-22T23:00:00.000Z",
        duration: 9,
        price: 360000,
        id: 3,
      },
      {
        userId: "3",
        carId: "1",
        date: "2023-03-19T18:37:26.085Z",
        startDate: "2023-03-14T23:00:00.000Z",
        endDate: "2023-03-22T23:00:00.000Z",
        duration: 9,
        price: 360000,
        id: 4,
      },
    ];

    orderService.__setMockData(mockData);
    next = jest.fn();
    res = mockResponse();
  });

  test("Should findById() with valid id get order", () => {
    const VALID_ORDER_ID = 2;

    const req = mockRequest({
      params: {
        id: VALID_ORDER_ID,
      },
    });

    return orderController.findById(req, res, next).then(() => {
      expect(orderService.findById).toBeCalledWith(VALID_ORDER_ID);
      expect(orderService.findById).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith(
        mockData.find((order) => order.id === VALID_ORDER_ID)
      );
    });
  });

  test("Should findByUserID()", () => {
    const USER_ID = "1";

    const req = mockRequest({
      params: {
        userId: USER_ID,
      },
    });

    return orderController.findByUserId(req, res, next).then(() => {
      expect(orderService.findByUserId).toBeCalledWith(USER_ID);
      expect(orderService.findByUserId).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith(
        mockData.filter((order) => order.userId === USER_ID)
      );
    });
  });

  test("Should findById() with invalid id get error", () => {
    const INVALID_ORDER_ID = 7;

    const req = mockRequest({
      params: {
        id: INVALID_ORDER_ID,
      },
    });

    return orderController.findById(req, res, next).then(() => {
      expect(orderService.findById).toBeCalledWith(INVALID_ORDER_ID);
      expect(orderService.findById).toBeCalledTimes(1);
      expect(res.json).not.toBeCalled();
      expect(next).toBeCalledWith(
        new createError.NotFound(
          `Order with ${INVALID_ORDER_ID} ID was not found`
        )
      );
    });
  });

  test("Should create() with valid order", async () => {
    const VALIDORDER = {
      userId: "641c66cd65e3a80c7774b77d",
      carId: "641c5a5565e3a80c7748e30c",
      date: "2023-03-18T23:00:00.000Z",
      startDate: "2023-03-22T23:00:00.000Z",
      endDate: "2023-03-29T22:00:00.000Z",
    };

    const mockValidateSync = jest.fn(() => undefined);

    jest
      .spyOn(Order.prototype, "validateSync")
      .mockImplementation(mockValidateSync);

    const req = mockRequest({
      body: VALIDORDER,
    });

    return orderController.create(req, res, next).then(() => {
      expect(orderService.create).toBeCalledWith(VALIDORDER);
      expect(orderService.create).toBeCalledTimes(1);
      expect(mockValidateSync).toHaveBeenCalledTimes(1);
      expect(res.json).toBeCalledWith({
        ...VALIDORDER,
        id: mockData.length,
      });
    });
  });

  test("should delete() remove one element from the database", () => {
    const VALID_ORDER_ID = 1;

    const oldLength = mockData.length;

    const req = mockRequest({
      params: {
        id: VALID_ORDER_ID,
      },
    });

    return orderController.delete(req, res, next).then(() => {
      expect(orderService.delete).toBeCalledWith(VALID_ORDER_ID);
      expect(orderService.delete).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith({});
      expect(mockData.length).toEqual(oldLength - 1);
    });
  });

  test("should update() update one element in the database", () => {
    const VALID_ORDER_ID = 2;

    const UPDATE = {
      date: "2023-03-10T18:37:26.085Z",
    };

    const req = mockRequest({
      body: UPDATE,
      params: {
        id: VALID_ORDER_ID,
      },
    });

    const UPDATEDORDER = {
      userId: "2",
      carId: "1",
      date: "2023-03-10T18:37:26.085Z",
      startDate: "2023-03-14T23:00:00.000Z",
      endDate: "2023-03-22T23:00:00.000Z",
      duration: 9,
      price: 360000,
      id: 2,
    };

    return orderController.update(req, res, next).then(() => {
      expect(orderService.update).toBeCalledWith(VALID_ORDER_ID, UPDATE);
      expect(orderService.update).toBeCalledTimes(1);
      expect(res.json).toBeCalledWith(UPDATEDORDER);
    });
  });
});
