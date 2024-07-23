import './style.css'
import * as THREE from 'three'
// import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
Shery.mouseFollower();

function inet(){
    gsap.registerPlugin(ScrollTrigger);
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);
    
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, 
        getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    }
    
    inet();


    const loadingManager = new THREE.LoadingManager(
       // Loaded
    // () =>
    //   {
    //       // Wait a little
    //       window.setTimeout(() =>
    //           {
    //             console.log("loaded");
    //           var tl1 = gsap.timeline()
    //           tl1
    //           .to('#loading #elem',{
    //             clipPath:` polygon(0 0, 0% 0, 0% 100%, 0% 100%)`,
    //             duration:1.2,
    //             ease: "power4.out",
    //           },"var")
    //           .to('#loading', {
    //              display: 'none',
    //              delay:0.2,
    //             },"var")
             
    //           //   .to("#navcenter img:nth-child(1),#navcenter img:nth-child(7)",{
    //           //     transform: "translateY(0)",
    //           //     duration:1.5,
    //           //     ease: "power1.out",
    //           //   },"var2")
    //           //   .to("#navcenter img:nth-child(2),#navcenter img:nth-child(6)",{
    //           //     transform: "translateY(0)",
    //           //     delay:0.2,
    //           //     duration:1.5,
    //           //     ease: "power1.out",
    //           //   },"var2")
    //           //   .to("#navcenter img:nth-child(3),#navcenter img:nth-child(5)",{
    //           //     transform: "translateY(0)",
    //           //     delay:0.3,
    //           //     duration:1.5,
    //           //     ease: "power1.out",
    //           //   },"var2")
    //           //   .to("#navcenter img:nth-child(4)",{
    //           //     transform: "translateY(0)",
    //           //     delay:0.4,
    //           //     duration:1.5,
    //           //     ease: "power1.out",
    //           //   },"var2")
    //           // Animate overlay
  
    //       }, 1000)
  
        
    //   },
  
    //   // Progress
    //   (itemUrl, itemsLoaded, itemsTotal) =>
    //   {
  
    //       // Calculate the progress and update the loadingBarElement
    //       // const progressRatio = itemsLoaded / totalItems;
    //       // const progressPercentage =( (itemsLoaded / totalItems) * 100).toFixed();
    //       // // console.log(progressRatio, progressPercentage.toFixed());
      
    //       // loadingBarElement.style.transform = `scaleX(${progressRatio})`;
    //       //  loadingBarElementh2.textContent = progressPercentage + "%"
    //   }
  )
// Texture loading
const textureLoader = new THREE.TextureLoader(loadingManager);
const floorterrain = textureLoader.load('/textures/terrain-normal.jpg');
const floorrough = textureLoader.load('/textures/terrain-roughness.jpg');
const cubetexture = new THREE.CubeTextureLoader(loadingManager);
const env = cubetexture.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg',
]);

// GLTF and DRACO loading
const dracoLoader = new DRACOLoader(loadingManager);
dracoLoader.setDecoderPath('/draco/');
dracoLoader.setDecoderConfig({ type: 'wasm', url: '/draco/draco_decoder.wasm' });
const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);

// Base settings
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();
const sizes = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 70;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true,});
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
env.encoding = THREE.sRGBEncoding
renderer.shadowMap.enabled = true;
renderer.toneMappingExposure = 2
renderer.setClearColor('#111')

const fog = new THREE.Fog('#111',50,130)
scene.fog = fog

// const gui = new dat.GUI({ width: 400, height: 400, scale: 2 });
// const Debugobj = { intensity: 1 };
// gui.add(Debugobj, 'intensity').max(10).min(1).step(1).name('intensityEnvMap').onChange(updateMaterial);
// gui.add(renderer, 'toneMapping', {
//     No: THREE.NoToneMapping,
//     Linaer: THREE.LinearToneMapping,
//     Reinhard: THREE.ReinhardToneMapping,
//     cineon: THREE.CineonToneMapping,
//     ACESFilmicg: THREE.ACESFilmicToneMapping,
// });

// Lighting
const directionlight = new THREE.DirectionalLight('#ffffff',15)
directionlight.position.set(-5.763,90,-2.25)
scene.add(directionlight)

directionlight.castShadow = true;
directionlight.shadow.mapSize.width = 2048; // Adjust as necessary
directionlight.shadow.mapSize.height = 2048;

directionlight.shadow.camera.left = -50;
directionlight.shadow.camera.right = 50;
directionlight.shadow.camera.top = 50;
directionlight.shadow.camera.bottom = -50;
directionlight.shadow.camera.near = 0.5;
directionlight.shadow.camera.far = 500;
const DirectionalLightHelper = new THREE.DirectionalLightHelper(directionlight,0.2)
// scene.add(DirectionalLightHelper)
// gui.add(directionlight,'intensity').min(0).max(25).step(0.001).name('lightIntensity')
// gui.add(directionlight.position,'x').min(-50).max(50).step(0.001).name('lightX')
// gui.add(directionlight.position,'y').min(-50).max(50).step(0.001).name('lightY')
// gui.add(directionlight.position,'z').min(-50).max(50).step(0.001).name('lightZ')
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
// gui.add(ambientLight, 'intensity').min(0).max(10).step(0.001)
scene.add(ambientLight)


// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(400, 400),
    new THREE.MeshStandardMaterial({ 
        color: '#111',
        normalMap:floorterrain,
        roughnessMap:floorrough,
        roughness: 0.8, // Lower value makes it shinier
        metalness: 1, // Higher value gives a metallic look
     })
)
floor.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array,2)
)
floorrough.repeat.set(2,2)
floorterrain.repeat.set(5,5)
floor.receiveShadow = true; 

floorterrain.wrapS = THREE.RepeatWrapping
floorrough.wrapT = THREE.RepeatWrapping

floor.rotation.x = - Math.PI * 0.5
floor.position.y = -12.5
scene.add(floor)




let model;
// Load model
let carPaintMesh = null;
let tyreMeshes = [];
gltfLoader.load('/models/scene.glb', (gltf) => {
  
  model = gltf.scene
    // console.log(model);
    model.scale.set(25, 25, 25);
    model.position.set(0, 0, 0);
    model.rotation.y = Math.PI / 2;
    scene.add(model);
    adjustModelForScreen()
//     // gui.add(model.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.001).name('Rotation');
//     // gui.add(model.position, 'x').min(0).max(100).step(0.001).name('Rotation');
//     // gui.add(model.position, 'y').min(0).max(100).step(0.001).name('Rotation');
//     // gui.add(model.position, 'z').min(0).max(100).step(0.001).name('Rotation');
//     // gui.add(model.scale, 'x').min(0).max(100).step(0.001).name('Rotation');
//     // gui.add(model.scale, 'y').min(0).max(100).step(0.001).name('Rotation');
//     // gui.add(model.scale, 'z').min(0).max(100).step(0.001).name('Rotation');
   
    updateMaterial();
});


function adjustModelForScreen() {
  if (model) {
      const aspectRatio = window.matchMedia("(max-width: 768px)").matches
      if (aspectRatio) { // Portrait mode
          model.scale.set(13, 13, 13)
          model.position.set(0, -4, 0)
      } else { // Landscape mode
          model.scale.set(25, 25, 25)
      }
  } 
}

let wasMobile = sizes.width <= 768;
function refreshPageIfNeeded() {
  const isMobile = window.innerWidth <= 768;

  // Check if the viewport crossed the mobile threshold
  if (isMobile !== wasMobile) {
      location.reload(); // Reload the page
  }

  wasMobile = isMobile;
}


refreshPageIfNeeded();


// Update material
function updateMaterial() {
    scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
            child.material.envMap = env;
            // child.material.envMapIntensity = Debugobj.intensity;
            child.castShadow = true;
            child.receiveShadow = true;
        }
        if (child.isMesh && child.material.name === 'EXT_Carpaint.004') {
            carPaintMesh = child;
            carPaintMesh.material.color.set('white');
        }
        
       
        
       
    }); 
}

const controls = new OrbitControls(camera, canvas)


// // Restrict vertical rotation (phi) to limit top and bottom views
controls.minPolarAngle = Math.PI / 2.6; // 45 degrees
controls.maxPolarAngle = Math.PI / 2.6;
controls.enableZoom = false;
// Optionally, set damping factor for smoothness
controls.dampingFactor = 0.25; 
controls.enableDamping = true
function changeCarPaintColor(color) {
    if (carPaintMesh) {
        carPaintMesh.material.color.set(color);
    }
}

const clock = new THREE.Clock();
// Animate
function animate() {

  controls.update();
  const elapsedTime = clock.getElapsedTime();
  // const radius = 65; // Radius of the circular path
  // const speed = 0.1; // Speed of the camera revolution
  // const angle = elapsedTime * speed; // Calculate the angle based on elapsed time
  
  // camera.position.x = radius * Math.cos(angle);
  // camera.position.z = radius * Math.sin(angle);
  // camera.lookAt(0, 0, 0);
  if(model){
    floor.rotation.z = elapsedTime * 0.2
    model.rotation.y = elapsedTime * 0.2
  }
   // Look at the center where the car is
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Resize handling
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refreshPageIfNeeded();
    adjustModelForScreen()
});

const colors = ['#FFCC00', '#CC0033', 'black', '#A4C4B8', '#00194B', '#333333','red'];
let currentColorIndex = 0;

function autoChangeColor() {
    if (carPaintMesh) {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        carPaintMesh.material.color.set(colors[currentColorIndex]);
    }
}

setInterval(autoChangeColor, 10000);

// Color change buttons
document.querySelectorAll('button[data-color]').forEach(button => {
    button.addEventListener('click', () => {
        changeCarPaintColor(button.getAttribute('data-color'));
        clearInterval(autoChangeColor);
    });
});



const tl = gsap.timeline({ paused: true, reversed: true });

const openNav = () => {
    animateOpenNav();
    const navBtn = document.getElementById("menu-toggle-btn");
    navBtn.onclick = function (e) {
        navBtn.classList.toggle("active");
        tl.reversed() ? tl.play() : tl.reverse();
    };
};

const animateOpenNav = () => {
    tl.to(".nav-container", {
         duration: 0.1, 
         autoAlpha: 1, 
    })
    .from(".contact svg", { 
        duration: 0.2, 
        y:30,
        opacity:0,
        delay:0.7,
        color: "#fff",
        ease: "expo.out", 
        stagger: { 
            amount: 0.1 
        }, 
    },)
    .from(".flex > div", { 
        duration: 0.4, 
        opacity: 0, 
        y: 10, 
        stagger: { 
            amount: 0.04, 
        }
    })
    .to(".nav-link > a", {
        duration: 0.8, 
        top: 0, 
        ease: "power2.inOut", 
        stagger: { 
            amount: 0.1 
        } 
    }, "-=0.4")
    .from(".btn button", { 
        duration: 0.5, 
        y:30,
        opacity:0,
        ease: "power2.inOut", 
        stagger: { 
            amount: 0.1 
        }, 
        color: "#fff" 
    }, "-=0.1")
    .from(".nav-footer", {
        duration: 0.3, 
        opacity: 0 
    }, "-=0.5");
};

