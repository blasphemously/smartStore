import * as THREE from "three"
function createWall(width, height, depth, angle, material, x, y, z, name) {
    const wallGeometry = new THREE.BoxGeometry(width, height, depth)
    const wall = new THREE.Mesh(wallGeometry, material)
    wall.position.x = x
    wall.position.y = y
    wall.position.z = z
    wall.name = name
    wall.rotation.y += angle * Math.PI; //-逆时针旋转,+顺时针 控制墙体旋转
    return wall
}

export default createWall
