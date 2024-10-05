pragma solidity ^0.4.17; //This specifies the version of solidity being used

contract Inbox{
    string public message; //Define variable name of message, type string, and public which allow anyone to use

    function Inbox(string initalMessage) public {
        message = initalMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }
}