// openNav();


const leftBox1 = document.getElementById('infoone');
const leftBox2 = document.getElementById('infothree');
const rightBox1 = document.getElementById('infotwo');
const rightBox2 = document.getElementById('infofour');
const leftBox3 = document.getElementById('infofive');
const leftButton1 = document.getElementById('select3');
const leftButton2 = document.getElementById('select2');
const rightButton1 = document.getElementById('select1');
const rightButton2 = document.getElementById('select4');
const leftButton3 = document.getElementById('select5');

let left1Toggled = false;
let left2Toggled = false;
let right1Toggled = false;
let right2Toggled = false;
let left3Toggled = false; // Toggle state for the fifth div

function closeAllDivs() {
  gsap.to(leftBox1, { transform: 'translateX(-100%)', duration: 1, ease: "expo.out", });
  gsap.to(leftBox2, { transform: 'translateX(-100%)', duration: 1, ease: "expo.out", });
  gsap.to(rightBox1, { transform: 'translateX(100%)', duration: 1, ease: "expo.out", });
  gsap.to(rightBox2, { transform: 'translateX(100%)', duration: 1, ease: "expo.out", });
  gsap.to(leftBox3, { transform: 'translateX(-100%)', duration: 1, ease: "expo.out", }); // Close the fifth div

  left1Toggled = false;
  left2Toggled = false;
  right1Toggled = false;
  right2Toggled = false;
  left3Toggled = false; // Reset the toggle state for the fifth div
}

function toggleBox(box, toggled, direction, toggleStateSetter) {
  gsap.to(box, { transform: toggled ? 'translateX(0%)' : `translateX(${direction})`, duration: 1, ease: "expo.out", });
  if (toggled) {
    setTimeout(() => {
      gsap.to(box, { transform: `translateX(${direction})`, duration: 1, ease: "expo.out", });
      toggleStateSetter(false);
    }, 10000);
  }
}

leftButton1.addEventListener('click', () => {
  const wasToggled = left1Toggled;
  closeAllDivs();
  left1Toggled = !wasToggled;
  toggleBox(leftBox1, left1Toggled, '-100%', (state) => left1Toggled = state);
});

leftButton2.addEventListener('click', () => {
  const wasToggled = left2Toggled;
  closeAllDivs();
  left2Toggled = !wasToggled;
  toggleBox(leftBox2, left2Toggled, '-100%', (state) => left2Toggled = state);
});

rightButton1.addEventListener('click', () => {
  const wasToggled = right1Toggled;
  closeAllDivs();
  right1Toggled = !wasToggled;
  toggleBox(rightBox1, right1Toggled, '100%', (state) => right1Toggled = state);
});

rightButton2.addEventListener('click', () => {
  const wasToggled = right2Toggled;
  closeAllDivs();
  right2Toggled = !wasToggled;
  toggleBox(rightBox2, right2Toggled, '100%', (state) => right2Toggled = state);
});

leftButton3.addEventListener('click', () => {
  const wasToggled = left3Toggled;
  closeAllDivs();
  left3Toggled = !wasToggled;
  toggleBox(leftBox3, left3Toggled, '-100%', (state) => left3Toggled = state);
});


function aniInit() {
  const animateChars = (chars, reverse = false) => {
      const staggerOptions = {
          each: .35,
          from: reverse ? "start" : "end",
          ease: "linear",
      };
      gsap.fromTo(chars, {
          fontWeight: 100,
      }, {
          fontWeight: 'bolder',
          duration: 1,
          ease: 'none',
          stagger: staggerOptions,
          scrollTrigger: {
              trigger: chars[0].closest('.marquee-container'),
              start: "50% bottom",
              end: "top top",
              scrub: true,
              scroller: "#main"
          }
      });
  };

  const splitText = new SplitType(".item h1", { types: "chars" });

  const marqueeContainers = document.querySelectorAll(".marquee-container");

  marqueeContainers.forEach((container, index) => {
      let start = "0%";
      let end = "-15%";

      if (index % 2 === 0) {
          start = "0%";
          end = "10%";
      }
      const marquee = container.querySelector(".marquee");
      const words = marquee.querySelectorAll('.item h1');

      gsap.fromTo(marquee, {
          x: start,
      }, {
          x: end,
          scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "150% top",
              scrub: true,
              scroller: "#main"
          }
      });

      words.forEach((word) => {
          const chars = Array.from(word.querySelectorAll(".char"));
          if (chars.length) {
              const reverse = index % 2 !== 0;
              animateChars(chars, reverse);
          }
      });
  });
}

function page2() {
  document.addEventListener("DOMContentLoaded", () => {
      aniInit();
  });
}

page2();

function page3() {
    document.querySelectorAll("#page3 #left #child").forEach((child) => {
        child.addEventListener("mouseenter", (event) => {
            // Move the clip element to follow the cursor vertically within the #right div
            const clip = document.querySelector("#page3 #right #clip");
            const rect = child.getBoundingClientRect();
            const clipRect = clip.getBoundingClientRect();
            const rightRect = document.querySelector("#page3 #right").getBoundingClientRect();
            
            const updateClipPosition = (e) => {
                const mouseY = e.clientY - rightRect.top;
                const clipHeight = clipRect.height;
                const newClipY = Math.min(
                    Math.max(mouseY - clipHeight / 2, 0),
                    rightRect.height - clipHeight
                );
                clip.style.position = 'absolute';
                clip.style.top = `${newClipY}px`;
            };
            
            document.addEventListener("mousemove", updateClipPosition);
            
            child.addEventListener("mouseleave", () => {
                document.removeEventListener("mousemove", updateClipPosition);
            });
        });
    });
    
}
// page3()
// document.querySelectorAll("#page3 #left #child").forEach((child) => {
//     child.addEventListener("mouseenter", (event) => {
//         const clip = document.querySelector("#page3 #right #clip");
//         const imageId = child.getAttribute("data-image");
//         const newImage = document.querySelector(`#page3 #right #clip #${imageId}`);

//         // Reset all images
//         document.querySelectorAll("#page3 #right #clip img").forEach((img) => {
//             img.classList.remove("active");
//         });

//         // Set the new image
//         newImage.classList.add("active");

//         // Move the clip element to follow the cursor vertically within the #right div
//         const rect = child.getBoundingClientRect();
//         const clipRect = clip.getBoundingClientRect();
//         const rightRect = document.querySelector("#page3 #right").getBoundingClientRect();

//         const updateClipPosition = (e) => {
//             const mouseY = e.clientY - rightRect.top;
//             const clipHeight = clipRect.height;
//             const newClipY = Math.min(
//                 Math.max(mouseY - clipHeight / 2, 0),
//                 rightRect.height - clipHeight
//             );
//             clip.style.position = 'absolute';
//             clip.style.top = `${newClipY}px`;
//         };

//         document.addEventListener("mousemove", updateClipPosition);

//         child.addEventListener("mouseleave", () => {
//             document.removeEventListener("mousemove", updateClipPosition);
//         });
//     });
// });
// document.querySelectorAll("#page3 #left #child").forEach((child) => {
//     child.addEventListener("mouseenter", (event) => {
//         const clip = document.querySelector("#page3 #right #clip");
//         const imageId = child.getAttribute("data-image");
//         const newImage = document.querySelector(`#page3 #right #clip #${imageId}`);

//         // If the new image is already active, do nothing
//         if (newImage.classList.contains('active')) return;

//         // Set the new image to active
//         newImage.classList.add("active");

//         // Ensure the previous images remain visible until the new one scales in
//         const previousImages = document.querySelectorAll("#page3 #right #clip img.active:not(#" + imageId + ")");
//         previousImages.forEach((img) => {
//             img.style.transform = 'scale(1)';
//             img.style.opacity = '1';
//             img.classList.remove("active");
//         });

//         // Move the clip element to follow the cursor vertically within the #right div
//         const rect = child.getBoundingClientRect();
//         const clipRect = clip.getBoundingClientRect();
//         const rightRect = document.querySelector("#page3 #right").getBoundingClientRect();

//         const updateClipPosition = (e) => {
//             const mouseY = e.clientY - rightRect.top;
//             const clipHeight = clipRect.height;
//             const newClipY = Math.min(
//                 Math.max(mouseY - clipHeight / 2, 0),
//                 rightRect.height - clipHeight
//             );
//             clip.style.position = 'absolute';
//             clip.style.top = `${newClipY}px`;
//         };

//         document.addEventListener("mousemove", updateClipPosition);

//         child.addEventListener("mouseleave", () => {
//             document.removeEventListener("mousemove", updateClipPosition);
//         });
//     });
// });

// document.querySelectorAll("#page3 #left #child").forEach((child) => {
//     child.addEventListener("mouseenter", (event) => {
//         const clip = document.querySelector("#page3 #right #clip");
//         const imageId = child.getAttribute("data-image");
//         const newImage = document.querySelector(`#page3 #right #clip #${imageId}`);

//         // Get the currently active image
//         const currentActiveImage = document.querySelector("#page3 #right #clip img.active");

//         // Remove the active class from the current image if it's different
//         if (currentActiveImage && currentActiveImage !== newImage) {
//             console.log(currentActiveImage);
//             currentActiveImage.style.transform = 'scale(1)';
//             currentActiveImage.style.opacity = '1';
//             currentActiveImage.style.zIndex = '0'; // Move it behind the new image
//             currentActiveImage.classList.remove("active");
//         }

//         // Prepare and start the animation for the new image
//         newImage.style.transition = 'none'; // Remove transition temporarily to reset
//         newImage.style.transform = 'scale(0)';
//         newImage.style.opacity = '0';
//         newImage.style.zIndex = '1'; // Ensure the new image is on top
//         newImage.classList.add("active");

//         // Trigger a reflow to reset the transition
//         requestAnimationFrame(() => {
//             requestAnimationFrame(() => {
//                 // Reapply the transition
//                 newImage.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
//                 newImage.style.transform = 'scale(1)';
//                 newImage.style.opacity = '1';
//             });
//         });

//         // Move the clip element to follow the cursor vertically within the #right div
//         const rect = child.getBoundingClientRect();
//         const clipRect = clip.getBoundingClientRect();
//         const rightRect = document.querySelector("#page3 #right").getBoundingClientRect();

