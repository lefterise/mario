var level1 = { 
    grid: [
          "                                                                         ◌◌◌◌◌                                                  ₪₪₪₪│┇₪₪₪₪       ♥                                  ",
          "                                                       ♥             ☼         ●                                                  ₪₪│┇₪₪         □       ○○○                        ",
          "                                           ○           □  ╦      ■◙ ■◙         □□                                                   │┇                  ₪ ₾ ₪                       ",
          "     ╦            ╦                        ○              ║ ╦                        ₪ ₼ ₪      ╦     ○○○○                  ╦       ╒╕        ╦         ₪₪₪₪₪      ╦        ╦       ",
          "     ║ ╦        ╦ ║            ╦     ■■■■■ ○             ╦║ ║               ╦        ₪₪₪₪₪      ║                           ║╦                ║                    ║   ╦    ║ ╦     ",
          "    ╦║ ║  ♠     ║ ║            ║           ○       ♠     ║║ ║               ║            ₪₼  ₪  ║                           ║║                ║        ○○○○○○○    ╦║   ║   ╦║ ║     ",
          "    ║║ ║ ◙◙     ║ ║            ║           ○     ╒╕◙     ║║ ║   ◙■ ◙■       ║            ₪₪₪₪₪  ║  ψ             ψ  ♣   ♠   ║║ ○○○○      ψ    ║       ₪     ₾ ₪   ║║   ║   ║║ ║     ",
          "    ║║ ║        ║ ║       ╒╕   ║  ■■       ○     │┇      ║║ ║               ║   ₪  ₼₪           ║  ╒╕ □□□□□╒╕   ♪╒╕ ◙ ■■■   ║║           ╒╕   ║       ₪₪₪₪₪₪₪₪₪   ║║   E   ║║ ║ ╒╕  ",
          "    ║║ ║     ╒╕ ║ ║ ○○○○○ │┇   ║               ╒╕│┇      ║║ ║               ║   ₪₪₪₪₪        ♠  ║  │┇      │┇    │┇         ║║           │┇   ║                   ║║   ║   ║║ ║ │┇  ",
          "    ║║ ║     │┇ ║ ║       │┇   ║               │┇│┇      ║║ ║               ║                □  ║  │┇ ₾    │┇    │┇         ║║           │┇   ║                   ║║   ║   ║║∩║ │┇  ",
          "w   ║║ ║     │┇ ║ ║ ₾w₾w  │┇   ║www₾₾  a     ₼ │┇│┇ ww   ║║ ║ ∩    ₾   ₾    ║                 ww║  │┇ ww ₾ │┇ ww∩│┇  ww I   ║║  ww∩  ∩ww │┇ ww║  a a www          ║ww ∩║   www║ │┇ww",
          "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
          "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░"
      ],
    startPosition: {x: 6, y: 11},
    backgroundType: 0,
    terrainType: 0,
    pipeColor: 0,
    liquidType: 0,
    tileTint: 0,
    pipes: [       
        {entrance: {x:  50, y: 6, direction: 0}, exit: {x: 2, y: 2, direction: 1, level: "secret1", storeState: "level1"}},
        {entrance: {x: 177, y: 7, direction: 0}, exit: {x: 2, y:-1, direction: 1, level: "level2", storeState: false}},
    ]
  };
  
  var secret1 = {
    grid: [
          "₪│┇₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪",
          "₪│┇                ₪",
          "₪╒╕                ₪",
          "₪    ○ ○ ○ ○ ○     ₪",
          "₪   ○ ○ ○ ○ ○  ╒╕  ₪",
          "₪              │┇  ₪",
          "₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪  ₪",
          "₪                  ₪",
          "₪                  ₪",
          "₪     ○ ○ ○ ○ ○    ₪",
          "₪  ╒╕  ○ ○ ○ ○ ○   ₪",
          "₪  │┇              ₪",
          "₪₪₪│┇₪₪₪₪₪₪₪₪₪₪₪₪₪₪₪"
    ],
    startPosition: {x: 2, y: 2},
    backgroundType: 4,
    terrainType: 7,
    pipeColor: 0,
    liquidType: 0,
    tileTint: 0,
    pipes: [       
        {entrance: {x:  4, y: 10, direction: 0}, exit: {x: 133, y: 3, direction: 1, level: "level1", storeState: "secret1"}},
    ]
  };
  
