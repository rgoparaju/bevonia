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
        
        door3 = new Door(864, 224, "state4", null);
        chest3 = new Chest(1890, 768, null, null);
        
        bevonia = new Bevonia(608, 224, 1632);
        
        door3.player = bevonia;
        chest3.player = bevonia;
        
        armor3 = new Armor(159, 808, bevonia);
        sword3 = new Sword(257, 1424, bevonia);
        key3 = new Key(1471, 1504, bevonia);
        health3 = new HealthPotion(2473, 1168, bevonia);
        mana3 = new ManaPotion(2923, 47, bevonia);
        exitKey3 = new SilverKey(-8, -8, bevonia);
        
        chest3.contents = [exitKey3];
        
        items3 = [door3, chest3, armor3, sword3, key3, health3, mana3, exitKey3];
        
        
        
    },
    update: function(){
        game.physics.arcade.collide(bevonia.self, platforms3)
        
        game.physics.arcade.collide(health3.self,platforms3)
        game.physics.arcade.collide(mana3.self,platforms3)
        
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
