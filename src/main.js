import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';
import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from '../shaders/atmosphereFragment.glsl';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

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
    requestAnimationFrame(animate);
    orbitControl.update();
    renderer.render(scene, camera);
}

function onPointerClick( event ) {
    raycaster.setFromCamera( mouse, camera );
    
    const intersects = raycaster.intersectObjects( [ sphere ] );
    if ( intersects.length > 0 ) {
        const { x, y, z } = intersects[ 0 ].point;

        let popupTitle = '';
        let popupImg = '';

        if (Math.abs(x - 1.677) < .1 && Math.abs(y - 3.330) < .1 && Math.abs(z + 3.321) < .1) {
            popupTitle = 'Darujhistan';
            popupImg = '/img/darujhistan.jpg';
        }

        if ( popupImg === '' ) {
            console.log(`No popup image found for this location x: ${x}, y: ${y}, z: ${z}.`);
            return;
        }

        const title = document.createElement('h3');
        title.textContent = popupTitle || 'Unknown Location';
        title.style.cssText = `
        margin: 0 0 15px 0;
        color: #333;
        font-family: Arial, sans-serif;
        `;
        
        const img = document.createElement('img');
        img.src = popupImg;
        img.style.cssText = `
        max-width: 100%;
        max-height: 400px;
        border-radius: 5px;
        `;

        // Create popup overlay
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            cursor: pointer;
        `;
        
        const imageContainer = document.createElement('div');
        imageContainer.style.cssText = `
            background: white;
            padding: 20px;
            border-radius: 10px;
            max-width: 80%;
            max-height: 80%;
            text-align: center;
            position: relative;
        `;
        
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background:rgb(247, 135, 135);
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        closeButton.addEventListener('click', () => {
            document.body.removeChild(popup);
        });

        imageContainer.appendChild(title);
        imageContainer.appendChild(img);
        imageContainer.appendChild(closeButton);
        popup.appendChild(imageContainer);
        
        // Add to page
        document.body.appendChild(popup);
        
        console.log(`Clicked at: x: ${x}, y: ${y}, z: ${z}`);
    }
}

window.addEventListener( 'click', onPointerClick );
window.addEventListener( 'pointermove', onPointerMove );
animate();
