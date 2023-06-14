// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

   addUser(name) {
    const id = ++this.currentID;
    const user = {
      id: id,
      name: name,
    };

    this.users[id] = user;
    this.follows[id] = new Set();

    return id;
  };

  getUser(userID) {
    return this.users[userID] || null;
  }

  follow(userID1, userID2) {
    if (!this.users[userID1]) return false;
    if (!this.users[userID2]) return false;

    this.follows[userID1].add(userID2);
    return true;
  }

  getFollows(userID) {
    return this.follows[userID];
  }

  getFollowers(userID) {
    let followers = new Set();
    for (let key in this.users) {
      key = +key;
      if (this.follows[key].has(userID) && key !== userID) {
        followers.add(key);
      }
    }
    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    let queue = [[userID]];
    let visited = new Set();

    let recommended = [];

    while (queue.length > 0) {
      let path = queue.shift();
      let index = path.length - 1;
      let user = path[index];

      if (!visited.has(user)) {
        visited.add(user);

        if (index > 1 && index <= degrees + 1) {
          recommended.push(user);
        }

        this.getFollows(user).forEach(
          id => queue.push([...path, id])
        );
      }
    }
    return recommended
  }
}

module.exports = SocialNetwork;