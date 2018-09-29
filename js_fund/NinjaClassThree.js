class Ninja {
    constructor(name){
        this.name = name;
        this.health = 100;
        this.strength = 3;
        this.speed = 3;
    }
    sayName(){
        console.log("Name: ", this.name);
    }
    showStats(){
        console.log(this.name, this.health, this.strength, this.speed);
    }
    drinkSake(){
        this.health += 10;
    }
}

class Sensei extends Ninja {
    constructor(name){
        super(name);
        this.health = 200;
        this.strength = 10;
        this.speed = 10;
    }
    speakWisdom(){
        super.drinkSake();
        console.log("There is no 'i' in team, neither is there in Sake.")
    }
}
const superSensei = new Sensei("Master Splinter");
superSensei.speakWisdom();
superSensei.showStats();