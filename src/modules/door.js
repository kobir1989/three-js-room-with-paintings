import * as THREE from 'three';

export const createDoor = (scene) => {
  return new THREE.TextureLoader().load(
    '/img/door_texture_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_963847.jpg',
    (doorTexture) => {
      const doorMaterials = new THREE.MeshStandardMaterial({
        map: doorTexture,
        roughness: 0.5,
        metalness: 0.5,
      });
      const door = new THREE.Mesh(new THREE.BoxGeometry(1.5, 3, 0.01), doorMaterials);
      door.position.set(0, -1, 7.3);
      scene.add(door);
    }
  );
};
