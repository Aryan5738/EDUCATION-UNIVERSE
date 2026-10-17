import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { CelestialTarget, MoonPhaseData, SimulationState, SpectralType } from '../types/cosmos';
import { calculateMoonPhase } from '../utils/celestialData';
import {
  createEarthCloudsTexture,
  createEarthNightTexture,
  createEarthTexture,
  createJupiterTexture,
  createMarsTexture,
  createMercuryTexture,
  createMoonBumpTexture,
  createMoonTexture,
  createNebulaTexture,
  createNeptuneTexture,
  createSaturnRingsTexture,
  createSaturnTexture,
  createSunTexture,
  createUranusTexture,
  createVenusTexture,
  createAccretionDiskTexture,
} from '../utils/proceduralTextures';

// Pre-allocated scratch math objects to ensure zero GC allocation in render loop
const _vec3Target = new THREE.Vector3();
const _vec3CamPos = new THREE.Vector3();
const _vec3Temp = new THREE.Vector3();
const _mat4 = new THREE.Matrix4();

export class CosmosEngine {
  private container: HTMLDivElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private clock: THREE.Clock;
  private animFrameId: number | null = null;

  // State
  private state: SimulationState;
  private onTelemetryUpdate?: (moonPhase: MoonPhaseData, simDays: number) => void;

  // Celestial groups & meshes
  private sunGroup!: THREE.Group;
  private sunCoreMesh!: THREE.Mesh;
  private sunGlowMesh!: THREE.Mesh;
  private sunCoronaMesh!: THREE.Mesh;
  private sunProminences: THREE.Mesh[] = [];
  private sunLight!: THREE.PointLight;
  private sunDirLight!: THREE.DirectionalLight;
  private sunParticles!: THREE.Points;

  // Inner planets
  private mercuryPivot!: THREE.Group;
  private mercuryMesh!: THREE.Mesh;

  private venusPivot!: THREE.Group;
  private venusMesh!: THREE.Mesh;

  // Earth system
  private earthPivot!: THREE.Group;
  private earthTiltGroup!: THREE.Group;
  private earthMesh!: THREE.Mesh;
  private earthCloudsMesh!: THREE.Mesh;
  private earthNightMesh!: THREE.Mesh;
  private earthAtmoGlowMesh!: THREE.Mesh;
  private earthAxisLine!: THREE.Line;

  // Moon system
  private moonPivot!: THREE.Group;
  private moonMesh!: THREE.Mesh;
  private moonOrbitLine!: THREE.Line;

  // Outer planets
  private marsPivot!: THREE.Group;
  private marsMesh!: THREE.Mesh;

  private jupiterPivot!: THREE.Group;
  private jupiterMesh!: THREE.Mesh;

  private saturnPivot!: THREE.Group;
  private saturnMesh!: THREE.Mesh;
  private saturnRingMesh!: THREE.Mesh;

  private uranusPivot!: THREE.Group;
  private uranusMesh!: THREE.Mesh;
  private uranusRingMesh!: THREE.Mesh;

  private neptunePivot!: THREE.Group;
  private neptuneMesh!: THREE.Mesh;

  // Deep Cosmos & Stars
  private polarisMesh!: THREE.Mesh;
  private polarisHaloMesh!: THREE.Mesh;

  private milkyWayGroup!: THREE.Group;
  private blackHoleMesh!: THREE.Mesh;
  private accretionDiskMesh!: THREE.Mesh;
  private photonRingMesh!: THREE.Mesh;

  // Cosmos background & overlays
  private starfieldMesh!: THREE.InstancedMesh;
  private nebulaeGroup!: THREE.Group;
  private constellationsGroup!: THREE.Group;
  private orbitLinesGroup!: THREE.Group;
  private eclipticGrid!: THREE.GridHelper;

  // Time tracking
  private orbitalTime = 0; // simulated elapsed days
  private currentSunTextureType: SpectralType = 'G2V';
  private flareBurstTimer = 0;

  constructor(
    container: HTMLDivElement,
    initialState: SimulationState,
    onTelemetryUpdate?: (moonPhase: MoonPhaseData, simDays: number) => void
  ) {
    this.container = container;
    this.state = { ...initialState };
    this.onTelemetryUpdate = onTelemetryUpdate;
    this.clock = new THREE.Clock();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x020409);
    this.scene.fog = new THREE.FogExp2(0x020409, 0.0004);

