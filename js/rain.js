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
			item.mesh.position.y = -10;

			raindrops.push(item);
			raindropsVel.push(0);
			scene.add(item.mesh);
			
		}
	}	

	console.log('rain initialized');
}

rainSoundOn = function() {
	s = $('#sound-rain');
	s.get(0).animate({volume: 1.0}, 800);
	s.muted = false;
}

rainSoundOff = function() {
	var s = $('#sound-rain');
	s.muted = true;
	s.animate({volume: 0.0}, 1500);
}


updateRain = function() {
	for (var i = 0; i < raindrops.length; i++) {
		if (raindrops[i].mesh.position.y <= -10) {
			raindrops[i].mesh.position.y = Math.random() * i * 10 + 5;
			raindropsVel[i] = 0;
		} else {
			raindrops[i].mesh.position.y -= raindropsVel[i];
			raindropsVel[i] = raindropsVel[i] + 0.07;
		}
	}

}

rainOut = function () {
	for (var i = 0; i < raindrops.length; i++) {
		if (raindrops[i].mesh.position.y >= -15) {
			raindrops[i].mesh.position.y -= raindropsVel[i];
			raindropsVel[i] = raindropsVel[i] + 0.1;
		}
	}
}



