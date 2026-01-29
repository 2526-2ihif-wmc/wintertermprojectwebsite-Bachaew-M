document.addEventListener("DOMContentLoaded", () => {
    
    

    const mobData = {
        //HOSTILE
        blaze: { title: "Blaze", info: ["Shoots fireballs","Found in Nether Fortresses","Floats in the air","Drops Blaze Rods"] },
        creeper: { title: "Creeper", info: ["Silent explosive mob","Spawns in darkness","Explosion destroys blocks","Drops Gunpowder"] },
        "elder-guardian": { title: "Elder Guardian", info: ["Ocean Monument boss","Strong laser attack","Gives Mining Fatigue","Drops Sponge"] },
        endermite: { title: "Endermite", info: ["May spawn from Ender Pearls","Small & fast","Hated by Endermen"] },
        evoker: { title: "Evoker", info: ["Spellcasting illager","Fang ground attack","Drops Totem Of Undying"] },
        ghast: { title: "Ghast", info:["Flying Nether mob","Shoots fireballs","Drops Ghast Tear"] },
        guardian:{ title: "Guardian", info:["Ocean Monument mob","Laser beam attack","Drops Prismarine Shard"] },
        husk:{ title: "Husk", info:["Desert zombie","Doesn't burn in sun","Drops Rotten Flesh"] },
        "magma-cube":{ title: "Magma Cube", info:["Nether slime variant","Fire resistant","Drops Magma Cream"] },
        pillager:{ title: "Pillager", info:["Uses crossbow","Raids villages","Drops Emerald"] },
        ravager:{ title: "Ravager", info:["Raid beast","High damage and health","Drops Saddle"] },
        silverfish:{ title: "Silverfish", info:["Hides in blocks","Calls more when hit","No drops"] },
        skeleton:{ title: "Skeleton", info:["Bow ranged mob","Burns in sunlight","Drops Arrows/Bones"] },
        slime:{ title:"Slime", info:["Splits when killed","Bounces at player","Drops Slimeball"] },
        stray:{ title:"Stray", info:["Snow skeleton","Ranged fighter","Drops Arrows/Bones"] },
        vindicator:{ title: "Vindicator", info:["Axe illager","Strong melee damage","Drops Emerald"] },
        witch:{ title: "Witch", info:["Throws potions","Drinks healing potions","Drops brewing items"] },
        "wither-skeleton":{ title: "Wither Skeleton", info:["Nether mob","Tall & strong melee","Rare skull drop"] },
        //PASSIVE
        bat: { title: "Bat", info: ["Passive flying mob","Spawns in caves","No drops"] },
        rabbit: { title: "Rabbit", info: ["Fast passive mob","Jumps high","Drops Hide or Rabbit"] },
        chicken: { title: "Chicken", info: ["Lays eggs","Slow fall","Drops Chicken and Feathers"] },
        cod: { title: "Cod", info: ["Ocean fish","Swims in groups","Drops Raw Cod"] },
        cow: { title: "Cow", info: ["Milk with bucket","Breeds with wheat","Drops Beef and Leather"] },
        donkey: { title: "Donkey", info: ["Rideable","Can carry chests","Drops Leather"] },
        ocelot: { title: "Ocelot", info: ["Runs from players","Scares Creepers","No drops"] },
        villager: { title: "Villager", info: ["NPC mob","Trades items","Can be cured"] },
        mooshroom: { title: "Mooshroom", info: ["Mushroom cow","Found in Mushroom Fields","Drops Beef/Leather"] },
        parrot: { title: "Parrot", info: ["Shoulder pet","Mimics mobs","Can sit on shoulders"] },
        salmon: { title: "Salmon", info: ["River fish","Different sizes","Drops Raw Salmon"] },
        "snow-golem": { title: "Snow Golem", info: ["Player created","Throws snowballs","Melts in heat"] },
        squid: { title: "Squid", info: ["Swims randomly","Moves with currents","Drops Ink Sacs"] },
        cat: { title: "Cat", info: ["Scares Creepers","Sleeps on beds","Brings gifts"] },
        pig: { title: "Pig", info: ["Rideable","Bred with carrots","Drops Porkchop"] },
        "wandering-trader": { title: "Wandering Trader", info: ["Spawns near players","Trades rare items","Despawns later"] },
        horse: { title: "Horse", info: ["Rideable","Can wear armor","Varied speed/jump"] },
        sheep: { title: "Sheep", info: ["Provides wool","Wool can be dyed","Drops Mutton/Wool"] },
        //NEUTRAL
        "cave-spider": { title: "Cave Spider", info: ["Smaller spider","Poison bite","Drops String/Eye"] },
        enderman: { title: "Enderman", info: ["Aggressive when looked at","Moves blocks","Drops Ender Pearls"] },
        "iron-golem": { title: "Iron Golem", info: ["Village protector","Strong melee","Drops Iron/Poppies"] },
        spider: { title: "Spider", info: ["Neutral mob","Climbs walls","Drops String/Eye"] },
        "zombified-piglin": { title: "Zombified Piglin", info: ["Neutral until attacked","Nether mob","Drops Gold/Rotten Flesh"] },
        //BOSSES
        "ender-dragon": {title: "Ender Dragon", info: ["Final boss of Minecraft", "Found in The End Dimension", "Destroys blocks while flying"]},
        wither: {title: "Wither", info: ["Player-summoned boss", "Shoots explosive skulls", "Drops Nether Star"]}

    };

    const items = document.querySelectorAll('.list > li');
    const panel = document.getElementById('infoPanel');
    let currentMob = null;

    // Prevent panel clicks from closing it
    panel.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // Close panel when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".list > li") && !e.target.closest("#infoPanel")) {
            panel.style.opacity = "0";
            panel.style.visibility = "hidden";
            currentMob = null;
        }
    });

    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();

            const mob = item.dataset.mob;
            const data = mobData[mob];
            if (!data) return;

            // 🔥 TOGGLE LOGIC
            if (currentMob === mob) {
                panel.style.opacity = "0";
                panel.style.visibility = "hidden";
                currentMob = null;
                return;
            }

            currentMob = mob;

            const rect = item.getBoundingClientRect();
            const cardWidth = 270;
            const gap = 30;

            let leftPos = (rect.right + cardWidth + gap > window.innerWidth)
                ? rect.left - cardWidth - gap
                : rect.right + gap;

            panel.style.left = leftPos + window.scrollX + "px";
            panel.style.top = rect.top + window.scrollY + "px";

            const bossMobs = ["ender-dragon", "wither"];
            panel.className = "infoCard " + mob + (bossMobs.includes(mob) ? " bossCard" : "");

            panel.innerHTML = `
            <h2>${data.title}</h2>
            <ul>${data.info.map(line => `<li>${line}</li>`).join("")}</ul>
        `;

            panel.style.opacity = "1";
            panel.style.visibility = "visible";
        });
    });


});