    // 2. Camera setup
    this.camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 4500);
    this.camera.position.set(0, 52, 95);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(this.renderer.domElement);

    // 4. Orbit Controls (Desktop mouse + Mobile touch gesture support)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 1.0;
    this.controls.maxDistance = 2500;
    this.controls.zoomSpeed = 1.2;
    this.controls.rotateSpeed = 0.9;
    this.controls.panSpeed = 0.8;
    this.controls.maxPolarAngle = Math.PI * 0.98;
    this.controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN,
    };

    // 5. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environment = envTexture;
    pmremGenerator.dispose();

    // 6. Ambient & Cosmic Fill Light
    const hemiLight = new THREE.HemisphereLight(0x384c70, 0x0f172a, 0.45);
    this.scene.add(hemiLight);

    // 7. Assemble Complete 3D Celestial Universe
    this.buildUniverseBackground();
    this.buildConstellations();
    this.buildPolaris();
    this.buildMilkyWayCenter();
    this.buildSun();
    this.buildInnerPlanets();
    this.buildEarthAndMoon();
    this.buildOuterPlanets();
    this.buildOrbitPaths();
    this.buildGrid();

    // 8. Event listeners
    window.addEventListener('resize', this.onWindowResize);

    // 9. Start render loop
    this.animate();
  }

  /**
   * Deep space starfield (3,200 multi-spectral stars) and glowing volumetric nebulae
   */
  private buildUniverseBackground() {
    const starCount = 3200;
    const starGeo = new THREE.SphereGeometry(0.38, 6, 6);
    const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    this.starfieldMesh = new THREE.InstancedMesh(starGeo, starMat, starCount);
    const starColors = [
      new THREE.Color(0xffffff), // White A-type
      new THREE.Color(0x99ccff), // Blue-white B/O-type
      new THREE.Color(0xfff5e6), // Yellow-white F-type
      new THREE.Color(0xffdf80), // Yellow G-type
      new THREE.Color(0xffa64d), // Orange K-type
      new THREE.Color(0xff6666), // Red M-type dwarf
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = THREE.MathUtils.randFloat(400, 950);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const scale = THREE.MathUtils.randFloat(0.5, 2.4);
      _mat4.makeScale(scale, scale, scale);
      _mat4.setPosition(x, y, z);
      this.starfieldMesh.setMatrixAt(i, _mat4);

      const colorPick = starColors[Math.floor(Math.random() * starColors.length)];
      this.starfieldMesh.setColorAt(i, colorPick);
    }

    this.starfieldMesh.instanceMatrix.needsUpdate = true;
    if (this.starfieldMesh.instanceColor) this.starfieldMesh.instanceColor.needsUpdate = true;
    this.starfieldMesh.computeBoundingSphere();
    this.scene.add(this.starfieldMesh);

    // Nebulae billboard clouds
    this.nebulaeGroup = new THREE.Group();
    const nebulaColors = ['#4c1d95', '#1e3a8a', '#831843', '#064e3b', '#6d28d9', '#0284c7'];
    const nebulaGeo = new THREE.PlaneGeometry(180, 180);

    for (let i = 0; i < 8; i++) {
      const color = nebulaColors[i % nebulaColors.length];
      const nebTex = createNebulaTexture(color);
      const nebMat = new THREE.MeshBasicMaterial({
        map: nebTex,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(nebulaGeo, nebMat);
      const ang = (i / 8) * Math.PI * 2;
      const dist = THREE.MathUtils.randFloat(350, 520);
      mesh.position.set(
        Math.cos(ang) * dist,
        THREE.MathUtils.randFloat(-120, 120),
        Math.sin(ang) * dist
      );
      mesh.rotation.z = Math.random() * Math.PI * 2;
      mesh.scale.setScalar(THREE.MathUtils.randFloat(1.2, 2.5));
      this.nebulaeGroup.add(mesh);
    }
    this.scene.add(this.nebulaeGroup);
  }

  /**
   * Astronomical Constellations with accurate stick-figures and bright stars
   */
  private buildConstellations() {
    this.constellationsGroup = new THREE.Group();

    const constellationDefs = [
      {
        name: 'Ursa Major',
        stars: [
          [240, 200, 120],  // Dubhe
          [220, 210, 140],  // Merak
          [200, 195, 170],  // Phecda
          [210, 185, 190],  // Megrez
          [180, 175, 230],  // Alioth
          [150, 165, 260],  // Mizar
          [120, 150, 290],  // Alkaid
        ],
        lines: [
          [0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]
        ],
      },
      {
        name: 'Orion',
        stars: [
          [-140, 70, -280],  // Betelgeuse (orange red)
          [-190, 90, -260],  // Bellatrix
          [-150, 10, -290],  // Alnitak (belt)
          [-160, 10, -285],  // Alnilam (belt)
          [-170, 10, -280],  // Mintaka (belt)
          [-135, -50, -300], // Saiph
          [-195, -60, -270], // Rigel (blue white)
        ],
        lines: [
          [0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [5, 6]
        ],
      },
      {
        name: 'Cassiopeia',
        stars: [
          [-220, 230, -100], // Caph
          [-180, 250, -120], // Schedar
          [-140, 220, -150], // Gamma Cas
          [-100, 240, -180], // Ruchbah
          [-60, 210, -200],  // Segin
        ],
        lines: [
          [0, 1], [1, 2], [2, 3], [3, 4]
        ],
      },
      {
        name: 'Crux',
        stars: [
          [50, -250, 200],  // Acrux
          [70, -190, 220],  // Gacrux
          [20, -220, 230],  // Mimosa
          [90, -215, 190],  // Delta Crucis
        ],
        lines: [
          [0, 1], [2, 3]
        ],
      },
    ];

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const starDotGeo = new THREE.SphereGeometry(1.0, 8, 8);
    const starDotMat = new THREE.MeshBasicMaterial({ color: 0xbae6fd });

    for (const c of constellationDefs) {
      const starVecs = c.stars.map(pos => new THREE.Vector3(...pos).normalize().multiplyScalar(380));

      for (const pos of starVecs) {
        const starMesh = new THREE.Mesh(starDotGeo, starDotMat);
        starMesh.position.copy(pos);
        this.constellationsGroup.add(starMesh);
      }

      const positions: number[] = [];
      for (const [startIdx, endIdx] of c.lines) {
        const p1 = starVecs[startIdx];
        const p2 = starVecs[endIdx];
        positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
      }

      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      const line = new THREE.LineSegments(lineGeo, lineMat);
      this.constellationsGroup.add(line);
    }

    this.scene.add(this.constellationsGroup);
  }

  /**
   * Polaris (The North Star / ਧਰੁਵ ਤਾਰਾ / ध्रुव तारा)
   * Anchored high above Earth's northern celestial pole
   */
  private buildPolaris() {
    const polarisGeo = new THREE.SphereGeometry(4.2, 24, 24);
    const polarisMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    this.polarisMesh = new THREE.Mesh(polarisGeo, polarisMat);
    // Placed at [0, 380, 0] along polar axis
    this.polarisMesh.position.set(0, 380, 0);

    // Radiant glowing star halo
    const haloGeo = new THREE.SphereGeometry(7.5, 16, 16);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xdbeafe,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    this.polarisHaloMesh = new THREE.Mesh(haloGeo, haloMat);
    this.polarisMesh.add(this.polarisHaloMesh);

    // Guide ray connecting Earth's north celestial pole to Polaris
    const guidePoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 380, 0)];
    const guideGeo = new THREE.BufferGeometry().setFromPoints(guidePoints);
    const guideMat = new THREE.LineDashedMaterial({
      color: 0x60a5fa,
      dashSize: 4,
      gapSize: 3,
      transparent: true,
      opacity: 0.25,
    });
    const guideLine = new THREE.Line(guideGeo, guideMat);
    guideLine.computeLineDistances();
    this.scene.add(guideLine);

    this.scene.add(this.polarisMesh);
  }

  /**
   * Milky Way Galactic Core & Supermassive Black Hole Sagittarius A*
   */
  private buildMilkyWayCenter() {
    this.milkyWayGroup = new THREE.Group();
    this.milkyWayGroup.position.set(-360, -35, -310);

    // 1. Black Hole Event Horizon (Pure black light absorber)
    const bhGeo = new THREE.SphereGeometry(5.8, 32, 32);
    const bhMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
    });
    this.blackHoleMesh = new THREE.Mesh(bhGeo, bhMat);
    this.milkyWayGroup.add(this.blackHoleMesh);

    // 2. Photon Ring (Relativistic inner light circle)
    const prGeo = new THREE.RingGeometry(5.85, 6.4, 48);
    const prMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    this.photonRingMesh = new THREE.Mesh(prGeo, prMat);
    this.photonRingMesh.rotation.x = Math.PI / 3;
    this.milkyWayGroup.add(this.photonRingMesh);

    // 3. Superheated Relativistic Accretion Disk
    const adGeo = new THREE.RingGeometry(6.6, 17.5, 64);
    adGeo.rotateX(-Math.PI / 2.6);
    const adTex = createAccretionDiskTexture();
    const adMat = new THREE.MeshBasicMaterial({
      map: adTex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
    });
    this.accretionDiskMesh = new THREE.Mesh(adGeo, adMat);
    this.milkyWayGroup.add(this.accretionDiskMesh);

    this.scene.add(this.milkyWayGroup);
  }

  /**
   * Sun: Composite 7-part star model
   */
  private buildSun() {
    this.sunGroup = new THREE.Group();

    // 1. Photosphere Core
    const sunTex = createSunTexture(this.state.spectralType);
    const sunCoreGeo = new THREE.SphereGeometry(7.0, 48, 48);
    const sunCoreMat = new THREE.MeshStandardMaterial({
      map: sunTex,
      emissiveMap: sunTex,
      emissive: new THREE.Color(0xffaa22),
      emissiveIntensity: 1.25,
      roughness: 0.9,
      metalness: 0.1,
    });
    this.sunCoreMesh = new THREE.Mesh(sunCoreGeo, sunCoreMat);
    this.sunGroup.add(this.sunCoreMesh);

    // 2. Chromosphere Inner Glow Shell
    const glowGeo = new THREE.SphereGeometry(7.35, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    this.sunGlowMesh = new THREE.Mesh(glowGeo, glowMat);
    this.sunGroup.add(this.sunGlowMesh);

    // 3. Solar Corona Outer Veil
    const coronaGeo = new THREE.SphereGeometry(9.2, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xff9922,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    this.sunCoronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    this.sunGroup.add(this.sunCoronaMesh);

    // 4. Prominence Loops
    const prominenceCurves = [
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(6.8, 1.2, 0.8),
        new THREE.Vector3(9.5, 3.2, 1.2),
        new THREE.Vector3(9.2, -1.8, -1.5),
        new THREE.Vector3(6.7, -1.5, -1.2)
      ),
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(-1.2, 6.7, 1.0),
        new THREE.Vector3(-2.2, 9.8, 2.5),
        new THREE.Vector3(1.8, 9.4, -2.0),
        new THREE.Vector3(1.5, 6.8, -1.0)
      ),
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(-4.8, -2.0, 4.8),
        new THREE.Vector3(-7.2, -3.2, 7.5),
        new THREE.Vector3(-2.5, -5.2, 7.8),
        new THREE.Vector3(-2.0, -4.6, 5.0)
      ),
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(3.2, -5.8, 2.5),
        new THREE.Vector3(5.5, -8.6, 3.8),
        new THREE.Vector3(7.2, -6.5, 1.0),
        new THREE.Vector3(6.0, -3.8, 0.5)
      ),
    ];

    const promMat = new THREE.MeshBasicMaterial({
      color: 0xff4400,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    for (const curve of prominenceCurves) {
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.22, 8, false);
      const tubeMesh = new THREE.Mesh(tubeGeo, promMat);
      this.sunProminences.push(tubeMesh);
      this.sunGroup.add(tubeMesh);
    }

    // 5. Coronal plasma wind particle streams
    const particleCount = 240;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const dir = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(1),
        THREE.MathUtils.randFloatSpread(1),
        THREE.MathUtils.randFloatSpread(1)
      ).normalize();
      const dist = THREE.MathUtils.randFloat(7.5, 16);
      pPositions[i * 3] = dir.x * dist;
      pPositions[i * 3 + 1] = dir.y * dist;
      pPositions[i * 3 + 2] = dir.z * dist;

      pVelocities[i * 3] = dir.x * 2.5;
      pVelocities[i * 3 + 1] = dir.y * 2.5;
      pVelocities[i * 3 + 2] = dir.z * 2.5;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('velocity', new THREE.BufferAttribute(pVelocities, 3));

    const pMat = new THREE.PointsMaterial({
      color: 0xffbb44,
      size: 0.85,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.sunParticles = new THREE.Points(pGeo, pMat);
    this.sunGroup.add(this.sunParticles);

    // 6. Lights
    this.sunLight = new THREE.PointLight(0xfffaed, 3.5, 500, 0.45);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.bias = -0.0005;
    this.sunGroup.add(this.sunLight);

    this.sunDirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    this.sunDirLight.castShadow = true;
    this.scene.add(this.sunDirLight);

    this.scene.add(this.sunGroup);
  }

  /**
   * Inner Planets: Mercury & Venus
   */
  private buildInnerPlanets() {
    // 1. Mercury (r=18)
    this.mercuryPivot = new THREE.Group();
    this.scene.add(this.mercuryPivot);

    const mercGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const mercTex = createMercuryTexture();
    const mercMat = new THREE.MeshStandardMaterial({
      map: mercTex,
      roughness: 0.85,
      metalness: 0.15,
    });
    this.mercuryMesh = new THREE.Mesh(mercGeo, mercMat);
    this.mercuryMesh.castShadow = true;
    this.mercuryMesh.receiveShadow = true;
    this.mercuryMesh.position.set(18, 0, 0);
    this.mercuryPivot.add(this.mercuryMesh);

    // 2. Venus (r=26)
    this.venusPivot = new THREE.Group();
    this.scene.add(this.venusPivot);

    const venGeo = new THREE.SphereGeometry(2.3, 36, 36);
    const venTex = createVenusTexture();
    const venMat = new THREE.MeshStandardMaterial({
      map: venTex,
      roughness: 0.5,
      metalness: 0.05,
    });
    this.venusMesh = new THREE.Mesh(venGeo, venMat);
    this.venusMesh.castShadow = true;
    this.venusMesh.receiveShadow = true;
    this.venusMesh.position.set(26, 0, 0);
    this.venusPivot.add(this.venusMesh);
  }

  /**
   * Earth & Moon System
   */
  private buildEarthAndMoon() {
    this.earthPivot = new THREE.Group();
    this.scene.add(this.earthPivot);

    // Axial tilt group (23.44°)
    this.earthTiltGroup = new THREE.Group();
    this.earthTiltGroup.rotation.z = THREE.MathUtils.degToRad(23.44);
    this.earthPivot.add(this.earthTiltGroup);

    // 1. Earth Terrestrial Mesh
    const earthGeo = new THREE.SphereGeometry(2.4, 48, 48);
    const earthTex = createEarthTexture();
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTex,
      roughness: 0.65,
      metalness: 0.1,
    });
    this.earthMesh = new THREE.Mesh(earthGeo, earthMat);
    this.earthMesh.castShadow = true;
    this.earthMesh.receiveShadow = true;
    this.earthTiltGroup.add(this.earthMesh);

    // 2. Earth Night Lights
    const nightTex = createEarthNightTexture();
    const nightGeo = new THREE.SphereGeometry(2.408, 48, 48);
    const nightMat = new THREE.MeshBasicMaterial({
      map: nightTex,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    this.earthNightMesh = new THREE.Mesh(nightGeo, nightMat);
    this.earthTiltGroup.add(this.earthNightMesh);

    // 3. Clouds Layer
    const cloudsTex = createEarthCloudsTexture();
    const cloudsGeo = new THREE.SphereGeometry(2.44, 40, 40);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsTex,
      transparent: true,
      opacity: 0.75,
      roughness: 0.9,
      depthWrite: false,
    });
    this.earthCloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    this.earthTiltGroup.add(this.earthCloudsMesh);

    // 4. Rayleigh Scattering Atmosphere
    const atmoGeo = new THREE.SphereGeometry(2.55, 32, 32);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    this.earthAtmoGlowMesh = new THREE.Mesh(atmoGeo, atmoMat);
    this.earthTiltGroup.add(this.earthAtmoGlowMesh);

    // 5. Polar Axis Line
    const axisPoints = [
      new THREE.Vector3(0, -3.4, 0),
      new THREE.Vector3(0, 3.4, 0),
    ];
    const axisGeo = new THREE.BufferGeometry().setFromPoints(axisPoints);
    const axisMat = new THREE.LineBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.5,
    });
    this.earthAxisLine = new THREE.Line(axisGeo, axisMat);
    this.earthTiltGroup.add(this.earthAxisLine);

    // MOON SYSTEM
    this.moonPivot = new THREE.Group();
    this.moonPivot.rotation.x = THREE.MathUtils.degToRad(5.14);
    this.earthPivot.add(this.moonPivot);

    const moonGeo = new THREE.SphereGeometry(0.72, 36, 36);
    const moonTex = createMoonTexture();
    const moonBump = createMoonBumpTexture();
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTex,
      bumpMap: moonBump,
      bumpScale: 0.04,
      roughness: 0.88,
      metalness: 0.05,
    });
    this.moonMesh = new THREE.Mesh(moonGeo, moonMat);
    this.moonMesh.castShadow = true;
    this.moonMesh.receiveShadow = true;
    this.moonMesh.position.set(8.5, 0, 0);
    this.moonPivot.add(this.moonMesh);

    const moonOrbitCurve = new THREE.EllipseCurve(0, 0, 8.5, 8.5, 0, Math.PI * 2, false, 0);
    const moonOrbitPts = moonOrbitCurve.getPoints(64).map(p => new THREE.Vector3(p.x, 0, p.y));
    const moonOrbitGeo = new THREE.BufferGeometry().setFromPoints(moonOrbitPts);
    const moonOrbitMat = new THREE.LineBasicMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.35,
    });
    this.moonOrbitLine = new THREE.Line(moonOrbitGeo, moonOrbitMat);
    this.moonPivot.add(this.moonOrbitLine);
  }

  /**
   * Outer Planets: Mars, Jupiter, Saturn, Uranus, Neptune
   */
  private buildOuterPlanets() {
    // 1. Mars (r=52)
    this.marsPivot = new THREE.Group();
    this.scene.add(this.marsPivot);

    const marsGeo = new THREE.SphereGeometry(1.35, 32, 32);
    const marsTex = createMarsTexture();
    const marsMat = new THREE.MeshStandardMaterial({
      map: marsTex,
      roughness: 0.8,
      metalness: 0.1,
    });
    this.marsMesh = new THREE.Mesh(marsGeo, marsMat);
    this.marsMesh.castShadow = true;
    this.marsMesh.receiveShadow = true;
    this.marsMesh.position.set(52, 0, 0);
    this.marsPivot.add(this.marsMesh);

    // 2. Jupiter (r=78)
    this.jupiterPivot = new THREE.Group();
    this.scene.add(this.jupiterPivot);

    const jupGeo = new THREE.SphereGeometry(4.8, 36, 36);
    const jupTex = createJupiterTexture();
    const jupMat = new THREE.MeshStandardMaterial({
      map: jupTex,
      roughness: 0.6,
      metalness: 0.05,
    });
    this.jupiterMesh = new THREE.Mesh(jupGeo, jupMat);
    this.jupiterMesh.castShadow = true;
    this.jupiterMesh.receiveShadow = true;
    this.jupiterMesh.position.set(78, 0, 0);
    this.jupiterPivot.add(this.jupiterMesh);

    // 3. Saturn & Rings (r=108)
    this.saturnPivot = new THREE.Group();
    this.scene.add(this.saturnPivot);

    const satGeo = new THREE.SphereGeometry(3.9, 36, 36);
    const satTex = createSaturnTexture();
    const satMat = new THREE.MeshStandardMaterial({
      map: satTex,
      roughness: 0.65,
      metalness: 0.05,
    });
    this.saturnMesh = new THREE.Mesh(satGeo, satMat);
    this.saturnMesh.castShadow = true;
    this.saturnMesh.receiveShadow = true;
    this.saturnMesh.position.set(108, 0, 0);
    this.saturnMesh.rotation.z = THREE.MathUtils.degToRad(26.7);
    this.saturnPivot.add(this.saturnMesh);

    const satRingGeo = new THREE.RingGeometry(4.8, 9.8, 64);
    satRingGeo.rotateX(-Math.PI / 2);
    const satRingTex = createSaturnRingsTexture();
    const satRingMat = new THREE.MeshStandardMaterial({
      map: satRingTex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
      roughness: 0.7,
      metalness: 0.1,
    });
    this.saturnRingMesh = new THREE.Mesh(satRingGeo, satRingMat);
    this.saturnRingMesh.castShadow = true;
    this.saturnRingMesh.receiveShadow = true;
    this.saturnMesh.add(this.saturnRingMesh);

    // 4. Uranus & Rings (r=142)
    this.uranusPivot = new THREE.Group();
    this.scene.add(this.uranusPivot);

    const uraGeo = new THREE.SphereGeometry(2.8, 32, 32);
    const uraTex = createUranusTexture();
    const uraMat = new THREE.MeshStandardMaterial({
      map: uraTex,
      roughness: 0.7,
      metalness: 0.05,
    });
    this.uranusMesh = new THREE.Mesh(uraGeo, uraMat);
    this.uranusMesh.castShadow = true;
    this.uranusMesh.receiveShadow = true;
    this.uranusMesh.position.set(142, 0, 0);
    // Uranus 97.8° tilt (orbits on its side!)
    this.uranusMesh.rotation.z = THREE.MathUtils.degToRad(97.8);
    this.uranusPivot.add(this.uranusMesh);

    const uraRingGeo = new THREE.RingGeometry(3.5, 4.8, 48);
    uraRingGeo.rotateX(-Math.PI / 2);
    const uraRingMat = new THREE.MeshBasicMaterial({
      color: 0x99ddff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    this.uranusRingMesh = new THREE.Mesh(uraRingGeo, uraRingMat);
    this.uranusMesh.add(this.uranusRingMesh);

    // 5. Neptune (r=178)
    this.neptunePivot = new THREE.Group();
    this.scene.add(this.neptunePivot);

    const nepGeo = new THREE.SphereGeometry(2.7, 32, 32);
    const nepTex = createNeptuneTexture();
    const nepMat = new THREE.MeshStandardMaterial({
      map: nepTex,
      roughness: 0.6,
      metalness: 0.05,
    });
    this.neptuneMesh = new THREE.Mesh(nepGeo, nepMat);
    this.neptuneMesh.castShadow = true;
    this.neptuneMesh.receiveShadow = true;
    this.neptuneMesh.position.set(178, 0, 0);
    this.neptunePivot.add(this.neptuneMesh);
  }

  /**
   * Orbital paths lines for all 8 planets
   */
  private buildOrbitPaths() {
    this.orbitLinesGroup = new THREE.Group();
    const distances = [
      { r: 18, color: 0x94a3b8 },  // Mercury
      { r: 26, color: 0xfde047 },  // Venus
      { r: 35, color: 0x38bdf8 },  // Earth (1 AU)
      { r: 52, color: 0xf87171 },  // Mars
      { r: 78, color: 0xfbbf24 },  // Jupiter
      { r: 108, color: 0xe2e8f0 }, // Saturn
      { r: 142, color: 0x67e8f9 }, // Uranus
      { r: 178, color: 0x3b82f6 }, // Neptune
    ];

    for (const d of distances) {
      const curve = new THREE.EllipseCurve(0, 0, d.r, d.r, 0, Math.PI * 2, false, 0);
      const pts = curve.getPoints(128).map(p => new THREE.Vector3(p.x, 0, p.y));
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: d.color,
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(geo, mat);
      this.orbitLinesGroup.add(line);
    }

    this.scene.add(this.orbitLinesGroup);
  }

  /**
   * Ecliptic Plane Grid
   */
  private buildGrid() {
    this.eclipticGrid = new THREE.GridHelper(380, 38, 0x1e293b, 0x0f172a);
    this.eclipticGrid.position.y = -0.05;
    this.eclipticGrid.visible = this.state.showGrid;
    this.scene.add(this.eclipticGrid);
  }

  /**
   * Updates state parameters and triggers procedural visual updates
   */
  public updateState(partial: Partial<SimulationState>) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...partial };

    // Spectral type change for the Sun
    if (partial.spectralType && partial.spectralType !== this.currentSunTextureType) {
      this.currentSunTextureType = partial.spectralType;
      const newTex = createSunTexture(partial.spectralType);
      (this.sunCoreMesh.material as THREE.MeshStandardMaterial).map = newTex;
      (this.sunCoreMesh.material as THREE.MeshStandardMaterial).emissiveMap = newTex;
      (this.sunCoreMesh.material as THREE.MeshStandardMaterial).needsUpdate = true;

      if (partial.spectralType === 'O5') {
        this.sunLight.color.setHex(0x99ccff);
        (this.sunGlowMesh.material as THREE.MeshBasicMaterial).color.setHex(0x3388ff);
        (this.sunCoronaMesh.material as THREE.MeshBasicMaterial).color.setHex(0x66aaff);
        (this.sunCoreMesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x2277ff);
      } else if (partial.spectralType === 'M0') {
        this.sunLight.color.setHex(0xff7744);
        (this.sunGlowMesh.material as THREE.MeshBasicMaterial).color.setHex(0xcc2200);
        (this.sunCoronaMesh.material as THREE.MeshBasicMaterial).color.setHex(0xff4411);
        (this.sunCoreMesh.material as THREE.MeshStandardMaterial).emissive.setHex(0xdd3300);
      } else {
        this.sunLight.color.setHex(0xfffaed);
        (this.sunGlowMesh.material as THREE.MeshBasicMaterial).color.setHex(0xff6600);
        (this.sunCoronaMesh.material as THREE.MeshBasicMaterial).color.setHex(0xff9922);
        (this.sunCoreMesh.material as THREE.MeshStandardMaterial).emissive.setHex(0xffaa22);
      }
    }

    if (partial.showOrbits !== undefined) {
      this.orbitLinesGroup.visible = partial.showOrbits;
      this.moonOrbitLine.visible = partial.showOrbits;
    }
    if (partial.showStarfield !== undefined) {
      this.starfieldMesh.visible = partial.showStarfield;
      this.nebulaeGroup.visible = partial.showStarfield;
    }
    if (partial.showConstellations !== undefined) {
      this.constellationsGroup.visible = partial.showConstellations;
    }
    if (partial.showGrid !== undefined) {
      this.eclipticGrid.visible = partial.showGrid;
    }
    if (partial.showAtmosphere !== undefined) {
      this.earthAtmoGlowMesh.visible = partial.showAtmosphere;
      this.earthCloudsMesh.visible = partial.showAtmosphere;
    }
    if (partial.showNightLights !== undefined) {
      this.earthNightMesh.visible = partial.showNightLights;
    }

    if (partial.activeFlareBurst && !prevState.activeFlareBurst) {
      this.flareBurstTimer = 3.5;
    }

    if (partial.eclipseAlignment && partial.eclipseAlignment !== 'none') {
      this.alignForEclipse(partial.eclipseAlignment);
    }
  }

  /**
   * Aligns the Moon directly on the Sun-Earth syzygy axis
   */
  public alignForEclipse(mode: 'solar' | 'lunar') {
    const earthAngle = Math.atan2(this.earthPivot.position.z, this.earthPivot.position.x);
    const targetMoonAngle = mode === 'solar' ? Math.PI + earthAngle : earthAngle;

    this.moonPivot.rotation.y = targetMoonAngle;
    this.moonPivot.rotation.x = 0;
  }

  /**
   * Main Lossless 60fps Animation Loop
   */
  private animate = () => {
    this.animFrameId = requestAnimationFrame(this.animate);

    const dt = this.clock.getDelta();
    const safeDt = Math.min(dt, 0.1);

    if (!this.state.isPaused) {
      const dayRate = (safeDt * 6.0) * this.state.timeSpeed;
      this.orbitalTime += dayRate;
    }

    // Orbital periods:
    // Mercury: 87.97 days
    // Venus: 224.7 days
    // Earth: 365.25 days
    // Moon: 27.32 days
    // Mars: 687 days
    // Jupiter: 11.86 yrs (4332.6 d)
    // Saturn: 29.45 yrs (10756 d)
    // Uranus: 84.0 yrs (30687 d)
    // Neptune: 164.8 yrs (60190 d)
    const mercOrbitalAngle = (this.orbitalTime / 87.97) * Math.PI * 2;
    const venOrbitalAngle = (this.orbitalTime / 224.7) * Math.PI * 2;
    const earthOrbitalAngle = (this.orbitalTime / 365.25) * Math.PI * 2;
    const moonOrbitalAngle = (this.orbitalTime / 27.32) * Math.PI * 2;
    const marsOrbitalAngle = (this.orbitalTime / 687) * Math.PI * 2;
    const jupiterOrbitalAngle = (this.orbitalTime / 4332.6) * Math.PI * 2;
    const saturnOrbitalAngle = (this.orbitalTime / 10756) * Math.PI * 2;
    const uranusOrbitalAngle = (this.orbitalTime / 30687) * Math.PI * 2;
    const neptuneOrbitalAngle = (this.orbitalTime / 60190) * Math.PI * 2;

    const earthSpinRate = safeDt * (this.state.isPaused ? 0 : 0.8 * this.state.timeSpeed);

    // 1. Mercury (r=18)
    this.mercuryPivot.position.set(Math.cos(mercOrbitalAngle) * 18, 0, Math.sin(mercOrbitalAngle) * 18);
    this.mercuryMesh.rotation.y += earthSpinRate * 0.15;

    // 2. Venus (r=26)
    this.venusPivot.position.set(Math.cos(venOrbitalAngle) * 26, 0, Math.sin(venOrbitalAngle) * 26);
    this.venusMesh.rotation.y -= earthSpinRate * 0.05; // Retrograde spin

    // 3. Earth (r=35) & Moon
    const earthX = Math.cos(earthOrbitalAngle) * 35;
    const earthZ = Math.sin(earthOrbitalAngle) * 35;
    this.earthPivot.position.set(earthX, 0, earthZ);

    this.earthMesh.rotation.y += earthSpinRate;
    this.earthNightMesh.rotation.y += earthSpinRate;
    this.earthCloudsMesh.rotation.y += earthSpinRate * 1.12;

    this.moonPivot.rotation.y = moonOrbitalAngle;
    this.moonMesh.rotation.y = -moonOrbitalAngle; // Tidal locking

    // 4. Mars (r=52)
    this.marsPivot.position.set(Math.cos(marsOrbitalAngle) * 52, 0, Math.sin(marsOrbitalAngle) * 52);
    this.marsMesh.rotation.y += earthSpinRate * 0.97;

    // 5. Jupiter (r=78)
    this.jupiterPivot.position.set(Math.cos(jupiterOrbitalAngle) * 78, 0, Math.sin(jupiterOrbitalAngle) * 78);
    this.jupiterMesh.rotation.y += earthSpinRate * 2.4;

    // 6. Saturn (r=108)
    this.saturnPivot.position.set(Math.cos(saturnOrbitalAngle) * 108, 0, Math.sin(saturnOrbitalAngle) * 108);
    this.saturnMesh.rotation.y += earthSpinRate * 2.2;

    // 7. Uranus (r=142)
    this.uranusPivot.position.set(Math.cos(uranusOrbitalAngle) * 142, 0, Math.sin(uranusOrbitalAngle) * 142);
    this.uranusMesh.rotation.x += earthSpinRate * 1.4;

    // 8. Neptune (r=178)
    this.neptunePivot.position.set(Math.cos(neptuneOrbitalAngle) * 178, 0, Math.sin(neptuneOrbitalAngle) * 178);
    this.neptuneMesh.rotation.y += earthSpinRate * 1.5;

    // Deep Cosmos dynamics
    const timeSec = this.clock.getElapsedTime();
    this.sunCoreMesh.rotation.y += safeDt * 0.08;
    this.sunGlowMesh.rotation.y -= safeDt * 0.05;

    // Accretion disk spinning around Black Hole
    this.accretionDiskMesh.rotation.z += safeDt * 0.8;
    this.photonRingMesh.rotation.z -= safeDt * 1.2;

    // Polaris subtle twinkle pulsation
    const polarisPulse = 1.0 + Math.sin(timeSec * 3.5) * 0.08;
    this.polarisHaloMesh.scale.set(polarisPulse, polarisPulse, polarisPulse);

    // Coronal CME dynamics
    let currentFlareScale = this.state.solarFlareIntensity;
    if (this.flareBurstTimer > 0) {
      this.flareBurstTimer -= safeDt;
      currentFlareScale *= 2.2 + Math.sin(this.flareBurstTimer * 12) * 0.6;
    }

    for (let i = 0; i < this.sunProminences.length; i++) {
      const p = this.sunProminences[i];
      const pulse = 1.0 + Math.sin(timeSec * 2.5 + i * 1.8) * 0.12 * currentFlareScale;
      p.scale.set(pulse, pulse, pulse);
      (p.material as THREE.MeshBasicMaterial).opacity = Math.min(
        1.0,
        0.5 + Math.sin(timeSec * 3 + i) * 0.3 * currentFlareScale
      );
    }

    const pPosAttr = this.sunParticles.geometry.attributes.position;
    const pVelAttr = this.sunParticles.geometry.attributes.velocity;
    const pArray = pPosAttr.array as Float32Array;
    const vArray = pVelAttr.array as Float32Array;

    for (let i = 0; i < pArray.length; i += 3) {
      pArray[i] += vArray[i] * safeDt * currentFlareScale;
      pArray[i + 1] += vArray[i + 1] * safeDt * currentFlareScale;
      pArray[i + 2] += vArray[i + 2] * safeDt * currentFlareScale;

      const d = Math.sqrt(
        pArray[i] * pArray[i] +
        pArray[i + 1] * pArray[i + 1] +
        pArray[i + 2] * pArray[i + 2]
      );
      if (d > 22.0) {
        const factor = 7.2 / d;
        pArray[i] *= factor;
        pArray[i + 1] *= factor;
        pArray[i + 2] *= factor;
      }
    }
    pPosAttr.needsUpdate = true;

    this.sunDirLight.position.set(0, 0, 0);
    this.sunDirLight.target = this.earthPivot;

    // Smooth Interactive Camera Tracking (preserving user zoom & rotate!)
    this.updateCameraKinematics(safeDt);

    this.controls.update();

    if (this.onTelemetryUpdate) {
      this.moonMesh.getWorldPosition(_vec3Temp);
      const moonInclinationY = _vec3Temp.y;
      const moonPhase = calculateMoonPhase(earthOrbitalAngle, moonOrbitalAngle, moonInclinationY);
      this.onTelemetryUpdate(moonPhase, this.orbitalTime);
    }

    this.renderer.render(this.scene, this.camera);
  };

  private lastFocusTarget: CelestialTarget = 'overview';
  private transitionTimer = 0;
  private prevTargetWorldPos = new THREE.Vector3(0, 0, 0);

  /**
   * Retrieves the current world position of any celestial body
   */
  public getTargetWorldPosition(target: CelestialTarget, out: THREE.Vector3): void {
    if (target === 'sun') {
      out.set(0, 0, 0);
    } else if (target === 'mercury') {
      this.mercuryPivot.getWorldPosition(out);
    } else if (target === 'venus') {
      this.venusPivot.getWorldPosition(out);
    } else if (target === 'earth') {
      this.earthPivot.getWorldPosition(out);
    } else if (target === 'moon') {
      this.moonMesh.getWorldPosition(out);
    } else if (target === 'mars') {
      this.marsPivot.getWorldPosition(out);
    } else if (target === 'jupiter') {
      this.jupiterPivot.getWorldPosition(out);
    } else if (target === 'saturn') {
      this.saturnPivot.getWorldPosition(out);
    } else if (target === 'uranus') {
      this.uranusPivot.getWorldPosition(out);
    } else if (target === 'neptune') {
      this.neptunePivot.getWorldPosition(out);
    } else if (target === 'polaris') {
      this.polarisMesh.getWorldPosition(out);
    } else if (target === 'milkyway') {
      this.milkyWayGroup.getWorldPosition(out);
    } else if (target === 'eclipse') {
      this.earthPivot.getWorldPosition(out);
    } else {
      out.set(0, 0, 0);
    }
  }

  /**
   * Default optimal viewing distance for each celestial target
   */
  private getDefaultTargetDistance(target: CelestialTarget): number {
    switch (target) {
      case 'sun':
        return 24.0;
      case 'mercury':
        return 4.2;
      case 'venus':
        return 7.5;
      case 'earth':
        return 9.5;
      case 'moon':
        return 3.2;
      case 'mars':
        return 6.0;
      case 'jupiter':
        return 18.0;
      case 'saturn':
        return 22.0;
      case 'uranus':
        return 12.0;
      case 'neptune':
        return 11.5;
      case 'polaris':
        return 25.0;
      case 'milkyway':
        return 38.0;
      case 'eclipse':
        return 18.0;
      default:
        return 155.0;
    }
  }

  /**
   * Camera kinematics: Smoothly transitions on target switch,
   * tracks orbiting planetary bodies, and 100% respects user's manual zoom & rotation!
   */
  private updateCameraKinematics(dt: number) {
    const focus = this.state.focusTarget;
    this.getTargetWorldPosition(focus, _vec3Target);

    // If the user selected a new celestial target
    if (focus !== this.lastFocusTarget) {
      this.lastFocusTarget = focus;
      this.transitionTimer = 1.2; // 1.2s smooth glide transition

      const optimalDist = this.getDefaultTargetDistance(focus);
      // Direction from current target to camera, or default offset
      const offsetDir = this.camera.position.clone().sub(this.controls.target).normalize();
      if (offsetDir.lengthSq() < 0.01) {
        offsetDir.set(0.6, 0.45, 0.8).normalize();
      }

      _vec3CamPos.copy(_vec3Target).addScaledVector(offsetDir, optimalDist);
      if (focus === 'overview') {
        _vec3CamPos.set(0, 85, 145);
      }
    }

    if (this.transitionTimer > 0) {
      // Smoothly fly camera to new target
      this.transitionTimer -= dt;
      const alpha = 1 - Math.exp(-4.5 * dt);
      this.controls.target.lerp(_vec3Target, alpha);
      this.camera.position.lerp(_vec3CamPos, alpha);
      this.prevTargetWorldPos.copy(_vec3Target);
    } else {
      // Maintain user's zoom distance and orientation while moving along with orbiting planets!
      const deltaX = _vec3Target.x - this.prevTargetWorldPos.x;
      const deltaY = _vec3Target.y - this.prevTargetWorldPos.y;
      const deltaZ = _vec3Target.z - this.prevTargetWorldPos.z;

      if (Math.abs(deltaX) > 0.0001 || Math.abs(deltaY) > 0.0001 || Math.abs(deltaZ) > 0.0001) {
        this.controls.target.x += deltaX;
        this.controls.target.y += deltaY;
        this.controls.target.z += deltaZ;

        this.camera.position.x += deltaX;
        this.camera.position.y += deltaY;
        this.camera.position.z += deltaZ;
      }
      this.prevTargetWorldPos.copy(_vec3Target);
    }
  }

  /**
   * Smooth zoom in or out
   * Factor: positive zooms out, negative zooms in
   */
  public zoom(factor: number) {
    const offset = this.camera.position.clone().sub(this.controls.target);
    const dist = offset.length();
    const newDist = Math.max(1.2, Math.min(1800, dist * (1 + factor)));
    offset.setLength(newDist);
    this.camera.position.copy(this.controls.target).add(offset);
  }

  /**
   * Rotate camera around current subject horizontally
   */
  public rotateOrbit(deltaAngleRad: number) {
    const offset = this.camera.position.clone().sub(this.controls.target);
    offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), deltaAngleRad);
    this.camera.position.copy(this.controls.target).add(offset);
  }

  /**
   * Set specific preset view angles
   */
  public setViewAngle(angle: 'top' | 'equator' | 'front') {
    const dist = this.camera.position.distanceTo(this.controls.target);
    const target = this.controls.target;

    if (angle === 'top') {
      this.camera.position.set(target.x, target.y + dist, target.z + 0.001);
    } else if (angle === 'equator') {
      this.camera.position.set(target.x + dist, target.y, target.z);
    } else {
      // Front 3D isometric
      this.camera.position.set(
        target.x + dist * 0.65,
        target.y + dist * 0.45,
        target.z + dist * 0.75
      );
    }
    this.camera.lookAt(target);
  }

  /**
   * Toggle auto-rotation cinema orbit
   */
  public toggleAutoRotate(): boolean {
    this.controls.autoRotate = !this.controls.autoRotate;
    this.controls.autoRotateSpeed = 1.4;
    return this.controls.autoRotate;
  }

  /**
   * Raycast detection for both Touch events and Mouse clicks!
   */
  public handlePointerDown(clientX: number, clientY: number): CelestialTarget | null {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const pickableList: { mesh: THREE.Object3D; target: CelestialTarget }[] = [
      { mesh: this.sunCoreMesh, target: 'sun' },
      { mesh: this.mercuryMesh, target: 'mercury' },
      { mesh: this.venusMesh, target: 'venus' },
      { mesh: this.earthMesh, target: 'earth' },
      { mesh: this.moonMesh, target: 'moon' },
      { mesh: this.marsMesh, target: 'mars' },
      { mesh: this.jupiterMesh, target: 'jupiter' },
      { mesh: this.saturnMesh, target: 'saturn' },
      { mesh: this.uranusMesh, target: 'uranus' },
      { mesh: this.neptuneMesh, target: 'neptune' },
      { mesh: this.polarisMesh, target: 'polaris' },
      { mesh: this.blackHoleMesh, target: 'milkyway' },
    ];

    for (const item of pickableList) {
      const hits = raycaster.intersectObject(item.mesh, true);
      if (hits.length > 0) {
        return item.target;
      }
    }
    return null;
  }

  private onWindowResize = () => {
    if (!this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  public dispose() {
    window.removeEventListener('resize', this.onWindowResize);
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
    this.controls.dispose();
    this.renderer.dispose();
    if (this.renderer.domElement && this.renderer.domElement.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
    }
  }
}
