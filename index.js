var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// app.use((req, res, next) => {
//     console.log("Logging...");
//     next();
// });

var https = require('https');

let body = "";

    https.get('https://d17h27t6h515a5.cloudfront.net/topher/2017/May/59121517_baking/baking.json', response => {


    response.on('data', data => {
        
        body += data.toString();

    });

    response.on('end', () => {

        const recipe = JSON.parse(body);
        recipe.forEach(function(recipe){
            console.log(recipe.name)
           // return recipe.name
        })

    });

    });


//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set static path
app.use(express.static(path.join(__dirname,'public')));

var people = [
    {
        name: 'Thadeus',
        age: 27
    }
]

app.get('/',(req, res) => {
    
    res.send(body);
});

app.listen(3000,() => {
    console.log('Server started on port 3000...');
});