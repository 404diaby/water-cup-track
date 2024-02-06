var monFichier = {
    "username": "User",
    "dailygoal": "5",
    "onecup": "0.25",
    "dailydrink":"0",
    "stat": [
      {
        "2023-01-01": "10"
      },
      {
        "2023-01-02": "10",
        
      },
      {
        "2023-01-03": "10"
        
      }
    ]
    
    

  }


// Ajoutez la variable stat avec des valeurs pour chaque date
var dateDuJour = new Date().toISOString().split('T')[0]; // Obtenez la date du jour au format YYYY-MM-DD


console.log(monFichier);
  Storage.prototype.setObjet = function(cle, objet)
  {
   this.setItem(cle, JSON.stringify(objet));
  }
  
  Storage.prototype.getObject = function(cle)
  {
   var valeur = this.getItem(cle);
   return valeur && JSON.parse(valeur);
  }
 
 
  const IsExisteInLocalStorage = localStorage.getObject('monFichier');
  console.log(`isExist : ${IsExisteInLocalStorage}`);
  // Vérification si le variable existe  dans le localStorage
  if (IsExisteInLocalStorage) {
    monFichierJSON = localStorage.getObject('monFichier');

    monFichier = monFichierJSON;
    console.log(`Variable récupérer avec succés: ${monFichier.username}`);
  } else {
    console.log('Variable inéxistante.');
    
monFichier.stat = {
  [dateDuJour]: 10 ,
}

    localStorage.setObjet('monFichier',monFichier.username);

    console.log('Variable enregistré avec succès.');
    monFichierJSON = localStorage.getObject('monFichier');

    monFichier = JSON.Parse(monFichierJSON);
    }


//au load de la pages
function myFunction(){

 document.querySelector('#userName').innerText = monFichier.username;
    if( parseFloat(parseFloat(monFichier.dailydrink)) > 0){
    document.querySelector('#dailyDrink').innerText = `${monFichier.dailydrink} litres.`;
    }else{
      document.querySelector('#dailyDrink').innerText = `N/A litres.`;
    }


    const a = parseInt(((parseFloat(monFichier.dailydrink) * 1 ) / parseFloat(monFichier.dailygoal))*100) > 100 ? 100 : parseInt(((parseFloat(monFichier.dailydrink) * 1 ) / parseFloat(monFichier.dailygoal))*100)
    
    const dailyprogress = document.querySelector('.progress-wrap')
    dailyprogress.setAttribute("data-progress-percent",`${a}`);


}
   
myFunction();
    


    // on page load...
    moveProgressBar();
    // on browser resize...
    $(window).resize(function() {
        moveProgressBar();
    });
    
    // SIGNATURE PROGRESS
    function moveProgressBar() {
        
        var getPercent = ($('.progress-wrap').data('progress-percent') / 100);
        //console.log(`Le pourcentage est : ${getPercent}`)
        var getProgressWrapWidth = $('.progress-wrap').width();
        var progressTotal = getPercent * getProgressWrapWidth;
        const animationLength = 2500;
        let dailyProgress = document.querySelector('#dailyProgress');
    let span = document.createElement('span');
    span.append('% done');
    
   
        if(getPercent >0){
          dailyProgress.innerText = getPercent *100;
          dailyProgress.append(span);
        }else{ 
         dailyProgress.innerText = 'N/A';
          dailyProgress.append(span);
        }
        // on page load, animate percentage bar to data percentage length
        // .stop() used to prevent animation queueing
        $('.progress-bar').stop().animate({
            left: progressTotal
        }, animationLength);
    }

  
 

    

  // ouverture overlay


  const openOverlay = document.querySelectorAll('#openOverlay');
  const overlay = document.querySelectorAll("#addCupOverlay ,#settingOverlay");
  const closeOverlay = document.querySelector("main");
