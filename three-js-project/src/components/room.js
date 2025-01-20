import * as THREE from 'three';

export class Room {
    constructor(width = 15, height = 10, depth = 15) {  // Increased dimensions
        this.mesh = new THREE.Group();
        const wallThickness = 0.5;

        // Single gaming room material
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x1a1a1a,
            shininess: 30
        });

        // Geometries
        const wallGeometry = new THREE.BoxGeometry(wallThickness, height, depth);
        const floorCeilingGeometry = new THREE.BoxGeometry(width, wallThickness, depth);
        const backWallGeometry = new THREE.BoxGeometry(width, height, wallThickness);

        // Create walls
        [
            { geometry: wallGeometry, position: [-width/2, height/2, 0] }, // Left
            { geometry: wallGeometry, position: [width/2, height/2, 0] },  // Right
            { geometry: floorCeilingGeometry, position: [0, 0, 0] },      // Floor
            { geometry: floorCeilingGeometry, position: [0, height, 0] }, // Ceiling
            { geometry: backWallGeometry, position: [0, height/2, -depth/2] }, // Back
            { geometry: backWallGeometry, position: [0, height/2, depth/2] }   // Front
        ].forEach(({geometry, position}) => {
            const wall = new THREE.Mesh(geometry, material);
            wall.position.set(...position);
            this.mesh.add(wall);
        });

        this.addLedStrips();
    }

    addLedStrips() {
        const ledGeometry = new THREE.BoxGeometry(0.1, 0.1, 14);  // Adjusted for new depth
        const ledMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.5
        });

        // Add LED strips near floor and ceiling
        [1, 9].forEach(height => {  // Adjusted height positions
            [-7.2, 7.2].forEach(x => {  // Adjusted x positions
                const led = new THREE.Mesh(ledGeometry, ledMaterial);
                led.position.set(x, height, 0);
                this.mesh.add(led);
            });
        });
    }
}
