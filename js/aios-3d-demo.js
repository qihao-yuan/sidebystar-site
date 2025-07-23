import * as THREE        from 'https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js';
import {OrbitControls}   from 'https://cdn.jsdelivr.net/npm/three@0.164/examples/jsm/controls/OrbitControls.js';

/* 场景 & 相机 */
const canvas = document.querySelector('#c');
const scene  = new THREE.Scene();
const cam    = new THREE.PerspectiveCamera(60,innerWidth/innerHeight,0.1,100);
cam.position.set(4,3,6);

const renderer = new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

window.addEventListener('resize',()=>{
  cam.aspect = innerWidth/innerHeight;
  cam.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});

/* 控制器 */
new OrbitControls(cam,renderer.domElement);

/* 灯光 */
scene.add(new THREE.AmbientLight(0xffffff,0.5));
const spot = new THREE.PointLight(0x30f6cf,1); spot.position.set(2,3,2);
scene.add(spot);

/* 地网辅助 */
const grid = new THREE.GridHelper(10,10,0x30f6cf,0x555555);
scene.add(grid);

/* 创建简单房间环境 */
const roomGroup = new THREE.Group();
// 地板
const floorGeo = new THREE.PlaneGeometry(8,8);
const floorMat = new THREE.MeshStandardMaterial({color:0x333333});
const floor = new THREE.Mesh(floorGeo,floorMat);
floor.rotation.x = -Math.PI/2;
roomGroup.add(floor);

// 墙壁
const wallGeo = new THREE.PlaneGeometry(8,3);
const wallMat = new THREE.MeshStandardMaterial({color:0x444444});
const wall1 = new THREE.Mesh(wallGeo,wallMat);
wall1.position.set(0,1.5,-4);
const wall2 = new THREE.Mesh(wallGeo,wallMat);
wall2.position.set(-4,1.5,0);
wall2.rotation.y = Math.PI/2;
roomGroup.add(wall1,wall2);

scene.add(roomGroup);

/* 示例设备（用立方体占位） */
const devices = [];
function addDevice(name,pos,color=0x2194ce){
  const geo = new THREE.BoxGeometry(0.3,0.3,0.3);
  const mat = new THREE.MeshStandardMaterial({color});
  const box = new THREE.Mesh(geo,mat);
  box.position.copy(pos);
  box.userData = {id:name,state:'off'};
  scene.add(box); devices.push(box);
}
addDevice('lamp_bed', new THREE.Vector3( 1,1.2,-1));
addDevice('fan_ceiling',new THREE.Vector3(-1,2.2, 0));
addDevice('ac_corner',  new THREE.Vector3( 2,1.8, 2));

/* 射线拾取 */
const ray = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('click',e=>{
  mouse.x = (e.clientX/innerWidth)*2-1;
  mouse.y =-(e.clientY/innerHeight)*2+1;
  ray.setFromCamera(mouse,cam);
  const hits = ray.intersectObjects(devices);
  if(hits.length){
    const obj = hits[0].object;
    toggleDevice(obj);
  }
});

/* 状态切换 & 事件总线（WS Stub） */
function toggleDevice(mesh){
  const ud = mesh.userData;
  ud.state = ud.state==='off'?'on':'off';
  mesh.material.color.set(ud.state==='on'?0x30f6cf:0x2194ce);
  
  // 显示设备信息
  const div = document.querySelector('#info');
  const deviceNames = {
    'lamp_bed': '床头灯',
    'fan_ceiling': '吊扇', 
    'ac_corner': '空调'
  };
  const statusText = ud.state === 'on' ? '已开启' : '已关闭';
  div.innerHTML = `
    <div>设备：${deviceNames[ud.id] || ud.id}</div>
    <div>状态：${statusText}</div>
  `;
  div.style.display = 'block';
  
  // 3秒后自动隐藏
  setTimeout(() => {
    div.style.display = 'none';
  }, 3000);
  
  console.log(`设备控制: ${ud.id} -> ${ud.state}`);
  // TODO: websocket.send(JSON.stringify({device: ud.id, state: ud.state}))
}

// 添加调试信息
console.log('AIOS 3D Demo 正在初始化...');
console.log('设备数量:', devices.length);

let firstFrame = true;

function animate(t){
  requestAnimationFrame(animate);
  renderer.render(scene,cam);
  
  // 第一帧渲染完成后隐藏加载提示
  if (firstFrame) {
    firstFrame = false;
    setTimeout(() => {
      if (window.hideLoading) {
        window.hideLoading();
      }
      console.log('首帧渲染完成，3D场景已就绪');
    }, 100);
  }
}

// 确保DOM加载完成后再启动
if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM加载完成，开始渲染...');
    startDemo();
  });
} else {
  console.log('开始渲染...');
  startDemo();
}

function startDemo() {
  animate();
} 