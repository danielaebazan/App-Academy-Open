class PartyPlanner {
	constructor( guestList = []) {
		this.guestList = guestList;
	};

	addToGuestList = (name) => this.guestList.push(name);

	throwParty() {
		const numGuests = this.guestList.length;

		if (numGuests === 0) {
			return "Gotta add people to the guest list";
		} else {
			const guests = this.guestList.join(' and ');
			return `Welcome to the party ${guests}`;
		}
	}
}


/*****************************************************************************/
/***************** DO NOT MODIFY ANYTHING UNDER THIS LINE ********************/

try {
	module.exports = PartyPlanner;
} catch {
	module.exports = null;
}