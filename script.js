function getAge() {
  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");

  const dayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
  const monthRegex = /^(0[1-9]|1[0-2])$/;
  var currentYear = new Date().getFullYear();
  var yearRegex = new RegExp(
    "^((19|20)\\d{2})$|^(2000)$|^((19|20)([0-9][0-9]))$"
  );

  // Hide all error messages and remove error classes
  hideError(day);
  hideError(month);
  hideError(year);

  let isValid = true;

  // Validate month
  if (month.value === "") {
    showError(month, "error-text1");
    document.getElementById("error-invalid1").style.display = "none";
    isValid = false;
  } else if (!monthRegex.test(month.value)) {
    showError(month, "error-invalid1");
    document.getElementById("error-text1").style.display = "none";
    isValid = false;
  }

  // Validate day with month check
  if (day.value === "") {
    showError(day, "error-text");
    document.getElementById("error-invalid").style.display = "none";
    isValid = false;
  } else if (
    !dayRegex.test(day.value) ||
    !isValidDay(day.value, month.value, year.value)
  ) {
    showError(day, "error-invalid");
    document.getElementById("error-text").style.display = "none";
    isValid = false;
  }

  // Validate year
  if (year.value === "") {
    showError(year, "error-text2");
    document.getElementById("error-invalid2").style.display = "none";
    isValid = false;
  } else if (
    !yearRegex.test(year.value) ||
    parseInt(year.value) > currentYear
  ) {
    showError(year, "error-invalid2");
    document.getElementById("error-text2").style.display = "none";
    isValid = false;
  }

  return isValid;
}

// Function to check if the day is valid for the given month and year
function isValidDay(day, month, year) {
  const monthInt = parseInt(month);
  const dayInt = parseInt(day);
  const yearInt = parseInt(year);

  // Handle February (considering leap years)
  if (monthInt === 2) {
    const isLeapYear =
      (yearInt % 4 === 0 && yearInt % 100 !== 0) || yearInt % 400 === 0;
    if (isLeapYear) {
      return dayInt <= 29;
    } else {
      return dayInt <= 28;
    }
  }

  // Handle months with 30 days
  if ([4, 6, 9, 11].includes(monthInt)) {
    return dayInt <= 30;
  }

  // Handle months with 31 days
  return dayInt <= 31;
}

function showError(inputElement, errorMessageId) {
  const errorMessage = document.getElementById(errorMessageId);
  errorMessage.style.display = "block";
  inputElement.classList.add("error-border");
  inputElement.previousElementSibling.classList.add("red");
}

function hideError(inputElement) {
  inputElement.classList.remove("error-border");
  inputElement.previousElementSibling.classList.remove("red");

  const errorMessages =
    inputElement.parentElement.querySelectorAll(".error-message");
  errorMessages.forEach((error) => {
    error.style.display = "none";
  });
}

function calculateAndDisplayAge() {
  if (!getAge()) {
    return;
  }

  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);

  const age = calculateAge(day, month, year);

  // Hide all elements with the class 'time'
  const timeElements = document.querySelectorAll(".time");
  timeElements.forEach((element) => {
    element.style.display = "none";
  });

  const yearResult = document.getElementById("year-result");
  const monthResult = document.getElementById("month-result");
  const dayResult = document.getElementById("day-result");
  yearResult.innerHTML = age.years;
  monthResult.innerHTML = age.months;
  dayResult.innerHTML = age.days;
}

function calculateAge(day, month, year) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
  const currentDay = currentDate.getDate();

  let yearsLived = currentYear - year;
  let monthsLived = currentMonth - month;
  let daysLived = currentDay - day;

  if (monthsLived < 0) {
    yearsLived--;
    monthsLived += 12;
  }

  if (daysLived < 0) {
    monthsLived--;
    const previousMonth = new Date(currentYear, currentMonth - 1, 0);
    daysLived += previousMonth.getDate();
  }

  return {
    years: yearsLived,
    months: monthsLived,
    days: daysLived,
  };
}
