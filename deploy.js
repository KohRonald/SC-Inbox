require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  process.env.INFURA_LINK
);
const web3 = new Web3(provider);

const INITIAL_MESSAGE = 'Hi there!';

const deploy = async () => {

  try{
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);
  
    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
      .send({ gas: '1000000', from: accounts[0] });
  
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop(); // this line prevents a hanging deployment
  } catch(err) {
    console.log(err);
  }
};
deploy();

