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

        const particlesCount = 200;
        const positions = new Float32Array(particlesCount * 3);
        const velocities = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount; i += 1) {
            positions[i * 3] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

            velocities[i * 3] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xffd700,
            size: 0.15,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffd700,
            transparent: true,
            opacity: 0.05,
            blending: THREE.AdditiveBlending,
        });

        let lineSegments: THREE.LineSegments | null = null;

        camera.position.z = 30;

        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth - 0.5) * 10;
            mouseY = (event.clientY / window.innerHeight - 0.5) * 10;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);

            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            points.rotation.y += 0.001;
            points.rotation.x += 0.0005;

            scene.rotation.y = targetX * 0.1;
            scene.rotation.x = -targetY * 0.1;

            const posAttr = geometry.attributes.position;
            for (let i = 0; i < particlesCount; i += 1) {
                posAttr.setX(i, posAttr.getX(i) + velocities[i * 3]);
                posAttr.setY(i, posAttr.getY(i) + velocities[i * 3 + 1]);
                posAttr.setZ(i, posAttr.getZ(i) + velocities[i * 3 + 2]);

                if (Math.abs(posAttr.getX(i)) > 25) velocities[i * 3] *= -1;
                if (Math.abs(posAttr.getY(i)) > 25) velocities[i * 3 + 1] *= -1;
                if (Math.abs(posAttr.getZ(i)) > 25) velocities[i * 3 + 2] *= -1;
            }
            posAttr.needsUpdate = true;

            if (lineSegments) scene.remove(lineSegments);

            const linePositions: number[] = [];
            const threshold = 8;
            for (let i = 0; i < particlesCount; i += 1) {
                for (let j = i + 1; j < particlesCount; j += 1) {
                    const dx = posAttr.getX(i) - posAttr.getX(j);
                    const dy = posAttr.getY(i) - posAttr.getY(j);
                    const dz = posAttr.getZ(i) - posAttr.getZ(j);
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < threshold) {
                        linePositions.push(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
                        linePositions.push(posAttr.getX(j), posAttr.getY(j), posAttr.getZ(j));
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
        };
    }, []);

    return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
};

export default WebGLBackground;
