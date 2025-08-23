import * as THREE from "three"

export default function createStars(scene) {
  // Enhanced star field with multiple layers
  const starGeometry = new THREE.BufferGeometry()
  const starMaterial = new THREE.PointsMaterial({
    color: 0x00d4ff,
    size: 2,
    transparent: true,
    opacity: 0.8,
  })

  const starVertices = []
  const starColors = []

  for (let i = 0; i < 8000; i++) {
    const x = (Math.random() - 0.5) * 3000
    const y = (Math.random() - 0.5) * 3000
    const z = (Math.random() - 0.5) * 3000
    starVertices.push(x, y, z)

    // Add color variation for more dynamic effect
    const intensity = Math.random()
    starColors.push(intensity, intensity * 0.8 + 0.2, 1)
  }

  starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3))
  starGeometry.setAttribute("color", new THREE.Float32BufferAttribute(starColors, 3))

  const stars = new THREE.Points(starGeometry, starMaterial)
  scene.add(stars)

  // Add distant nebula effect
  const nebulaGeometry = new THREE.BufferGeometry()
  const nebulaMaterial = new THREE.PointsMaterial({
    color: 0x0080ff,
    size: 4,
    transparent: true,
    opacity: 0.3,
  })

  const nebulaVertices = []
  for (let i = 0; i < 2000; i++) {
    const x = (Math.random() - 0.5) * 4000
    const y = (Math.random() - 0.5) * 4000
    const z = (Math.random() - 0.5) * 4000
    nebulaVertices.push(x, y, z)
  }

  nebulaGeometry.setAttribute("position", new THREE.Float32BufferAttribute(nebulaVertices, 3))
  const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial)
  scene.add(nebula)

  return { stars, nebula }
}

