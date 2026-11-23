import * as THREE from
    'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

// ===================================
// 1. ESCENA
// ===================================
const escena = new THREE.Scene();
escena.background = new THREE.Color(0x9bb6a0);
escena.fog = new THREE.Fog(0x9bb6a0, 38, 105);

// ===================================
// 2. CÁMARA
// ===================================
const camara = new THREE.PerspectiveCamera(
    58, window.innerWidth / window.innerHeight, 0.1, 220
);
camara.position.set(0, 8, 13);

// ===================================
// 3. RENDERIZADOR
// ===================================
const renderizador = new THREE.WebGLRenderer({ antialias: true });
renderizador.setSize(window.innerWidth, window.innerHeight);
renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
renderizador.outputColorSpace = THREE.SRGBColorSpace;
renderizador.shadowMap.enabled = false;
document.body.appendChild(renderizador.domElement);

// ===================================
// 4. ILUMINACIÓN
// ===================================
escena.add(new THREE.HemisphereLight(0xdce8d5, 0x514936, 2.0));

const luzSol = new THREE.DirectionalLight(0xffe3b5, 2.1);
luzSol.position.set(-18, 28, 12);
escena.add(luzSol);

// ===================================
// 5. TERRENO TEXTURIZADO
// ===================================
const canvasTerreno = document.createElement('canvas');
canvasTerreno.width = 512;
canvasTerreno.height = 512;
const ctxTerreno = canvasTerreno.getContext('2d');

ctxTerreno.fillStyle = '#596449';
ctxTerreno.fillRect(0, 0, 512, 512);

const tonosTerreno = ['#687653', '#596449', '#72785a', '#4e5c43', '#7b8060'];
for (let i = 0; i < 2600; i++) {
    ctxTerreno.globalAlpha = 0.18 + Math.random() * 0.18;
    ctxTerreno.fillStyle = tonosTerreno[Math.floor(Math.random() * tonosTerreno.length)];
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = 1 + Math.random() * 3;
    ctxTerreno.beginPath();
    ctxTerreno.ellipse(x, y, r * 1.8, r, Math.random() * Math.PI, 0, Math.PI * 2);
    ctxTerreno.fill();
}
ctxTerreno.globalAlpha = 1;

const texturaTerreno = new THREE.CanvasTexture(canvasTerreno);
texturaTerreno.colorSpace = THREE.SRGBColorSpace;
texturaTerreno.wrapS = THREE.RepeatWrapping;
texturaTerreno.wrapT = THREE.RepeatWrapping;
texturaTerreno.repeat.set(8, 8);

const materialTerreno = new THREE.MeshStandardMaterial({
    map: texturaTerreno,
    roughness: 1
});

const terreno = new THREE.Mesh(
    new THREE.PlaneGeometry(120, 120),
    materialTerreno
);
terreno.rotation.x = -Math.PI / 2;
terreno.position.y = -0.08;
escena.add(terreno);

// ===================================
// 6. CAMINO ORGÁNICO
// ===================================
const puntosCamino = [
    new THREE.Vector3(0, 0, 48),
    new THREE.Vector3(2, 0, 32),
    new THREE.Vector3(-3, 0, 16),
    new THREE.Vector3(2, 0, 0),
    new THREE.Vector3(5, 0, -16),
    new THREE.Vector3(0, 0, -32),
    new THREE.Vector3(-4, 0, -48)
];
const curvaCamino = new THREE.CatmullRomCurve3(puntosCamino);

