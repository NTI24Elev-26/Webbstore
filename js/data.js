//Data för de olika spel som visas
const games = [
    {
        id:'Brigands',
        name:'Brigands',
        image: 'images/brigands.png',
        price: 499,
        description: 'I den avlägsna världen proxima centauri B har korporationer mer makt än länder, för att ha mer makt hyr de legosoldater kallad Brigands.\n Kontrollera en mech och ta kontrakt från korporationer för att tjäna pengar och skapa din perfekta mech',
        tags: ['Action', 'Mech', 'Sci-Fi', 'Singleplayer', 'TPS']
    },
    {
        id: '2187-cyberpunk',
        name: '2187: The last ronin',
        image: 'images/cyber-ronin.png',
        price: 299,
        description: 'Ett cyberpunk-äventyr där du spelar som en ensam ronin i en framtida megastad. Snabb action och djup berättelse. Utforska neonskyltade gator, undvik megakorporationer och avslöja sanningen bakom den totalitära regimen.',
        tags: ['Action', 'RPG', 'Cyberpunk', 'Singleplayer', 'FPS']
    },
    {
        id: 'avalon',
        name: 'Avalon: rise of the phoenix',
        image: 'images/avalon.png',
        price: 399,
        description: 'Ett episkt fantasy-rollspel med en öppen värld och hundratals timmars spel. Välj din väg och forma ödet i en värld fylld med magi, forntida ruiner och mäktiga drakar.',
        tags: ['RPG', 'Fantasy', 'Open World', 'Multiplayer', 'Adventure']
    },
    {
        id: 'dungeon-crawler',
        name: 'Dungeon racer',
        image: 'images/dungeon race.png',
        price: 199,
        description: 'En unik blandning av racing och dungeon crawler. Drifta genom dödliga fängelsehålor och besegra monster tillsammans med vänner och din bil. Upplev pixelgrafik med modern spelmekanik.',
        tags: ['Racing', 'Indie', 'Arcade', 'Dungeon Crawler', 'Pixel Art', 'Multiplayer']
    },
    {
        id: 'star-shapers',
        name: 'Star Shapers: Galactic Frontier',
        image: 'images/grand strategy.png',
        price: 499,
        description: 'Bygg och utforska ditt eget rymdimperium i detta storskaliga strategispel. Handel, krig och diplomati väntar bland stjärnorna. Led din nation till seger och dominera galaxen.',
        tags: ['Strategy', 'Sci-Fi', 'Simulation', 'Multiplayer', 'Grand Strategy']
    },
    {
        id: 'mythos-mystery',
        name: 'Mythos Mystery: Unveiled Horrors',
        image: 'images/lovecraft.png',
        price: 249,
        description: 'Ett kusligt skräckspel med pussel och en mörk, H.P. Lovecraft-inspirerad berättelse. Är du redo att möta vansinnet som lurar i skuggorna? Ett spel som testar din mentala styrka.',
        tags: ['Horror', 'Puzzle', 'Indie', 'Singleplayer', 'Mystery']
    },
    {
        id: 'party-arena',
        name: 'Party Arena: Ultra Rumble',
        image: 'images/retro-arena.png',
        price: 99,
        description: 'Ett snabbt och roligt retro-inspirerat slagsmålsspel med pixlig grafik och klassiska karaktärer. Perfekt för soff-multiplayer-kvällar med vänner. Behärska varje karaktärs unika förmågor.',
        tags: ['Fighting', 'Arcade', 'Retro', 'Multiplayer', '2D']
    },
    {
        id: 'wild-west-shootout',
        name: 'Wild West Showdown',
        image: 'images/western.png',
        price: 279,
        description: 'Upplev Vilda Västern som en laglös revolverman eller en tappra sheriff. Intensiva eldstrider, hästjakter och en öppen värld full av faror och äventyr.',
        tags: ['Action', 'Adventure', 'Western', 'Singleplayer', 'Open World']
    },
    {
        id: 'future-farms',
        name: 'Future Farms: Cyber Harvest',
        image: 'images/farm.png',
        price: 329,
        description: 'Bygg och hantera din egen futuristiska bondgård på en avlägsen planet. Odla genetiskt modifierade grödor, automatisera din produktion och försvara dig mot rymdpirater.',
        tags: ['Simulation', 'Strategy', 'Sci-Fi', 'Management']
    },
    {
        id: 'shadow-sleuth',
        name: 'Shadow Sleuth: Detective Noir',
        image: 'images/noir.png',
        price: 189,
        description: 'Kliv in i rollen som en hårdkokt detektiv i en mörk noir-stad. Lös brott, förhör vittnen och avslöja en korrupt konspiration i en värld utan moral.',
        tags: ['Adventure', 'Puzzle', 'Noir', 'Singleplayer', 'Story-driven']
    },
    {
        id: 'cosmic-craze',
        name: 'Cosmic Craze',
        image: 'images/starship.png',
        price: 129,
        description: 'Ett kaotiskt rymd-arkadspel där du styr ett litet rymdskepp och kämpar mot vågor av utomjordingar. Samla power-ups och slåss om highscores.',
        tags: ['Arcade', 'Sci-Fi', 'Action', 'Indie']
    },
    {
        id: 'ancient-legends',
        name: 'Ancient Legends: Forged in Fire',
        image: 'images/adventurers.png',
        price: 359,
        description: 'Ett massivt online-rollspel (MMORPG) inspirerat av forntida mytologier. Skapa din hjälte, utforska vidsträckta landskap och delta i episka strider med tusentals andra spelare.',
        tags: ['MMORPG', 'Fantasy', 'Multiplayer', 'Open World']
    },
    {
        id: 'robot-rampage',
        name: 'Robot Rampage: Total Mayhem',
        image: 'images/robo fight.png',
        price: 269,
        description: 'Kontrollera gigantiska robotar i en stad förstörd av krig. Anpassa din robot, uppgradera dina vapen och förgör andra spelare i intensiva strider.',
        tags: ['Action', 'Sci-Fi', 'Fighting', 'Multiplayer', 'FPS']
    },
];