import {
    PerspectiveCamera,
    Scene,
    Vector3,
    WebGLRenderer,
    Object3D,
    Clock,
    PMREMGenerator,
    LinearToneMapping,
    AmbientLight,
    AnimationMixer
} from "three"
// import * as TWEEN from '@tweenjs/tween.js'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export class TEngine {

    constructor(dom) {
        this.dom = dom
        this.renderer = new WebGLRenderer({
            antialias: true,
            alpha: true
        })
        this.renderer.setClearAlpha(0.0);
        this.clock = new Clock()
        this.renderer.shadowMap.enabled = true;
        this.renderer.toneMapping = LinearToneMapping
        this.scene = new Scene()
        // this.scene.add(this.ambientLight);
        this.scene.add(new AmbientLight(0x6866f6));//环境光
        const pmremGenerator = new PMREMGenerator(this.renderer); // 使用hdr作为背景色
        pmremGenerator.compileEquirectangularShader();
        this.pmremGenerator = pmremGenerator;
        const scene = this.scene;
        this.animationMixer = new AnimationMixer(this.scene);
        const body = new Object3D();

        body.position.set(0, 28, 0);
        this.camera = new PerspectiveCamera(60, dom.offsetWidth / dom.offsetHeight, 1, 1000)



        this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true)


        let controls;
        controls = new FirstPersonControls(this.camera, this.dom);
        controls.lookSpeed = 0.5; //鼠标移动查看的速度
        controls.movementSpeed = 1; //相机移动速度
        // controls.noFly = true;
        controls.constrainVertical = true; //约束垂直
        controls.verticalMin = Math.PI / 2;

        controls.verticalMax = Math.PI / 2 + 0.0000001;

        this.controls = controls

        this.controls.object.position.set(0, 28, 20)
        this.controls.object.lookAt(new Vector3(0, 0, 0))

        this.camera.up = new Vector3(0, 1, 0)
        const onWindowResize = () => {

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);

        }
        window.addEventListener('resize', onWindowResize);


        // this.renderer.setAnimationLoop(() => {

        //     //   this.updateUserVideoRotation()
        // })


        this.render()
        dom.appendChild(this.renderer.domElement)
    }
    render = () => {
        window.requestAnimationFrame(this.render);
        this.controls.update(this.clock.getDelta())
        this.renderer.setClearAlpha(0.0);
        this.animationMixer.update(this.clock.getDelta());
        this.renderer.render(this.scene, this.camera)
    }
    loadModel(src) {
        //载入模型
        const loader = new GLTFLoader()
        console.log(src, 'src')
        return new Promise((resolve,reject)=>{
            loader.load(src, (gltf) => {

                // this.mixer= new AnimationMixer(gltf.scene)
                // var action=this.mixer.clipAction(gltf.animations[0])
                // // action.timeScale=0.8
                // action.time=4
                gltf.scene.traverse((object) => {
                    if (object.isMesh) {
                        // 修改模型的材质
                        object.castShadow = true;
                        object.frustumCulled = false;
                        // object.receiveShadow = true;
    
                        object.material.emissive = object.material.color;
                        object.material.emissiveMap = object.material.map;
                    }
                })
                gltf.scene.receiveShadow = true
                this.model = gltf.scene
                this.scene.add(gltf.scene)
                gltf.scene.position.set(0, 18, 0)
                gltf.scene.rotateY(-0.5)
                gltf.scene.scale.set(0.7, 0.7, 0.7)
                const animationClip = gltf.animations.find(animationClip => animationClip.name === "_bee_hover");
                const action = this.animationMixer.clipAction(animationClip);
                action.setDuration(0.003)
                action.play();
                this.bee=gltf.scene;
                this.action=action;
                resolve()
            }, () => { }, (e) => { console.log("error", e);reject() })
    
        });
    }





}