var level2 = {
   grid: [
         "░    ■■■■■■■■■■■■■   ░░░░░     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░       ♠  ₼                                          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░            ░░░░░░░│┇│┇     │┇│┇░░░░░│┇░░░░",
         "░    üüüüüüüüüüüüü   ░░░░░¤   ¤░░                                        ░    ■■■■■■■■■■■■■                           ○○                                                         ░░░░░░░░░░░░░░            ░░░    │┇│┇     │┇│┇     │┇   ░",
         "░                    ░░░░░     ░░                           ○○○○○○○○○    ░                                  ♣        ○  ○       ₪   ∩                                            ░░░░░░░░░░░░░░            ░░░ ○○ │┇╒╕░░░░░╒╕│┇     │┇  ♠░",
         "░                    ░░░░░     ░░                           ○○○○○○○○○  ψ ░                                  ◙                   ₪₪₪₪₪     ○○○○                                   ░░░░░░░░░░░░░░            ░░░ ○○ │┇         │┇ ○○○ ╒╕  ◙░",
         "░                                     ψ                            ₾ ₾ ╒╕░●                       ♠                                                Ψ                             ░░░░░░░░░░░░░░♥  ○○○○○    ░░░ ○○ │┇         ╒╕ ○○○      ░",
         "░         ψ  ♠                        ╒╕     ░░░░░░░ ░░░░░ ░░░░░░░░░░░ │┇░□        Ψ            ╒╕◙                      ψ             ₪ ₪   ₾₪    ╒╕                            ░░░░░░░░░░░░░░◙  ○○○○○    ░░░∩   │┇            ○○○      ░",
         "░         ╒╕◙◙                        │┇                               ░░░    Ψ    ╒╕           │┇          ☼      ╒╕    ╒╕₪₪₪₪₪₪₪₪₪₪₪₪₪ ₪₪₪₪₪₪    │┇                       ●    ░░░░░░░░░░░░░░   ○○○○○  ╒╕░░░░░  ╒╕            ○○○      ░",
         "░       ψ │┇                          │┇                                      ╒╕   │┇    Ψ    ╒╕│┇        ╒╕◙  ψ   │┇    │┇                      Ψ │┇                     ╒╕◙    ░░░░░░░░░░░░░░   ○○○○○  │┇░░░          ψ       ○○○ ψ    ░",
         "░       ╒╕│┇  ψ                     ╒╕│┇                                      │┇   │┇   ₪╒╕   │┇│┇        │┇   ╒╕  │┇    │┇ ○○○○                 ╒╕│┇                     │┇     ░░░░░░░░░░░░░░ E        │┇░░░          ╒╕          ╒╕  ■░",
         "░       │┇│┇  ╒╕          ∩         │┇│┇                                      │┇   │┇    │┇   │┇│┇¤¤ ¤¤ ¤¤│┇   │┇  │┇    │┇ ○○○○                 │┇│┇                E    │┇     ░░░░░░░░░░░░░░ E        │┇░░░  Ψ    ∩  │┇          │┇   ░",
         "░       │┇│┇  │┇         ¤¤ , ¤¤    │┇│┇         ∩  ,     ,                 ∩ │┇   │┇    │┇   │┇│┇  ,  ,  │┇   │┇  │┇ ,, │┇             ‚        │┇│┇  ¤¤ , ¤¤ , ¤¤  E  ∩ │┇ ₾₾  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ╒╕░░░░╒╕│┇      ₼ Ψ │┇   ░",
         "░░░░░░░░░░░░░░░░░░▓▓▓░░░░░▓▓▓▓▓░░░░░░░░░  ♪░░░░░░░░▓▓▓░░░▓▓▓░░░░░░░░░░░░░░░░░░░░▓▓▓░░▓▓▓▓░░▓▓▓░░░░▓▓▓▓▓▓▓░░░░░░░░░░░░▓▓▓▓░░░░░░░░▓▓▓░░░░▓░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │┇    │┇│┇  ╒╕░░░░╒╕│┇   ░",
         "░░░░░░░░░░░░░░░░░░▓▓▓░░░░░▓▓▓▓▓░░░░░░░░░   ░░░░░░░░▓▓▓░░░▓▓▓░░░░░░░░░░░░░░░░░░░░▓▓▓░░▓▓▓▓░░▓▓▓░░░░▓▓▓▓▓▓▓░░░░░░░░░░░░▓▓▓▓░░░░░░░░▓▓▓░░░░▓░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │┇    │┇│┇  │┇    │┇│┇   ░",  
    ],
    startPosition: {x: 2, y: -1},
    terrainType: 7,
    backgroundType: 4,
    pipeColor: 4,
    liquidType: 1,
    tileTint: 1,
    pipes: [
        {entrance: {x:  95, y: 7, direction: 0}, exit: {x: 37, y: 8, direction: 0}},
        {entrance: {x:  72, y: 4, direction: 0}, exit: {x: 116, y: 6, direction: 0}},
        {entrance: {x:  79, y: 7, direction: 0}, exit: {x: 211, y: 6, direction: 1}},
        {entrance: {x: 229, y: 3, direction: 1}, exit: {x: 107, y: 7, direction: 0}},
        {entrance: {x:  171, y: 7, direction: 0}, exit: {x: 6, y: -1, direction: 1, level: "level3"}},
        {entrance: {x:  202, y: 6, direction: 0}, exit: {x: 6, y: -1, direction: 1, level: "level3"}}
    ]
};


