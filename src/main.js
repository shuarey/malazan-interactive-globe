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

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

const orbitControl = new OrbitControls( camera, renderer.domElement );
orbitControl.rotateSpeed = 0.25;
orbitControl.enableDamping = true;
orbitControl.dampingFactor = 0.1;
orbitControl.minDistance = 6;
orbitControl.maxDistance = 20;

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

const group = new THREE.Group();
group.add(sphere);
group.add(atmosphere);
scene.add(group);

camera.position.z = 15;
orbitControl.update();

function onPointerMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function animate() {
    raycaster.setFromCamera( mouse, camera );

    const intersects = raycaster.intersectObjects( [ sphere ] );
    if ( intersects.length > 0 ) {
        const { x, y, z } = intersects[ 0 ].point;
        // Darujhistan
        // x: 1.6154145694251663, y: 3.283790346420088, z: -3.4025461067423945
        console.log(`Intersected at: x: ${x}, y: ${y}, z: ${z}`);
    }

    requestAnimationFrame(animate);
    orbitControl.update();
    renderer.render(scene, camera);
}
window.addEventListener( 'pointermove', onPointerMove );
animate();
