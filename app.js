const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];
//  j'attribut les valeurs que l'on va saisir dans les deux inputs
// cela va crée un objet(nodelist) de deux elements
// le 1er : la valeur de la taille, 2eme : valeur du poids
// const inputs = document.querySelectorAll("input")
// J'ai transformer la node list en tableau pour bien cibler mes elments
// [... + "ce qu'on veut transformer en type tableau avec ses elemts"]
// const inputs =[... document.querySelectorAll("input")]

const inputs = document.querySelectorAll("input")
const displayBMI = document.querySelector(".bmi-value")
const result = document.querySelector(".result")

function handleError() {
  alert('Remplissez les champs SVP')
  displayBMI.style.color= "inherit"
  displayBMI.textContent = "Tu t'es trompé la !"
  result.textContent = "Tu sais pas remplir un formulaire ?"
  displayBMI.style.color ='red'
  result.style.color ='red'
}

function handleForm(e) {
  e.preventDefault();
  calculateBMI();
}


// Je crée la fonction de calcul de l'imc
function calculateBMI() { 
  // Je récupère les données de mes elements inputs (qui snt dans un tbl)
  const height = inputs[0].value
  const weight = inputs[1].value

  if (!height || !weight || height <= 0 || weight <= 0) {
  handleError()
  return;
}
// Ici j'insère la formule du calcul imc
// math.pow me permet de faire des calculs de puissance ( la puiss apres virgu)
// le .to fixed va me donner le resultat avec une decimal
    const BMI = (weight / Math.pow(height/100, 2)).toFixed(1)
    console.log(BMI)
    showResult(BMI)
}
// je crée la fonction qui enleve le cprtment par défaut
// Je lui rajoute la fct de calcul de l'imc

function showResult(BMI) {
  const rank = BMIData.find(data => {
    if (BMI >= data.range[0] && BMI < data.range[1]) return data;
    else if (typeof data.range === "number" && BMI >= data.range) return data;
  })
  displayBMI.textContent = BMI;
  displayBMI.style.color = `${rank.color}`
  result.textContent= `${rank.name}`
  console.log(rank);
}

const form = document.querySelector("form")
// console.dir(form) = Voir toute les propriété d'un objet
// ma const form est de type objet {} ne pas oublier
form.addEventListener("submit", handleForm)
