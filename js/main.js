//set up scenes, camera, and renderer, and controls

var container = document.getElementById('world');
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({alpha : true});
renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );

var controls = new THREE.OrbitControls( camera, renderer.domElement );

container.appendChild( renderer.domElement );

/*
var pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;
scene.add(pointLight);*/

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

var weather = "cloud";
var prev;
var firstRain = true;
var firstSun = true;
var firstSnow = true;
var firstCloud = true;

//to create a 'ground'
			
var groundPlane = function() {
	this.mesh = new THREE.Object3D();
	var ground = new THREE.PlaneGeometry(3000, 3000);
	var groundMat = new THREE.MeshPhongMaterial({color: 0x8579b2, side: THREE.DoubleSide});

	//water color: color: 0x4f94af

	var g = new THREE.Mesh(ground, groundMat);
	g.receiveShadow = true;
	g.rotation.x = Math.PI/2;
	g.position.y = -10;
	this.mesh.add(g);
}

var ground = new groundPlane();
scene.add(ground.mesh);


$('#refresh').click ( function() {
	weathercall();
	}
)

$('#button-rain').click( function () {
	console.log('rain button was clicked');
	prev = weather;
	weather = "rain";
	$('.selected').addClass('not-selected');
	$('.selected').removeClass('selected');
	$(this).addClass('selected');
	$(this).removeClass('not-selected');
	console.log('PREVIOUS IS ' + prev);
	console.log('CURRENT IS ' + weather);
	
})

$('#button-sunny').click( function () {
	console.log('sunny button was clicked');
	prev = weather;
	weather = "sun";
	$('.selected').addClass('not-selected');
	$('.selected').removeClass('selected');
	$(this).addClass('selected');
	$(this).removeClass('not-selected');
	console.log('PREVIOUS IS ' + prev);
	console.log('CURRENT IS ' + weather);

})

$('#button-snow').click( function () {
	console.log('snow button was clicked');
	prev = weather;
	weather = "snow";
	$('.selected').addClass('not-selected');
	$('.selected').removeClass('selected');
	$(this).addClass('selected');
	$(this).removeClass('not-selected');
	console.log('PREVIOUS IS ' + prev);
	console.log('CURRENT IS ' + weather);

})

$('#button-cloudy').click( function() {
	console.log('cloud button was clicked');
	prev = weather;
	weather = "cloud";
	$('.selected').addClass('not-selected');
	$('.selected').removeClass('selected');
	$(this).addClass('selected');
	$(this).removeClass('not-selected');
	console.log('PREVIOUS IS ' + prev);
	console.log('CURRENT IS ' + weather);

})

function render() {

	requestAnimationFrame( render );
	renderer.render( scene, camera );

	if (weather === "rain") {

		if (prev === "snow") {
			snowOut();
			firstSnow = true;
		} else if (prev === "sun") {
			sunOut();
			firstSun = true;
		} else if (prev === "cloud") {
			cloudOut();
			firstCloud = true;
		}

		//add necessary audio adjustments
		if (firstRain) {
			initRain();
			rainSoundOn();
			console.log('first rain');
			firstRain = false;
		}
		updateRain();

	} else if (weather === "sun") {
		//add necessary audio adjustments
		if (prev === "snow") {
			snowOut();
			firstSnow = true;
		} else if (prev === "rain") {
			rainOut();
			rainSoundOff();
			firstRain = true;
		} else if (prev === "cloud") {
			cloudOut();
			firstCloud = true;
		}

		if (firstSun) {
			initSun();
			console.log('first sun');
			firstSun = false;
		}
		updateSun();

	} else if (weather === "snow") {

		if (prev === "sun") {
			sunOut();
			firstSun = true;
		} else if (prev === "rain") {
			rainOut();
			rainSoundOff();
			firstRain = true;
		} else if (prev === "cloud") {
			cloudOut();
			firstCloud = true;
		}

		//add necessary audio adjustments
		if (firstSnow) {
			initSnow();
			console.log('first snow');
			firstSnow = false;
		}
		updateSnow();

	} else if (weather === "cloud") {
		if (prev === "sun") {
			sunOut();
			firstSun = true;
		} else if (prev === "rain") {
			rainOut();
			rainSoundOff();
			firstRain = true;
		} else if (prev === "snow") {
			snowOut();
			firstSnow = true;
		}

		if (firstCloud) {
			initSmallCloud();
			initLargeCloud();
			firstCloud = false;
		}
		console.log('PREVIOUS IS ' + prev);
		console.log('CURRENT IS ' + weather);
		//console.log('everything out');
		updateCloud();
	}


}

render();