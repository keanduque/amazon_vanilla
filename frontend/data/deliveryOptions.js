export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOptions(deliveryOptionId) {
  let matchingDeliveryOption;

  deliveryOptions.forEach((deliveryOption) => {
    if (deliveryOption.id === deliveryOptionId) {
      matchingDeliveryOption = deliveryOption;
    }
  });
  return matchingDeliveryOption || deliveryOptionId[0];
}

export function validDeliveryOption(deliveryOptionId) {
  let found = false;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      found = true;
    }
  });

  return found;
}
