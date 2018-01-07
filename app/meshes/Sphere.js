import * as THREE from 'three';
import GUI from '../GUI';

export default class Sphere extends THREE.Object3D {
  constructor() {
    super();

    this.geometry = new THREE.SphereGeometry( 15, 30, 30 );
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      wireframe: true,
      uniforms: {
        uTime: { value: 0 },
        uAlpha: { value: 1 },
        uColor: { value: new THREE.Color(0xff0000)},
        uMove: { value: new THREE.Vector3(0.01, 0.01, 0.02)},
        uUvScale: { value: 30 }
      },
      vertexShader: `
        uniform float uTime;
        uniform vec3 uMove;
        uniform float uUvScale;

        void main() {
          vec3 pos = position;
          pos.x += sin(uTime * uMove.x + uv.x * uUvScale);
          pos.y += cos(uTime * uMove.y + uv.x) + cos(uTime * 0.03 + uv.y * uUvScale);
          pos.z += sin(uTime * uMove.z + uv.x + uv.y * uUvScale);
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

    this.createGUI()
  }

  createGUI() {
    const uniforms = this.material.uniforms
    const uMoveFolder = GUI.addFolder('uMove')
    GUI.add(uniforms.uUvScale, 'value', 0, 200).name('uUvScale');
    uMoveFolder.add(uniforms.uMove.value, 'x', 0, 0.5).name('uMoveX');//marge de valeur
    uMoveFolder.add(uniforms.uMove.value, 'y', 0, 0.5).name('uMoveY');
    uMoveFolder.add(uniforms.uMove.value, 'z', 0, 0.5).name('uMoveZ');
    // GUI.add(uniforms., 'diametre',0,45);

  }



  update(time) {
    // console.log(this.controls.moveX);
    // console.log(this.controls.diametre);
    this.material.uniforms.uTime.value = time;
    // this.rotation.x += 0.01;
    // this.rotation.z += 0.01;
  }
}