//         const updateClipPosition = (e) => {
//             const mouseY = e.clientY - rightRect.top;
//             const clipHeight = clipRect.height;
//             const newClipY = Math.min(
//                 Math.max(mouseY - clipHeight / 2, 0),
//                 rightRect.height - clipHeight
//             );
//             clip.style.position = 'absolute';
//             clip.style.top = `${newClipY}px`;
//         };

//         document.addEventListener("mousemove", updateClipPosition);

//         child.addEventListener("mouseleave", () => {
//             document.removeEventListener("mousemove", updateClipPosition);
//         });
//     });
// });


// document.querySelectorAll("#page3 #left #child").forEach((child) => {
//     child.addEventListener("mouseenter", (event) => {
//         const clip = document.querySelector("#page3 #right #clip");
//         const imageId = child.getAttribute("data-image");
//         const newImage = document.querySelector(`#page3 #right #clip #${imageId}`);

//         // Get the currently active image
//         const currentActiveImage = document.querySelector("#page3 #right #clip img.active");

//         // If the new image is already active, do nothing
//         if (currentActiveImage && currentActiveImage !== newImage) {
//             currentActiveImage.style.transform = 'scale(1)';
//             currentActiveImage.style.opacity = '1';
//             currentActiveImage.style.zIndex = '0'; // Move it behind the new image
//             currentActiveImage.classList.remove("active");
//         }

//         // Set the new image to be on top
//         newImage.style.zIndex = '1';
//         newImage.classList.add("active");

//         // Prepare and start the animation for the new image
//         newImage.style.transition = 'none'; // Remove transition temporarily to reset
//         newImage.style.transform = 'scale(0)';
//         newImage.style.opacity = '0';

//         // Trigger a reflow to reset the transition
//         requestAnimationFrame(() => {
//             requestAnimationFrame(() => {
//                 // Reapply the transition
//                 newImage.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
//                 newImage.style.transform = 'scale(1)';
//                 newImage.style.opacity = '1';
//             });
//         });

//         // Move the clip element to follow the cursor vertically within the #right div
//         const rect = child.getBoundingClientRect();
//         const clipRect = clip.getBoundingClientRect();
//         const rightRect = document.querySelector("#page3 #right").getBoundingClientRect();

//         const updateClipPosition = (e) => {
//             const mouseY = e.clientY - rightRect.top;
//             const clipHeight = clipRect.height;
//             const newClipY = Math.min(
//                 Math.max(mouseY - clipHeight / 2, 0),
//                 rightRect.height - clipHeight
//             );
//             clip.style.position = 'absolute';
//             clip.style.top = `${newClipY}px`;
//         };

//         document.addEventListener("mousemove", updateClipPosition);

//         child.addEventListener("mouseleave", () => {
//             document.removeEventListener("mousemove", updateClipPosition);
//         });
//     });
// });
document.querySelectorAll("#page3 #left #child").forEach((child) => {
    child.addEventListener("mouseenter", (event) => {
        const clip = document.querySelector("#page3 #right #clip");
        const imageId = child.getAttribute("data-image");
        const newImage = document.querySelector(`#page3 #right #clip #${imageId}`);

        // Reset animation if the image is already active
        if (newImage.classList.contains('active')) {
            newImage.style.transition = 'none';
            newImage.style.transform = 'scale(0)';
            newImage.style.opacity = '0';

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    newImage.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                    newImage.style.transform = 'scale(1)';
                    newImage.style.opacity = '1';
                });
            });
            return;
        }

        // Set the new image to active
        newImage.classList.add("active");

        // Ensure the previous images remain visible until the new one scales in
        const previousImages = document.querySelectorAll("#page3 #right #clip img.active:not(#" + imageId + ")");
        previousImages.forEach((img) => {
            img.style.zIndex = '0'; // Move it behind the new image
            img.classList.remove("active");
        });

        // Update clip position to follow the cursor vertically within the #right div
        const rect = child.getBoundingClientRect();
        const clipRect = clip.getBoundingClientRect();
        const rightRect = document.querySelector("#page3 #right").getBoundingClientRect();

        const updateClipPosition = (e) => {
            const mouseY = e.clientY - rightRect.top;
            const clipHeight = clipRect.height;
            const newClipY = Math.min(
                Math.max(mouseY - clipHeight / 2, 0),
                rightRect.height - clipHeight
            );
            clip.style.position = 'absolute';
            clip.style.top = `${newClipY}px`;
        };

        // Prepare and start the animation for the new image
        newImage.style.transition = 'none'; // Remove transition temporarily to reset
        newImage.style.transform = 'scale(0)';
        newImage.style.opacity = '0';
        newImage.style.zIndex = '1'; // Ensure the new image is on top

        // Trigger a reflow to reset the transition
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Reapply the transition
                newImage.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
                newImage.style.transform = 'scale(1)';
                newImage.style.opacity = '1';
            });
        });

        document.addEventListener("mousemove", updateClipPosition);

        child.addEventListener("mouseleave", () => {
            document.removeEventListener("mousemove", updateClipPosition);
        });
    });
});




// function pg4() {
//     function canva() {
//         const canvas = document.querySelector("#page4>canvas");
//         const context = canvas.getContext("2d");

//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;

//         window.addEventListener("resize", function () {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             render();
//         });

