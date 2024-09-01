import * as THREE from 'three';

// Function to create walls with bounding boxes
export const createWall = (x, y, z, width, height, depth, rotationY = 0, wallGroup) => {
  const texture = new THREE.TextureLoader().load('/img/white-texture.jpg');
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
    roughness: 0.6,
    metalness: 0.01,
  });

  const wall = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
  wall.position.set(x, y, z);
  wall.rotation.y = rotationY;
  wall.geometry.computeBoundingBox();
  wall.boundingBox = wall.geometry.boundingBox.clone();
  wallGroup.add(wall);
};
