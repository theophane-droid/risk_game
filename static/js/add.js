function update(){
    delete_automatic();
    var parameters = {};
    var xmlhttp = new XMLHttpRequest();
    var select = document.getElementById('select_type')
    var type = select.options[select.selectedIndex].value
    xmlhttp.open("GET", 'get_parameters/' + type, true);
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
        change_type(JSON.parse(xmlhttp.responseText));
      }
      else{
          return null;
      }
    };
    xmlhttp.send(null);
}
function delete_automatic(){
    var automatic = document.getElementById('automatics');
    automatic.innerHTML = "";
}
function change_type(parameters){
    var automatic = document.getElementById('automatics');
    for(var i=0; i<parameters.length; i++){
        var texte = "<label class='automatics'>" + parameters[i] + "</label>";
        texte += "<input class='form-control automatics' name='" + parameters[i] + "'>";
        automatic.innerHTML += texte;
    }
    automatic.innerHTML+= "<button type='submit' class='btn btn-primary'>add</button>";
}