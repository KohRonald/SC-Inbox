
const path = require('path');
 //helps to build a path from current compile.js file over to Inbox.sol file
 //Using this instead of writing the path directly is so that ensure cross-platform compatiblity
 //So that Linux, windows, etc. machines will guaranteed be calling correctly
const fs = require('fs'); 
const solc = require('solc');

//this path diects to the contract which is the root directory/contracts/Inbox.sol
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

//this reads source code from contract file
const source = fs.readFileSync(inboxPath, 'utf8');

//the number specified indicates the number of different contracts that we are attempting to compile
//in the logs, bytecode is the code that is going to be deployed on to the Ethereum Network
//in the logs, interface is the ABI, which is the interface layer between Solidity and Javascript
console.log(solc.compile(source, 1));

//we do this to export the compiled contract, which is a big object, grabbing only the key value pair of ':Inbox'
module.exports = solc.compile(source, 1).contracts[':Inbox'];
