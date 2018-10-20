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
        
        // Create new Bevonia
        bevonia = new Bevonia(128, 128);
        
        
        
        // Place enemies
        //test = new Skeleton(96, 96, 96, 200);
        test2 = new Bat(300, 300, test);
        
        
        
        // Place, store items
        sword = new Sword(160, 128, bevonia);
        armor = new Armor(180, 128, bevonia);
        key = new Key (200, 128, bevonia);
        
        
        items1 = [sword];
        
        
        
    },
    update: function () {
        game.physics.arcade.collide(bevonia.self, platforms1);
        
        bevonia.run();
        bevonia.jump();
        
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