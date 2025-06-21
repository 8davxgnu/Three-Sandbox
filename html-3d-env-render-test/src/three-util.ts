import * as THREE from 'three';

export function createScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
    const renderer = new THREE. WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);    
    return { scene, camera, renderer };
}

export function createCube([a,b,c]: number[] = [1, 1, 1], color: number = 0x00ff00, [x, y, z]: number[] = [0, 0, 0]) {
    const geometry = new THREE.BoxGeometry( a, b, c );
    const material = new THREE.MeshBasicMaterial({color: color});
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y, z);
    return cube;
}