const chai = require("chai");
const ParkingLot = require("../parkingLot");
const parkingLot = new ParkingLot();
const StringBuilder = require("string-builder");

describe(`park without car number`, () => {
    it(`should give error for try parking car without car number`, () => {
        const res = parkingLot.allocatedParking();
        chai.expect(res).to.be.equal("Invalid details, please try again with valid card details");
    });
});

describe(`park KA-01-HH-1123 before creating parking lot`, () => {
    it(`should give error for try parking car without parking lot`, () => {
        const res = parkingLot.allocatedParking(['KA-01-HH-1123']);
        chai.expect(res).to.be.equal("You have not created a parking station, please create a parking station using `create_parking_lot <number>` command");
    });
});

describe(`leave KA-01-HH-1123 before creating parking lot`, () => {
    it(`should give error for try removing car without parking lot`, () => {
        const res = parkingLot.removeCar(['KA-01-HH-1123', '4']);
        chai.expect(res).to.be.equal("You have not created a parking station, please create a parking station using `create_parking_lot <number>` command");
    });
});

describe(`Create Parking lot with number slots`, () => {
    it(`should give error for try creating parking lot without number of slots`, () => {
        var res = parkingLot.createParking();
        chai.expect(res).to.be.equal(`Invalid capacity entered, please try again with valid capacity`);
    });
});

describe(`Create Parking lot with 6 slots`, () => {
    it(`should creating parking lot with 6 slots`, () => {
        var res = parkingLot.createParking([6]);
        chai.expect(res).to.be.equal(`Created parking lot with 6 slots`);
    });
});

describe(`Status when no cars parked`, () => {
    it(`Should return no car parked`, () => {
        var res = parkingLot.getStatus()
        chai.expect(res).to.be.equal("No Cars parked")
    })
})

describe(`park KA-01-HH-1234`, () => {
    it(`should park car at slot number 1`, () => {
        const res = parkingLot.allocatedParking(['KA-01-HH-1234']);
        chai.expect(res).to.be.equal(`Allocated slot number: 1`);
    });
});

describe(`park KA-01-HH-9999`, () => {
    it(`should park car at slot number 2`, () => {
        const res = parkingLot.allocatedParking(['KA-01-HH-9999']);
        chai.expect(res).to.be.equal(`Allocated slot number: 2`);
    });
});

describe(`park KA-01-HH-9999`, () => {
    it(`should not park car with duplicate car number`, () => {
        const res = parkingLot.allocatedParking(['KA-01-HH-9999']);
        chai.expect(res).to.be.equal(`Error!! Car with Registration number KA-01-HH-9999 is already parked`);
    });
});

describe(`park KA-01-BB-0001`, () => {
    it(`should park car at slot number 3`, () => {
        const res = parkingLot.allocatedParking(['KA-01-BB-0001']);
        chai.expect(res).to.be.equal(`Allocated slot number: 3`);
    });
});

describe(`park KA-01-HH-7777`, async () => {
    it(`should park car at slot number 4`, () => {
        const res = parkingLot.allocatedParking(['KA-01-HH-7777',]);
        chai.expect(res).to.be.equal(`Allocated slot number: 4`);
    });
});

describe(`park KA-01-HH-2701`, () => {
    it(`should park car at slot number 5`, async () => {
        const res = parkingLot.allocatedParking(['KA-01-HH-2701']);
        chai.expect(res).to.be.equal(`Allocated slot number: 5`);
    });
});

describe(`park KA-01-HH-3141`, () => {
    it(`should park car at slot number 6`, () => {
        const res = parkingLot.allocatedParking(['KA-01-HH-3141']);
        chai.expect(res).to.be.equal(`Allocated slot number: 6`);
    });
});

describe(`leave KA-01-HH-3141 4`, () => {
    it(`should free slot number 6 car with registration number KA-01-HH-3141 for 4 hours parking with charge 30`, () => {
        const res = parkingLot.removeCar(['KA-01-HH-3141', '4']);
        chai.expect(res).to.be.equal(`Registration number KA-01-HH-3141 with Slot Number 6 is free with Charge 30`);
    });
});

describe(`status`, () => {
    it(`should show all car status in parking lot`, () => {
        const expectedSB = new StringBuilder();
        expectedSB.append("Slot No.    Registration No.")
        expectedSB.appendLine("1           KA-01-HH-1234")
        expectedSB.append()
        expectedSB.appendLine("2           KA-01-HH-9999")
        expectedSB.append()
        expectedSB.appendLine("3           KA-01-BB-0001")
        expectedSB.append()
        expectedSB.appendLine("4           KA-01-HH-7777")
        expectedSB.append()
        expectedSB.appendLine("5           KA-01-HH-2701")

        const res = parkingLot.getStatus();

        chai.expect(res).to.be.equal(expectedSB.toString());
    });
});

describe(`park KA-01-P-333`, () => {
    it(`should park car at slot number 6`, async () => {
        const res = parkingLot.allocatedParking(['KA-01-P-333']);
        chai.expect(res).to.be.equal(`Allocated slot number: 6`);
    });
});

describe(`park DL-12-AA-9999`, () => {
    it(`should fail to allocate the car to parking lot since parking lot is full`, () => {
        const res = parkingLot.allocatedParking(['DL-12-AA-9999']);
        chai.expect(res).to.be.equal(`Sorry, parking lot is full`);
    });
});

describe(`leave KA-01-HH-1234 4`, () => {
    it(`should free slot number 1 car with registration number KA-01-HH-1234 for 4 hours parking with charge 30`, () => {
        const res = parkingLot.removeCar(['KA-01-HH-1234', '4']);
        chai.expect(res).to.be.equal(`Registration number KA-01-HH-1234 with Slot Number 1 is free with Charge 30`);
    });
});

describe(`leave KA-01-BB-0001 6`, () => {
    it(`should free slot number 3 car with registration number KA-01-BB-0001 for 6 hours parking with charge 50`, () => {
        const res = parkingLot.removeCar(['KA-01-BB-0001', '6']);
        chai.expect(res).to.be.equal(`Registration number KA-01-BB-0001 with Slot Number 3 is free with Charge 50`);
    });
});

describe(`leave DL-12-AA-9999 2`, () => {
    it(`should give error for leave car because car with registration number DL-12-AA-9999 is not found`, () => {
        const res = parkingLot.removeCar(['DL-12-AA-9999', '2']);
        chai.expect(res).to.be.equal(`Registration number DL-12-AA-9999 not found`);
    });
});

describe(`park KA-09-HH-0987`, () => {
    it(`should park car at slot number 1`, () => {
        const res = parkingLot.allocatedParking(['KA-09-HH-0987']);
        chai.expect(res).to.be.equal(`Allocated slot number: 1`);
    });
});

describe(`park CA-09-IO-1111`, () => {
    it(`should park car at slot number 3`, () => {
        const res = parkingLot.allocatedParking(['CA-09-IO-1111']);
        chai.expect(res).to.be.equal(`Allocated slot number: 3`);
    });
});

describe(`park KA-09-HH-0123`, () => {
    it(`should fail to allocate the car to parking lot since parking lot is full`, () => {
        const res = parkingLot.allocatedParking(['KA-09-HH-0123']);
        chai.expect(res).to.be.equal(`Sorry, parking lot is full`);
    });
});

describe(`status`, () => {
    it(`should show all car status in parking lot`, () => {
        const expectedSB = new StringBuilder();
        expectedSB.append("Slot No.    Registration No.")
        expectedSB.appendLine("1           KA-09-HH-0987")
        expectedSB.append()
        expectedSB.appendLine("2           KA-01-HH-9999")
        expectedSB.append()
        expectedSB.appendLine("3           CA-09-IO-1111")
        expectedSB.append()
        expectedSB.appendLine("4           KA-01-HH-7777")
        expectedSB.append()
        expectedSB.appendLine("5           KA-01-HH-2701")
        expectedSB.append()
        expectedSB.appendLine("6           KA-01-P-333")

        const res = parkingLot.getStatus();
        chai.expect(res).to.be.equal(expectedSB.toString());
    });
});
