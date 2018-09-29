const mongoose = require('mongoose');
const Gold = mongoose.model('Gold');
module.exports = {
    createFarm: function (req, res) {
            var gold = Math.floor(Math.random() * 11 + 10);
            if (gold % 2 == 0) {
                gold = new Gold({ verdict: "You earned " + gold + " gold at the Farm.",gold:gold});
                gold.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        Gold.find({}, function (err, gold) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json({ message: "Success", gold: gold })
                            }
                        });
                    }
                });
            } else {
                gold = new Gold({ verdict: "You lost " + gold + " gold at the Farm.",gold:gold*-1});
                gold.save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        Gold.find({}, function (err, gold) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json({ message: "Success", gold: gold })
                            }
                        });
                    }
                });
            }
        },
    createCave: function (req, res) {
        var gold = Math.floor(Math.random() *6 + 5);
        if (gold % 2 == 0) {
            gold = new Gold({ verdict: "You earned " + gold + " gold at the Cave.", gold:gold});
            gold.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    Gold.find({}, function (err, gold) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ message: "Success", gold: gold })
                        }
                    });
                }
            });
        } else {
            gold = new Gold({ verdict: "You lost " + gold + " gold at the Cave.",gold:gold*-1 });
            gold.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    Gold.find({}, function (err, gold) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ message: "Success", gold: gold })
                        }
                    });
                }
            });
        }
    },
    createHouse: function (req, res){
        var gold = Math.floor(Math.random() *4 + 2);
        if (gold % 2 == 0) {
            gold = new Gold({ verdict: "You earned " + gold + " gold at the House.",gold:gold});
            gold.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    Gold.find({}, function (err, gold) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ message: "Success", gold: gold })
                        }
                    });
                }
            });
        } else {
            gold = new Gold({ verdict: "You lost " + gold + " gold at the House.", gold:gold*-1});
            gold.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    Gold.find({}, function (err, gold) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ message: "Success", gold: gold })
                        }
                    });
                }
            });
        }
    },
    createCasino: function (req, res) {
        var gold = Math.floor(Math.random() *51);
        if (gold % 2 == 0) {
            gold = new Gold({ verdict: "You earned " + gold + " gold at the Casino.",gold:gold});
            gold.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    Gold.find({}, function (err, gold) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ message: "Success", gold: gold })
                        }
                    });
                }
            });
        } else {
            gold = new Gold({ verdict: "You lost " + gold + " gold at the Casino.",gold:gold*-1});
            gold.save(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    Gold.find({}, function (err, gold) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json({ message: "Success", gold: gold })
                        }
                    });
                }
            });
        }
    },
    removeAll: function(req, res){
        Gold.remove({},function(err){
            if(err){
                console.log(err);
                res.json({message:"Error", Error:err});
            } else {
                res.json({message:"Fresh"});
            }
        });
    }
}