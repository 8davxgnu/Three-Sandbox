import './style.css'
import {
  createScene,
} from './util';
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
scene.background = color
camera.position.z = 800;

// Orbit Controls (optional)
const controls = new OrbitControls(camera, document.body);
controls.target.set(0, 0, 0);  // pt of focus for the orbit
controls.update();

//  Animation Loop
function animate() {
  renderer.render( scene, camera );
  cssRenderer.render(scene, camera);  // renders CSS3D objects
}
renderer.setAnimationLoop( animate );

const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';
document.body.appendChild(cssRenderer.domElement);

const div = document.createElement('div');
div.innerHTML = musicHTML; // interactive HTML
div.style.width = '5rem';
div.style.height = '5rem';
div.style.opacity = '0.8';
div.style.background = 'white';

const cssObject = new CSS3DObject(div);
// cssObject.position.copy(cubeA.position);
scene.add(cssObject);

cssObject.element.addEventListener('mouseover', function() {
    controls.enabled = false;
});

cssObject.element.addEventListener('mouseout', function() {
    controls.enabled = true;
});


initializeVexflow(div);