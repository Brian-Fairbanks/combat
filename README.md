# Dice Rollerz
![travis badge](https://img.shields.io/travis/Brian-Fairbanks/TV-Tracker)

## Description
<img src="https://raw.githubusercontent.com/Brian-Fairbanks/DiceRollerz/master/client/public/icons/DRZ.png" align="right" alt="Dice Rollerz Logo by Brian Fairbanks" width="150" height="150">
This untitled project is designed to facilitate D&D online gameplay, including

### Character Sheet - in progress
Creation of multiple character sheets per player, with:
- Automatic updating of the character sheet
- Homebrew Class Creation/selection
- Homebrew Item creation/selection
- Homebrew Feat/Trait creation/selection

### Battle Map - Planning Stages
implementing socket.io to allow multiple users to control their individual game tokens in an online battle simulation


## Table of Contents
* [License](#license)
* [Scripts](#Scripts)
* [Dependencies](#dependencies)
* [Verfification](#verfification)
* [Testing](#tests)
* [Account Handling](#accounts)
* [Credits](#contributing)
* [Testing](#tests)
* [Questions](#questions)
* [Demo](#demo)

## License

<details open>
<summary>MIT License</summary>
<br>
Copyright 2020 Brian Fairbanks

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</details>


## Scripts
### Install
    npm install
### Run (production)
    npm start
### Build
    npm run build

## Dependencies


## Verfification
Travis

## Accounts
### Security
Account passwords are salted, hashed, and stored privately, with the help of the ByCrypt Package
### Persistance
Accounts, on log in, are assigned a JSON Web Token, which may be presented for up to one year.
This is stored in the browsers local storage, and compared each login to mainain a persistant login session.

## Contributing
Members Contributing on this project:
* [Brian Fairbanks](https://github.com/Brian-Fairbanks)



## Questions
If you have any questions about this application, feel free to reach out to one of our members below:

<img src="https://avatars0.githubusercontent.com/u/59707181?v=4" height="32" width="32"> | brian.k.fairbanks@gmail.com


## Demo
Deployed to Heroku:
* Staging: https://dice-rollerz-stg.herokuapp.com/
* Production: https://dice-rollerz.herokuapp.com/


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