function crearCamino(curva, ancho, color, altura, opacidad = 1) {
    const segmentos = 140;
    const vertices = [];
    const indices = [];

    for (let i = 0; i <= segmentos; i++) {
        const t = i / segmentos;
        const punto = curva.getPointAt(t);
        const tangente = curva.getTangentAt(t);
        const perpendicular = new THREE.Vector3(-tangente.z, 0, tangente.x).normalize();

        const izquierda = punto.clone().addScaledVector(perpendicular, ancho / 2);
        const derecha = punto.clone().addScaledVector(perpendicular, -ancho / 2);
        izquierda.y = altura;
        derecha.y = altura;

        vertices.push(
            izquierda.x, izquierda.y, izquierda.z,
            derecha.x, derecha.y, derecha.z
        );

        if (i < segmentos) {
            const base = i * 2;
            indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
        }
    }

    const geometria = new THREE.BufferGeometry();
    geometria.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometria.setIndex(indices);
    geometria.computeVertexNormals();

    const malla = new THREE.Mesh(
        geometria,
        new THREE.MeshStandardMaterial({
            color,
            roughness: 1,
            side: THREE.DoubleSide,
            transparent: opacidad < 1,
            opacity: opacidad
        })
    );
    escena.add(malla);
}

crearCamino(curvaCamino, 7.6, 0x57432f, 0.005);
crearCamino(curvaCamino, 6.8, 0x98734b, 0.018);
crearCamino(curvaCamino, 5.7, 0xb28c5c, 0.03);

// Piedras pequeñas a los lados del sendero
const materialBorde = new THREE.MeshStandardMaterial({ color: 0x887c65, roughness: 1 });
for (let i = 0; i < 95; i++) {
    const t = Math.random();
    const punto = curvaCamino.getPointAt(t);
    const tangente = curvaCamino.getTangentAt(t);
    const lado = Math.random() < 0.5 ? -1 : 1;
    const normal = new THREE.Vector3(-tangente.z, 0, tangente.x).normalize();
    const piedra = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.12 + Math.random() * 0.2, 0),
        materialBorde
    );
    piedra.position.copy(punto).addScaledVector(normal, lado * (3.8 + Math.random() * 0.55));
    piedra.position.y = 0.12;
    piedra.rotation.set(Math.random(), Math.random(), Math.random());
    escena.add(piedra);
}

// ===================================
// 7. VEGETACIÓN
// ===================================
const materialTronco = new THREE.MeshStandardMaterial({ color: 0x59412f, roughness: 1 });
const materialesHojas = [
    new THREE.MeshStandardMaterial({ color: 0x294b35, roughness: 1 }),
    new THREE.MeshStandardMaterial({ color: 0x365d3c, roughness: 1 }),
    new THREE.MeshStandardMaterial({ color: 0x496c43, roughness: 1 }),
    new THREE.MeshStandardMaterial({ color: 0x66764a, roughness: 1 })
];

function crearArbol(x, z, escala = 1) {
    const arbol = new THREE.Group();

    const tronco = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.38, 3.6, 8),
        materialTronco
    );
    tronco.position.y = 1.8;
    arbol.add(tronco);

    // Copa irregular formada por volúmenes de distintos tamaños
    const copas = [
        [0, 4.0, 0, 1.45],
        [-0.95, 3.65, 0.15, 1.05],
        [0.95, 3.8, -0.1, 1.1],
        [0.25, 4.65, 0.35, 0.95],
        [-0.35, 4.25, -0.8, 0.9]
    ];

    copas.forEach((p, i) => {
        const copa = new THREE.Mesh(
            new THREE.IcosahedronGeometry(p[3], 1),
            materialesHojas[(i + Math.floor(Math.random() * 3)) % materialesHojas.length]
        );
        copa.position.set(p[0], p[1], p[2]);
        copa.scale.set(1.15, 0.82 + Math.random() * 0.22, 1.05);
        arbol.add(copa);
    });

    arbol.scale.setScalar(escala);
    arbol.position.set(x, 0, z);
    escena.add(arbol);
}

for (let i = 0; i < 27; i++) {
    const lado = Math.random() < 0.5 ? -1 : 1;
    crearArbol(lado * (12 + Math.random() * 13), Math.random() * 96 - 48, 0.75 + Math.random() * 0.8);
}

const materialPlanta = new THREE.MeshStandardMaterial({ color: 0x466b3d, roughness: 1 });
const materialFlor = [
    0xc17b55, 0xd1b66e, 0x9b7c9c
].map(color => new THREE.MeshStandardMaterial({ color, roughness: 1 }));

