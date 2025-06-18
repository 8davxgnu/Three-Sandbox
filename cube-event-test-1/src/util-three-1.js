import * as THREE from 'three';
export function createScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const renderer = new THREE. WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  return { scene, camera, renderer };
}

/**
 * 
 * @param {number[]} param0 
 * @param {string} color 
 * @param {number[]} param2 
 * @returns  {THREE.Mesh}
 */
export function createCube([a,b,c], color, [x, y, z]) {
  const geometry = new THREE.BoxGeometry( a, b, c );
  const material = new THREE.MeshBasicMaterial( { color: color } );
  const cube = new THREE.Mesh( geometry, material );
  cube.position.set(x, y, z)
  return cube
}