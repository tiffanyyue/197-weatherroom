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

camera.position.z = 5;

scene.fog = new THREE.Fog(0xd8e7ff, 1, 950);

var weather = "rain";
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


var citiesO = {};

var prep = function() {
	for (var i = 0; i < cities.cities.length; i++) {
		var name = cities.cities[i].name.replace(' ', '');
		if (cities.cities[i].country === 'US') {
			citiesO[name] = {country: cities.cities[i].country, id: cities.cities[i].id };
		}
		
	}
	console.log('Done preparing city data');
}

prep();
initRain();
initSnow();


$('#refresh').click ( function() {
	var city = $('.location').get(0).value.replace(' ', '');
	weathercall(citiesO[city].id);
	}
)

$('#button-rain').click( function () {
	triggerRain();
});

$('#button-sunny').click( function () {
	triggerSun();
})

$('#button-snow').click( function () {
	triggerSnow();
})

$('#button-cloudy').click( function() {
	triggerCloudy();
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

		if (firstRain) {
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
			firstRain = true;
		} else if (prev === "cloud") {
			cloudOut();
			firstCloud = true;
		}

		if (firstSnow) {
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
		updateCloud();
	}


}

render();