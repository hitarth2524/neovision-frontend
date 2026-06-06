'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FloatingCells() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // DNA double helix
    const helixGroup = new THREE.Group();
    const helixPoints1: THREE.Vector3[] = [];
    const helixPoints2: THREE.Vector3[] = [];

    for (let i = 0; i < 60; i++) {
      const t = (i / 60) * Math.PI * 4;
      const y = (i / 60) * 6 - 3;
      helixPoints1.push(new THREE.Vector3(Math.cos(t) * 0.6, y, Math.sin(t) * 0.6));
      helixPoints2.push(new THREE.Vector3(Math.cos(t + Math.PI) * 0.6, y, Math.sin(t + Math.PI) * 0.6));
    }

    const curve1 = new THREE.CatmullRomCurve3(helixPoints1);
    const curve2 = new THREE.CatmullRomCurve3(helixPoints2);

    const tubeGeo1 = new THREE.TubeGeometry(curve1, 100, 0.02, 8, false);
    const tubeMat1 = new THREE.MeshBasicMaterial({ color: 0x003e7a, transparent: true, opacity: 0.6 });
    helixGroup.add(new THREE.Mesh(tubeGeo1, tubeMat1));

    const tubeGeo2 = new THREE.TubeGeometry(curve2, 100, 0.02, 8, false);
    const tubeMat2 = new THREE.MeshBasicMaterial({ color: 0x006a62, transparent: true, opacity: 0.6 });
    helixGroup.add(new THREE.Mesh(tubeGeo2, tubeMat2));

    // Rungs
    for (let i = 0; i < 60; i += 3) {
      const rungGeo = new THREE.BufferGeometry().setFromPoints([helixPoints1[i], helixPoints2[i]]);
      const rungMat = new THREE.LineBasicMaterial({ color: 0xa8c8ff, transparent: true, opacity: 0.4 });
      helixGroup.add(new THREE.Line(rungGeo, rungMat));

      // Node spheres
      const sphereGeo = new THREE.SphereGeometry(0.05, 6, 6);
      const sph1 = new THREE.Mesh(sphereGeo, new THREE.MeshBasicMaterial({ color: 0x0055a4 }));
      sph1.position.copy(helixPoints1[i]);
      const sph2 = new THREE.Mesh(sphereGeo.clone(), new THREE.MeshBasicMaterial({ color: 0x78f7e9 }));
      sph2.position.copy(helixPoints2[i]);
      helixGroup.add(sph1, sph2);
    }

    helixGroup.position.x = 1.5;
    scene.add(helixGroup);

    // Floating cells
    const cellCount = 12;
    const cells: THREE.Mesh[] = [];
    for (let i = 0; i < cellCount; i++) {
      const r = Math.random() * 0.15 + 0.08;
      const geo = new THREE.IcosahedronGeometry(r, 1);
      const mat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x003e7a : i % 3 === 1 ? 0x006a62 : 0xa8c8ff,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      const cell = new THREE.Mesh(geo, mat);
      cell.position.set(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2
      );
      scene.add(cell);
      cells.push(cell);
    }

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
      helixGroup.rotation.y = t * 0.3;
      cells.forEach((c, i) => {
        c.rotation.x = t * 0.4 + i;
        c.rotation.y = t * 0.3 + i;
        c.position.y += Math.sin(t + i) * 0.003;
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
