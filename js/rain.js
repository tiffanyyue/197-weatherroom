//to create a single raindrop
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

var raindrops;
var raindropsVel;

//initialize rain
initRain = function() {

	raindrops = [];
	raindropsVel = [];
	raindrops.push(new raindrop());


	for (var i = 0; i < 20; i++) {
		
		for (var j = 0; j < Math.ceil(i * 2 * Math.PI / 2.0); j++) {

			var item = new raindrop();

			item.mesh.position.x = i * Math.sin(j * 2 * Math.PI / (i * 2 * Math.PI / 2.0)) + Math.random();
			//console.log('x position is currently: ' + item.mesh.position.x);
			item.mesh.position.z = i * Math.cos(j * 2 * Math.PI / (i * 2 * Math.PI / 2.0)) + Math.random();
			//console.log('z position is currently: ' + item.mesh.position.z);
			item.mesh.position.y = Math.random() * i * 10 + 10;

			raindrops.push(item);
			raindropsVel.push(0);
			scene.add(item.mesh);
			
		}
	}	
}

rainSoundOn = function() {
	//s = $('#sound');
	//s.volume = 1.0;
	//console.log(s);
	//s.animate({volume: 0.5}, 1500);
	//console.log(s.volume);
}

rainSoundOff = function() {
	var s = $('#sound');
	console.log(s);
	//s.muted = true;
	s.animate({volume: 0.0}, 1500);
}


updateRain = function() {
	for (var i = 0; i < raindrops.length; i++) {
		if (raindrops[i].mesh.position.y <= -10) {
			raindrops[i].mesh.position.y = Math.random() * i * 10 + 5;
			raindropsVel[i] = 0;
		} else {
			raindrops[i].mesh.position.y -= raindropsVel[i];
			raindropsVel[i] = raindropsVel[i] + 0.01;
		}
	}
	//console.log('RAIN UPDATE CALLED');
}

rainOut = function () {
	for (var i = 0; i < raindrops.length; i++) {
		if (raindrops[i].mesh.position.y >= -15) {
			raindrops[i].mesh.position.y -= raindropsVel[i];
			raindropsVel[i] = raindropsVel[i] + 0.01;
		}
	}
}



