var bevonia;
var map2;
demo.state2 = function () {};
demo.state2.prototype = {
    preload: function () {
        // LOAD TILEMAP
        game.load.tilemap("level2", "assets/tilemaps/level2.json", null, Phaser.Tilemap.TILED_JSON);
        
    },
    create: function () {
        // CREATE ENVIRONMENT
        game.stage.backgroundColor = "#000000"
        
        map2 = game.add.tilemap("level2");
        map2.addTilesetImage("floorV4");
        map2.addTilesetImage("spikes");
        
        game.world.setBounds(0, 0, 2912, 1952);
        
        platforms2 = map2.createLayer("platforms");
        traps2 = map2.createLayer("traps");
        
        map2.setCollision(1, true, "platforms");
        map2.setCollision([2, 3, 4, 5, 6, 8], true, "traps");
        
        bevonia = new Bevonia(128, 128, 1952);
        bars = new Bars(bevonia);
        
        // PLACE 11 BATS evenly over x in range 2112, 2466 (y ~ 164)
        bat1_1 = new Bat(2112, 1666,bevonia);
        bat1_2 = new Bat(2144, 1666,bevonia);
        bat1_3 = new Bat(2176, 1666,bevonia);
        bat1_4 = new Bat(2208, 1666,bevonia);
        bat1_5 = new Bat(2240, 1666,bevonia);
        bat1_6 = new Bat(2272, 1666,bevonia);
        bat1_7 = new Bat(2304, 1666,bevonia);
        bat1_8 = new Bat(2336, 1666,bevonia);
        bat1_9 = new Bat(2368, 1666,bevonia);
        bat1_10 = new Bat(2400, 1666,bevonia);
        bat1_11 = new Bat(2432, 1666,bevonia);
        
        
        // 1 troll in the troll section (2389, 368)
        
        spider1_1 = new Spider(2400, 784, 784, 1264, "y", -1);
        spider1_2 = new Spider(2490, 784, 784, 1264, "y", 1);
        
        enemies1 = [spider1_1, spider1_2,bat1_1,bat1_2,bat1_3,bat1_4,bat1_5,bat1_6,bat1_7,bat1_8,bat1_9,bat1_10,bat1_11]
    
        
        
        // chest 1035 464
//        chest2Contents = [healthPotion];
////        items2 = [armor2, sword2, door2, aoe2];
//        
//        chest2 = new Chest(1035, 464, chest2Contents, bevonia, items2);
//        items2.push(chest2);
    },
    update: function () {
        game.physics.arcade.collide(bevonia.self, platforms2);
        game.physics.arcade.collide(bat1_1.self,platforms2)
        game.physics.arcade.collide(bat1_2.self,platforms2)
        game.physics.arcade.collide(bat1_3.self,platforms2)
        game.physics.arcade.collide(bat1_4.self,platforms2)
        game.physics.arcade.collide(bat1_5.self,platforms2)
        game.physics.arcade.collide(bat1_6.self,platforms2)
        game.physics.arcade.collide(bat1_7.self,platforms2)
        game.physics.arcade.collide(bat1_8.self,platforms2)
        game.physics.arcade.collide(bat1_9.self,platforms2)
        game.physics.arcade.collide(bat1_10.self,platforms2)
        game.physics.arcade.collide(bat1_11.self,platforms2)
        
        bars.displayStats();
        console.log(bevonia.self.x,bevonia.self.y);
        
        bevonia.run();
        bevonia.jump();
        bevonia.die();
        bevonia.manageVulnerability();
        bevonia.stab();
        bevonia.castAOE();
        spider1_1.patrol();
        spider1_2.patrol();
        bat1_1.watch();
        bat1_2.watch();
        bat1_3.watch();
        bat1_4.watch();
        bat1_5.watch();
        bat1_6.watch();
        bat1_7.watch();
        bat1_8.watch();
        bat1_9.watch();
        bat1_10.watch();
        bat1_11.watch();
    }
}