import { Suspense } from 'react'
import type * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import type { WorldObject3d } from '../../types/world3d'
import { WorldObject } from './WorldObject'
export const WorldScene: React.FC<{ root: WorldObject3d }> = ({ root }) => (
  <Canvas shadows camera={{ position: [8, 6, 12], fov: 60 }}>
    <Suspense fallback={null}>
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[10, 20, 10]}
        intensity={1.5}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Sky sunPosition={[100, 20, 100]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#3a7d44" />
      </mesh>
      <WorldObject object={root} />
      <OrbitControls makeDefault target={[0, 1, 0]} />
    </Suspense>
  </Canvas>
)
