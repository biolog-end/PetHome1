import React, { useEffect } from 'react';
import * as THREE from 'three';
import './SecretGame.css';

const SecretGame = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const player = new THREE.Group();
    scene.add(player);
    player.add(camera);

    camera.position.set(0, 1.6, 0);
    player.position.set(0, 0, 5);

    const playerCollider = new THREE.Sphere(player.position, 0.5);

    const buildings = [];
    const roads = [];
    const sidewalks = [];
    let petHomeHotel;

    function createTextTexture(text, width, height) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        ctx.fillRect(0, 0, width, height);
        ctx.font = 'Bold ' + Math.floor(height * 0.8) + 'px Arial';
        ctx.fillStyle = 'red';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, width / 2, height / 2);
        return new THREE.CanvasTexture(canvas);
    }

    function generateBuilding(isPetHome = false) {
        const buildingGeometry = new THREE.BoxGeometry(
            Math.random() * 10 + 5,
            Math.random() * 30 + 10,
            Math.random() * 10 + 5
        );
        const buildingMaterial = new THREE.MeshPhongMaterial({
            color: isPetHome ? 0xFFFFFF : Math.random() * 0xffffff
        });
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        
        let validPosition = false;
        while (!validPosition) {
            building.position.set(
                Math.round((Math.random() * 200 - 100) / 10) * 10,
                building.geometry.parameters.height / 2,
                Math.round((Math.random() * 200 - 100) / 10) * 10
            );
            validPosition = !sidewalks.some(sidewalk => 
                Math.abs(sidewalk.position.x - building.position.x) < 10 &&
                Math.abs(sidewalk.position.z - building.position.z) < 10
            );
        }
        
        if (isPetHome) {
            building.collider = new THREE.Box3().setFromObject(building);
        }
        
        scene.add(building);
        if (isPetHome) {
            petHomeHotel = building;
            
            const signGeometry = new THREE.PlaneGeometry(10, 3);
            const signTexture = createTextTexture('PetHome', 1024, 256);
            const signMaterial = new THREE.MeshBasicMaterial({ map: signTexture, transparent: true, side: THREE.DoubleSide });
            
            const createSign = (rotation, position) => {
                const sign = new THREE.Mesh(signGeometry, signMaterial);
                sign.rotation.y = rotation;
                sign.position.copy(position);
                building.add(sign);
            };
            
            const height = building.geometry.parameters.height;
            const width = building.geometry.parameters.width;
            const depth = building.geometry.parameters.depth;
            
            createSign(0, new THREE.Vector3(0, height / 2 + 2, depth / 2 + 0.1));
            createSign(Math.PI / 2, new THREE.Vector3(width / 2 + 0.1, height / 2 + 2, 0));
            createSign(Math.PI, new THREE.Vector3(0, height / 2 + 2, -depth / 2 - 0.1));
            createSign(-Math.PI / 2, new THREE.Vector3(-width / 2 - 0.1, height / 2 + 2, 0));
        } else {
            buildings.push(building);
        }
    }

    function generateRoad(isVertical) {
        const roadGeometry = new THREE.PlaneGeometry(isVertical ? 10 : 200, isVertical ? 200 : 10);
        const roadMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
        const road = new THREE.Mesh(roadGeometry, roadMaterial);
        road.rotation.x = -Math.PI / 2;
        road.position.set(
            Math.round(Math.random() * 20 - 10) * 10,
            0.01,
            Math.round(Math.random() * 20 - 10) * 10
        );
        scene.add(road);
        roads.push(road);

        const sidewalkGeometry = new THREE.PlaneGeometry(2, isVertical ? 200 : 10);
        const sidewalkMaterial = new THREE.MeshPhongMaterial({ color: 0x999999 });
        const leftSidewalk = new THREE.Mesh(sidewalkGeometry, sidewalkMaterial);
        const rightSidewalk = new THREE.Mesh(sidewalkGeometry, sidewalkMaterial);
        leftSidewalk.rotation.x = -Math.PI / 2;
        rightSidewalk.rotation.x = -Math.PI / 2;
        
        if (isVertical) {
            leftSidewalk.position.set(road.position.x - 6, 0.02, road.position.z);
            rightSidewalk.position.set(road.position.x + 6, 0.02, road.position.z);
        } else {
            leftSidewalk.rotation.z = Math.PI / 2;
            rightSidewalk.rotation.z = Math.PI / 2;
            leftSidewalk.position.set(road.position.x, 0.02, road.position.z - 6);
            rightSidewalk.position.set(road.position.x, 0.02, road.position.z + 6);
        }
        
        scene.add(leftSidewalk);
        scene.add(rightSidewalk);
        sidewalks.push(leftSidewalk, rightSidewalk);
    }

    for (let i = 0; i < 50; i++) {
        generateBuilding();
    }

    generateBuilding(true);

    for (let i = 0; i < 10; i++) {
        generateRoad(i % 2 === 0);
    }

    const light = new THREE.PointLight(0xffffff, 80, 100);
    light.position.set(0, 10, 0);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 10);
    scene.add(ambientLight);

    const normalMoveSpeed = 0.1;
    const runMoveSpeed = 0.13;
    let moveSpeed = normalMoveSpeed;
    const jumpForce = 0.15;
    const gravity = -0.005;
    let verticalVelocity = 0;
    const keys = {};

    document.addEventListener('keydown', (e) => {
        keys[e.key.toLowerCase()] = true;
        if (e.key === 'Shift') {
            moveSpeed = runMoveSpeed;
        }
    });

    document.addEventListener('keyup', (e) => {
        keys[e.key.toLowerCase()] = false;
        if (e.key === 'Shift') {
            moveSpeed = normalMoveSpeed;
        }
    });

    document.addEventListener('click', () => {
        document.body.requestPointerLock();
    });

    document.addEventListener('pointerlockchange', () => {
        if (document.pointerLockElement === document.body) {
            document.addEventListener('mousemove', updateCamera);
        } else {
            document.removeEventListener('mousemove', updateCamera);
        }
    });

    function updateCamera(e) {
        player.rotation.y -= e.movementX * 0.002;
        camera.rotation.x -= e.movementY * 0.002;
        camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
    }

    function checkCollisions(newPosition) {
        const playerColliderAtNewPosition = playerCollider.clone();
        playerColliderAtNewPosition.center.copy(newPosition);

        if (petHomeHotel && playerColliderAtNewPosition.intersectsBox(petHomeHotel.collider)) {
            endGame();
            return true;
        }

        return false;
    }

    function endGame() {
        document.getElementById('gameOver').style.display = 'flex';
        document.exitPointerLock();
        cancelAnimationFrame(animationId);
        startArtAnimation();
    }

    let animationId;

    function animate() {
        animationId = requestAnimationFrame(animate);

        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        direction.y = 0;
        direction.normalize();

        const newPosition = player.position.clone();

        if (keys['w'] || keys['ц']) newPosition.add(direction.clone().multiplyScalar(moveSpeed));
        if (keys['s'] || keys['ы']) newPosition.sub(direction.clone().multiplyScalar(moveSpeed));
        if (keys['a'] || keys['ф']) newPosition.add(direction.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2).multiplyScalar(moveSpeed));
        if (keys['d'] || keys['в']) newPosition.add(direction.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2).multiplyScalar(moveSpeed));

        if ((keys['q'] || keys['й']) && player.position.y === 0) {
            verticalVelocity = jumpForce;
        }

        verticalVelocity += gravity;
        newPosition.y += verticalVelocity;

        if (newPosition.y < 0) {
            newPosition.y = 0;
            verticalVelocity = 0;
        }

        if (!checkCollisions(newPosition)) {
            player.position.copy(newPosition);
            playerCollider.center.copy(newPosition);
        }

        buildings.forEach((building, index) => {
            if (Math.abs(building.position.x - player.position.x) > 100 ||
                Math.abs(building.position.z - player.position.z) > 100) {
                scene.remove(building);
                buildings.splice(index, 1);
                generateBuilding();
            }
        });

        roads.forEach((road, index) => {
            if (Math.abs(road.position.x - player.position.x) > 100 ||
                Math.abs(road.position.z - player.position.z) > 100) {
                scene.remove(road);
                roads.splice(index, 1);
                generateRoad(Math.random() < 0.5);
            }
        });

        sidewalks.forEach((sidewalk, index) => {
            if (Math.abs(sidewalk.position.x - player.position.x) > 100 ||
                Math.abs(sidewalk.position.z - player.position.z) > 100) {
                scene.remove(sidewalk);
                sidewalks.splice(index, 1);
            }
        });

        light.position.set(player.position.x, player.position.y + 5, player.position.z);

        renderer.render(scene, camera);
    }

    animate();

    document.getElementById('restartButton').addEventListener('click', () => {
        window.location.reload();
    });

    const mobileButtons = {
        up: document.getElementById('upButton'),
        left: document.getElementById('leftButton'),
        down: document.getElementById('downButton'),
        right: document.getElementById('rightButton'),
        jump: document.getElementById('jumpButton'),
        run: document.getElementById('runButton')
    };

    let isMobile = window.innerWidth <= 500;

    window.addEventListener('resize', () => {
        isMobile = window.innerWidth <= 500;
    });

    function handleMobileButton(button, keyCode, isKeydown) {
        if (isKeydown) {
            keys[keyCode] = true;
            if (keyCode === 'shift') {
                moveSpeed = runMoveSpeed;
            }
        } else {
            keys[keyCode] = false;
            if (keyCode === 'shift') {
                moveSpeed = normalMoveSpeed;
            }
        }
    }

    Object.entries(mobileButtons).forEach(([direction, button]) => {
        const keyCode = direction === 'up' ? 'w' :
                        direction === 'left' ? 'a' :
                        direction === 'down' ? 's' :
                        direction === 'right' ? 'd' :
                        direction === 'jump' ? 'q' :
                        direction === 'run' ? 'shift' : null;

        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleMobileButton(button, keyCode, true);
        });

        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            handleMobileButton(button, keyCode, false);
        });
    });

    const artCanvas = document.getElementById('artCanvas');
    const artCtx = artCanvas.getContext('2d');

    function resizeArtCanvas() {
        artCanvas.width = window.innerWidth;
        artCanvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeArtCanvas);
    resizeArtCanvas();

    let dog = {
        x: artCanvas.width / 2,
        y: artCanvas.height - 100,
        size: 80,
        tailAngle: 0,
        earAngle: 0,
        tongueOut: false,
        tongueAngle: 0,
        blinkTimer: 0,
        eyesClosed: false
    };

    let stars = [];
    function initStars() {
        stars = [];
        for (let i = 0; i < artCanvas.width / 4; i++) {
            stars.push({
                x: Math.random() * artCanvas.width,
                y: Math.random() * (artCanvas.height / 2),
                size: Math.random() * 2 + 1,
                twinkle: Math.random()
            });
        }
    }
    initStars();

    function drawSky() {
        let gradient = artCtx.createLinearGradient(0, 0, 0, artCanvas.height);
        gradient.addColorStop(0, '#0f0f29');
        gradient.addColorStop(1, '#24243e');
        artCtx.fillStyle = gradient;
        artCtx.fillRect(0, 0, artCanvas.width, artCanvas.height);

        artCtx.fillStyle = '#fff';
        stars.forEach(star => {
            artCtx.globalAlpha = 0.5 + Math.sin(star.twinkle) * 0.5;
            artCtx.beginPath();
            artCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            artCtx.fill();
        });
        artCtx.globalAlpha = 1;
    }

    function drawMoon() {
        const moonSize = artCanvas.width * 0.05;
        artCtx.fillStyle = '#ffd54f';
        artCtx.beginPath();
        artCtx.arc(artCanvas.width - moonSize, moonSize, moonSize, 0, Math.PI * 2);
        artCtx.fill();

        artCtx.fillStyle = '#0f0f29';
        artCtx.beginPath();
        artCtx.arc(artCanvas.width - moonSize * 1.2, moonSize * 0.8, moonSize, 0, Math.PI * 2);
        artCtx.fill();
    }

    function drawHouse() {
        const houseWidth = artCanvas.width * 0.4;
        const houseHeight = artCanvas.height * 0.4;
        const houseX = (artCanvas.width - houseWidth) / 2;
        const houseY = artCanvas.height - houseHeight - 50;

        artCtx.fillStyle = '#4a4e69';
        artCtx.fillRect(houseX, houseY, houseWidth, houseHeight);

        artCtx.fillStyle = '#9a8c98';
        artCtx.beginPath();
        artCtx.moveTo(houseX - 50, houseY);
        artCtx.lineTo(houseX + houseWidth / 2, houseY - 100);
        artCtx.lineTo(houseX + houseWidth + 50, houseY);
        artCtx.closePath();
        artCtx.fill();

        const doorWidth = houseWidth * 0.1;
        const doorHeight = houseHeight * 0.4;
        artCtx.fillStyle = '#c9ada7';
        artCtx.fillRect(houseX + houseWidth / 2 - doorWidth / 2, houseY + houseHeight - doorHeight, doorWidth, doorHeight);

        const windowSize = houseWidth * 0.15;
        artCtx.fillStyle = '#f2e9e4';
        artCtx.fillRect(houseX + houseWidth * 0.2, houseY + houseHeight * 0.2, windowSize, windowSize);
        artCtx.fillRect(houseX + houseWidth * 0.65, houseY + houseHeight * 0.2, windowSize, windowSize);

        artCtx.strokeStyle = '#22223b';
        artCtx.lineWidth = 2;
        artCtx.strokeRect(houseX + houseWidth * 0.2, houseY + houseHeight * 0.2, windowSize, windowSize);
        artCtx.strokeRect(houseX + houseWidth * 0.65, houseY + houseHeight * 0.2, windowSize, windowSize);
        artCtx.beginPath();
        artCtx.moveTo(houseX + houseWidth * 0.2 + windowSize / 2, houseY + houseHeight * 0.2);
        artCtx.lineTo(houseX + houseWidth * 0.2 + windowSize / 2, houseY + houseHeight * 0.2 + windowSize);
        artCtx.moveTo(houseX + houseWidth * 0.2, houseY + houseHeight * 0.2 + windowSize / 2);
        artCtx.lineTo(houseX + houseWidth * 0.2 + windowSize, houseY + houseHeight * 0.2 + windowSize / 2);
        artCtx.moveTo(houseX + houseWidth * 0.65 + windowSize / 2, houseY + houseHeight * 0.2);
        artCtx.lineTo(houseX + houseWidth * 0.65 + windowSize / 2, houseY + houseHeight * 0.2 + windowSize);
        artCtx.moveTo(houseX + houseWidth * 0.65, houseY + houseHeight * 0.2 + windowSize / 2);
        artCtx.lineTo(houseX + houseWidth * 0.65 + windowSize, houseY + houseHeight * 0.2 + windowSize / 2);
        artCtx.stroke();
    }

    function drawDog() {
        artCtx.save();
        artCtx.translate(dog.x, dog.y);
        const scale = artCanvas.width / 600;
        artCtx.scale(scale, scale);

        artCtx.fillStyle = '#8B4513';
        artCtx.beginPath();
        artCtx.ellipse(0, 0, dog.size / 2, dog.size / 3, 0, 0, Math.PI * 2);
        artCtx.fill();

        artCtx.fillRect(-dog.size / 3, dog.size / 4, dog.size / 10, dog.size / 3);
        artCtx.fillRect(-dog.size / 6, dog.size / 4, dog.size / 10, dog.size / 3);
        artCtx.fillRect(dog.size / 6, dog.size / 4, dog.size / 10, dog.size / 3);
        artCtx.fillRect(dog.size / 3, dog.size / 4, dog.size / 10, dog.size / 3);

        artCtx.beginPath();
        artCtx.arc(-dog.size / 3, -dog.size / 4, dog.size / 4, 0, Math.PI * 2);
        artCtx.fill();

        artCtx.save();
        artCtx.rotate(Math.sin(dog.earAngle) * 0.2);
        artCtx.beginPath();
        artCtx.moveTo(-dog.size / 2, -dog.size / 3);
        artCtx.lineTo(-dog.size / 2.5, -dog.size / 2);
        artCtx.lineTo(-dog.size / 3.5, -dog.size / 3);
        artCtx.closePath();
        artCtx.fill();
        artCtx.restore();

        artCtx.save();
        artCtx.rotate(Math.sin(dog.earAngle + 0.5) * 0.2);
        artCtx.beginPath();
        artCtx.moveTo(-dog.size / 6, -dog.size / 3);
        artCtx.lineTo(-dog.size / 4, -dog.size / 2);
        artCtx.lineTo(-dog.size / 8, -dog.size / 3);
        artCtx.closePath();
        artCtx.fill();
        artCtx.restore();

        if (!dog.eyesClosed) {
            artCtx.fillStyle = '#000';
            artCtx.beginPath();
            artCtx.arc(-dog.size / 2.5, -dog.size / 3.5, dog.size / 20, 0, Math.PI * 2);
            artCtx.arc(-dog.size / 4, -dog.size / 3.5, dog.size / 20, 0, Math.PI * 2);
            artCtx.fill();

            artCtx.fillStyle = '#fff';
            artCtx.beginPath();
            artCtx.arc(-dog.size / 2.5 + dog.size / 60, -dog.size / 3.5 - dog.size / 60, dog.size / 60, 0, Math.PI * 2);
            artCtx.arc(-dog.size / 4 + dog.size / 60, -dog.size / 3.5 - dog.size / 60, dog.size / 60, 0, Math.PI * 2);
            artCtx.fill();
        } else {
            artCtx.strokeStyle = '#000';
            artCtx.lineWidth = 2;
            artCtx.beginPath();
            artCtx.moveTo(-dog.size / 2.3, -dog.size / 3.5);
            artCtx.lineTo(-dog.size / 2.7, -dog.size / 3.5);
            artCtx.moveTo(-dog.size / 3.8, -dog.size / 3.5);
            artCtx.lineTo(-dog.size / 4.2, -dog.size / 3.5);
            artCtx.stroke();
        }

        artCtx.fillStyle = '#000';
        artCtx.beginPath();
        artCtx.ellipse(-dog.size / 3, -dog.size / 5, dog.size / 20, dog.size / 30, 0, 0, Math.PI * 2);
        artCtx.fill();

        artCtx.strokeStyle = '#000';
        artCtx.lineWidth = 2;
        artCtx.beginPath();
        artCtx.moveTo(-dog.size / 3, -dog.size / 6);
        artCtx.quadraticCurveTo(-dog.size / 3.5, -dog.size / 10, -dog.size / 2.5, -dog.size / 6);
        artCtx.stroke();

        if (dog.tongueOut) {
            artCtx.fillStyle = '#FF69B4';
            artCtx.beginPath();
            artCtx.moveTo(-dog.size / 3, -dog.size / 8);
            artCtx.quadraticCurveTo(
                -dog.size / 3 - Math.sin(dog.tongueAngle) * dog.size / 10,
                -dog.size / 12,
                -dog.size / 3,
                -dog.size / 16 + Math.cos(dog.tongueAngle) * dog.size / 10
            );
            artCtx.quadraticCurveTo(
                -dog.size / 3 + Math.sin(dog.tongueAngle) * dog.size / 10,
                -dog.size / 12,
                -dog.size / 3,
                -dog.size / 8
            );
            artCtx.fill();
        }

        artCtx.strokeStyle = '#8B4513';
        artCtx.lineWidth = 10;
        artCtx.lineCap = 'round';
        artCtx.beginPath();
        artCtx.moveTo(dog.size / 2, 0);
        artCtx.quadraticCurveTo(
            dog.size / 1.5, 
            Math.sin(dog.tailAngle) * dog.size / 4, 
            dog.size, 
            Math.sin(dog.tailAngle) * dog.size / 2
        );
        artCtx.stroke();

        artCtx.restore();
    }

    function animateArt() {
        artCtx.clearRect(0, 0, artCanvas.width, artCanvas.height);
        
        drawSky();
        drawMoon();
        drawHouse();
        drawDog();

        dog.tailAngle += 0.1;
        dog.earAngle += 0.08;dog.tongueAngle += 0.2;

        if (Math.random() < 0.005) {
            dog.tongueOut = !dog.tongueOut;
        }

        dog.blinkTimer++;
        if (dog.blinkTimer > 100) {
            dog.eyesClosed = !dog.eyesClosed;
            if (dog.eyesClosed) {
                dog.blinkTimer = 0;
            } else {
                dog.blinkTimer = 90;
            }
        }

        stars.forEach(star => {
            star.twinkle += 0.05;
        });

        requestAnimationFrame(animateArt);
    }

    function updateDogPosition() {
        dog.x = artCanvas.width / 2;
        dog.y = artCanvas.height - 100;
    }

    window.addEventListener('resize', () => {
        resizeArtCanvas();
        initStars();
        updateDogPosition();
    });

    updateDogPosition();

    function startArtAnimation() {
        animateArt();
    }
  }, []);

  return (
    <div className="game-container">
      <div id="gameContainer">
    <canvas id="gameCanvas"></canvas>
    <div id="controls">
        <p>Ӳ̵̧̻̝̽ͅп̵̣̓̈́р̶̘̔͘а̷̹̠͖̬͂́͘в̸̬̲̟̿̐̒̀л̵̱̄̕е̸̯̐̊͂͝н̵̥͖́̃̐̾и̶̛̫̼͓̓̉̕е̵͉̗̜͈́̋̄͝:̵̢͕͉͔̔͌͛̂ ̴̹͔̽̀̚W̶͓͖͔̃ ̶̧̘̣͙̆̍̚-̴͕̰͚̈́̍̈́ ̴͓̍̂̇в̵̡̣̞̟̒̃п̸̳̘͚̼͐̋е̵̤̏р̴̫̅̾̆,̵̨̞͉̣̒̿̚ ̸͙͙̑͝ͅS̸͕̔͑͌͂-̸̬͖̮̮͑͘͝͠ ̶̰͎̪̐н̴̖̠̒͒а̶̥̘͙͌д̷̼̔,̴͈̪̯͌ ̶͖͓͌̇̓Ă̶̧͖̼ ̷͉͆̂̍-̸̡͇͛͛ ̶͚̂̉в̶̰̬̪̾͂̋̾ͅе̴͇̭͇̲̾̃в̶̳͙͕̘͂̕о̸͓̿͂,̵̫̬̜̪̏ ̵̢̫͍̯̽͌͝͠D̵̹͎̜͒́͠ ̶͇̳̦̔̐͂-̶͉̠̆ ̵̯̓̓̽в̶̩͐̇̀͆п̵̧̫͛ͅа̷̫͗о̵͖͠</p>
        <p>Š̵͓͔̞̿h̴͉̰̼̱͌͒̈́̃͗͝ḯ̷͚̩̌̑̓̕͝f̶̡̲̣͇́t̴̪̠͚̩̂̅̆̔̂͊ͅ ̶̭̦̩̈͠-̸̼̱̞̪̤̍̎ ̶̧̯̬̱̦͑́̎̐͋ͅб̷̰̬̓е̷̗̬̪̬̬̼̊̈̐͋̈г̷͓̹̪̪̼̒́̿́̀,̷̱͖̽ ̵̳̪̥̹͈͒Q̸͕̣̥̂͑͑̅̊͝ ̸̛͖͙͍̏͛̉͘-̶̨̜͚̣̹̄̍ ̴̹̮̭̒п̵̢̪̘̜̾̍р̷̜͚̀ы̵͎̒̉ж̸̗̥̰͍͋̂̌̑͜͜о̸̛̖͉͘ќ̷̫͚͎͖̱</p>
        <p>М̷̨̘͉̠͔̣̍̏̌͝ы̷͔̫͙̃͛̓̃͜ш̵̛̛̞͍̟̫̥̦͊͑̆͠ь̴͎̠̫̓̈̌̈̍:̵̢̛̫͍̘̼̜̇̈̃̂̀ ̴̧̥͙̦͎̀П̵̧̢̮͘͜о̵̛̥̭̰͙̣̿̽̈́̔р̷̫̮̓̏̋͘о̴͍̲̠̹̟̫͝т̷̙͈̣̎̏͌̍͝ ̷̬̣̋͋͜͠͝к̶͔̪̥͉̎̍̾͌̓а̶̣̱̉͊̑͌̇м̵̧̨͚͛̈́е̴̛͉̪͇̣͐͐ӹ̸̻́͝</p>
        <p>Н̴͍̊̈́͑͝а̸̻̘̟̋ͅй̸̯͉̋д̴̭̤̀̉͐̕и̵̻͔͎̓ ̶͍̫̬͎̒͊̂P̴̗̗̝̈́́̏͘ë̵͔̳̻̋̄̈́t̵̝͓͋Ḩ̷̣̙͐͝o̷͎̪̻̽̿̈m̸̳͍͇͠e̸͖̖͓̭͝,̷̧̹͎͔͘ ̵̼̯͔͇̀̔̍̕ч̸̘̞̰͌̈́̈́т̵̼̦͓̪̊̎о̷͍̒́б̶̨͇͇̜̏̓ы̸͙͔̯̬̅̆̿̂ ̶͚̏̌̐̋з̶̢̩͊а̶̝͗к̴̥͆ӧ̵̛̖̋̒н̷͇͚̋͂̿̇ч̷̡͚̀̿͘и̷̥͑̽̕т̵̨̧̙͋͛̀ь̶̨̤̗̓̚ ̸̲̘̬̉̌́и̷͉̤̋г̷̨̥̼͌͋͝р̴͇̃̈́у̵̤̌̾͛̇ͅ.̶͕̭͑.̵͈͈͍̓.̴̞̺͙̗͂̓͗</p>
    </div>
    <div id="mobileControls">
        <button id="upButton" className="mobileButton">↑</button>
        <button id="leftButton" className="mobileButton">←</button>
        <button id="downButton" className="mobileButton">↓</button>
        <button id="rightButton" className="mobileButton">→</button>
        <button id="jumpButton" className="mobileButton">↑↑</button>
        <button id="runButton" className="mobileButton">⚡</button>
    </div>
</div>
<div id="gameOver">
    <canvas id="artCanvas"></canvas>
    <div id="victoryText">Поздравляем! Вы победили!</div>
    <button id="restartButton">Начать заново</button>
</div>
    </div>
  );
};

export default SecretGame;