//         const imagePaths = [
//            "//porsche-canvas/ThenewPorsche.01191.png",
//            "//porsche-canvas/ThenewPorsche.01192.png",
//            "//porsche-canvas/ThenewPorsche.01193.png",
//            "//porsche-canvas/ThenewPorsche.01194.png",
//            "/porsche-canvas/ThenewPorsche.01195.png",
//            "/porsche-canvas/ThenewPorsche.01196.png",
//            "/porsche-canvas/ThenewPorsche.01197.png",
//            "/porsche-canvas/ThenewPorsche.01198.png",
//            "/porsche-canvas/ThenewPorsche.01199.png",
//            "/porsche-canvas/ThenewPorsche.01200.png",
//            "/porsche-canvas/ThenewPorsche.01201.png",
//            "/porsche-canvas/ThenewPorsche.01202.png",
//            "/porsche-canvas/ThenewPorsche.01203.png",
//            "/porsche-canvas/ThenewPorsche.01204.png",
//            "/porsche-canvas/ThenewPorsche.01205.png",
//            "/porsche-canvas/ThenewPorsche.01206.png",
//            "/porsche-canvas/ThenewPorsche.01207.png",
//            "/porsche-canvas/ThenewPorsche.01208.png",
//            "/porsche-canvas/ThenewPorsche.01209.png",
//            "/porsche-canvas/ThenewPorsche.01210.png",
//            "/porsche-canvas/ThenewPorsche.01211.png",
//            "/porsche-canvas/ThenewPorsche.01212.png",
//            "/porsche-canvas/ThenewPorsche.01213.png",
//            "/porsche-canvas/ThenewPorsche.01214.png",
//            "/porsche-canvas/ThenewPorsche.01215.png",
//            "/porsche-canvas/ThenewPorsche.01216.png",
//            "/porsche-canvas/ThenewPorsche.01217.png",
//            "/porsche-canvas/ThenewPorsche.01218.png",
//            "/porsche-canvas/ThenewPorsche.01219.png",
//            "/porsche-canvas/ThenewPorsche.01220.png",
//            "/porsche-canvas/ThenewPorsche.01221.png",
//            "/porsche-canvas/ThenewPorsche.01222.png",
//            "/porsche-canvas/ThenewPorsche.01223.png",
//            "/porsche-canvas/ThenewPorsche.01224.png",
//            "/porsche-canvas/ThenewPorsche.01225.png",
//            "/porsche-canvas/ThenewPorsche.01226.png",
//            "/porsche-canvas/ThenewPorsche.01227.png",
//            "/porsche-canvas/ThenewPorsche.01228.png",
//            "/porsche-canvas/ThenewPorsche.01239.png",
//            "/porsche-canvas/ThenewPorsche.01230.png",
//            "/porsche-canvas/ThenewPorsche.01231.png",
//            "/porsche-canvas/ThenewPorsche.01232.png",
//            "/porsche-canvas/ThenewPorsche.01233.png",
//            "/porsche-canvas/ThenewPorsche.01234.png",
//            "/porsche-canvas/ThenewPorsche.01235.png",
//            "/porsche-canvas/ThenewPorsche.01236.png",
//            "/porsche-canvas/ThenewPorsche.01237.png",
//            "/porsche-canvas/ThenewPorsche.01238.png",
//            "/porsche-canvas/ThenewPorsche.01239.png",
//            "/porsche-canvas/ThenewPorsche.01240.png",
//            "/porsche-canvas/ThenewPorsche.01241.png",
//            "/porsche-canvas/ThenewPorsche.01242.png",
//            "/porsche-canvas/ThenewPorsche.01243.png",
//            "/porsche-canvas/ThenewPorsche.01244.png",
//            "/porsche-canvas/ThenewPorsche.01245.png",
//            "/porsche-canvas/ThenewPorsche.01246.png",
//            "/porsche-canvas/ThenewPorsche.01247.png",
//            "/porsche-canvas/ThenewPorsche.01248.png",
//            "/porsche-canvas/ThenewPorsche.01249.png",
//            "/porsche-canvas/ThenewPorsche.01250.png",
//            "/porsche-canvas/ThenewPorsche.01251.png",
//            "/porsche-canvas/ThenewPorsche.01252.png",
//            "/porsche-canvas/ThenewPorsche.01253.png",
//            "/porsche-canvas/ThenewPorsche.01279.png",
//            "/porsche-canvas/ThenewPorsche.01280.png",
//            "/porsche-canvas/ThenewPorsche.01281.png",
//            "/porsche-canvas/ThenewPorsche.01282.png",
//            "/porsche-canvas/ThenewPorsche.01283.png",
//            "/porsche-canvas/ThenewPorsche.01284.png",
//            "/porsche-canvas/ThenewPorsche.01285.png",
//            "/porsche-canvas/ThenewPorsche.01286.png",
//            "/porsche-canvas/ThenewPorsche.01287.png",
//            "/porsche-canvas/ThenewPorsche.01288.png",
//            "/porsche-canvas/ThenewPorsche.01289.png",
//            "/porsche-canvas/ThenewPorsche.01290.png",
//            "/porsche-canvas/ThenewPorsche.01291.png",
//            "/porsche-canvas/ThenewPorsche.01292.png",
//            "/porsche-canvas/ThenewPorsche.01293.png",
//            "/porsche-canvas/ThenewPorsche.01294.png",
//            "/porsche-canvas/ThenewPorsche.01295.png",
//            "/porsche-canvas/ThenewPorsche.01296.png",
//            "/porsche-canvas/ThenewPorsche.01297.png",
//            "/porsche-canvas/ThenewPorsche.01298.png",
//            "/porsche-canvas/ThenewPorsche.01299.png",
//            "/porsche-canvas/ThenewPorsche.01300.png",
//            "/porsche-canvas/ThenewPorsche.01301.png",
//            "/porsche-canvas/ThenewPorsche.01302.png",
//            "/porsche-canvas/ThenewPorsche.01303.png",
//            "/porsche-canvas/ThenewPorsche.01304.png",
//            "/porsche-canvas/ThenewPorsche.01305.png",
//            "/porsche-canvas/ThenewPorsche.01306.png",
//            "/porsche-canvas/ThenewPorsche.01307.png",
//            "/porsche-canvas/ThenewPorsche.01308.png",
//            "/porsche-canvas/ThenewPorsche.01309.png",
//            "/porsche-canvas/ThenewPorsche.01310.png",
//            "/porsche-canvas/ThenewPorsche.01311.png",
//            "/porsche-canvas/ThenewPorsche.01312.png",
//            "/porsche-canvas/ThenewPorsche.01313.png",
//            "/porsche-canvas/ThenewPorsche.01314.png",
//            "/porsche-canvas/ThenewPorsche.01315.png",
//            "/porsche-canvas/ThenewPorsche.01316.png",
//            "/porsche-canvas/ThenewPorsche.01317.png",
//            "/porsche-canvas/ThenewPorsche.01318.png",
//            "/porsche-canvas/ThenewPorsche.01319.png",
//            "/porsche-canvas/ThenewPorsche.01320.png",
//            "/porsche-canvas/ThenewPorsche.01321.png",
//            "/porsche-canvas/ThenewPorsche.01322.png",
//            "/porsche-canvas/ThenewPorsche.01341.png",
//            "/porsche-canvas/ThenewPorsche.01342.png",
//            "/porsche-canvas/ThenewPorsche.01343.png",
//            "/porsche-canvas/ThenewPorsche.01344.png",
//            "/porsche-canvas/ThenewPorsche.01345.png",
//            "/porsche-canvas/ThenewPorsche.01346.png",
//            "/porsche-canvas/ThenewPorsche.01347.png",
//            "/porsche-canvas/ThenewPorsche.01348.png",
//            "/porsche-canvas/ThenewPorsche.01349.png",
//            "/porsche-canvas/ThenewPorsche.01350.png",
//            "/porsche-canvas/ThenewPorsche.01351.png",
//            "/porsche-canvas/ThenewPorsche.01352.png",
//            "/porsche-canvas/ThenewPorsche.01353.png",
//            "/porsche-canvas/ThenewPorsche.01354.png",
//            "/porsche-canvas/ThenewPorsche.01355.png",
//            "/porsche-canvas/ThenewPorsche.01356.png",
//            "/porsche-canvas/ThenewPorsche.01357.png",
//            "/porsche-canvas/ThenewPorsche.01358.png",
//            "/porsche-canvas/ThenewPorsche.01359.png",
//            "/porsche-canvas/ThenewPorsche.01360.png",
//            "/porsche-canvas/ThenewPorsche.01361.png",
//            "/porsche-canvas/ThenewPorsche.01362.png",
//            "/porsche-canvas/ThenewPorsche.01363.png",
//            "/porsche-canvas/ThenewPorsche.01364.png",
//            "/porsche-canvas/ThenewPorsche.01365.png",
//            "/porsche-canvas/ThenewPorsche.01366.png",
//            "/porsche-canvas/ThenewPorsche.01367.png",
//            "/porsche-canvas/ThenewPorsche.01368.png",
//            "/porsche-canvas/ThenewPorsche.01369.png",
//            "/porsche-canvas/ThenewPorsche.01370.png",
//            "/porsche-canvas/ThenewPorsche.01371.png",
//            "/porsche-canvas/ThenewPorsche.01372.png",
//            "/porsche-canvas/ThenewPorsche.01373.png",
//            "/porsche-canvas/ThenewPorsche.01374.png",
//            "/porsche-canvas/ThenewPorsche.01375.png",
//            "/porsche-canvas/ThenewPorsche.01376.png",
//            "/porsche-canvas/ThenewPorsche.01377.png",
//            "/porsche-canvas/ThenewPorsche.01378.png",
//            "/porsche-canvas/ThenewPorsche.01379.png",
//            "/porsche-canvas/ThenewPorsche.01380.png",
//            "/porsche-canvas/ThenewPorsche.01381.png",
//            "/porsche-canvas/ThenewPorsche.01382.png",
//            "/porsche-canvas/ThenewPorsche.01383.png",
//            "/porsche-canvas/ThenewPorsche.01384.png",
//            "/porsche-canvas/ThenewPorsche.01385.png",
//            "/porsche-canvas/ThenewPorsche.01386.png",
//            "/porsche-canvas/ThenewPorsche.01387.png",
//            "/porsche-canvas/ThenewPorsche.01388.png",
//            "/porsche-canvas/ThenewPorsche.01389.png",
//            "/porsche-canvas/ThenewPorsche.01390.png",
//            "/porsche-canvas/ThenewPorsche.01391.png",
//            "/porsche-canvas/ThenewPorsche.01392.png",
//            "/porsche-canvas/ThenewPorsche.01393.png",
//            "/porsche-canvas/ThenewPorsche.01394.png",
//            "/porsche-canvas/ThenewPorsche.01395.png",
//            "/porsche-canvas/ThenewPorsche.01396.png",
//            "/porsche-canvas/ThenewPorsche.01397.png",
//            "/porsche-canvas/ThenewPorsche.01398.png",
//            "/porsche-canvas/ThenewPorsche.01399.png",
//            "/porsche-canvas/ThenewPorsche.01400.png",
//            "/porsche-canvas/ThenewPorsche.01400.png",
//            "/porsche-canvas/ThenewPorsche.01401.png",
//            "/porsche-canvas/ThenewPorsche.01402.png",
//            "/porsche-canvas/ThenewPorsche.01403.png",
//            "/porsche-canvas/ThenewPorsche.01404.png",
//            "/porsche-canvas/ThenewPorsche.01405.png",
//            "/porsche-canvas/ThenewPorsche.01406.png",
//            "/porsche-canvas/ThenewPorsche.01407.png",
//            "/porsche-canvas/ThenewPorsche.01408.png",
//            "/porsche-canvas/ThenewPorsche.01409.png",
//            "/porsche-canvas/ThenewPorsche.01410.png",
//            "/porsche-canvas/ThenewPorsche.01411.png",
//            "/porsche-canvas/ThenewPorsche.01412.png",
//            "/porsche-canvas/ThenewPorsche.01413.png",
//            "/porsche-canvas/ThenewPorsche.01414.png",
//            "/porsche-canvas/ThenewPorsche.01415.png",
//            "/porsche-canvas/ThenewPorsche.01416.png",
//            "/porsche-canvas/ThenewPorsche.01417.png",
//            "/porsche-canvas/ThenewPorsche.01418.png",
//            "/porsche-canvas/ThenewPorsche.01419.png",
//            "/porsche-canvas/ThenewPorsche.01420.png",
//            "/porsche-canvas/ThenewPorsche.01421.png",
//            "/porsche-canvas/ThenewPorsche.01422.png",
//            "/porsche-canvas/ThenewPorsche.01423.png",
//            "/porsche-canvas/ThenewPorsche.01424.png",
//            "/porsche-canvas/ThenewPorsche.01425.png",
//            "/porsche-canvas/ThenewPorsche.01426.png",
//            "/porsche-canvas/ThenewPorsche.01427.png",
//            "/porsche-canvas/ThenewPorsche.01428.png",
//            "/porsche-canvas/ThenewPorsche.01429.png",
//            "/porsche-canvas/ThenewPorsche.01430.png",
//            "/porsche-canvas/ThenewPorsche.01431.png",
//            "/porsche-canvas/ThenewPorsche.01432.png",
//            "/porsche-canvas/ThenewPorsche.01433.png",
//            "/porsche-canvas/ThenewPorsche.01434.png",
//            "/porsche-canvas/ThenewPorsche.01435.png",
//            "/porsche-canvas/ThenewPorsche.01436.png",
//            "/porsche-canvas/ThenewPorsche.01437.png",
//            "/porsche-canvas/ThenewPorsche.01438.png",
//            "/porsche-canvas/ThenewPorsche.01439.png",
//            "/porsche-canvas/ThenewPorsche.01440.png",
//            "/porsche-canvas/ThenewPorsche.01441.png",
//            "/porsche-canvas/ThenewPorsche.01442.png",
//            "/porsche-canvas/ThenewPorsche.01443.png",
//            "/porsche-canvas/ThenewPorsche.01444.png",
//            "/porsche-canvas/ThenewPorsche.01445.png",
//            "/porsche-canvas/ThenewPorsche.01446.png",
//            "/porsche-canvas/ThenewPorsche.01447.png",
//            "/porsche-canvas/ThenewPorsche.01448.png",
//            "/porsche-canvas/ThenewPorsche.01449.png",
//            "/porsche-canvas/ThenewPorsche.01450.png",
//            "/porsche-canvas/ThenewPorsche.01451.png",
//            "/porsche-canvas/ThenewPorsche.01452.png",
//            "/porsche-canvas/ThenewPorsche.01453.png",
//            "/porsche-canvas/ThenewPorsche.01454.png",
//            "/porsche-canvas/ThenewPorsche.01455.png",
//            "/porsche-canvas/ThenewPorsche.01464.png",
//            "/porsche-canvas/ThenewPorsche.01465.png",
//            "/porsche-canvas/ThenewPorsche.01466.png",
//            "/porsche-canvas/ThenewPorsche.01467.png",
//            "/porsche-canvas/ThenewPorsche.01468.png",
//            "/porsche-canvas/ThenewPorsche.01469.png",
//            "/porsche-canvas/ThenewPorsche.01470.png",
//            "/porsche-canvas/ThenewPorsche.01471.png",
//            "/porsche-canvas/ThenewPorsche.01472.png",
//            "/porsche-canvas/ThenewPorsche.01473.png",
//            "/porsche-canvas/ThenewPorsche.01474.png",
//            "/porsche-canvas/ThenewPorsche.01475.png",
//            "/porsche-canvas/ThenewPorsche.01476.png",
//            "/porsche-canvas/ThenewPorsche.01477.png",
//            "/porsche-canvas/ThenewPorsche.01478.png",
//            "/porsche-canvas/ThenewPorsche.01479.png",
//            "/porsche-canvas/ThenewPorsche.01480.png",
//            "/porsche-canvas/ThenewPorsche.01481.png",
//            "/porsche-canvas/ThenewPorsche.01482.png",
//            "/porsche-canvas/ThenewPorsche.01483.png",
//            "/porsche-canvas/ThenewPorsche.01484.png",
//            "/porsche-canvas/ThenewPorsche.01485.png",
//            "/porsche-canvas/ThenewPorsche.01486.png",
//            "/porsche-canvas/ThenewPorsche.01487.png",
//            "/porsche-canvas/ThenewPorsche.01488.png",
//            "/porsche-canvas/ThenewPorsche.01489.png",
//            "/porsche-canvas/ThenewPorsche.01490.png",
//            "/porsche-canvas/ThenewPorsche.01491.png",
//            "/porsche-canvas/ThenewPorsche.01492.png",
//            "/porsche-canvas/ThenewPorsche.01493.png",
//            "/porsche-canvas/ThenewPorsche.01494.png",
//            "/porsche-canvas/ThenewPorsche.01495.png",
//            "/porsche-canvas/ThenewPorsche.01496.png",
//            "/porsche-canvas/ThenewPorsche.01497.png",
//            "/porsche-canvas/ThenewPorsche.01498.png",
//            "/porsche-canvas/ThenewPorsche.01499.png",
//            "/porsche-canvas/ThenewPorsche.01500.png",
//            "/porsche-canvas/ThenewPorsche.01501.png",
//            "/porsche-canvas/ThenewPorsche.01502.png",
//            "/porsche-canvas/ThenewPorsche.01503.png",
//            "/porsche-canvas/ThenewPorsche.01504.png",
//            "/porsche-canvas/ThenewPorsche.01505.png",
//            "/porsche-canvas/ThenewPorsche.01506.png",
//            "/porsche-canvas/ThenewPorsche.01507.png",
//            "/porsche-canvas/ThenewPorsche.01508.png",
//            "/porsche-canvas/ThenewPorsche.01509.png",
//            "/porsche-canvas/ThenewPorsche.01510.png",
//            "/porsche-canvas/ThenewPorsche.01511.png",
//            "/porsche-canvas/ThenewPorsche.01512.png",
//            "/porsche-canvas/ThenewPorsche.01513.png",
//            "/porsche-canvas/ThenewPorsche.01514.png",
//            "/porsche-canvas/ThenewPorsche.01515.png",
//            "/porsche-canvas/ThenewPorsche.01516.png",
//            "/porsche-canvas/ThenewPorsche.01517.png",
//            "/porsche-canvas/ThenewPorsche.01518.png",
//            "/porsche-canvas/ThenewPorsche.01519.png",
//            "/porsche-canvas/ThenewPorsche.01520.png",
//            "/porsche-canvas/ThenewPorsche.01521.png",
//            "/porsche-canvas/ThenewPorsche.01522.png",
//            "/porsche-canvas/ThenewPorsche.01523.png",
//            "/porsche-canvas/ThenewPorsche.01524.png",
//            "/porsche-canvas/ThenewPorsche.01525.png",
//            "/porsche-canvas/ThenewPorsche.01526.png",
//            "/porsche-canvas/ThenewPorsche.01527.png",
//            "/porsche-canvas/ThenewPorsche.01528.png",
//            "/porsche-canvas/ThenewPorsche.01529.png",
//            "/porsche-canvas/ThenewPorsche.01530.png",
//            "/porsche-canvas/ThenewPorsche.01531.png",
//            "/porsche-canvas/ThenewPorsche.01532.png",
//            "/porsche-canvas/ThenewPorsche.01533.png",
//            "/porsche-canvas/ThenewPorsche.01534.png",
//            "/porsche-canvas/ThenewPorsche.01535.png",
//            "/porsche-canvas/ThenewPorsche.01536.png",
//            "/porsche-canvas/ThenewPorsche.01537.png",
//            "/porsche-canvas/ThenewPorsche.01538.png",
//            "/porsche-canvas/ThenewPorsche.01539.png",
//            "/porsche-canvas/ThenewPorsche.01540.png",
//            "/porsche-canvas/ThenewPorsche.01541.png",
//            "/porsche-canvas/ThenewPorsche.01542.png",
//            "/porsche-canvas/ThenewPorsche.01543.png",
//            "/porsche-canvas/ThenewPorsche.01544.png",
//            "/porsche-canvas/ThenewPorsche.01545.png",
//            "/porsche-canvas/ThenewPorsche.01546.png",
//            "/porsche-canvas/ThenewPorsche.01547.png",
//            "/porsche-canvas/ThenewPorsche.01548.png",
//            "/porsche-canvas/ThenewPorsche.01549.png",
//            "/porsche-canvas/ThenewPorsche.01550.png",
//            "/porsche-canvas/ThenewPorsche.01551.png",
//            "/porsche-canvas/ThenewPorsche.01552.png",
//            "/porsche-canvas/ThenewPorsche.01553.png",
//            "/porsche-canvas/ThenewPorsche.01554.png",
//            "/porsche-canvas/ThenewPorsche.01555.png",
//            "/porsche-canvas/ThenewPorsche.01556.png",
//            "/porsche-canvas/ThenewPorsche.01557.png",
//            "/porsche-canvas/ThenewPorsche.01558.png",
//            "/porsche-canvas/ThenewPorsche.01559.png",
//            "/porsche-canvas/ThenewPorsche.01560.png",
//            "/porsche-canvas/ThenewPorsche.01561.png",
//            "/porsche-canvas/ThenewPorsche.01562.png",
//            "/porsche-canvas/ThenewPorsche.01563.png",
//            "/porsche-canvas/ThenewPorsche.01564.png",
//            "/porsche-canvas/ThenewPorsche.01565.png",
//            "/porsche-canvas/ThenewPorsche.01566.png",
//            "/porsche-canvas/ThenewPorsche.01567.png",
//            "/porsche-canvas/ThenewPorsche.01568.png",
//            "/porsche-canvas/ThenewPorsche.01569.png",
//            "/porsche-canvas/ThenewPorsche.01570.png",
//            "/porsche-canvas/ThenewPorsche.01571.png",
//            "/porsche-canvas/ThenewPorsche.01572.png",
//            "/porsche-canvas/ThenewPorsche.01573.png",
//            "/porsche-canvas/ThenewPorsche.01574.png",
//            "/porsche-canvas/ThenewPorsche.01575.png",
//            "/porsche-canvas/ThenewPorsche.01576.png",
//            "/porsche-canvas/ThenewPorsche.01577.png",
//            "/porsche-canvas/ThenewPorsche.01578.png",
//            "/porsche-canvas/ThenewPorsche.01579.png",
//            "/porsche-canvas/ThenewPorsche.01580.png",
//            "/porsche-canvas/ThenewPorsche.01581.png",
//            "/porsche-canvas/ThenewPorsche.01582.png",
//            "/porsche-canvas/ThenewPorsche.01583.png",
//            "/porsche-canvas/ThenewPorsche.01584.png",
//            "/porsche-canvas/ThenewPorsche.01585.png",
//            "/porsche-canvas/ThenewPorsche.01586.png",
//            "/porsche-canvas/ThenewPorsche.01587.png",
//            "/porsche-canvas/ThenewPorsche.01588.png",
//            "/porsche-canvas/ThenewPorsche.01589.png",
//            "/porsche-canvas/ThenewPorsche.01590.png",
//            "/porsche-canvas/ThenewPorsche.01591.png",
//            "/porsche-canvas/ThenewPorsche.01592.png",
//            "/porsche-canvas/ThenewPorsche.01593.png",
//            "/porsche-canvas/ThenewPorsche.01594.png",
//            "/porsche-canvas/ThenewPorsche.01595.png",
//            "/porsche-canvas/ThenewPorsche.01596.png",
//            "/porsche-canvas/ThenewPorsche.01597.png",
//            "/porsche-canvas/ThenewPorsche.01598.png",
//            "/porsche-canvas/ThenewPorsche.01599.png",
//            "/porsche-canvas/ThenewPorsche.01500.png",
//            "/porsche-canvas/ThenewPorsche.01601.png",
//            "/porsche-canvas/ThenewPorsche.01602.png",
//            "/porsche-canvas/ThenewPorsche.01603.png",
//            "/porsche-canvas/ThenewPorsche.01604.png",
//            "/porsche-canvas/ThenewPorsche.01605.png",
//            "/porsche-canvas/ThenewPorsche.01606.png",
//            "/porsche-canvas/ThenewPorsche.01607.png",
//            "/porsche-canvas/ThenewPorsche.01608.png",
//            "/porsche-canvas/ThenewPorsche.01609.png",
//            "/porsche-canvas/ThenewPorsche.01610.png",
//            "/porsche-canvas/ThenewPorsche.01611.png",
//            "/porsche-canvas/ThenewPorsche.01612.png",
//         ];

