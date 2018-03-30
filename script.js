var theSong = " ";
var theArt = " ";
var song = 0;
var albumPic;
var currentTrack;
var numOfSongs = 5;
var offset = 0;
var easing = 0.05;

//connecting to API with given client id
SC.initialize({
    client_id: 'd6i0wruU7ddayTqrhwszluW0i9aNBlb1',
});

function playSong(firstID){
    //streaming first song in the search
    SC.stream(('/tracks/'+firstID)).then(function(player){
        player.play();
    });
}

//first required method for p5.js, runs in the beginning only once
function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    background(255);
    albumPic = loadImage(theArt);
    //getting all the tracks with the search 'q' (you can change 
    //up the search to see other songs) and using the title 
    //and the album photo to display
    SC.get('/tracks', {
        //when changing the value for q, you must change is also in the mouse pressed method
        q: 'tame impala' //picked tame bc I like them :)
    }).then(function(tracks) {
        var firstID = tracks[0].id;
        currentTrack = tracks[song];
        theSong = tracks[song].title;
        theArt = tracks[song].artwork_url;
        albumPic = loadImage(theArt);
        playSong(firstID);
    });
}

//second required method for p5.js, runs constantly
function draw(){
    background(255);
    if(song == 0){
        //levels sketch
        for (var i = 0; i < innerHeight; i++) {
            var r = random(-innerWidth/2, innerWidth/2);
            stroke(150);
            line(50,i,50+r,i);
        }
    }else if(song == 1){
        //feather sketch
        stroke(150);
        strokeWeight(2);
        for (var i = 0; i < innerHeight; i += 50) {
            bezier(mouseX, i, 10, 10, 90, 90, 15, 90);
            bezier(80, 100, 10, 10, 90, 90, mouseX, i);
        }

    }else if( song == 2){
        //stars sketch
        push();
        frameRate(100);
        translate(width*0.5, height*0.5);
        for (var i = 0; i < 6; i++) {
            var r1 = random(-innerWidth/2, innerWidth/2);
            var r2 = random(-innerWidth/2, innerWidth/2);
            var c1 = random(255);
            var c2 = random(255);
            var c3 = random(255);
            stroke(150);
            star(r1, r2, 80, 100, 40); 
        }
        pop();
    }else if( song == 3){
        //dots everywhere sketch
        for(var i = 0; i < 100; i++) {
            var x = random(innerWidth);
            var y = random(innerHeight);
            strokeWeight(5);
            stroke(175);
            point(x, y);
        }
    }else if(song == 4){
        //strange line sketch
        stroke(175);
        strokeWeight(3);
        curve(mouseX, 100, mouseX, mouseY, 73, 24, 73, 61);
        curve(100, 400, 300, mouseY, 50, 80, 500, 30, mouseY);
        curve(100, mouseY, 500, mouseY, 100, 450, mouseX, 300, mouseY);
        curve(mouseX, 500, mouseX, 500, mouseX, 100, window.innerHeight, 100);
        curve(window.innerWidth, 400, mouseX, 600, window.innerHeight, mouseX, 500, 30, 100);
        curve(100, mouseY, mouseX, 60, window.innerHeight, window.innerWidth, 400, mouseY, 30);
        curve(400, window.innerHeight, 100, window.innerHeight, mouseX, mouseY, 600, window.innerHeight, 30);
    }

    stroke(0);
    fill(0);
    textSize(32);
    strokeWeight(1);
    //image and title from the search
    text(theSong, 10, 100); 
    image(albumPic, 10, 120, 250, 250);
    filter(GRAY); //filter on original album pic
    //creating the offset transparent images
    var dx = (mouseX-albumPic.width) - offset;  
    offset += dx * easing;
    tint(255, 127); 
    image(albumPic, offset, 120, 250, 250);
    image(albumPic, offset, 220, 250, 250);
    image(albumPic, offset, 320, 250, 250);
}

function mousePressed(){
    
    //moving through the array of tracks
    song++;
    if(song > numOfSongs-1){
        song = 0
    }

    //next track in the search from the API
    SC.get('/tracks', {
        q: 'tame impala'
    }).then(function(tracks) {
        currentTrack = tracks[song];
        theSong = tracks[song].title;
        theArt = tracks[song].artwork_url;
        albumPic = loadImage(theArt);
    });
}

//method from p5.js reference page
function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
