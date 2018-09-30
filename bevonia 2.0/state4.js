var demo = {}, bevonia
demo.state4 = function(){}
demo.state4.prototype = {
    preload: function(){
        game.load.image('walls','assets/sprites/wall sprite 2.png')
        game.load.image('background','assets/sprites/blank background 2.png')
        game.load.spritesheet('bevonia', 'assets/sprites/Bevonia.png',32,48)
        
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE)
        game.world.setBounds(0,0, 800, 500)
        
        game.add.sprite(0,0,'background')
        
        
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
        
        
        bevonia.anchor.setTo(.5, .5)
        bevonia.animations.add('run', [2, 3, 4, 5], 10, true)
        bevonia.animations.add('jump', [1], 0, true)
        bevonia.animations.add('idle', [0], 0, true)
        
        bevonia.body.gravity.y = 1200
        //bevonia.body.collideWorldBounds = true
        game.camera.follow(bevonia)
        game.camera.deadzone = new Phaser.Rectangle(500, 0, 500, 500)
       
        
    },
    update: function(){
        var collision = game.physics.arcade.collide(bevonia,[wallGroup1,wallGroup2,wallGroup3,wallGroup4,wallGroup5,wallGroup6,wall1,wallGroup7,wallGroup8])
        
        bevonia.body.velocity.x = 0
        
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
        }
        if(!bevonia.body.touching.down) bevonia.animations.play('jump', 1, true)
        
    }
}













