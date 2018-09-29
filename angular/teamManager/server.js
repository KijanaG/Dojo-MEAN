var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
app.all('*', (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(8000, function() {
    console.log("Listening on port 8000");
})