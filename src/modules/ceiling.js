import * as THREE from 'three';

export const createCeiling = (scene) => {
  return new THREE.TextureLoader().load('/img/2c70b8f6783bf511cbaad188c34da8a2.jpg', (texture) => {
    const ceilingMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.5,
    });
    const ceiling = new THREE.Mesh(new THREE.BoxGeometry(16, 16, 0.01), ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 2.5;
    scene.add(ceiling);
  });
};
