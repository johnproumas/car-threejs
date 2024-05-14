import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0x000000);
// renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2b0211);

// camera
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  5000
);
camera.position.set(20, 10, 30);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 20;
controls.maxDistance = 50;
controls.minPolarAngle = 1;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

// light
const ambientLight = new THREE.AmbientLight(0x404040, 100);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// loader
const loader = new GLTFLoader().setPath("models/ruf/");
loader.load(
  "scene.gltf",
  function (gltf) {
    const model = gltf.scene;
    // model.scale.set(1, 1, 1);
    scene.add(model);
  },
  (xhr) => {
    console.log(`loading ${(xhr.loaded / xhr.total) * 100}%`);
  },
  (error) => {
    console.error(error);
  }
);

// on window resize update camera aspect ratio and renderer size
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
