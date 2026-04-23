// 3D演示初始化
console.log('开始初始化3D场景...');

// 全局变量
let scene, camera, renderer, controls, devices = {};
let isAnimating = false;

// 等待DOM完全加载后再执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initDemo, 100); // 延迟100ms确保CSS样式应用完成
  });
} else {
  setTimeout(initDemo, 100);
}

function initDemo() {
  console.log('DOM已加载，开始初始化...');
  
  // 检查Three.js是否已加载
  if (typeof THREE === 'undefined') {
    console.error('Three.js未加载');
    showError('Three.js库加载失败');
    return;
  }
  
  // 检查OrbitControls是否已加载
  if (typeof THREE.OrbitControls === 'undefined') {
    console.error('OrbitControls未加载');
    showError('OrbitControls加载失败');
    return;
  }
  
  console.log('Three.js和OrbitControls已就绪，开始创建3D场景');
  
  try {
    // 等待容器准备好
    waitForContainer(() => {
      createScene();
    });
  } catch (error) {
    console.error('3D场景创建失败:', error);
    showError('3D场景创建失败: ' + error.message);
  }
}

function waitForContainer(callback) {
  const canvas = document.querySelector('#c');
  if (!canvas) {
    console.error('找不到canvas元素');
    showError('Canvas元素未找到');
    return;
  }
  
  const container = canvas.parentElement;
  if (!container) {
    console.error('找不到canvas容器');
    showError('Canvas容器未找到');
    return;
  }
  
  // 检查容器是否有尺寸
  const checkSize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    console.log('检查容器尺寸:', width, 'x', height);
    
    if (width > 0 && height > 0) {
      console.log('容器尺寸正常，开始创建场景');
      callback();
    } else {
      console.log('容器尺寸为0，100ms后重试...');
      setTimeout(checkSize, 100);
    }
  };
  
  checkSize();
}

function createScene() {
  console.log('正在初始化3D场景...');

  // 检查canvas元素
  const canvas = document.querySelector('#c');
  if (!canvas) {
    console.error('找不到canvas元素');
    showError('Canvas元素未找到');
    return;
  }

  // 初始化场景、相机、渲染器
  initSceneComponents(canvas);
  
  // 创建光源和辅助元素
  createLighting();
  
  // 创建房间环境
  createRoom();
  
  // 添加设备
  createDevices();
  
  // 设置设备交互
  setupDeviceInteraction();
  
  // 启动渲染循环
  startAnimation();
}

function initSceneComponents(canvas) {
  // 创建场景
  scene = new THREE.Scene(); 
  
  // 获取canvas容器尺寸
  const container = canvas.parentElement;
  let width = container.clientWidth;
  let height = container.clientHeight;
  
  // 如果容器尺寸为0，使用默认值
  if (width === 0 || height === 0) {
    width = 800;
    height = 600;
    console.warn('容器尺寸为0，使用默认尺寸:', width, 'x', height);
  }
  
  console.log('Canvas容器尺寸:', width, 'x', height);
  
  // 创建相机
  camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
  camera.position.set(6, 4, 8);
  
  // 创建渲染器 - 启用透明背景
  renderer = new THREE.WebGLRenderer({ 
    canvas, 
    antialias: true,
    alpha: true  // 启用透明背景
  });
  renderer.setSize(width, height);
  // 设置透明背景
  renderer.setClearColor(0x000000, 0); 
  // 高质量渲染设置
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;     // 软阴影
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.physicallyCorrectLights = true;              // 物理正确的光照
  
  // 设置canvas样式确保显示，但保持透明
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  
  // 创建轨道控制器
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI * 0.8; // 限制垂直旋转
  controls.minDistance = 3;
  controls.maxDistance = 15;
  
  // 窗口大小调整事件 - 添加防抖优化
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(onWindowResize, 100); // 100ms防抖
  });
  
  console.log('渲染器和控制器初始化完成，canvas尺寸:', canvas.width, 'x', canvas.height);
}

