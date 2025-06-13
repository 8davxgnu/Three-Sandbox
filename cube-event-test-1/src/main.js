import {
  createScene
} from './util-three-1';
import * as THREE from 'three';

let { scene, camera, renderer } = createScene();
// console.log(scene, camera, renderer);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
  renderer.render( scene, camera );
  cube.rotateX(0.05);
}
renderer.setAnimationLoop( animate );


document.body.appendChild(renderer.domElement);