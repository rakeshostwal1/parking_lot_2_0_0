const commandReader = require('readline')
const ParkingLot = require("./parkingLot");

const main = async () => {
    const commandLine = commandReader.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    console.log('Please enter command')
    const parkingLot = new ParkingLot();

    commandLine.on("line", async (inputRequest) => {
        if (inputRequest) {
            const input = inputRequest.toString()
            const inputList = input.split(" ");
            if (inputList && inputList.length > 0) {
                const requstedCommand = inputList[0]
                const inputValues = inputList.splice(1, inputList.length);
                if (requstedCommand == 'create_parking_lot') {
                    result = parkingLot.createParking(inputValues[0]).then(result  => {
                        console.log(result)
                    });
                }
            } else {
                console.log('Please enter valid command')
            }
        } else {
            console.log('Please enter command')
        }
    })
}

main()