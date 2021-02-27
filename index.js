const fs = require('fs'),
    readLine = require('readline');

var commandLineInputs = process.argv; // processing command line inputs

const ParkingLot = require('./parkingLot');
const parkingLot = new ParkingLot();

if (commandLineInputs[commandLineInputs.length - 1].endsWith('.txt')) {
    fs.readFile(commandLineInputs[2], 'utf-8', function (err, data) {
        if (err) {
            console.log('Error in reading file');
        }
        var commands = data.split('\n');
        for (var i = 0; i < commands.length; i++) {
            executeUserCommand(commands[i]);
        }

        // return to console once all the inputs are processed
        process.exit(1);
    });
} else {
    console.log('Please enter command')

    const commandLine = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    commandLine.on("line", async (inputRequest) => {
        executeUserCommand(inputRequest)
    })
}

function executeUserCommand(inputRequest) {
    if (inputRequest) {
        const inputList = inputRequest.toString().split(" ");
        if (inputList && inputList.length > 0) {
            const requstedCommand = inputList[0]
            const inputValues = inputList.splice(1, inputList.length);
            var result = '';
            if (requstedCommand == 'create_parking_lot') {
                result = parkingLot.createParking(inputValues)
            } else if (requstedCommand == 'park') {
                var result = parkingLot.allocatedParking(inputValues);
            } else if (requstedCommand == 'leave') {
                var result = parkingLot.removeCar(inputValues);
            } else if (requstedCommand == 'status') {
                var result = parkingLot.getStatus();
            } else {
                console.log('Please enter valid command')
            }
            console.log(result)
        } else {
            console.log('Please enter valid command')
        }
    } else {
        console.log('Please enter valid command')
    }
}