var trexAnim,trex,edges,ground,groundAnim,iground,isky,icloud,o1,o2,o3,
o4,o5,o6,t2,r,g,d,j,c,bg="white"
var hs=0
var score=0
var PLAY=0;
var END=1;
var gamestate=PLAY
var cgroup,ogroup
var r2,g2
function preload()
{
     trexAnim= loadAnimation("trex1.png","trex3.png","trex4.png")
     groundAnim=loadImage("ground2.png")
     icloud=loadImage("cloud.png")
     o1=loadImage("obstacle1.png")
     o2=loadImage("obstacle2.png")
     o3=loadImage("obstacle3.png")
     o4=loadImage("obstacle4.png")
     o5=loadImage("obstacle5.png")
     o6=loadImage("obstacle6.png")
     t2=loadImage("trex_collided.png")
     r=loadImage("restart.png")
     g=loadImage("gameOver.png")
     d=loadSound("die.mp3");
     j=loadSound("jump.mp3");
     c=loadSound("checkPoint.mp3");
}

function setup() 
{
      createCanvas(600,200);

      trex=createSprite(200,195,10,10)
      trex.addAnimation("t1",trexAnim)
      trex.scale=0.6
      trex.x=50
      trex.debug=false
      trex.setCollider("circle",-5,0,40)

      edges=createEdgeSprites()

      ground=createSprite(300,190,600,10)
      ground.addImage("g1",groundAnim)
      iground=createSprite(300,197,600,10)
      iground.visible=false
      cgroup=createGroup();
      ogroup=createGroup();
      //isky=createSprite(300,65,600,10)
      //isky.visible=false
  
  
  
    r2=createSprite(300,125,10,10 )
    r2.addImage("r3",r)
    r2.scale=0.4
    g2=createSprite(300,75,10,10)
    g2.addImage("g3",g)
    g2.scale=0.7
      
}

function draw() 
{
   background(bg);
  if(gamestate===PLAY)
  {
    g2.visible=false
    r2.visible=false
    if(keyDown("space")&&trex.y>159)
      {
          trex.velocityY=-12
           j.play()
      }
    
   trex.velocityY=trex.velocityY+0.6
      if(ground.x<0)
      {
        ground.x=ground.width/2  
      }     
      
      ground.velocityX=-(10+3*score/100)
      
      score=Math.round(frameCount/4)
      if (trex.isTouching(ogroup))  
      {
        gamestate=END
       // trex.velocityY=-12
        //j.play()
        d.play()
      }
      
      if(score%100===0&&score>12)
      {
        c.play()
        
        var rr1=Math.round(random(0,1))
        switch(rr1)
        {
          case 0:bg="black"
            break
          case 1:bg="white"
            break
          default:bg=random(0,220)
            break
        }
      }
    }
  else if(gamestate===END)
  {
    g2.visible=true
    r2.visible=true
    ground.velocityX=0;
    ogroup.setVelocityXEach(0)
    cgroup.setVelocityXEach(0)
    trex.velocityY=0
    trex.addImage("t1",t2)
    textSize(18)
    text("high score="+hs,475,75)
    cgroup.setLifetimeEach(-1)
  }
 if(mousePressedOver(r2)&&gamestate===END)
 {
    reset()
 }
      textSize(18)
      text("score:"+score,500,100)
      var r1= Math.round(random(1,100))
      //console.log(r1)
      

      
  
      trex.collide(iground)
      //trex.collide(isky)
      var r11=Math.round(random(1,6))
      //String Concatenation
      //console.log("obstacle"+r11)
      //  console.log(trex.y)
      spawnClouds();
      spawnObs();
      drawSprites();
}
function spawnClouds()
{
 if(frameCount%60===0)
 {
     var clouds
     clouds=createSprite(650,25,10,10)
     clouds.addImage("c1",icloud)
     clouds.scale=0.7
     clouds.velocityX=-(3+3*score/100)
     clouds.lifetime=220
     // console.log(clouds.depth)
     clouds.y=random(25,50)
     trex.depth=clouds.depth+1
   cgroup.add(clouds)
 }
 
}
function spawnObs()
{
 if(frameCount%100===0) 
 {
  var obs 
  obs=createSprite(650,170,10,10)
  obs.velocityX=-(3+3*score/100)
  
  var rd=Math.round(random(1,6))
  switch(rd)
  {
        case 1:obs.addImage("o7",o1)  
      obs.scale=0.9
        break 
        case 2:obs.addImage("o8",o2)
      obs.scale=0.6
        break 
        case 3:obs.addImage("o9",o3)
      obs.scale=0.5
        break
        case 4:obs.addImage("o10",o4)
      obs.scale=0.5
        break
        case 5:obs.addImage("o11",o5)
      obs.scale=0.6
        break
        case 6:obs.addImage("o12",o6)
      obs.scale=0.4
        break 
        default:break
  }
   ogroup.add(obs);
   
   
   
         
   
   
   
   
 }
  
}
function reset()
  {
   if(score>hs)
       {
         hs=score
       }
    else if(hs>score)
            {
              hs=hs
            } 
   gamestate=PLAY
   ogroup.destroyEach()
   cgroup.destroyEach()
   trex.addAnimation("t1",trexAnim)
   score=0
   frameCount=0
   score=Math.round(frameCount/4)
  }
  
