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
        vote : 7,
        voted : 3,
        color: '#b53471',
        value: Math.floor(3/7*100),
        candidates: [],
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

    console.log(Voting.abi);
    const contractAdress = '0x2b3f27bcb4f121df5b1047841516fccbd9a32989';
    const myContract = new web3.eth.Contract(Voting.abi,contractAdress);
    var candidate =[{
      name :"",
      voted :0,
      value :0
    }];
    var allvote = await myContract.methods.getNumOfVoters().call({
      from :this.state.account
    })
    var ca1 = await myContract.methods.getCandidate(0).call({
      from : this.state.account
    })
    var voted = await myContract.methods.totalVotes(0).call({
      from : this.state.account
    })
    var all = web3.utils.hexToNumber(allvote._hex)
    this.setState({allvote: all})
    candidate[0].name = ca1[1];
    candidate[0].voted = web3.utils.hexToNumber(voted._hex);
    candidate[0].value = Math.floor(candidate[0].voted / all *100);
    this.setState({candidates : candidate})
  }


  render() {
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
            <div className="vote_box">
              <div className="head_vote">
                <span>
                  <img className="avatar" src="https://picsum.photos/200/300" alt="Logo" />
                </span>
              </div>
              <div className="candidates">
                <p>{this.state.candidates[0].name}</p>
              </div>
              <div className="button_vote">
                <button className="button">VOTE</button>
              </div>
              <div className="progress-bar">
                <div className="bar">
                  <div className="backgroundbar" style={{'width': this.state.candidates[0].value + '%'}}>
                  </div>
                  <div style={{'backgroundColor': '#d3d3d3', 'width': (100-this.state.candidates[0].value) + '%'}}>
                  </div>
                </div>
              </div>
              <div className="score">
                <p>{this.state.candidates[0].value}%</p>
                <p>{this.state.candidates[0].voted}/{this.state.allvote}</p>
              </div>
            </div>
          </div>
        </div>
        );
      }else{
        return(
          <div>

          </div>
        )
      }
  }
}

export default App;
