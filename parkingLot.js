class ParkingLot {
    constructor() {
        this.totalCapacity = 0
        this.allocatedParkings = []
        this.unallocatedParkings = []
    }

    createParking(capacity) {
        if (!capacity || isNaN(capacity) || capacity < 1) {
            return 'Invalid capacity entered, please try again with valid capacity'
        }
        this.totalCapacity = capacity[0]
        this.allocatedParkings = []
        this.unallocatedParkings = []
        // initialize unallocated parking stands
        for (var index = 1; index <= this.totalCapacity; index++) {
            this.unallocatedParkings.push(index)
        }

        return `Created parking lot with ${this.totalCapacity} slots`
    }

    allocatedParking(carNumber) {
        if (!carNumber || carNumber.length <=0) {
            return 'Invalid details, please try again with valid card details'
        }

        if (this.totalCapacity < 1) {
            return 'You have not created a parking station, please create a parking station using `create_parking_lot <number>` command'
        }

        if (this.totalCapacity == this.allocatedParkings.length) {
            return "Sorry, parking lot is full";
        }

        const [slotNumber] = this.searchCar(carNumber[0]);
        // Car with same Registration number cannot be parked
        if (slotNumber > 0) {
            return `Error!! Car with Registration number ${carNumber[0]} is already parked`;
        }

        const parkingSlot = this.unallocatedParkings[0];
        this.allocatedParkings.splice(parkingSlot - 1, 0, {
            slot: parkingSlot,
            registrationNumber: carNumber[0]
        });
        this.unallocatedParkings.shift();

        return `Allocated slot number: ${parkingSlot}`;
    }

    removeCar(carDetails) {
        if (!carDetails || carDetails.length < 2) {
            return 'Invalid details, please try again with valid card details'
        }

        if (this.totalCapacity < 1) {
            return 'You have not created a parking station, please create a parking station using `create_parking_lot <number>` command'
        }

        const [slotNumber, allocatedSlotIndex] = this.searchCar(carDetails[0]);
        if (slotNumber == 0) {
            return `Registration number ${carDetails[0]} not found`;
        }

        this.allocatedParkings.splice(allocatedSlotIndex, 1);
        this.unallocatedParkings.push(slotNumber);
        this.unallocatedParkings.sort();
        const charge = this.getCharge(carDetails[1]);
        return `Registration number ${carDetails[0]} with Slot Number ${slotNumber} is free with Charge ${charge}`;
    }

    getCharge(hours) {
        return hours <= 2 ? 10 : 10 + (hours - 2) * 10;
    }

    searchCar(registrationNumber) {
        let allocatedSlotIndex = 0;
        let slotNumber = 0;
        this.allocatedParkings.map((car, slot) => {
            if (registrationNumber == car.registrationNumber) {
                allocatedSlotIndex = slot
                slotNumber = car.slot;
            }
        });
        return [slotNumber, allocatedSlotIndex];
    }

    getStatus() {
        const StringBuilder = require("string-builder");

        if (this.totalCapacity < 1) {
            return 'You have not created a parking station, please create a parking station using `create_parking_lot <number>` command'
        }

        if (this.allocatedParkings.length > 0) {
            const sb = new StringBuilder();
            sb.append("Slot No.    Registration No.")
            this.allocatedParkings.forEach(car => {
                sb.appendLine()
                sb.append(`${car.slot}           ${car.registrationNumber}`)
            });

            return sb.toString()
        } else {
            return 'No Cars parked'
        }
    }
}

module.exports = ParkingLot;