function createLighting() {
  // 环境光 - 温暖金色调
  const ambientLight = new THREE.AmbientLight(0xffe4b5, 1.2);
  scene.add(ambientLight);
  
  // 创建简单的环境反射
  createEnvironmentReflection();
  
  // 主光源 - 温暖金色阳光
  const mainLight = new THREE.DirectionalLight(0xffd700, 1.8);
  mainLight.position.set(5, 8, 3);
  mainLight.castShadow = true;
  // 提升阴影质量
  mainLight.shadow.mapSize.width = 4096;   // 增加到4K分辨率
  mainLight.shadow.mapSize.height = 4096;
  mainLight.shadow.camera.near = 0.5;
  mainLight.shadow.camera.far = 50;
  mainLight.shadow.camera.left = -15;     // 扩大阴影范围
  mainLight.shadow.camera.right = 15;
  mainLight.shadow.camera.top = 15;
  mainLight.shadow.camera.bottom = -15;
  mainLight.shadow.bias = -0.0002;        // 优化阴影偏移
  mainLight.shadow.radius = 4;            // 软阴影
  scene.add(mainLight);
  
  // 辅助光源 - 温暖点光源
  const sideLight = new THREE.PointLight(0xffe4b5, 1.2, 15);
  sideLight.position.set(-3, 3, 2);
  sideLight.castShadow = true;
  // 提升点光源阴影质量
  sideLight.shadow.mapSize.width = 2048;   // 增加分辨率
  sideLight.shadow.mapSize.height = 2048;
  sideLight.shadow.bias = -0.0001;
  sideLight.shadow.radius = 3;             // 软阴影
  scene.add(sideLight);
  
  // 网格辅助线 - 温暖金色
  const grid = new THREE.GridHelper(12, 24, 0xDAA520, 0xF5DEB3);
  grid.material.opacity = 0.3;
  grid.material.transparent = true;
  scene.add(grid);
}

// 创建环境反射
function createEnvironmentReflection() {
  // 创建简单的环境贴图以增强金属反射效果
  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
    format: THREE.RGBFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter
  });
  
  // 设置温暖的环境光源
  const environmentLight = new THREE.HemisphereLight(0xffe4b5, 0xD2691E, 0.6);
  scene.add(environmentLight);
  
  // 存储环境贴图引用（如果需要在其他地方使用）
  scene.userData.envMap = cubeRenderTarget.texture;
}

// 创建房间环境
function createRoom() {
  console.log('正在创建房间环境...');
  
  const roomGroup = new THREE.Group();

  // 地板 - 温暖木地板
  const floorGeometry = new THREE.PlaneGeometry(12, 12);
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xDEB887,     // 温暖的浅木色
    roughness: 0.7,      // 木地板粗糙度
    metalness: 0.1,      // 微弱金属感
    transparent: true,
    opacity: 0.9
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  roomGroup.add(floor);

  // 墙面 - 温暖奶油色
  const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xfff8e1,     // 奶油色墙面
    roughness: 0.8,      // 墙面粗糙
    metalness: 0.0       // 非金属
  });
  const backWall = createWall(12, 4, wallMaterial);
  backWall.position.set(0, 2, -6);
  roomGroup.add(backWall);

  const leftWall = createWall(12, 4, wallMaterial);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-6, 2, 0);
  roomGroup.add(leftWall);

  // 装饰
  createRoomDecorations(roomGroup);

  scene.add(roomGroup);
}

function createWall(width, height, material) {
  const geometry = new THREE.PlaneGeometry(width, height);
  const wall = new THREE.Mesh(geometry, material);
  wall.receiveShadow = true;
  return wall;
}

function createRoomDecorations(roomGroup) {
  // 添加一个现代茶几 - 温暖金色材质
  const tableGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.1);
  const tableMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xd4af37,     // 温暖金色
    roughness: 0.3,      // 金属表面光滑
    metalness: 0.8       // 高金属感
  });
  const table = new THREE.Mesh(tableGeometry, tableMaterial);
  table.position.set(0, 0.45, -2);  // 调整到桌腿上方
  table.castShadow = true;
  table.receiveShadow = true;
  roomGroup.add(table);
  
  // 茶几腿 - 温暖金色材质
  for (let i = 0; i < 4; i++) {
    const legGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.4);
    const legMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xd4af37,   // 温暖金色腿
      roughness: 0.4,    // 稍微粗糙的金属
      metalness: 0.7     // 金属腿
    });
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    const angle = (i * Math.PI) / 2;
    leg.position.set(Math.cos(angle) * 0.6, 0.2, Math.sin(angle) * 0.6 - 2);  // 从地面向上
    leg.castShadow = true;
    roomGroup.add(leg);
  }
}

function createDevices() {
  console.log('正在创建设备...');
  
  // 清空设备对象
  devices = {};
  
  // 添加精美的设备模型
  addSmartLamp();
  addCeilingFan();
  addAirConditioner();
  addSmartSpeaker();
  addPlant(); // 装饰用植物
  
  console.log(`设备创建完成，总计: ${Object.keys(devices).length}个`);
}

