const UserService = require("./../../app/services/UserService");

describe("Tests for UserService", () => {
  test("1) New user creation with UserService", () => {
    const user = UserService.create(1, "carlogilmar", "Carlo");

    expect(user.id).toBe(1);
    expect(user.username).toBe("carlogilmar");
    expect(user.name).toBe("Carlo");
    expect(user.bio).not.toBeUndefined();
  });

  test("2) Get all user data in a list", () => {
    const user = UserService.create(1, "carlogilmar", "Carlo");
    const userInfoInList = UserService.getInfo(user);

    expect(userInfoInList[0]).toBe(1);
    expect(userInfoInList[1]).toBe("carlogilmar");
    expect(userInfoInList[2]).toBe("Carlo");
    expect(userInfoInList[3]).not.toBeUndefined();
  });

  test("3) Update username", () => {
    const user = UserService.create(1, "carlogilmar", "Carlo");
    UserService.updateUserUsername(user, "carlog");

    expect(user.username).toBe("carlog");
  });

  test("4) Given a list of users, get a list of usernames", () => {
    const user1 = UserService.create(1, "carlogilmar1", "Carlo");
    const user2 = UserService.create(2, "carlogilmar2", "Carlo");
    const user3 = UserService.create(3, "carlogilmar3", "Carlo");
    const usernamesList = UserService.getAllUsernames([user1, user2, user3]);

    expect(usernamesList).toContain("carlogilmar1");
    expect(usernamesList).toContain("carlogilmar2");
    expect(usernamesList).toContain("carlogilmar3");
  });
});
