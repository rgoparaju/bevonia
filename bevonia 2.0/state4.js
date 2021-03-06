var bevonia, bevX, bevY, dragonSprite, healthBar, dragonHealth = 100, healthBarScaleX = 12
var centerX = 533, centerY = 250;
var aoe, aoeNextCast = 0, aoeCastRate = 1000;
demo.state4 = function(){}
demo.state4.prototype = {
    preload: function(){
        game.load.image('walls','assets/sprites/wall sprite 2.png')
        game.load.image('background','assets/sprites/blank background 2.png')
        game.load.spritesheet('bevonia', 'assets/sprites/Bevonia.png',32,48)
        game.load.spritesheet('dragon','assets/sprites/dragon1.png',64,128)
        
        // SPELL SPRITES
        game.load.spritesheet('aoeProjectile', "assets/sprites/AoE Projectile.png", 32, 32);
        game.load.spritesheet("aoeBlast", "assets/sprites/AoE Blast.png", 96, 96);
        
        //FIREBALL
        game.load.image('fireball','assets/sprites/fireballPrelim.png');
        
        // Dragon health
        game.load.image('health bar', 'assets/sprites/health bar.png');
        
        //SOUNDS
        game.load.audio('jump', 'assets/sounds/jump.mp3');
        game.load.audio('aoe', 'assets/sounds/aoe.mp3');
        game.load.audio('cast', 'assets/sounds/cast.mp3');
        
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE)
        game.world.setBounds(0,0, 2000, 500)
        
        game.add.sprite(0,0,'background')
        
        jumpSound = game.sound.add("jump");
        aoeSound = game.sound.add('aoe');
        castSound = game.sound.add('cast');
        
        fireballs = game.add.group();
        
        // Set up wall objects
        wallGroup1 = game.add.group()
        for(var x = 0; x < (15*32); x += 32)
            for(var y = 0; y < (6*36); y += 36)
                wallGroup1.create(x,y,'walls')
        
        wallGroup2 = game.add.group()
        for(var x = 0; x < (15*32); x += 32)
            for(var y = 300; y < 500; y += 36)
                wallGroup2.create(x,y,'walls')
        
        wallGroup3 = game.add.group()
        for(var x = (15*32); x < 2000; x += 32)
            wallGroup3.create(x,0,'walls')
        
        wallGroup4 = game.add.group()
        for(var x = 620; x < (586+32*4); x += 32)
            for(var y = 175; y < 500; y+= 36)
                wallGroup4.create(x,y,'walls')
        
        wall1 = game.add.sprite(620-32,400,'walls')
        
        wallGroup5 = game.add.group()
        for(var x = 880; x < (880 + 32*6); x+= 32)
            wallGroup5.create(x,250,'walls')
        
        wallGroup6 = game.add.group()
        for(var x = 1200; x < (1200+32*7); x+=32)
            wallGroup6.create(x,365,'walls')
        
        wallGroup7 = game.add.group()
        for(var x = 1450; x < (1450+32*5); x += 32)
            wallGroup7.create(x,225,'walls')
        
        wallGroup8 = game.add.group()
        for(var y = 36; y < 36*8; y += 36)
            wallGroup8.create((2000-32),y,'walls')
        
        wallGroup9 = game.add.group()
        for(var x = 1700; x < 2000; x+=32)
            for(var y = 400; y < 500; y += 36)
                wallGroup9.create(x,y,'walls')
        
        
        bevonia = game.add.sprite(100, 275, 'bevonia')
        
        // Setup physics for environment 
        game.physics.enable([bevonia, wallGroup1,wallGroup2,wallGroup3,wallGroup4,wall1,wallGroup5,wallGroup6,wallGroup7,wallGroup8,wallGroup9])
        wallGroup1.setAll('body.immovable',true)
        wallGroup2.setAll('body.immovable',true)
        wallGroup3.setAll('body.immovable',true)
        wallGroup4.setAll('body.immovable',true)
        wallGroup5.setAll('body.immovable',true)
        wallGroup6.setAll('body.immovable',true)
        wallGroup7.setAll('body.immovable',true)
        wallGroup8.setAll('body.immovable',true)
        wallGroup9.setAll('body.immovable',true)
        wall1.body.immovable = true
        
        // Add Bevonia's animations
        bevonia.anchor.setTo(.5, .5)
        bevonia.animations.add('run', [2, 3, 4, 5], 0, true)
        bevonia.animations.add('jump', [1], 0, true)
        bevonia.animations.add('idle', [0], 0, true)
        bevonia.animations.add('melee',[6],0,true)
        
        bevonia.body.gravity.y = 1200
        //bevonia.body.collideWorldBounds = true
        game.camera.follow(bevonia)
        game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 500)
        
        
        // Add dragon and animations
        dragonSprite = game.add.sprite(1500,300,'dragon')
        dragonSprite.animations.add('attack',[0,1],5,true)
        game.physics.enable([dragonSprite])
        dragonSprite.scale.setTo(2,2)
        dragonSprite.body.immovable = true
        
        //Dragon health bar
        healthBar = game.add.sprite(1000,40,'health bar')
        healthBar.scale.setTo(healthBarScaleX,3)
    
    },

    shotMe: function(bevonia, fireball){
        fireball.kill();
    }, 
    
    update: function(){
        var collision = game.physics.arcade.collide(bevonia,[wallGroup1,wallGroup2,wallGroup3,wallGroup4,wallGroup5,wallGroup6,wall1,wallGroup7,wallGroup8,wallGroup9,dragonSprite])
        
        bevonia.body.velocity.x = 0
        
        if(bevonia.x < 0) bevonia.x = 0
        if(bevonia.x > 2000) bevonia.x = 2000
        if(bevonia.y > 460) {
            game.state.start(game.state.current);
        }
        
        dragonBehavior()
           
        bevoFace = game.input.keyboard.isDown(Phaser.Keyboard.D) -game.input.keyboard.isDown(Phaser.Keyboard.A);     
        if(bevoFace == 0) bevonia.animations.play('idle',0,false)
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
            bevonia.body.velocity.x = -250
            bevonia.animations.play('run', 8, true)
            bevonia.scale.x = -1
            }
        if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
            bevonia.body.velocity.x = 250
            bevonia.animations.play('run', 8, true)
            bevonia.scale.x = 1
        }
        if(game.input.keyboard.isDown(Phaser.Keyboard.W) && bevonia.body.touching.down){
            bevonia.body.velocity.y = -600
            jumpSound.play()
        }
        if(!bevonia.body.touching.down) bevonia.animations.play('jump', 1, true)
        
        dragonSprite.animations.play('attack',1,true) //dragonBehavior(bevonia.x,bevonia.y)
        
        if(game.input.activePointer.isDown) bevonia.animations.play('melee',1,true);
        
        if(game.input.keyboard.isDown(Phaser.Keyboard.K) && game.time.now >= aoeNextCast) {
            // Only AoE spell, will have to work out more efficient way later
            aoeNextCast = game.time.now + aoeCastRate;
            aoe = game.add.sprite(bevonia.x, bevonia.y, "aoeProjectile");
            aoe.anchor.setTo(.5, .5);
            game.physics.enable(aoe);
            aoe.animations.add("exist", [0, 1]);
            castSound.play();
            aoe.animations.play("exist", 10, true);
            aoe.body.velocity.x = 500;
            aoe.body.velocity.y = -150;
            aoe.body.gravity.y = 1200;
            
            // Quick solution to making explosion animation
        }
        
        fireballs.forEach(function(fireball){
            game.physics.arcade.accelerateToObject(fireball, bevonia, 500);
            
        }, this);
        
        
        game.physics.arcade.collide(bevonia, fireballs, this.shotMe);
        
        fireballs.forEachExists(function(fireball){
            if (fireball.outOfBoundsKill) {
//                fireball.kill();
            }
        }, this);
        
            if (dragonSprite.lastShotFired < game.time.time){
            dragonSprite.lastShotFired = game.time.time + 2500;
            var fireball = fireballs.getFirstDead();
            if (fireball == null){
                if (bevonia.x > 1000){
                fireball = fireballs.create(dragonSprite.x, dragonSprite.y+60, 'fireball');
                fireball.lifespan = 2500;
                game.physics.arcade.enable(fireball);
                fireball.checkWorldBounds = true;
                fireball.outOfBoundsKill = true;
                console.log(fireball.body.x);
                
                }

            } else {
                fireball.reset(dragonSprite.x, dragonSprite.y + 60);
            }
            }
        
        
        if(game.time.now < aoeNextCast) {
            if(game.physics.arcade.overlap(aoe, dragonSprite)) {
                var boom = game.add.sprite(aoe.x, aoe.y, "aoeBlast");
                boom.anchor.setTo(.5, .5);
                boom.scale.setTo(1.5, 1.5);
                boom.animations.add("explode", [0, 1, 2, 3, 4, 5, 6, 7]);
                aoeSound.play();
                aoe.kill();
                boom.animations.play("explode", 8, false);
                
                //lowers dragon health, then kills when depleted
                healthBarScaleX -= 0.1*12
                healthBar.scale.setTo(healthBarScaleX,3)
                dragonHealth -= 10
                
                if(dragonHealth <= 0) dragonSprite.kill();
                
            }
        }
    },
}


function dragonBehavior(){
        dragonSprite.body.velocity.y = 100
        if(dragonSprite.y > 400) dragonSprite.body.velocity.y = -100
        if(dragonSprite.y < 100) dragonSprite.body.velocity.y = 100
}








