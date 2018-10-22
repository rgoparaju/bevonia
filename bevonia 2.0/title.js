demo.title = function (game) {};
demo.title.prototype = {
    preload:function(game){
        game.load.image("titlescreen", "assets/sprites/titlescreen.png");
        game.load.image("button", "assets/sprites/button.png");
        game.load.image('titleBackground', 'assets/tilesets_backgrounds/titleBackground.png');
        
        // Sound effects
         game.load.audio('jump', 'assets/sounds/jump.mp3');
        game.load.audio('aoe', 'assets/sounds/aoe.mp3');
        game.load.audio('cast', 'assets/sounds/cast.mp3');
                
        
        
        // Music
        game.load.audio('titleMusic', 'assets/sounds/menu.mp3');
    },
    create:function(game){
        
        titlescreenBackground = game.add.sprite(100,0,'titleBackground');
        
        this.createButton(game,"Play",game.world.centerX,game.world.centerY+32,200,50,function(){
            this.state.start('state1');
            backgroundMusic.stop();
        });
        
        this.createButton(game,"Tutorial",game.world.centerX,game.world.centerY+152,200,50,function(){
            this.state.start('tutorial');
            backgroundMusic.stop();
        });
        
        titlescreen = game.add.sprite(game.world.centerX,game.world.centerY-152,'titlescreen');
        titlescreen.anchor.setTo(0.5,0.5);
        
        backgroundMusic = game.add.audio('titleMusic');
        backgroundMusic.loop = true;
        backgroundMusic.play();
        
    },
    update:function(game){
        
    },
    
    createButton: function(game,string,x,y,w,h,callback){
        var button1 = game.add.button(x,y,'button',callback,this,2,1,0);
        
        button1.anchor.setTo(0.5,0.5);
        button1.width = w;
        button1.height = h;
        
        var txt = game.add.text(button1.x,button1.y,string,
                                {
            font:"14px Arial", 
            fill:"#fff",
            align:"center"
        });
        
        txt.anchor.setTo(0.5,0.5);
        
    }
};