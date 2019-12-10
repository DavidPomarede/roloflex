const program = require('commander');
// Require logic.js file and extract controller functions using JS destructuring assignment
const { addContact, getContact } = require('./logic');


program
  .version('0.0.1')
  .description('Contact management system');

program
  .command('*')
  .description('no arg')
  .action(console.log("Arguments: \n a [FirstName LastName Phone Email] adds a contact\n r [queryString] retrieves a contact\n Command-c to quit.")
);

program
  .command('addContact <firstame> <lastname> <phone> <email>')
  .alias('a')
  .description('Add a contact')
  .action((firstname, lastname, phone, email) => {
    addContact({firstname, lastname, phone, email});
  });

program
  .command('getContact <name>')
  .alias('r')
  .description('Get contact')
  .action(name => getContact(name));

program.parse(process.argv);