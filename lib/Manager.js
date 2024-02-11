// Import the Employee class from the Employee module for use in this file.
const Employee = require("./Employee");

// Manager class with officenumber
class Manager extends Employee {
  constructor(name, id, email, officeNumber){
    super(name, id, email, officeNumber)
    this.officeNumber = officeNumber;
  }
  getOfficeNumber(){
    return this.officeNumber;
  }
  getRole(){
    return "Manager"
  }
}

// export module for use in other files
module.exports = Manager;