level3 = { 
    grid: [
       " ♠                               ₼              ♠ ₼              ₼                               ¤¤¤¤¤¤│┇¤¤¤¤                                     ♥      ░░",
       " ◙              ○○○            ○○○            ◙◙◙◙◙    ○○○○    ○○○    ○○○○          ╒╕                 │┇         ○○○             □   □ ░░░░  ◙◙◙◙◙◙◙◙◙  ░░",
       "        ₼       ▒▒▒            ▒▒▒                     ■■■■    ▒▒▒    ■■■■          │┇     ₼           │┇         ▒▒▒         □         ░░░░             ░░",
       "       ¤¤       ▒▒▒○           ▒▒▒○○                           ▒▒▒                  │┇    ¤¤           ╒╕         ▒▒▒        ╦          ░░░░ E           ░░",
       "   ₼ ╦      ₼   ▒▒▒▒        ╦  ▒▒▒▒▒                 ╦         ▒▒▒         ╦    ₼◙  ¤¤¤¤                      ╦  ○▒▒▒     □  ║ ╦        ░░░░ E w ₼       ░░",
       "  ¤¤ ║      ¤¤  ▒▒▒▒        ║  ▒▒▒▒▒           ₼     ║         ▒▒▒         ║ ¤¤¤¤¤                ψ           ║  ▒▒▒▒       ╦║ ║        ░░░░ ▒▒▒▒▒     ₼ ░░",
       "     ║          ▒▒▒▒        ║ ○▒▒▒▒▒    ψ     ◙◙◙◙◙ ♪║         ▒▒▒♪♪♪      ║                      ╒╕          ║  ▒▒▒▒₼w     ║║ ║        ░░░░ ▒▒▒▒▒    ▒▒ ░░",
       "     ║         ○▒▒▒▒        ║ ▒▒▒▒▒▒    ╒╕           ║        ○▒▒▒         ║              ♠ ww    │┇ψ         ║ ○▒▒▒░░░░    E║ ║    ╒╕  ░░░░░░░▒▒▒ ╒╕ ▒▒ ░░",
       "     ║         ▒▒▒▒▒        ║ ▒▒▒▒▒▒    │┇           ║        ▒▒▒▒    ψ    ║            ╒╕◙◙▒▒▒▒  │┇╒╕        ║ ▒▒▒▒░░░░    ║║ ║    │┇  ░░░░░░░▒▒▒ │┇ ▒▒ ░░",
       "     ║         ▒▒▒▒▒ ♠      ║ ▒▒▒▒▒▒‡ ψ │┇           ║‡       ▒▒▒▒    ╒╕   ║          ψ │┇  ▒▒▒▒  │┇│┇        ║ ▒▒▒▒░░░░░   ║║ ║    │┇  ░░░░░░░░▒▒ │┇ ▒▒ ░░",
       " w   ║         ▒▒▒▒▒ ◙      ║ ▒▒▒▒▒░░░╒╕│┇  ww       ║¤    W ‡▒▒▒▒  ‡ │┇   ║       ♥  ╒╕│┇ ‡▒▒▒▒‡ │┇│┇  w     ║₼▒▒▒░░░░░░   ║║ ║∩ww │┇  ░░░░░░░░▒▒ │┇ ▒▒ ░░",
       "░░░░░░░     ░░░░░░░░░░    ╒╕░░░░░░░░░░│┇│┇  ░░░░░░░░░░░    ░░░░░░░░░░░│┇  ■║‡     ‡◙  │┇│┇░░░░░░░░│┇│┇░░░░   ░░░░░░░░░░░░░░░░░░░░░░░░░░ ░░░░░░░░░░░░░░░░░░░",
       "░░░░░░░     ░░░░░░░░░░    │┇░░░░░░░░░░│┇│┇  ░░░░░░░░░░░    ░░░░░░░░░░░│┇  ░░░░░░░░░░  │┇│┇░░░░░░░░│┇│┇░░░░   ░░░░░░░░░░░░░░░░░░░░░░░░░░ ░░░░░░░░░░░░░░░░░░░",
      ],
    startPosition: {x: 6, y: 11},
    backgroundType: 1,
    terrainType: 2,
    pipeColor: 1,
    liquidType: 0,
    tileTint: 0,
    pipes: [       
      {entrance: {x:  133, y: 7, direction: 0}, exit: {x: 3, y: 9, direction: 0, level: "level4"}},
      {entrance: {x:  148, y: 7, direction: 0}, exit: {x: 3, y: 9, direction: 0, level: "level4"}}
    ]
  };


  level4 = { 
    grid: [
        "░░░░░░    ░░░░░░░░░░░ ░░░    ░░░░░░░░░░░░░░░░░      ░░░░░░   ░░░░░░░      ░░░¤¤¤¤¤░░▼▼              ¤¤░░░░░░░░░░░¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤",
        "░░░░░      ░░¤¤                                     ░░░░░░   ░░░░░░░      ░░░ ▼▼▼                    ▼   ¤¤░░░░░░¤                zz                                                                     ¤",
        "             ▼▼                                     ░░░░░░   ░░░░░░░      ░░░                            ▼▼     ░¤                zz                ○○○○○ ○   ○ ○○○○○   ○○○○○ ○   ○ ○○○○   ○ ○           ¤",
        "                                        ‡           ░░░░░░   ░░░░░░░      ░░░                                   ░¤        ¤¤¤¤¤¤¤¤¤z                  ○   ○   ○ ○       ○     ○○  ○ ○   ○  ○ ○           ¤",
        "                                     ♠              ░░░░░░   ░░░░░░░      ░░░                              ♥    ░¤        ¤░░░░░░░¤                   ○   ○   ○ ○       ○     ○ ○ ○ ○   ○  ○ ○           ¤",
        "                                     ◙◙◙                                                                   ◙    ░¤        ¤░░░░░░░¤        ♠♠         ○   ○○○○○ ○○○○    ○○○○  ○  ○○ ○   ○  ○ ○           ¤",
        "                                                                                    ╒╕      ᵕᵕ                ╒╕░¤        ¤░░░░░░░¤        ◙◙         ○   ○   ○ ○       ○     ○   ○ ○   ○  ○ ○           ¤",
        "                                              ‡                  ‰                 ▲│┇            ᵕ           │┇░¤      ╒╕¤░░░░░░░¤                   ○   ○   ○ ○       ○     ○   ○ ○   ○                ¤",
        "               ¤░░░░░ ░░¤    ¤░░¤          ¤░░¤    ¤░░░░░░ ᵕ ░░░░░░░¤    ¤░░░░   ░░░│┇                        │┇░¤      │┇¤░░░░░░░¤                   ○   ○   ○ ○○○○○   ○○○○○ ○   ○ ○○○○   ○ ○      ╒╕   ¤",
        "░░░░░¤ ᵕᵕ ¤░░  ░░░░░░ ░░░    ░░¤¤▲         ░░░      ░░░░░░   ░░░░░░░░    ░░░░░   ░░¤│┇                   ▲    │┇░¤      │┇¤░░░░░░░¤   E                                                             │┇   ¤",
        "░░░░░░    ░░░▲▲░░░░░░ ░░░    ░░░░░░░░░░░  ░░░░▲▲▲▲▲▲░░░░░░   ░░░░░░░░▲▲▲▲░░░░░ ‚ ░░░¤¤▲         ▲    ᵕᵕ  ¤░░¤¤¤¤░¤      │┇¤░░░░░░░¤   E                                                             │┇   ¤",
        "░░░░░░▓▓▓▓░░░¤¤░░░░░░▓░░░▓▓▓▓░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░▓▓▓░░░░░░░░¤¤¤¤░░░░░▓▓▓░░░░¤¤▲        ¤        ░░░░¤¤░░¤▓▓▓▓▓▓│┇¤░░░░░░░¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤░",
        "░░░░░░▓▓▓▓░░░░░░░░░░░▓░░░▓▓▓▓░░░░░░░░░░░▓▓░░░░░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░░░░░░▓▓▓░░░░░░¤▲       ¤        ░░░░░░░░¤▓▓▓▓▓▓│┇¤░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",       
      ],
    startPosition: {x: 3, y: 8},
    backgroundType: 5,
    terrainType: 8,
    pipeColor: 1,
    liquidType: 2,
    tileTint: 0,
    pipes: [
      {entrance: {x:  85, y: 6, direction: 0}, exit: {x: 7, y: 1, direction: 1, level: "level4b"}},
      {entrance: {x:  111, y: 6, direction: 0}, exit: {x: 7, y: 1, direction: 1, level: "level4b"}},
      {entrance: {x:  197, y: 8, direction: 0}, exit: {x: 6, y: -1, direction: 1, level: "level1"}},      
    ]
  };

  level4b = { 
    grid: [
        "░░░░░░│┇░░░░░          ♠                                          ░░░░░░░░░░░░░░░░░░░░░░░░░░▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼░░░░░░░",
        "░     ╒╕               ◙◙◙                                        ¤░░░░░░░░░░░░░░░░░░░░░░░░░                  ░░░░░░░",
        "░                                                                           ░░░░░░░░░░░░░░░░                  ░░░░░░░",
        "░                                                 ●                         ░░░░░░░░░░░░░░░¤                 ♠░░░░░░░",
        "░                                                 ◙                         ░░░░░░    ░░░░░░                 □░░░░░░░",
        "░                                                                   ╒╕░░░¤  ░░░░░░    ░░░░░¤    ¤░░░░░░░░░░¤  ░░░░░░░",
        "░                            ■  ∩ ■                                 │┇░░░░  ░░░░░░♣   ░░░░¤¤    ░░░░░░░░      ░░░░░░░",
        "░                            ■▲▲▲▲■      ψ              ψ           │┇░░░░  ¤░░░░¤◙   ░░░¤¤    ■░░░░░░░░      ░░░░░░░",
        "░                    ■  ∩ ■╒╕■■■■■■      ╒╕             ╒╕        ╒╕│┇░░░░                    ♥■░░░░░░░░      ░░░░░░░",
        "░■  ₼ ■■ ₼  ■        ■▲▲▲▲■│┇■    ■      │┇ψ            │┇    ₼   │┇│┇░░░░                    ■■░░░░░░░░      ░░░░░░░",
        "░░░░░░░░░░░░░  ♪  ♪  ■■■■■■│┇■    ■╒╕  ¤¤│┇╒╕¤¤ ᵕ ᵕ ¤¤╒╕│┇▲▲▲▲▲▲▲▲│┇│┇░░░░      ∩  ∩  ‡       ■■░░░░░░░░╒╕░░░░░░░░░░░",
        "░░░░░░░░░░░░░        ■    ■│┇■    ■│┇    │┇│┇         │┇│┇░░░░░░░░░░░░░░░░  ░░░░░░░░░¤¤░░░░░░░░░░░░░░░░░│┇░░░░░░░░░░░",
        "░░░░░░░░░░░░░        ■    ■│┇■    ■│┇    │┇│┇         │┇│┇░░░░░░░░░░░░░░░░  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░│┇░░░░░░░░░░░"
      ],
    startPosition: {x: 7, y: 3},
    backgroundType: 5,
    terrainType: 8,
    pipeColor: 1,
    liquidType: 2,
    tileTint: 0,
    pipes: [
      {entrance: {x:  105, y: 10, direction: 0}, exit: {x: 121, y: 7, direction: 0, level: "level4"}},
    ]
  };



  level5 = { 
    grid: [
      "                                                                                                 ♥             ♠                               ○                     ",
      "                                                                                                 □             ◙                            ○  ○                     ",
      "                                      ♠                              ○○○○                                                                ○  ○  ○                     ",
      "                          ○○○        ◙◙◙                                           ₼      ♠       ♣  %#                                  ○  ○                        ",
      "                                                            %#                     XX ╒╕  ◙◙      □  %%#                                 ○     ₼                     ",
      "                                   ▐         ▐ ₼            %#               ₼        │┇             %%#       ₼                            ₼  X              ▐      ",
      "      ▐             ▐ ●ψ   ▐       ▐         ▐ X  ₼  ψ     %##     ψ     ╒╕  XX       │┇             %%#       X      ╒╕                 ₼  X  X             ▐▐      ",
      "     ▐▐      ╒╕    ▐▐ ◙╒╕  ▐   ╒╕ ▐▐ ◙◙◙    ₼▐▐   X  ╒╕    %##▐    ╒╕    │┇ ▐    ₼    │┇           □ %%#▐    ₼ X      │┇╒╕               X  X                ▐▐  ╒╕  ",
      "     ▐▐    ╒╕│┇    ▐▐▐ │┇  ▐   │┇ ▐▐        X▐▐      │┇ ▐  %##▐    │┇  ╒╕│┇ ▐▐  XX ▐  │┇ ▐▐         ▐%%#▐    X X╒╕    │┇│┇ ▐             X ▐   ▐  ╒╕  ▐      ▐▐  │┇  ",
      "     ▐▐    │┇│┇    ▐▐▐ │┇ ▐▐   │┇ ▐▐ ▐   ₼   ▐▐    ▐ │┇ ▐▐ %##▐ ▐  │┇  │┇│┇ ▐▐    ▐▐  │┇ ▐▐         ▐%%#▐  ₼ X X│┇    │┇│┇ ▐▐          ▐   ▐  ▐▐  │┇  ▐ E    ▐▐▐ │┇  ",
      "     ▐▐ w  │┇│┇ ∩w ▐▐▐ │┇ ▐▐∩  │┇ ▐▐▐▐   X   ▐▐ w  ▐▐│┇ ▐▐ %##▐∩▐w │┇  │┇│┇ ▐▐    ▐▐  │┇ ▐▐₼        ▐%%#▐  X X X│┇ w  │┇│┇ ▐▐      w ₼ ▐▐  ▐  ▐▐▐ │┇ ▐▐ Ew  ∩▐▐▐ │┇  ",
      "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ░░░░░░░░░░░  ░░░░░░░░░░░░░░░░░░░░░░░░░  ░░░░░░░░░░░░░░ ░░░░░░░░     ░░░░░░░░░░░░░░░ ░░░░░░░░░░░   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
      "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ░░░░░░░░░░░  ░░░░░░░░░░░░░░░░░░░░░░░░░  ░░░░░░░░░░░░░░ ░░░░░░░░     ░░░░░░░░░░░░░░░ ░░░░░░░░░░░   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░"
      ],
    startPosition: {x: 7, y: 3},
    backgroundType: 2,
    terrainType: 3,
    pipeColor: 2,
    liquidType: 2,
    tileTint: 1,
    pipes: [
      {entrance: {x:  24, y: 7, direction: 0}, exit: {x: 54, y: 7, direction: 0}},
      {entrance: {x:  68, y: 7, direction: 0}, exit: {x: 23, y: 1, direction: 1, level: "level5b"}},
    ]
  };

  level5b = { 
    grid: [
      "XXXXXXXXXXXXXXXXXXXXXX│┇XXXXXXXXXXXXXXXXXXXXXXX",
      "X                     ╒╕                      X",
      "X ○○○○○                    ○○○○○           ○○ X",
      "X ○○○○○                              ₼        X",
      "X                                    XXX      X",
      "X       XXXXX       XXXXX                     X",
      "X       X                           ₼         X",
      "XX  X  XX ◙♠               XXXXX   XXX     ╒╕ X",
      "X       X  ◙                               │┇ X",
      "X       X       ♪                          │┇ X",
      "X▲▲▲▲▲▲▲X                ₾                 │┇ X",
      "░░░░░░░░░░░░░▓▓▓░▓▓▓░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░",
      "░░░░░░░░░░░░░▓▓▓░▓▓▓░░░░░░░░░░░░▓▓▓░░░░░░░░░░░░"
      ],
    startPosition: {x: 23, y: 3},
    backgroundType: 6,
    terrainType: 7,
    pipeColor: 4,
    liquidType: 2,
    tileTint: 0,
    pipes: [      
      {entrance: {x:  44, y: 7, direction: 0}, exit: {x: 24, y: 7, direction: 0, level: "level5"}},
    ]
  };

  level6 = { 
    grid: [
      "              ♠                                                                                                                              ",
      "              ◙                                       ₼  ▒▒           ○○○   ○○○                                 ○○○○○                        ",
      "                          ○○○○                      ▒▒▒▒▒▒▒                                      ψ?   ã               ψ                      ",
      "                     ▐                              ▒▒▒▒▒▒▒             ▐                ♪ ♪   ψ?╒╕   ◙               ╒╕ψ         ▐          ",
      "        ▐      ■■■  ▐▐                              ▒▒▒▒▒▒▒            ▐▐                      ╒╕│┇         ▐         │┇╒╕        ▐   ▐      ",
      " ▐      ▐▐          ▐▐           ψ    ♠     ψ?   ▐  ▒▒▒▒▒▒▒₼      ▐ ₼ ♥▐▐ ₼   ♣ ₼     ₼        │┇│┇      ▐  ▐         │┇│┇       ▐▐   ▐▐     ",
      " ▐▐   ▐ ▐▐ ■■■      ▐▐ ψ?        ╒╕   ◙◙◙   ╒╕   ▐▐ ▒▒▒▒▒░░░░     ▐ ₪ □▐▐ ₪   □ ₪   ₪₪₪       ₪₪₪₪₪₪     ▐ ▐▐ ₪♪♪♪♪♪♪♪₪₪₪₪♪      ▐▐ ▐ ▐▐     ",
      " ▐▐   ▐ ▐▐        w ▐▐ ╒╕      ╒╕│┇     ▐▐  │┇   ▐▐ ▒▒▒▒▒░░░░     ▐ ₪  ▐▐ ₪     ₪                        ▐ ▐▐ ₪                  ▐▐ ▐ ▐▐ ╒╕  ",
      " ▐▐   ▐ ▐▐       ‡░░░░░│┇   ▐  │┇│┇    ▐▐▐  │┇  ▐▐▐ ▒▒▒▒░░░░░ w   ▐▐₪  ▐▐ ₪   ▐ ₪▐▐             ▐        ▐ ▐▐ ₪♥                 ▐▐ ▐ ▐▐ │┇  ",
      " ▐▐   ▐ ▐▐     ░░░░░░░░░░░‡ ▐▐ │┇│┇    ▐▐▐  │┇  ▐▐▐ ▒▒▒▒░░░░░▒▒▒▒▒▐▐₪  ▐▐ ₪   ▐▐₪▐▐             ▐▐       ▐ ▐▐ ₪◙               þ ▐▐ ▐ ▐▐ │┇  ",
      " ▐▐   ▐ ▐▐w ‡░░░░░░░░░░░░░░ ▐▐ │┇│┇ ∩w ▐▐▐  │┇  ▐▐▐‡▒w ▒░░░░░▒▒▒▒▒▐▐₪w ▐▐‡₪w ‡▐▐₪▐▐ w   ♪ ♪ ♪ ‡ ▐▐‡w  ♪  ▐ ▐▐ ₪      w    w  ₪ þ‡▐▐ ▐ ▐▐‡│┇  ",
      "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░░░░░░░░░░░░░░░░░░░░░░░       ░░░░░░░   ░░░░░░░  ░░ ‡░░‡  ░░░░░░░░░░░░░░░░░░░",
      "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░     ░░░░░░░░░ ░░░░░░░░ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░"     
      ],
    startPosition: {x: 7, y: 3},
    backgroundType: 2,
    terrainType: 3,
    pipeColor: 2,
    liquidType: 2,
    tileTint: 1,
    pipes: [
    ]
  };

  level6b = { 
    grid: [
      "        ○                   ♠           ○         ",
      "       ○○○                  ◙          ○○○        ",
      "       ○○○                             ○○○        ",
      "        ○                               ○         ",
      "                 ▒▒▒▒▒▒▒                          ",
      "     ▐       ‡▒▒▒▒▒▒▒▒▒▒                          ",
      "  ╒╕ ▐▐ ♪ ▐ ▒▒▒▒▒▒▒ww▒▒▒       ▐            ▐     ",
      "  │┇ ▐▐  ▐▐ ▒▒▒▒▒▒░░░░▒▒▒▒▒ ♪ ▐▐  ♪  ▐  ♪  ▐▐ ╒╕  ",
      "  │┇ ▐▐  ▐▐ ▒▒▒▒▒▒░░░░▒▒▒▒▒   ▐▐     ▐   ▐ ▐▐ │┇  ",
      "  │┇ ▐▐ww▐▐‡▒▒▒▒▒▒░░░░▒▒▒▒▒  ▐▐▐ ₼   ▐   ▐ ▐▐ │┇  ",
      "░░░░░░░░░░░░░░www▒░░░░░▒▒▒▒‡ ▐▐▐ X ‡ ▐ ww▐‡▐▐ │┇  ",
      "░░░░░░░░░░░░░░░░░░░░░░░▒▒▒░░░░░░░░░░░░░░░░░░░░░░░░",
      "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░"
      ],
    startPosition: {x: 7, y: 3},
    backgroundType: 2,
    terrainType: 3,
    pipeColor: 2,
    liquidType: 2,
    tileTint: 1,
    pipes: [
    ]
  };