//         const images = [];
//         let imagesLoaded = 0;

//         imagePaths.forEach((path, index) => {
//             const img = new Image();
//             img.src = path;
//             img.onload = () => {
//                 imagesLoaded++;
//                 if (imagesLoaded === imagePaths.length) {
//                     render();
//                 }
//             };
//             img.onerror = () => {
//                 console.error(`Failed to load image: ${path}`);
//             };
//             images[index] = img;
//         });

//         function render() {
//             context.clearRect(0, 0, canvas.width, canvas.height);
//             images.forEach((img, index) => {
//                 if (img.complete && img.naturalWidth !== 0) {
//                     context.drawImage(img, 0, 0, canvas.width, canvas.height);
//                 }
//             });
//         }
//     }

//     canva();
// }
// pg4()


function pg4() {

    function canva() {
        const canvas = document.querySelector("#page4>canvas");
        const context = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener("resize", function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        })

        function files(index) {
            var data = `
            /porsche-canvas/ThenewPorsche.01191.png
            /porsche-canvas/ThenewPorsche.01192.png
            /porsche-canvas/ThenewPorsche.01193.png
            /porsche-canvas/ThenewPorsche.01194.png
            /porsche-canvas/ThenewPorsche.01195.png
            /porsche-canvas/ThenewPorsche.01196.png
            /porsche-canvas/ThenewPorsche.01197.png
            /porsche-canvas/ThenewPorsche.01198.png
            /porsche-canvas/ThenewPorsche.01199.png
            /porsche-canvas/ThenewPorsche.01200.png
            /porsche-canvas/ThenewPorsche.01201.png
            /porsche-canvas/ThenewPorsche.01202.png
            /porsche-canvas/ThenewPorsche.01203.png
            /porsche-canvas/ThenewPorsche.01204.png
            /porsche-canvas/ThenewPorsche.01205.png
            /porsche-canvas/ThenewPorsche.01206.png
            /porsche-canvas/ThenewPorsche.01207.png
            /porsche-canvas/ThenewPorsche.01208.png
            /porsche-canvas/ThenewPorsche.01209.png
            /porsche-canvas/ThenewPorsche.01210.png
            /porsche-canvas/ThenewPorsche.01211.png
            /porsche-canvas/ThenewPorsche.01212.png
            /porsche-canvas/ThenewPorsche.01213.png
            /porsche-canvas/ThenewPorsche.01214.png
            /porsche-canvas/ThenewPorsche.01215.png
            /porsche-canvas/ThenewPorsche.01216.png
            /porsche-canvas/ThenewPorsche.01217.png
            /porsche-canvas/ThenewPorsche.01218.png
            /porsche-canvas/ThenewPorsche.01219.png
            /porsche-canvas/ThenewPorsche.01220.png
            /porsche-canvas/ThenewPorsche.01221.png
            /porsche-canvas/ThenewPorsche.01222.png
            /porsche-canvas/ThenewPorsche.01223.png
            /porsche-canvas/ThenewPorsche.01224.png
            /porsche-canvas/ThenewPorsche.01225.png
            /porsche-canvas/ThenewPorsche.01226.png
            /porsche-canvas/ThenewPorsche.01227.png
            /porsche-canvas/ThenewPorsche.01228.png
            /porsche-canvas/ThenewPorsche.01239.png
            /porsche-canvas/ThenewPorsche.01230.png
            /porsche-canvas/ThenewPorsche.01231.png
            /porsche-canvas/ThenewPorsche.01232.png
            /porsche-canvas/ThenewPorsche.01233.png
            /porsche-canvas/ThenewPorsche.01234.png
            /porsche-canvas/ThenewPorsche.01235.png
            /porsche-canvas/ThenewPorsche.01236.png
            /porsche-canvas/ThenewPorsche.01237.png
            /porsche-canvas/ThenewPorsche.01238.png
            /porsche-canvas/ThenewPorsche.01239.png
            /porsche-canvas/ThenewPorsche.01240.png
            /porsche-canvas/ThenewPorsche.01241.png
            /porsche-canvas/ThenewPorsche.01242.png
            /porsche-canvas/ThenewPorsche.01243.png
            /porsche-canvas/ThenewPorsche.01244.png
            /porsche-canvas/ThenewPorsche.01245.png
            /porsche-canvas/ThenewPorsche.01246.png
            /porsche-canvas/ThenewPorsche.01247.png
            /porsche-canvas/ThenewPorsche.01248.png
            /porsche-canvas/ThenewPorsche.01249.png
            /porsche-canvas/ThenewPorsche.01250.png
            /porsche-canvas/ThenewPorsche.01251.png
            /porsche-canvas/ThenewPorsche.01252.png
            /porsche-canvas/ThenewPorsche.01253.png
            /porsche-canvas/ThenewPorsche.01279.png
            /porsche-canvas/ThenewPorsche.01280.png
            /porsche-canvas/ThenewPorsche.01281.png
            /porsche-canvas/ThenewPorsche.01282.png
            /porsche-canvas/ThenewPorsche.01283.png
            /porsche-canvas/ThenewPorsche.01284.png
            /porsche-canvas/ThenewPorsche.01285.png
            /porsche-canvas/ThenewPorsche.01286.png
            /porsche-canvas/ThenewPorsche.01287.png
            /porsche-canvas/ThenewPorsche.01288.png
            /porsche-canvas/ThenewPorsche.01289.png
            /porsche-canvas/ThenewPorsche.01290.png
            /porsche-canvas/ThenewPorsche.01291.png
            /porsche-canvas/ThenewPorsche.01292.png
            /porsche-canvas/ThenewPorsche.01293.png
            /porsche-canvas/ThenewPorsche.01294.png
            /porsche-canvas/ThenewPorsche.01295.png
            /porsche-canvas/ThenewPorsche.01296.png
            /porsche-canvas/ThenewPorsche.01297.png
            /porsche-canvas/ThenewPorsche.01298.png
            /porsche-canvas/ThenewPorsche.01299.png
            /porsche-canvas/ThenewPorsche.01300.png
            /porsche-canvas/ThenewPorsche.01301.png
            /porsche-canvas/ThenewPorsche.01302.png
            /porsche-canvas/ThenewPorsche.01303.png
            /porsche-canvas/ThenewPorsche.01304.png
            /porsche-canvas/ThenewPorsche.01305.png
            /porsche-canvas/ThenewPorsche.01306.png
            /porsche-canvas/ThenewPorsche.01307.png
            /porsche-canvas/ThenewPorsche.01308.png
            /porsche-canvas/ThenewPorsche.01309.png
            /porsche-canvas/ThenewPorsche.01310.png
            /porsche-canvas/ThenewPorsche.01311.png
            /porsche-canvas/ThenewPorsche.01312.png
            /porsche-canvas/ThenewPorsche.01313.png
            /porsche-canvas/ThenewPorsche.01314.png
            /porsche-canvas/ThenewPorsche.01315.png
            /porsche-canvas/ThenewPorsche.01316.png
            /porsche-canvas/ThenewPorsche.01317.png
            /porsche-canvas/ThenewPorsche.01318.png
            /porsche-canvas/ThenewPorsche.01319.png
            /porsche-canvas/ThenewPorsche.01320.png
            /porsche-canvas/ThenewPorsche.01321.png
            /porsche-canvas/ThenewPorsche.01322.png
            /porsche-canvas/ThenewPorsche.01341.png
            /porsche-canvas/ThenewPorsche.01342.png
            /porsche-canvas/ThenewPorsche.01343.png
            /porsche-canvas/ThenewPorsche.01344.png
            /porsche-canvas/ThenewPorsche.01345.png
            /porsche-canvas/ThenewPorsche.01346.png
            /porsche-canvas/ThenewPorsche.01347.png
            /porsche-canvas/ThenewPorsche.01348.png
            /porsche-canvas/ThenewPorsche.01349.png
            /porsche-canvas/ThenewPorsche.01350.png
            /porsche-canvas/ThenewPorsche.01351.png
            /porsche-canvas/ThenewPorsche.01352.png
            /porsche-canvas/ThenewPorsche.01353.png
            /porsche-canvas/ThenewPorsche.01354.png
            /porsche-canvas/ThenewPorsche.01355.png
            /porsche-canvas/ThenewPorsche.01356.png
            /porsche-canvas/ThenewPorsche.01357.png
            /porsche-canvas/ThenewPorsche.01358.png
            /porsche-canvas/ThenewPorsche.01359.png
            /porsche-canvas/ThenewPorsche.01360.png
            /porsche-canvas/ThenewPorsche.01361.png
            /porsche-canvas/ThenewPorsche.01362.png
            /porsche-canvas/ThenewPorsche.01363.png
            /porsche-canvas/ThenewPorsche.01364.png
            /porsche-canvas/ThenewPorsche.01365.png
            /porsche-canvas/ThenewPorsche.01366.png
            /porsche-canvas/ThenewPorsche.01367.png
            /porsche-canvas/ThenewPorsche.01368.png
            /porsche-canvas/ThenewPorsche.01369.png
            /porsche-canvas/ThenewPorsche.01370.png
            /porsche-canvas/ThenewPorsche.01371.png
            /porsche-canvas/ThenewPorsche.01372.png
            /porsche-canvas/ThenewPorsche.01373.png
            /porsche-canvas/ThenewPorsche.01374.png
            /porsche-canvas/ThenewPorsche.01375.png
            /porsche-canvas/ThenewPorsche.01376.png
            /porsche-canvas/ThenewPorsche.01377.png
            /porsche-canvas/ThenewPorsche.01378.png
            /porsche-canvas/ThenewPorsche.01379.png
            /porsche-canvas/ThenewPorsche.01380.png
            /porsche-canvas/ThenewPorsche.01381.png
            /porsche-canvas/ThenewPorsche.01382.png
            /porsche-canvas/ThenewPorsche.01383.png
            /porsche-canvas/ThenewPorsche.01384.png
            /porsche-canvas/ThenewPorsche.01385.png
            /porsche-canvas/ThenewPorsche.01386.png
            /porsche-canvas/ThenewPorsche.01387.png
            /porsche-canvas/ThenewPorsche.01388.png
            /porsche-canvas/ThenewPorsche.01389.png
            /porsche-canvas/ThenewPorsche.01390.png
            /porsche-canvas/ThenewPorsche.01391.png
            /porsche-canvas/ThenewPorsche.01392.png
            /porsche-canvas/ThenewPorsche.01393.png
            /porsche-canvas/ThenewPorsche.01394.png
            /porsche-canvas/ThenewPorsche.01395.png
            /porsche-canvas/ThenewPorsche.01396.png
            /porsche-canvas/ThenewPorsche.01397.png
            /porsche-canvas/ThenewPorsche.01398.png
            /porsche-canvas/ThenewPorsche.01399.png
            /porsche-canvas/ThenewPorsche.01400.png
            /porsche-canvas/ThenewPorsche.01400.png
            /porsche-canvas/ThenewPorsche.01401.png
            /porsche-canvas/ThenewPorsche.01402.png
            /porsche-canvas/ThenewPorsche.01403.png
            /porsche-canvas/ThenewPorsche.01404.png
            /porsche-canvas/ThenewPorsche.01405.png
            /porsche-canvas/ThenewPorsche.01406.png
            /porsche-canvas/ThenewPorsche.01407.png
            /porsche-canvas/ThenewPorsche.01408.png
            /porsche-canvas/ThenewPorsche.01409.png
            /porsche-canvas/ThenewPorsche.01410.png
            /porsche-canvas/ThenewPorsche.01411.png
            /porsche-canvas/ThenewPorsche.01412.png
            /porsche-canvas/ThenewPorsche.01413.png
            /porsche-canvas/ThenewPorsche.01414.png
            /porsche-canvas/ThenewPorsche.01415.png
            /porsche-canvas/ThenewPorsche.01416.png
            /porsche-canvas/ThenewPorsche.01417.png
            /porsche-canvas/ThenewPorsche.01418.png
            /porsche-canvas/ThenewPorsche.01419.png
            /porsche-canvas/ThenewPorsche.01420.png
            /porsche-canvas/ThenewPorsche.01421.png
            /porsche-canvas/ThenewPorsche.01422.png
            /porsche-canvas/ThenewPorsche.01423.png
            /porsche-canvas/ThenewPorsche.01424.png
            /porsche-canvas/ThenewPorsche.01425.png
            /porsche-canvas/ThenewPorsche.01426.png
            /porsche-canvas/ThenewPorsche.01427.png
            /porsche-canvas/ThenewPorsche.01428.png
            /porsche-canvas/ThenewPorsche.01429.png
            /porsche-canvas/ThenewPorsche.01430.png
            /porsche-canvas/ThenewPorsche.01431.png
            /porsche-canvas/ThenewPorsche.01432.png
            /porsche-canvas/ThenewPorsche.01433.png
            /porsche-canvas/ThenewPorsche.01434.png
            /porsche-canvas/ThenewPorsche.01435.png
            /porsche-canvas/ThenewPorsche.01436.png
            /porsche-canvas/ThenewPorsche.01437.png
            /porsche-canvas/ThenewPorsche.01438.png
            /porsche-canvas/ThenewPorsche.01439.png
            /porsche-canvas/ThenewPorsche.01440.png
            /porsche-canvas/ThenewPorsche.01441.png
            /porsche-canvas/ThenewPorsche.01442.png
            /porsche-canvas/ThenewPorsche.01443.png
            /porsche-canvas/ThenewPorsche.01444.png
            /porsche-canvas/ThenewPorsche.01445.png
            /porsche-canvas/ThenewPorsche.01446.png
            /porsche-canvas/ThenewPorsche.01447.png
            /porsche-canvas/ThenewPorsche.01448.png
            /porsche-canvas/ThenewPorsche.01449.png
            /porsche-canvas/ThenewPorsche.01450.png
            /porsche-canvas/ThenewPorsche.01451.png
            /porsche-canvas/ThenewPorsche.01452.png
            /porsche-canvas/ThenewPorsche.01453.png
            /porsche-canvas/ThenewPorsche.01454.png
            /porsche-canvas/ThenewPorsche.01455.png
            /porsche-canvas/ThenewPorsche.01464.png
            /porsche-canvas/ThenewPorsche.01465.png
            /porsche-canvas/ThenewPorsche.01466.png
            /porsche-canvas/ThenewPorsche.01467.png
            /porsche-canvas/ThenewPorsche.01468.png
            /porsche-canvas/ThenewPorsche.01469.png
            /porsche-canvas/ThenewPorsche.01470.png
            /porsche-canvas/ThenewPorsche.01471.png
            /porsche-canvas/ThenewPorsche.01472.png
            /porsche-canvas/ThenewPorsche.01473.png
            /porsche-canvas/ThenewPorsche.01474.png
            /porsche-canvas/ThenewPorsche.01475.png
            /porsche-canvas/ThenewPorsche.01476.png
            /porsche-canvas/ThenewPorsche.01477.png
            /porsche-canvas/ThenewPorsche.01478.png
            /porsche-canvas/ThenewPorsche.01479.png
            /porsche-canvas/ThenewPorsche.01480.png
            /porsche-canvas/ThenewPorsche.01481.png
            /porsche-canvas/ThenewPorsche.01482.png
            /porsche-canvas/ThenewPorsche.01483.png
            /porsche-canvas/ThenewPorsche.01484.png
            /porsche-canvas/ThenewPorsche.01485.png
            /porsche-canvas/ThenewPorsche.01486.png
            /porsche-canvas/ThenewPorsche.01487.png
            /porsche-canvas/ThenewPorsche.01488.png
            /porsche-canvas/ThenewPorsche.01489.png
            /porsche-canvas/ThenewPorsche.01490.png
            /porsche-canvas/ThenewPorsche.01491.png
            /porsche-canvas/ThenewPorsche.01492.png
            /porsche-canvas/ThenewPorsche.01493.png
            /porsche-canvas/ThenewPorsche.01494.png
            /porsche-canvas/ThenewPorsche.01495.png
            /porsche-canvas/ThenewPorsche.01496.png
            /porsche-canvas/ThenewPorsche.01497.png
            /porsche-canvas/ThenewPorsche.01498.png
            /porsche-canvas/ThenewPorsche.01499.png
            /porsche-canvas/ThenewPorsche.01500.png
            /porsche-canvas/ThenewPorsche.01501.png
            /porsche-canvas/ThenewPorsche.01502.png
            /porsche-canvas/ThenewPorsche.01503.png
            /porsche-canvas/ThenewPorsche.01504.png
            /porsche-canvas/ThenewPorsche.01505.png
            /porsche-canvas/ThenewPorsche.01506.png
            /porsche-canvas/ThenewPorsche.01507.png
            /porsche-canvas/ThenewPorsche.01508.png
            /porsche-canvas/ThenewPorsche.01509.png
            /porsche-canvas/ThenewPorsche.01510.png
            /porsche-canvas/ThenewPorsche.01511.png
            /porsche-canvas/ThenewPorsche.01512.png
            /porsche-canvas/ThenewPorsche.01513.png
            /porsche-canvas/ThenewPorsche.01514.png
            /porsche-canvas/ThenewPorsche.01515.png
            /porsche-canvas/ThenewPorsche.01516.png
            /porsche-canvas/ThenewPorsche.01517.png
            /porsche-canvas/ThenewPorsche.01518.png
            /porsche-canvas/ThenewPorsche.01519.png
            /porsche-canvas/ThenewPorsche.01520.png
            /porsche-canvas/ThenewPorsche.01521.png
            /porsche-canvas/ThenewPorsche.01522.png
            /porsche-canvas/ThenewPorsche.01523.png
            /porsche-canvas/ThenewPorsche.01524.png
            /porsche-canvas/ThenewPorsche.01525.png
            /porsche-canvas/ThenewPorsche.01526.png
            /porsche-canvas/ThenewPorsche.01527.png
            /porsche-canvas/ThenewPorsche.01528.png
            /porsche-canvas/ThenewPorsche.01529.png
            /porsche-canvas/ThenewPorsche.01530.png
            /porsche-canvas/ThenewPorsche.01531.png
            /porsche-canvas/ThenewPorsche.01532.png
            /porsche-canvas/ThenewPorsche.01533.png
            /porsche-canvas/ThenewPorsche.01534.png
            /porsche-canvas/ThenewPorsche.01535.png
            /porsche-canvas/ThenewPorsche.01536.png
            /porsche-canvas/ThenewPorsche.01537.png
            /porsche-canvas/ThenewPorsche.01538.png
            /porsche-canvas/ThenewPorsche.01539.png
            /porsche-canvas/ThenewPorsche.01540.png
            /porsche-canvas/ThenewPorsche.01541.png
            /porsche-canvas/ThenewPorsche.01542.png
            /porsche-canvas/ThenewPorsche.01543.png
            /porsche-canvas/ThenewPorsche.01544.png
            /porsche-canvas/ThenewPorsche.01545.png
            /porsche-canvas/ThenewPorsche.01546.png
            /porsche-canvas/ThenewPorsche.01547.png
            /porsche-canvas/ThenewPorsche.01548.png
            /porsche-canvas/ThenewPorsche.01549.png
            /porsche-canvas/ThenewPorsche.01550.png
            /porsche-canvas/ThenewPorsche.01551.png
            /porsche-canvas/ThenewPorsche.01552.png
            /porsche-canvas/ThenewPorsche.01553.png
            /porsche-canvas/ThenewPorsche.01554.png
            /porsche-canvas/ThenewPorsche.01555.png
            /porsche-canvas/ThenewPorsche.01556.png
            /porsche-canvas/ThenewPorsche.01557.png
            /porsche-canvas/ThenewPorsche.01558.png
            /porsche-canvas/ThenewPorsche.01559.png
            /porsche-canvas/ThenewPorsche.01560.png
            /porsche-canvas/ThenewPorsche.01561.png
            /porsche-canvas/ThenewPorsche.01562.png
            /porsche-canvas/ThenewPorsche.01563.png
            /porsche-canvas/ThenewPorsche.01564.png
            /porsche-canvas/ThenewPorsche.01565.png
            /porsche-canvas/ThenewPorsche.01566.png
            /porsche-canvas/ThenewPorsche.01567.png
            /porsche-canvas/ThenewPorsche.01568.png
            /porsche-canvas/ThenewPorsche.01569.png
            /porsche-canvas/ThenewPorsche.01570.png
            /porsche-canvas/ThenewPorsche.01571.png
            /porsche-canvas/ThenewPorsche.01572.png
            /porsche-canvas/ThenewPorsche.01573.png
            /porsche-canvas/ThenewPorsche.01574.png
            /porsche-canvas/ThenewPorsche.01575.png
            /porsche-canvas/ThenewPorsche.01576.png
            /porsche-canvas/ThenewPorsche.01577.png
            /porsche-canvas/ThenewPorsche.01578.png
            /porsche-canvas/ThenewPorsche.01579.png
            /porsche-canvas/ThenewPorsche.01580.png
            /porsche-canvas/ThenewPorsche.01581.png
            /porsche-canvas/ThenewPorsche.01582.png
            /porsche-canvas/ThenewPorsche.01583.png
            /porsche-canvas/ThenewPorsche.01584.png
            /porsche-canvas/ThenewPorsche.01585.png
            /porsche-canvas/ThenewPorsche.01586.png
            /porsche-canvas/ThenewPorsche.01587.png
            /porsche-canvas/ThenewPorsche.01588.png
            /porsche-canvas/ThenewPorsche.01589.png
            /porsche-canvas/ThenewPorsche.01590.png
            /porsche-canvas/ThenewPorsche.01591.png
            /porsche-canvas/ThenewPorsche.01592.png
            /porsche-canvas/ThenewPorsche.01593.png
            /porsche-canvas/ThenewPorsche.01594.png
            /porsche-canvas/ThenewPorsche.01595.png
            /porsche-canvas/ThenewPorsche.01596.png
            /porsche-canvas/ThenewPorsche.01597.png
            /porsche-canvas/ThenewPorsche.01598.png
            /porsche-canvas/ThenewPorsche.01599.png
            /porsche-canvas/ThenewPorsche.01500.png
            /porsche-canvas/ThenewPorsche.01601.png
            /porsche-canvas/ThenewPorsche.01602.png
            /porsche-canvas/ThenewPorsche.01603.png
            /porsche-canvas/ThenewPorsche.01604.png
            /porsche-canvas/ThenewPorsche.01605.png
            /porsche-canvas/ThenewPorsche.01606.png
            /porsche-canvas/ThenewPorsche.01607.png
            /porsche-canvas/ThenewPorsche.01608.png
            /porsche-canvas/ThenewPorsche.01609.png
            /porsche-canvas/ThenewPorsche.01610.png
            /porsche-canvas/ThenewPorsche.01611.png
            /porsche-canvas/ThenewPorsche.01612.png
         `;
            return data.split("\n")[index];
        }

        const frameCount = 373;

        const images = [];
        const imageSeq = {
            frame: 0
        };

        for (let i = 1; i < frameCount; i++) {
            const img = new Image();
            img.src = files(i);
            images.push(img);
        }
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#page4",
                start: "top top",
                pin: true,
                scroller: "#main",
                // markers:true,
                scrub: 3,
                end: "500% 0%"
            }
        })
      
            .to(imageSeq, {
                frame: frameCount - 1,
                snap: "frame",
                ease: "none",
                duration: 30,
                onUpdate: render
            })


        images[0].onload = render;

        function render() {
            scaleImage(images[imageSeq.frame], context)
        }

        function scaleImage(img, ctx) {
            // var canvas = ctx.canvas;
            var hRatio = canvas.width / img.width;
            var vRatio = canvas.height / img.height;
            var ratio = Math.max(hRatio, vRatio);
            var centerShift_x = (canvas.width - img.width * ratio) / 2;
            var centerShift_y = (canvas.height - img.height * ratio) / 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);

        }



    }
    canva()

  

  

}
// pg4()



