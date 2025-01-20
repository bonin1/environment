// src/scripts/main.js

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import { initScene } from './scene';


const { scene, room, monitor } = initScene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Initial camera position - adjusted for better default view
camera.position.set(0, 4, 8);
camera.lookAt(0, 2, 0);

// Setup orbit controls with adjusted limits
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2;
controls.maxDistance = 7;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = 0;
controls.target.set(0, 2, 0);

// Store initial position for return
const initialPosition = camera.position.clone();
const initialTarget = controls.target.clone();

// Configure controls
controls.enablePan = false;          // Disable panning
controls.enableRotate = true;        // Enable rotation
controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,       // Enable left mouse for rotation
    MIDDLE: THREE.MOUSE.MIDDLE,     // Nothing with middle mouse
    RIGHT: THREE.MOUSE.NONE         // Disable right mouse
};

// Store default camera position
monitor.defaultPosition = camera.position.clone();

// Raycaster for monitor click detection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Click handler
window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(monitor.mesh, true);

    if (intersects.length > 0) {
        moveToMonitor();
    }
});

// Escape handler
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        moveToDefault();
    }
});

let isViewingMonitor = false;

function moveToMonitor() {
    if (isViewingMonitor) return;
    isViewingMonitor = true;
    
    // Kill any existing animations
    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(controls.target);
    
    controls.enabled = false;
    monitor.turnOn();

    // Use monitor's calculated view position and screen center
    const targetPosition = monitor.screenCenter;
    const cameraPosition = monitor.viewPosition;

    gsap.to(camera.position, {
        x: cameraPosition.x,
        y: cameraPosition.y,
        z: cameraPosition.z,
        duration: 1,
        ease: "power2.inOut"
    });

    gsap.to(controls.target, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 1,
        ease: "power2.inOut",
        onUpdate: () => camera.lookAt(controls.target)
    });
}

function moveToDefault() {
    if (!isViewingMonitor) return;
    isViewingMonitor = false;

    // Kill any existing animations
    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(controls.target);

    gsap.to(camera.position, {
        x: initialPosition.x,
        y: initialPosition.y,
        z: initialPosition.z,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
            controls.enabled = true;
            monitor.turnOff();
        }
    });

    gsap.to(controls.target, {
        x: initialTarget.x,
        y: initialTarget.y,
        z: initialTarget.z,
        duration: 1,
        ease: "power2.inOut",
        onUpdate: () => camera.lookAt(controls.target)
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Required for damping
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
