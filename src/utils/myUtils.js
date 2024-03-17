export function dateToString (date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1 and pad with '0' if needed
    const day = String(date.getDate()).padStart(2, '0'); // Pad with '0' if needed

    return `${year}-${month}-${day}`
}


export function hasEmptyFields(obj, exception) {
    // Base case: If obj is not an object, return true if it's null, undefined, or an empty string
    if (typeof obj !== 'object' || obj === null) {
      return obj === null || obj === undefined || obj === '';
    }
    
    // Recursive case: Check each property in the object
    for (let key in obj) {
      //exception
      if (key === exception) continue;

      // If the value is null, undefined, or an empty string, return true
      if (obj.hasOwnProperty(key) && (obj[key] === null || obj[key] === undefined || obj[key] === '')) {
        return true;
      }
      
      // If the value is an object or array, recursively check it
      if (typeof obj[key] === 'object' && hasEmptyFields(obj[key])) {
        return true;
      }
    }
    
    // If no null, undefined, or empty string value is found, return false
    return false;
  }


  export const lineInfoLabel = {
    routeStart: "From",
    routeEnd: "To",
    via: "Via",
    operator: "Operator",
    anykStationPlatform: "Anyksciu AS platform",
    price: "Price",
    routeType: "Route type"
  }

  export function validateInteger(value) {
    console.log("validating integer now_--", value);
    // Check if the value is a valid integer
    const intValue = parseInt(value);
    console.log("validation returning value:", isNaN(intValue) ? "" : intValue);

    return isNaN(intValue) ? "" : intValue;
  }

  export   const dateRegex = /^\d{4}-\d{2}-\d{2}$/;