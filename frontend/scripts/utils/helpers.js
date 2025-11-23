import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function getCurrentPage(url) {
  const extractUrl = url.split("/");
  const page = extractUrl[5].slice(0, -5);

  return page;
}

export const formatPrice = (price) => {
  return (Math.round(price) / 100).toFixed(2);
};

export const formatDate = (deliveryDays) => {
  const today = dayjs();
  const deliveryDate = today.add(deliveryDays, "day");
  const deliveryStr = deliveryDate.format("dddd, MMMM DD");

  return deliveryStr;
};

export function calculateDeliveryDate(deliveryDays) {
  let remainingDays = deliveryDays;
  let deliveryDate = dayjs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, "day");

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  const dateString = deliveryDate.format("dddd, MMMM D");

  return dateString;
}

const today = dayjs();

export function isWeekend(date) {
  const daysOfWeek = date.format("dddd");
  return daysOfWeek === "Saturday" || daysOfWeek === "Sunday";
}

// Test this function using a few different dates.
let date = dayjs();
// console.log(isWeekend(date));

// date = dayjs().add(2, "day");
// console.log(date.format("dddd, MMMM D"));
// console.log(isWeekend(date));

// date = dayjs().add(4, "day");
// console.log(date.format("dddd, MMMM D"));
// console.log(isWeekend(date));

// date = dayjs().add(6, "day");
// console.log(date.format("dddd, MMMM D"));
// console.log(isWeekend(date));
