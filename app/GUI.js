//singleton class auto instancié quand appelé verifie si déja instancié
import dat from 'dat-gui';

class GUI extends dat.GUI {
  constructor() {
    super();// use methode du parents dat.gui

  }
}

export default new GUI();
