const userService = jest.mock("./user.service");

let mockData;

userService.findById = jest.fn((id) => {
  return Promise.resolve(mockData.find((user) => user.id === id));
});

userService.create = jest.fn((user) => {
  mockData.push(user);
  return Promise.resolve(user);
});

userService.delete = jest.fn((id) => {
  const index = mockData.findIndex((user) => user.id === id);
  mockData.splice(index, 1);
  return Promise.resolve({});
});

userService.update = jest.fn((id, user) => {
  const index = mockData.findIndex((user) => user.id === id);
  mockData[index] = { ...mockData[index], ...user };
  return Promise.resolve(mockData[index]);
});

userService.isEmailUsed = jest.fn((email) => {
  const emailFound = mockData.filter((user) => user.email === email);
  return Promise.resolve(emailFound.length);
});

userService.isUsernameUsed = jest.fn((username) => {
  const usernameFound = mockData.filter((user) => user.username === username);
  return Promise.resolve(usernameFound.length);
});

userService.checkPassword = jest.fn((id, password) => {
  const passwordCorrect = mockData.filter(
    (user) => user.id === id && user.password === password
  );
  return Promise.resolve(Boolean(passwordCorrect.length));
});

userService.__setMockData = (data) => (mockData = data);

module.exports = userService;
