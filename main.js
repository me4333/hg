prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/U8d--9fyK/',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded Successfully!");
}
function check() {
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
     
        if(results[0].label == "yo"){
            document.getElementById("result_emoji").innerHTML = "&#129304;";
        
        }
       else if(results[0].label == "punch"){
            document.getElementById("result_emoji").innerHTML = "&#9994;";
        
        }
       else if(results[0].label == "victory"){
            document.getElementById("result_emoji").innerHTML = "&#9996;";
        
        }
        else{ 
            document.getElementById("result_emoji").innerHTML = "&#128077;";}
           
        
        
    }
}