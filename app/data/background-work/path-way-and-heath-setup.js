function Pull(){
    Map();
    Path();
    health();
}
function Path(){
    if(PathbasedonInputs==true){
        PathbasedonInputs;
    }else if(PathbasedonHealth==true){
        PathbasedonHealth;
    }else if(PathbasedonInputsandHealth==true){
        PathbasedonInputsandHealth;
    }
}
function health(){
    if(health>=50){
        health=true;
    }else{
        health=false;
    }

}
function PathbasedonInputs(){
    if(inputs==true){
        PathbasedonInputs;
    }
}
function PathbasedonHealth(){
    if(health==true){
        PathbasedonHealth;
    }
}
function PathbasedonInputsandHealth(){
    if(inputs==true && health==true){
        PathbasedonInputsandHealth;
    }   
}
function MoveTo(location){
    if(Path==PathbasedonInputs){
        location="PathbasedonInputs";
    }else if(Path==PathbasedonHealth){
        location="PathbasedonHealth";
    }else if(Path==PathbasedonInputsandHealth){
        location="PathbasedonInputsandHealth";
    }
}