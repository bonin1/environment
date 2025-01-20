import * as THREE from 'three';

export class GamingTable {
    constructor() {
        this.mesh = new THREE.Group();

        // Table top
        const tableTop = new THREE.Mesh(
            new THREE.BoxGeometry(3, 0.1, 2),
            new THREE.MeshPhongMaterial({ color: 0x1a1a1a }) // Dark gaming table
        );
        tableTop.position.y = 1.5;
        
        // Table legs
        const legGeometry = new THREE.BoxGeometry(0.1, 1.5, 0.1);
        const legMaterial = new THREE.MeshPhongMaterial({ color: 0x2b2b2b });
        
        const positions = [
            [-1.4, 0.75, -0.9],
            [1.4, 0.75, -0.9],
            [-1.4, 0.75, 0.9],
            [1.4, 0.75, 0.9]
        ];

        positions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(...pos);
            this.mesh.add(leg);
        });

        // LED strip under table
        const ledStrip = new THREE.Mesh(
            new THREE.BoxGeometry(2.8, 0.05, 1.8),
            new THREE.MeshBasicMaterial({ 
                color: 0x00ff00,
                transparent: true,
                opacity: 0.5
            })
        );
        ledStrip.position.y = 1.45;
        
        this.mesh.add(tableTop);
        this.mesh.add(ledStrip);
    }
}
