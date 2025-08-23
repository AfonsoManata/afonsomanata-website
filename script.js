
import * as THREE from "three"
import createStars from "./stars.js"

// Enhanced scene setup
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg"),
  antialias: true,
  alpha: true,
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(5)

// Add enhanced stars to the scene
const { stars, nebula } = createStars(scene)

// Add ambient lighting for depth
const ambientLight = new THREE.AmbientLight(0x001122, 0.3)
scene.add(ambientLight)

// Add directional light for dramatic effect
const directionalLight = new THREE.DirectionalLight(0x00d4ff, 0.5)
directionalLight.position.set(1, 1, 1)
scene.add(directionalLight)

// Enhanced animation loop with dynamic effects
function animate() {
  requestAnimationFrame(animate)

  // Multi-layered rotation for depth
  stars.rotation.y += 0.0003
  stars.rotation.x += 0.0001
  nebula.rotation.y -= 0.0002
  nebula.rotation.z += 0.0001

  // Subtle camera movement based on mouse position
  if (window.mouseX !== undefined && window.mouseY !== undefined) {
    camera.position.x += (window.mouseX * 0.001 - camera.position.x) * 0.05
    camera.position.y += (window.mouseY * -0.001 - camera.position.y) * 0.05
  }

  renderer.render(scene, camera)
}

animate()

// Mouse tracking for interactive background
document.addEventListener("mousemove", (event) => {
  window.mouseX = (event.clientX / window.innerWidth) * 2 - 1
  window.mouseY = (event.clientY / window.innerHeight) * 2 - 1
})

// Enhanced resize handling
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

// Mobile menu functionality
const menuIcon = document.querySelector("#menu-icon")
const navbar = document.querySelector(".navbar")

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x")
  navbar.classList.toggle("active")
}

// Smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    menuIcon.classList.remove("bx-x")
    navbar.classList.remove("active")
  })
})

