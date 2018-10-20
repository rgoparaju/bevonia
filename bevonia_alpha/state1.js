//variables
var test;
var bevonia;
var platforms1;
demo.state1 = function () {};
demo.state1.prototype = {
    create: function () {
    // CREATE ENVIRONMENT
        // Background
        background1 = game.add.sprite(0, 0, "bg1");
        // Tilemap
        var map1 = game.add.tilemap("level1");
        map1.addTilesetImage("platforms");
        map1.addTilesetImage("spikes");
        // Camera
        game.world.setBounds(0, 0, 2624, 1344);
        
        platforms1 = map1.createLayer("platforms");
        traps1 = map1.createLayer("traps");
        
        map1.setCollision(1, true, "platforms");
        map1.setCollision([2, 3, 4, 5, 6, 7, 8], true, "traps");
        
        // Create new Bevonia and HUD
        bevonia = new Bevonia(128, 128);
        bars = new Bars(bevonia);
        inventory = new Inventory(866, 0);
        
        // Tutorial ghost test
        ghost1 = new tutorialGhost (360, 128, bevonia, "hello world")
        
        
        
        // Place enemies
        //test = new Skeleton(96, 96, 96, 200);
        //test2 = new Bat(128, 128, bevonia);
        test3 = new Spider(300, 128, 105, 135, "y", 1);
        
        
        
        // Place, store items
        sword = new Sword(160, 128, bevonia);
        armor = new Armor(180, 128, bevonia);
        key = new Key (200, 128, bevonia);
        
        
        items1 = [sword];
        
        
        
    },
    update: function () {
        game.physics.arcade.collide(bevonia.self, platforms1);
        //game.physics.arcade.collide(test2.self, platforms1);
        
        bars.displayStats();
        
        bevonia.run();
        bevonia.jump();
        
        ghost1.manifest();
        
//        if(test2.watch()) {
//            test2.attack();
//        }
        
        test3.patrol();
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.E)) {
            var i; for (i = 0; i < items1.length; i++) {
                if (game.physics.arcade.overlap(bevonia.this, items1[i])) {
                    bevonia.interactWith(items1[i]);
                }
            
            }
        }
        
        
        
        
        
        //test.patrol();
    }
}