import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const load3dModel = (url, scene, positions, rotation, scale) => {
  const { x, y, z } = positions;
  const loader = new GLTFLoader();
  loader.load(url, (gltf) => {
    const model = gltf.scene;

    // Position the lamp
    model.position.set(x, y, z);

    model.scale.set(scale.x, scale.y, scale.z);
    if (rotation) {
      model.rotation.y = rotation;
    }

    // Enable shadow casting and receiving for each child mesh in the model
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true; // Cast shadows
        child.receiveShadow = true; // Receive shadows
      }
    });

    // Add the lamp to the scene
    scene.add(model);
  });
};