function addSmartLamp() {
  const lampGroup = new THREE.Group();
  
  // 灯座 - 温暖金色材质
  const baseGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.1);
  const baseMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xe4e1c4,     // 暖金色台灯底座
    roughness: 0.3,      // 光滑金属底座
    metalness: 0.8       // 高金属感
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = 0.05;
  base.castShadow = true;
  lampGroup.add(base);
  
  // 灯杆 - 温暖金属材质
  const poleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.8);
  const poleMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xe4e1c4,     // 暖金色灯杆
    roughness: 0.2,      // 抛光金属杆
    metalness: 0.9       // 很高的金属感
  });
  const pole = new THREE.Mesh(poleGeometry, poleMaterial);
  pole.position.y = 0.5;
  pole.castShadow = true;
  lampGroup.add(pole);
  
  // 灯罩 - 磨砂金属材质
  const shadeGeometry = new THREE.ConeGeometry(0.3, 0.4, 8);
  const shadeMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x9e9e9e,
    roughness: 0.6,      // 磨砂表面
    metalness: 0.4,      // 中等金属感
    transparent: true,
    opacity: 0.9
  });
  const shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
  shade.position.y = 1.1;
  shade.castShadow = true;
  lampGroup.add(shade);
  
  // 发光球体（灯泡效果）- 暖白光
  const bulbGeometry = new THREE.SphereGeometry(0.08);
  const bulbMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xfff8e1,     // 暖白光
    transparent: true,
    opacity: 0.8
  });
  const bulb = new THREE.Mesh(bulbGeometry, bulbMaterial);
  bulb.position.y = 0.95;
  lampGroup.add(bulb);
  
  lampGroup.position.set(2.5, 0, -2);
  lampGroup.userData = { 
    id: 'smart_lamp', 
    state: 'off', 
    displayName: '智能台灯',
    originalColor: 0x9e9e9e,
    bulb: bulb
  };
  lampGroup.castShadow = true;
  
  devices['smart_lamp'] = lampGroup;
  scene.add(lampGroup);
}

function addCeilingFan() {
  const fanGroup = new THREE.Group();
  
  // 吊扇电机 - 深金色金属材质
  const motorGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2);
  const motorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xb8860b,     // 深金色电机
    roughness: 0.4,      // 工业金属表面
    metalness: 0.8       // 高金属感
  });
  const motor = new THREE.Mesh(motorGeometry, motorMaterial);
  motor.castShadow = true;
  fanGroup.add(motor);
  
  // 风扇叶片 - 温暖木质材质
  const bladeGroup = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const bladeGeometry = new THREE.BoxGeometry(1.2, 0.02, 0.15);
    const bladeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xD2691E,   // 温暖的木色
      roughness: 0.7,    // 木质粗糙
      metalness: 0.1     // 木材光泽
    });
    const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
    blade.position.x = 0.6;
    blade.castShadow = true;
    
    const bladeContainer = new THREE.Group();
    bladeContainer.add(blade);
    bladeContainer.rotation.y = (i * Math.PI) / 2;
    bladeGroup.add(bladeContainer);
  }
  bladeGroup.position.y = -0.15;
  fanGroup.add(bladeGroup);
  
  fanGroup.position.set(-1, 3.5, 1);
  fanGroup.userData = { 
    id: 'ceiling_fan', 
    state: 'off', 
    displayName: '吊扇',
    originalColor: 0xb8860b,
    blades: bladeGroup
  };
  
  devices['ceiling_fan'] = fanGroup;
  scene.add(fanGroup);
}

function addAirConditioner() {
  const acGroup = new THREE.Group();
  
  // 空调主体 - 温暖塑料材质
  const bodyGeometry = new THREE.BoxGeometry(1.2, 0.6, 0.3);
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xF5F5DC,     // 暖米色塑料
    roughness: 0.8,      // 塑料表面
    metalness: 0.0       // 非金属
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.castShadow = true;
  acGroup.add(body);
  
  // 空调面板 - 温暖光滑材质
  const panelGeometry = new THREE.BoxGeometry(1.0, 0.4, 0.02);
  const panelMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xD3D3D3,     // 温暖的浅灰色面板
    roughness: 0.1,      // 光滑面板
    metalness: 0.2       // 轻微金属感
  });
  const panel = new THREE.Mesh(panelGeometry, panelMaterial);
  panel.position.z = 0.16;
  acGroup.add(panel);
  
  // 状态指示灯 - 蓝色（关闭时）
  const ledGeometry = new THREE.SphereGeometry(0.03);
  const ledMaterial = new THREE.MeshBasicMaterial({ color: 0x64B5F6 });
  const led = new THREE.Mesh(ledGeometry, ledMaterial);
  led.position.set(0.4, 0.15, 0.17);
  acGroup.add(led);
  
  acGroup.position.set(3, 2.5, -5.8);
  acGroup.userData = { 
    id: 'air_conditioner', 
    state: 'off', 
    displayName: '空调',
    originalColor: 0x9e9e9e,
    led: led
  };
  
  devices['air_conditioner'] = acGroup;
  scene.add(acGroup);
}

