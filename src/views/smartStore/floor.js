import * as THREE from 'three'

function creatFloor(floorWidth, floorHeight, floorDepth, scene, storeName) {
    const Texturing = require('../../../public/smartStore/images/floor.jpg')
    const loader = new THREE.TextureLoader()
    loader.load(Texturing, (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(10, 10)
        const floorGeometry = new THREE.BoxGeometry(floorWidth, floorHeight, floorDepth)
        const floorMaterial = new THREE.MeshBasicMaterial({
            map: texture,
        })
        const floor = new THREE.Mesh(floorGeometry, floorMaterial)
        floor.rotation.x = -Math.PI / 2
        floor.position.x = floorWidth/2
        floor.position.z = -floorHeight/2
        floor.name = "地面"
        scene.add(floor)
        const textLoader = new THREE.FontLoader()
        const url = ('/font/STKaiti_Regular.json')
        textLoader.load(url, font => {
            const storeText = new THREE.TextGeometry(storeName,
                {
                    size: 200,
                    height: 40,
                    font: font,
                    curveSegments: 8,
                })
            const color = new THREE.MeshPhongMaterial({color: 0x9cb2d1});
            const textNum = new THREE.Mesh(storeText, color)
            textNum.position.set(200, 1000, -floorDepth/2)
            scene.add(textNum)
        })
    })
}

export default creatFloor

