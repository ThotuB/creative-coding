let rule = [];
rule["A"] = "AAA";
let sentance = "A";

let iter = 0;
let len = 400;
let angle = Math.PI/12

let DrawLines = [];
let style = 0;

let systemSentances = [];

function setup(){
    createCanvas(2000, 2000);
    background(0);
    translate(width / 2, height - 50);

    SetupStyles();
    DrawLines = [Style1, Style2, Style3];
    
    Reset();
}

function Reset(){
    sentance="A";
    iter = 0;
    len = 400;

    DrawLines[style](sentance);
    print(sentance);
}

function SetRule(char){
    Reset();

    let ruleInputA = select("#ruleA");
    let ruleTextA = select("#ruleTextA");

    let ruleInputB = select("#ruleB");
    let ruleTextB = select("#ruleTextB");

    switch (char){
        case "A":
            rule["A"] = ruleInputA.value();
            ruleTextA.html(ruleInputA.value());
            break;
        case "B":
            rule["B"] = ruleInputB.value();
            ruleTextB.html(ruleInputB.value());
            break;
    }
            
    SetupStyles();
}

function ChoseStyle(s){
    style = s;
    DrawLines[style](sentance);
}

function Iterate() {
    sentance = L_System(sentance);
    iter++;

    print(sentance);

    DrawLines[style](sentance);
}

function L_System(text){
    let textNext = "";
    let textLen = text.length;

    for (let i = 0 ; i < textLen ; i++){
        if ( rule[text[i]] != undefined ){
            textNext += rule[text[i]];
        }
        else {
            textNext += text[i];
        }
    }

    len /= 2;

    return textNext;
}