const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');

//instantiating web3, and tells the instance to connect to ganache, which is a local test network
//to connect to other test networks we replace the provider which links us up to those network
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

//ganache module automatically creates a set of accounts that are in unlocked state
//unlocked account means we can freely send or receive ether w/o concerns over private keys or security 
//we can only deploy a contract when we have access to an account

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hi there!';
const UPDATED_MESSAGE = 'Bye!';

beforeEach(async () => {
  // get a list of all account
  accounts = await web3.eth.getAccounts()

  // use of those account to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
    .send({ from: accounts[0], gas: '1000000' });
})

describe('Inbox', () => {
  it('deploys a contract', () => {
    // console.log(inbox);
    assert.ok(inbox.options.address); //.ok asserts that whatever is being passed is a value that exists
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call(); //.call is to simply retrieve data from the network
    assert.equal(message, INITIAL_MESSAGE); //.equal asserts that whatever the expected message is equal to what we want
  })

  it('can change the message', async() => {
    await inbox.methods.setMessage(UPDATED_MESSAGE).send({ from: accounts[0] }); //.send is to "send transaction" to the network, which 
    const message = await inbox.methods.message().call();                        // is to modify a contract's data so we need to specify 
    assert.equal(message, UPDATED_MESSAGE);                                      // whose account is sending, which costs gas
  })
})





// class Car {
//   park() {
//     return 'stopped';
//   }

//   drive() {
//     return 'vroom';
//   }
// }

// let car;

// //this runs before any 'it' statements runs
// beforeEach(() => {
//   car = new Car();
// });

// describe('Car', () => {
//   it('can park', () => {
//     //we assert that this function will return 'stopped'
//     assert.equal(car.park(), 'stopped');
//   })

//   it('can drive', () => {
//     //we assert that this function will return 'vroom'
//     assert.equal(car.drive(), 'vroom');
//   })
// });