import * as THREE from 'three'; 
import { 
  createScene,
  createCube 
} from "./util-three-1";

let { scene, camera, renderer } = createScene();
document.body.appendChild(renderer.domElement);
const color = new THREE.Color(0x12121f);
scene.background = color
camera.position.z = 5;

let cube1 = createCube([1,1,1], 0xff0000, [0,0,0]);

scene.add( cube1 );

function animate() {
  renderer.render( scene, camera );
}

renderer.setAnimationLoop(animate);
