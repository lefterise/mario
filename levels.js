var level1 = [
    "                                                                         üüüüü                                                  @@@@23@@@@       á                                  ",
    "                                                       á             â         ã                                                  @@23@@         $       ***                        ",
    "                                           *           $  M      J? J?         $$                                                   23                  @ € @                       ",
    "     M            M                        *              o M                        @ ‰ @      M     ****                  M       01        M         @@@@@      M        M       ",
    "     o M        M o            M     JJJJJ *             Mo o               M        @@@@@      o                           oM      èá        o                    o   M    o M     ",
    "    Mo o  à     o o            o           *       à     oo o               o            @‰  @  o  …             …          oo           …    o        *******    Mo   o   Mo o     ",
    "    oo o ??     o o        ‰   o           *     01?     oo o   ?J ?J       o            @@@@@  o                   í   à   oo ****           o       @     € @   oo   o   oo o     ",
    "    oo o        o o       01   o  JJ       *     23      oo o               o   @  ‰@           o  01 $$$$$01   K01 ? JJJ   oo           01   o       @@@@@@@@@   oo   E   oo o 01  ",
    "    oo o     01 o o  **   23   o               0123      oo o               o   @@@@@        à  o  23      23    23         oo           23   o                   oo   o   oo o 23  ",
    "    oo o     23 o o       23   o               2323      oo o               o                $  o  23 €    23    23         oo           23   o                   oo   o   ooˆo 23  ",
    "w   oo o  €  23 o o   €ww 23   owww€€        ‰ 2323 ww   oo o ˆ    €   €    o                 wwo  23 ww € 23 wwˆ23  ww I   oo  wwˆ  ˆww 23 wwo      www          oww ˆo   wwwo 23ww",
    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWWWFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWFFFFFWWWWWWWWWWWWWWFFFFFFFFFFFFFFFFFFFFFFFFFFFWWFFFFFFFFFFFFFFFFFFFFFWWWWWFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWWWFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFWFFFFFWWWWWWWWWWWWWWFFFFFFFFFFFFFFFFFFFFFFFFFFFWWFFFFFFFFFFFFFFFFFFFFFWWWWWFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
    ];
    
    
    
    function getId(c, u, l, r, ul, ur){
    if (c == "F"){
     if (u != "F"){
       if (l != "F") return 0;
       if (r != "F") return 5;
       return 1;
     }
     if (l != "F") return 6;
     if (r != "F") return 7;
     if (ul != "F") return 2;
     if (ur != "F") return 4;
     return 3;
     }
     if (c == "o") return 9+8;
     if (c == "W") return 13+8;
     if (c == "M") return 100+8; 
     if (c == "0") return 18+8;
     if (c == "1") return 19+8;
     if (c == "2") return 24+8;
     if (c == "3") return 25+8;
     if (c == "@") return 59+8;
     if (c == "E") return 10+8;
     if (c == "?") return 12+8;
     if (c == "J") return 1+8;
     if (c == "*") return 101+8;
     if (c == "w") return 102+8;
     if (c == "€") return 103+8;
     if (c == "ˆ") return 104+8;
     if (c == "‰") return 105+8;
     
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