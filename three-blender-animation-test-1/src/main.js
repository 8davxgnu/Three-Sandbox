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
let mixer1, pedalA, pedalB, pedalC, pedalD, pedalE, pedalF, pedalG;
let trebleON, trebleOFF, bassON, bassOFF, tenorON, tenorOFF, altoON, altoOFF;

const loader = new GLTFLoader();
loader.load(
  '/switch.glb',
  function(glb) {
    scene.add( glb.scene );
    glb.scene.position.set(8,0,0);
    mixer = new THREE.AnimationMixer(glb.scene);

    const animations = glb.animations;
    console.log(animations);
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
loader.load(
  'machine1-v2.glb',
  function(glb) {
    scene.add(glb.scene);
    glb.scene.position.set(-5,0,0)
    mixer1 = new THREE.AnimationMixer(glb.scene);
    const animations1 = glb.animations;
    console.log(animations1);
    trebleON = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'treble-ON'));
    pedalG = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'pedal-G'));
  }
);

const light = new THREE.PointLight(0xFFBD59, 1, 0, 0.0);
light.position.set(0,5,0);
scene.add(light);
// const hemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 1);
// scene.add(hemisphereLight);

const Clock = new THREE.Clock;
//  Animation Loop
function animate() {
  const delta = Clock.getDelta();
  if (mixer) mixer.update(delta);

  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

let on = true;
window.addEventListener('keydown', function(event){
  const userInput = event.key.toLowerCase();
  if (userInput.toLowerCase() == 'a' && actionOn && !on) {
    actionOff?.stop();
    actionOn.play();
    on = true;
  };
});

window.addEventListener('keydown', function(event){
  const userInput = event.key.toLowerCase();
  if (userInput.toLowerCase() == 'b' && actionOff && on) {
    actionOn?.stop();
    actionOff.play();
    on = false;
    console.log(actionOff);
  };
});

window.addEventListener('keydown', function(event){
  const userInput = event.key.toLowerCase();
  if (userInput.toLowerCase() == 'c') {
    trebleON.play();
    console.log(pedalG);
    console.log(trebleON);
  };
});