var pickNumber = 0;
function getElMax(liste){
    max=0;
    imax=0;
    for(var i=0; i<liste.length; i++){
        if(parseInt(liste[i].id)>max){
            max = parseInt(liste[i].id);
            imax = i;       
        }
    }
    return liste[imax];
}
function isClass(el, className){
    var classes = el.className.split(' ');
    for(var i=0; i<classes.length; i++){
        if(className==classes[i]){
            return true;
        }
    }
    return false;
}
function updateNumber(className, delta){
    var liste = document.getElementsByClassName(className);
    var nb = liste.length;
    for(var i=0; i<nb; i++){
        posx = liste[i].style.left;
        posy = liste[i].style.top;
        liste[i].onmouseover=print_number(posx,posy,(nb+delta));
        console.log(liste[i].onmouseover);
    }
}
function pick(class_name){ 
    var liste = document.getElementsByClassName(class_name);
    var playing_team = document.getElementById('team_name').value;
    var top = getElMax(liste);
    if(!isClass(top, playing_team)){
        alert('Ce ne sont pas vos pions');
    }
    else if(liste.length==1){
        alert('Vous devez laisser au moins un pion');
    }
    else{
        top.parentNode.removeChild(top);
        updateNumber(top.classList[top.classList.length-1], -1);
        top.style.position ='absolute';
        top.style.top = (50 +pickNumber*5) + 'px';
        top.style.left = '1100px';
        top.className = 'picked';
        document.getElementById('map').appendChild(top);
        pickNumber+=1;
    }
}
function pop(territoryName){
    liste = document.getElementsByClassName(territoryName);
    var playing_team = document.getElementById('team_name').value;
    if (!isClass(liste[0], playing_team)){
        alert('Ce territoire ne vous appartient pas');
    }
    else{
        var top = getElMax(liste);
        var picked =  document.getElementsByClassName('picked');
        if(picked.length==0){
            alert('Vous n\'avez pas saisi de pion');
        }
        else{
            var toPick = picked[picked.length-1];
            toPick.parentNode.removeChild(toPick);
            toPick.classList = [...top.classList];
            console.log(toPick.classList);
            toPick.style.left = top.style.left;
            toPick.style.top = parseInt(top.style.top) - 2 + 'px';
            toPick.onclick = pick(territoryName);
            toPick.oncontextmenu = pick(territoryName);
            toPick.onmouseout = top.onmouseout;
            toPick.id = document.getElementsByClassName(top.classList[top.classList.length-1]).length-1;
            top.parentNode.appendChild(toPick);
            updateNumber(territoryName, 1);
        }
    }
}

function removeElement(elementId) {
    var element = document.getElementById(elementId);
    while (element!=null){
        element.parentNode.removeChild(element);
        var element = document.getElementById(elementId);

    }
}
function print_number(posx, posy, territoryName){
    var map = document.getElementById('map');
    var nb = document.getElementsByClassName(territoryName).length;
    removeElement('text');
    var str = "<p id='text' style='position: absolute; left:"+ (parseInt(posx)+10) + "px;";
    str += " top:"+posy+"px; ";
    str+= "background: white; border-radius: 50%; border: solid 1px black; padding: 1px;"
    str += "'>" + nb + "</p>";
    map.innerHTML += str;
}