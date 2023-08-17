import Head from 'next/head'
import { Suspense } from "react"
import { Canvas, useLoader } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/ATC622/ATC622.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={0.01} />
    </>
  );
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>Three.js Example</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="globe">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 400, 4], fov: 100 }}>
          <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
          <Suspense fallback={null}>
            <Model />
            <Environment preset="city" />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>

    </div>
  )
}