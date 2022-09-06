
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')
app.use(express.json())
app.use(cors())
// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '718ef89fce8d428e96597d4894b5c892',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log('Duel Duo rollbar events')

app.get('/', function(req, res){
   try{ rollbar.log('get in the App')
    res.sendFile(path.join(__dirname,'/public/index.html'));
}
catch (error){
    console.log(error)
    rollbar.error(error)
}
 });

app.get('/styles', function(req, res) {
    try{ rollbar.log('get css')
    res.sendFile(path.join(__dirname,'/public/index.css'));
}
catch (error){
    console.log(error)
    rollbar.error(error)
}
    
});




app.get('/js', (req, res) => {
    try{rollbar.log('index.js')
    res.sendFile(path.join(__dirname, '/public/index.js'));
    }

catch (error){
    console.log(error)
    rollbar.error(error)
}

  });




app.get('/api/robots', (req, res) => {
    try {
    //    rollbar.error("bots error not defined")
        res.status(200).send(bots)
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        res.sendStatus(400)
    }
});

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        rollbar.debug(choices)
        res.status(200).send({choices, compDuo})
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
});

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        rollbar.info("determining win/loss based on", compHealthAfterAttack, playerHealthAfterAttack )
        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            res.status(200).send('You lost!')
        } else {
            playerRecord.losses++
            // To see the player wins and update score
            playerRecord.wins++
            res.status(200).send('You won!')
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        res.sendStatus(400)
    }
});

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        console.log('ERROR GETTING PLAYER STATS', error)
        res.sendStatus(400)
    }
});

app.delete('/api/player', (req, res) => {
    rollbar.critical('deleting player is not supported')
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})