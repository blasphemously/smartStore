import * as THREE from 'three'

const ThreeBSP = require('three-js-csg')(THREE)  //旧版threebsp,用于几何体组合形成新的几何体,这里用于给门挖洞
function withDoorWall(wall_width, wall_height, wall_depth, door_width, door_height, door_depth, door_x, door_y, door_z, wall_x, wall_y, wall_z, scene, angle, material) {
    const dwmaterial = new THREE.MeshPhongMaterial({
        color: 0x9cb2d1,
        specular: 0x9cb2d1,
        shininess: 30,
        transparent: true,
        opacity: 1
    })
    const wallGeometry = new THREE.BoxGeometry(wall_width, wall_height, wall_depth)
    const wall = new THREE.Mesh(wallGeometry, material)
    wall.position.x = wall_x
    wall.position.y = wall_y
    wall.position.z = wall_z
    const doorGeometry = new THREE.BoxGeometry(door_width, door_height, door_depth)
    const door = new THREE.Mesh(doorGeometry, material)
    door.position.x = door_x
    door.position.y = door_y
    door.position.z = door_z
    const wallBSP = new ThreeBSP(wall) //将几何体转化为threebsp对象
    const doorBSP = new ThreeBSP(door)
    const withDoorWallBPS = wallBSP.subtract(doorBSP) //将两个几何体进行差值运算,将重合部分去除
    const withDoorWall = withDoorWallBPS.toMesh(dwmaterial)
    withDoorWall.material.flatshading = THREE.FlatShading;
    withDoorWall.geometry.computeFaceNormals(); //重新计算几何体侧面法向量
    withDoorWall.geometry.computeVertexNormals();
    withDoorWall.material.needsUpdate = true; //更新纹理
    withDoorWall.geometry.buffersNeedUpdate = true;
    withDoorWall.geometry.uvsNeedUpdate = true;
    withDoorWall.rotation.y += angle * Math.PI; //-逆时针旋转,+顺时针
    scene.add(withDoorWall)
}

export default withDoorWall
