'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function EarthGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 18;
    camera.position.y = 1; // Look slightly down

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
    mount.appendChild(renderer.domElement);

    // Group to hold globe and atmosphere
    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const textureLoader = new THREE.TextureLoader();
    
    // 1. Earth Sphere (Night Map with City Lights)
    const earthGeometry = new THREE.SphereGeometry(6, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load('https://unpkg.com/three-globe/example/img/earth-night.jpg'),
      bumpMap: textureLoader.load('https://unpkg.com/three-globe/example/img/earth-topology.png'),
      bumpScale: 0.2,
      specularMap: textureLoader.load('https://unpkg.com/three-globe/example/img/earth-water.png'),
      specular: new THREE.Color('grey'),
      shininess: 40
    });
    
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);

    // 2. Cloud Layer (slightly larger sphere)
    const cloudGeometry = new THREE.SphereGeometry(6.1, 64, 64);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    earthGroup.add(cloudMesh);

    // 3. Atmosphere Glow (Outer Halo)
    const atmosGeometry = new THREE.SphereGeometry(6.4, 64, 64);
    const atmosMaterial = new THREE.MeshBasicMaterial({
      color: 0x0055ff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide // Render on the inside so it looks like a halo around the edge
    });
    const atmosMesh = new THREE.Mesh(atmosGeometry, atmosMaterial);
    earthGroup.add(atmosMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Base illumination
    scene.add(ambientLight);

    // Main sun light (from top right)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 5, 10);
    scene.add(directionalLight);
    
    // Blue rim light (from bottom left) to give a medical/tech sci-fi feel
    const rimLight = new THREE.DirectionalLight(0x00aaff, 2);
    rimLight.position.set(-15, -5, -15);
    scene.add(rimLight);

    // 4. Starfield Background
    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 2000;
    const posArray = new Float32Array(starsCount * 3);
    for(let i = 0; i < starsCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 150; // Spread stars across a large area
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });
    const starsMesh = new THREE.Points(starsGeo, starsMat);
    scene.add(starsMesh);

    // 5. Orbital Network Rings & Satellites
    const ringsGroup = new THREE.Group();
    earthGroup.add(ringsGroup);

    const ringColors = [0x00f3ff, 0xff00ff, 0x00ff88];
    const satellites: { mesh: THREE.Mesh; radius: number }[] = [];

    for (let i = 0; i < 3; i++) {
      const radius = 7.5 + i * 0.8;
      const ringGeo = new THREE.TorusGeometry(radius, 0.015, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({ color: ringColors[i], transparent: true, opacity: 0.25 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      
      // Random tilt for each ring
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      ringsGroup.add(ring);

      // Add a glowing satellite to the ring
      const satGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const satellite = new THREE.Mesh(satGeo, satMat);
      
      // Attach a tiny light to the satellite so it glows
      const satLight = new THREE.PointLight(ringColors[i], 2, 8);
      satellite.add(satLight);

      ring.add(satellite);
      satellites.push({ mesh: satellite, radius });
    }

    // Tilt the earth group to match real axial tilt (approx 23.5 degrees)
    earthGroup.rotation.z = 23.5 * Math.PI / 180;

    // Handle Resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      
      // Rotate earth and clouds
      earthMesh.rotation.y += 0.001;
      cloudMesh.rotation.y += 0.0015; // Clouds move slightly faster than earth
      
      // Slowly float the whole group up and down for a nice idle effect
      const time = Date.now() * 0.001;
      earthGroup.position.y = Math.sin(time) * 0.3;

      // Slowly rotate the background stars
      starsMesh.rotation.y += 0.0002;
      starsMesh.rotation.x += 0.0001;

      // Animate satellites along their rings
      satellites.forEach((sat, i) => {
        // Calculate position on the circle (X, Y)
        const angle = time * (0.8 + i * 0.3); // Different speeds
        sat.mesh.position.x = Math.cos(angle) * sat.radius;
        sat.mesh.position.y = Math.sin(angle) * sat.radius;
      });

      // Slowly rotate the entire rings group
      ringsGroup.rotation.y -= 0.0005;
      ringsGroup.rotation.z += 0.0002;
      
      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      
      // Cleanup geometries and materials to prevent memory leaks
      earthGeometry.dispose();
      earthMaterial.dispose();
      cloudGeometry.dispose();
      cloudMaterial.dispose();
      atmosGeometry.dispose();
      atmosMaterial.dispose();
      starsGeo.dispose();
      starsMat.dispose();
      
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
