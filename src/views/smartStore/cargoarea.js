import * as THREE from 'three'
import creatCargo from "@/views/smartStore/chargo";
function cargoArea(storeId, scene) {
//未有数据无法运行
    for (let i = 0; i < storeId.length; i++) {  //后台传过来的仓库的数据是个数组,所以要循环出来
        const cargoAreaNum = storeId[i]
        const area_x = cargoAreaNum.position.x || 400 //库区定位x

        // const area_y = cargoAreaNum.position.y //库区定位y
        const area_z = cargoAreaNum.position.z || 200 //库区定位z

        // const shelfRow = cargoAreaNum.row || 3 //库区货位行数
        // const shelfColumn = cargoAreaNum.column || 3//库区货位列数
        const area_width = cargoAreaNum.width || 1000
        const area_depth = cargoAreaNum.length || 200

        // const shelfSize = 3  //货位大小,货架大小
        // const interval = 1  //货位距离
        const lineWidth = 5 // 黄线宽
        // const shelfInterval = shelfSize + interval  // 货位加距离
        // const aisleWidth = shelfInterval * shelfRow
        // const aisleLength = shelfInterval * shelfColumn
        const Texturing = require('../../../public/static/images/line.png') //请求图片url路径,在vue中textureloader只能先进行require请求在放到textuteloader

        const lineMat = new THREE.TextureLoader().load(Texturing, function (map) {
            lineMat.map = map
            lineMat.needsUpdate = true
        })

        const cargoArea = new THREE.PlaneGeometry(lineWidth, area_depth) // 创建平面图形
        const floorMaterial = new THREE.MeshBasicMaterial({
            map: lineMat,
        })
        const obj = new THREE.Mesh(cargoArea, floorMaterial) //组合
        obj.position.set(area_x + lineWidth / 2, 1.5, -(area_z + area_depth / 2)) //动态定位,数据从后端获取
        obj.rotation.x = -Math.PI / 2.0  //翻转
        const obj2 = obj.clone()
        obj2.translateX(area_width)

        const geometry2 = new THREE.PlaneGeometry(lineWidth, area_width)
        const obj3 = new THREE.Mesh(geometry2, floorMaterial)
        obj3.position.set(area_x + area_width / 2, 1.5, -(area_z + lineWidth / 2))
        obj3.rotation.x = -Math.PI / 2.0
        obj3.rotation.z = -Math.PI / 2.0
        const obj4 = obj3.clone()
        obj4.translateX(lineWidth - area_depth)

        const group = new THREE.Group() //将四条直线组合成一个对象
        group.add(obj)
        group.add(obj2)
        group.add(obj3)
        group.add(obj4)
        scene.add(group)

        const textLoader = new THREE.FontLoader() //库位上的文字,用于显示库位编号
        const cargoAreaName = "第九十八号库位 "
        const url = ('/font/STKaiti_Regular.json')  //3d文字需要请求json文字文件
        textLoader.load(url, font => {
            const storeText = new THREE.TextGeometry(cargoAreaName,
                {
                    size: 18,
                    font: font,
                    curveSegments: 8,
                    height: 0.1

                })
            console.log('的辅导辅导费')
            const color = new THREE.MeshPhongMaterial({color: '#F92727'});
            const cargoNum = new THREE.Mesh(storeText, color)
            cargoNum.rotation.x = -Math.PI / 2.0
            cargoNum.rotation.z = -Math.PI / 2.0
            cargoNum.position.set(area_x + lineWidth / 2, 1.5, -(area_z + area_depth / 2))
            scene.add(cargoNum)

        })
        creatCargo(scene,area_x,area_z)
    }
}

export default cargoArea
