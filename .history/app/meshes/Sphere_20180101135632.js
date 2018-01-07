import * as THREE from 'three';

export default class Cube extends THREE.Object3D {
  constructor() {
    super();

    this.geometry = new THREE.SphereGeometry( 10, 30, 30 );

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xff0000) }
      },
      vertexShader: `
        uniform float uTime;

        void main() {
        
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      
      `
      fragmentShader: `
      uniform float uTime;
        void main() {
        
          gl_FragColor = vec4(color, 1.);
        }
      `,
    });

    this.mesh = new THREE.Mesh( this.geometry, this.material );

    this.add( this.mesh );
  }

  update(time) {
    this.material.uniforms.uTime.value = time;
    this.rotation.x += 0.01;
    this.rotation.z += 0.01;
  }
}
