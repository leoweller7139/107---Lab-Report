var express = require("express");
var app = express(); // create an app
var itemList = [];
var ItemDB;
var MessageDB;

/*******************************************************************
** CONFIGURATION
*******************************************************************/

// Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Rquested-With, Content-Type, Accept");
    next();
});

// config body-parse to read info in request
var bparser = require("body-parser");
app.use(bparser.json());

// to server static files (css, js , img, pdfs)
app.use(express.static(__dirname + '/public'));

// to server HTML
var ejs = require('ejs');
app.set('views', __dirname + '/public'); // where are the HTML files?
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

// MongoDB connection config
var mongoose = require('mongoose');
mongoose.connect("mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin");
var db = mongoose.connection;

/*******************************************************************
** Web Server Endpoints
*******************************************************************/


app.get('/', (req, res) => {
    console.log("Someone wants to get to the root page!");
    res.render('catalog.html');
    //res.send("Hello my friend!");
});

app.get('/contact', (req, res) => {
    console.log("Someone wants to get to the contact page!");
    res.render('contact.html');
    //res.send("Hello my friend!");
});

/* app.use(express.static(__dirname + 'C:/Users/lw713/Desktop/SDGKU/107/S2/'));

app.get('*', function(req, res){
  res.sendFile('C:/Users/lw713/Desktop/SDGKU/107/S2/index.html');
}); */

app.get('/about', (req, res) => {
    //res.send("<h1 style='color:red;'> You have discovered ME: Leonardo Weller");
    console.log("A discovery has been made");
    res.render('about.html');
});

app.get('/exc/:message', (req, res) => {
    console.log("Message from client: ", req.params.message);

    var msj = req.params.message;
    var vowels ='';
    // A string for an array that contains all vowels
    var allVowels = ['a', 'e', 'i', 'o', 'u', 'y']; // The [ ] key is for arrays
    // Travel the msj string and print on the console each letter
    for(var i=0; i < msj.length; i++){
        var letter = msj[i];
        console.log(letter);
        // Check if each letter is a vowel
        // if it is, add the vowls to the vowels string
        if(allVowels.indexOf(letter) != -1){ // != -1 double negative
            vowels += letter;
        }
        // Filter, you need to either return true, or false for each value.

    }



    res.status(202);
    res.send(vowels);
});

///////////////////////////////////////////////////////////////////////////////////////
//// API End Points (Application, Programming, Interface)

app.post('/api/items', (req, res) => {
    console.log("Clients want to store Items");

    //var item = req.body;
    //item.id = itemList.length + 1; // create a consecutive id
    //itemList.push(item);
    var itemForMongo = ItemDB(req.body);
    itemForMongo.save(
        function(error, savedItem){
            if(error){
                console.log("**Error saving Item", error);
                res.status(500); // Internal Server Error
                res.send(error);
            }

            // no error:
            console.log("Item Saved!!!");
            res.status(201); // created
            res.json(savedItem);
        }
    );
});

app.get('/api/items/:id', (req, res) => {
    var id = req.params.id;

    ItemDB.find({}, function(error, item){
        if(error){
            res.status(500);
            res.send(error);
        }

        res.status(200);
        res.json(item);
    });
});

app.post('/api/messages', (req, res) => {
    var messageForMongo = MessageDB(req.body);
    messageForMongo.save( function(error, savedMessage){
        if(error){
            res.status(500);
            res.send(error);
        }

        console.log("Message Saved!");
        res.status(201);
        res.json(savedMessage);
    });
});

app.get('/api/items', (req, res) => {
    var id = req.params.id;

    ItemDB.find({_id: id}, function(error, item){
        if(error){
            res.status(500);
            res.send(error);
        }

        res.status(200);
        res.json(item);
    });
});

app.get('/api/items/byName/:name', (req, res) =>{
    var id = req.params.id;

    ItemDB.find({ user: name }, function(error, item){
        if(error){
            res.status(500);
            res.send(error);
        }

        res.status(200);
        res.json(item);
    });
});

app.delete('/api/items', (req, res) => {
    var item=req.body;

    ItemDB.findByIdAndRemove(item._id, function(error){
        if(error){
            res.status(404);
            res.send(error);
        }
        res.status(200);
        res.send("Item Removed!");
    });
});

    //res.status(201); // 201 => created
    //res.send("OK");
    //res.json(item); // return the item as json
app.get('/api/items', (req, res) => {
    res.json(itemList);
});

////////////////////////////////////////////////////////////
// Connection to the Database!----------------
db.on('open', function(){
    console.log("Yeeaa! DB connection succeed");

    /*
        Data types allowed for schemas:
        String, Number, Date, Buffer, Boolean, ObjectId, Array
    */


    // Define structure (models) for the objects on each collection
    var itemsSchema = mongoose.Schema({
        code: String,
        description: String,
        price: Number,
        image: String,
        category: String,
        stock: Number,
        deliveryDays: Number,
        user: String
    });

    var messageSchema = mongoose.Schema({
        name:  String,
        message: String
    });

    // schema2
    // schema3


    // create constructor (mongoose model)
    ItemDB = mongoose.model("itemsCh6", itemsSchema);
    MessageDB - mongoose.model("messagesCh6", messageSchema);
    // create model2
    // create model3
});

db.on('error', function(){
    console.log("Error connection to DB");
    console.log(error);
});
///////////////////////////////////////////////////////////////////////////////////////
// This is the basics of running a server--------------------
app.listen(8080, function(){
    console.log("Server running at http://localhost:8080");
    console.log("Press Ctrl+C to kill it");
});
/////////////////////////////////////////////////////////////
