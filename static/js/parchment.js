function parchement(title, content, showCross=true, close_function=parchment_close){
    // This function is aimed to show up the parchment with some information in there
    if (title != undefined)
        document.getElementById("parchment-title").innerHTML =  title;
    if (content != undefined)
        document.getElementById("parchment-content").innerHTML =  content;
    document.getElementById("parchment").style.display = "block";
    if (!showCross)
        document.getElementById("parchment-close").style.display = "none";
    else
        document.getElementById("parchment-close").style.display = "block";
    document.getElementById("parchment-close").onclick = close_function;
}
function parchment_close(){
    document.getElementById("parchment").style.display = "none";
}