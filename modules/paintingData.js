export const paintingData = [
  // Front Wall
  ...Array.from({ length: 2 }, (_, i) => ({
    imgSrc: `artworks/${i + 1}.jpg`,
    width: 3, // width of the painting
    height: 2, // height of the painting
    position: { x: -3 + 6 * i, y: 0.3, z: -4.5 },
    rotationY: 0, // rotation of the painting
  })),
  // Left Wall
  ...Array.from({ length: 2 }, (_, i) => ({
    imgSrc: `artworks/${i + 9}.jpg`,
    width: 3,
    height: 2,
    position: { x: -7.25, y: 0.3, z: 4.3 * i },
    rotationY: Math.PI / 2,
  })),
  // Right Wall
  ...Array.from({ length: 2 }, (_, i) => ({
    imgSrc: `artworks/${i + 13}.jpg`,
    width: 3,
    height: 2,
    position: { x: 7.25, y: 0.3, z: 4 * i },
    rotationY: -Math.PI / 2,
  })),
];
