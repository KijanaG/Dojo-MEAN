function Ninja(name){
    this.name = name;
    this.health = 100;
    var speed = 3;
    var strength = 3;
    this.sayName = function(){
        console.log("My name is",this.name);
    }
    this.showStats = function(){
        console.log("Name: ", this.name,", Health: ", this.health, ", Speed: ",speed, ", Strength: ", strength)
    }
    this.drink = function(){
        this.health += 10;
    }
    this.kick = function(ninja){
        if(ninja instanceof Ninja){
            var damage = strength * 15;
            console.log(ninja.name, "was kicked by ", this.name," and lost ",damage,"Health!");
            ninja.health -= damage; 
        }
        else{
            console.log("Not instance of class Ninja")
        }
    }
}
Ninja.prototype.punch = function(ninja){
    if(ninja instanceof Ninja){
        console.log(this.name," was kicked by ", ninja.name, " and lost 15 Health!");
        ninja.health -= 15;
    }
    else{
        return false;
    }
}
var blueNinja = new Ninja("Geomon");
var redNinja = new Ninja("Bill Gates");
redNinja.punch(blueNinja);
blueNinja.kick(redNinja);