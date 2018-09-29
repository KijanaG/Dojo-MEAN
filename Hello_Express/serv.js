var express = require("express");
console.log("Let's find out what express is", express);

var app = express();
console.log("Let's find out what app is", app);

app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs'); 

app.get('/', function(request, response){

    console.log("The request object", request);
    console.log("The response object", response);

    response.send("<h1>Hello Express</h1>");
})

app.get('/users', function (request, response){
    var users_array = [
        {name: 'Michael', email: "michael@codingdojo.com"},
        {name: 'Jay', email: "hay@codingdojo.com"},
        {name: 'Brendan', email: "brendan@codingdojo.com"},
        {name: 'Andrew', email: "andrew@codingdojo.com"}
    ];
    response.render('users', {users: users_array});
})

app.listen(8000, function(){
    console.log("listening on port 8000")
})

// // require express
// var express = require("express");
// // path module -- try to figure out where and why we use this
// var path = require("path");
// // create the express appcopy
// var app = express();
// var bodyParser = require('body-parser');
// // use it!
// app.use(bodyParser.urlencoded({ extended: true }));
// // static content
// app.use(express.static(path.join(__dirname, "./static")));
// // setting up ejs and our views folder
// app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'ejs');
// // root route to render the index.ejs view
// app.get('/', function(req, res) {
//  res.render("index");
// })
// // post route for adding a user
// app.post('/users', function(req, res) {
//  console.log("POST DATA", req.body);
//  // This is where we would add the user to the database
//  // Then redirect to the root route
//  res.redirect('/');
// })
// // tell the express app to listen on port 8000
// app.listen(8000, function() {
//  console.log("listening on port 8000");
