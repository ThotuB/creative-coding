Circle circle;
Function func;

void setup() {
    size(1000, 1000);
    background(0);
    func = new Function();

    circle = new Circle(POINTS);
    circle.draw(func);  
}

void draw() {

}

void keyPressed() {
    switch ( keyCode ) {
        case UP:
            C1 += 1;
            circle.draw(func);
            break;
        case DOWN:
            C1 -= 1;
            circle.draw(func);
            break;
        case RIGHT:
            C2 += 1;
            circle.draw(func);
            break;
        case LEFT:
            C2 -= 1;
            circle.draw(func);
            break;
    }
    switch ( key ) {
        case 'j':
            POINTS -= 1;
            updateCircle();
            break;
        case 'k':
            System.out.print(POINTS + ": ");
            System.out.println(func);
            break;
        case 'l':
            POINTS += 1;
            updateCircle();
            break;
    }        
}

void updateCircle(){
    circle = new Circle(POINTS);
    circle.draw(func);
}