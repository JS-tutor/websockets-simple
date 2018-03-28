class Ticker {
	constructor(name) {
		this._name = name
		this._tick = 0
	}

	// returns name
	get name() {
		return this._name
	}

	// returns tick
	get tick() {
		return this._tick
	}

	// returns tick and inc it
	inc() {
		return this._tick++
	}
}

module.exports = {Ticker}