function crearPlanta(x, z, escala = 1) {
    const grupo = new THREE.Group();

    for (let i = 0; i < 5; i++) {
        const hoja = new THREE.Mesh(new THREE.SphereGeometry(0.55, 7, 5), materialPlanta);
        const angulo = i * Math.PI * 2 / 5;
        hoja.position.set(Math.cos(angulo) * 0.28, 0.32, Math.sin(angulo) * 0.28);
        hoja.scale.set(0.45, 0.16, 1.15);
        hoja.rotation.y = -angulo;
        grupo.add(hoja);
    }

    if (Math.random() > 0.45) {
        const flor = new THREE.Mesh(new THREE.SphereGeometry(0.13, 7, 6), materialFlor[Math.floor(Math.random() * materialFlor.length)]);
        flor.position.y = 0.62;
        grupo.add(flor);
    }

    grupo.scale.setScalar(escala);
    grupo.position.set(x, 0, z);
    escena.add(grupo);
}

for (let i = 0; i < 54; i++) {
    const lado = Math.random() < 0.5 ? -1 : 1;
    crearPlanta(lado * (7.5 + Math.random() * 9), Math.random() * 90 - 45, 0.55 + Math.random() * 0.65);
}

const materialRoca = new THREE.MeshStandardMaterial({ color: 0x817967, roughness: 1 });
for (let i = 0; i < 28; i++) {
    const roca = new THREE.Mesh(new THREE.DodecahedronGeometry(0.25 + Math.random() * 0.55, 0), materialRoca);
    const lado = Math.random() < 0.5 ? -1 : 1;
    roca.position.set(lado * (8 + Math.random() * 13), 0.22, Math.random() * 90 - 45);
    roca.rotation.set(Math.random(), Math.random(), Math.random());
    roca.scale.y = 0.65;
    escena.add(roca);
}

// ===================================
// 8. ARQUITECTURA PREHISPÁNICA
// ===================================
const materialPiedra = new THREE.MeshStandardMaterial({ color: 0x96866c, roughness: 1 });
const materialPiedraOscura = new THREE.MeshStandardMaterial({ color: 0x655b4a, roughness: 1 });

function crearPiramide(x, z) {
    const grupo = new THREE.Group();
    const niveles = [
        { ancho: 9, alto: 1.2 },
        { ancho: 7.2, alto: 1.1 },
        { ancho: 5.4, alto: 1.0 },
        { ancho: 3.6, alto: 0.9 }
    ];
    let altura = 0;

    niveles.forEach(nivel => {
        const bloque = new THREE.Mesh(new THREE.BoxGeometry(nivel.ancho, nivel.alto, nivel.ancho), materialPiedra);
        bloque.position.y = altura + nivel.alto / 2;
        grupo.add(bloque);
        altura += nivel.alto;
    });

    const templo = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.5, 2.8), materialPiedraOscura);
    templo.position.y = altura + 0.75;
    grupo.add(templo);

    for (let i = 0; i < 7; i++) {
        const escalon = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.28, 0.7), materialPiedraOscura);
        escalon.position.set(0, 0.14 + i * 0.28, 5.0 + i * 0.55);
        grupo.add(escalon);
    }

    grupo.position.set(x, 0, z);
    escena.add(grupo);
}

function crearCabezaColosal(x, z, giro = 0) {
    const grupo = new THREE.Group();
    const materialCabeza = new THREE.MeshStandardMaterial({ color: 0x777363, roughness: 1 });
    const materialDetalle = new THREE.MeshStandardMaterial({ color: 0x49483e, roughness: 1 });

    const rostro = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), materialCabeza);
    rostro.scale.set(1.05, 1.12, 0.9);
    rostro.position.y = 1.25;
    grupo.add(rostro);

    const nariz = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.48, 0.28), materialCabeza);
    nariz.position.set(0, 1.2, 0.82);
    grupo.add(nariz);

    for (const lado of [-1, 1]) {
        const ojo = new THREE.Mesh(new THREE.SphereGeometry(0.105, 8, 6), materialDetalle);
        ojo.position.set(lado * 0.39, 1.48, 0.78);
        ojo.scale.set(1.3, 0.75, 0.5);
        grupo.add(ojo);
    }

    const boca = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.09, 0.1), materialDetalle);
    boca.position.set(0, 0.82, 0.85);
    grupo.add(boca);

    const casco = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.48), materialCabeza);
    casco.scale.set(1.08, 0.5, 0.94);
    casco.position.y = 1.95;
    grupo.add(casco);

    const base = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.35, 2.1), materialPiedraOscura);
    base.position.y = 0.18;
    grupo.add(base);

    grupo.position.set(x, 0, z);
    grupo.rotation.y = giro;
    escena.add(grupo);
}

