#!/usr/bin/env node

const program = require('commander');

const { prompt } = require('inquirer'); // require inquirerjs library

// Require logic.js file and extract controller functions using JS destructuring assignment
const { 
  addContact,
  getContact,
  getContactList,
  updateContact,
  deleteContact
} = require('./logic'); 


// Craft questions to present to users
const questions = [
  {
    type : 'input',
    name : 'firstname',
    message : 'Enter firstname ...'
  },
  {
    type : 'input',
    name : 'lastname',
    message : 'Enter lastname ...'
  },
  {
    type : 'input',
    name : 'phone',
    message : 'Enter phone number ...'
  },
  {
    type : 'input',
    name : 'email',
    message : 'Enter email address ...'
  }
];



program
  .version('0.0.1')
  .description('Contact management system');

program
  .command('*')
  .description('no arg')
  .action(console.log("   >>> your personal R O L O F L E X <<<\nWhat you you like to do?\n a [FirstName LastName Phone Email] add a contact\n r [queryString] retrieve a contact\n u [id] update contact\n d [id] delete contact\n l list all contacts\n Command-c to quit.")
);

program
  .command('addContact') // No need of specifying arguments here
  .alias('a')
  .description('Add a contact')
  .action(() => {
    prompt(questions).then(answers =>
      addContact(answers));
  });

program
  .command('getContact <name>')
  .alias('r')
  .description('Get contact')
  .action(name => getContact(name));

program
  .command('updateContact <_id>')
  .alias('u')
  .description('Update contact')
  .action(_id => {
    prompt(questions).then((answers) =>
      updateContact(_id, answers));
  });

program
  .command('deleteContact <_id>')
  .alias('d')
  .description('Delete contact')
  .action(_id => deleteContact(_id));

program
  .command('getContactList')
  .alias('l')
  .description('List contacts')
  .action(() => getContactList());

// Assert that a VALID command is provided 
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv);