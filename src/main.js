import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';
import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from '../shaders/atmosphereFragment.glsl';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
});

const orbitControl = new OrbitControls( camera, renderer.domElement );
orbitControl.rotateSpeed = 0.25;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const sphere = new THREE.Mesh( 
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load('/img/malazan.png')
            }
        }
    })
);

const atmosphere = new THREE.Mesh( 
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    })
);

atmosphere.scale.set(1.1, 1.1, 1.1);

scene.add(sphere);
scene.add(atmosphere);

camera.position.z = 15;
orbitControl.update();

const mouse = {
    x: undefined,
    y: undefined
}

function animate() {
    requestAnimationFrame(animate);
    orbitControl.update();
    renderer.render(scene, camera);
}
animate();
