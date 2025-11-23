import { formatPrice } from "../../scripts/utils/helpers.js";
// Test Cases

// Group of Related Test Case = Test Suite
console.log("test suite: formatPrice");
// Basic Test Cases
console.log("Converts Cents into Dollars");
if (formatPrice(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("Works with 0");
// Edge Test Cases:
if (formatPrice(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("Rounds up to the neares cent");
if (formatPrice(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}

//------------------------------------
if (formatPrice(2000.4) === "20.00") {
  console.log("passed");
} else {
  console.log("failed");
}

if (formatPrice(-500) === "-5.00") {
  console.log("passed");
} else {
  console.log("failed");
}
