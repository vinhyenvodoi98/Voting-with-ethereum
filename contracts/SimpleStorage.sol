pragma solidity ^0.4.22;

contract Voting {
    event AddedCandidate(uint candidateID);

    struct Voter {
        uint candidateIDVote;
    }

    struct Candidate {
        bytes32 name;
        bool doesExist;
    }

    uint numCandidates; // declares a state variable - number Of Candidates
    uint numVoters;

    mapping (uint => Candidate) candidates;
    mapping (uint => Voter) voters;
    mapping (address => bool ) Voted;

    function addCandidate(bytes32 name) public {
        uint candidateID = numCandidates++;
        candidates[candidateID] = Candidate(name,true);
        AddedCandidate(candidateID);
    }

    function vote(uint candidateID) public {
        // checks if the struct exists for that candidate
        if (candidates[candidateID].doesExist == true) {
            if (Voted[msg.sender] == false){
                Voted[msg.sender] =true;
                uint voterID = numVoters++; //voterID is the return variable
                voters[voterID] = Voter(candidateID);
            }
        }
    }

    function totalVotes(uint candidateID) view public returns (uint) {
        uint numOfVotes = 0; // we will return this
        for (uint i = 0; i < numVoters; i++) {
            if (voters[i].candidateIDVote == candidateID) {
                numOfVotes++;
            }
        }
        return numOfVotes;
    }

    function getNumOfCandidates() public view returns(uint) {
        return numCandidates;
    }

    function getNumOfVoters() public view returns(uint) {
        return numVoters;
    }

    function getCandidate(uint candidateID) public view returns (uint,bytes32) {
        return (candidateID,candidates[candidateID].name);
    }
}