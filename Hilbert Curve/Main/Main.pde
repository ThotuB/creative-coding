Curve curve;

void setup(){
    size(1000, 1000);
    background(0);

    curve = new Curve();
    curve.display();
}

void draw(){

}

void mousePressed() {
    curve.iterate();
    curve.display();
}
