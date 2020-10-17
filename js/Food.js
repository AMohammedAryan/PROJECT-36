class Food{

    constructor(){

        this.lastFed;
        this.foodStock;

        this.image = loadImage("images/Milk.png");
    }

    bedroom(){

        imageMode(CENTER);
        image(bedroomIMG, width/2, height/2, width, height);
    }
    
    garden(){

        imageMode(CENTER);
        image(gardenIMG, width/2, height/2, width, height);
    }

    washroom(){

        imageMode(CENTER);
        image(washroomIMG, width/2, height/2, width, height);
    }

    display(){
       
        this.x = 80, this.y = 50;

        imageMode(CENTER);
        image(this.image, 120, 350, 70, 70);

        if(foodStock!== 0){

            for(var i = 0; i < this.foodStock; i++){

                if(i%10 === 0){

                    this.x = 80;
                    this.y = this.y + 60;
                }

                image(this.image, this.x, this.y, 70, 70);
                this.x = this.x + 30;
            }
        }
    }
}
