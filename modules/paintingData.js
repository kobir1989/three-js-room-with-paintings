export const paintingData = [
  // Front Wall
  ...Array.from({ length: 2 }, (_, i) => ({
    imgSrc: `artworks/${i + 1}.jpg`,
    width: 3, // width of the painting
    height: 2, // height of the painting
    position: { x: -3 + 6 * i, y: 0.3, z: -4.5 },
    rotationY: 0, // rotation of the painting
    info: {
      title: `Van Gogh ${i + 1}`,
      artist: 'Vincent van Gogh',
      description: `This is one of the masterpieces by Vincent van Gogh, showcasing his unique style and emotional honesty. Artwork ${
        i + 1
      } perfectly encapsulates his love for the beauty of everyday life.`,
      year: `Year ${i + 1}`,
      link: 'https://github.com/theringsofsaturn',
    },
  })),
  // Back Wall
  ...Array.from({ length: 3 }, (_, i) => ({
    imgSrc: `artworks/${i + 5}.jpg`,
    width: 4,
    height: 2,
    position: { x: -7.5, y: 0.3, z: 1 },
    rotationY: Math.PI,
    info: {
      title: `Van Gogh ${i + 5}`,
      artist: 'Vincent van Gogh',
      description: `Artwork ${
        i + 5
      } by Vincent van Gogh is an exceptional piece showcasing his remarkable ability to capture emotion and atmosphere.`,
      year: `Year ${i + 5}`,
      link: 'https://github.com/theringsofsaturn',
    },
  })),
  // Left Wall
  ...Array.from({ length: 2 }, (_, i) => ({
    imgSrc: `artworks/${i + 9}.jpg`,
    width: 3,
    height: 2,
    position: { x: -7.25, y: 0.3, z: 4.3 * i }, // Adjust x to be close to the left wall
    rotationY: Math.PI / 2,
    info: {
      title: `Van Gogh ${i + 9}`,
      artist: 'Vincent van Gogh',
      description: `With its striking use of color and brushwork, Artwork ${
        i + 9
      } is a testament to Van Gogh's artistic genius.`,
      year: `Year ${i + 9}`,
      link: 'https://github.com/theringsofsaturn',
    },
  })),
  // Right Wall
  ...Array.from({ length: 2 }, (_, i) => ({
    imgSrc: `artworks/${i + 13}.jpg`,
    width: 3,
    height: 2,
    position: { x: 7.25, y: 0.3, z: 4 * i },
    rotationY: -Math.PI / 2,
    info: {
      title: `Van Gogh ${i + 13}`,
      artist: 'Vincent van Gogh',
      description: `Artwork ${
        i + 13
      } is a captivating piece by Vincent van Gogh, reflecting his distinctive style and deep passion for art.`,
      year: `Year ${i + 13}`,
      link: 'https://github.com/theringsofsaturn',
    },
  })),
];
