import * as THREE from 'three';
import './style.css';
import { createPaintings } from './modules/printings';
import { GUI } from 'lil-gui';
import { loadCeilingLampModel } from './modules/ceilingLamp';
import { load3dModel } from './modules/load3dModal';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 7);

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Add event listener for window resize
window.addEventListener('resize', onWindowResize);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Add lighting
const ambientLight = new THREE.AmbientLight('#fff', 0.6);
scene.add(ambientLight);
// Initialize GUI
const gui = new GUI();

// GUI for Ambient Light
const ambientFolder = gui.addFolder('Ambient Light');
ambientFolder.add(ambientLight, 'intensity', 0, 2);

// Front wall right side
loadCeilingLampModel(
  { x: 2.6, y: 1.8, z: -4 },
  { x: 2.5, y: 0.5, z: -4 },
  scene,
  'Front-right'
);
// Front wall left side
loadCeilingLampModel(
  { x: -2.6, y: 1.8, z: -4 },
  { x: -2.5, y: 0.5, z: -4 },
  scene,
  'Front-left'
);

// Left wall Front
loadCeilingLampModel(
  { x: -7.4, y: 1.8, z: 0 },
  { x: -7, y: 1.5, z: 0 },
  scene,
  'Left-Corner',
  Math.PI / 2
);
// Left wall Front
loadCeilingLampModel(
  { x: 7.4, y: 1.8, z: 0 },
  { x: 7, y: 1.5, z: 0 },
  scene,
  'Right-Corner',
  -Math.PI / 2
);

// Load Visitior 3d Modal
load3dModel(
  '/3d_scan_man_1/scene.gltf',
  scene,
  { x: -3.1, y: -1.3, z: -2 },
  Math.PI,
  { x: 1, y: 1, z: 1 }
);

// Create a group to hold the walls
const wallGroup = new THREE.Group();
scene.add(wallGroup);

// Function to create walls with bounding boxes
function createWall(x, y, z, width, height, depth, rotationY = 0) {
  const texture = new THREE.TextureLoader().load('/img/white-texture.jpg');
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
    roughness: 0.6,
    metalness: 0.01,
  });

  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    material
  );
  wall.position.set(x, y, z);
  wall.rotation.y = rotationY;
  wall.geometry.computeBoundingBox();
  wall.boundingBox = wall.geometry.boundingBox.clone();
  wallGroup.add(wall);
}

// Create walls
createWall(0, 0, -5, 15, 5, 0.1); // Front wall
createWall(-7.5, 0, 0, 15, 5, 0.1, Math.PI / 2); // Left wall
createWall(7.5, 0, 0, 15, 5, 0.1, Math.PI / 2); // Right wall
createWall(0, 0, 7.5, 15, 5, 0.1); // Back wall

// Create Floor using MeshStandardMaterial
new THREE.TextureLoader().load('/img/Floor.jpg', (texture) => {
  const floorMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.6,
  });
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(16, 16, 0.01),
    floorMaterial
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -2.5;
  scene.add(floor);
});

// Create Ceiling
new THREE.TextureLoader().load(
  '/img/2c70b8f6783bf511cbaad188c34da8a2.jpg',
  (texture) => {
    const ceilingMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.5,
    });
    const ceiling = new THREE.Mesh(
      new THREE.BoxGeometry(16, 16, 0.01),
      ceilingMaterial
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 2.5;
    scene.add(ceiling);
  }
);

// Create Door
new THREE.TextureLoader().load(
  '/img/door_texture_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_963847.jpg',
  (doorTexture) => {
    const doorMaterials = new THREE.MeshStandardMaterial({
      map: doorTexture,
      roughness: 0.5,
      metalness: 0.5,
    });
    const door = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 3, 0.01),
      doorMaterials
    );
    door.position.set(0, -1, 7.3);
    scene.add(door);
  }
);

// Handle keyboard movement
const controls = {
  speed: 0.1,
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
};

function handleKeyDown(event) {
  switch (event.key) {
    case 'ArrowUp':
      controls.moveForward = true;
      break;
    case 'ArrowDown':
      controls.moveBackward = true;
      break;
    case 'ArrowLeft':
      controls.moveLeft = true;
      break;
    case 'ArrowRight':
      controls.moveRight = true;
      break;
  }
}

function handleKeyUp(event) {
  switch (event.key) {
    case 'ArrowUp':
      controls.moveForward = false;
      break;
    case 'ArrowDown':
      controls.moveBackward = false;
      break;
    case 'ArrowLeft':
      controls.moveLeft = false;
      break;
    case 'ArrowRight':
      controls.moveRight = false;
      break;
  }
}

// Check for collisions between the camera and walls
function checkCollision(newPosition) {
  const cameraBox = new THREE.Box3().setFromCenterAndSize(
    newPosition,
    new THREE.Vector3(1, 1, 1)
  );

  for (let i = 0; i < wallGroup.children.length; i++) {
    const wall = wallGroup.children[i];
    const wallBoundingBox = new THREE.Box3()
      .copy(wall.boundingBox)
      .applyMatrix4(wall.matrixWorld);

    if (cameraBox.intersectsBox(wallBoundingBox)) {
      return true;
    }
  }
  return false;
}

// Update the camera position and handle collisions
function updateMovement() {
  const previousPosition = camera.position.clone();
  const newPosition = camera.position.clone();

  if (controls.moveForward) newPosition.z -= controls.speed;
  if (controls.moveBackward) newPosition.z += controls.speed;
  if (controls.moveLeft) newPosition.x -= controls.speed;
  if (controls.moveRight) newPosition.x += controls.speed;

  if (!checkCollision(newPosition)) {
    camera.position.copy(newPosition);
  } else {
    camera.position.copy(previousPosition);
  }
}

// Event listeners for keyboard
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Initialize OrbitControls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true; // Enable smooth damping
orbitControls.dampingFactor = 0.25; // Set damping factor
orbitControls.screenSpacePanning = false; // Prevent camera from moving vertically
orbitControls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation to avoid flipping

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  updateMovement();
  orbitControls.update();
  renderer.render(scene, camera);
}

animate();

// Load and add paintings to the scene
const textureLoader = new THREE.TextureLoader();
const paintings = createPaintings(scene, textureLoader);

paintings.forEach((painting) => {
  scene.add(painting);
});
