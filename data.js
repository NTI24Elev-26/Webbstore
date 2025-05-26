const games = [
    {
        id: 'cyber-ronin',
        name: 'Cyber Ronin: Neo Rebellion',
        image: 'images/cyber-ronin.jpg',
        price: 299,
        description: 'Ett cyberpunk-äventyr där du spelar som en ensam ronin i en framtida megastad. Snabb action och djup berättelse. Utforska neonskyltade gator, undvik megakorporationer och avslöja sanningen bakom den totalitära regimen.',
        tags: ['Action', 'RPG', 'Cyberpunk', 'Singleplayer', 'FPS']
    },
    {
        id: 'echoes-elysium',
        name: 'Echoes of Elysium',
        image: 'images/echoes-of-elysium.jpg',
        price: 399,
        description: 'Ett episkt fantasy-rollspel med en öppen värld och hundratals timmars spel. Välj din väg och forma ödet i en värld fylld med magi, forntida ruiner och mäktiga drakar.',
        tags: ['RPG', 'Fantasy', 'Open World', 'Multiplayer', 'Adventure']
    },
    {
        id: 'dungeon-drift',
        name: 'Dungeon Drift',
        image: 'images/dungeon-drift.jpg',
        price: 199,
        description: 'En unik blandning av racing och dungeon crawler. Drifta genom dödliga fängelsehålor och besegra monster med din modifierade bil. Upplev pixelgrafik med modern spelmekanik.',
        tags: ['Racing', 'Indie', 'Arcade', 'Dungeon Crawler', 'Pixel Art']
    },
    {
        id: 'star-shapers',
        name: 'Star Shapers: Galactic Frontier',
        image: 'images/star-shapers.jpg',
        price: 499,
        description: 'Bygg och utforska ditt eget rymdimperium i detta storskaliga strategispel. Handel, krig och diplomati väntar bland stjärnorna. Led din fraktion till seger och dominera galaxen.',
        tags: ['Strategy', 'Sci-Fi', 'Simulation', 'Multiplayer', 'Grand Strategy']
    },
    {
        id: 'mythos-mystery',
        name: 'Mythos Mystery: Unveiled Horrors',
        image: 'images/mythos-mystery.jpg',
        price: 249,
        description: 'Ett kusligt skräckspel med pussel och en mörk, H.P. Lovecraft-inspirerad berättelse. Är du redo att möta vansinnet som lurar i skuggorna? Ett spel som testar din mentala styrka.',
        tags: ['Horror', 'Puzzle', 'Indie', 'Singleplayer', 'Mystery']
    },
    {
        id: 'pixel-arena',
        name: 'Pixel Arena: Retro Rumble',
        image: 'images/pixel-arena.jpg',
        price: 99,
        description: 'Ett snabbt och roligt retro-inspirerat slagsmålsspel med pixlig grafik och klassiska karaktärer. Perfekt för soff-multiplayer-kvällar med vänner. Behärska varje karaktärs unika förmågor.',
        tags: ['Fighting', 'Arcade', 'Retro', 'Multiplayer', '2D']
    },
    {
        id: 'wild-west-shootout',
        name: 'Wild West Showdown',
        image: 'images/wild-west-shootout.jpg', // Skapa denna bild
        price: 279,
        description: 'Upplev Vilda Västern som en laglös revolverman eller en tappra sheriff. Intensiva eldstrider, hästjakter och en öppen värld full av faror och äventyr.',
        tags: ['Action', 'Adventure', 'Western', 'Singleplayer', 'Open World']
    },
    {
        id: 'future-farms',
        name: 'Future Farms: Cyber Harvest',
        image: 'images/future-farms.jpg', // Skapa denna bild
        price: 329,
        description: 'Bygg och hantera din egen futuristiska bondgård på en avlägsen planet. Odla genetiskt modifierade grödor, automatisera din produktion och försvara dig mot rymdpirater.',
        tags: ['Simulation', 'Strategy', 'Sci-Fi', 'Management']
    },
    {
        id: 'shadow-sleuth',
        name: 'Shadow Sleuth: Detective Noir',
        image: 'images/shadow-sleuth.jpg', // Skapa denna bild
        price: 189,
        description: 'Kliv in i rollen som en hårdkokt detektiv i en mörk noir-stad. Lös brott, förhör vittnen och avslöja en korrupt konspiration i en värld utan moral.',
        tags: ['Adventure', 'Puzzle', 'Noir', 'Singleplayer', 'Story-driven']
    },
    {
        id: 'cosmic-craze',
        name: 'Cosmic Craze',
        image: 'images/cosmic-craze.jpg', // Skapa denna bild
        price: 129,
        description: 'Ett kaotiskt rymd-arkadspel där du styr ett litet rymdskepp och kämpar mot vågor av utomjordingar. Samla power-ups och slåss om highscores.',
        tags: ['Arcade', 'Sci-Fi', 'Action', 'Indie']
    },
    {
        id: 'ancient-legends',
        name: 'Ancient Legends: Forged in Fire',
        image: 'images/ancient-legends.jpg', // Skapa denna bild
        price: 359,
        description: 'Ett massivt online-rollspel (MMORPG) inspirerat av forntida mytologier. Skapa din hjälte, utforska vidsträckta landskap och delta i episka strider med tusentals andra spelare.',
        tags: ['MMORPG', 'Fantasy', 'Multiplayer', 'Open World']
    },
    {
        id: 'robot-rampage',
        name: 'Robot Rampage: Mech Mayhem',
        image: 'images/robot-rampage.jpg', // Skapa denna bild
        price: 269,
        description: 'Kontrollera gigantiska robotar i en stad förstörd av krig. Anpassa din mech, uppgradera dina vapen och förgör dina fiender i intensiva strider.',
        tags: ['Action', 'Mech', 'Fighting', 'Singleplayer', 'FPS']
    }
];