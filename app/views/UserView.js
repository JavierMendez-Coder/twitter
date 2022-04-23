const UserService = require("./../services/UserService");

class UserView {
  static createUser(payload) {
    const areKeysValid = (payload) => {
      // transforms the payload into an array of keys
      const keysList = Object.keys(payload);
      // stablish a list of required/must-have keys
      let requiredKeysList = ["id", "username", "name"];
      // false as default value since the payload could be empty, e.g.: payload = {};
      let areKeysValid = false;

      // loops the requiredKeysList indexes, if the requiredKeysList is empty it doesn't loop
      for (let i = 0; i < requiredKeysList.length; i++) {
        // verifies if the keysList NOT includes the current index of the requiredKeysList
        if (!keysList.includes(requiredKeysList[i])) {
          // the loop breaks since all keys are required to be included inside the keysList
          break;
        }
        // if the keysList includes the current index of the requiredKeysList the loops continues in order to verify that it also includes the rest of them
        // verifies if the loop reaches its end
        if (i === requiredKeysList.length - 1) {
          // the keys are valid. Since if one of them were missing or not included the loop would've broken, thus not allowing it to reach its end
          areKeysValid = true;
        }
      }
      // return whether the keys are valid or not
      return areKeysValid;
    };

    const areValuesValid = (payload) => {
      // transforms the payload into an array of keys
      const keysList = Object.keys(payload);
      // transforms the payload into an array of values
      const valuesList = Object.values(payload);
      // stablish a object with the expected values for each key, then transforms it into a list of entries, e.g.: entryList = [[id, 1], [name, "John"]];
      let requiredEntriesList = Object.entries({
        id: 0,
        username: "",
        name: "",
      });
      // false as default value since the payload could be empty, e.g.: payload = {};
      let areValuesValid = false;

      // loops the requiredEntriesList indexes, if the requiredEntriesList is empty it doesn't loop
      for (let i = 0; i < requiredEntriesList.length; i++) {
        // searches the index of the current requiredKey (requiredEntriesList[i][0]) in the keysList, then stores it
        const index = keysList.indexOf(requiredEntriesList[i][0]);
        // if the type of element in the valuesList with the same key as the current one (requiredEntriesList[i][0]),
        // is NOT equal to the type of the expected value (requiredEntriesList[i][1])
        if (typeof valuesList[index] !== typeof requiredEntriesList[i][1]) {
          // the loop breaks since the values must be the same type
          break;
        }
        // if the types of both elements are the same the loop continues in order to verify that the rest of them have the same value as well
        // verifies if the loop reaches its end
        if (i === requiredEntriesList.length - 1) {
          // the values are valid. Since if one match were NOT the same the loop would've broken, thus not allowing it to reach its end
          areValuesValid = true;
        }
      }
      // return whether the values are valid or not
      return areValuesValid;
    };

    if (!payload) {
      return { error: "null payload" };
    } else if (!areKeysValid(payload)) {
      return { error: "invalid key(s)" };
    } else if (!areValuesValid(payload)) {
      return { error: "invalid value(s)" };
    }
    return UserService.create(payload.id, payload.username, payload.name);
  }
}

module.exports = UserView;
