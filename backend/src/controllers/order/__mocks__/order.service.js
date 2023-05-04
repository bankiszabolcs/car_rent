const orderService = jest.mock("./order.service");

let mockData;

orderService.findById = jest.fn((id) => {
  return Promise.resolve(mockData.find((order) => order.id === id));
});

orderService.findByUserId = jest.fn((userId) => {
  return Promise.resolve(mockData.filter((order) => order.userId === userId));
});

orderService.create = jest.fn((order) => {
  order.id = mockData.length + 1;
  mockData.push(order);
  return Promise.resolve(order);
});

orderService.delete = jest.fn((id) => {
  const index = mockData.findIndex((order) => order.id === id);
  mockData.splice(index, 1);
  return Promise.resolve({});
});

orderService.deleteMany = jest.fn((ids) => {
  ids.forEach((id) => {
    const index = mockData.findIndex((order) => order.id === id);
    mockData.splice(index, 1);
  });
  return Promise.resolve({});
});

orderService.update = jest.fn((id, order) => {
  const index = mockData.findIndex((order) => order.id === id);
  mockData[index] = { ...mockData[index], ...order };
  return Promise.resolve(mockData[index]);
});

orderService.__setMockData = (data) => (mockData = data);

module.exports = orderService;