const AllLevels ={
    level1 : level1,
    secret1: secret1,
    level2 : level2,
    level3: level3,
    level4: level4,
    level4b: level4b,
    level5: level5,
    level5b: level5b,
    level6: level6,
};
  
    function parseTerrainWall(c, u, l, r, ul, ur, x, y){
    if (u != c){
        if (l != c) return 0+ (c == '░' && l == '▒' ? 10 : 0);
        if (r != c) return 5+ (c == '░' && r == '▒' ? 6 : 0);
        return 1;
      }

      if (l != c && l != '░') return 6 + (c == '░' && l == '▒' ? 2 : 0);
      if (r != c && r != '░') return 7 + (c == '░' && r == '▒' ? 2 : 0);
      if (ul != c && ul != '░') return 2;
      if (ur != c && ur != '░') return 4;
      return 3;
    }

    function parseDungeonWall(c, u, l, r, ul, ur, x, y){        
          let tile = 1 + (x + y)%2;
          if (tile == 1 && r != "░") return 0;
          if (tile == 2 && l != "░") return 0;
          return tile;
    }    

    const Tile ={
        CobbleStone: 0+20,
        Breakable1:  1+20,
        Breakable2:  2+20,
        Breakable3:  3+20,
        BouncyNote:  4+20,
        GreyBlock:   5+20,
        CollapsibleBlock: 6+20,
        CollapsibleBlockActive: 7+20,
        Spike: 8+20,
        PalmTrunk: 9+20,
        ExitSign: 10+20,
        WoodSpike: 11+20,
        QuestionMark: 12+20,
        UsedQuestionMark: 13+20,
        Wood1: 14+20,
        Metal1: 15+20,
        ExitPole: 16+20,
        WoodPike: 17+20,        
        SpikeDown: 19+20,
        Wood2: 20+20,
        Metal2: 21+20,
        PipeFirst: 30+20,
        PipeLast: 65+20,  
        SmallBushTop: 66 + 20,
        SmallBushBody: 72 + 20,  
        LargeBushTopLeft: 67 + 20,
        LargeBushTopRight: 68 + 20,
        LargeBushBodyLeft: 73 + 20,
        LargeBushBodyRight: 74 + 20,
        LargeBushTopRightOverLeftBody: 70 + 20,
        LargeBushTopLeftOverRightBody: 69 + 20,
        Goomba: 200,
        Koopa: 201,
        RedKoopa: 202,
        Fish: 203,
        Piranha: 204,
        Coin: 205,
        Mushroom: 206,
        PoisonousMushroom: 207,
        Life: 208,
        Star: 209,        
        OneCoinLeft: 210,
        TenCoinsLeft: 219,
        LavaFlair: 220,
        Weed: 230,
        WeedAndPalmTrumk: 231,
        PalmTree: 232,
        Water: 233,
        Lava: 234,
        Fire: 235,
        Fire2: 236,        
        Invisible: 254,
        None: 255
    };

    const SolidTiles = [Tile.CobbleStone,Tile.Breakable1,Tile.Breakable2,Tile.Breakable3,Tile.BouncyNote,Tile.GreyBlock,Tile.CollapsibleBlock,Tile.CollapsibleBlockActive,Tile.Spike,Tile.WoodSpike,Tile.QuestionMark,Tile.UsedQuestionMark,Tile.Wood1,Tile.Metal1,Tile.WoodPike,Tile.SpikeDown,Tile.Wood2,Tile.Metal2];
    
    function getId(c, u, l, r, ul, ur, x, y, parseWall, pipeColor, liquidType, tileTint){
     if (c == "░"){
        return parseWall(c, u, l, r, ul, ur, x, y);     //0-11 is solid terrain
     }
     
     if (c == "▒"){
        return parseWall(c, u, l, r, ul, ur, x, y) + 12; //12-19 is walkthrough terrain
     }

     //Tree
     if (c == "╦") return Tile.PalmTree;
     //Weed
     if (c == "w") {
        if (u == '║')
            return Tile.WeedAndPalmTrumk;
        return Tile.Weed;
     }

     if (c == '▐'){
      if (u == '▐') return Tile.SmallBushBody;
        return Tile.SmallBushTop;
     }

     //Parse bushes
     if (l == '%' && u == '%' && c == '#') return Tile.LargeBushTopRightOverLeftBody;
     if (r == '#' && u == '#' && c == '%') return Tile.LargeBushTopLeftOverRightBody;

      if (c == '#' && u == '#'){
        if (l == '#' || l == '%') return Tile.LargeBushBodyRight;
        return Tile.LargeBushBodyLeft;
      }

      if (c == '%' && u == '%'){
        return Tile.LargeBushBodyLeft;
      }
    
      if (c == '#' && u != '#'){
        if (l == '#' || l == '%') return Tile.LargeBushTopRight;
        return Tile.LargeBushTopLeft;
      }

      if (c == '%' && u != '%'){
        return Tile.LargeBushTopLeft;
      }
    

     //Fire body
     if (c == "▓" && u=="▓" && liquidType == 2) return 236;
     //Water/Lava/Fire
     if (c == "▓") return 233+liquidType; //233-234-235

     
     
     //Pipe
     let pipeOffset =(pipeColor % 3)*2+Math.floor(pipeColor / 3)*12;
     if (c == "╒") return Tile.PipeFirst+0+pipeOffset;
     if (c == "╕") return Tile.PipeFirst+1+pipeOffset;
     if (c == "│") return Tile.PipeFirst+6+pipeOffset;
     if (c == "┇") return Tile.PipeFirst+7+pipeOffset;

     //Block
     if (c == "₪") return Tile.Wood2;
     if (c == "¤") return Tile.CobbleStone;
     if (c == "X") return Tile.Metal1 + tileTint * 6;
     if (c == "E") {
        if (u != "E") return Tile.ExitSign;
        return Tile.ExitPole;
     }
     if (c == "◙") return Tile.QuestionMark;
     if (c == "■") return Tile.Breakable1 + tileTint;
     if (c == "▲") return Tile.Spike;
     if (c == "▼") return Tile.SpikeDown;
     
     if (c == "║") return Tile.PalmTrunk;
     if (c == "♪") return Tile.BouncyNote;
     if (c == "□") return Tile.Invisible;
     if (c == "ᵕ") return Tile.CollapsibleBlock;
     

     //Enemies
     if (c == "₾") return Tile.Goomba;
     if (c == "∩") return Tile.Koopa;
     if (c == "₼") return Tile.RedKoopa;
     if (c == "a") return Tile.Fish;
     if (c == "ψ") return Tile.Piranha;
     if (c == "Ψ") return Tile.Piranha;//Red
     if (c == ",") return Tile.LavaFlair;
     
     //Collectables
     if (c == "○") return Tile.Coin;
     if (c == "♠") return Tile.Mushroom;
     if (c == "♣") return Tile.PoisonousMushroom;
     if (c == "♥") return Tile.Life;
     if (c == "☼") return Tile.Star;    
     if (c == "●") return Tile.TenCoinsLeft;
     //◌
     return Tile.None;
    }
    
    function getTile(g, y,x){
        if (y >= 0 && x >=0 && y < g.length && x < g[y].length)
            return g[y][x];
        return Tile.None;
    }
    
    function parseLevel(levelData){
        let level = new Array(levelData.grid[0].length);
        let parser = parseTerrainWall;
        if (levelData.terrainType >= 6)
            parser = parseDungeonWall;

        //this will convert the level walls to draw the grass and corners 
        //as well as filp from row major to column major so that data on a screen will be more compact;
        for (let x=0; x<levelData.grid[0].length;++x){
            level[x] = new Array(levelData.grid.length);
            for (let y=0; y<13;++y){	   
               level[x][y] = getId(
               getTile(levelData.grid, y,x),
               getTile(levelData.grid, y-1,x),
               getTile(levelData.grid, y,x-1),
               getTile(levelData.grid, y,x+1),
               getTile(levelData.grid, y-1,x-1),
               getTile(levelData.grid, y-1,x+1),
               x,
               y,
               parser,
               levelData.pipeColor,
               levelData.liquidType,
               levelData.tileTint
               );
           }
       }
       return {grid: level, terrainType: levelData.terrainType, sky: levelData.sky, backgroundType: levelData.backgroundType, pipes: levelData.pipes, startPosition: levelData.startPosition};
    }