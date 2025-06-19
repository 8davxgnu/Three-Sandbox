import {
  createScene,
  createCube
} from './util-three-1';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

let { scene, camera, renderer } = createScene();

document.body.appendChild(renderer.domElement);
const color = new THREE.Color(0x12121f);
scene.background = color
camera.position.z = 5;

const controls = new OrbitControls(camera, document.body);
controls.target.set(0, 0, 0);  // pt of focus for the orbit
controls.update();

const cube1 = createCube([1, 1, 1], 0xff0000, [0, 0, 0])
const cube2 = createCube([1, 1, 1], 0x00ff00, [1.5, 0, 0])
const cube3 = createCube([1, 1, 1], 0x0000ff, [3, 0, 0])
scene.add( cube1, cube2, cube3 );


function animate() {
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

let keyDown = false
window.addEventListener('keydown', function(event){
  const userInput = event.key.toLowerCase();
  if (('e'.includes(userInput)) && (!keyDown)) {
    cube1.translateY(-0.5);
    keyDown = true
  }
});

window.addEventListener('keyup', function(event){
  const userInput = event.key.toLowerCase();
  if ('e'.includes(userInput)) {
    cube1.translateY(0.5);
    keyDown = false
  }
});

