import * as THREE from "three"

// const ThreeBSP = require('tthreebsp')(THREE)
import ThreeBSP from 'threebsp'
function withDoorWall(wall_width, wall_height, wall_depth, door_width, door_height, door_depth, door_x, material, withDoorWall_x, withDoorWall_y, withDoorWall_z, scene) {
    const wireFrameMat = new THREE.MeshBasicMaterial({
        opacity: 0.5,
        wireframeLinewidth: 0.5
    });
    const wallGeometry = new THREE.BoxGeometry(wall_width, wall_height, wall_depth)
    const wall = new THREE.Mesh(wallGeometry,wireFrameMat)
    const doorGeometry = new THREE.BoxGeometry(door_width, door_height, door_depth)
    const door = new THREE.Mesh(doorGeometry,wireFrameMat)
    door.position.x = door_x
    const wallBSP = new ThreeBSP(wall)
    const doorBSP = new ThreeBSP(door)
    const withDoorWallBPS = wallBSP.subtract(doorBSP)
    const withDoorWall = withDoorWallBPS.toMesh()
    withDoorWall.geometry.computeFaceNormals()
    withDoorWall.geometry.computeVertexNormals()
    withDoorWall.material = material
    withDoorWall.position.x = withDoorWall_x
    withDoorWall.position.y = withDoorWall_y
    withDoorWall.position.z = withDoorWall_z
    scene.add(withDoorWall)
}

export default withDoorWall
