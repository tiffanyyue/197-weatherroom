//set up scenes, camera, and renderer, and controls

var container = document.getElementById('world');
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({alpha : true});
renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );

var controls = new THREE.OrbitControls( camera, renderer.domElement );

container.appendChild( renderer.domElement );

var hLight = new THREE.HemisphereLight(0xFFFFFF);
scene.add(hLight);

dirLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
				dirLight.color.setHSL( 0.1, 1, 0.95 );
				dirLight.position.set( -1, 1.75, 1 );
				dirLight.position.multiplyScalar( 50 );
				scene.add( dirLight );

				dirLight.castShadow = true;
				dirLight.shadow.mapSize.width = 2048;
				dirLight.shadow.mapSize.height = 2048;
				dirLight.shadowDarkness = 0.25;

				var d = 1000;
				dirLight.shadow.camera.left = -d;
				dirLight.shadow.camera.right = d;
				dirLight.shadow.camera.top = d;
				dirLight.shadow.camera.bottom = -d;
				dirLight.shadow.camera.far = 3500;
				dirLight.shadow.bias = -0.0001;


camera.position.z = 5;

scene.fog = new THREE.Fog(0xd8e7ff, 1, 950);

raindrop = function() {
	this.mesh = new THREE.Object3D();

	var rSize = 0.05;

	//create the teardrop geoemtry via cone and sphere
	var tear = new THREE.ConeGeometry(rSize, rSize * 4, 16);
	var drop = new THREE.SphereGeometry(rSize, 16, 16, 0, Math.PI * 2, Math.PI/2, 3*Math.PI/4);
				
	var waterMat = new THREE.MeshPhongMaterial( { color: 0xb7e0d6, transparent: true, opacity: 0.9 } );
	waterMat.castShadow = true;
	waterMat.receiveShadow = true;

	var t = new THREE.Mesh(tear, waterMat);
	var d = new THREE.Mesh(drop, waterMat);

	t.position.y = rSize * 2;


	this.mesh.add(t);
	this.mesh.add(d);
}

var item = new raindrop();
scene.add(item.mesh);

function render() {

	requestAnimationFrame( render );
	renderer.render( scene, camera );

}

render();