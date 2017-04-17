var container = document.getElementById('world');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({alpha : true});
renderer.setSize( window.innerWidth, window.innerHeight );

var controls = new THREE.OrbitControls( camera, renderer.domElement );

container.appendChild( renderer.domElement );

var pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;
scene.add(pointLight);

camera.position.z = 5;

scene.fog = new THREE.Fog(0xd8e7ff, 100, 950);

var rain = new rain();	

//to create a 'ground'
			
groundPlane = function() {
	this.mesh = new THREE.Object3D();
	var ground = new THREE.PlaneGeometry(100, 100);
	var groundMat = new THREE.MeshPhongMaterial({color: 0x46A3C5});

	var g = new THREE.Mesh(ground, groundMat);


	g.rotation.x = Math.PI/2;
	g.position.y = -10;
	this.mesh.add(g);
}



var ground = new groundPlane();
scene.add(ground.mesh);

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );

	//item.mesh.rotation.y += 0.01;
	updateRain();

	
	
}
render();