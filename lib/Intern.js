// Import the Employee class from the Employee module for use in this file.
const Employee = require("./Employee");


// Intern module with school property
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }
  getSchool() {
    return this.school;
  }
  getRole() {
    return "Intern";
  }
}

// Export module for use in other files
module.exports = Intern;
