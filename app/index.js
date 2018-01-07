import Webgl from './Webgl';
import raf from 'raf';
// import 'gsap';

// webgl settings
const webgl = new Webgl( window.innerWidth, window.innerHeight );
document.body.appendChild( webgl.renderer.domElement );

function resizeHandler() {
  webgl.resize( window.innerWidth, window.innerHeight );
}

function animate() {
  raf( animate );

  webgl.render();
}

// handle resize
window.addEventListener( 'resize', resizeHandler );

// let's play !
animate();
