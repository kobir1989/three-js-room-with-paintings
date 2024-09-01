import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'lil-gui';
import './style.css';

import { createPaintings } from './modules/printings';
import { loadCeilingLampModel } from './modules/ceilingLamp';
import { load3dModel } from './modules/load3dModal';
import { createWall } from './src/modules/walls';
import { createFloor } from './src/modules/floor';
import { createCeiling } from './src/modules/ceiling';
import { createDoor } from './src/modules/door';
import { handleKeyDown, handleKeyUp, updateMovement } from './src/modules/controlls';
import { onWindowResize } from './src/utils/utils';

// Scene setup
const scene = new THREE.Scene();

// Initialize GUI
const gui = new GUI();

// Lighting
const ambientLight = new THREE.AmbientLight('#fff', 0.6);
scene.add(ambientLight);

// GUI for Ambient Light
const ambientFolder = gui.addFolder('Ambient Light');
ambientFolder.add(ambientLight, 'intensity', 0, 2);

// Create a group to hold the walls
const wallGroup = new THREE.Group();
scene.add(wallGroup);

// Texture loader
const textureLoader = new THREE.TextureLoader();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 7);

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Event listeners
window.addEventListener('resize', () => onWindowResize(camera, renderer));
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Initialize OrbitControls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.25;
orbitControls.screenSpacePanning = false;
orbitControls.maxPolarAngle = Math.PI / 2;

// Load models and create objects
loadCeilingLampModel({ x: 2.6, y: 1.8, z: -4 }, { x: 2.5, y: 0.5, z: -4 }, scene, 'Front-right');
loadCeilingLampModel({ x: -2.6, y: 1.8, z: -4 }, { x: -2.5, y: 0.5, z: -4 }, scene, 'Front-left');
loadCeilingLampModel(
  { x: -7.4, y: 1.8, z: 0 },
  { x: -7, y: 1.5, z: 0 },
  scene,
  'Left-Corner',
  Math.PI / 2
);
loadCeilingLampModel(
  { x: 7.4, y: 1.8, z: 0 },
  { x: 7, y: 1.5, z: 0 },
  scene,
  'Right-Corner',
  -Math.PI / 2
);
load3dModel('/3d_scan_man_1/scene.gltf', scene, { x: -3.1, y: -1.3, z: -2 }, Math.PI, {
  x: 1,
  y: 1,
  z: 1,
});

// Create walls
createWall(0, 0, -5, 15, 5, 0.1, 0, wallGroup);
createWall(-7.5, 0, 0, 15, 5, 0.1, Math.PI / 2, wallGroup);
createWall(7.5, 0, 0, 15, 5, 0.1, Math.PI / 2, wallGroup);
createWall(0, 0, 7.5, 15, 5, 0.1, 0, wallGroup);

// Load and add paintings to the scene
const paintings = createPaintings(scene, textureLoader);
paintings.forEach((painting) => scene.add(painting));

// Create floor, ceiling, and door
createFloor(scene);
createCeiling(scene);
createDoor(scene);

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  updateMovement(camera, wallGroup);
  orbitControls.update();
  renderer.render(scene, camera);
};

animate();
