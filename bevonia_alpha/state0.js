demo.state0 = function () {};
demo.state0.prototype = {
    preload: function () {
        // Load in hint sprites
        game.load.spritesheet("hint", "assets/sprites/hint.png", 96, 64);
        game.load.spritesheet("E", "assets/sprites/E.png", 32, 32);
        game.load.spritesheet("L", "assets/sprites/L.png", 32, 32);
        game.load.spritesheet("K", "assets/sprites/K.png", 32, 32);
        
    },
    
    create: function () {
    // CREATE ENVIRONMENT
        game.stage.backgroundColor = "#60210d";
        
        
        var map0 = game.add.tilemap("tutorialLevel");
        map0.addTilesetImage("floorV4");
        map0.addTilesetImage("deathSpikes");
        
        game.world.setBounds(0, 0, 2624, 1344);
        
        platforms0 = map0.createLayer("platformsTut");
        traps0 = map0.createLayer("trapsTut");
        map0.setCollision(1, true, "platformsTut");
        map0.setCollision([2, 3, 4, 7], true ,"trapsTut");
        
    // CREATE HINTS
        hint = game.add.sprite(64, 1000, "hint");
        hint.animations.add("flash", [1, 2, 3]);
        hint.animations.play("flash", 4, true);
        
        E1 = game.add.sprite(476, 816, "E");
        E1.animations.add("flash", [0, 1]);
        E1.animations.play("flash", 4, true);
        E2 = game.add.sprite(580, 304, "E");
        E2.animations.add("flash", [0, 1]);
        E2.animations.play("flash", 4, true);
        L = game.add.sprite(1052, 600, "L");
        L.animations.add("flash", [0, 1]);
        L.animations.play("flash", 4, true);
        K = game.add.sprite(1020, 600, "K");
        K.animations.add("flash", [1, 0]);
        K.animations.play("flash", 4, true);
        

    // Chest placed here so Bevonia gets drawn in front of it
        chest0 = new Chest(597, 416, bevonia);
        
    // CREATE BEVONIA
        bevonia = new Bevonia(32, 463);
        bars = new Bars(bevonia);
        inventory = new Inventory(866, 0);
        
    // PLACE ITEMS
        key0 = new Key(493, 917, bevonia);
        skeleton0 = new Skeleton(1060, 800, 832, 1248);
        
        
        
        
    },
    update: function () {
        game.physics.arcade.collide(bevonia.self, platforms0);
        
        bars.displayStats();
        
        bevonia.run();
        bevonia.jump();
        bevonia.die();
        bevonia.manageVulnerability();
        
        skeleton0.patrol();
        
        if (bevonia.vulnerable && game.physics.arcade.overlap(bevonia.self, skeleton0.self)) {
            bevonia.health -= bevonia.damageFactor;
            bevonia.vulnerable = false;
            bevonia.invincibilityTimer = game.time.now + bevonia.invincibilityPeriod;      
        }
        if (game.physics.arcade.collide(bevonia.self, traps0)) {
            bevonia.health -= 1;
        }
    }
}