import * as THREE from "./node_modules/three/src/Three.js";
import {FlyControls} from './node_modules/three/examples/jsm/controls/FlyControls.js'
import {GLTFLoader} from './node_modules/three/examples/jsm/loaders/GLTFLoader.js'


//Canva SetUp
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
window.addEventListener('resize', function () {
  const width= window.innerWidth
  const height= window.innerHeight
  renderer.setSize( width, height )
  camera.aspect = width / height
  camera.updateProjectionMatrix()
})

//Box
var Box = new THREE.BoxGeometry(1,1,1);
  //create a matérial
  var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true})
  var cube = new THREE.Mesh(Box, material)
  cube.position.z = -10
  
  scene.add(cube)

//Model
let Spaceship
const Model = new GLTFLoader();
Model.load("./assets/Model/Spaceship/scene.gltf", (gltf) => {
  gltf.scene.scale.setScalar(0.0001);
  Spaceship = gltf.scene
  scene.add(Spaceship)
})





//Lights
const ambientLight =  new THREE.AmbientLight(0xFFFFFF, 2)
scene.add(ambientLight)
//Skybox 
const Skybox = new THREE.CubeTextureLoader()
const skyboxTexture = Skybox.load([
  './assets/Skybox/right.png',
  './assets/Skybox/left.png',
  './assets/Skybox/top.png',
  './assets/Skybox/bot.png',
  './assets/Skybox/front.png',
  './assets/Skybox/back.png',
])
scene.background = skyboxTexture


  //camera position

camera.position.z = 3



//controls
const clock = new THREE.Clock();
const controls = new FlyControls(camera, renderer.domElement)
				controls.movementSpeed = 5;
				controls.domElement = renderer.domElement;
				controls.rollSpeed = Math.PI / 5;
				controls.autoForward = false;
        controls.dragToLook = true;
        console.log(controls);
        
        document.addEventListener('keydown', function (event) {
      
            Spaceship.rotation.y = 33
            console.log(event.key);
            switch (event.key) {
              case 's': 
              Spaceship.position.z += 0.2
              console.log(Spaceship.position.z);
              break;
              case 'z':
              Spaceship.position.z -= 0.3
              console.log(Spaceship.position.z);
              break;
              case 'ArrowRight':
                if(Spaceship.rotation.y ){
                  Spaceship.rotation.y -= 0.5
                } else {
                  Spaceship.rotation.y = 33
                }
              console.log(Spaceship.rotation.y);
              break;
              case 'ArrowLeft':
                if(Spaceship.rotation.y ){
                  Spaceship.rotation.y += 0.5
                } else {
                  Spaceship.rotation.y = 33
                }
              console.log(Spaceship.rotation.y);
              break;
          }
          
        });

function update () {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.005;

  if (Spaceship) {
    Spaceship.position.set(controls.object.position.x , controls.object.position.y -1   , controls.object.position.z - 3)
    
  }
  
  } 

function render () {
  
  
  // controls.update(delta)
  renderer.render(scene, camera)
}


//run all the stuf (update, render, repeat)
function GameLoop () {
  var delta = clock.getDelta();
  requestAnimationFrame(GameLoop)
  controls.update(delta)
  update();
  render()
}

GameLoop()
