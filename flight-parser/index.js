'use strict';

module.exports = function (lines, callback) {
	var debug = require('debug')('airline');

	var route = {
		canFlightProceed: true,
		loyaltyPointsRedeemed: 0
	},
	    output = [],
	    aircraft = {};
	var passengers = {
		general: [],
		airline: [],
		loyalty: []
	};

	//process the data
	lines.forEach(processLine);

	route.totalPassengers = passengers.general.length + passengers.airline.length + passengers.loyalty.length;
	route.bags = route.totalPassengers;
	route.cost = route.totalPassengers * route.costPerPassenger;

	//calculate revenue and bags
	route.revenue = passengers.general.length * route.ticketPrice;
	passengers.loyalty.forEach(function (passenger) {
		var usedLoyaltyPoints = 0;
		if (passenger.usingLoyaltyPoints) {
			usedLoyaltyPoints = passenger.currentLoyaltyPoints > route.ticketPrice ? route.ticketPrice : passenger.currentLoyaltyPoints;
			route.revenue += route.ticketPrice - usedLoyaltyPoints;
			route.loyaltyPointsRedeemed += usedLoyaltyPoints;
		} else route.revenue += route.ticketPrice;

		if (passenger.usingExtraBaggage) route.bags += 1;
	});

	//check flight rules

	//The total adjusted revenue for the flight exceeds the total cost of the flight.
	if (route.revenue <= route.cost) route.canFlightProceed = false;

	//The number of passengers does not exceed the number of seats on the plane.
	if (route.totalPassengers > aircraft.numberOfSeats) route.canFlightProceed = false;

	//The percentage of booked seats exceeds the minimum set for the route.
	if (route.totalPassengers <= route.minimumTakeoffLoadPercentage / 100 * aircraft.numberOfSeats) route.canFlightProceed = false;

	//output the data
	callback([route.totalPassengers, passengers.general.length, passengers.airline.length, passengers.loyalty.length, route.bags, route.loyaltyPointsRedeemed, route.cost, (passengers.general.length + passengers.loyalty.length + passengers.airline.length) * route.ticketPrice, route.revenue, route.canFlightProceed ? 'TRUE' : 'FALSE'].join(' '));

	function processLine(line) {
		line = line.split(' ');
		switch (line[1]) {
			case 'route':
				route.origin = line[2];
				route.destination = line[3];
				route.costPerPassenger = parseInt(line[4]);
				route.ticketPrice = parseInt(line[5]);
				route.minimumTakeoffLoadPercentage = parseInt(line[6]);
				break;

			case 'aircraft':
				aircraft.aircraftTitle = line[2];
				aircraft.numberOfSeats = parseInt(line[3]);
				break;

			case 'general':
			case 'airline':
				passengers[line[1]].push({
					firstName: line[2],
					age: line[3]
				});
				break;

			case 'loyalty':
				passengers[line[1]].push({
					firstName: line[2],
					age: parseInt(line[3]),
					currentLoyaltyPoints: parseInt(line[4]),
					usingLoyaltyPoints: line[5] === 'TRUE' ? true : false,
					usingExtraBaggage: line[6] === 'TRUE' ? true : false
				});
				break;
		}
	}
};
