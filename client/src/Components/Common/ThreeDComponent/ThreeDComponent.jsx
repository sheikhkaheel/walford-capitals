// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
// import { Wireframe } from 'three/examples/jsm/lines/Wireframe';
// import { WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2';

// const ThreeDComponent = () => {
//   const containerRef = useRef();
//   let renderer, scene, camera, controls, wireframe, matLine;

//   useEffect(() => {
//     init();

//     return () => {
//       if (renderer) renderer.dispose();
//     };
//   }, []);

//   const init = () => {
//     // Renderer setup with transparent background
//     renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     containerRef.current.appendChild(renderer.domElement);

//     // Scene setup
//     scene = new THREE.Scene();

//     // Camera setup
//     camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
//     camera.position.set(-50, 0, 50);

//     // Controls setup
//     controls = new OrbitControls(camera, renderer.domElement);
//     controls.minDistance = 10;
//     controls.maxDistance = 500;

//     // Lighting setup for inner shadow effect
//     const ambientLight = new THREE.AmbientLight(0x555555, 0.5); // Lower intensity for shadow effect
//     scene.add(ambientLight);

//     const directionalLight = new THREE.DirectionalLight(0x999999, 0.7); // Light with shadow effect
//     directionalLight.position.set(-50, 50, 100);
//     directionalLight.castShadow = true;
//     scene.add(directionalLight);

//     // Wireframe setup
//     const geo = new THREE.IcosahedronGeometry(20, 1);
//     const geometry = new WireframeGeometry2(geo);

//     matLine = new LineMaterial({
//       color: 0x606060, // Darker grey to enhance shadow effect
//       linewidth: 3,
//       dashed: false,
//     });

//     wireframe = new Wireframe(geometry, matLine);
//     wireframe.computeLineDistances();
//     wireframe.scale.set(1, 1, 1);
//     scene.add(wireframe);

//     // Resize listener
//     window.addEventListener('resize', onWindowResize);

//     // Start animation loop
//     renderer.setAnimationLoop(animate);
//   };

//   const onWindowResize = () => {
//     const { innerWidth, innerHeight } = window;

//     camera.aspect = innerWidth / innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(innerWidth, innerHeight);
//   };

//   const animate = () => {
//     // Rotate the wireframe to enhance the shadow effect
//     wireframe.rotation.x += 0.005;
//     wireframe.rotation.y += 0.005;

//     renderer.render(scene, camera);
//   };

//   return <div ref={containerRef} className='flex justify-center pb-20 w-[40vw] h-[85vh]' />;
// };

// export default ThreeDComponent;

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

    return () => {
      if (renderer) renderer.dispose();
    };
  }, []);

  const init = () => {
    // Renderer setup with shadows enabled
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // Enable shadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Scene setup
    scene = new THREE.Scene();

    // Camera setup
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(-50, 30, 50);

    // Controls setup
    controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 10;
    controls.maxDistance = 500;
    controls.enableRotate = false;

    // Lighting setup for inner shadow effect
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
    plane.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    plane.position.y = -25;
    plane.receiveShadow = true;
    scene.add(plane);

    // Outer transparent shell to cast inner shadow
    const outerGeo = new THREE.SphereGeometry(20, 32, 32);
    const outerMaterial = new THREE.MeshStandardMaterial({
      color: 0x606060,
      transparent: true,
      opacity: 0.1,
    });
    outerSphere = new THREE.Mesh(outerGeo, outerMaterial);
    outerSphere.castShadow = true; // Cast shadows to simulate inner shadow effect
    outerSphere.receiveShadow = false;
    scene.add(outerSphere);

    // Inner solid sphere to receive shadows
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x808080,
      metalness: 0.3,
      roughness: 0.8,
    });
    innerSphere = new THREE.Mesh(outerGeo, innerMaterial);
    innerSphere.receiveShadow = true; // Receive shadows from outer shell
    scene.add(innerSphere);

    // Wireframe setup around the outer shell
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
    const { innerWidth, innerHeight } = window;
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
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

  return <div ref={containerRef} className='flex justify-center pb-20 w-[40vw] h-[85vh]' />;
};

export default ThreeDComponent;

