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
        
        platforms1 = map1.createLayer("platforms");
        traps1 = map1.createLayer("traps");
        
        map1.setCollision(1, true, "platforms");
        map1.setCollision([2, 3, 4, 5, 6, 7, 8], true, "traps");
        
        // Create new Bevonia
        bevonia = new Bevonia(128, 128);
        
        
        
        // Place enemies
        test = new Skeleton(96, 96, 96, 200);
        test2 = new Bat(300, 300, test);
        
        
        
        // Place items
        
        
        
        
    },
    update: function () {
        game.physics.arcade.collide(bevonia, platforms1);
        
        bevonia.move();
        
        
        
        
        
        test.patrol();
    }
}