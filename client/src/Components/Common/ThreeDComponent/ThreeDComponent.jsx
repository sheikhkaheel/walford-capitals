import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { Wireframe } from 'three/examples/jsm/lines/Wireframe';
import { WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2';

const ThreeDComponent = () => {
  const containerRef = useRef();
  let renderer, scene, camera, controls, wireframe, outerSphere, innerSphere, matLine;

  useEffect(() => {
    init();

    // Clean up on component unmount
    return () => {
      if (renderer) renderer.dispose();
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  const init = () => {
    // Renderer setup with shadows enabled
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
    renderer.shadowMap.enabled = true; // Enable shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Scene setup
    scene = new THREE.Scene();

    // Camera setup
    camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.offsetWidth / containerRef.current.offsetHeight,
      1,
      1000
    );
    camera.position.set(-50, 30, 50);

    // Controls setup
    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 500;
    controls.enableZoom = false; // Enable zooming
    controls.enableRotate = false;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x555555, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(-50, 50, 100);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    scene.add(directionalLight);

    // Ground plane to receive shadow
    const planeGeometry = new THREE.PlaneGeometry(500, 500);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -25;
    plane.receiveShadow = true;
    scene.add(plane);

    // Outer transparent shell
    const outerGeo = new THREE.SphereGeometry(20, 32, 32);
    const outerMaterial = new THREE.MeshStandardMaterial({
      color: 0x606060,
      transparent: true,
      opacity: 0.1,
    });
    outerSphere = new THREE.Mesh(outerGeo, outerMaterial);
    outerSphere.castShadow = true;
    scene.add(outerSphere);

    // Inner solid sphere
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      metalness: 0.3,
      roughness: 0.8,
    });
    innerSphere = new THREE.Mesh(outerGeo, innerMaterial);
    innerSphere.receiveShadow = true;
    scene.add(innerSphere);

    // Wireframe around the outer shell
    const wireframeGeo = new WireframeGeometry2(outerGeo);
    matLine = new LineMaterial({
      color: 0x606060,
      linewidth: 3,
      dashed: false,
    });
    wireframe = new Wireframe(wireframeGeo, matLine);
    wireframe.computeLineDistances();
    wireframe.scale.set(1, 1, 1);
    scene.add(wireframe);

    // Resize listener
    window.addEventListener('resize', onWindowResize);

    // Start animation loop
    renderer.setAnimationLoop(animate);
  };

  const onWindowResize = () => {
    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  const animate = () => {
    // Rotate the wireframe and spheres
    wireframe.rotation.x += 0.005;
    wireframe.rotation.y += 0.005;
    outerSphere.rotation.x += 0.005;
    outerSphere.rotation.y += 0.005;
    innerSphere.rotation.x += 0.005;
    innerSphere.rotation.y += 0.005;

    renderer.render(scene, camera);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex justify-center items-center"
      style={{ position: 'relative', overflow: 'hidden' }}
    />
  );
};

export default ThreeDComponent;
