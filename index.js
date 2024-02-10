const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const generateTeam = require("./src/page-template.js")
const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// Questions to prompt user for Manager's details.
const questions = [
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
    name: "OfficeNumber",
  },
];



// function to write README file
function writeToFile(fileName, team) {
  return writeFileAsync(fileName, generateTeam(team));
}

// function to initialize program
function init() {
  inquirer
    .prompt(questions)
    .then((data) => {
      return writeToFile("./output/index.html", data);
    })
    .then(() => console.log("Successfully wrote to the readme file"))
    .catch((err) => console.log(err));
}

// function call to initialize program
init();