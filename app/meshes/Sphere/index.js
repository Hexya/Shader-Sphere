import * as THREE from 'three';
import GUI from '../../GUI';
const glsl = require('glslify');

export default class Sphere extends THREE.Object3D {
  constructor() {
    super();

    this.geometry = new THREE.SphereGeometry( 15, 30, 30 );

    this.material = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader: glsl.file('./vertex.glsl'),
      fragmentShader: glsl.file('./fragment.glsl'),
      lights: true,
      fog: true
    })

    // three.js/src/renderers/shaders/ShaderLib/
    this.material.vertexShader = glsl.file('./vertex.glsl'),
    this.material.fragmentShader = glsl.file('./fragment.glsl')

    const customUnforms = {
      diffuse: { value: new THREE.Color(0x444444) },
      uTime: { value: 0 },
      uMove: { value: new THREE.Vector3(0.01, 0.01, 0.02)},
      uUvScale: { value: 30 }
    }

    console.log(THREE.ShaderLib.phong.uniforms);

    this.material.uniforms = Object.assign({}, THREE.ShaderLib.phong.uniforms, customUnforms);

    this.mesh = new THREE.Mesh( this.geometry, this.material );

    this.add( this.mesh );

    this.createGUI()
  }

  createGUI() {
    const uniforms = this.material.uniforms
    const uMoveFolder = GUI.addFolder('uMove')
    GUI.add(uniforms.uUvScale, 'value', 0, 200).name('uUvScale');
    GUI.add(uniforms.shininess, 'value', 0, 200).name('shininess');
    uMoveFolder.add(uniforms.uMove.value, 'x', 0, 0.5).name('uMoveX');//marge de valeur
    uMoveFolder.add(uniforms.uMove.value, 'y', 0, 0.5).name('uMoveY');
    uMoveFolder.add(uniforms.uMove.value, 'z', 0, 0.5).name('uMoveZ');
    // GUI.add(uniforms., 'diametre',0,45);

  }


  update(time) {

    this.material.uniforms.uTime.value = time;
  }
}
