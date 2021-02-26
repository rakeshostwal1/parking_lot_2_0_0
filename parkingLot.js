class ParkingLot {
    constructor() {
        this.totalCapacity = 0
        this.allocatedParkings = []
        this.unallocatedParkings = []
    }

    async createParking(capacity) {
        if (!capacity || capacity < 1) {
            return 'Invalid capacity entered, please try again with valid capacity.'
        }
        this.totalCapacity = capacity
        this.allocatedParkings = []
        this.unallocatedParkings = []
        // initialize unallocated parking stands
        for (var index = 0; index < capacity; index++) {
            this.unallocatedParkings.push(index)
        }

        return `Created parking lot with ${capacity} slots`
    }
}

module.exports = ParkingLot;