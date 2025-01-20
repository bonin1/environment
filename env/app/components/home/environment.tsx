'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';
import MonitorWebsite from './MonitorWebsite';

const Environment = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [showMonitorContent, setShowMonitorContent] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const textureRef = useRef<THREE.CanvasTexture | null>(null);

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

        let isInMonitorView = false;
        const originalCameraPosition = new THREE.Vector3(0, 2, 5);
        const originalControlsTarget = new THREE.Vector3(0, 1, 0);
        
        const monitorViewPosition = new THREE.Vector3(0, 1.4, -0.15);
        const monitorViewTarget = new THREE.Vector3(0, 1.4, -0.4);

        const updateCanvasContent = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
    
            ctx.fillStyle = '#000033';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = 'white';
            ctx.font = 'bold 48px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Welcome to My Monitor', canvas.width/2, 100);
            
            ctx.font = '32px Arial';
            ctx.fillText('This is a custom website', canvas.width/2, 200);
            ctx.fillText('inside the 3D monitor', canvas.width/2, 250);
    
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(50, 300, 924, 200);
            
            // Add some colored elements
            const time = Date.now() * 0.001;
            ctx.fillStyle = `hsl(${(time * 50) % 360}, 70%, 50%)`;
            ctx.fillRect(70, 320, 200, 160);
            ctx.fillStyle = `hsl(${((time * 50) + 120) % 360}, 70%, 50%)`;
            ctx.fillRect(290, 320, 200, 160);
            ctx.fillStyle = `hsl(${((time * 50) + 240) % 360}, 70%, 50%)`;
            ctx.fillRect(510, 320, 200, 160);
        };

        const createPCSetup = () => {
            const pcGroup = new THREE.Group();
        
            const towerGeometry = new THREE.BoxGeometry(0.4, 0.8, 0.6);
            const towerMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x111111,
                roughness: 0.2
            });
            const tower = new THREE.Mesh(towerGeometry, towerMaterial);
        
            const frontPanelGeometry = new THREE.PlaneGeometry(0.38, 0.78);
            const frontPanelMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x222222,
                metalness: 0.8,
                roughness: 0.2,
            });
            const frontPanel = new THREE.Mesh(frontPanelGeometry, frontPanelMaterial);
            frontPanel.position.set(0, 0, 0.301);
            tower.add(frontPanel);
        
            const createFan = (color: any) => {
                const fan = new THREE.Group();
                
                const frameGeometry = new THREE.RingGeometry(0.06, 0.08, 32);
                const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
                const frame = new THREE.Mesh(frameGeometry, frameMaterial);
                
                const bladesGeometry = new THREE.CircleGeometry(0.06, 8);
                const bladesMaterial = new THREE.MeshPhongMaterial({ 
                    color: 0x222222,
                    transparent: true,
                    opacity: 0.7
                });
                const blades = new THREE.Mesh(bladesGeometry, bladesMaterial);
                
                const ringGeometry = new THREE.RingGeometry(0.07, 0.075, 32);
                const ringMaterial = new THREE.MeshBasicMaterial({ 
                    color: color,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.8
                });
                const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                
                const fanLight = new THREE.PointLight(color, 0.5, 0.3);
                fanLight.position.z = 0.05;
                
                fan.add(frame, blades, ring, fanLight);
                return fan;
            };
        
            const fanPositions = [
                { y: 0.25, color: 0xff0000 },
                { y: 0, color: 0x00ff00 },
                { y: -0.25, color: 0x0000ff }
            ];
        
            fanPositions.forEach(({ y, color }) => {
                const fan = createFan(color);
                fan.position.set(0, y, 0.302);
                tower.add(fan);
            });
        
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
        
            const createInternalComponents = () => {
                const components = new THREE.Group();
        
                const gpuGeometry = new THREE.BoxGeometry(0.05, 0.15, 0.3);
                const gpuMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 });
                const gpu = new THREE.Mesh(gpuGeometry, gpuMaterial);
                gpu.position.set(0.15, -0.1, 0);
                
                const gpuRGBGeometry = new THREE.PlaneGeometry(0.3, 0.02);
                const gpuRGBMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                const gpuRGB = new THREE.Mesh(gpuRGBGeometry, gpuRGBMaterial);
                gpuRGB.position.set(0.15, -0.05, 0);
                
                for (let i = 0; i < 4; i++) {
                    const ramGeometry = new THREE.BoxGeometry(0.02, 0.15, 0.05);
                    const ramMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
                    const ram = new THREE.Mesh(ramGeometry, ramMaterial);
                    ram.position.set(0.15, 0.2, -0.15 + (i * 0.06));
                    components.add(ram);
                    
                    const ramRGBGeometry = new THREE.PlaneGeometry(0.02, 0.15);
                    const ramRGBMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
                    const ramRGB = new THREE.Mesh(ramRGBGeometry, ramRGBMaterial);
                    ramRGB.position.set(0.16, 0.2, -0.15 + (i * 0.06));
                    components.add(ramRGB);
                }
        
                components.add(gpu, gpuRGB);
                return components;
            };
        
            tower.add(createInternalComponents());
        
            tower.position.set(0.6, 0.4, -0.4);
        
            const screenGeometry = new THREE.BoxGeometry(1.2, 0.7, 0.05);
            const screenMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x000000,
                roughness: 0.2
            });
            const screen = new THREE.Mesh(screenGeometry, screenMaterial);
            screen.userData.clickable = true; 
            
            const standGeometry = new THREE.Group();
            const standMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });

            const poleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3);
            const pole = new THREE.Mesh(poleGeometry, standMaterial);
            pole.position.y = 0.15;
            standGeometry.add(pole);

            const baseGeometry = new THREE.BoxGeometry(0.3, 0.02, 0.2);
            const base = new THREE.Mesh(baseGeometry, standMaterial);
            base.position.y = 0;
            standGeometry.add(base);

            const mountGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.02);
            const mount = new THREE.Mesh(mountGeometry, standMaterial);
            mount.position.y = 0.3;
            standGeometry.add(mount);

            standGeometry.position.set(0, 1.15, -0.4);

            const monitorCanvas = document.createElement('canvas');
            canvasRef.current = monitorCanvas;
            monitorCanvas.width = 1024;
            monitorCanvas.height = 576;
            
            const monitorTexture = new THREE.CanvasTexture(monitorCanvas);
            textureRef.current = monitorTexture;

            const displayMaterial = new THREE.MeshBasicMaterial({
                map: monitorTexture,
                side: THREE.FrontSide
            });

            const displayGeometry = new THREE.PlaneGeometry(1.17, 0.67);
            const display = new THREE.Mesh(displayGeometry, displayMaterial);
            display.userData.clickable = true;

            display.position.set(0, 1.4, -0.389);

            const clickableArea = new THREE.Mesh(
                new THREE.BoxGeometry(1.2, 0.7, 0.2),
                new THREE.MeshBasicMaterial({ 
                    transparent: true, 
                    opacity: 0,
                    side: THREE.DoubleSide 
                })
            );
            clickableArea.position.set(0, 1.4, -0.4);
            clickableArea.userData.clickable = true;
            pcGroup.add(clickableArea);
        
            screen.position.set(0, 1.4, -0.4);
            display.position.set(0, 1.4, -0.389);
            
        
            pcGroup.add(tower, screen, standGeometry, display);
        
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

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const handleClick = (event: MouseEvent) => {
            if (isInMonitorView) return; 

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);

            for (const intersect of intersects) {
                if (intersect.object.userData.clickable) {
                    console.log('Monitor clicked');
                    toggleMonitorView();
                    break;
                }
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isInMonitorView) {
                toggleMonitorView();
            }
        };

        const toggleMonitorView = () => {
            isInMonitorView = !isInMonitorView;
            setShowMonitorContent(isInMonitorView);
            
            const targetPosition = isInMonitorView ? monitorViewPosition : originalCameraPosition;
            const targetLookAt = isInMonitorView ? monitorViewTarget : originalControlsTarget;
            const targetFOV = isInMonitorView ? 35 : 75; 

            camera.position.copy(targetPosition);
            controls.target.copy(targetLookAt);
            camera.fov = targetFOV;
            camera.zoom = isInMonitorView ? 1.8 : 1;
            camera.updateProjectionMatrix();

            if (isInMonitorView) {
                controls.enabled = false;
            } else {
                controls.enabled = true;
                controls.minDistance = 2;
                controls.maxDistance = 4.5;
                controls.minPolarAngle = 0;
                controls.maxPolarAngle = Math.PI / 2;
                controls.minAzimuthAngle = -Infinity;
                controls.maxAzimuthAngle = Infinity;
            }
            
            controls.update();
        };

        window.addEventListener('click', handleClick);
        window.addEventListener('keydown', handleKeyDown);

        const animate = () => {
        requestAnimationFrame(animate);
        TWEEN.update();
        
        if (canvasRef.current && textureRef.current) {
            updateCanvasContent();
            textureRef.current.needsUpdate = true;
        }

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
        window.removeEventListener('click', handleClick);
        window.removeEventListener('keydown', handleKeyDown);
        mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <>
            <div ref={mountRef} style={{ 
                width: '100vw', 
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0
            }} />
            <MonitorWebsite isVisible={showMonitorContent} />
        </>
    );
};

export default Environment;
