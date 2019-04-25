pragma solidity ^0.4.24;

contract Voting {
    event AddedCandidate(uint candidateID);

    struct Voter {
        uint candidateIDVote;
    }

    struct Candidate {
        string name;
        bool doesExist;
    }

    uint numCandidates; // declares a state variable - number Of Candidates
    uint numVoters;

    mapping (uint => Candidate) candidates;
    mapping (uint => Voter) voters;
    mapping (address => bool ) Voted;

    function addCandidate(string name) public {
        uint candidateID = numCandidates++;
        candidates[candidateID] = Candidate(name,true);
        emit AddedCandidate(candidateID);
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

    function getCandidate(uint candidateID) public view returns (uint,string) {
        return (candidateID,candidates[candidateID].name);
    }
}