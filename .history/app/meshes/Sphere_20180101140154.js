import * as THREE from 'three';

export default class Sphrere extends THREE.Object3D {
  constructor() {
    super();

    this.geometry = new THREE.SphereGeometry( 10, 30, 30 );

    this.material = new THREE.ShaderMaterial({
      transparent: true,
      wireframe: true,
      uniforms: {
        uTime: { value: 0 },
        uAlpha: { value: 1 },
        uColor: { value: new THREE.Color(0xff0000) },
      },
      vertexShader: `
        uniform float uTime;

        void main() {
          vec3 pos = position;
          pos.y += sin(uTime * 0.01 + uv.x * 3.);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uAlpha;
        uniform vec3 uColor;

        void main() {
        
          gl_FragColor = vec4(uColor, uAlpha);
        }
      `,
    });

    this.mesh = new THREE.Mesh( this.geometry, this.material );

    this.add( this.mesh );
  }

  update(time) {
    this.material.uniforms.uTime.value = time;
    // this.rotation.x += 0.01;
    // this.rotation.z += 0.01;
  }
}
