import { checkCollision } from '../utils/utils';

// Handle keyboard movement
const controls = {
  speed: 0.1,
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
};

export const handleKeyDown = (event) => {
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
};

export const handleKeyUp = (event) => {
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
};

// Update the camera position and handle collisions

export const updateMovement = (camera, wallGroup) => {
  const previousPosition = camera.position.clone();
  const newPosition = camera.position.clone();

  if (controls.moveForward) newPosition.z -= controls.speed;
  if (controls.moveBackward) newPosition.z += controls.speed;
  if (controls.moveLeft) newPosition.x -= controls.speed;
  if (controls.moveRight) newPosition.x += controls.speed;

  if (!checkCollision(newPosition, wallGroup)) {
    camera.position.copy(newPosition);
  } else {
    camera.position.copy(previousPosition);
  }
};
