import * as THREE from 'three'

function creatSkyBox(scene) {
    const urls = [
        './smartStore/images/skybox/远山_RT.jpg', // right
        './smartStore/images/skybox/远山_LF.jpg', // left
        './smartStore/images/skybox/远山_UP.jpg', // top
        './smartStore/images/skybox/远山_DN.jpg', // bottom
        './smartStore/images/skybox/远山_BK.jpg', // back
        './smartStore/images/skybox/远山_FR.jpg'  // front
    ]
    const skyboxCubeMap = new THREE.CubeTextureLoader().load(urls)
    scene.background = skyboxCubeMap
}

export default creatSkyBox