//  function canva() {
//         const canvas = document.querySelector("#page4>canvas");
//         const context = canvas.getContext("2d");

//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;

//         window.addEventListener("resize", function () {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//             render();
//         })

//         function files(index) {
//            var data = `
//         /canvaspage-imgs/canvaspage-imgs/0001.jpg
//        /canvaspage-imgs/canvaspage-imgs/0002.jpg
//        /canvaspage-imgs/canvaspage-imgs/0003.jpg
//        /canvaspage-imgs/canvaspage-imgs/0004.jpg
//        /canvaspage-imgs/canvaspage-imgs/0005.jpg
//        /canvaspage-imgs/canvaspage-imgs/0006.jpg
//        /canvaspage-imgs/canvaspage-imgs/0007.jpg
//        /canvaspage-imgs/canvaspage-imgs/0008.jpg
//        /canvaspage-imgs/canvaspage-imgs/0009.jpg
//        /canvaspage-imgs/canvaspage-imgs/0010.jpg
//        /canvaspage-imgs/canvaspage-imgs/0011.jpg
//        /canvaspage-imgs/canvaspage-imgs/0012.jpg
//        /canvaspage-imgs/canvaspage-imgs/0013.jpg
//        /canvaspage-imgs/canvaspage-imgs/0014.jpg
//        /canvaspage-imgs/canvaspage-imgs/0015.jpg
//        /canvaspage-imgs/canvaspage-imgs/0016.jpg
//        /canvaspage-imgs/canvaspage-imgs/0017.jpg
//        /canvaspage-imgs/canvaspage-imgs/0018.jpg
//        /canvaspage-imgs/canvaspage-imgs/0019.jpg
//        /canvaspage-imgs/canvaspage-imgs/0020.jpg
//        /canvaspage-imgs/canvaspage-imgs/0021.jpg
//        /canvaspage-imgs/canvaspage-imgs/0022.jpg
//        /canvaspage-imgs/canvaspage-imgs/0023.jpg
//        /canvaspage-imgs/canvaspage-imgs/0024.jpg
//        /canvaspage-imgs/canvaspage-imgs/0025.jpg
//        /canvaspage-imgs/canvaspage-imgs/0026.jpg
//        /canvaspage-imgs/canvaspage-imgs/0027.jpg
//        /canvaspage-imgs/canvaspage-imgs/0028.jpg
//        /canvaspage-imgs/canvaspage-imgs/0029.jpg
//        /canvaspage-imgs/canvaspage-imgs/0030.jpg
//        /canvaspage-imgs/canvaspage-imgs/0031.jpg
//        /canvaspage-imgs/canvaspage-imgs/0032.jpg
//        /canvaspage-imgs/canvaspage-imgs/0033.jpg
//        /canvaspage-imgs/canvaspage-imgs/0034.jpg
//        /canvaspage-imgs/canvaspage-imgs/0035.jpg
//        /canvaspage-imgs/canvaspage-imgs/0036.jpg
//        /canvaspage-imgs/canvaspage-imgs/0037.jpg
//        /canvaspage-imgs/canvaspage-imgs/0038.jpg
//        /canvaspage-imgs/canvaspage-imgs/0039.jpg
//        /canvaspage-imgs/canvaspage-imgs/0040.jpg
//        /canvaspage-imgs/canvaspage-imgs/0041.jpg
//        /canvaspage-imgs/canvaspage-imgs/0042.jpg
//        /canvaspage-imgs/canvaspage-imgs/0043.jpg
//        /canvaspage-imgs/canvaspage-imgs/0044.jpg
//        /canvaspage-imgs/canvaspage-imgs/0045.jpg
//        /canvaspage-imgs/canvaspage-imgs/0046.jpg
//        /canvaspage-imgs/canvaspage-imgs/0047.jpg
//        /canvaspage-imgs/canvaspage-imgs/0048.jpg
//        /canvaspage-imgs/canvaspage-imgs/0049.jpg
//        /canvaspage-imgs/canvaspage-imgs/0050.jpg
//        /canvaspage-imgs/canvaspage-imgs/0051.jpg
//        /canvaspage-imgs/canvaspage-imgs/0052.jpg
//        /canvaspage-imgs/canvaspage-imgs/0053.jpg
//        /canvaspage-imgs/canvaspage-imgs/0054.jpg
//        /canvaspage-imgs/canvaspage-imgs/0055.jpg
//        /canvaspage-imgs/canvaspage-imgs/0056.jpg
//        /canvaspage-imgs/canvaspage-imgs/0057.jpg
//        /canvaspage-imgs/canvaspage-imgs/0058.jpg
//        /canvaspage-imgs/canvaspage-imgs/0059.jpg
//        /canvaspage-imgs/canvaspage-imgs/0060.jpg
//        /canvaspage-imgs/canvaspage-imgs/0061.jpg
//        /canvaspage-imgs/canvaspage-imgs/0062.jpg
//        /canvaspage-imgs/canvaspage-imgs/0063.jpg
//        /canvaspage-imgs/canvaspage-imgs/0064.jpg
//        /canvaspage-imgs/canvaspage-imgs/0065.jpg
//        /canvaspage-imgs/canvaspage-imgs/0066.jpg
//        /canvaspage-imgs/canvaspage-imgs/0067.jpg
//        /canvaspage-imgs/canvaspage-imgs/0068.jpg
//        /canvaspage-imgs/canvaspage-imgs/0069.jpg
//        /canvaspage-imgs/canvaspage-imgs/0070.jpg
//        /canvaspage-imgs/canvaspage-imgs/0071.jpg
//        /canvaspage-imgs/canvaspage-imgs/0072.jpg
//        /canvaspage-imgs/canvaspage-imgs/0073.jpg
//        /canvaspage-imgs/canvaspage-imgs/0074.jpg
//        /canvaspage-imgs/canvaspage-imgs/0075.jpg
//        /canvaspage-imgs/canvaspage-imgs/0076.jpg
//        /canvaspage-imgs/canvaspage-imgs/0077.jpg
//        /canvaspage-imgs/canvaspage-imgs/0078.jpg
//        /canvaspage-imgs/canvaspage-imgs/0079.jpg
//        /canvaspage-imgs/canvaspage-imgs/0080.jpg
//        /canvaspage-imgs/canvaspage-imgs/0081.jpg
//        /canvaspage-imgs/canvaspage-imgs/0082.jpg
//        /canvaspage-imgs/canvaspage-imgs/0083.jpg
//        /canvaspage-imgs/canvaspage-imgs/0084.jpg
//        /canvaspage-imgs/canvaspage-imgs/0085.jpg
//        /canvaspage-imgs/canvaspage-imgs/0086.jpg
//        /canvaspage-imgs/canvaspage-imgs/0087.jpg
//        /canvaspage-imgs/canvaspage-imgs/0088.jpg
//        /canvaspage-imgs/canvaspage-imgs/0089.jpg
//        /canvaspage-imgs/canvaspage-imgs/0090.jpg
//        /canvaspage-imgs/canvaspage-imgs/0091.jpg
//        /canvaspage-imgs/canvaspage-imgs/0092.jpg
//        /canvaspage-imgs/canvaspage-imgs/0093.jpg
//        /canvaspage-imgs/canvaspage-imgs/0094.jpg
//        /canvaspage-imgs/canvaspage-imgs/0095.jpg
//        /canvaspage-imgs/canvaspage-imgs/0096.jpg
//        /canvaspage-imgs/canvaspage-imgs/0097.jpg
//        /canvaspage-imgs/canvaspage-imgs/0098.jpg
//        /canvaspage-imgs/canvaspage-imgs/0099.jpg
//        /canvaspage-imgs/canvaspage-imgs/0100.jpg
//            `;
//             return data.split("\n")[index];
//         }

