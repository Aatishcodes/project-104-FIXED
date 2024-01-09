// https://teachablemachine.withgoogle.com/models/V3WMEN2A_/



Webcam.set({
    width: 340,
    height: 300,
    image_format: "jpeg",
    jpeg_quality: 90
});

camera = document.getElementById("camera")
Webcam.attach(camera)



function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });

}


prediction_1 = ""
prediction_2 = ""


classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/V3WMEN2A_/model.json", modelLoaded)


function modelLoaded() {
    console.log("model has been loaded")


}

function speak() {
    var synth = window.speechSynthesis
    speakdata_1 = "The first prediction is - " + prediction_1
    speakdata_2 = "The second prediction is - " + prediction_2
    var utterthis = new SpeechSynthesisUtterance(speakdata_1 + speakdata_2)
    synth.speak(utterthis)
}


function identify_emotion() {
    img = document.getElementById("captured_image")

    classifier.classify(img, got_result)

}

function got_result(error, result) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(result)
        document.getElementById("result_emotion_name").innerHTML = result[0].label
        document.getElementById("result_emotion_name2").innerHTML = result[1].label
        prediction_1 = result[0].label
        prediction_2 = result[1].label
        speak()

        if(prediction_1 == "Happy") {
            document.getElementById("emoji_image_1").innerHTML = "😄"
        }

        if(prediction_1 == "Sad") {
            document.getElementById("emoji_image_1").innerHTML = "😢"
        }

        if(prediction_1 == "Angry") {
            document.getElementById("emoji_image_1").innerHTML = "😡"
        }

        if(prediction_2 == "Happy") {
            document.getElementById("emoji_image_2").innerHTML = "😄"
        }

        if(prediction_2 == "Sad") {
            document.getElementById("emoji_image_2").innerHTML = "😢"
        }

        if(prediction_2 == "Angry") {
            document.getElementById("emoji_image_2").innerHTML = "😡"
        }


    }


}