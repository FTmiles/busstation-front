
const handleChange = (e, path) =>{
    const { name, value } = e.target;
    console.log("namexx", name);
    console.log("valuexx", value);

        const newData = {"info":[{"key":"Line","value":"M17-1"},{"key":"From","value":"Anykščiai"},{"key":"To","value":"Staškūniškis"},{"key":"Via","value":"KURKLIUS"},{"key":"Operator","value":"Transporto Centras"},{"key":"Route type","value":"Regional Bus"},{"key":"Anyksciu AS platform","value":"6"},{"key":"Price","value":"Ask driver"}],"routes":[{"id":1,"stopsArr":[{"id":1,"name":"Anykščių AS","coords":"","defaultOption":true},{"id":2,"name":"A. Baranausko wefgr","coords":"4geg","defaultOption":true},{"id":3,"name":"Poliklinikaf","coords":"sdfsss","defaultOption":true},{"id":4,"name":"Anykščių MSV hoe","coords":"h","defaultOption":true},{"id":5,"name":"UNDERGROUND","coords":"","defaultOption":true},{"id":6,"name":"Puntukas","coords":"","defaultOption":false},{"id":7,"name":"Gražumynas","coords":"","defaultOption":false},{"id":8,"name":"Šližiai SLITHERING SNAKE","coords":"2323X323","defaultOption":true},{"id":9,"name":"Pavirinčiai","coords":"","defaultOption":false},{"id":10,"name":"Kurkliai","coords":"","defaultOption":true},{"id":11,"name":"Moliakalnis","coords":"","defaultOption":false},{"id":12,"name":"Staškūniškis","coords":"","defaultOption":false}],"distanceMetersArr":[{"id":1,"distanceMeters":1000},{"id":2,"distanceMeters":500},{"id":3,"distanceMeters":2400},{"id":4,"distanceMeters":1400},{"id":5,"distanceMeters":2000},{"id":6,"distanceMeters":2500},{"id":7,"distanceMeters":1600},{"id":8,"distanceMeters":3000},{"id":9,"distanceMeters":2300},{"id":10,"distanceMeters":2400}],"routeNotes":""}],"name":"M17-1"};
        let currentData = newData;
    
        for (let key of path) {
          currentData = currentData[key];
            console.log(currentData);

        }
         currentData[name] = value;
        //  console.log("LALALALA", currentData[name])

    
        return newData;


    }

 handleChange({target: {name:"name", value:"troskunai"}}, ["routes", 0, "stopsArr", 1]);