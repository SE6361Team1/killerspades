export function convertToDateTime(seconds, nanoseconds) {
    // Create a new Date object using the seconds (converted to milliseconds)
    const date = new Date(seconds * 1000);
  
    // Add the nanoseconds (converted to milliseconds)
    const milliseconds = nanoseconds / 1000000;
    date.setMilliseconds(date.getMilliseconds() + milliseconds);
  
    return date;
  }

  export function createDate(dateString, timeString) {
    // Split the date string by "-"
    let dateArray = dateString.split("-");
    // Split the time string by ":"
    let timeArray = timeString.split(":");
    // Create a new Date object with the extracted values
    // Note: the month is zero-based, so subtract 1 from the month value
    let dateObject = new Date(
      dateArray[0], // year
      dateArray[1] - 1, // month
      dateArray[2], // day
      timeArray[0], // hours
      timeArray[1] // minutes
    );
    // Return the date object
    return dateObject;
  }
  