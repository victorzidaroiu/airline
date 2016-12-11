export default (instructions) => {
  const aircraft = {};
  const route = {
    canFlightProceed: true,
    loyaltyPointsRedeemed: 0,
  };
  const passengers = {
    general: [],
    airline: [],
    loyalty: [],
  };

  instructions.forEach((instruction) => {
    const params = instruction.split(' ');
    switch (params[1]) {
      case 'route':
        route.origin = params[2];
        route.destination = params[3];
        route.costPerPassenger = parseInt(params[4], 10);
        route.ticketPrice = parseInt(params[5], 10);
        route.minimumTakeoffLoadPercentage = parseInt(params[6], 10);
        break;

      case 'aircraft':
        aircraft.aircraftTitle = params[2];
        aircraft.numberOfSeats = parseInt(params[3], 10);
        break;

      case 'general':
      case 'airline':
        passengers[params[1]].push({
          firstName: params[2],
          age: params[3],
        });
        break;

      case 'loyalty':
        passengers[params[1]].push({
          firstName: params[2],
          age: parseInt(params[3], 10),
          currentLoyaltyPoints: parseInt(params[4], 10),
          usingLoyaltyPoints: params[5] === 'TRUE',
          usingExtraBaggage: params[6] === 'TRUE',
        });
        break;
      default:
    }
  });

  return {
    route,
    passengers,
    aircraft,
  };
};
