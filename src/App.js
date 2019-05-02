import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import Voting from './Voting.json'
class App extends Component {

  constructor(props){
    super(props)
    this.state ={
        account : '0x0',
        balance : '',
        color: '#b53471',
        candidates: [],
        myContract : [],
        allvote : 0
    }
  }

  async componentDidMount(){

    const web3 = await new Web3(Web3.givenProvider);

    await web3.eth.getCoinbase().then((account)=>{
      this.setState({account})
    });

    await web3.eth.getBalance(this.state.account).then((balance)=>{
        balance = web3.utils.fromWei(balance);
        this.setState({balance})
    })

    const contractAdress = '0xc586440f38420157802453185ddf1bba45d93f68';
    const myContract = new web3.eth.Contract(Voting.abi,contractAdress);
    this.setState({myContract : myContract})
    var numberOfCandidates = await myContract.methods.getNumOfCandidates().call({
      from: this.state.account
    })
    var num =web3.utils.hexToNumber(numberOfCandidates._hex)

    this.interval = setInterval(async()=>{

      var allvote = await myContract.methods.getNumOfVoters().call({
        from :this.state.account
      })
      var all = web3.utils.hexToNumber(allvote._hex)
      this.setState({allvote: all})

      var candidates = []
      for(var i = 0;i< num;i++){
        let candidate ={
          id : 0,
          name :"",
          avatar : "",
          voted :0,
          value :0
        };
        var ca1 = await myContract.methods.getCandidate(i).call({
          from : this.state.account
        })
        var voted = await myContract.methods.totalVotes(i).call({
          from : this.state.account
        })
        candidate.id = i;
        candidate.name = ca1[1];
        candidate.avatar = ca1[2];
        candidate.voted = web3.utils.hexToNumber(voted._hex);
        candidate.value = Math.floor(voted / all *100);
        candidates.push(candidate)
      }
      this.setState({candidates: candidates})
    },5000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  Vote(id){
    this.state.myContract.methods.vote(id).send({
      from: this.state.account
    })
  }

  render() {
    console.log(this.state.candidates)
    if(this.state.candidates.length > 0){
      return (
        <div className="App">
          <div >
            <p className="account">{this.state.account}</p>
            <p className="account">{this.state.balance}</p>
          </div>

          <div className="content">
            <div className="content_position">
              <h3>Who will be the president of VietNam</h3>
            </div>
          </div>

          <div className="vote_area">
            {this.state.candidates.map(candidate =>(
              <div key={candidate.id} className="vote_box">
                <div className="head_vote">
                  <span>
                    <img className="avatar" src={candidate.avatar} alt="Logo" />
                  </span>
                </div>
                <div className="candidates">
                  <p>{candidate.name}</p>
                </div>
                <div className="button_vote">
                  <button onClick={()=>this.Vote(candidate.id)} className="button">VOTE</button>
                </div>
                <div className="progress-bar">
                  <div className="bar">
                    <div className="backgroundbar" style={{'width': candidate.value + '%'}}>
                    </div>
                    <div style={{'backgroundColor': '#d3d3d3', 'width': (100-candidate.value) + '%'}}>
                    </div>
                  </div>
                </div>
                <div className="score">
                  <p>{candidate.value}%</p>
                  <p>{candidate.voted}/{this.state.allvote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        );
      }else{
        return(
          <div className="App">
            <div >
              <p className="account">{this.state.account}</p>
              <p className="account">{this.state.balance}</p>
            </div>

            <div className="content">
              <div className="content_position">
                <h3>Who will be the president of VietNam</h3>
              </div>
            </div>
          </div>
        )
      }
  }
}

export default App;
