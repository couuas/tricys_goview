import {
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    ShaderMaterial,
    WebGLRenderer,
    Color,
    AmbientLight,
    DirectionalLight,
    Group
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Basic } from '../ThreeEarth01/code/world/Basic' // Reuse Basic setup

export default class ThreeModel {
    public basic: Basic
    public scene: Scene
    public camera: PerspectiveCamera
    public renderer: WebGLRenderer
    public controls: OrbitControls
    public dom: HTMLElement
    public modelGroup: Group
    public loader: GLTFLoader

    constructor(dom: HTMLElement, width: number, height: number) {
        this.dom = dom
        this.basic = new Basic(dom)
        this.scene = this.basic.scene
        this.renderer = this.basic.renderer
        this.controls = this.basic.controls
        this.camera = this.basic.camera

        // Add lights
        const ambientLight = new AmbientLight(0xffffff, 0.8)
        this.scene.add(ambientLight)

        const dirLight = new DirectionalLight(0xffffff, 1)
        dirLight.position.set(100, 100, 100)
        this.scene.add(dirLight)

        this.modelGroup = new Group()
        this.scene.add(this.modelGroup)

        this.loader = new GLTFLoader()

        this.updateSize(width, height)
        this.render()
    }

    public loadModel(url: string, headers?: Record<string, string>) {
        if (!url) return

        // Clear existing
        while (this.modelGroup.children.length > 0) {
            const child = this.modelGroup.children[0];
            this.modelGroup.remove(child);
            this.disposeObject(child);
        }

        if (headers) {
            this.loader.setRequestHeader(headers);
        }

        this.loader.load(
            url,
            (gltf) => {
                const model = gltf.scene || gltf.scenes[0]
                // Auto scale to fit view? For now just add
                this.modelGroup.add(model)

                // Center model
                // const box = new Box3().setFromObject(model)
                // const center = box.getCenter(new Vector3())
                // model.position.sub(center)
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded')
            },
            (error) => {
                console.error('An error happened', error)
            }
        )
    }

    public render() {
        if (!this.renderer) return;
        requestAnimationFrame(this.render.bind(this))
        this.renderer.render(this.scene, this.camera)
        this.controls && this.controls.update()
    }

    public updateSize(width: number, height: number) {
        this.renderer.setSize(width, height)
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
    }

    public dispose() {
        // Dispose scene
        this.disposeObject(this.scene);

        this.renderer.dispose()
        this.renderer.forceContextLoss()
        if (this.dom && this.renderer.domElement) {
            this.dom.removeChild(this.renderer.domElement)
        }

        if (this.controls) {
            this.controls.dispose();
        }
    }

    private disposeObject(obj: any) {
        if (!obj) return;

        if (obj.children) {
            for (const child of obj.children) {
                this.disposeObject(child);
            }
        }

        if (obj.geometry) {
            obj.geometry.dispose();
        }

        if (obj.material) {
            if (Array.isArray(obj.material)) {
                obj.material.forEach((m: any) => this.disposeMaterial(m));
            } else {
                this.disposeMaterial(obj.material);
            }
        }
    }

    private disposeMaterial(material: any) {
        material.dispose();
        // Dispose textures
        for (const key of Object.keys(material)) {
            const value = material[key];
            if (value && typeof value === 'object' && 'minFilter' in value) {
                value.dispose();
            }
        }
    }
}
