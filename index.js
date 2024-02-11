const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// Code to gather information about the development team members, and render the HTML file.

// initiate array to store individual member's information
let team = [];

// function to prompt user to get Manager's details.
function managerInfo() {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Team Manager's name?",
        name: "name",
      },
      {
        type: "input",
        message: "Please enter the Manager's employer ID",
        name: "id",
      },
      {
        type: "input",
        message: "Please input the Manager's Email Address",
        name: "email",
      },
      {
        type: "input",
        message: "Please input the Manager's Office Number",
        name: "officeNumber",
      },
    ])
    .then((data) => {

      // create a new instance of the manager class extending from employee class
      const manager = new Manager(
        data.name,
        data.id,
        data.email,
        data.officeNumber
      );

      // push details into array
      team.push(manager);

      // call menu function to display the options to gather more employee details
      menuOptions();
    });
}


// Function to display options for creating more profiles
function menuOptions() {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "Please choose from the following options to build your team profile.",
        choices: [
          "Add an engineer",
          "Add an intern",
          "Finish building the team",
        ],
        name: "menu",
      },
    ])
    .then((data) => {

      // check which list item has been selected and display the corresponding function
      switch (data.menu) {
        case "Add an engineer":
          engineerInfo();
          break;
        case "Add an intern":
          internInfo();
          break;
        case "Finish building the team":
          console.log("Your team's profile is now ready to view")

          // write the html file based on information gathered
          return writeFileAsync(outputPath, render(team))
        }
      
    });
}

// function to prompt user for Engineer's details.
function engineerInfo () {
  return inquirer.prompt([
  {
    type: "input",
    message: "What is the Engineer's name?",
    name: "name",
  },
  {
    type: "input",
    message: "Please enter the Engineer's employer ID",
    name: "id",
  },
  {
    type: "input",
    message: "Please input the Engineer's Email Address",
    name: "email",
  },
  {
    type: "input",
    message: "Please input the Engineer's GitHub username",
    name: "github",
  },
])
.then(data => {

  // new instance of the engineer class created
  const engineer = new Engineer(data.name,
    data.id,
    data.email,
    data.github
  );

  // engineer's information pushed into team array
  team.push(engineer);

  // display menu options
  menuOptions();
})
};


// function to prompt user for Intern's details.
function internInfo () {
  return inquirer.prompt([
  {
    type: "input",
    message: "What is the Interns's name?",
    name: "name",
  },
  {
    type: "input",
    message: "Please enter the Intern's employer ID",
    name: "id",
  },
  {
    type: "input",
    message: "Please input the Intern's Email Address",
    name: "email",
  },
  {
    type: "input",
    message: "Please input the Intern's school",
    name: "school",
  },
])
.then(data => {

  // new instance of the employee class created with intern information
  const intern = new Intern (data.name,
    data.id,
    data.email,
    data.school
  );

  // intern details pushed into team array
  team.push(intern);

  // display menu options
  menuOptions();
})
};

// function call to start the application
managerInfo()