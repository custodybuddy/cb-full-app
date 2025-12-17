import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const AccentOrb = () => {
    const groupRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const orbRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.12;
            groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.08;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z = t * 0.2;
        }
        if (orbRef.current) {
            orbRef.current.position.y = Math.sin(t * 0.5) * 0.12;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh ref={orbRef} position={[0, 0, 0]}>
                <sphereGeometry args={[0.85, 32, 32]} />
                <meshStandardMaterial color="#fbbf24" emissive="#b45309" emissiveIntensity={0.35} roughness={0.2} metalness={0.6} />
            </mesh>
            <mesh ref={ringRef} rotation={[Math.PI / 2.8, 0, 0]}>
                <torusGeometry args={[1.35, 0.08, 18, 100]} />
                <meshStandardMaterial color="#fef3c7" emissive="#f59e0b" emissiveIntensity={0.25} roughness={0.4} />
            </mesh>
        </group>
    );
};

const DustField = () => {
    const pointsRef = useRef<THREE.Points>(null);
    const positions = useMemo(() => {
        const count = 220;
        const data = new Float32Array(count * 3);
        for (let i = 0; i < count; i += 1) {
            data[i * 3] = (Math.random() - 0.5) * 8;
            data[i * 3 + 1] = (Math.random() - 0.5) * 4;
            data[i * 3 + 2] = (Math.random() - 0.5) * 6;
        }
        return data;
    }, []);

    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = clock.getElapsedTime() * 0.03;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" array={positions} itemSize={3} count={positions.length / 3} />
            </bufferGeometry>
            <pointsMaterial size={0.035} color="#fde68a" opacity={0.5} transparent />
        </points>
    );
};

const HeroBackground = () => {
    return (
        <div className="absolute inset-0 -z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 55 }}
                dpr={[1, 1.3]}
                gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[4, 3, 5]} intensity={0.6} />
                <directionalLight position={[-4, -2, 2]} intensity={0.25} />
                <AccentOrb />
                <DustField />
            </Canvas>
        </div>
    );
};

export default HeroBackground;