for (let index = 0; index < openOverlay.length; index++) {
  
  openOverlay[index].addEventListener('click' , function (e) {
    e.stopImmediatePropagation()
    for (let indexj = 0; indexj < overlay.length; indexj++) 
    {  
      console.log(`meme classe et id ; ${openOverlay[index].classList.contains(`${overlay[indexj].id}`)}`)
     
      
      if( openOverlay[index].classList.contains(`${overlay[indexj].id}`)){
       closeOverlay.classList.add('blur');
        overlay[indexj].style.bottom = '0'; 
        if(overlay[indexj].id == 'settingOverlay'){
          console.log(overlay[indexj].querySelector('#name').setAttribute('placeholder',`${monFichier.username}`))
          overlay[indexj].querySelector('#cup').setAttribute('value',`${monFichier.onecup}`)
          overlay[indexj].querySelector('#goal').setAttribute('value',`${monFichier.dailygoal}`)



            // synchro input range and input text
          var goalslider = document.getElementById("goal");
          var cupslider = document.getElementById("cup");
          var goaloutput = document.getElementById("goaltxt");
          var cupoutput = document.getElementById('cuptxt');

          goaloutput.innerHTML =  `${goalslider.value} L`;
          cupoutput.innerHTML =  `${cupslider.value} L`;

          goalslider.oninput = function() {
          goaloutput.innerHTML = `${this.value} L`;
          }
          cupslider.oninput = function() {
          cupoutput.innerHTML = `${this.value} L`;
          }

        }
     
      }
    }
  })
  
}




  //fermeture overlay

  closeOverlay.addEventListener('click', function (e) { 
if(e.currentTarget.tagName == 'MAIN') {
  for (let index = 0; index < overlay.length; index++) {
    closeOverlay.classList.remove('blur');
    overlay[index].style.bottom = '-400px'; 
  
  }
}
});


//fontion parti stat
function showStats(period) {
// Cacher tous les contenus de statistiques
document.getElementById('weekly-stats').style.display = 'none';
document.getElementById('monthly-stats').style.display = 'none';
document.getElementById('yearly-stats').style.display = 'none';

// Afficher le contenu en fonction de la période choisie
document.getElementById(`${period}-stats`).style.display = 'block';
tabs(period);

}

function tabs(period){
const tabs = document.querySelectorAll('.tab-btn');
const tabBtnActive = document.querySelector('.active');

if( tabBtnActive.innerText != period){
   const newTabBtnActive = document.querySelector(`.${period}-period`); console.log(newTabBtnActive);
   tabBtnActive.classList.remove('active');
  newTabBtnActive.classList.add('active');
}
}






//submit du formulaire setting
document.getElementById('monFormulaire').addEventListener('submit', function(event) {
  // attezntion champ vide
  // Empêcher le comportement par défaut du formulaire (rechargement de la page)
 // event.preventDefault();

  // Créer un objet FormData à partir du formulaire
  const formData = new FormData(event.target);

  if( 1 == 1) //verifform
  {
  
    if(!formData.get('name').length == 0){
       monFichier.username = formData.get('name');     
    }
    monFichier.onecup = formData.get('cup');     
    monFichier.dailygoal = formData.get('goal');
    localStorage.setObjet('monFichier', monFichier);
    console.log (localStorage.getObject('monFichier'));

  }

})




function voirMonFichierConsole()  {
    console.log(monFichier)
}


//submit du formulaire setting
document.getElementById('addOneCup').addEventListener('click', function(event) {

  monFichier.dailydrink = `${parseFloat(monFichier.dailydrink ) + parseFloat(monFichier.onecup) }` 
  localStorage.setObjet('monFichier', monFichier);
  setTimeout( () => { closeOverlay.click(); setTimeout( () => {location.reload() }, 500) } ,500)
  
})









//submit du formulaire setting
document.getElementById('monFormulaire2').addEventListener('submit', function(event) {
  // attezntion champ vide
  // Empêcher le comportement par défaut du formulaire (rechargement de la page)
 // event.preventDefault();

  // Créer un objet FormData à partir du formulaire
  const formData = new FormData(event.target);

  if( 1 == 1) //verifform
  {
  
    if(!formData.get('addQuantity').length == 0){ 
       monFichier.dailydrink = `${parseFloat(monFichier.dailydrink ) + parseFloat(formData.get('addQuantity')) }` 
  localStorage.setObjet('monFichier', monFichier);
    }
   
  }

})
