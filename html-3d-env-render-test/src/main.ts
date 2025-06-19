import './style.css'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <h1>Vite + TypeScript</h1>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

import {
  createScene,
  createCube
} from './util';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

// Set up Scene Environment Items
let { scene, camera, renderer } = createScene();

document.body.appendChild(renderer.domElement);
const color = new THREE.Color(0x12121f);
scene.background = color
camera.position.z = 5;

// Orbit Controls (optional)
const controls = new OrbitControls(camera, document.body);
controls.target.set(0, 0, 0);  // pt of focus for the orbit
controls.update();

//  Create Cubes
const cubeA = createCube([1, 1, 1], 0xff0000, [-4.5, 0, 0])
const cubeB = createCube([1, 1, 1], 0xff9f00, [-3, 0, 0])
const cubeC = createCube([1, 1, 1], 0xffff00, [-1.5, 0, 0])
const cubeD = createCube([1, 1, 1], 0x00ff00, [0, 0, 0])
const cubeE = createCube([1, 1, 1], 0x0000ff, [1.5, 0, 0])
const cubeF = createCube([1, 1, 1], 0x9f00ff, [3, 0, 0])
const cubeG = createCube([1, 1, 1], 0xf900ff, [4.5, 0, 0])
scene.add( cubeA, cubeB, cubeC, cubeD, cubeE, cubeF, cubeG );

//  Animation Loop
function animate() {
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

type CubeEntry = [THREE.Mesh, boolean];

const cubeDict: Record<'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G', CubeEntry> = {
  A: [cubeA, false],
  B: [cubeB, false],
  C: [cubeC, false],
  D: [cubeD, false],
  E: [cubeE, false],
  F: [cubeF, false],
  G: [cubeG, false]
};

window.addEventListener('keydown', function(event) {
  const userInput: string = event.key.toLowerCase();
  const key = userInput.toUpperCase() as keyof typeof cubeDict;

  if ('abcdefg'.includes(userInput)) {
    if (!cubeDict[key][1]) {
      cubeDict[key][0].translateY(-0.5);
      cubeDict[key][1] = true;
    }
  }
});


window.addEventListener('keyup', function(event) {
  const userInput: string = event.key.toLowerCase();
  const key = userInput.toUpperCase() as keyof typeof cubeDict;

  if ('abcdefg'.includes(userInput)) {
      cubeDict[key][0].translateY(0.5);
      cubeDict[key][1] = false;
  }
});

