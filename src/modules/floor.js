import * as THREE from 'three';

export const createFloor = (scene) => {
  // Create Floor using MeshStandardMaterial
  return new THREE.TextureLoader().load('/img/Floor.jpg', (texture) => {
    const floorMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.6,
    });
    const floor = new THREE.Mesh(new THREE.BoxGeometry(16, 16, 0.01), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.5;
    scene.add(floor);
  });
};