function addSmartSpeaker() {
  const speakerGroup = new THREE.Group();
  
  // 音响主体 - 温暖塑料材质
  const bodyGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.4);
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x8B7355,     // 温暖的棕灰色
    roughness: 0.6,      // 塑料质感
    metalness: 0.0       // 非金属
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0.2;
  body.castShadow = true;
  speakerGroup.add(body);
  
  // 扬声器网格 - 明亮织物材质
  const meshGeometry = new THREE.CylinderGeometry(0.18, 0.22, 0.35);
  const meshMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x808080,     // 明亮织物色
    roughness: 0.9,      // 织物粗糙表面
    metalness: 0.0,      // 非金属
    transparent: true,
    opacity: 0.8
  });
  const mesh = new THREE.Mesh(meshGeometry, meshMaterial);
  mesh.position.y = 0.2;
  speakerGroup.add(mesh);
  
  // 状态环形灯 - 温暖金色
  const ringGeometry = new THREE.TorusGeometry(0.22, 0.01, 8, 16);
  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xDAA520 });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.position.y = 0.38;
  ring.material.transparent = true;
  ring.material.opacity = 0;
  speakerGroup.add(ring);
  
  speakerGroup.position.set(-2.5, 0.05, 1.5);
  speakerGroup.userData = { 
    id: 'smart_speaker', 
    state: 'off', 
    displayName: '智能音箱',
    originalColor: 0x2c2c2c,
    ring: ring
  };
  
  devices['smart_speaker'] = speakerGroup;
  scene.add(speakerGroup);
}

function addPlant() {
  const plantGroup = new THREE.Group();
  
  // 花盆 - 高端银灰金属材质
  const potGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.25);
  const potMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xC0C0C0,     // 银灰色金属花盆
    roughness: 0.4,      // 光滑表面
    metalness: 0.8       // 高金属质感
  });
  const pot = new THREE.Mesh(potGeometry, potMaterial);
  pot.position.y = 0.125;
  pot.castShadow = true;
  plantGroup.add(pot);
  
  // 植物叶子 - 自然植物材质
  for (let i = 0; i < 8; i++) {
    const leafGeometry = new THREE.ConeGeometry(0.05, 0.4, 4);
    const leafMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x228B22,
      roughness: 0.8,    // 叶子表面粗糙
      metalness: 0.0     // 非金属
    });
    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    leaf.position.y = 0.45;
    leaf.rotation.z = Math.random() * 0.3 - 0.15;
    
    const leafContainer = new THREE.Group();
    leafContainer.add(leaf);
    leafContainer.rotation.y = (i * Math.PI) / 4;
    plantGroup.add(leafContainer);
  }
  
  plantGroup.position.set(1.8, 0, 1.8);
  scene.add(plantGroup);
}

function setupDeviceInteraction() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  window.addEventListener('click', (event) => {
    // 计算鼠标位置
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // 射线检测
    raycaster.setFromCamera(mouse, camera);
    const deviceArray = Object.values(devices);
    const intersects = raycaster.intersectObjects(deviceArray, true);
    
    if (intersects.length > 0) {
      // 找到被点击的设备组
      let clickedDevice = intersects[0].object;
      while (clickedDevice.parent && !clickedDevice.userData.id) {
        clickedDevice = clickedDevice.parent;
      }
      if (clickedDevice.userData.id) {
        toggleDevice(clickedDevice);
      }
    }
  });
}

function toggleDevice(deviceGroup) {
  const userData = deviceGroup.userData;
  const wasOn = userData.state === 'on';
  
  // 切换状态
  userData.state = wasOn ? 'off' : 'on';
  
  // 根据设备类型添加特殊效果
  applyDeviceEffects(deviceGroup, userData.state);
  
  // 显示设备信息
  displayDeviceInfo(userData);
  
  console.log(`设备控制: ${userData.displayName} -> ${userData.state}`);
}

