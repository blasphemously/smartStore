import * as THREE from 'three'

// function creatCargo(cargoMessage,scene) {
function creatCargo(scene,area_x,area_z) {
    const goods = new THREE.BoxGeometry(30, 30, 30)
    const goodsMaterial = new THREE.MeshLambertMaterial({color: "#1a9d9b"})
    const goodsMash = new THREE.Mesh(goods, goodsMaterial)
    // const cargos = cargoMessage
    // for (let i = 0; cargos.length; i++) {
    // const cargo = cargos[i]
    // const row = cargo.row || 1
    // const line = cargo.line || 1
    // const  box = goods.clone()

    const good1 = goodsMash.clone()
    good1.material=new THREE.MeshLambertMaterial( {color: "#ddffdd"}); //重新添加material,从而使每一个都有新的material,就不会导致一个改变全部改变
    good1.position.set(area_x+50+15,20+15,-(area_z+50+15))
    // good1.position.set(area_x+65+(45*row),45*(boxHeight+1),-(area_z+65+(45*line)))
    good1.name = '货物'
    scene.add(good1)


    // }
}

export default creatCargo
