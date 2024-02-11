const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const generateTeam = require("./src/page-template.js");
const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

let team = [];

// Questions to prompt user for Manager's details.
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
      const manager = new Manager(
        data.name,
        data.id,
        data.email,
        data.officeNumber
      );
      team.push(manager);
      menuOptions();
    });
}

function menuOptions() {
  return inquirer
    .prompt([
      {
        type: "checkbox",
        message: "Please choose from the following options",
        choices: [
          "Add an engineer",
          "Add an intern",
          "Finish building the team",
        ],
        name: "menu",
      },
    ])
    .then((data) => {
      switch (data.action) {
        case "Add an engineer":
          engineerInfo();
          break;
        case "Add an intern":
          internInfo();
          break;
        case "Finish building the team":
          break;
          
      }
      generateTeam(team);
    });
}

// Questions to prompt user for Engineer's details.
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
  const engineer = new Engineer(data.name,
    data.id,
    data.email,
    data.github
  );
  team.push(engineer);
  menuOptions();
})
};


// Questions to prompt user for Intern's details.
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
  const intern = new Engineer(data.name,
    data.id,
    data.email,
    data.school
  );
  team.push(intern);
  menuOptions();
})
};

// function to write README file
function writeToFile(fileName, managerd) {
  return writeFileAsync(fileName, generateTeam(managerd));
}

// function to initialize program
function init() {
  inquirer
    .prompt(questions)
    .then((data) => {
      const managerd = new Manager(
        data.name,
        data.id,
        data.email,
        data.officeNumber
      );
      // return managerd
      // ;})
      // .prompt(engineerQuestions)
      // .then((data) =>{
      //   const engineer = new Engineer(data.name, data.id, data.email, data.github)

      return writeToFile("./output/index.html", managerd);
    })
    .then(() => console.log("Successfully wrote to the readme file"))
    .catch((err) => console.log(err));
}

// function call to initialize program
init();
