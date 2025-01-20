import * as THREE from 'three';
import { Room } from '../components/room';
import { GamingTable } from '../components/gamingTable';
import { GamingChair } from '../components/gamingChair';
import { Monitor } from '../components/monitor';

export function initScene() {
    const scene = new THREE.Scene();
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    // Add point lights
    const lights = [
        { pos: [0, 7, 0], intensity: 1 },
        { pos: [-3, 5, 3], intensity: 0.5 },
        { pos: [3, 5, -3], intensity: 0.5 }
    ];

    lights.forEach(({pos, intensity}) => {
        const light = new THREE.PointLight(0xffffff, intensity);
        light.position.set(...pos);
        scene.add(light);
    });

    // Create and add room
    const room = new Room();
    scene.add(room.mesh);

    // Create and add gaming table
    const table = new GamingTable();
    scene.add(table.mesh);

    // Create and add gaming chair
    const chair = new GamingChair();
    scene.add(chair.mesh);

    // Create and add monitor
    const monitor = new Monitor();
    scene.add(monitor.mesh);

    // Add animation loop for chair LED effects
    function animateChair() {
        chair.updateLEDs(Date.now());
        requestAnimationFrame(animateChair);
    }
    animateChair();

    return { scene, room, monitor };
}