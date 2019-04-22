// use this file to deploy smartcontract to ropsten 

pragma solidity >=0.4.21 <0.6.0;

contract SimpleStorage {    
    uint value;

    function set(uint x) public {
        value = x;
    }

    function get() public view returns (uint) {
        return value;
    }
}