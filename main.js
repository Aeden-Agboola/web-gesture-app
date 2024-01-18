p1 = ""
p2 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

Webcam.attach("#camera")

function take_snapshot() {
    Webcam.snap(function (pic) {
        document.getElementById("result").innerHTML = '<img id="cam_pic" src="' + pic + '">';
    });
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/PvLicMwil/model.json", modelLoaded)

function modelLoaded() {
    console.log("model loaded succesfully")
}

function check() {
    img = document.getElementById("cam_pic");
    classifier.classify(img, gotResult)
}

function gotResult(e, r) {
    if (e) {
        console.error(e)
    } else {
        console.log(r);
        p1 = r[0].label;
        p2 = r[1].label;
        document.getElementById("emotion_name1").innerHTML = p1;
        document.getElementById("emotion_name2").innerHTML = p2;
        if (p1 == "normal") {
            document.getElementById("emoji1").innerHTML = "&#128522";
        }
        if (p1 == "sad") {
            document.getElementById("emoji1").innerHTML = "&#128546";
        }if (p1 == "happy") {
            document.getElementById("emoji1").innerHTML = "&#128532";
        }
        if (p1 == "angry") {
            document.getElementById("emoji1").innerHTML = "&#128545";
        }
        
        if (p2 == "normal") {
            document.getElementById("emoji2").innerHTML = "&#128522";
        }
        if (p2 == "sad") {
            document.getElementById("emoji2").innerHTML = "&#128546";
        }if (p2 == "happy") {
            document.getElementById("emoji2").innerHTML = "&#128532";
        }
        if (p2 == "angry") {
            document.getElementById("emoji2").innerHTML = "&#128545";
        }
        speak()

        

    }
}

function speak(){
    speak_text = "prediction 1 is "+ p1 + " 22222222222222222222222222222222222222and prediction 2 is "+ p2;
    speak_audio = new SpeechSynthesisUtterance(speak_text);
    window.speechSynthesis.speak(speak_audio)

}