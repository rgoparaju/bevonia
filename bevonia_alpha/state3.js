var bevonia
var map3, platforms3, traps3
demo.state3 = function(){}
demo.state3.prototype = {
    create: function(){
        var background3 = game.add.sprite(0,0,'bg3')
        
        var map3 = game.add.tilemap("level3");
        map3.addTilesetImage("floorV4");
        map3.addTilesetImage("deathSpikes");
        
        game.world.setBounds(0, 0, 3200, 1600);
//        
//        platforms3 = map3.createLayer("platforms 3");
//        traps3 = map3.createLayer("traps 3");
//        
//        map3.setCollision(1, true, "platforms 3");
//        map3.setCollision([2, 3, 4, 5, 6, 7, 8], true, "traps 3");
//        
//        bevonia = new Bevonia(704,192, 1344)
        
        
    },
    update: function(){}
    
}
