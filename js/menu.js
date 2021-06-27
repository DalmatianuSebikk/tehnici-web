// const burgerMenu = document.querySelector(".menu-btn");
// const menuNav = document.querySelector(".menu-nav");
// const burger = document.querySelector(".menu-btn__burger")
// var isShown = 0;
// burgerMenu.addEventListener("click", function() {
//     if(isShown == 0){
//         menuNav.classList.add("is-shown");
//         burger.classList.add("open");
//         isShown = 1;
//     }
//     else{
//         burger.classList.remove("open");
//         menuNav.classList.remove("is-shown");
//         isShown = 0;
//     }
    
// });

window.onload = function() {
    var rng = document.getElementById('inp-pret');
    rng.parentNode.insertBefore(document.createTextNode(rng.min),rng);
    rng.parentNode.appendChild(document.createTextNode(rng.max));

    let spval=document.createElement("span");
    rng.parentNode.appendChild(spval);
    rng.value=0;
    spval.innerHTML=" ("+rng.value+")";
    rng.onchange=function(){
        rng.nextSibling.nextSibling.innerHTML=" ("+this.value+")";
    }

    let btn=document.getElementById("filtrare");
    btn.onclick = function() {
        let inp=document.getElementById("inp-pret");
        let minPret=inp.value;

        let sel=document.getElementById("inp-categorie");
        let categorieSel=sel.value;

        var analize =document.getElementsByClassName("analiza");

        for(let an of analize) {
            an.style.display = "none";

            let pret= parseInt(an.getElementsByClassName("val-pret")[0].innerHTML);
            let conditie1= pret>=minPret

            let categorieArt= an.getElementsByClassName("val-categorie")[0].innerHTML;
            console.log(categorieArt);
            let conditie2= (categorieArt==categorieSel || categorieSel=="toate");

            let conditieFinala = conditie1 && conditie2;
            if(conditieFinala) {
                an.style.display = "block";
            }
        }

        function sortareAnalize(factor){
            var analize =document.getElementsByClassName("analiza");
            let arrayAnalize = Array.from(analize);
            arrayAnalize.sort(function(art1,art2){
                let nume1=art1.getElementsByClassName("val-nume")[0].innerHTML;
                let nume2=art2.getElementsByClassName("val-nume")[0].innerHTML;
                return factor*nume1.localeCompare(nume2);
            });
            console.log("Sortez..")
            console.log(arrayAnalize);
            
            for (let an of arrayAnalize){
                an.parentNode.appendChild(an);
            }
        }

        btn=document.getElementById("sortareCrescNume");
        btn.onclick=function(){
            sortareAnalize(1);
        }
        btn=document.getElementById("sortareDescNume");
        btn.onclick=function(){
            sortareAnalize(-1);
        }

        btn=document.getElementById("reset");

        btn.onclick=function(){
        
            var analize =document.getElementsByClassName("analiza");
        
            for (let an of analize){
                an.style.display="block";
            }
        }

    }

    window.onkeydown=function(e){
        if (e.key=="c" && e.altKey){
            e.preventDefault();
            var analize=document.getElementsByClassName("analiza");
            sumaArt=0;
            for (let prod of analize){
                sumaArt+=parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML);
            }
            let infoSuma=document.createElement("p");//<p></p>
            infoSuma.innerHTML="Suma: "+sumaArt;//<p>...</p>
            infoSuma.className="info-analize";
            let p=document.getElementById("p-suma")
            p.parentNode.insertBefore(infoSuma,p.nextSibling);
            setTimeout(function(){infoSuma.remove()}, 2000);
        }
    }

};
