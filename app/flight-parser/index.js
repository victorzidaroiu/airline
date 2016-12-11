import processInstructions from './process-instructions';

export default(instructions) => {
  const { route, passengers, aircraft } = processInstructions(instructions);

  route.totalPassengers =
    passengers.general.length +
    passengers.airline.length +
    passengers.loyalty.length;

  route.bags = route.totalPassengers;
  route.cost = route.totalPassengers * route.costPerPassenger;
  route.revenue = passengers.general.length * route.ticketPrice;

  passengers.loyalty.forEach((passenger) => {
    let usedLoyaltyPoints = 0;
    if (passenger.usingLoyaltyPoints) {
      usedLoyaltyPoints = passenger.currentLoyaltyPoints > route.ticketPrice ?
        route.ticketPrice : passenger.currentLoyaltyPoints;
      route.revenue += route.ticketPrice - usedLoyaltyPoints;
      route.loyaltyPointsRedeemed += usedLoyaltyPoints;
    } else {
      route.revenue += route.ticketPrice;
    }

    if (passenger.usingExtraBaggage) {
      route.bags += 1;
    }
  });

  // The total adjusted revenue for the flight exceeds the total cost of the flight.
  if (route.revenue <= route.cost) {
    route.canFlightProceed = false;
  }

  // The number of passengers does not exceed the number of seats on the plane.
  if (route.totalPassengers > aircraft.numberOfSeats) {
    route.canFlightProceed = false;
  }

  // The percentage of booked seats exceeds the minimum set for the route.
  if (route.totalPassengers <=
      (route.minimumTakeoffLoadPercentage / 100) * aircraft.numberOfSeats) {
    route.canFlightProceed = false;
  }

  return ([
    route.totalPassengers,
    passengers.general.length,
    passengers.airline.length,
    passengers.loyalty.length,
    route.bags,
    route.loyaltyPointsRedeemed,
    route.cost,
    (passengers.general.length + passengers.loyalty.length + passengers.airline.length)
      * route.ticketPrice,
    route.revenue,
    route.canFlightProceed ? 'TRUE' : 'FALSE',
  ].join(' '));
};
