
song = "";
let poseNet;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}

function modelLoaded() {
    console.log("modelo carregado")
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill('#ff0000');
    stroke('#ff0000');

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);

        if (rigthWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Velocidade x 0.5";
            song.rate(0.5);
        }
        else if (rigthWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Velocidade x 1";
            song.rate(1);
        }
        else if (rigthWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Velocidade x 1.5";
            song.rate(1.5);
        }
        else if (rigthWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Velocidade x 2";
            song.rate(2);
        }
        else if (rigthWristY > 400) {
            document.getElementById("speed").innerHTML = "Velocidade x 2.5";
            song.rate(2.5);
        }
    }

    if (scoreLeftWrist > 0.2) {

        circle(leftWristX, leftWristY, 20)
        inNumberleftWristY = Number(rightWristY);
        remover_decimals = floor(inNumberleftWristY);
        volume = remover_decimals / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play()
    song.setVolume(1);
    song.rate(1);
}