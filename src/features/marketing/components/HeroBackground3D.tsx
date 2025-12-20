import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const createShardGeometry = () => {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
        0, 0.8, 0,
        -0.6, -0.4, 0,
        0.6, -0.4, 0,
    ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    return geometry;
};

const HeroBackground3D: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 1000);
        camera.position.z = 26;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        containerRef.current.appendChild(renderer.domElement);

        const root = new THREE.Group();
        scene.add(root);

        // Lights
        const pointLight = new THREE.PointLight(0xfbbf24, 2.2, 120);
        pointLight.position.set(18, 16, 20);
        scene.add(pointLight);
        scene.add(new THREE.AmbientLight(0xffffff, 0.15));

        // Justice Core: layered icosahedrons
        const coreGroup = new THREE.Group();
        const coreLayers = [
            { size: 9, detail: 3, opacity: 0.1, wireframe: true },
            { size: 7, detail: 2, opacity: 0.16, wireframe: true },
            { size: 4, detail: 1, opacity: 0.22, wireframe: false },
        ];

        coreLayers.forEach(layer => {
            const geom = new THREE.IcosahedronGeometry(layer.size, layer.detail);
            const mat = new THREE.MeshPhongMaterial({
                color: 0xfbbf24,
                emissive: 0xfbbf24,
                emissiveIntensity: 0.6,
                transparent: true,
                opacity: layer.opacity,
                wireframe: layer.wireframe,
            });
            const mesh = new THREE.Mesh(geom, mat);
            coreGroup.add(mesh);
        });

        root.add(coreGroup);

        // Data Rings
        const ringGroup = new THREE.Group();
        const ringSpecs = [
            { radius: 11, speed: 0.003 },
            { radius: 13, speed: -0.002 },
            { radius: 15, speed: 0.0015 },
        ];

        ringSpecs.forEach(spec => {
            const ringGeom = new THREE.RingGeometry(spec.radius, spec.radius + 0.08, 80);
            const ringMat = new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.12 });
            const ring = new THREE.LineLoop(ringGeom, ringMat);
            ring.rotation.x = Math.PI / 2.4;
            (ring as any).userData = { speed: spec.speed };
            ringGroup.add(ring);
        });
        root.add(ringGroup);

        // Evidence shards
        const shardGeometry = createShardGeometry();
        const shardMaterial = new THREE.MeshBasicMaterial({
            color: 0xfbbf24,
            transparent: true,
            opacity: 0.14,
            side: THREE.DoubleSide,
        });

        const shardCount = 80;
        const shardMesh = new THREE.InstancedMesh(shardGeometry, shardMaterial, shardCount);
        const shardDummy = new THREE.Object3D();
        const shardSpeeds: Array<{ rotation: THREE.Vector3; drift: THREE.Vector3 }> = [];

        for (let i = 0; i < shardCount; i += 1) {
            shardDummy.position.set(
                (Math.random() - 0.5) * 24,
                (Math.random() - 0.5) * 16,
                (Math.random() - 0.5) * 14
            );
            shardDummy.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            const scale = 0.5 + Math.random() * 0.8;
            shardDummy.scale.set(scale, scale, scale);
            shardDummy.updateMatrix();
            shardMesh.setMatrixAt(i, shardDummy.matrix);
            shardSpeeds.push({
                rotation: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.002,
                    (Math.random() - 0.5) * 0.002,
                    (Math.random() - 0.5) * 0.002
                ),
                drift: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.004,
                    (Math.random() - 0.5) * 0.004,
                    (Math.random() - 0.5) * 0.003
                ),
            });
        }

        root.add(shardMesh);

        // Sweeper ring (scan effect)
        const sweeperGeom = new THREE.TorusGeometry(6, 0.1, 18, 120);
        const sweeperMat = new THREE.MeshBasicMaterial({
            color: 0xfbbf24,
            transparent: true,
            opacity: 0.22,
        });
        const sweeper = new THREE.Mesh(sweeperGeom, sweeperMat);
        sweeper.rotation.x = Math.PI / 2;
        root.add(sweeper);

        // Parallax state
        const pointer = new THREE.Vector2(0, 0);
        const targetCamera = new THREE.Vector3(0, 0, 26);

        const onPointerMove = (event: PointerEvent) => {
            const { innerWidth, innerHeight } = window;
            pointer.x = (event.clientX / innerWidth) * 2 - 1;
            pointer.y = (event.clientY / innerHeight) * 2 - 1;
        };

        window.addEventListener('pointermove', onPointerMove);

        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                if (entry.target === containerRef.current) {
                    const { width, height } = entry.contentRect;
                    camera.aspect = width / height;
                    camera.updateProjectionMatrix();
                    renderer.setSize(width, height);
                }
            }
        });
        resizeObserver.observe(containerRef.current);

        let frameId: number;
        const animate = () => {
            frameId = requestAnimationFrame(animate);

            // Parallax camera easing
            targetCamera.x = pointer.x * 1.6;
            targetCamera.y = -pointer.y * 1.2;
            camera.position.x += (targetCamera.x - camera.position.x) * 0.06;
            camera.position.y += (targetCamera.y - camera.position.y) * 0.06;
            camera.lookAt(0, 0, 0);

            coreGroup.rotation.y += 0.0018;
            coreGroup.rotation.x += 0.0009;

            ringGroup.children.forEach(child => {
                const speed = (child as any).userData.speed || 0.001;
                child.rotation.z += speed;
            });

            const time = performance.now() * 0.0012;
            sweeper.position.y = Math.sin(time) * 7;
            sweeper.rotation.z += 0.006;

            for (let i = 0; i < shardCount; i += 1) {
                shardMesh.getMatrixAt(i, shardDummy.matrix);
                shardDummy.position.add(shardSpeeds[i].drift);
                shardDummy.rotation.x += shardSpeeds[i].rotation.x;
                shardDummy.rotation.y += shardSpeeds[i].rotation.y;
                shardDummy.rotation.z += shardSpeeds[i].rotation.z;

                // Soft bounds reset
                if (shardDummy.position.length() > 22) {
                    shardDummy.position.set(
                        (Math.random() - 0.5) * 14,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10
                    );
                }

                shardDummy.updateMatrix();
                shardMesh.setMatrixAt(i, shardDummy.matrix);
            }
            shardMesh.instanceMatrix.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('pointermove', onPointerMove);
            resizeObserver.disconnect();
            shardGeometry.dispose();
            shardMaterial.dispose();
            sweeperGeom.dispose();
            sweeperMat.dispose();
            coreGroup.children.forEach(child => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose();
                    (child.material as THREE.Material).dispose();
                }
            });
            ringGroup.children.forEach(child => {
                if (child instanceof THREE.LineLoop) {
                    child.geometry.dispose();
                    (child.material as THREE.Material).dispose();
                }
            });
            renderer.dispose();
            if (containerRef.current?.contains(renderer.domElement)) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />;
};

export default React.memo(HeroBackground3D);
