function reload(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", '/reload');
    xmlhttp.send(null);
}