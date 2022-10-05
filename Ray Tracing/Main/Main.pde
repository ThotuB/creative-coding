ArrayList<Wall> borderList = new ArrayList<Wall>(4);
int walls = 6;
ArrayList<Wall> wallList = new ArrayList<Wall>();

Player player1, player2;

float rad = 0;

void setup(){
    size(2000, 1000);

    player1 = new Player(new PVector(width/4, height/2), 50, 90);

    for (int i = 0; i < walls; i++){
        wallList.add(new Wall(random(width/2), random(height), random(width/2), random(height)));
    }

    borderList.add(new Wall(0, 0, width/2, 0));
    borderList.add(new Wall(0, 0, 0, height));
    borderList.add(new Wall(width/2, 0, width/2, height));
    borderList.add(new Wall(0, height, width/2, height));
}

void draw() {
    background(0);

    for (Wall wall : wallList) {
        wall.draw();
    }
    player1.cast(wallList, borderList);

    rad += 0.1;
}

void keyPressed(){
    switch (key) {
        case 'w':
            player1.move(0, -1);
            break;
        case 's':
            player1.move(0, 1);
            break;
        case 'a':
            player1.move(-1, 0);
            break;
        case 'd':
            player1.move(1, 0);
            break;
        case 'q':
            player1.turn(-1);
            break;  
        case 'e':
            player1.turn(1);
            break;
    }
    switch (keyCode){
        case UP:
            player1.changeResolution(1);
            break;
        case DOWN:  
            player1.changeResolution(-1); 
            break;
    }
}