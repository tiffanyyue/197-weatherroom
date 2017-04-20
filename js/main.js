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

var hLight = new THREE.HemisphereLight(0xFFFFFF);

camera.position.z = 5;

scene.fog = new THREE.Fog(0xd8e7ff, 1, 950);

var weather = "rain";
var firstRain = true;
var firstSun = true;

//to create a 'ground'
			
var groundPlane = function() {
	this.mesh = new THREE.Object3D();
	var ground = new THREE.PlaneGeometry(1000, 1000);
	var groundMat = new THREE.MeshPhongMaterial({color: 0x65795E, side: THREE.DoubleSide});

	var g = new THREE.Mesh(ground, groundMat);
	g.rotation.x = Math.PI/2;
	g.position.y = -10;
	this.mesh.add(g);
}

var ground = new groundPlane();
scene.add(ground.mesh);

$('#button-rain').click( function () {
	console.log('rain button was clicked');
	weather = "rain";
	
})

$('#button-sunny').click( function () {
	console.log('sunny button was clicked');
	weather = "sun";

})


function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );

	if (weather === "rain") {
		if (firstRain) {
			initRain();
			console.log('first rain');
			firstRain = false;
		}
		updateRain();
		//console.log("It's raining mfffff");
	} else if (weather == "sun") {
		rainOut();
		firstRain = true;
		if (firstSun) {
			initSun();
			console.log('first sun');
			firstSun = false
		}
		updateSun();
		//console.log("It's sunny mfffff");
	}
	
}

render();