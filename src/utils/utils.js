import * as THREE from 'three';

// Check for collisions between the camera and walls
export const checkCollision = (newPosition, wallGroup) => {
  const cameraBox = new THREE.Box3().setFromCenterAndSize(newPosition, new THREE.Vector3(1, 1, 1));

  for (let i = 0; i < wallGroup.children.length; i++) {
    const wall = wallGroup.children[i];
    const wallBoundingBox = new THREE.Box3().copy(wall.boundingBox).applyMatrix4(wall.matrixWorld);

    if (cameraBox.intersectsBox(wallBoundingBox)) {
      return true;
    }
  }
  return false;
};

export const onWindowResize = (camera, renderer) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
};
