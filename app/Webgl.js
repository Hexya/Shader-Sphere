import * as THREE from 'three';
import Sphere from './meshes/Sphere';
const OrbitControls = require( 'three-orbit-controls' )( THREE );

export default class Webgl {
  constructor( width, height ) {
    this.params = {};

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( 50, width / height, 1, 1000 );
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );
    this.renderer.setClearColor( 0x262626 );

    this.controls = new OrbitControls( this.camera );
    this.composer = null;

    this.spheres = [];
    this.spheresNb = 10;

    this.createLights()
    this.createMeshes()
  }

  createLights() {
    this.ambientLight = new THREE.AmbientLight( 0xdedede ); // soft white light
    this.scene.add( this.ambientLight );

    this.directionalLight = new THREE.DirectionalLight( 0xff0000 );
    this.directionalLight.position.set(0, 50, 0)
    this.scene.add( this.directionalLight );

    this.directionalLightHelper = new THREE.DirectionalLightHelper( this.directionalLight, 5 );
    this.scene.add(this.directionalLightHelper)
  }

  createMeshes() {

    const sphere = new Sphere(0);
    this.spheres.push(sphere)
    this.scene.add( sphere );

    for (let i = 1; i < this.spheresNb; i++) {
      const sphere = new Sphere(i);
      sphere.position.x = THREE.Math.randFloat(-100, 100)
      sphere.position.y = THREE.Math.randFloat(-100, 100)
      sphere.position.z = THREE.Math.randFloat(-100, 100)
      const scale = THREE.Math.randFloat(.3, 1)
      sphere.scale.set(scale, scale, scale)
      this.spheres.push(sphere)
      this.scene.add( sphere );
    }

  }

  resize( width, height ) {
    if ( this.composer ) {
      this.composer.setSize( width, height );
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }

  render() {
    const time = performance.now()

    this.renderer.render( this.scene, this.camera );
    for (let i = 0; i < this.spheres.length; i++) {
      this.spheres[i].update(time)
    }
  }
}
