let video = document.querySelector("video");
let canvas = document.querySelector("canvas");
let seekedimg = document.querySelector(".seekedimg");
let seekedbar = document.querySelector(".seekedbar");
let seeked = document.querySelector(".seeked");
let divv = document.querySelector(".div");

let seek = false
// video.oncanplay
class Frame {
  constructor(video, options = {}) {
    this.video = video;
    this.frameviddeo = document.createElement("video");
    this.canvas = document.createElement("canvas");
    this.frameviddeo.src = this.video.src;
   
    this.frameviddeo.width = options.width || this.video.offsetWidth || "200";
    this.frameviddeo.height = options.height || this.video.offsetHeight || "100";

    this.canvas.width = this.frameviddeo.width;
    this.canvas.height = this.frameviddeo.height;
    this.ctx = this.canvas.getContext("2d");

    this.ctx.drawImage(
      this.frameviddeo,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.frameviddeo.load();
  }

  canvas_(vid) {
    this.ctx.fillStyle = "blue";

    this.ctx.drawImage(
      vid,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

   
    this.ctx.fill();
    

    let data = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    
    return this.canvas.toDataURL();
  }

  getcurrenttimeframe() {
    return new Promise((res, rej) => {
     
     

    res(this.canvas_(this.video));
   
    });
  }

  getframe(e) {
    return new Promise((res, rej) => {
      this.frameviddeo.currentTime = e;

      this.frameviddeo.onseeked = (e) => {
        // console.log("kfkfkfk", this.canvas_())
        res(this.canvas_(this.frameviddeo));
      };
    });
    // return(this.canvas_())
  }
}

let frame = new Frame(video);
video.onclick = async () => {
  // let b = await frame.getframe(5);
  let b = await frame.getcurrenttimeframe();
 
};

let on

// console.log(video.duration);
let width = video.currentTime * seeked.offsetWidth / video.duration
seekedbar.style.width = `${width}px`
setInterval(async (e) => {
  if (on && video.paused == false) {
    
  


    
    if (!seek) {
      width > seeked.offsetWidth / 2 ? seekedimg.style.left = `${width - seekedimg.offsetWidth}px` : seekedimg.style.left = `${width}px`
        
      let url = await frame.getcurrenttimeframe()
     
      seekedimg.src = url
    }
  }

}, 10);

seeked.addEventListener("click", e => {
 seekedbar.style.width = `${e.offsetX}px`;
    

    video.currentTime=e.offsetX/(seeked.offsetWidth/video.duration)


     
 })






divv.onmouseover = () => {
   on = true
 }

divv.onmouseout = () => {
   on = false
 }

seeked.addEventListener("mouseout", async e => {
    seek  = false
})
seeked.addEventListener("mousemove", async e => {
    console.log("ff")
    time = e.offsetX / (seeked.offsetWidth / video.duration);
     let width =e.offsetX
  
    width>seeked.offsetWidth/2? seekedimg.style.left=`${width-seekedimg.offsetWidth}px`:seekedimg.style.left=`${width }px`
    seek = true
    let b = await frame.getframe(time);
    seekedimg.src=b
})
