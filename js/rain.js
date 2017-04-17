//to create a single raindrop
raindrop = function() {
	this.mesh = new THREE.Object3D();

	var rSize = 0.05;

	//create the teardrop geoemtry via cone and sphere
	var tear = new THREE.ConeGeometry(rSize, rSize * 4, 16);
	var drop = new THREE.SphereGeometry(rSize, 16, 16, 0, Math.PI * 2, Math.PI/2, 3*Math.PI/4);
				
	var waterMat = new THREE.MeshPhongMaterial( { color: 0x46A3C5, transparent: true, opacity: 0.9 } );

	var t = new THREE.Mesh(tear, waterMat);
	var d = new THREE.Mesh(drop, waterMat);

	t.position.y = rSize * 2;


	this.mesh.add(t);
	this.mesh.add(d);
}

var raindrops = [];
var raindropsVel = [];

//to create a rain cloud
rain = function() {

	raindrops.push(new raindrop());

	for (var i = 0; i < 10; i++) {
		
		for (var j = 0; j < Math.ceil(i * 2 * Math.PI / 2.0); j++) {

			var item = new raindrop();

			item.mesh.position.x = i * Math.sin(j * 2 * Math.PI / (i * 2 * Math.PI / 2.0)) + Math.random();
			//console.log('x position is currently: ' + item.mesh.position.x);
			item.mesh.position.z = i * Math.cos(j * 2 * Math.PI / (i * 2 * Math.PI / 2.0)) + Math.random();
			//console.log('z position is currently: ' + item.mesh.position.z);
			item.mesh.position.y = Math.random() * i * 10;

			raindrops.push(item);
			raindropsVel.push(0);
			scene.add(item.mesh);
			
		}
	}

}

updateRain = function() {
	for (var i = 0; i < raindrops.length; i++) {
			if (raindrops[i].mesh.position.y <= -5) {
			raindrops[i].mesh.position.y = 10;
			raindropsVel[i] = 0;
		} else {
			raindrops[i].mesh.position.y -= raindropsVel[i];
			raindropsVel[i] = raindropsVel[i] + 0.01;
		}
	}
}



