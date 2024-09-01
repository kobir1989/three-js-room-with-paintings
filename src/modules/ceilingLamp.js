import GUI from 'lil-gui';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

export const loadCeilingLampModel = (
  lampPositions,
  spotLightPositions,
  scene,
  spotLightName,
  lampRotation
) => {
  const loader = new GLTFLoader();
  const { x, y, z } = spotLightPositions;
  const gui = new GUI();

  loader.load('/andre_black_wall_sconce_light/scene.gltf', (gltf) => {
    const lamp = gltf.scene;

    // Position the lamp
    lamp.position.set(lampPositions.x, lampPositions.y, lampPositions.z);

    lamp.scale.set(2, 2, 2);
    if (lampRotation) {
      lamp.rotation.y = lampRotation;
    }

    // Add the lamp to the scene
    scene.add(lamp);

    // Create a spotlight at the same position as the lamp
    const spotlight = new THREE.SpotLight(0xffffff, 1);
    spotlight.position.set(x, y, z); // Match the spotlight position with the lamp
    spotlight.target.position.set(0, 0, -4);
    spotlight.castShadow = true;
    spotlight.angle = Math.PI / 1; // light rotate in dig.
    spotlight.penumbra = 0.2;
    spotlight.decay = 0.6;
    spotlight.distance = 40;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;

    // Add the spotlight to the scene
    scene.add(spotlight);
    scene.add(spotlight.target);

    // Add GUI controls for the spotlight
    const spotlightFolder = gui.addFolder(spotLightName);
    spotlightFolder.add(spotlight, 'intensity', 0, 4).name('Intensity');
    spotlightFolder.add(spotlight.position, 'x', -50, 50).name('X Position');
    spotlightFolder.add(spotlight.position, 'y', -50, 50).name('Y Position');
    spotlightFolder.add(spotlight.position, 'z', -50, 50).name('Z Position');
    spotlightFolder
      .add(spotlight.target.position, 'x', -50, 50)
      .name('Target X');
    spotlightFolder
      .add(spotlight.target.position, 'y', -50, 50)
      .name('Target Y');
    spotlightFolder
      .add(spotlight.target.position, 'z', -50, 50)
      .name('Target Z');
  });
};
