import {
  AmbientLight,
  BufferGeometry,
  BoxGeometry,
  Color,
  DirectionalLight,
  GridHelper,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type TopologyNode = {
  id: string
  label?: string
  x: number
  y?: number
  z: number
  color?: string
  size?: number
}

type TopologyEdge = {
  source: string
  target: string
  color?: string
}

type TopologyOption = {
  dataset?: {
    nodes?: TopologyNode[]
    edges?: TopologyEdge[]
  }
  scene?: {
    autoRotate?: boolean
    showGrid?: boolean
    accentColor?: string
    backgroundColor?: string
  }
}

const defaultNodes: TopologyNode[] = [
  { id: 'source', label: 'Source', x: -48, z: -10, color: '#34d399' },
  { id: 'reactor', label: 'Reactor', x: 0, z: 0, color: '#38bdf8', size: 1.2 },
  { id: 'storage', label: 'Storage', x: 56, z: -12, color: '#f59e0b' },
  { id: 'analysis', label: 'Analysis', x: 10, z: 42, color: '#a78bfa' }
]

const defaultEdges: TopologyEdge[] = [
  { source: 'source', target: 'reactor', color: '#60a5fa' },
  { source: 'reactor', target: 'storage', color: '#60a5fa' },
  { source: 'reactor', target: 'analysis', color: '#22d3ee' }
]

export default class TopologyScene {
  public dom: HTMLElement
  public scene: Scene
  public camera: PerspectiveCamera
  public renderer: WebGLRenderer
  public controls: OrbitControls
  public topologyGroup: Group
  public grid: GridHelper

  constructor(dom: HTMLElement, width: number, height: number) {
    this.dom = dom
    this.scene = new Scene()
    this.scene.background = new Color('#071018')

    this.camera = new PerspectiveCamera(42, Math.max(width, 1) / Math.max(height, 1), 1, 2000)
    this.camera.position.set(0, 110, 170)

    this.renderer = new WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    this.renderer.setSize(width, height)
    this.dom.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.enablePan = false
    this.controls.minDistance = 100
    this.controls.maxDistance = 300
    this.controls.maxPolarAngle = Math.PI / 2.1
    this.controls.target.set(0, 10, 0)

    const ambientLight = new AmbientLight(0xffffff, 0.9)
    this.scene.add(ambientLight)

    const keyLight = new DirectionalLight(0xbfe9ff, 1.6)
    keyLight.position.set(40, 120, 60)
    this.scene.add(keyLight)

    const fillLight = new DirectionalLight(0x7dd3fc, 0.7)
    fillLight.position.set(-60, 90, -40)
    this.scene.add(fillLight)

    this.grid = new GridHelper(220, 12, 0x193041, 0x10202d)
    this.grid.position.y = -0.5
    this.scene.add(this.grid)

    this.topologyGroup = new Group()
    this.scene.add(this.topologyGroup)

    this.updateSize(width, height)
    this.render()
  }

  public update(option: TopologyOption) {
    const nodes = option?.dataset?.nodes?.length ? option.dataset.nodes : defaultNodes
    const edges = option?.dataset?.edges?.length ? option.dataset.edges : defaultEdges
    const sceneConfig = option?.scene || {}

    this.scene.background = new Color(sceneConfig.backgroundColor || '#071018')
    this.grid.visible = sceneConfig.showGrid !== false
    this.controls.autoRotate = !!sceneConfig.autoRotate

    this.clearTopology()

    const nodeMap = new Map<string, TopologyNode>()
    nodes.forEach((node) => {
      nodeMap.set(node.id, node)

      const nodeMesh = new Mesh(
        new SphereGeometry(6 * (node.size || 1), 24, 24),
        new MeshStandardMaterial({
          color: node.color || sceneConfig.accentColor || '#38bdf8',
          metalness: 0.25,
          roughness: 0.35
        })
      )
      nodeMesh.position.set(node.x, node.y || 8, node.z)
      this.topologyGroup.add(nodeMesh)

      const pedestal = new Mesh(
        new BoxGeometry(10, 4, 10),
        new MeshStandardMaterial({ color: '#0f2230', metalness: 0.1, roughness: 0.9 })
      )
      pedestal.position.set(node.x, 1.5, node.z)
      this.topologyGroup.add(pedestal)
    })

    edges.forEach((edge) => {
      const source = nodeMap.get(edge.source)
      const target = nodeMap.get(edge.target)
      if (!source || !target) return

      const points = [
        new Vector3(source.x, (source.y || 8), source.z),
        new Vector3(target.x, (target.y || 8), target.z)
      ]

      const lineGeometry = new BufferGeometry().setFromPoints(points)

      const line = new Line(
        lineGeometry,
        new LineBasicMaterial({ color: edge.color || sceneConfig.accentColor || '#22d3ee' })
      )
      this.topologyGroup.add(line)
    })
  }

  public updateSize(width: number, height: number) {
    this.renderer.setSize(width, height)
    this.camera.aspect = Math.max(width, 1) / Math.max(height, 1)
    this.camera.updateProjectionMatrix()
  }

  public dispose() {
    this.clearTopology()
    this.controls.dispose()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    if (this.renderer.domElement.parentNode === this.dom) {
      this.dom.removeChild(this.renderer.domElement)
    }
  }

  private clearTopology() {
    while (this.topologyGroup.children.length) {
      const child = this.topologyGroup.children[0] as Mesh | Line
      this.topologyGroup.remove(child)
      const geometry = child.geometry as any
      const material = child.material as any
      geometry?.dispose?.()
      if (Array.isArray(material)) {
        material.forEach((item) => item?.dispose?.())
      } else {
        material?.dispose?.()
      }
    }
  }

  private render = () => {
    this.renderer.render(this.scene, this.camera)
    this.controls.update()
    requestAnimationFrame(this.render)
  }
}