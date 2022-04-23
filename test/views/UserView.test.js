const UserView = require("./../../app/views/UserView");

describe("Tests for UserView", () => {
  test("1) Null payload", () => {
    const nullPayload = null;
    const undefinedPayload = undefined;

    const result1 = UserView.createUser(nullPayload);
    const result2 = UserView.createUser(undefinedPayload);

    expect(result1.error).toMatch(/^(null payload)$/);
    expect(result2.error).toMatch(/^(null payload)$/);
  });

  test("2) Invalid values", () => {
    const invalidIdPayload = {
      id: "1",
      username: "carlogilmar",
      name: "Carlo",
    };
    const invalidUsernamePayload = { id: 1, username: 1, name: "Carlo" };
    const invalidNamePayload = { id: 1, username: "carlogilmar", name: 1 };
    const nullUsernamePayload = { id: 1, username: null, name: "Carlo" };

    const result1 = UserView.createUser(invalidIdPayload);
    const result2 = UserView.createUser(invalidUsernamePayload);
    const result3 = UserView.createUser(invalidNamePayload);
    const result4 = UserView.createUser(nullUsernamePayload);

    expect(result1.error).toMatch(/^(invalid value\(s\))$/);
    expect(result2.error).toMatch(/^(invalid value\(s\))$/);
    expect(result3.error).toMatch(/^(invalid value\(s\))$/);
    expect(result4.error).toMatch(/^(invalid value\(s\))$/);
  });

  test("3) Invalid keys", () => {
    const repeatedKeysPayload = { id: 1, id: "carlogilmar", id: "Carlo" };
    const missingUsernameKeyPayload = { id: 1, name: "Carlo" };
    const emptyPayload = {};

    const result1 = UserView.createUser(repeatedKeysPayload);
    const result2 = UserView.createUser(missingUsernameKeyPayload);
    const result3 = UserView.createUser(emptyPayload);

    expect(result1.error).toMatch(/^(invalid key\(s\))$/);
    expect(result2.error).toMatch(/^(invalid key\(s\))$/);
    expect(result3.error).toMatch(/^(invalid key\(s\))$/);
  });

  test("4) Valid payload", () => {
    const validPayload = { id: 1, username: "carlogilmar", name: "Carlo" };
    const reversedKeysPayload = { name: "Carlo", username: "carlogilmar", id: 1 };

    const user1 = UserView.createUser(validPayload);
    const user2 = UserView.createUser(reversedKeysPayload);

    expect(user1.id).toBe(1);
    expect(user1.username).toBe("carlogilmar");
    expect(user1.name).toBe("Carlo");
    expect(user1.bio).not.toBeUndefined();

    expect(user2.id).toBe(1);
    expect(user2.username).toBe("carlogilmar");
    expect(user2.name).toBe("Carlo");
    expect(user2.bio).not.toBeUndefined();
  });
});
