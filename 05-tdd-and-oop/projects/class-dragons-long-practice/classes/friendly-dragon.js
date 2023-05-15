const Dragon = require('/Users/danielabazan/Documents/App-Academy/practice-for-week-04-class-dragons-long-practice/classes/dragon.js')

class FriendlyDragon extends Dragon {
    constructor(name, color, lifeGoals= [], friend) {
        super(name, color);
        this.lifeGoals = lifeGoals;
        this.friend = friend;
    }; 

    hasLifeGoals() {
        for (let i = 0; i < this.lifeGoals.length; i++){
            let lifeGoal = this.lifeGoals[i];
            console.log(`${this.name} likes to ${lifeGoal}`)
        };
    };

    helpsPeople() {
        return `${this.name} helps their friend ${this.friend}`
    };
};

module.exports = FriendlyDragon;