crearPiramide(-14, -27);
crearCabezaColosal(13, -13, -0.25);
crearCabezaColosal(-12, 17, 0.3);

// ===================================
// 9. PERSONAJE PROVISIONAL
// ===================================
const personaje = new THREE.Group();
const materialRopa = new THREE.MeshStandardMaterial({ color: 0x496b78, roughness: 1 });
const materialPiel = new THREE.MeshStandardMaterial({ color: 0xb9825f, roughness: 1 });
const materialCabello = new THREE.MeshStandardMaterial({ color: 0x302b25, roughness: 1 });

const cuerpo = new THREE.Mesh(new THREE.CapsuleGeometry(0.38, 0.72, 4, 8), materialRopa);
cuerpo.position.y = 1.05;
personaje.add(cuerpo);

const cabeza = new THREE.Mesh(new THREE.SphereGeometry(0.34, 12, 10), materialPiel);
cabeza.position.y = 1.85;
personaje.add(cabeza);

const cabello = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), materialCabello);
cabello.position.y = 2.02;
personaje.add(cabello);

personaje.position.set(0, 0, 0);
escena.add(personaje);

// ===================================
// 10. CONTROLES Y MOVIMIENTO
// ===================================
const teclas = {};
window.addEventListener('keydown', evento => {
    const tecla = evento.key.toLowerCase();
    teclas[tecla] = true;
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(tecla)) evento.preventDefault();
}, { passive: false });

window.addEventListener('keyup', evento => {
    teclas[evento.key.toLowerCase()] = false;
});

window.addEventListener('blur', () => {
    for (const tecla in teclas) teclas[tecla] = false;
});

const velocidad = 0.30;
const direccion = new THREE.Vector3();
const posicionCamara = new THREE.Vector3();
const objetivoCamara = new THREE.Vector3();

function actualizarMovimiento() {
    direccion.set(0, 0, 0);

    if (teclas['w'] || teclas['arrowup']) direccion.z -= 1;
    if (teclas['s'] || teclas['arrowdown']) direccion.z += 1;
    if (teclas['a'] || teclas['arrowleft']) direccion.x -= 1;
    if (teclas['d'] || teclas['arrowright']) direccion.x += 1;

    if (direccion.lengthSq() > 0) {
        direccion.normalize();
        personaje.position.addScaledVector(direccion, velocidad);
        personaje.rotation.y = Math.atan2(direccion.x, direccion.z);
    }

    personaje.position.x = THREE.MathUtils.clamp(personaje.position.x, -21, 21);
    personaje.position.z = THREE.MathUtils.clamp(personaje.position.z, -48, 48);

    posicionCamara.set(
        personaje.position.x,
        personaje.position.y + 7,
        personaje.position.z + 11
    );
    camara.position.lerp(posicionCamara, 0.075);

    objetivoCamara.set(
        personaje.position.x,
        personaje.position.y + 1.3,
        personaje.position.z - 3
    );
    camara.lookAt(objetivoCamara);
}

// ===================================
// 11. BUCLE DEL JUEGO
// ===================================
function animar() {
    requestAnimationFrame(animar);
    actualizarMovimiento();
    renderizador.render(escena, camara);
}
animar();

// ===================================
// 12. AJUSTAR PANTALLA
// ===================================
window.addEventListener('resize', () => {
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
    renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
});
