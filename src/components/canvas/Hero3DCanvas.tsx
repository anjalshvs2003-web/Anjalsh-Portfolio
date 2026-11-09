"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Hero3DCanvasProps {
  onLoaded?: () => void;
}

export default function Hero3DCanvas({ onLoaded }: Hero3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement("canvas");
      const hasWebGL = Boolean(
        window.WebGLRenderingContext &&
          (testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl"))
      );
      if (!hasWebGL) {
        setIsSupported(false);
        onLoaded?.();
        return;
      }
    } catch {
      setIsSupported(false);
      onLoaded?.();
      return;
    }

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x100D0F, 0.038);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xf5f2f0, 0.65);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.1);
    dirLight.position.set(5, 8, 7);
    scene.add(dirLight);

    // Signature Accent Orange Point Light moving with mouse
    const orangePointLight = new THREE.PointLight(0xf0783d, 3.2, 22);
    orangePointLight.position.set(0, 0, 5);
    scene.add(orangePointLight);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();

    // Photographic frames data (incorporating authentic user portrait & film stills)
    const frameImages = [
      "/images/photography/anjalsh-portrait.jpg",
      "/images/ai-films/the-forgotten-smile.jpg",
      "/images/photography/im-vijayan-cover.jpg",
      "/images/ai-films/the-unseen-vision.jpg",
      "/images/photography/editorial-portrait-cover.jpg",
      "/images/graphic-design/luxe-gold-01.jpg",
    ];

    const planesGroup = new THREE.Group();
    scene.add(planesGroup);

    // Positions for floating cinematic panels in 3D space
    const planeLayouts = [
      { pos: [-3.8, 1.2, 1.5], rot: [0.08, 0.25, -0.05], scale: [2.6, 1.6] }, // Top left landscape
      { pos: [3.6, 1.4, 0.5], rot: [-0.05, -0.22, 0.04], scale: [1.8, 2.4] },  // Top right portrait
      { pos: [-4.2, -2.0, -1.0], rot: [0.12, 0.3, -0.08], scale: [1.8, 2.4] },  // Bottom left portrait
      { pos: [3.8, -1.8, 1.8], rot: [-0.08, -0.25, 0.06], scale: [2.6, 1.6] },  // Bottom right landscape
      { pos: [0.2, -2.8, -3.0], rot: [0.15, 0.05, -0.02], scale: [3.0, 1.8] },  // Center deep
      { pos: [-0.3, 2.8, -4.0], rot: [-0.15, -0.05, 0.03], scale: [2.8, 1.7] }, // Center high deep
    ];

    const meshes: THREE.Mesh[] = [];

    planeLayouts.forEach((layout, index) => {
      const imgUrl = frameImages[index % frameImages.length];
      const geom = new THREE.PlaneGeometry(layout.scale[0], layout.scale[1], 16, 16);

      textureLoader.load(
        imgUrl,
        (texture) => {
          texture.generateMipmaps = true;
          texture.minFilter = THREE.LinearMipmapLinearFilter;

          const mat = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.25,
            metalness: 0.1,
            side: THREE.DoubleSide,
          });

          const mesh = new THREE.Mesh(geom, mat);
          mesh.position.set(layout.pos[0], layout.pos[1], layout.pos[2]);
          mesh.rotation.set(layout.rot[0], layout.rot[1], layout.rot[2]);

          // Subtle accent orange and dark border wireframe
          const borderGeom = new THREE.EdgesGeometry(geom);
          const borderMat = new THREE.LineBasicMaterial({
            color: index % 2 === 0 ? 0xf0783d : 0x33292c,
            transparent: true,
            opacity: index % 2 === 0 ? 0.45 : 0.35,
          });
          const border = new THREE.LineSegments(borderGeom, borderMat);
          mesh.add(border);

          planesGroup.add(mesh);
          meshes.push(mesh);
        },
        undefined,
        () => {
          const fallbackMat = new THREE.MeshStandardMaterial({
            color: 0x211a1d,
            roughness: 0.4,
          });
          const mesh = new THREE.Mesh(geom, fallbackMat);
          mesh.position.set(layout.pos[0], layout.pos[1], layout.pos[2]);
          planesGroup.add(mesh);
          meshes.push(mesh);
        }
      );
    });

    // Floating cinematic particles in 3D
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = (Math.random() - 0.5) * 14;

      // Color alternating between warm white and signature orange (#F0783D)
      const isOrange = Math.random() > 0.75;
      colors[i] = isOrange ? 0.94 : 0.85;
      colors[i + 1] = isOrange ? 0.47 : 0.82;
      colors[i + 2] = isOrange ? 0.24 : 0.8;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse and scroll tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    onLoaded?.();

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation (cinematic inertia)
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Camera parallax
      const scrollFactor = Math.min(scrollY / 800, 1.2);
      camera.position.x = mouse.x * 1.5;
      camera.position.y = mouse.y * 1.0 - scrollFactor * 3.5;
      camera.position.z = 10 - scrollFactor * 4.0;
      camera.lookAt(0, -scrollFactor * 1.5, 0);

      // Move orange point light with mouse
      orangePointLight.position.x = mouse.x * 5;
      orangePointLight.position.y = mouse.y * 4;

      // Floating gentle motion for planes
      meshes.forEach((mesh, idx) => {
        mesh.position.y += Math.sin(elapsedTime * 1.2 + idx * 1.5) * 0.002;
        mesh.rotation.y += Math.cos(elapsedTime * 0.8 + idx) * 0.0008;
      });

      // Slowly rotate particle field
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = elapsedTime * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      });
    };
  }, [onLoaded]);

  if (!isSupported) return null;

  return (
    <div
      ref={mountRef}
      className="webgl-canvas-container absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ opacity: 0.85 }}
    />
  );
}
