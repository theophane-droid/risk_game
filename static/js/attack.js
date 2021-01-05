// ! globals vars
var dices_list1 = [];
var dices_list2 = [];
var result1 = [];
var result2 = [];
var id_give_result;


function getNbDiceToLauch(player, nbSoldier){
    var ret;
    if(player==1){
        if (nbSoldier<3){
            ret = nbSoldier;
        }
        else{
            ret = 3;
        }
    }
    else{
        if (nbSoldier<2){
            ret = nbSoldier;
        }
        else{
            ret = 2;
        }
    }
    return ret;
}


function rollstep(dice_img, liste, result, i){
    if(liste[i]==0){
        clearInterval(result[i]);
        result[i]=parseInt(dice_img.id);
    }
    else{
        var n = parseInt(dice_img.id);
        n += 1;
        if(n>=7)n=1;
        liste[i]-=1;
        dice_img.src = '/static/js/dice/dices-' + n + '.gif';
        dice_img.id=n;
    }
}
function get_back(){
    document.location = "/board";
}

function isfinished(){
    for(var i=0; i<dices_list1.length; i++){
        if(dices_list1[i]>0)
            return false;
    }
    for(var i=0; i<dices_list2.length; i++){
        if(dices_list2[i]>0)
            return false;
    }
    return true;
}
function give_result(){
    if(!isfinished()){
        return;
    }
    clearInterval(id_give_result); 
    console.log(result1);
    result1.sort();
    result2.sort();
    console.log(result1);
    console.log(result2);
    var nbkill1=0;
    var nbkill2=0;
    for(var i=0; i<result1.length && i<result2.length; i++){
        console.log("i : " + i);
        if(result2[result2.length-i-1]>=result1[result1.length-i-1]){
            console.log("+1 kill for ya");
            nbkill1+=1;
        }
        else{
            console.log("+1 kill for the adversary");
            nbkill2+=1;
        }
    }
    console.log(nbkill1, nbkill2);
    var nb1 = parseInt(document.getElementById('nb1').value);
    var nb2 = parseInt(document.getElementById('nb2').value);
    document.getElementById('nb1').value = nb1 - nbkill1;
    document.getElementById('nb2').value = nb2 - nbkill2;
    document.getElementById('w_nb1').innerHTML = nb1 - nbkill1;
    document.getElementById('w_nb2').innerHTML = nb2 - nbkill2;
    var ter1 = document.getElementById('ter1').value;
    var ter2 = document.getElementById('ter2').value;
    var team1 = document.getElementById('t1').value;
    var team2 = document.getElementById('t2').value;

    var xmlhttp = new XMLHttpRequest();
    // ! TODO: quick fix for nb1 (+ 1)
    var path = '/compute/' + ter1 + '/' + team1 + '/' + (nb1 - nbkill1 + 1) +
     '/' + ter2 + '/' + team2 + '/' + (nb2 - nbkill2);
    console.log(path);
    xmlhttp.open("GET", path);
    xmlhttp.send();
    var nb1 = (nb1 - nbkill1);
    var nb2 = (nb2 - nbkill2);
    console.log('nb1 : ' + nb1);
    console.log('nb2 : ' + nb2);

    if(nb1==0){
        parchement('Attaque terminée', 'Vous avez perdu tous vos soldats, réessayez une prochaine fois...', true, get_back);
    }
    else if(nb2==0){
        parchement('Attaque terminée', 'Vous avez tué tous les soldatas de l\'adversaire, combien de soldats voulez-vous déployer sur ' + ter2 + ' ?', false);
    }
    else{
        parchement('Attaque en cours','Vous avez perdu ' + nbkill1 + ' unités et avez tué ' + nbkill2);
    }
}
function rolldices(dice_div, num){
    var value_liste;
    var result_list;
    if(num==1) {
        value_liste = dices_list1;
        result1 = [];
        result_list = result1;
    }
    else {
        value_liste = dices_list2;
        result2 = [];
        result_list = result2;
    }
    var liste = dice_div.children;
    for (var i=0; i<liste.length; i++){
        result_list.push(0);
        var n = Math.floor(Math.random()*12+50);
        while (i>=value_liste.length)value_liste.push(0);
        value_liste[i]=n;
        var id = setInterval(rollstep ,100, dice_div.children[i], value_liste, result_list, i);
        result_list[i]=id;
    }
}

function write_dices(div, nb, liste){
    liste = [];
    for (var i=0; i<nb; i++){
        div.innerHTML += '<img class="center" id="1" src="/static/js/dice/dices-1.gif">';
        liste.push(0);
    }
}
function attack(){
    result1 = [];
    result2 = [];
    var dices1 = document.getElementById('dices1');
    var dices2 = document.getElementById('dices2');
    var nb1 = parseInt(document.getElementById('nb1').value);
    var nb2 = parseInt(document.getElementById('nb2').value);
    var nbdice1 = getNbDiceToLauch(1, nb1);
    var nbdice2 = getNbDiceToLauch(2, nb2);
    dices1.innerHTML='';
    write_dices(dices1, nbdice1, dices_list1);
    dices2.innerHTML='';
    write_dices(dices2, nbdice2, dices_list2);
    for (var i=0; i<nbdice1; i++){
        rolldices(dices1, 1);
    }
    for (var i=0; i<nbdice2; i++){
        rolldices(dices2, 2);
    }
    id_give_result = setInterval(give_result ,1000);
}