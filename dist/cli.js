import inquirer from 'inquirer';

const hasWhiteSpace = (input) => {
    return /\s/g.test(input);
};
const isUpperCaseLetter = (letter) => {
    return letter === letter.toUpperCase();
};

// default values for unspecified args
async function promptOptions() {
    const questions = [
        {
            type: "input",
            name: "componentName",
            message: "Please provider component name ",
            validate(input) {
                if (hasWhiteSpace(input)) {
                    return "Component name contains white space, please fix";
                }
                if (!isUpperCaseLetter(input[0])) {
                    return "Component name must start with uppercase letter, please fix";
                }
                return true;
            },
        },
        {
            type: "list",
            name: "template",
            message: "Which type of component",
            choices: [
                { name: "Default", value: "default" },
                { name: "Custom", value: "custom" },
            ],
        },
    ];
    // questions.push({
    //   type: "list",
    //   name: "template",
    //   message: "Please choose which project template to use",
    //   choices: [
    //     { name: "JavaScript", value: "javascript" },
    //     { name: "TypeScript", value: "typescript" },
    //   ],
    //   default: defaultOptions.template,
    // });
    const answers = await inquirer.prompt(questions);
    return answers;
}

async function cli(args) {
    const options = await promptOptions();
    console.log(options);
}

export { cli };
