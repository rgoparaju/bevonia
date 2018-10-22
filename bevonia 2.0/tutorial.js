demo.tutorial = function (game) {};
demo.tutorial.prototype = {
    create:function(){
        game.add.text(25,40,'Use WASD to move and control Bevonia',{font: '40px Arial', fill: '#FFF'})
        
        game.add.text(25,140, 'Press the E key to pick up items and weapons',{font: '40px Arial', fill: '#FFF'});
        
        game.add.text(25,240, 'Press the K key to use your sword',{font: '40px Arial', fill: '#FFF'});
        
        game.add.text(25,340, 'Press the L key to use magic',{font: '40px Arial', fill: '#FFF'});
        
        
                      game.add.text(25,440,'Press ESC to return to main menu',{font: '20px Arial', fill: '#FFF'});
        
       var esckey = game.input.keyboard.addKey(Phaser.Keyboard.ESC); esckey.onDown.addOnce(this.restart,this);
        
    },
    
    restart: function(){
        game.state.start('title');
    }
};