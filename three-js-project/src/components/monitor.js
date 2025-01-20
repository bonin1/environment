import * as THREE from 'three';

export class Monitor {
    constructor() {
        this.mesh = new THREE.Group();
        
        // Monitor screen
        const screen = new THREE.Mesh(
            new THREE.BoxGeometry(1.6, 0.9, 0.05),
            new THREE.MeshPhongMaterial({ 
                color: 0x000000,
                shininess: 100
            })
        );

        // Screen display area
        this.display = new THREE.Mesh(
            new THREE.PlaneGeometry(1.5, 0.85),
            new THREE.MeshBasicMaterial({ 
                color: 0x1a1a1a,
                emissive: 0x1a1a1a
            })
        );
        this.display.position.z = 0.03;

        // Monitor frame
        const frame = new THREE.Mesh(
            new THREE.BoxGeometry(1.7, 1, 0.1),
            new THREE.MeshPhongMaterial({ 
                color: 0x2c3e50,
                shininess: 30
            })
        );
        frame.position.z = -0.02;

        // Stand base
        const base = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.05, 0.3),
            new THREE.MeshPhongMaterial({ color: 0x2c3e50 })
        );
        base.position.y = -0.6;

        // Stand neck
        const stand = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.4, 0),
            new THREE.MeshPhongMaterial({ color: 0x2c3e50 })
        );
        stand.position.y = -0.3;

        this.mesh.add(screen);
        this.mesh.add(this.display);
        this.mesh.add(frame);
        this.mesh.add(base);
        this.mesh.add(stand);

        // Position on table
        this.mesh.position.set(0, 2.1, -0.5);
        
        // Store camera positions and target
        this.viewPosition = new THREE.Vector3(0, 2.1, 0.5); // Changed Z to be in front of monitor
        this.defaultPosition = null;
        this.screenCenter = new THREE.Vector3(0, 2.2, -0.5);
        
        // Add screen bounds for precise positioning
        this.screenBounds = {
            center: new THREE.Vector3(0, 2.1, -0.5),
            width: 1.5,
            height: 0.85
        };
    }

    turnOn() {
        // Brighter screen when viewed up close
        this.display.material.color.setHex(0x444444);
        this.display.material.emissive.setHex(0x444444);
    }

    turnOff() {
        this.display.material.color.setHex(0x1a1a1a);
        this.display.material.emissive.setHex(0x1a1a1a);
    }
}
