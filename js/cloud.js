//to create a single cloud
cloud = function() {
	this.mesh = new THREE.Object3D();

	var rSize = 0.5;

	//create the teardrop geoemtry via cone and sphere
	var puffL = new THREE.IcosahedronGeometry(Math.random() * 6 + 5);
	var puffS = new THREE.IcosahedronGeometry(Math.random() * 6 + 1);
				
	var cloudMat = new THREE.MeshPhongMaterial( { color: 0x909090, transparent: true, opacity: 0.95 } );
	cloudMat.castShadow = true;
	cloudMat.receiveShadow = true;


	var d = new THREE.Mesh(puffL, cloudMat);
	var d2 = new THREE.Mesh(puffS, cloudMat);
	var d3 = new THREE.Mesh(puffL, cloudMat);


	d.rotation.x = Math.random();
	d.rotation.y = Math.random();
	d.rotation.z = Math.random();
	d2.position.x = Math.random() + 3;
	d2.position.z = Math.random() + 3;
	d2.position.y = Math.random() * 2;
	d2.rotation.x = Math.random();
	d2.rotation.y = Math.random();
	d2.rotation.z = Math.random();

	d3.position.x = Math.random() - 5;
	d3.position.z = Math.random() - 7;
	d3.position.y = Math.random() * 2;
	d3.rotation.x = Math.random();
	d3.rotation.y = Math.random();
	d3.rotation.z = Math.random();

	this.mesh.add(d);
	this.mesh.add(d2);
	this.mesh.add(d3);
}

var clouds;
var cloudsVel;

//initialize clouds
initCloud = function() {

	clouds = [];
	cloudsVel = [];
	clouds.push(new cloud());

	for (var i = 0; i < 10; i++) {
		
		for (var j = 0; j < Math.ceil(i * 2 * Math.PI / 2.0); j++) {

			var item = new cloud();

			item.mesh.position.x = i * Math.sin(j * 2 * Math.PI / (i * 2 * Math.PI / 2.0)) * 50 + 50 * Math.random();
			//console.log('x position is currently: ' + item.mesh.position.x);
			item.mesh.position.z = i * Math.cos(j * 2 * Math.PI / (i * 2 * Math.PI / 2.0)) * 50 + 50 * Math.random();
			//console.log('z position is currently: ' + item.mesh.position.z);
			item.mesh.position.y = Math.random() * 20 + 75;

			console.log("i : " + i + "j: " +  j);

			clouds.push(item);
			cloudsVel.push(Math.random() * .08);
			scene.add(item.mesh);
			
		}
	}	
}


updateCloud = function() {
	for (var i = 0; i < clouds.length; i++) {
		if (clouds[i].mesh.position.x <= -1000) {
			clouds[i].mesh.position.x = 1000;
			cloudsVel[i] = 0;
		} else {
			clouds[i].mesh.position.x -= cloudsVel[i];
		}
	}
}

cloudOut = function () {
	for (var i = 0; i < snowflakes.length; i++) {
		if (clouds[i].mesh.position.x >= -15) {
			clouds[i].mesh.position.x -= cloudsVel[i];
			cloudsVel[i] = cloudsVel[i] + 0.01;
		}
	}
}



