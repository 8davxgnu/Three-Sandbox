import {
  createScene,
  createCube
} from './util-three-1';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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

// Load external models
let mixer, actionOn, actionOff;
const loader = new GLTFLoader();
loader.load(
  '/switch.glb',
  function(glb) {
    scene.add( glb.scene );
    mixer = new THREE.AnimationMixer(glb.scene);

    const animations = glb.animations;
    actionOn = mixer.clipAction(THREE.AnimationClip.findByName(animations, 'switch-ON'));
    actionOff = mixer.clipAction(THREE.AnimationClip.findByName(animations, 'switch-OFF'));

    actionOn.clampWhenFinished = true;
    actionOn.setEffectiveTimeScale(20);
    actionOn.loop = THREE.LoopOnce;

    actionOff.clampWhenFinished = true;
    actionOff.setEffectiveTimeScale(20);
    actionOff.loop = THREE.LoopOnce;
  },
  function (xhr) {
    console.log( (xhr.loaded / xhr.total * 100) + '% loaded!');
  },
  function( error ) {
    console.log( 'Error while loading model.', error);
  }
);


const Clock = new THREE.Clock;
//  Animation Loop
function animate() {
  requestAnimationFrame(animate);
  const delta = Clock.getDelta();
  if (mixer) mixer.update(delta);

  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

let on = false;
window.addEventListener('keydown', function(event){
  const userInput = event.key.toLowerCase();
  if (userInput.toLowerCase() == 'a' && actionOn && !on) {
    actionOff?.stop();
    actionOn.play();
    on = true;
  };
});

window.addEventListener('keyup', function(event){
  const userInput = event.key.toLowerCase();
  if (userInput.toLowerCase() == 'b' && actionOff && on) {
    actionOn?.stop();
    actionOff.play();
    on = false;
  };
});

