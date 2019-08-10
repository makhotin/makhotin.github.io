class mainMenu_1 extends Phaser.Scene{
    constructor(){
        super("mainMenu_1");
    }
    preload(){
        
    }
    create(){
        this.add.text(20, 20, "JFJFJFJFJ");
        this.scene.start('lewel_1');

    }
}