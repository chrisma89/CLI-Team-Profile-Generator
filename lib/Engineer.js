// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

// Import the Employee class from the Employee module for use in this file.
const Employee = require("./Employee");


// Engineer class with github property
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }
  getGithub() {
    return this.github;
  }
  getRole() {
    return "Engineer";
  }
}

// Export module for use in other files
module.exports = Engineer;
