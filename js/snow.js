//to create a single snowflake
snowflake = function() {
	this.mesh = new THREE.Object3D();

	var rSize = 0.05;

	//create the teardrop geoemtry via cone and sphere
	var drop = new THREE.SphereGeometry(rSize, 16, 16, 0, Math.PI * 2, Math.PI/2, 3*Math.PI/4);
				
	var waterMat = new THREE.MeshPhongMaterial( { color: 0xb7e0d6, transparent: true, opacity: 0.9 } );
	waterMat.castShadow = true;
	waterMat.receiveShadow = true;

	var d = new THREE.Mesh(drop, waterMat);

	this.mesh.add(d);
}

var snowflakes;
var snowflakesVel;

//initialize snow
initSnow = function() {

	snowflakes = [];
	snowflakesVel = [];
	snowflakes.push(new snowflake());


	for (var i = 0; i < 20; i++) {
		
		for (var j = 0; j < Math.ceil(i * 2 * Math.PI / 2.0); j++) {

			var item = new snowflake();

			item.mesh.position.x = i * Math.sin(j * 2 * Math.PI / (i * 2 * Math.PI / 2.0)) + Math.random();
			//console.log('x position is currently: ' + item.mesh.position.x);
			item.mesh.position.z = i * Math.cos(j * 2 * Math.PI / (i * 2 * Math.PI / 2.0)) + Math.random();
			//console.log('z position is currently: ' + item.mesh.position.z);
			item.mesh.position.y = Math.random() * i * 10;

			snowflakes.push(item);
			snowflakesVel.push(0);
			scene.add(item.mesh);
			
		}
	}	
}


updateSnow = function() {
	for (var i = 0; i < snowflakes.length; i++) {
		if (snowflakes[i].mesh.position.y <= -10) {
			snowflakes[i].mesh.position.y = 10;
			snowflakesVel[i] = 0;
		} else {
			snowflakes[i].mesh.position.y -= snowflakesVel[i];
			snowflakesVel[i] = snowflakesVel[i] + 0.01;
		}
	}
}

snowOut = function () {
	for (var i = 0; i < snowflakes.length; i++) {
		if (snowflakes[i].mesh.position.y >= -15) {
			snowflakes[i].mesh.position.y -= snowflakesVel[i];
			snowflakesVel[i] = snowflakesVel[i] + 0.01;
		}
	}
}



