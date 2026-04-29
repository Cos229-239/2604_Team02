import Card from "../src/components/Card"
function card(){
    Card;
}
function See(){
    card;
}
function click(){
    if(true){
        See;
    }else{
        return 0;
    };
}
function MoveTo(){
    return 0;
}
function moveCard(){
    MoveTo("card_holder");
}
function CardMovement(){
    if(click=true){
        moveCard();
    };
}