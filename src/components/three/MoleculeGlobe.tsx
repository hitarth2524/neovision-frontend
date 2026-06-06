'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MoleculeGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Globe wireframe
    const globeGeo = new THREE.SphereGeometry(1.5, 24, 24);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x003e7a,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // Pulse nodes on globe surface
    const nodeCount = 30;
    const nodeGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x0055a4 });

    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const node = new THREE.Mesh(nodeGeo, nodeMat.clone());
      node.position.setFromSphericalCoords(1.5, phi, theta);
      scene.add(node);
      nodes.push(node);
    }

    // Connecting arcs between close nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < 1.2) {
          const points = [nodes[i].position, nodes[j].position];
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          const lineMat = new THREE.LineBasicMaterial({ color: 0x006a62, transparent: true, opacity: 0.3 });
          scene.add(new THREE.Line(lineGeo, lineMat));
        }
      }
    }

    // Orbiting ring
    const ringGeo = new THREE.TorusGeometry(2, 0.006, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xa8c8ff, transparent: true, opacity: 0.4 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Orbiting dot
    const dotGeo = new THREE.SphereGeometry(0.07, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x78f7e9 });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    scene.add(dot);

    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    const timer = new THREE.Timer();
    const animate = (timestamp: number) => {
      animId = requestAnimationFrame(animate);
      timer.update(timestamp);
      const t = timer.getElapsed();

      globe.rotation.y = t * 0.15;
      globe.rotation.x = t * 0.05;
      ring.rotation.z = t * 0.3;

      // Orbit dot around ring
      dot.position.x = Math.cos(t * 0.7) * 2;
      dot.position.y = Math.sin(t * 0.7) * 2 * Math.cos(Math.PI / 3);
      dot.position.z = Math.sin(t * 0.7) * 2 * Math.sin(Math.PI / 3);

      // Pulse nodes
      nodes.forEach((n, i) => {
        const scale = 1 + Math.sin(t * 2 + i * 0.5) * 0.4;
        n.scale.setScalar(scale);
        (n.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(t + i) * 0.5;
      });

      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
