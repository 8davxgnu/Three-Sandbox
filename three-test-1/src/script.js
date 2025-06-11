import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 
    0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement )

const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.x = 1;
scene.add( cube );
camera.position.z = 1;


const gltfLoader = new GLTFLoader();
const url = '/static/bear_glb.glb';
gltfLoader.load(url, (gltf) => {
    const root = gltf.scene;
    scene.add(root);
},
undefined,
(error) => {
    console.error('Error loading GLB model', error);
}
);

const skyColor = 0xB1E1FF;  // light blue
const groundColor = 0xB97A20;  // brownish orange
const intensity = 1;
const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light)

const controls = new OrbitControls(camera, document.body);
controls.target.set(0, 0, 0);  // pt of focus for the orbit
controls.update();

function animate() {
    cube.rotation.x += 0.0
    cube.rotation.z += 0.01
    renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );