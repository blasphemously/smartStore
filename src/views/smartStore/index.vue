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
      renderer: null
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
      this.creatPoint()
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
      const Texturing = require('../../../public/smartStore/images/floor.jpg')
      const loader = new THREE.TextureLoader()
      loader.load(Texturing, (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(10, 10);
        const floorGeometry = new THREE.BoxGeometry(2600, 1400, 1)
        const floorMaterial = new THREE.MeshBasicMaterial({
          map: texture,
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial)
        floor.rotation.x = -Math.PI / 2
        floor.name = "地面";
        this.scene.add(floor);
      })
    },
    creatWall() {
      const matArrayB = new THREE.MeshLambertMaterial({color: '#AFC0CA'})
      const wallWest = createWall(10, 200, 1400, 0, matArrayB, -1295, 100, 0, "墙面")
      const wallSouth = createWall(10, 200, 1400, 1, matArrayB, 1295, 100, 0, "墙面")
      const wallEast = createWall(10, 200, 2600, 1.5, matArrayB, 0, 100, -700, "墙面")
      const wallNorth = createWall(10, 200, 2600, 1.5, matArrayB, 0, 100, 700, "墙面")
      this.scene.add(wallWest)
      this.scene.add(wallSouth)
      this.scene.add(wallEast)
      this.scene.add(wallNorth)
    },
    creatPoint() {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3) //模拟远处类似太阳的光源
      directionalLight.color.setHSL(0.1, 1, 0.95)
      directionalLight.position.set(0, 200, 0).normalize()
      this.scene.add(directionalLight)

      const ambient = new THREE.AmbientLight(0xffffff, 1) //AmbientLight,影响整个场景的光源
      ambient.position.set(0, 0, 0)
      this.scene.add(ambient)
      const pointLight = new THREE.PointLight(0xffffff)
      pointLight.position.set(400, 200, 200)
      this.scene.add(pointLight)
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
      const controls = new OrbitControls(this.camera, this.renderer.domElement)
      controls.enableDamping = true;
      controls.dampingFactor = 0.5;
      // 视角最小距离
      controls.minDistance = 100;
      // 视角最远距离
      controls.maxDistance = 5000;
      // 最大角度
      controls.maxPolarAngle = Math.PI / 2.2;
      controls.target = new THREE.Vector3(50,50,0);
    }
  }
}
</script>

<style scoped>

</style>
