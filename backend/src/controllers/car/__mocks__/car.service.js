const carService = jest.mock("./car.service");

let mockData;

carService.findById = jest.fn((id) => {
  return Promise.resolve(mockData.find((car) => car.id === id));
});

carService.create = jest.fn((car) => {
  car.id = mockData.length + 1;
  mockData.push(car);
  return Promise.resolve(car);
});

carService.delete = jest.fn((id) => {
  const index = mockData.findIndex((car) => car.id === id);
  mockData.splice(index, 1);
  return Promise.resolve({});
});

carService.update = jest.fn((id, car) => {
  const index = mockData.findIndex((car) => car.id === id);
  mockData[index] = { ...mockData[index], ...car };
  return Promise.resolve(mockData[index]);
});

carService.__setMockData = (data) => (mockData = data);

module.exports = carService;
