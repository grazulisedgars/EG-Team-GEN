const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMembers = [];

// Prompt questions for Manager
function promptManager() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is the team manager's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the team manager's id?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the team manager's email?",
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the team manager's office number?",
        },
    ])
    .then((answers) => {
        const manager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            answers.officeNumber
        );
        // All the answers pushed to teamMembers array identified above
        teamMembers.push(manager);
        // Calls for menu function to choose wether to add more information
        menu();
    })

}

// Prompt questions for Engineer 
function promptEngineer() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is engineer's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is your engineer's ID?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your engineer's email?",
        },
        {
            type: "input",
            name: "github",
            message: "What is your engineer's Github username?",
        },
    ])
    .then((answers) => {
        const engineer = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.github
        );
        // All the answers pushed to teamMembers array identified above
        teamMembers.push(engineer);
        menu();
    })

}

// Prompt questions for Intern
function promptIntern() {
    inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is your intern's name?",
        },
        {
            type: "input",
            name: "id",
            message: "What is your intern's ID?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your intern's email?",
        },
        {
            type: "input",
            name: "school",
            message: "What is your intern's school?",
        },
    ])
    .then((answers) => {
        // Creates a new variable intern
        const intern = new Intern(
          answers.name,
          answers.id,
          answers.email,
          answers.school
        );
        // Answers pushed to teamMembers array above 
        teamMembers.push(intern);
        // Calls for menu function
        menu();
      });
};

// Menu function gives us a list to choose from then aswers calls for prompts or exits and calls for generateHTML()
function menu() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "menu",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer", "Intern", "I don't want to add anymore team members"],
        },
    ])
    .then((answers) => {
        switch (answers.menu) {
            case "Engineer" :
                promptEngineer();
                break;
            case "Intern" :
                promptIntern();
                break;
            case "I don't want to add anymore team members" :
                generateHTML();
                break;
                default:
                break;
        }
    });
}

// Function generates HTML files and writes it to output directory
function generateHTML() {
    const output = render(teamMembers);

    // Make sure the output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath,output, err => {
        err ? console.error(`error! ${err}`) : console.log ("All done!");
    });
}

//Starts the application
promptManager();

