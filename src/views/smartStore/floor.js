import * as THREE from 'three'
function creatFloor(floorWidth,floorHeight,floorDepth,scene) {
    const Texturing = require('../../../public/smartStore/images/floor.jpg')
    const loader = new THREE.TextureLoader()
    loader.load(Texturing, (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
        texture.repeat.set(10, 10);
        const floorGeometry = new THREE.BoxGeometry(floorWidth,floorHeight,floorDepth)
        const floorMaterial = new THREE.MeshBasicMaterial({
            map: texture,
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial)
        floor.rotation.x = -Math.PI / 2
        floor.name = "地面";
        scene.add(floor);
    })

}
export default creatFloor
