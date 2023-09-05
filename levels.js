 var level1 = [
        "                                                                         ◌◌◌◌◌                                                  ▒▒▒▒│┇▒▒▒▒       ♥                                  ",
        "                                                       ♥             ☼         ●                                                  ▒▒│┇▒▒         □       ○○○                        ",
        "                                           ○           □  ╦      ■◙ ■◙         □□                                                   │┇                  ▒ ₾ ▒                       ",
        "     ╦            ╦                        ○              ║ ╦                        ▒ ₼ ▒      ╦     ○○○○                  ╦       ╒╕        ╦         ▒▒▒▒▒      ╦        ╦       ",
        "     ║ ╦        ╦ ║            ╦     ■■■■■ ○             ╦║ ║               ╦        ▒▒▒▒▒      ║                           ║╦                ║                    ║   ╦    ║ ╦     ",
        "    ╦║ ║  ♠     ║ ║            ║           ○       ♠     ║║ ║               ║            ▒₼  ▒  ║                           ║║                ║        ○○○○○○○    ╦║   ║   ╦║ ║     ",
        "    ║║ ║ ◙◙     ║ ║            ║           ○     ╒╕◙     ║║ ║   ◙■ ◙■       ║            ▒▒▒▒▒  ║  ψ             ψ  ♣   ♠   ║║ ○○○○      ψ    ║       ▒     ₾ ▒   ║║   ║   ║║ ║     ",
        "    ║║ ║        ║ ║       ╒╕   ║  ■■       ○     │┇      ║║ ║               ║   ▒  ₼▒           ║  ╒╕ □□□□□╒╕   ♪╒╕ ◙ ■■■   ║║           ╒╕   ║       ▒▒▒▒▒▒▒▒▒   ║║   E   ║║ ║ ╒╕  ",
        "    ║║ ║     ╒╕ ║ ║ ○○○○○ │┇   ║               ╒╕│┇      ║║ ║               ║   ▒▒▒▒▒        ♠  ║  │┇      │┇    │┇         ║║           │┇   ║                   ║║   ║   ║║ ║ │┇  ",
        "    ║║ ║     │┇ ║ ║       │┇   ║               │┇│┇      ║║ ║               ║                □  ║  │┇ ₾    │┇    │┇         ║║           │┇   ║                   ║║   ║   ║║∩║ │┇  ",
        "w   ║║ ║     │┇ ║ ║ ₾w₾w  │┇   ║www₾₾  a     ₼ │┇│┇ ww   ║║ ║ ∩    ₾   ₾    ║                 ww║  │┇ ww ₾ │┇ ww∩│┇  ww I   ║║  ww∩  ∩ww │┇ ww║  a a www          ║ww ∩║   www║ │┇ww",
        "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
        "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░"
    ];
    
    
    function getId(c, u, l, r, ul, ur){
    if (c == "░"){
     if (u != "░"){
       if (l != "░") return 0;
       if (r != "░") return 5;
       return 1;
     }
     if (l != "░") return 6;
     if (r != "░") return 7;
     if (ul != "░") return 2;
     if (ur != "░") return 4;
     return 3;
     }
     if (c == "║") return 9+8;
     if (c == "▓") return 76+8;
     if (c == "╦") return 100+8; 
     if (c == "╒") return 18+8;
     if (c == "╕") return 19+8;
     if (c == "│") return 24+8;
     if (c == "┇") return 25+8;
     if (c == "▒") return 59+8;
     if (c == "E") return 10+8;
     if (c == "◙") return 12+8;
     if (c == "■") return 1+8;
     if (c == "▲") return 8+8;
     if (c == "♪") return 4+8;

     if (c == "○") return 101+8;
     if (c == "w") {
        if (u == '│')
            return 106+8;
        return 102+8;
     }
     if (c == "₾") return 103+8;
     if (c == "∩") return 104+8;
     if (c == "₼") return 105+8;
     if (c == "♠") return 107+8;
     if (c == "♣") return 108+8;
     if (c == "♥") return 109+8;
     if (c == "☼") return 110+8;
     if (c == "a") return 111+8;
     if (c == "ψ") return 112+8;
     
     if (c == "●") return 253; //253-249 reserved for multicoin brick
     if (c == "□") return 254;
     
     
     return 255;
    }
    
    function getTile(y,x){
        if (y >= 0 && x >=0 && y < level1.length && x < level1[y].length)
            return level1[y][x];
        return 255;
    }
    
    function parseLevel(){
        let level = new Array(level1[0].length);
        //this will convert the level walls to draw the grass and corners 
        //as well as filp from row major to column major so that data on a screen will be more compact;
        for (let x=0; x<level1[0].length;++x){
            level[x] = new Array(level1.length);
            for (let y=0; y<13;++y){	   
               level[x][y] = getId(
               getTile(y,x),
               getTile(y-1,x),
               getTile(y,x-1),
               getTile(y,x+1),
               getTile(y-1,x-1),
               getTile(y-1,x+1));
           }
       }
       return level;
    }