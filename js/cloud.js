//to create a single small cloud
cloudSmall = function() {
	this.mesh = new THREE.Object3D();

	var rSize = 0.5;

	//create the teardrop geoemtry via cone and sphere
	var puffL = new THREE.IcosahedronGeometry(Math.random() * 6 + 5);
	var puffS = new THREE.IcosahedronGeometry(Math.random() * 6 + 1);
				
	var cloudMat = new THREE.MeshPhongMaterial( { color: 0x909090, transparent: true, opacity: 0.95 } );
	cloudMat.castShadow = true;
	cloudMat.receiveShadow = false;


	var d = new THREE.Mesh(puffL, cloudMat);
	var d2 = new THREE.Mesh(puffS, cloudMat);
	var d3 = new THREE.Mesh(puffL, cloudMat);

	d2.position.x = Math.random() * 3;
	d2.position.z = Math.random() * 3;
	d2.position.y = Math.random() * 2;

	d3.position.x = Math.random() * 2;
	d3.position.z = Math.random() * 10;
	d3.position.y = Math.random() * 2;

	this.mesh.add(d);
	this.mesh.add(d2);
	this.mesh.add(d3);
}

//to create a single large cloud
cloudLarge = function() {


	this.mesh = new THREE.Object3D();

	var rSize = 0.5;

	//create the teardrop geoemtry via cone and sphere
	var puffL1 = new THREE.IcosahedronGeometry(Math.random() * 4 + 5);
	var puffL2 = new THREE.IcosahedronGeometry(Math.random() * 6 + 5);
	var puffL3 = new THREE.IcosahedronGeometry(Math.random() * 8 + 5);
	var puffL4 = new THREE.IcosahedronGeometry(Math.random() * 10 + 5);
				
	var cloudMat = new THREE.MeshPhongMaterial( { color: 0x909090, transparent: true, opacity: 0.95 } );
	cloudMat.castShadow = true;
	cloudMat.receiveShadow = false;


	var d = new THREE.Mesh(puffL1, cloudMat);
	var d2 = new THREE.Mesh(puffL2, cloudMat);
	var d3 = new THREE.Mesh(puffL3, cloudMat);
	var d4 = new THREE.Mesh(puffL4, cloudMat);

	d2.position.x = Math.random() * 10;
	d2.position.z = Math.random() * 10;
	d2.position.y = Math.random() * 2;

	d3.position.x = - Math.random() * 12;
	d3.position.z = - Math.random() * 12;
	d3.position.y = Math.random() * 2;

	d4.position.x = Math.random() * 14;
	d4.position.z = Math.random() * 0;
	d4.position.y = Math.random() * 7;


	this.mesh.add(d);
	this.mesh.add(d2);
	this.mesh.add(d3);
	this.mesh.add(d4);
}

var clouds;
var cloudsVel;

//initialize clouds
initSmallCloud = function() {

	clouds = [];
	cloudsVel = [];
	clouds.push(new cloudSmall());

	for (var i = 0; i < 5; i++) {
		
		for (var j = 0; j < Math.ceil(i * 2 * Math.PI / 2.0); j++) {

			var item = new cloudSmall();

			item.mesh.position.x = i * Math.sin(j * 2 * Math.PI / (i * 2 * Math.PI / 2.0)) * 160 + 160 * Math.random();
			//console.log('x position is currently: ' + item.mesh.position.x);
			item.mesh.position.z = i * Math.cos(j * 2 * Math.PI / (i * 2 * Math.PI / 2.0)) * 160 + 160 * Math.random();
			//console.log('z position is currently: ' + item.mesh.position.z);
			item.mesh.position.y = Math.random() * 20 + 75;

			console.log("i : " + i + "j: " +  j);

			clouds.push(item);
			cloudsVel.push(Math.random() * .08);
			scene.add(item.mesh);
			
		}
	}	
}

initLargeCloud = function() {


	if (!clouds) {
		console.log('initialized');
		clouds = [];
		cloudsVel = [];
	}

	var s = clouds.length;
	console.log(s);

	for (var i = 0; i < 10; i++) {
		
		for (var j = 0; j < Math.ceil(i * 2 * Math.PI / 2.0); j++) {

			var item = new cloudLarge();

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
	for (var i = 0; i < clouds.length; i++) {
		if (clouds[i].mesh.position.x >= -15) {
			clouds[i].mesh.position.x -= cloudsVel[i];
			cloudsVel[i] = cloudsVel[i] + 0.01;
		}
	}
}



