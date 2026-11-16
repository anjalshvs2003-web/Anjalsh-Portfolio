"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Hero3DCanvasProps {
  onLoaded?: () => void;
}

interface ShapeItem {
  mesh: THREE.Mesh | THREE.Group;
  basePos: [number, number, number];
  rotSpeed: [number, number, number];
  floatSpeed: number;
  floatAmplitude: number;
  phase: number;
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
    scene.fog = new THREE.FogExp2(0x0a0d12, 0.04);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // ==========================================
    // PROCEDURAL GRADIENT TEXTURES
    // ==========================================
    const createLinearGradientTexture = (colors: string[]): THREE.CanvasTexture => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 512, 512);
        colors.forEach((c, idx) => {
          gradient.addColorStop(idx / (colors.length - 1), c);
        });
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      return texture;
    };

    const gradientTexPrimary = createLinearGradientTexture([
      "#1E3A8A", // Deep Cobalt
      "#2563EB", // Rich Blue
      "#3B82F6", // Electric Blue
      "#06B6D4", // Bright Cyan
      "#818CF8", // Soft Indigo
    ]);

    const gradientTexSecondary = createLinearGradientTexture([
      "#0E7490", // Deep Cyan
      "#06B6D4", // Cyan
      "#3B82F6", // Electric Blue
      "#6366F1", // Indigo
      "#A855F7", // Purple Sheen
    ]);

    const gradientTexTertiary = createLinearGradientTexture([
      "#1D4ED8", // Blue
      "#38BDF8", // Sky
      "#22D3EE", // Aqua
      "#4F46E5", // Deep Violet
    ]);

    // ==========================================
    // DYNAMIC INTERACTIVE LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xe0f2fe, 1.2);
    dirLight.position.set(6, 8, 8);
    scene.add(dirLight);

    // Mouse-tracking dynamic point lights (Electric Blue, Cyan & Violet)
    const bluePointLight = new THREE.PointLight(0x3b82f6, 4.5, 24);
    bluePointLight.position.set(0, 0, 6);
    scene.add(bluePointLight);

    const cyanPointLight = new THREE.PointLight(0x06b6d4, 3.8, 20);
    cyanPointLight.position.set(-3, 2, 4);
    scene.add(cyanPointLight);

    const violetPointLight = new THREE.PointLight(0x8b5cf6, 3.2, 18);
    violetPointLight.position.set(4, -3, 3);
    scene.add(violetPointLight);

    // ==========================================
    // 3D GRADIENT SHAPES GROUP
    // ==========================================
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    const shapeItems: ShapeItem[] = [];

    // Helper to create glossy gradient physical material
    const createGradientMaterial = (texture: THREE.CanvasTexture, wireframe = false) => {
      return new THREE.MeshPhysicalMaterial({
        map: texture,
        roughness: 0.18,
        metalness: 0.65,
        clearcoat: 0.85,
        clearcoatRoughness: 0.15,
        reflectivity: 0.9,
        wireframe: wireframe,
        transparent: true,
        opacity: wireframe ? 0.35 : 0.88,
      });
    };

    // 1. Torus Knot — Smooth flowing procedural twisted ribbon (Left upper area)
    const knotGeom = new THREE.TorusKnotGeometry(1.0, 0.28, 128, 32, 2, 3);
    const knotMat = createGradientMaterial(gradientTexPrimary);
    const knotMesh = new THREE.Mesh(knotGeom, knotMat);
    shapesGroup.add(knotMesh);
    shapeItems.push({
      mesh: knotMesh,
      basePos: [-4.6, 1.5, -0.5],
      rotSpeed: [0.006, 0.008, 0.003],
      floatSpeed: 0.9,
      floatAmplitude: 0.18,
      phase: 0,
    });

    // 2. Icosahedron Crystal with Dual-Layer Wireframe (Right upper background)
    const icoGroup = new THREE.Group();
    const icoGeom = new THREE.IcosahedronGeometry(1.2, 0);
    const icoMatSolid = createGradientMaterial(gradientTexSecondary);
    const icoMeshSolid = new THREE.Mesh(icoGeom, icoMatSolid);
    icoGroup.add(icoMeshSolid);

    const icoWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const icoMeshWire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.24, 0), icoWireMat);
    icoGroup.add(icoMeshWire);

    shapesGroup.add(icoGroup);
    shapeItems.push({
      mesh: icoGroup,
      basePos: [4.6, 2.2, -1.2],
      rotSpeed: [0.005, 0.009, 0.004],
      floatSpeed: 0.8,
      floatAmplitude: 0.22,
      phase: 1.2,
    });

    // 3. Smooth Gradient Sphere / Liquid Orb (Bottom-left area)
    const sphereGeom = new THREE.SphereGeometry(1.05, 64, 64);
    const sphereMat = createGradientMaterial(gradientTexTertiary);
    const sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
    shapesGroup.add(sphereMesh);
    shapeItems.push({
      mesh: sphereMesh,
      basePos: [-3.2, -2.4, 0.5],
      rotSpeed: [0.004, 0.006, 0.002],
      floatSpeed: 1.1,
      floatAmplitude: 0.24,
      phase: 2.4,
    });

    // 4. Orbital Torus Ring Encircling Area (Right lower area)
    const torusRingGroup = new THREE.Group();
    const ringGeom = new THREE.TorusGeometry(1.4, 0.07, 24, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.35,
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    torusRingGroup.add(ringMesh);

    // Inner small floating gemstone
    const innerGemGeom = new THREE.OctahedronGeometry(0.55, 0);
    const innerGemMat = createGradientMaterial(gradientTexPrimary);
    const innerGem = new THREE.Mesh(innerGemGeom, innerGemMat);
    torusRingGroup.add(innerGem);

    shapesGroup.add(torusRingGroup);
    shapeItems.push({
      mesh: torusRingGroup,
      basePos: [3.8, -1.8, 0.2],
      rotSpeed: [0.008, 0.012, 0.005],
      floatSpeed: 1.0,
      floatAmplitude: 0.2,
      phase: 3.5,
    });

    // 5. Octahedron Diamond Prism (Top center-right background)
    const octaGeom = new THREE.OctahedronGeometry(0.85, 0);
    const octaMat = createGradientMaterial(gradientTexSecondary);
    const octaMesh = new THREE.Mesh(octaGeom, octaMat);
    shapesGroup.add(octaMesh);
    shapeItems.push({
      mesh: octaMesh,
      basePos: [1.2, 3.4, -2.2],
      rotSpeed: [0.007, 0.005, 0.009],
      floatSpeed: 0.75,
      floatAmplitude: 0.16,
      phase: 4.2,
    });

    // 6. Dodecahedron Polyhedron (Deep left background)
    const dodecaGeom = new THREE.DodecahedronGeometry(0.75, 0);
    const dodecaMat = createGradientMaterial(gradientTexTertiary);
    const dodecaMesh = new THREE.Mesh(dodecaGeom, dodecaMat);
    shapesGroup.add(dodecaMesh);
    shapeItems.push({
      mesh: dodecaMesh,
      basePos: [-5.6, -1.2, -1.8],
      rotSpeed: [0.005, 0.007, 0.006],
      floatSpeed: 0.85,
      floatAmplitude: 0.18,
      phase: 5.1,
    });

    // 7. Minimalist Cylinder / Disc (Right center-bottom background)
    const discGeom = new THREE.CylinderGeometry(0.85, 0.85, 0.08, 48);
    const discMat = createGradientMaterial(gradientTexPrimary);
    const discMesh = new THREE.Mesh(discGeom, discMat);
    shapesGroup.add(discMesh);
    shapeItems.push({
      mesh: discMesh,
      basePos: [5.2, -0.2, -1.5],
      rotSpeed: [0.009, 0.004, 0.008],
      floatSpeed: 0.95,
      floatAmplitude: 0.15,
      phase: 1.8,
    });

    // ==========================================
    // FLOATING ATMOSPHERIC PARTICLES
    // ==========================================
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 22;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = (Math.random() - 0.5) * 14;

      const isCyan = Math.random() > 0.6;
      colors[i] = isCyan ? 0.02 : 0.23;
      colors[i + 1] = isCyan ? 0.71 : 0.51;
      colors[i + 2] = isCyan ? 0.83 : 0.96;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ==========================================
    // MOUSE & SCROLL TRACKING
    // ==========================================
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

    // ==========================================
    // ANIMATION & INTERACTION LOOP
    // ==========================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation (spring inertia)
      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      // Parallax camera movement
      const scrollFactor = Math.min(scrollY / 800, 1.2);
      camera.position.x = mouse.x * 1.8;
      camera.position.y = mouse.y * 1.2 - scrollFactor * 3.5;
      camera.position.z = 11 - scrollFactor * 4.0;
      camera.lookAt(0, -scrollFactor * 1.5, 0);

      // Interactive Point Lights glide with mouse
      bluePointLight.position.x = mouse.x * 6.5;
      bluePointLight.position.y = mouse.y * 5.0;

      cyanPointLight.position.x = -mouse.x * 5.5 + Math.sin(elapsedTime * 0.8) * 2;
      cyanPointLight.position.y = -mouse.y * 4.0 + Math.cos(elapsedTime * 0.8) * 1.5;

      violetPointLight.position.x = Math.cos(elapsedTime * 0.6) * 5.0;
      violetPointLight.position.y = Math.sin(elapsedTime * 0.6) * 4.0;

      // Update 3D shapes: floating oscillation + rotation + mouse tilt
      shapeItems.forEach(({ mesh, basePos, rotSpeed, floatSpeed, floatAmplitude, phase }) => {
        // Natural floating sinusoidal breathing
        const floatY = Math.sin(elapsedTime * floatSpeed + phase) * floatAmplitude;
        const floatX = Math.cos(elapsedTime * floatSpeed * 0.7 + phase) * (floatAmplitude * 0.4);

        // Position with base + float + subtle mouse parallax
        mesh.position.x = basePos[0] + floatX + mouse.x * 0.35;
        mesh.position.y = basePos[1] + floatY + mouse.y * 0.35;
        mesh.position.z = basePos[2];

        // Continuous rotation enhanced by mouse velocity
        mesh.rotation.x += rotSpeed[0] + mouse.y * 0.003;
        mesh.rotation.y += rotSpeed[1] + mouse.x * 0.003;
        mesh.rotation.z += rotSpeed[2];
      });

      // Slowly rotate particle field
      particles.rotation.y = elapsedTime * 0.025;
      particles.rotation.x = elapsedTime * 0.012;

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
      gradientTexPrimary.dispose();
      gradientTexSecondary.dispose();
      gradientTexTertiary.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      knotGeom.dispose();
      knotMat.dispose();
      icoGeom.dispose();
      icoMatSolid.dispose();
      icoWireMat.dispose();
      sphereGeom.dispose();
      sphereMat.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      innerGemGeom.dispose();
      innerGemMat.dispose();
      octaGeom.dispose();
      octaMat.dispose();
      dodecaGeom.dispose();
      dodecaMat.dispose();
      discGeom.dispose();
      discMat.dispose();
    };
  }, [onLoaded]);

  if (!isSupported) return null;

  return (
    <div
      ref={mountRef}
      className="webgl-canvas-container absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ opacity: 0.95 }}
    />
  );
}