//         const frameCount = 373;

//         const images = [];
//         const imageSeq = {
//             frame: 0
//         };

//         for (let i = 1; i < frameCount; i++) {
//             const img = new Image();
//             img.src = files(i);
//             images.push(img);
//         }
//         var tl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: "#page4",
//                 start: "top top",
//                 pin: true,
//                 scroller: "#main",
//                 // markers:true,
//                 scrub: 3,
//                 end: "500% 0%"
//             }
//         })
      
//             .to(imageSeq, {
//                 frame: frameCount - 1,
//                 snap: "frame",
//                 ease: "none",
//                 duration: 30,
//                 onUpdate: render
//             })


//         images[0].onload = render;

//         function render() {
//             scaleImage(images[imageSeq.frame], context)
//         }

//         function scaleImage(img, ctx) {
//             // var canvas = ctx.canvas;
//             var hRatio = canvas.width / img.width;
//             var vRatio = canvas.height / img.height;
//             var ratio = Math.max(hRatio, vRatio);
//             var centerShift_x = (canvas.width - img.width * ratio) / 2;
//             var centerShift_y = (canvas.height - img.height * ratio) / 2;
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             ctx.drawImage(img, 0, 0, img.width, img.height,
//                 centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);

//         }



//     }
    // canva()
    function canva() {
        const canvas = document.querySelector("#page4>canvas");
        const context = canvas.getContext("2d");
    
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    
        window.addEventListener("resize", function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        });
    
        function files(index) {
            return `/canvaspage-imgs/canvaspage-imgs/${String(index).padStart(4, '0')}.jpg`;
        }
    
        const frameCount = 100; // Changed to 100 to match your requirement
    
        const images = [];
        const imageSeq = {
            frame: 0
        };
    
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = files(i);
            img.onload = () => {
                console.log(`Image ${i} loaded successfully.`);
            };
            img.onerror = () => {
                console.error(`Image ${i} failed to load.`);
            };
            images.push(img);
        }
    
        // Ensure the first image is loaded before starting the animation
        images[0].onload = () => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: "#page4",
                    start: "top top",
                    pin: true,
                    scroller: "#main",
                    // markers:true,
                    scrub: 3,
                    end: "500% 0%"
                }
            }).to(imageSeq, {
                frame: frameCount - 1,
                snap: "frame",
                ease: "none",
                duration: 30,
                onUpdate: render
            });
    
            render(); // Initial render after the first image is loaded
        };
    
        function render() {
            if (images[imageSeq.frame].complete && images[imageSeq.frame].naturalWidth !== 0) {
                scaleImage(images[imageSeq.frame], context);
            } else {
                console.error(`Image ${imageSeq.frame + 1} is broken or not loaded yet.`);
            }
        }
    
        function scaleImage(img, ctx) {
            const canvas = ctx.canvas;
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        }
    }
    
    canva();
    
    
