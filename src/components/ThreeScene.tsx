'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedTorus = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} scale={1.5}>
                <torusKnotGeometry args={[9, 1.5, 300, 20]} />
                <MeshDistortMaterial
                    color="#8b5cf6"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                    wireframe={true}
                />
            </mesh>
        </Float>
    );
};

export default function ThreeScene() {
    return (
        <div className="fixed inset-0 z-[-1] bg-gradient-mesh w-full h-full">
            <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#06b6d4" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#f43f5e" />
                <Suspense fallback={null}>
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <AnimatedTorus />
                </Suspense>
            </Canvas>
        </div>
    );
}