function applyDeviceEffects(deviceGroup, state) {
  const userData = deviceGroup.userData;
  
  switch (userData.id) {
    case 'smart_lamp':
      if (userData.bulb) {
        userData.bulb.material.opacity = state === 'on' ? 1.0 : 0.3;
        userData.bulb.material.emissive.setHex(state === 'on' ? 0xfff8e1 : 0x000000);
      }
      break;
      
    case 'ceiling_fan':
      if (userData.blades && state === 'on') {
        // 启动风扇旋转动画
        animateFan(userData.blades);
      }
      break;
      
    case 'air_conditioner':
      if (userData.led) {
        userData.led.material.color.setHex(state === 'on' ? 0xDAA520 : 0x64B5F6);
      }
      break;
      
    case 'smart_speaker':
      if (userData.ring) {
        userData.ring.material.opacity = state === 'on' ? 0.8 : 0;
        if (state === 'on') {
          animateSpeakerRing(userData.ring);
        }
      }
      break;
  }
}

function animateFan(bladeGroup) {
  let rotation = 0;
  function rotateFan() {
    if (devices['ceiling_fan'].userData.state === 'on') {
      rotation += 0.2;
      bladeGroup.rotation.y = rotation;
      requestAnimationFrame(rotateFan);
    }
  }
  rotateFan();
}

function animateSpeakerRing(ring) {
  let scale = 1;
  let growing = true;
  
  function pulseRing() {
    if (devices['smart_speaker'].userData.state === 'on') {
      if (growing) {
        scale += 0.02;
        if (scale > 1.3) growing = false;
      } else {
        scale -= 0.02;
        if (scale < 1) growing = true;
      }
      ring.scale.setScalar(scale);
      requestAnimationFrame(pulseRing);
    } else {
      ring.scale.setScalar(1);
    }
  }
  pulseRing();
}

function displayDeviceInfo(userData) {
  const infoDiv = document.querySelector('#info');
  if (!infoDiv) return;
  
  const statusText = userData.state === 'on' ? '已开启' : '已关闭';
  const statusColor = userData.state === 'on' ? '#DAA520' : '#D2691E';
  
  infoDiv.innerHTML = `
    <div>设备：${userData.displayName}</div>
    <div style="color: ${statusColor}">状态：${statusText}</div>
  `;
  infoDiv.style.display = 'block';
  
  // 3秒后自动隐藏
  setTimeout(() => {
    infoDiv.style.display = 'none';
  }, 3000);
}

function startAnimation() {
  if (isAnimating) return;
  
  isAnimating = true;
  let frameCount = 0;
  let firstFrame = true;
  
  function animate() {
    if (!isAnimating) return;
    
    try {
      requestAnimationFrame(animate);
      
      // 更新控制器（阻尼效果）
      controls.update();
      
      // 渲染场景
      renderer.render(scene, camera);
      frameCount++;
      
      // 首帧渲染完成
      if (firstFrame) {
        firstFrame = false;
        console.log('首帧渲染完成，场景对象数量:', scene.children.length);
        console.log('相机位置:', camera.position);
        console.log('渲染器尺寸:', renderer.getSize(new THREE.Vector2()));
        setTimeout(() => {
          if (window.hideLoading) {
            window.hideLoading();
            console.log('加载界面已隐藏，3D场景就绪');
          }
        }, 500);
      }
      
      // 性能监控（每60帧输出一次）
      if (frameCount % 60 === 0) {
        console.log(`渲染帧数: ${frameCount}`);
      }
      
    } catch (error) {
      console.error('渲染循环错误:', error);
      showError('渲染失败: ' + error.message);
      isAnimating = false;
    }
  }
  
  console.log('启动渲染循环');
  animate();
}

function onWindowResize() {
  const canvas = document.querySelector('#c');
  if (!canvas) return;
  
  const container = canvas.parentElement;
  if (!container) return;
  
  let width = container.clientWidth;
  let height = container.clientHeight;
  
  // 如果容器尺寸为0，跳过调整
  if (width === 0 || height === 0) {
    console.warn('窗口调整时容器尺寸为0，跳过调整');
    return;
  }
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  
  console.log('窗口调整，新尺寸:', width, 'x', height);
}

function showError(message) {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.innerHTML = `
      <div style="color: #ff6b6b; text-align: center;">
        <h3>加载失败</h3>
        <p>${message}</p>
        <button onclick="location.reload()" style="
          background: #DAA520; 
          color: #fff; 
          border: none; 
          padding: 10px 20px; 
          border-radius: 5px; 
          cursor: pointer; 
          margin-top: 10px;
        ">重新加载</button>
      </div>
    `;
  }
}

// 页面卸载时清理资源
window.addEventListener('beforeunload', () => {
  isAnimating = false;
  if (renderer) {
    renderer.dispose();
  }
}); 