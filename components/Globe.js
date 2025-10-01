// // components/Globe.js (Updated to fix the "removeChild" error)
// "use client";

// import React, { useRef, useEffect } from 'react';
// import * as THREE from 'three';
// // You might have other imports here (like OrbitControls or specific textures)

// export default function Globe() {
//     const globeRef = useRef(null);
//     const frameId = useRef(null);
//     let camera, scene, renderer, stars, globe;

//     const init = () => {
//         if (!globeRef.current) return;

//         // --- Basic Setup ---
//         const width = globeRef.current.clientWidth;
//         const height = globeRef.current.clientHeight;

//         camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//         camera.position.z = 5;

//         scene = new THREE.Scene();
        
//         // --- Globe Mesh ---
//         const globeGeometry = new THREE.SphereGeometry(2, 64, 64);
//         const globeMaterial = new THREE.MeshPhongMaterial({
//             color: 0x4444ff,
//             transparent: true,
//             opacity: 0.8,
//             specular: 0x555555,
//             shininess: 30,
//             wireframe: true // Key for the tech aesthetic
//         });
//         globe = new THREE.Mesh(globeGeometry, globeMaterial);
//         scene.add(globe);

//         // --- Stars (Background) ---
//         const starGeometry = new THREE.SphereGeometry(200, 32, 32);
//         const starMaterial = new THREE.MeshBasicMaterial({
//             color: 0xffffff,
//             side: THREE.BackSide
//         });
//         stars = new THREE.Mesh(starGeometry, starMaterial);
//         scene.add(stars);

//         // --- Lighting ---
//         const ambientLight = new THREE.AmbientLight(0x404040, 3);
//         scene.add(ambientLight);
        
//         const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
//         directionalLight.position.set(5, 3, 5);
//         scene.add(directionalLight);

//         // --- Renderer ---
//         renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//         renderer.setSize(width, height);
//         renderer.setClearColor(0x000000, 0); // Transparent background

//         if (globeRef.current.childElementCount === 0) {
//             globeRef.current.appendChild(renderer.domElement);
//         }
//     };

//     const animate = () => {
//         frameId.current = requestAnimationFrame(animate);

//         // Rotation
//         if (globe) {
//             globe.rotation.y += 0.001;
//             globe.rotation.x += 0.0005;
//         }

//         renderer.render(scene, camera);
//     };

//     const onResize = () => {
//         if (!globeRef.current) return;
//         const width = globeRef.current.clientWidth;
//         const height = globeRef.current.clientHeight;

//         camera.aspect = width / height;
//         camera.updateProjectionMatrix();
//         renderer.setSize(width, height);
//     };

//     useEffect(() => {
//         init();
//         animate();

//         window.addEventListener("resize", onResize);
        
//         // --- CLEANUP FUNCTION WITH BUG FIX ---
//         return () => {
//           window.removeEventListener("resize", onResize);
          
//           // CRUCIAL: Check if globeRef.current and renderer exist before cleanup
//           if (globeRef.current && renderer) {
//               // Only remove the element if it's actually there
//               if (globeRef.current.contains(renderer.domElement)) {
//                  globeRef.current.removeChild(renderer.domElement);
//               }
//           }
//           cancelAnimationFrame(frameId.current);
//         };
//     }, []);

//     return (
//         <div 
//             ref={globeRef} 
//             className="w-full h-full absolute top-0 left-0"
//             // Ensure the container is ready for the canvas
//         />
//     );
// }
