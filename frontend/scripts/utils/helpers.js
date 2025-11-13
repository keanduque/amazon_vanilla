import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function getCurrentPage(url) {
  const extractUrl = url.split("/");
  const page = extractUrl[5].slice(0, -5);

  return page;
}

export const formatPrice = (price) => (Math.round(price) / 100).toFixed(2);

export const formatDate = (deliveryDays) => {
  const today = dayjs();
  const deliveryDate = today.add(deliveryDays, "day");
  const deliveryStr = deliveryDate.format("dddd, MMMM DD");

  return deliveryStr;
};
