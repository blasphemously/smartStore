<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from 'three'

const OrbitControls = require('three-orbit-controls')(THREE)
import createWall from './wall'
import creatFloor from "@/views/smartStore/floor";
import withDoorWall from "./door"
import cargoArea from './cargoarea'


export default {
  name: "index",
  data() {
    return {}
  },
  mounted() {  //不能在data中声明这些数据,vue的机制会一直监视这些不断变化的数据,会非常占用内存,在mounted中用this.声明一样是全局变量
    this.scene = null  // 场景
    this.renderer = null // 渲染器
    this.camera = null // 相机
    this.controls = null // 控制器
    this.init() //初始的方法都放在init
  },
  methods: {
    init() {
      this.creatScene()  //创建场景
      creatFloor(2600, 1400, 1, this.scene, '蓝白第一仓库')  //创建地板以及仓库文字
      this.creatWall() //创建带门的围墙
      this.creatPoint() //创建灯光
      cargoArea([], this.scene)  // 创建仓库中的货区
      this.creatCamera() // 创建相机
      this.creatRenderer()  // 创建渲染器
      this.createControls() // 创建控制器
      this.render() //将场景相机放到渲染

    },
    creatScene() {
      this.scene = new THREE.Scene()
    },
    creatCamera() {
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000) // 透视相机
      this.camera.position.set(1300, 2600, 2000)
      this.scene.add(this.camera)
    },
    creatWall() {
      const matArrayB = new THREE.MeshLambertMaterial({
        color: 0x9cb2d1,
        transparent: true,
        opacity: 1
      }) //使用基础网格材料没有反光,无法体现光源
      createWall(1400, 200, 10, 0.5, matArrayB, 2600, 100, -700, "墙面", this.scene) //右
      createWall(1400, 200, 10, 0.5, matArrayB, 0, 100, -700, "墙面", this.scene)  // 左
      createWall(2600, 200, 10, 0, matArrayB, 1300, 100, -1400, "墙面", this.scene) //后
      // createWall(10, 200, 2600, 1.5, matArrayB, 0, 100, 700, "墙面", this.scene)
      withDoorWall(2600, 200, 10, 300, 150, 20, 500, 75, -5, 1300, 100, -5, this.scene, 0, matArrayB)


    },
    creatPoint() {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3) //模拟远处类似太阳的光源
      directionalLight.color.setHSL(0.1, 1, 0.95)
      directionalLight.position.set(0, 200, 0).normalize()
      this.scene.add(directionalLight)

      const ambient = new THREE.AmbientLight(0xffffff, 1) //AmbientLight,影响整个场景的光源
      ambient.position.set(0, 0, 0)
      this.scene.add(ambient)
      const pointLight = new THREE.PointLight(0xffffff) //点光源, 使立方体出现棱角
      pointLight.position.set(400, 200, 200)
      this.scene.add(pointLight)
    },
    creatRenderer() {
      const element = document.getElementById('container') // 获取当前页面的div id,确保canavs渲染在这个div中
      this.renderer = new THREE.WebGLRenderer({
        antialias: true, //是否开启反锯齿，设置为true开启反锯齿。
        alpha: true, //是否可以设置背景色透明。
        logarithmicDepthBuffer: true//模型的重叠部位便不停的闪烁起来。这便是Z-Fighting问题，为解决这个问题，我们可以采用该种方法
      })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setClearColor('#39609B', 1.0)  //整个场景的颜色
      this.renderer.setPixelRatio(window.devicePixelRatio) // 设置分辨率与电脑的分辨率相同
      element.appendChild(this.renderer.domElement)
    },
    render() {
      this.renderer.render(this.scene, this.camera)
      window.requestAnimationFrame(this.render.bind(this)) // 执行一个动画.并在动画执行后重新渲染,用于控制器的渲染
    },
    createControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.5
      // 视角最小距离
      this.controls.minDistance = 1
      // 视角最远距离
      this.controls.maxDistance = 5000
      // 最大角度
      this.controls.maxPolarAngle = Math.PI / 2.2
      this.controls.target = new THREE.Vector3(1300, 50, -700) // 设置控制器的旋转原点
      this.controls.update()  //使用控制器设置旋转后更新,设置控制器后camera不能设置lookat,在这里uodate更新相机
    }
  },
  beforeDestroy() {  //在vue中结束前要销毁这些一直渲染的数据
    this.scene = null
    this.renderer = null
    this.camera = null
    this.controls = null
  }

}
</script>

<style scoped>

</style>
