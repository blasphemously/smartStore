import * as THREE from 'three'

function creatSkyBox(scene) {
    const urls = [
        './static/images/skybox/远山_RT.jpg', // right
        './static/images/skybox/远山_LF.jpg', // left
        './static/images/skybox/远山_UP.jpg', // top
        './static/images/skybox/远山_DN.jpg', // bottom
        './static/images/skybox/远山_BK.jpg', // back
        './static/images/skybox/远山_FR.jpg'  // front
    ]
    const skyboxCubeMap = new THREE.CubeTextureLoader().load(urls)
    scene.background = skyboxCubeMap
}

export default creatSkyBox
