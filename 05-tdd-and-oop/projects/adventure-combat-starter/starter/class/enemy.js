const { Character } = require('./character');
const { Player } = require('./player')


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.cooldown = 3000;
    this.items = [];
    this.attackTarget = null;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomRoom(key) {
    return this.currentRoom.exits[key[key.length * Math.random() << 0]]
  };

  randomMove() {
    let key = Object.keys(this.currentRoom.exits);
    this.currentRoom = this.randomRoom(key);
    this.cooldown += 3000;
    this.act();
  }

  takeSandwich() {
    let sandwichIdx = this.currentRoom.items.indexOf(sandwich);
    const sandwich = this.currentRoom.items.splice(sandwichIdx, 1);
    if (sandwich) {
      this.items.push(sandwich);
      this.cooldown += 3000;
      console.log("The enemy took your sandwich!");
    }
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = () => {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    if (this.attackTarget === null) return null;

    this.attackTarget.applyDamage(this.strength);
    console.log(`The ${this.name} hits you for ${this.strength} damage.`);
    this.cooldown += 3000;
    this.act();
  }

  applyDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
    } else {
      this.attackTarget = this.player;
      this.act();
    }
  };

  act() {
    const rand = Math.floor(Math.random() * 5);

    if (this.health <= 0 || (this.player && this.player.currentRoom != this.currentRoom)) {
      // Do nothing
    } else if (this.cooldown > 0) {
      this.rest();
    }
    else if (this.attackTarget) {
      this.attack();
    }
    else {
      if (rand > 2) {
        this.scratchNose();
      } else if (this.currentRoom.items.length > 0) {
        this.takeSandwich();
      } else if (rand === 1) {
        this.attackTarget = this.player;
        this.act();
      } else {
        this.randomMove();
      }
    }
  };

  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }
}

module.exports = {
  Enemy,
};
