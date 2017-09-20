var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var validator = require('express-validator');
var mongojs = require('mongojs')
var db = mongojs('familyapp', ['siblings'])
var ObjectId = mongojs.ObjectId;

var app = express();
var fam;

//View engine middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set static path
app.use(express.static(path.join(__dirname,'public')));

//Global variables
app.use((req,res,next) => {
    res.locals.errors = null;
    next();
})

//Validator middleware
app.use(validator({
    errorFormatter: (param,message,value) => {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg : message,
            value : value
        };
    }
}));

app.get('/',(req, res) => {
    // find everything
    db.siblings.find().sort({first_name: 1},function (err, docs) {
        // docs is an array of all the documents in mycollection
        fam = docs;
        res.render('index', {
            title: "Family List",
            fam: fam
        });
    })
});

app.post('/users/add',(req,res) => {
   
    req.checkBody('firstName', 'Field cannot be empty').notEmpty();
    req.checkBody('lastName', 'Field cannot be empty').notEmpty();
    req.checkBody('email', 'Enter correct email format').isEmail();

    var errors = req.validationErrors();

    if (errors) {
        //This is the data that is processed to the view in the render
        res.render('index', {
            title: "Family List",
            fam: fam,
            errors : errors
        });
    }   else {
        var newFam = {
            first_name : req.body.firstName,
            last_name : req.body.lastName,
            email : req.body.email
        }

        db.siblings.insert(newFam,(err,docs) => {
            res.redirect('/');
        })

        console.log ("Success");
    }

});

app.delete('/users/delete/:id', (req, res) => {

    db.siblings.remove({_id: ObjectId(req.params.id)}, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
    });
})

app.listen(3000,() => {
    console.log('Server started on port 3000...');
});