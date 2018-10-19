//variables

demo.state1 = function () {};
demo.state1.prototype = {
    create: function () {
    // CREATE ENVIRONMENT
        // Tilemap
        var map1 = game.add.tilemap("level1");
        map1.addTilesetImage("platforms");
        map1.addTilesetImage("spikes");
        
        platforms1 = map1.createLayer("platforms");
        traps1 = map1.createLayer("traps");
        
        map1.setCollision(1, true, "platforms");
        map1.setCollision([2, 3, 4, 5, 6, 7, 8], true, "traps");
        
        // Create new Bevonia
        
        
        
        // Place enemies
        
        
        
        // Place items
        
        
        
        
    },
    update: function () {
        
    }
}