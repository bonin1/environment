import * as THREE from 'three';

export class GamingChair {
    constructor() {
        this.mesh = new THREE.Group();
        
        // Scale factor for the entire chair
        const scale = 1; // Reduced from 2 to 1 for normal size
        
        // Updated materials with more varied colors
        const mainMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2c3e50,  // Dark blue-grey for main body
            shininess: 70,
            specular: 0x333333
        });
        
        const accentMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xe74c3c,  // Bright red for accents
            shininess: 90,
            specular: 0x666666
        });

        const cushionMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x34495e,  // Lighter blue-grey for cushions
            shininess: 60,
            specular: 0x444444
        });

        const metalMaterial = new THREE.MeshStandardMaterial({
            color: 0x95a5a6,  // Lighter metallic color
            metalness: 0.8,
            roughness: 0.2
        });

        // Seat base
        const seatBase = new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 0.15, 1.2),
            mainMaterial
        );
        seatBase.position.y = 0.6;

        // Seat cushion
        const seatCushion = new THREE.Mesh(
            new THREE.BoxGeometry(1.1, 0.15, 1.1),
            cushionMaterial
        );
        seatCushion.position.y = 0.75;

        // Backrest
        const backrestGeometry = new THREE.BoxGeometry(1.1, 1.6, 0.2);
        const backrest = new THREE.Mesh(backrestGeometry, mainMaterial);
        backrest.position.set(0, 1.6, -0.5);
        backrest.rotation.x = -0.1;

        // Side bolsters (racing seat style)
        const bolsterGeometry = new THREE.BoxGeometry(0.2, 1.2, 0.2);
        const leftBolster = new THREE.Mesh(bolsterGeometry, accentMaterial);
        const rightBolster = new THREE.Mesh(bolsterGeometry, accentMaterial);
        leftBolster.position.set(-0.5, 1.5, -0.5);
        rightBolster.position.set(0.5, 1.5, -0.5);
        leftBolster.rotation.x = -0.1;
        rightBolster.rotation.x = -0.1;

        // Headrest
        const headrest = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 0.5, 0.25),
            cushionMaterial
        );
        headrest.position.set(0, 2.4, -0.55);
        headrest.rotation.x = -0.1;

        // Enhanced base with better details
        const baseGroup = new THREE.Group();
        
        // Central hub - more detailed
        const baseHub = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.25, 0.15, 12),
            metalMaterial
        );
        baseHub.position.y = 0.3;
        
        // Add decorative ring to hub
        const hubRing = new THREE.Mesh(
            new THREE.TorusGeometry(0.22, 0.02, 16, 32),
            new THREE.MeshStandardMaterial({
                color: 0xc0392b,
                metalness: 0.7,
                roughness: 0.3
            })
        );
        hubRing.rotation.x = Math.PI / 2;
        hubRing.position.y = 0.35;
        baseGroup.add(hubRing);
        baseGroup.add(baseHub);

        // Create 5 enhanced wheel assemblies
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const wheelAssembly = new THREE.Group();
            
            // Main support arm - now with better shape
            const armGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.4);
            const arm = new THREE.Mesh(armGeometry, metalMaterial);
            arm.rotation.z = Math.PI / 2;
            arm.position.x = 0.2;

            // Wheel housing
            const housing = new THREE.Mesh(
                new THREE.BoxGeometry(0.12, 0.12, 0.06),
                metalMaterial
            );
            housing.position.x = 0.4;

            // Wheel with better detail
            const wheelRim = new THREE.Mesh(
                new THREE.TorusGeometry(0.06, 0.02, 16, 32),
                new THREE.MeshStandardMaterial({
                    color: 0x2c3e50,
                    metalness: 0.8,
                    roughness: 0.2
                })
            );
            
            // Wheel spokes
            const spokesGroup = new THREE.Group();
            for (let j = 0; j < 5; j++) {
                const spoke = new THREE.Mesh(
                    new THREE.BoxGeometry(0.01, 0.05, 0.01),
                    metalMaterial
                );
                spoke.rotation.z = (j / 5) * Math.PI * 2;
                spoke.position.y = 0.03;
                spokesGroup.add(spoke);
            }
            
            // Wheel assembly
            wheelRim.rotation.y = Math.PI / 2;
            wheelRim.position.x = 0.4;
            spokesGroup.position.x = 0.4;
            spokesGroup.rotation.y = Math.PI / 2;

            wheelAssembly.add(arm);
            wheelAssembly.add(housing);
            wheelAssembly.add(wheelRim);
            wheelAssembly.add(spokesGroup);

            // Position the wheel assembly
            wheelAssembly.rotation.y = angle;
            wheelAssembly.position.y = 0.3;
            baseGroup.add(wheelAssembly);
        }

        // Enhanced hydraulic lift mechanism
        const liftMechanism = new THREE.Group();
        
        // Main cylinder
        const mainCylinder = new THREE.Mesh(
            new THREE.CylinderGeometry(0.06, 0.08, 0.4, 12),
            metalMaterial
        );
        
        // Decorative rings
        const rings = [0.1, 0.2, 0.3].map(y => {
            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(0.07, 0.01, 12, 24),
                metalMaterial
            );
            ring.rotation.x = Math.PI / 2;
            ring.position.y = y;
            return ring;
        });

        liftMechanism.add(mainCylinder, ...rings);
        liftMechanism.position.y = 0.45;

        // Add base components to chair
        this.mesh.add(baseGroup);
        this.mesh.add(liftMechanism);

        // Updated RGB LED strips - now vertical
        const createLEDStrip = () => {
            const strip = new THREE.Mesh(
                new THREE.BoxGeometry(0.04, 1.2, 0.04), // Changed dimensions for vertical orientation
                new THREE.MeshBasicMaterial({
                    color: 0xff0000,
                    transparent: true,
                    opacity: 0.7
                })
            );
            return strip;
        };

        // Reposition LED strips vertically
        const leftLED = createLEDStrip();
        const rightLED = createLEDStrip();
        leftLED.position.set(-0.56, 1.6, -0.5);  // Adjusted Y position for vertical alignment
        rightLED.position.set(0.56, 1.6, -0.5);   // Adjusted Y position for vertical alignment

        // Pneumatic height adjustment
        const cylinder = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8),
            metalMaterial
        );
        cylinder.position.y = 0.45;

        // Add all parts to the chair
        [seatBase, seatCushion, backrest, leftBolster, rightBolster, 
         headrest, leftLED, rightLED].forEach(part => {
            this.mesh.add(part);
        });

        // Position the entire chair
        this.mesh.position.set(0, 0, 2.5); // Increased Z to create space between chair and table
        this.mesh.scale.set(scale, scale, scale); // Reduced scale
        this.mesh.rotation.y = Math.PI; // Rotate 180 degrees to face the table
    }

    // Method to animate LED colors
    updateLEDs(time) {
        const hue = (time * 0.001) % 1;
        const color = new THREE.Color().setHSL(hue, 1, 0.5);
        this.mesh.children.forEach(child => {
            if (child.material && child.material.opacity === 0.7) {
                child.material.color = color;
            }
        });
    }
}
