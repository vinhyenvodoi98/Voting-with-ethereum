#Secure Voting System using Ethereum's Blockchain

**App Interface**

![App_interface](https://github.com/vinhyenvodoi98/Voting-with-ethereum/tree/master/image/image_2019_4_26.png)

Essentially, a great decentralized application utilizing blockchain technology allows you perform the same actions you would today (like transferring money) without a trusted third party. The best dApps have a specific real world use-case that leverages the unique characteristics of blockchain.

Voting app with blockchain technology behind a good example  because the main issues blockchain solves — transparency, security, accessibility, audibility — are the main problems plaguing current democratic elections.

## Prerequisites

* Node.js 10.x.x
* npm 6.x.x

This project using React and Truffle to deploy contract

## Install

Using terminal

    npm install

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `compile contract`
    yarn truffle compile

### `deploy contract to ropsten`

    yarn truffle migrate -f 2 --network ropsten

### or `deploy contract to rinkebys`

    yarn truffle migrate -f 2 --network rinkebys