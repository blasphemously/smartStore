<template>
<div id="container"></div>
</template>

<script>
import * as THREE from 'three'
const OrbitControls = require('three-orbit-controls')(THREE)
import createWall from './wall'
export default {
  name: "index",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      orbitControls:null
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.creatScene()
      this.creatFloor()
      this.creatWall()
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
    creatWall() {
      const matArrayB = new THREE.MeshBasicMaterial({color: '#AFC0CA'})
      const wallWest = createWall(10, 200, 1400,0, matArrayB, -1295, 100, 0, "墙面")
      const wallSouth = createWall(10, 200, 1400, 1,matArrayB, 1295, 100, 0, "墙面")
      const wallEast = createWall(10, 200, 2600, 1.5,matArrayB, 0, 100, -700, "墙面")
      const wallNorth = createWall(10, 200, 2600, 1.5,matArrayB, 0, 100,700, "墙面")
      this.scene.add(wallWest)
      this.scene.add(wallSouth)
      this.scene.add(wallEast)
      this.scene.add(wallNorth)

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
