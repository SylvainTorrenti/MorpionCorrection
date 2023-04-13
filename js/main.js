/**
 * @description Emplacement de la grille 
 */
const game = document.getElementById("game");

/**
 * Interface pour le nom du joueur
 */
const spanJoueurUI = document.getElementById("id-player");

/**
 * @type {number}
 * @description Taille de la grille
 */
const sizeOfgrid = 9;

/**
 * @type {number}
 * @description Taille en pixel de la grille
 */
const realSizeGrid = 600;

/** 
 * @type {HTMLElement[][]} 
 * @description Sauvegarde de l'état de la grille à chaque changement
 */
let gridState = [];

let joueur = "X";
let nbCycleDeJeu = 0;

/**
 * @description Permet de créer une grille
 * @param {Number} size Taille de la grille 
 */
function CreateGrid(size) {
  game.setHTML("");
  //Parametres de taille
  game.style.width = realSizeGrid+"px";
  game.style.height = realSizeGrid+"px";
  game.style.gridTemplateColumns = "repeat("+ size+", 1fr)";
  game.style.gridTemplateRows = "repeat("+ size+", 1fr)";

    for(let x= 0; x < size; x++) {
      gridState[x] = [];
      for(let y=0; y < size; y++) {
        let newCase = CreateCase(x, y);
        game.append(newCase);
      }
    }
}

/**
 * @description Permet de créer une case de la grille
 * @param {Number} x Position X
 * @param {Number} y Position Y
 * @returns {HTMLElement} Nouvelle case créée
 */
function CreateCase(x, y) {
  let caseDeGrille = document.createElement("div");
  caseDeGrille.classList.add("case");
  gridState[x][y] = caseDeGrille;
  caseDeGrille.addEventListener("click", () => CycleGame(x, y))
  return caseDeGrille;
}

/**
 * @description Le joueur courant joue une case (X,Y)
 * @param {number} x position de la case X 
 * @param {number} y position de la case Y
 */
function CycleGame(x, y) {

  let caseJouee = gridState[x][y];
  if(IsCaseUsed(caseJouee)) return;

  nbCycleDeJeu++;  
  caseJouee.innerText = joueur;
  
  VerifierLesRegles(x, y);

  joueur = (joueur == "X") ? "O" : "X"; 
  spanJoueurUI.innerText = joueur;

}

/**
 * @description Vérifier l'état du jeu !
 * @param {number} x Position jouée en X 
 * @param {number} y Position jouée en Y
 */
function VerifierLesRegles(x, y) {
  if(VerifLine(x)) {
    alert("Le joueur " + joueur + " a gagné en ligne " + (x+1));
    NewGame(sizeOfgrid);
  }
  else if(VerifColumn(y)) {
    alert("Le joueur " + joueur + " a gagné en colonne " + (y+1));
    NewGame(sizeOfgrid);
  }
  else if(VerfifDiag1()) {
    alert("Le joueur " + joueur + " a gagné en diagonale 1");
    NewGame(sizeOfgrid);
  }
  else if(VerfifDiag2()) {
    alert("Le joueur " + joueur + " a gagné en diagonale 2");
    NewGame(sizeOfgrid);
  }
  else if(IsGridFull()) {
    alert("Match Null");
    NewGame(sizeOfgrid);
  }

}

/**
 * @description Permet de savoir si la grille est pleine
 * @returns {boolean} La grille est pleine true | false
 */
function IsGridFull() {
  return nbCycleDeJeu == (sizeOfgrid * sizeOfgrid);
}

/**
 * @description Permet de savoir si une ligne est gagnante à partir de x et y
 * @param {number} x La position en X
 * @return  {boolean} La ligne est gagnante
 */
function VerifLine(x) {
  let firstCase = gridState[x][0];
  if(!IsCaseUsed(firstCase)) return false;

  for(let y = 1; y < sizeOfgrid; y++) {
    if(!IsTwoCasesAreSameValues(firstCase, gridState[x][y])) {
      return false;
    }
  }

  return true;
}

/**
 * @description Permet de savoir si une colonne est gagnante à partir de y
 * @param {number} y La position en Y
 * @return  {boolean} La colonne est gagnante
 */
function VerifColumn(y) {
  let firstCase = gridState[0][y];
  if(!IsCaseUsed(firstCase)) return false;

  for(let x = 1; x < sizeOfgrid; x++) {
    if(!IsTwoCasesAreSameValues(firstCase, gridState[x][y])) {
      return false;
    }
  }

  return true;
}
/**
 * @description Vérifi la diagonale Haut-Gauche jusqu'a en bas à droite
 */
function VerfifDiag1() {
  let firstCase = gridState[0][0];
  if(!IsCaseUsed(firstCase)) return false;

  for(let i = 1; i < sizeOfgrid; i++) {
    if(!IsTwoCasesAreSameValues(firstCase, gridState[i][i])) {
      return false;
    }
  }
  return true;
}

/**
 * @description Vérifi la diagonale Haut-droite jusqu'a en bas à gauche
 */
function VerfifDiag2() {
  let firstCase = gridState[0][sizeOfgrid-1];
  if(!IsCaseUsed(firstCase)) return false;

  for(let i = 1; i < sizeOfgrid; i++) {
    if(!IsTwoCasesAreSameValues(firstCase, gridState[i][sizeOfgrid - i])) {
      return false;
    }
  }
  return true;
}

/**
 * @description Permet de savoir si la case a été jouée
 * @param {HTMLElement} caseDeGrille Case à vérifier
 * @return {boolean} La case est remplie ?
*/
function IsCaseUsed(caseDeGrille) {
  return caseDeGrille.innerText != "";
}

/**
 * @description Les cases ont elles les mêmes valeurs non nulle
 * @param {HTMLElement} case1 
 * @param {HTMLElement} case2 
 * @returns  {boolean} Les cases ont elles les mêmes valeurs?
 */
function IsTwoCasesAreSameValues(case1, case2) {
  if(!IsCaseUsed(case1) || !IsCaseUsed(case2)) return false;
  return case2.innerText == case1.innerText;
}

/**
 * @description Permet de créer une nouvelle partie
 */
function NewGame(sizeOfGrid) {
  gridState = [];
  joueur = "X";
  spanJoueurUI.innerText = joueur;
  nbCycleDeJeu = 0;
  CreateGrid(sizeOfGrid);
}

NewGame(sizeOfgrid);