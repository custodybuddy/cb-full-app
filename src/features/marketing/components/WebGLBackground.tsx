import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WebGLBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        const particlesCount = 250;
        const positions = new Float32Array(particlesCount * 3);
        const initialPositions = new Float32Array(particlesCount * 3);
        const randomOffsets = new Float32Array(particlesCount);

        for (let i = 0; i < particlesCount; i += 1) {
            const x = (Math.random() - 0.5) * 60;
            const y = (Math.random() - 0.5) * 60;
            const z = (Math.random() - 0.5) * 40;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            initialPositions[i * 3] = x;
            initialPositions[i * 3 + 1] = y;
            initialPositions[i * 3 + 2] = z;

            randomOffsets[i] = Math.random() * Math.PI * 2;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xffd700,
            size: 0.18,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffd700,
            transparent: true,
            opacity: 0.08,
            blending: THREE.AdditiveBlending,
        });

        let lineSegments: THREE.LineSegments | null = null;

        camera.position.z = 35;

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth - 0.5) * 12;
            mouseY = (event.clientY / window.innerHeight - 0.5) * 12;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            const time = Date.now() * 0.0008;
            requestAnimationFrame(animate);

            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            points.rotation.y = time * 0.05;

            scene.rotation.y = targetX * 0.05;
            scene.rotation.x = -targetY * 0.05;

            material.size = 0.18 + Math.sin(time * 2) * 0.05;
            material.opacity = 0.4 + Math.sin(time) * 0.1;
            lineMaterial.opacity = 0.07 + Math.sin(time * 0.6) * 0.02;

            const posAttr = geometry.attributes.position;
            for (let i = 0; i < particlesCount; i += 1) {
                const ix = initialPositions[i * 3];
                const iy = initialPositions[i * 3 + 1];
                const iz = initialPositions[i * 3 + 2];
                const offset = randomOffsets[i];

                const waveX = Math.sin(time + iy * 0.1 + offset) * 0.5;
                const waveY = Math.cos(time + ix * 0.1 + offset) * 0.5;
                const waveZ = Math.sin(time * 0.5 + (ix + iy) * 0.05) * 1.5;

                posAttr.setX(i, ix + waveX);
                posAttr.setY(i, iy + waveY);
                posAttr.setZ(i, iz + waveZ);
            }
            posAttr.needsUpdate = true;

            if (lineSegments) {
                scene.remove(lineSegments);
                lineSegments.geometry.dispose();
            }

            const linePositions: number[] = [];
            const threshold = 10;
            const maxConnections = 2;

            for (let i = 0; i < particlesCount; i += 1) {
                let connections = 0;
                for (let j = i + 1; j < particlesCount && connections < maxConnections; j += 1) {
                    const dx = posAttr.getX(i) - posAttr.getX(j);
                    const dy = posAttr.getY(i) - posAttr.getY(j);
                    const dz = posAttr.getZ(i) - posAttr.getZ(j);
                    const distSq = dx * dx + dy * dy + dz * dz;

                    if (distSq < threshold * threshold) {
                        linePositions.push(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
                        linePositions.push(posAttr.getX(j), posAttr.getY(j), posAttr.getZ(j));
                        connections += 1;
                    }
                }
            }

            const lineGeometry = new THREE.BufferGeometry();
            lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
            lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
            scene.add(lineSegments);

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
            window.removeEventListener('mousemove', handleMouseMove);
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            scene.clear();
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            lineMaterial.dispose();
        };
    }, []);

    return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none opacity-50" />;
};

export default WebGLBackground;
