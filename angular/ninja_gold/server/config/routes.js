const golds = require('../controllers/golds.js');
module.exports = function(app){
    app.get('/golds',function(req, res){
        console.log("WHYNOT");
        golds.removeAll(req, res);
    });
    app.get('/golds/:location', function(req, res){
        if(req.params.location == 0){
            golds.createFarm(req, res);
          } else if(req.params.location == 1){
            golds.createCave(req, res);
          } else if(req.params.location == 2){
            golds.createHouse(req, res);
          } else {
            golds.createCasino(req, res);
          }
    });
}