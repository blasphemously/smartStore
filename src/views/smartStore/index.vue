<template>
<div id="container"></div>
</template>

<script>
import * as THREE from 'three'
const OrbitControls = require('three-orbit-controls')(THREE);
export default {
  name: "index",
  data() {
    return {
      mesh: null,
      camera: null,
      scene: null,
      renderer: null,
      orbitControls: null,
      ambientLight: null,
      spotLight: null,
      circle: null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.creatScene()
      this.creatCircle()
      this.creatFloor()
      this.createLight()
      this.creatCamera()
      this.creatRenderer()
      this.createControls()
      this.render()

    },
    creatScene() {
      this.scene = new THREE.Scene()
    },
    creatCamera() {
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
      this.camera.position.set(0, 1600, 1000)
      this.scene.add(this.camera)
    },
    creatFloor() {
      const floorGeometry = new THREE.BoxGeometry(2600, 1400, 1)
      const floorMaterial = new THREE.MeshBasicMaterial({color: '#84A1B2'})
      const floor = new THREE.Mesh(floorGeometry, floorMaterial)
      floor.rotation.x = -Math.PI / 2
      floor.name = "地面"
      this.scene.add(floor)
    },
    creatCircle() {
      this.circle = new THREE.BoxGeometry(50, 50, 50)
      const material = new THREE.MeshBasicMaterial({color: "#ff8a1b"})
      this.mesh = new THREE.Mesh(this.circle, material)
      this.scene.add(this.mesh)
    },
    createLight() {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3) //模拟远处类似太阳的光源
      directionalLight.color.setHSL(0.1, 1, 0.95)
      directionalLight.position.set(0, 200, 0).normalize()
      this.scene.add(directionalLight)

      const ambient = new THREE.AmbientLight(0xffffff, 1) //AmbientLight,影响整个场景的光源
      ambient.position.set(0, 0, 0)
      this.scene.add(ambient)
    },
    creatRenderer() {
      const element = document.getElementById('container')
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,//是否开启反锯齿，设置为true开启反锯齿。
        alpha: true,//是否可以设置背景色透明。
        // logarithmicDepthBuffer: true//模型的重叠部位便不停的闪烁起来。这便是Z-Fighting问题，为解决这个问题，我们可以采用该种方法
      })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setClearColor('#39609B', 1.0)
      this.renderer.setPixelRatio(window.devicePixelRatio)// 设置分辨率与电脑的分辨率相同
      element.appendChild(this.renderer.domElement)
    },
    render() {
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.render)
    },
    createControls() {
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    }
  }
}
</script>

<style scoped>

</style>
