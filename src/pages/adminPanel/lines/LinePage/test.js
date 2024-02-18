function hasEmptyFields(obj, exception) {
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

let myObj = {
    "info": [
        {
            "key": "Line",
            "value": "M22"
        },
        {
            "key": "From",
            "value": "ANYKŠČIAI"
        },
        {
            "key": "To",
            "value": "VARKUJAI "
        },
        {
            "key": "Via",
            "value": "DEBEIKIUS, AKNYSTAS"
        },
        {
            "key": "Operator",
            "value": "Transporto Centras"
        },
        {
            "key": "Route type",
            "value": "Regional Bus"
        },
        {
            "key": "Anyksciu AS platform",
            "value": "3"
        },
        {
            "key": "Price",
            "value": "Ask driver"
        }
    ],
    "routes": [
        {
            "id": 3,
            "stopsArr": [
                {
                    "id": 65,
                    "name": "Varkujai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 64,
                    "name": "Šližiai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 62,
                    "name": "Aknystų kr.",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 63,
                    "name": "Aknystos",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 62,
                    "name": "Aknystų kr.",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 61,
                    "name": "Jurzdikas",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 60,
                    "name": "Debeikiai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 59,
                    "name": "Meldučiai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 58,
                    "name": "Kalveliai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 57,
                    "name": "Čekonys II",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 56,
                    "name": "Čekonys I",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 55,
                    "name": "Vosgėliai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 54,
                    "name": "S.Elmininkai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 53,
                    "name": "Bikūnai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 52,
                    "name": "Elmininkai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 51,
                    "name": "SB ,,Voruta“",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 50,
                    "name": "Stadijonas",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 49,
                    "name": "A.Vienuolio prog.",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 2,
                    "name": "A. Baranausko a.",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 1,
                    "name": "Anykščių AS",
                    "coords": "",
                    "defaultOption": true
                }
            ],
            "distanceMetersList": [
                1500,
                1500,
                900,
                900,
                1100,
                1900,
                1500,
                1600,
                2500,
                1100,
                2600,
                1700,
                3000,
                1300,
                1000,
                1900,
                1000,
                500,
                500
            ],
            "routeNotes": "main"
        },
        {
            "id": 4,
            "stopsArr": [
                {
                    "id": 1,
                    "name": "Anykščių AS",
                    "coords": "",
                    "defaultOption": true
                },
                {
                    "id": 2,
                    "name": "A. Baranausko a.",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 49,
                    "name": "A.Vienuolio prog.",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 50,
                    "name": "Stadijonas",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 51,
                    "name": "SB ,,Voruta“",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 52,
                    "name": "Elmininkai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 53,
                    "name": "Bikūnai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 55,
                    "name": "Vosgėliai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 56,
                    "name": "Čekonys I",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 57,
                    "name": "Čekonys II",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 58,
                    "name": "Kalveliai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 59,
                    "name": "Meldučiai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 60,
                    "name": "Debeikiai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 61,
                    "name": "Jurzdikas",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 62,
                    "name": "Aknystų kr.",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 63,
                    "name": "Aknystos",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 62,
                    "name": "Aknystų kr.",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 64,
                    "name": "Šližiai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 65,
                    "name": "Varkujai",
                    "coords": "",
                    "defaultOption": false
                }
            ],
            "distanceMetersList": [
                500,
                500,
                1000,
                1900,
                1000,
                1300,
                1700,
                2600,
                1100,
                2500,
                1600,
                1500,
                1900,
                1100,
                900,
                900,
                1500,
                1500
            ],
            "routeNotes": "be S.Elmininku"
        },
        {
            "id": 5,
            "stopsArr": [
                {
                    "id": 1,
                    "name": "Anykščių AS",
                    "coords": "",
                    "defaultOption": true
                },
                {
                    "id": 2,
                    "name": "A. Baranausko a.",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 49,
                    "name": "A.Vienuolio prog.",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 50,
                    "name": "Stadijonas",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 51,
                    "name": "SB ,,Voruta“",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 52,
                    "name": "Elmininkai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 53,
                    "name": "Bikūnai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 55,
                    "name": "Vosgėliai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 56,
                    "name": "Čekonys I",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 57,
                    "name": "Čekonys II",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 58,
                    "name": "Kalveliai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 59,
                    "name": "Meldučiai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 60,
                    "name": "Debeikiai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 61,
                    "name": "Jurzdikas",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 62,
                    "name": "Aknystų kr.",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 64,
                    "name": "Šližiai",
                    "coords": "",
                    "defaultOption": false
                },
                {
                    "id": 65,
                    "name": "Varkujai",
                    "coords": "",
                    "defaultOption": false
                }
            ],
            "distanceMetersList": [
                500,
                500,
                1000,
                1900,
                1000,
                1300,
                1700,
                2600,
                1100,
                2500,
                1600,
                1500,
                1900,
                1100,
                1500,
                1500
            ],
            "routeNotes": "be S. Elmininku, Aknystos, Aknystu kr."
        }
    ],
    "name": "M22"
}



console.log(hasEmptyFields(myObj, "coords"));