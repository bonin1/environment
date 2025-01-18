'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Environment = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 2, 5);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 1, 0);
        controls.maxPolarAngle = Math.PI / 2; 
        controls.minDistance = 2; 
        controls.maxDistance = 4.5;
        controls.enablePan = false;
        controls.update();

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const createWalls = () => {
        const wallsGroup = new THREE.Group();
        
        const floorGeometry = new THREE.PlaneGeometry(10, 10);
        const floorMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x808080,
            roughness: 0.8 
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        wallsGroup.add(floor);

        const ceilingGeometry = new THREE.PlaneGeometry(10, 10);
        const ceilingMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xf0f0f0,
            roughness: 0.8 
        });
        const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
        ceiling.rotation.x = Math.PI / 2;
        ceiling.position.y = 5;
        wallsGroup.add(ceiling);

        const wallMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xf5f5f5,
            roughness: 0.5 
        });

        const backWall = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 5),
            wallMaterial
        );
        backWall.position.z = -5;
        backWall.position.y = 2.5;
        wallsGroup.add(backWall);

        const leftWall = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 5),
            wallMaterial
        );
        leftWall.position.x = -5;
        leftWall.position.y = 2.5;
        leftWall.rotation.y = Math.PI / 2;
        wallsGroup.add(leftWall);

        const rightWall = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 5),
            wallMaterial
        );
        rightWall.position.x = 5;
        rightWall.position.y = 2.5;
        rightWall.rotation.y = -Math.PI / 2;
        wallsGroup.add(rightWall);

        const frontWall = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 5),
            wallMaterial
        );
        frontWall.position.z = 5;
        frontWall.position.y = 2.5;
        frontWall.rotation.y = Math.PI;
        wallsGroup.add(frontWall);

        return wallsGroup;
        };

        scene.add(createWalls());

        const createGamingChair = () => {
        const chairGroup = new THREE.Group();
        const mainColor = 0xff0000; 
        const accentColor = 0x000000; 
        
        const baseGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 16);
        const baseMaterial = new THREE.MeshStandardMaterial({ color: accentColor });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = 0.05;
        chairGroup.add(base);

        const poleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5);
        const pole = new THREE.Mesh(poleGeometry, baseMaterial);
        pole.position.y = 0.3;
        chairGroup.add(pole);

        const seatGeometry = new THREE.BoxGeometry(0.6, 0.15, 0.6);
        const seatMaterial = new THREE.MeshStandardMaterial({ 
            color: mainColor,
            roughness: 0.3
        });
        const seat = new THREE.Mesh(seatGeometry, seatMaterial);
        seat.position.y = 0.6;
        chairGroup.add(seat);

        const backrestGeometry = new THREE.BoxGeometry(0.6, 1.2, 0.2);
        backrestGeometry.translate(0, 0.6, 0);
        const backrest = new THREE.Mesh(backrestGeometry, seatMaterial);
        backrest.position.set(0, 0.6, -0.3);
        backrest.rotation.x = -Math.PI * 0.1;
        chairGroup.add(backrest);

        const headrestGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.15);
        const headrest = new THREE.Mesh(headrestGeometry, seatMaterial);
        headrest.position.set(0, 1.8, -0.35);
        chairGroup.add(headrest);

        const armrestGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.4);
        const armrestMaterial = new THREE.MeshStandardMaterial({ color: accentColor });
        
        const leftArmrest = new THREE.Mesh(armrestGeometry, armrestMaterial);
        leftArmrest.position.set(0.35, 0.85, -0.1);
        chairGroup.add(leftArmrest);

        const rightArmrest = new THREE.Mesh(armrestGeometry, armrestMaterial);
        rightArmrest.position.set(-0.35, 0.85, -0.1);
        chairGroup.add(rightArmrest);

        const wheelGeometry = new THREE.TorusGeometry(0.08, 0.03, 16, 16);
        const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        
        const wheelPositions = [
            { angle: 0, radius: 0.3 },
            { angle: Math.PI * 0.4, radius: 0.3 },
            { angle: Math.PI * 0.8, radius: 0.3 },
            { angle: Math.PI * 1.2, radius: 0.3 },
            { angle: Math.PI * 1.6, radius: 0.3 }
        ];

        wheelPositions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            wheel.position.set(
            Math.cos(pos.angle) * pos.radius,
            0.08,
            Math.sin(pos.angle) * pos.radius
            );
            wheel.rotation.y = pos.angle;
            chairGroup.add(wheel);
        });

        chairGroup.position.set(0, 0, 1);
        chairGroup.rotation.y = Math.PI;
        return chairGroup;
        };

        scene.add(createGamingChair());

        const tableTop = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.1, 1),
        new THREE.MeshStandardMaterial({ color: 0x8b4513 })
        );
        tableTop.position.y = 1;
        scene.add(tableTop);

        const legGeometry = new THREE.BoxGeometry(0.1, 1, 0.1);
        const legMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
        
        const positions = [
        { x: 0.9, z: 0.4 },
        { x: -0.9, z: 0.4 },
        { x: 0.9, z: -0.4 },
        { x: -0.9, z: -0.4 },
        ];

        positions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(pos.x, 0.5, pos.z);
        scene.add(leg);
        });

        const createPCSetup = () => {
        const pcGroup = new THREE.Group();

        const towerGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.6);
        const towerMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x111111,
            roughness: 0.2
        });
        const tower = new THREE.Mesh(towerGeometry, towerMaterial);
        
        const createRGBStrip = () => {
            const strip = new THREE.Group();
            const stripGeometry = new THREE.BoxGeometry(0.02, 0.6, 0.02);
            const stripMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const light = new THREE.Mesh(stripGeometry, stripMaterial);
            
            const rgbLight = new THREE.PointLight(0xff0000, 0.5, 1);
            rgbLight.position.copy(light.position);
            strip.add(light, rgbLight);
            return strip;
        };

        const frontStrip = createRGBStrip();
        frontStrip.position.set(0.21, 0, 0.31);
        tower.add(frontStrip);

        const glassGeometry = new THREE.PlaneGeometry(0.38, 0.78);
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            transparent: true,
            opacity: 0.3,
            transmission: 0.9,
            roughness: 0,
            metalness: 0
        });
        const glass = new THREE.Mesh(glassGeometry, glassMaterial);
        glass.position.set(0.201, 0, 0);
        glass.rotation.y = -Math.PI / 2;
        tower.add(glass);

        const screenGeometry = new THREE.BoxGeometry(0.9, 0.5, 0.02);
        const screenMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x000000,
            roughness: 0.2
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        
        const standGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.3);
        const standMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const stand = new THREE.Mesh(standGeometry, standMaterial);
        
        const baseGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.02);
        const base = new THREE.Mesh(baseGeometry, standMaterial);

        const displayGeometry = new THREE.PlaneGeometry(0.88, 0.48);
        const displayMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x0066ff,
            emissive: 0x0066ff,
            emissiveIntensity: 0.5
        });
        const display = new THREE.Mesh(displayGeometry, displayMaterial);

        // Assemble monitor
        screen.position.set(0, 1.4, -0.4);
        stand.position.set(0, 1.15, -0.4);
        base.position.set(0, 1, -0.4);
        display.position.set(0, 1.4, -0.389);
        
        const monitorGlow = new THREE.PointLight(0x0066ff, 0.5, 1);
        monitorGlow.position.set(0, 1.4, -0.3);

        tower.position.set(0.8, 0.4, -0.4);

        pcGroup.add(tower, screen, stand, base, display, monitorGlow);

        const roomLights = [
            { position: [4, 4, 4], color: 0xff0000 },
            { position: [-4, 4, -4], color: 0x00ff00 },
            { position: [4, 4, -4], color: 0x0000ff }
        ];

        roomLights.forEach(({ position, color }) => {
            const light = new THREE.PointLight(color, 0.3, 8);
            light.position.set(...position);
            pcGroup.add(light);
        });

        return pcGroup;
        };

        scene.add(createPCSetup());

        const animate = () => {
        requestAnimationFrame(animate);
        
        const time = Date.now() * 0.001;
        const rgb = {
            r: Math.sin(time * 0.7) * 0.5 + 0.5,
            g: Math.sin(time * 0.3) * 0.5 + 0.5,
            b: Math.sin(time * 0.2) * 0.5 + 0.5
        };

        scene.traverse((object) => {
            if (object instanceof THREE.PointLight && object.color) {
            object.color.setRGB(rgb.r, rgb.g, rgb.b);
            }
        });

        renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
};

export default Environment;
