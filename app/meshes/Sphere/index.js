import * as THREE from 'three';
import GUI from '../../GUI';
const glsl = require('glslify');

export default class Sphere extends THREE.Object3D {
  constructor(index) {
    super();

    this.index = index;

    this.pointsLightsGroup = [];
    this.pointsLightsNb = 4;

    this.colors = [0xff0000, 0xffff00,  0x00ffff]

    this.radius = 15

    this.geometry = new THREE.SphereGeometry( this.radius, 30, 30 );

    this.material = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader: glsl.file('./vertex.glsl'),
      fragmentShader: glsl.file('./fragment.glsl'),
      lights: true,
      fog: true
    })

    this.rotationSpeed = new THREE.Vector3(
      THREE.Math.randFloat(-0.02, 0.02),
      THREE.Math.randFloat(-0.02, 0.02),
      THREE.Math.randFloat(-0.02, 0.02),
    )

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

    this.createLights();
    this.createGUI();

  }

  createGUI() {
    const sphereFolder = GUI.addFolder(`Sphere#${this.index}` );
    const uniforms = this.material.uniforms;
    const uMoveFolder = sphereFolder.addFolder('uMove');
    sphereFolder.add(uniforms.uUvScale, 'value', 0, 200).name('uUvScale');
    sphereFolder.add(uniforms.shininess, 'value', 0, 200).name('shininess');
    uMoveFolder.add(uniforms.uMove.value, 'x', 0, 0.5).name('uMoveX');//marge de valeur
    uMoveFolder.add(uniforms.uMove.value, 'y', 0, 0.5).name('uMoveY');
    uMoveFolder.add(uniforms.uMove.value, 'z', 0, 0.5).name('uMoveZ');
  }

  createLights() {
    // this.pointLightGroups[i]
    const randomColor = this.colors[THREE.Math.randInt(0, this.colors.length - 1)]

    this.pointLightGroup = new THREE.Object3D()

    const pointLight = new THREE.PointLight( randomColor, 2, 100 );

    pointLight.position.x = THREE.Math.randFloat(this.radius + 2, this.radius + 20);
    pointLight.position.y = THREE.Math.randFloat(this.radius + 2, this.radius + 10);
    pointLight.position.z = THREE.Math.randFloat(this.radius + 2, this.radius + 10);

    this.add( this.pointLightGroup );
    this.pointLightGroup.add( pointLight );

    const lSphereGeom = new THREE.SphereGeometry(1, 3, 3)
    const lSphereMat = new THREE.MeshBasicMaterial({ color: randomColor, wireframe: true })
    const pointLightSphere = new THREE.Mesh(lSphereGeom, lSphereMat)
    pointLightSphere.position.copy( pointLight.position )
    this.pointLightGroup.add( pointLightSphere );
  }


  update(time) {
    this.pointLightGroup.rotation.x += this.rotationSpeed.x;
    this.pointLightGroup.rotation.y += this.rotationSpeed.y;
    this.pointLightGroup.rotation.z += this.rotationSpeed.z;
    this.material.uniforms.uTime.value = time;
  }
}
