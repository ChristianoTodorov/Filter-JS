materials = [];
quantityFilter = false;
priceFilter = false;

filterGreater = false;
filterLess = false;
filterEqual = false;

function init(){
    materialSpans = document.getElementsByTagName("span");
    for(let i = 0;i<materialSpans.length;i+=3){
        const material = {
            nazev: materialSpans[i].innerHTML,
            mnoz: materialSpans[i+1].innerHTML,
            cena: materialSpans[i+2].innerHTML};
        materials.push(material);
    }
}
var resetColor = id => {document.getElementById(id).style.backgroundColor = "rgb(38, 107, 255)";} 

function propertyBtn(_this){
    if(_this.id == "mnozBtn"){
        if(!quantityFilter){
            quantityFilter = true;
            _this.style.backgroundColor = "red";
            priceFilter = false;
            resetColor("cenaBtn");
        }else{
            quantityFilter = false;
            resetColor("mnozBtn");
        }
    }else{
        if(!priceFilter){
            priceFilter = true;
            _this.style.backgroundColor = "red";
            quantityFilter = false;
            resetColor("mnozBtn");
        }else{
            priceFilter = false;
            resetColor("cenaBtn");;
        }
    }
}

function SymbolFilter(_this){
    switch(_this.id){
        case "lessBtn":
            if(!filterLess){
                _this.style.backgroundColor = "red";
                filterLess = true;
                resetColor("moreBtn");
                filterGreater = false;
                resetColor("equalBtn");
                filterEqual = false;
            }else{
                filterLess = false;
                resetColor("lessBtn");
            }
            break;
        case "moreBtn":
            if(!filterGreater){
                _this.style.backgroundColor = "red";
                filterGreater = true;
                resetColor("lessBtn");
                filterLess = false;
                resetColor("equalBtn");
                filterEqual = false;
            }else{
                filterGreater = false;
                resetColor("moreBtn");
            }
            break;
        case "equalBtn":
            if(!filterEqual){
                _this.style.backgroundColor = "red";
                filterEqual = true;
                resetColor("lessBtn");
                filterLess = false;
                resetColor("moreBtn");
                filterGreater = false;
            }else{
                filterEqual = false;
                resetColor("equalBtn");
            }
            break;
    }
}

function Filter(){
    var input = document.getElementById("inputNum");
    if((priceFilter==quantityFilter)||(input.value=='')){
        alert('You have to choose what to filter (quantity/price) and a value');return;
    }
    var items = document.getElementById("items-container");
    while (items.firstChild) {
        items.firstChild.remove();
    }
    
    var resultItems = [];
    if(quantityFilter){
        if(filterEqual){
            resultItems = materials.filter(item => parseInt(item.mnoz)==parseInt(input.value));
        }
        if(filterGreater){
            resultItems = materials.filter(item => parseInt(item.mnoz)>parseInt(input.value));
        }
        if(filterLess){
            resultItems = materials.filter(item => parseInt(item.mnoz)<parseInt(input.value));
        }
    }
    if(priceFilter){
        if(filterEqual){
            resultItems = materials.filter(item => parseInt(item.cena)==parseInt(input.value));
        }
        if(filterGreater){
            resultItems = materials.filter(item => parseInt(item.cena)>parseInt(input.value));
        }
        if(filterLess){
            resultItems = materials.filter(item => parseInt(item.cena)<parseInt(input.value));
        }
    }
    if(resultItems.length>0){
        var container = document.getElementById("items-container");
        for(let i = 0;i<resultItems.length;i++){
            var item = document.createElement("div");
            item.className = "item-containers";
            container.appendChild(item);

            var spanName = document.createElement("span");
            spanName.className = "nazev-span";
            spanName.innerHTML = resultItems[i].nazev;
            item.appendChild(spanName);

            var spanQuantity = document.createElement("span");
            spanQuantity.className = "mnoz-span";
            spanQuantity.innerHTML = resultItems[i].mnoz;
            item.appendChild(spanQuantity);

            var spanPrice = document.createElement("span");
            spanPrice.className = "cena-span";
            spanPrice.innerHTML = resultItems[i].cena;
            item.appendChild(spanPrice);
        }
    }
}

window.onload = init;