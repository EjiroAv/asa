const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


var input = [];
rl.question("Enter 2D array that represents the rows and columns For example : [[3,4],[4,5],[2,3],[3,4]]:", (inputArray) => {
  var input = JSON.parse(inputArray);
  rl.question("Enter Number of passengers wai:ng in queue: ", function (passengers) {
    //Get the Maximum   Rows
    var maximumRowSize = Math.max.apply(
      Math,
      input.map((e) => e[0])
    );
    //Get the Maximum Column
    var maximumColumnSize = Math.max.apply(
      Math,
      input.map((e) => e[1])
    );



    //Identify seats
    var airplaneSeats = identifyWindowAisleAndMiddleairplaneSeats(input);

    function identifyWindowAisleAndMiddleairplaneSeats(array) {
      var airplaneSeats = [];
      for (var i = 0; i < array.length; i++)
        airplaneSeats.push(
          Array(array[i][1])
            .fill()
            .map(() => Array(array[i][0]).fill("M"))   //Identifies the middle seats
        );



      for (var i = 0; i < airplaneSeats.length; i++) {
        for (var j = 0; j < airplaneSeats[i].length; j++) {
          airplaneSeats[i][j][0] = "A";
          airplaneSeats[i][j][airplaneSeats[i][j].length - 1] = "A"; //Identifies the Aisle seats
        }
      }


      for (var i = 0; i < airplaneSeats[0].length; i++) airplaneSeats[0][i][0] = "W";
      for (var i = 0; i < airplaneSeats[airplaneSeats.length - 1].length; i++)    //Identifies the Window Seats
        airplaneSeats[airplaneSeats.length - 1][i][airplaneSeats[airplaneSeats.length - 1][i].length - 1] = "W";

      return airplaneSeats;
    }


   
    airplaneSeats = AllocateSeats().airplaneSeats;

    function AllocateSeats() {
      var seatObject = { airplaneSeats: airplaneSeats, counter: 1 };

      seatObject = fillSeatWithSeatPassenger("A", 1, airplaneSeats, maximumColumnSize, maximumRowSize); //Fills the Aisle Seats with respective passengers
      seatObject = fillSeatWithSeatPassenger("W", seatObject.counter, seatObject.airplaneSeats, maximumColumnSize, maximumRowSize); //Fills the Window Seats with respective passengers
      seatObject = fillSeatWithSeatPassenger("M", seatObject.counter, seatObject.airplaneSeats, maximumColumnSize, maximumRowSize); //Fills the Middle Seats with respective passengers


      return seatObject;
    }

    //Allocate Passenger to Appropraite Seat
    function fillSeatWithSeatPassenger(val, counter, airplaneSeats, maximumColumnSize, maximumRowSize) {
      for (var i = 0; i < maximumColumnSize; i++) {
        for (var j = 0; j < maximumRowSize; j++) {
          if (airplaneSeats[j] == null || airplaneSeats[j][i] == null) continue;
          for (k = 0; k < airplaneSeats[j][i].length; k++) {
            if (airplaneSeats[j] != null && airplaneSeats[j][i] != null && airplaneSeats[j][i][k] === val) {
              if (counter <= passengers) {
                airplaneSeats[j][i][k] = counter;
                counter++;
              } else {
                airplaneSeats[j][i][k] = "E";
                counter++;
              } [[3, 2], [4, 3], [2, 3], [3, 4]]
            }
          }
        }
      }

      return { airplaneSeats: airplaneSeats, counter: counter };
    }



    //Display Result
    printResult(airplaneSeats, maximumColumnSize, maximumRowSize);

    function printResult(airplaneSeats, maximumColumnSize, maximumRowSize) {
      var result = "";

      for (var i = 0; i < maximumColumnSize; i++) {
        for (var j = 0; j < maximumRowSize; j++) {
       
          if (airplaneSeats[j] == null || airplaneSeats[j][i] == null) {
            result += "[--] [--] [--]" + " ";
            continue;
          }
          for (k = 0; k < airplaneSeats[j][i].length; k++) {
            result += "[" + airplaneSeats[j][i][k] + "]" + " ";
          }

          result += ",";
        }

        result += "\n";
      }


      console.log(result);
    }

    rl.close();
  });
});


