window.onload = function() {

  var canvas = document.getElementById("cvs"),
    c = canvas.getContext("2d");
    canvas.width = 345;
    canvas.height = 495;

  function Particle(x,y) {

    this.x = x;
    this.y = y;
    this.fade = 1;
    this.size = Math.random()*10;
    this.color1 = Math.floor(Math.random()*255);
    this.color2 = Math.floor(Math.random()*255);
    this.color3 = Math.floor(Math.random()*255);

    this.show = function() {
      c.beginPath();
      c.arc(this.x,this.y,this.size,0,Math.PI*2,true);
      c.fillStyle = "rgba("+this.color1+","+this.color2+","+this.color3+","+this.fade+")";
      c.fill();
    }

    this.update = function() {
      this.fade -= 0.02;
    }
  }

  var ParticleArr = [];

  if(/iphone|ipad|android/im.test(navigator.userAgent)) {
    canvas.addEventListener('touchmove', function(e){
        var touch = e.changedTouches[0];
        var touchX = parseInt(touch.clientX) - c.canvas.offsetLeft;
        var touchY = parseInt(touch.clientY) - c.canvas.offsetTop;
        e.preventDefault();

      if(Math.random()*1 < 0.33) {
        touchX+=5;
        touchY+=5;
      } else if(Math.random()*1 > 0.33 && Math.random()*1 < 0.66) {
        touchX-=5;
        touchY-=5;
      }

      for(var i = 0; i < 1; i++){
        ParticleArr.push(new Particle(touchX,touchY));
      }

    });

  } else {
  canvas.addEventListener('mousemove', function(event){

    var mouseX = event.clientX - c.canvas.offsetLeft;
    var mouseY = event.clientY - c.canvas.offsetTop;

    if(Math.random()*1 < 0.33) {
      mouseX+=5;
      mouseY+=5;
    } else if(Math.random()*1 > 0.33 && Math.random()*1 < 0.66) {
      mouseX-=5;
      mouseY-=5;
    }

    for(var i = 0; i < 1; i++){
      ParticleArr.push(new Particle(mouseX,mouseY));
    }

  });

}

  setInterval(function() {
    c.fillStyle = "black";
    c.fillRect(0,0,345,495);

    for(var i in ParticleArr) {
      var particle = ParticleArr[i];
      particle.show();
      particle.update();
    }

  }, 1);

};