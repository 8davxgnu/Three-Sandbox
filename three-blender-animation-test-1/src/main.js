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
// loader.load(
//   '/switch.glb',
//   function(glb) {
//     scene.add( glb.scene );
//     glb.scene.position.set(8,0,0);
//     mixer = new THREE.AnimationMixer(glb.scene);

//     const animations = glb.animations;
//     console.log(animations);
//     actionOn = mixer.clipAction(THREE.AnimationClip.findByName(animations, 'switch-ON'));
//     actionOff = mixer.clipAction(THREE.AnimationClip.findByName(animations, 'switch-OFF'));

//     actionOn.clampWhenFinished = true;
//     actionOn.setEffectiveTimeScale(20);
//     actionOn.loop = THREE.LoopOnce;

//     actionOff.clampWhenFinished = true;
//     actionOff.setEffectiveTimeScale(20);
//     actionOff.loop = THREE.LoopOnce;
//   },
//   function (xhr) {
//     console.log( (xhr.loaded / xhr.total * 100) + '% loaded!');
//   },
//   function( error ) {
//     console.log( 'Error while loading model.', error);
//   }
// );
loader.load(
  'machine1-v2.glb',
  function(glb) {
    scene.add(glb.scene);
    glb.scene.position.set(-5,0,0)
    mixer1 = new THREE.AnimationMixer(glb.scene);
    const animations1 = glb.animations;
    console.log(animations1);
    trebleON = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'treble-ON'));
    trebleOFF = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'treble-OFF'));
    bassON = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'bass-ON'));
    bassOFF = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'bass-OFF'));
    tenorON = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'tenor-ON'));
    tenorOFF = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'tenor-OFF'));
    altoON = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'alto-ON'));
    altoOFF = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'alto-OFF'));

    pedalA = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'pedal-A'));
    pedalB = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'pedal-B'));
    pedalC = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'pedal-C'));
    pedalD = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'pedal-D'));
    pedalE = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'pedal-E'));
    pedalF = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'pedal-F'));
    pedalG = mixer1.clipAction(THREE.AnimationClip.findByName(animations1, 'pedal-G'));

    trebleON.loop = THREE.LoopOnce;
    trebleON.clampWhenFinished = true;
    trebleOFF.loop = THREE.LoopOnce;
    trebleOFF.clampWhenFinished = true;

    bassON.loop = THREE.LoopOnce;
    bassON.clampWhenFinished = true;
    bassOFF.loop = THREE.LoopOnce;
    bassOFF.clampWhenFinished = true;

    tenorON.loop = THREE.LoopOnce;
    tenorON.clampWhenFinished = true;
    tenorOFF.loop = THREE.LoopOnce;
    tenorOFF.clampWhenFinished = true;

    altoON.loop = THREE.LoopOnce;
    altoON.clampWhenFinished = true;
    altoOFF.loop = THREE.LoopOnce;
    altoOFF.clampWhenFinished = true;

    pedalA.loop = THREE.LoopOnce;
    pedalA.setEffectiveTimeScale(5);
    pedalB.loop = THREE.LoopOnce;
    pedalB.setEffectiveTimeScale(5);
    pedalC.loop = THREE.LoopOnce;
    pedalC.setEffectiveTimeScale(5);
    pedalD.loop = THREE.LoopOnce;
    pedalD.setEffectiveTimeScale(5);
    pedalE.loop = THREE.LoopOnce;
    pedalE.setEffectiveTimeScale(5);
    pedalF.loop = THREE.LoopOnce;
    pedalF.setEffectiveTimeScale(5);
    pedalG.loop = THREE.LoopOnce;
    pedalG.setEffectiveTimeScale(5);
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
  if (mixer1) mixer1.update(delta);

  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );


window.addEventListener('keydown', function(event){
  const userInput = event.key.toLowerCase();
  if (userInput.toLowerCase() == '1') {
    trebleON.play();
  }
  else if (userInput.toLocaleLowerCase() == '2') {
    bassON.play();
  }
  else if (userInput.toLocaleLowerCase() == '3') {
    tenorON.play();
  }
  else if (userInput.toLocaleLowerCase() == '4') {
    altoON.play();
  }
  else if (userInput.toLocaleLowerCase() == 'a') {
    pedalA.stop().play();  
  }
  else if (userInput.toLocaleLowerCase() == 'b') {
    pedalB.stop().play();  
  }
  else if (userInput.toLocaleLowerCase() == 'c') {
    pedalC.stop().play();  
  }
  else if (userInput.toLocaleLowerCase() == 'd') {
    pedalD.stop().play();  
  }
  else if (userInput.toLocaleLowerCase() == 'e') {
    pedalE.stop().play();  
  }
  else if (userInput.toLocaleLowerCase() == 'f') {
    pedalF.stop().play();  
  }
  else if (userInput.toLocaleLowerCase() == 'g') {
    pedalG.stop().play();  
  }
});