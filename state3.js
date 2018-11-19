var bevonia
var map3, platforms3, traps3
demo.state3 = function(){}
demo.state3.prototype = {
    preload: function () {
        game.load.tilemap('level3', 'assets/tilemaps/level 3 v2.json', null, Phaser.Tilemap.TILED_JSON)  
        
    

        
    },
    create: function () {
        var background3 = game.add.sprite(0,10,'bg3')
        
        var map3 = game.add.tilemap("level3");
        map3.addTilesetImage("floorV4");
        map3.addTilesetImage("spikes");
//        
        game.world.setBounds(0, 0, 3200, 1600);
//        
        platforms3 = map3.createLayer("platforms");
        traps3 = map3.createLayer("traps");
//        
        map3.setCollision(1, true, "platforms");
        map3.setCollision([2, 3, 4, 5, 6, 7, 8], true, "traps");
        
        bevonia = new Bevonia(608,224, 1632)
        
        
    },
    update: function(){
        
        game.physics.arcade.collide(bevonia.self, platforms3)
        
        bevonia.run()
        bevonia.jump()
        bevonia.die()
        bevonia.manageVulnerability()
        bevonia.stab()
        bevonia.castAOE()
        bevonia.castPrecise()
        
        if (game.physics.arcade.collide(bevonia.self, traps3)) {
            bevonia.health -= 1;
        }
    }
    
}
