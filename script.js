import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load logo texture
const textureLoader = new THREE.TextureLoader();
const logoTexture = textureLoader.load('./+Ai_Logo.png');

// Create logo plane
const logoGeometry = new THREE.PlaneGeometry(2, 2);
const logoMaterial = new THREE.MeshStandardMaterial({ map: logoTexture, transparent: true });
const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
scene.add(logoMesh);

// Lighting setup
const lightGroup = new THREE.Group();

const colors = [0xff0000, 0x0000ff, 0xffffff];
const lights = [];

colors.forEach((color, i) => {
    const light = new THREE.PointLight(color, 2, 5);
    light.position.set(Math.cos(i * Math.PI * 2 / 3) * 3, Math.sin(i * Math.PI * 2 / 3) * 3, 2);
    lightGroup.add(light);
    lights.push(light);
});

scene.add(lightGroup);

// Animation
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    
    const elapsed = clock.getElapsedTime();
    
    // Rotate lights around the logo
    lightGroup.rotation.z = elapsed * 0.5;
    
    // Pulsing effect
    lights.forEach((light, i) => {
        light.intensity = 2 + Math.sin(elapsed * 2 + i) * 1;
    });

    renderer.render(scene, camera);
}
animate();

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false;

// Resize handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
