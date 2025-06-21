import './style.css'
import {
  createScene,
  createCube,
} from './three-util';
import { musicHTML } from './musicHTML';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { initializeVexflow } from './musicRender';

// Set up Scene Environment Items
let { scene, camera, renderer } = createScene();

document.body.appendChild(renderer.domElement);
const color = new THREE.Color(0x12121f);
scene.background = color;
camera.position.z = 800;

// Orbit Controls (optional)
const controls = new OrbitControls(camera, document.body);
controls.target.set(0, 0, 0);  // pt of focus for the orbit
controls.update();

let cube1 = createCube([1000, 1000, 1000],0x372d5c,[0,0,-500]);


const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';
document.body.appendChild(cssRenderer.domElement);

const div = document.createElement('div');
div.innerHTML = musicHTML; 
div.style.width = '1rem';
div.style.height = '1rem';
div.style.opacity = '1';
div.style.background = 'black';

const cssObject = new CSS3DObject(div);
cssObject.position.set(-200,0,0)
cssObject.element.addEventListener('mouseover', function() {
    controls.enabled = false;
});

cssObject.element.addEventListener('mouseout', function() {
    controls.enabled = true;
});

scene.add(cube1);
scene.add(cssObject);
initializeVexflow(div);

//  Animation Loop
function animate() {
  renderer.render( scene, camera );
  cssRenderer.render( scene, camera );  // renders CSS3D objects
}
renderer.setAnimationLoop( animate );