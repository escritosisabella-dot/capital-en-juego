import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d, Play, Pause, Sparkles, Shield, Compass } from 'lucide-react';

export interface Ball3DProps {
  key?: number | string;
  className?: string;
  textureUrl?: string;
  onSideChange?: (side: 'futbol' | 'dinero') => void;
}

export const Ball3D = ({
  className = '',
  onSideChange,
}: Ball3DProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);

  // References for controlling rotation targets
  const setTargetRotationYRef = useRef<((val: number) => void) | null>(null);
  const toggleRotateRef = useRef<(() => void) | null>(null);
  const resetViewRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 4.2;

    // 2. High Quality WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 3. Sphere Geometry (High tessellation for smooth curve)
    const geometry = new THREE.SphereGeometry(1.42, 64, 64);

    // 4. Physical PBR Material for authentic match ball leather
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.32,
      metalness: 0.05,
    });

    const ballMesh = new THREE.Mesh(geometry, material);
    scene.add(ballMesh);

    // 4b. 3D Luxury Orbital Ring 1: Champagne Gold
    const ring1Geo = new THREE.TorusGeometry(1.9, 0.012, 16, 120);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x78350f,
      emissiveIntensity: 0.2,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3;
    scene.add(ring1Mesh);

    // 4c. 3D Luxury Orbital Ring 2: Emerald Green Titanium
    const ring2Geo = new THREE.TorusGeometry(1.78, 0.008, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x064e3b,
      emissiveIntensity: 0.2,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI / 4;
    ring2Mesh.rotation.z = Math.PI / 6;
    scene.add(ring2Mesh);

    // 4d. Floating 3D Gold & Emerald Ambient Sparkle Particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.1 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.cos(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Mix of champagne gold (0.98, 0.75, 0.2) and emerald (0.2, 0.83, 0.6)
      if (Math.random() > 0.4) {
        particleColors[i * 3] = 0.98;
        particleColors[i * 3 + 1] = 0.75;
        particleColors[i * 3 + 2] = 0.2;
      } else {
        particleColors[i * 3] = 0.2;
        particleColors[i * 3 + 1] = 0.85;
        particleColors[i * 3 + 2] = 0.6;
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 5. Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    const ballTexture = textureLoader.load('/official-soccer-ball.png', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.anisotropy = maxAnisotropy;
      material.map = tex;
      material.needsUpdate = true;
    });

    const ballBump = textureLoader.load('/official-soccer-ball-bump.png', (bump) => {
      bump.wrapS = THREE.RepeatWrapping;
      bump.wrapT = THREE.ClampToEdgeWrapping;
      bump.anisotropy = maxAnisotropy;
      material.bumpMap = bump;
      material.bumpScale = 0.025;
      material.needsUpdate = true;
    });

    // 6. Realistic Studio Lighting
    // Ambient light: Soft fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key Light: Warm bright key from top-front-right
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(3.5, 4.0, 3.5);
    scene.add(keyLight);

    // Fill Light: Soft neutral light from opposite side
    const fillLight = new THREE.DirectionalLight(0xf1f5f9, 1.1);
    fillLight.position.set(-3.5, -1.5, 2.5);
    scene.add(fillLight);

    // Subtle Emerald Rim Light: connects with "Capital en Juego" theme
    const rimLight = new THREE.PointLight(0x10b981, 1.8, 10);
    rimLight.position.set(-3.0, 2.5, -2.0);
    scene.add(rimLight);

    // Bottom Bounce Light: simulated turf reflection
    const turfBounce = new THREE.DirectionalLight(0x059669, 0.4);
    turfBounce.position.set(0, -3.0, 0);
    scene.add(turfBounce);

    // 7. Interactive Drag & Touch State
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let targetRotationX = 0.05;
    let targetRotationY = 0.0;
    let autoRotate = true;

    setTargetRotationYRef.current = (rotY: number) => {
      autoRotate = false;
      setIsRotating(false);
      targetRotationY = rotY;
      targetRotationX = 0.05;
    };

    resetViewRef.current = () => {
      targetRotationX = 0.05;
      targetRotationY = 0.0;
    };

    toggleRotateRef.current = () => {
      autoRotate = !autoRotate;
      setIsRotating(autoRotate);
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      autoRotate = false;
      setIsRotating(false);
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      targetRotationY += deltaX * 0.007;
      targetRotationX += deltaY * 0.007;

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        autoRotate = false;
        setIsRotating(false);
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMouseX;
      const deltaY = e.touches[0].clientY - previousMouseY;

      targetRotationY += deltaX * 0.007;
      targetRotationX += deltaY * 0.007;

      previousMouseX = e.touches[0].clientX;
      previousMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 8. Render & Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Natural subtle bobbing
      ballMesh.position.y = Math.sin(elapsedTime * 1.4) * 0.05;

      // 3D Luxury Orbital Rings motion
      ring1Mesh.rotation.z += 0.008;
      ring1Mesh.rotation.x += 0.004;
      ring2Mesh.rotation.x -= 0.006;
      ring2Mesh.rotation.y += 0.005;

      // Ambient 3D particles gentle celestial rotation
      particleSystem.rotation.y += 0.002;
      particleSystem.position.y = Math.sin(elapsedTime * 0.8) * 0.03;

      // Auto rotation
      if (autoRotate) {
        targetRotationY += 0.006;
      }

      // Smooth damping interpolation
      ballMesh.rotation.y += (targetRotationY - ballMesh.rotation.y) * 0.08;
      ballMesh.rotation.x += (targetRotationX - ballMesh.rotation.x) * 0.08;

      // Restrict extreme flipping
      targetRotationX = Math.max(-0.6, Math.min(0.6, targetRotationX));

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      resizeObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      ballTexture.dispose();
      ballBump.dispose();
      renderer.dispose();
    };
  }, [onSideChange]);

  const handleRotateFront = () => {
    setTargetRotationYRef.current?.(0);
  };

  const handleRotateSide = () => {
    setTargetRotationYRef.current?.(Math.PI / 2);
  };

  const handleRotateBack = () => {
    setTargetRotationYRef.current?.(Math.PI);
  };

  const handleToggleRotate = () => {
    toggleRotateRef.current?.();
  };

  return (
    <div className={`relative flex flex-col items-center justify-between w-full h-full ${className}`}>
      {/* Floating HUD: Balón Oficial y Simbolismo en Cursiva Elegante */}
      <div className="absolute top-2 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs backdrop-blur-xl border bg-slate-950/80 text-amber-200 border-amber-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)] pointer-events-auto">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-serif italic text-sm">Balón Oficial: 100% del Capital</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/75 border border-white/10 text-[11px] font-medium text-slate-300 backdrop-blur-xl">
          <Compass className="w-3 h-3 text-emerald-400" />
          <span className="font-cormorant italic text-xs">Perspectiva 3D 360°</span>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full min-h-[300px] sm:min-h-[350px] cursor-grab active:cursor-grabbing"
      />

      {/* Interactive Luxury Controls Bar */}
      <div className="w-full pt-2 flex flex-wrap items-center justify-between gap-2 z-20">
        <div className="inline-flex items-center rounded-full bg-slate-950/85 p-1 border border-white/10 gap-1 backdrop-blur-xl shadow-lg">
          <button
            type="button"
            onClick={handleRotateFront}
            className="px-3 py-1 rounded-full text-xs font-serif italic text-slate-300 hover:text-amber-200 hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            Frente
          </button>
          <button
            type="button"
            onClick={handleRotateSide}
            className="px-3 py-1 rounded-full text-xs font-serif italic text-slate-300 hover:text-amber-200 hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            Lateral
          </button>
          <button
            type="button"
            onClick={handleRotateBack}
            className="px-3 py-1 rounded-full text-xs font-serif italic text-slate-300 hover:text-amber-200 hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            Posterior
          </button>
        </div>

        <button
          type="button"
          onClick={handleToggleRotate}
          title={isRotating ? 'Pausar giro automático' : 'Reanudar giro automático'}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/85 hover:bg-white/[0.06] text-slate-300 hover:text-white text-xs font-medium border border-white/10 transition-colors cursor-pointer backdrop-blur-xl shadow-lg"
        >
          {isRotating ? (
            <>
              <Pause className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-cormorant italic text-xs">Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-cormorant italic text-xs">Giro continuo</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
