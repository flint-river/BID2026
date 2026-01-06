    
    // Firebase Realtime Database - 50,000 reads/day FREE, resets daily!
    const FIREBASE_URL = 'https://bid2026-58308-default-rtdb.firebaseio.com';
	let confirmations = {};
    let bidHistory = {};        // Stores history arrays for each person: { "g1-1": [{line: "42", timestamp: "..."}, ...], ... }
    let rollbackStack = [];     // Stores rollback snapshots for multi-level undo
    let showBidHistory = false; // Toggle for showing Prev column
    let liveMode = false;       // Live mode for bid day - faster refresh
    let liveRefreshInterval = null;
    let lastDataHash = '';      // Track data changes for alerts

    const COLOR_MAP = {
        1: '#FFC000',
        2: '#00FFFF',
        3: '#00B0F0',
        4: '#FF0000',
        5: '#FFCCFF',
        6: '#C0C0C0',
        7: '#FFFF00',
        8: '#00FF00',
        9: '#FF66FF',
        99: '#7030A0',
    };
    const LIGHT_TEXT_CODES = [4, 99];

    const HOLIDAYS = {
        '2026-4-5': 'EAST1',
        '2026-5-10': 'MOM',
        '2026-5-25': 'MEMOR',
        '2026-6-21': 'DAD',
        '2026-7-4': '4TH',
        '2026-9-7': 'LABOR',
        '2026-11-26': 'THX',
        '2026-12-25': 'XMAS',
        '2027-1-1': 'NYD',
        '2027-2-14': 'SUPER',
        '2027-3-17': 'STPAT',
        '2027-3-28': 'EAST2',
    };

    // ALL_LINES_CALENDAR loaded from all_lines_calendar.js

    const GROUP1 = [{"nbr": 1, "name": "COST, BOB"}, {"nbr": 2, "name": "BRET, KEN"}, {"nbr": 3, "name": "ASTL, JOE"}, {"nbr": 4, "name": "PAWL, CHR"}, {"nbr": 5, "name": "BELF, VIN"}, {"nbr": 6, "name": "JOHN, BRI"}, {"nbr": 7, "name": "SMIT, DAV"}, {"nbr": 8, "name": "CAMP, KEV"}, {"nbr": 9, "name": "RECK, JAS"}, {"nbr": 10, "name": "DONA, JEF"}, {"nbr": 11, "name": "ADAM, MAR"}, {"nbr": 12, "name": "SCHA, DAV"}, {"nbr": 13, "name": "EMER, JES"}, {"nbr": 14, "name": "GRAF, BEN"}];
    const GROUP2 = [{"nbr": 1, "name": "BIRD, DAN"}, {"nbr": 2, "name": "FRAN, DAV"}, {"nbr": 3, "name": "CHAR, CAR"}, {"nbr": 4, "name": "SPRA, PER"}, {"nbr": 5, "name": "OLSE, ED"}, {"nbr": 6, "name": "HARR, JIM"}, {"nbr": 7, "name": "BAIL, RIC"}, {"nbr": 8, "name": "CLAR, JUD"}, {"nbr": 9, "name": "GWIN, BRI"}, {"nbr": 10, "name": "DANI, JEF"}, {"nbr": 11, "name": "SMIT, BAR"}, {"nbr": 12, "name": "RIEL, WAL"}, {"nbr": 13, "name": "ROHL, MIK"}, {"nbr": 14, "name": "HOUC, DAV"}, {"nbr": 15, "name": "STAN, LAN"}, {"nbr": 16, "name": "HOBS, MAR"}, {"nbr": 17, "name": "HOFF, DAN"}, {"nbr": 18, "name": "BAKE, ERI"}, {"nbr": 19, "name": "PUSZ, JIM"}, {"nbr": 20, "name": "HARA, DUD"}, {"nbr": 21, "name": "BATT, JAI"}, {"nbr": 22, "name": "SUCH, CHR"}, {"nbr": 23, "name": "(VACANT)"}, {"nbr": 24, "name": "HURL, JAC"}, {"nbr": 25, "name": "MCEL, KEV"}, {"nbr": 26, "name": "REED, MIK"}, {"nbr": 27, "name": "FUJI, ROX"}, {"nbr": 28, "name": "O'DO, BRI"}, {"nbr": 29, "name": "HAMI, ADA"}, {"nbr": 30, "name": "GEIG, GEO"}, {"nbr": 31, "name": "O'DO, WEN"}, {"nbr": 32, "name": "ESTE, KAT"}, {"nbr": 33, "name": "RINE, RAL"}, {"nbr": 34, "name": "ROMA, KEN"}, {"nbr": 35, "name": "HALL, CHA"}, {"nbr": 36, "name": "LONG, AND"}, {"nbr": 37, "name": "PAPP, ROB"}, {"nbr": 38, "name": "GAGN, JUL"}, {"nbr": 39, "name": "MALE, TOD"}, {"nbr": 40, "name": "MISN, HUO"}, {"nbr": 41, "name": "O'BR, DAV"}, {"nbr": 42, "name": "DELA, WIL"}, {"nbr": 43, "name": "BETC, MIC"}, {"nbr": 44, "name": "JOLL, DAV"}, {"nbr": 45, "name": "TOZZ, GIN"}, {"nbr": 46, "name": "MCMO, SHA"}, {"nbr": 47, "name": "RUCK, RIC"}, {"nbr": 48, "name": "WARN, DEE"}, {"nbr": 49, "name": "HENE, AND"}, {"nbr": 50, "name": "OSOJ, MER"}, {"nbr": 51, "name": "FOLE, RYA"}, {"nbr": 52, "name": "HILL, SEA"}, {"nbr": 53, "name": "MUGE, JEN"}, {"nbr": 54, "name": "DENM, JOH"}, {"nbr": 55, "name": "MAKI, RYA"}, {"nbr": 56, "name": "MCGR, DEA"}, {"nbr": 57, "name": "BRAD, LAT"}, {"nbr": 58, "name": "HATL, HER"}, {"nbr": 59, "name": "HAYE, JOH"}, {"nbr": 60, "name": "HARR, ELE"}, {"nbr": 61, "name": "PIOT, MAR"}, {"nbr": 62, "name": "CART, WES"}, {"nbr": 63, "name": "GAUL, PET"}, {"nbr": 64, "name": "BOST, GRE"}, {"nbr": 65, "name": "HINT, SEL"}, {"nbr": 66, "name": "TJAD, AND"}, {"nbr": 67, "name": "GEUR, STE"}, {"nbr": 68, "name": "KENT, AND"}, {"nbr": 69, "name": "SAMU, CHA"}, {"nbr": 70, "name": "CORN, DAN"}, {"nbr": 71, "name": "FATT, KEL"}, {"nbr": 72, "name": "STAR, JIM"}, {"nbr": 73, "name": "ALLE, JOS"}, {"nbr": 74, "name": "LATT, WIL"}, {"nbr": 75, "name": "TURI, LAU"}, {"nbr": 76, "name": "AUST, STE"}, {"nbr": 77, "name": "RAIN, MIK"}, {"nbr": 78, "name": "MILL, CRA"}, {"nbr": 79, "name": "LITT, CLA"}, {"nbr": 80, "name": "PIER, MAR"}, {"nbr": 81, "name": "HARN, ZAC"}];

    // Helper function to get name from key (e.g., "g2-1" -> "BIRD, DAN")
    function getNameFromKey(key) {
        const parts = key.split('-');
        const prefix = parts[0];
        const nbr = parseInt(parts[1]);
        const group = prefix === 'g1' ? GROUP1 : GROUP2;
        const person = group.find(p => p.nbr === nbr);
        return person ? person.name : '';
    }

    const ANNUAL_BID = [{"lineNbr": "1", "lineDesc": "SSOM", "days": ["--", "--", "E05A", "E05A", "E05A", "--", "--", "--", "E05A", "E05A", "--", "--"], "dayCodes": [8, 8, 1, 1, 1, 8, 8, 8, 1, 1, 8, 8], "lineColorCode": 1}, {"lineNbr": "2", "lineDesc": "SSOM", "days": ["E05A", "E05A", "--", "--", "--", "E05A", "E05A", "E05A", "--", "--", "--", "--"], "dayCodes": [1, 1, 8, 8, 8, 1, 1, 1, 8, 8, 8, 8], "lineColorCode": 1}, {"lineNbr": "3", "lineDesc": "SSOM", "days": ["--", "--", "A06M", "A06M", "A06M", "--", "--", "--", "A06M", "A06M", "--", "--"], "dayCodes": [8, 8, 1, 1, 1, 8, 8, 8, 1, 1, 8, 8], "lineColorCode": 1}, {"lineNbr": "4", "lineDesc": "SSOM", "days": ["A06M", "A06M", "--", "--", "--", "A06M", "A06M", "A06M", "--", "--", "--", "--"], "dayCodes": [1, 1, 8, 8, 8, 1, 1, 1, 8, 8, 8, 8], "lineColorCode": 1}, {"lineNbr": "5", "lineDesc": "SSOM", "days": ["--", "A09Z", "A09Z", "--", "--", "--", "--", "A09Z", "A09Z", "A09Z", "--", "--"], "dayCodes": [8, 1, 1, 8, 8, 8, 8, 1, 1, 1, 8, 8], "lineColorCode": 1}, {"lineNbr": "6", "lineDesc": "SSOM", "days": ["A09Z", "--", "--", "--", "--", "A09Z", "A09Z", "--", "--", "--", "A09Z", "A09Z"], "dayCodes": [1, 8, 8, 8, 8, 1, 1, 8, 8, 8, 1, 1], "lineColorCode": 1}, {"lineNbr": "7", "lineDesc": "SSOM", "days": ["--", "--", "--", "P12B", "P12B", "--", "--", "--", "--", "P12B", "P12B", "P12B"], "dayCodes": [8, 8, 8, 1, 1, 8, 8, 8, 8, 1, 1, 1], "lineColorCode": 1}, {"lineNbr": "8", "lineDesc": "SSOM", "days": ["P12B", "P12B", "P12B", "--", "--", "--", "--", "P12B", "P12B", "--", "--", "--"], "dayCodes": [1, 1, 1, 8, 8, 8, 8, 1, 1, 8, 8, 8], "lineColorCode": 1}, {"lineNbr": "9", "lineDesc": "SSOM", "days": ["--", "--", "--", "--", "A09Z", "P12B", "P12B", "--", "--", "--", "E05A", "E05A"], "dayCodes": [8, 8, 8, 8, 1, 1, 1, 8, 8, 8, 1, 1], "lineColorCode": 99}, {"lineNbr": "10", "lineDesc": "SSOM", "days": ["--", "--", "--", "A09Z", "M18M", "M18M", "--", "--", "--", "--", "A06M", "A06M"], "dayCodes": [8, 8, 8, 1, 6, 6, 8, 8, 8, 8, 1, 1], "lineColorCode": 99}, {"lineNbr": "11", "lineDesc": "SSOM", "days": ["--", "--", "M18M", "M18M", "--", "--", "--", "--", "M18M", "M18M", "M18M", "--"], "dayCodes": [8, 8, 6, 6, 8, 8, 8, 8, 6, 6, 6, 8], "lineColorCode": 6}, {"lineNbr": "12", "lineDesc": "SSOM", "days": ["M18M", "M18M", "--", "--", "--", "--", "M18M", "M18M", "--", "--", "--", "M18M"], "dayCodes": [6, 6, 8, 8, 8, 8, 6, 6, 8, 8, 8, 6], "lineColorCode": 6}, {"lineNbr": "13", "lineDesc": "SSOM", "days": ["--", "--", "XXX", "XXX", "--", "--", "--", "XXX", "XXX", "XXX", "--", "--"], "dayCodes": [8, 8, 7, 7, 8, 8, 8, 7, 7, 7, 8, 8], "lineColorCode": 7}, {"lineNbr": "14", "lineDesc": "SSOM", "days": ["--", "--", "--", "--", "XXX", "XXX", "XXX", "--", "--", "--", "XXX", "XXX"], "dayCodes": [8, 8, 8, 8, 7, 7, 7, 8, 8, 8, 7, 7], "lineColorCode": 7}, {"lineNbr": "15", "lineDesc": "SOM", "days": ["A06C", "--", "--", "--", "--", "A06C", "A06C", "A06C", "--", "--", "--", "A06C"], "dayCodes": [2, 8, 8, 8, 8, 2, 2, 2, 8, 8, 8, 2], "lineColorCode": 2}, {"lineNbr": "16", "lineDesc": "SOM", "days": ["--", "--", "--", "A06C", "A06C", "--", "--", "--", "A06C", "A06C", "A06C", "--"], "dayCodes": [8, 8, 8, 2, 2, 8, 8, 8, 2, 2, 2, 8], "lineColorCode": 2}, {"lineNbr": "17", "lineDesc": "SOM", "days": ["--", "--", "A06F", "A06F", "A06F", "--", "--", "--", "--", "A06F", "A06F", "--"], "dayCodes": [8, 8, 3, 3, 3, 8, 8, 8, 8, 3, 3, 8], "lineColorCode": 3}, {"lineNbr": "18", "lineDesc": "SOM", "days": ["A06F", "A06F", "--", "--", "--", "A06F", "A06F", "--", "--", "--", "--", "A06F"], "dayCodes": [3, 3, 8, 8, 8, 3, 3, 8, 8, 8, 8, 3], "lineColorCode": 3}, {"lineNbr": "19", "lineDesc": "SOM", "days": ["A06J", "--", "--", "--", "A06J", "A06J", "--", "--", "--", "--", "A06J", "A06J"], "dayCodes": [4, 8, 8, 8, 4, 4, 8, 8, 8, 8, 4, 4], "lineColorCode": 4}, {"lineNbr": "20", "lineDesc": "SOM", "days": ["--", "A06J", "A06J", "A06J", "--", "--", "--", "--", "A06J", "A06J", "--", "--"], "dayCodes": [8, 4, 4, 4, 8, 8, 8, 8, 4, 4, 8, 8], "lineColorCode": 4}, {"lineNbr": "21", "lineDesc": "SOM", "days": ["A09D", "--", "--", "--", "A09D", "A09D", "--", "--", "--", "--", "A09D", "A09D"], "dayCodes": [2, 8, 8, 8, 2, 2, 8, 8, 8, 8, 2, 2], "lineColorCode": 2}, {"lineNbr": "22", "lineDesc": "SOM", "days": ["--", "A09D", "A09D", "A09D", "--", "--", "--", "--", "A09D", "A09D", "--", "--"], "dayCodes": [8, 2, 2, 2, 8, 8, 8, 8, 2, 2, 8, 8], "lineColorCode": 2}, {"lineNbr": "23", "lineDesc": "SOM", "days": ["--", "--", "P12H", "P12H", "--", "--", "--", "P12H", "P12H", "P12H", "--", "--"], "dayCodes": [8, 8, 3, 3, 8, 8, 8, 3, 3, 3, 8, 8], "lineColorCode": 3}, {"lineNbr": "24", "lineDesc": "SOM", "days": ["--", "--", "--", "--", "P12H", "P12H", "P12H", "--", "--", "--", "P12H", "P12H"], "dayCodes": [8, 8, 8, 8, 3, 3, 3, 8, 8, 8, 3, 3], "lineColorCode": 3}, {"lineNbr": "25", "lineDesc": "SOM", "days": ["P12G", "P12G", "P12G", "--", "--", "--", "P12G", "P12G", "--", "--", "--", "--"], "dayCodes": [3, 3, 3, 8, 8, 8, 3, 3, 8, 8, 8, 8], "lineColorCode": 3}, {"lineNbr": "26", "lineDesc": "SOM", "days": ["--", "--", "--", "P12G", "P12G", "P12G", "--", "--", "--", "--", "P12G", "P12G"], "dayCodes": [8, 8, 8, 3, 3, 3, 8, 8, 8, 8, 3, 3], "lineColorCode": 3}, {"lineNbr": "27", "lineDesc": "SOM", "days": ["P12K", "P12K", "--", "--", "--", "--", "P12K", "P12K", "P12K", "--", "--", "--"], "dayCodes": [4, 4, 8, 8, 8, 8, 4, 4, 4, 8, 8, 8], "lineColorCode": 4}, {"lineNbr": "28", "lineDesc": "SOM", "days": ["--", "--", "--", "--", "P12K", "P12K", "--", "--", "--", "P12K", "P12K", "P12K"], "dayCodes": [8, 8, 8, 8, 4, 4, 8, 8, 8, 4, 4, 4], "lineColorCode": 4}, {"lineNbr": "29", "lineDesc": "SOM", "days": ["--", "--", "P12E", "P12E", "P12E", "--", "--", "--", "P12E", "P12E", "--", "--"], "dayCodes": [8, 8, 2, 2, 2, 8, 8, 8, 2, 2, 8, 8], "lineColorCode": 2}, {"lineNbr": "30", "lineDesc": "SOM", "days": ["P12E", "P12E", "--", "--", "--", "P12E", "P12E", "P12E", "--", "--", "--", "--"], "dayCodes": [2, 2, 8, 8, 8, 2, 2, 2, 8, 8, 8, 8], "lineColorCode": 2}, {"lineNbr": "31", "lineDesc": "SOM", "days": ["P12H", "P12H", "--", "--", "--", "--", "A09D", "A09D", "--", "--", "--", "P12E"], "dayCodes": [3, 3, 8, 8, 8, 8, 2, 2, 8, 8, 8, 2], "lineColorCode": 99}, {"lineNbr": "32", "lineDesc": "SOM", "days": ["--", "--", "P12K", "P12K", "--", "--", "--", "--", "P12G", "P12G", "P12E", "--"], "dayCodes": [8, 8, 4, 4, 8, 8, 8, 8, 3, 3, 2, 8], "lineColorCode": 99}, {"lineNbr": "33", "lineDesc": "SOM", "days": ["--", "A06C", "A06C", "--", "--", "--", "A06J", "A06F", "A06F", "--", "--", "--"], "dayCodes": [8, 2, 2, 8, 8, 8, 4, 3, 3, 8, 8, 8], "lineColorCode": 99}, {"lineNbr": "34", "lineDesc": "SOM", "days": ["--", "A10O", "A10O", "--", "--", "--", "--", "A10O", "A10O", "A10O", "--", "--"], "dayCodes": [8, 9, 9, 8, 8, 8, 8, 9, 9, 9, 8, 8], "lineColorCode": 9}, {"lineNbr": "35", "lineDesc": "SOM", "days": ["A10O", "--", "--", "--", "--", "A10O", "A10O", "--", "--", "--", "A10O", "A10O"], "dayCodes": [9, 8, 8, 8, 8, 9, 9, 8, 8, 8, 9, 9], "lineColorCode": 9}, {"lineNbr": "36", "lineDesc": "SOM", "days": ["A06N", "A06N", "A06N", "--", "--", "--", "A06N", "A06N", "--", "--", "--", "--"], "dayCodes": [5, 5, 5, 8, 8, 8, 5, 5, 8, 8, 8, 8], "lineColorCode": 5}, {"lineNbr": "37", "lineDesc": "SOM", "days": ["--", "--", "--", "A06N", "A06N", "A06N", "--", "--", "--", "--", "A06N", "A06N"], "dayCodes": [8, 8, 8, 5, 5, 5, 8, 8, 8, 8, 5, 5], "lineColorCode": 5}, {"lineNbr": "38", "lineDesc": "SOM", "days": ["A06Q", "A06Q", "--", "--", "--", "--", "A06Q", "A06Q", "A06Q", "--", "--", "--"], "dayCodes": [5, 5, 8, 8, 8, 8, 5, 5, 5, 8, 8, 8], "lineColorCode": 5}, {"lineNbr": "39", "lineDesc": "SOM", "days": ["--", "--", "--", "--", "A06Q", "A06Q", "--", "--", "--", "A06Q", "A06Q", "A06Q"], "dayCodes": [8, 8, 8, 8, 5, 5, 8, 8, 8, 5, 5, 5], "lineColorCode": 5}, {"lineNbr": "40", "lineDesc": "SOM", "days": ["A06R", "--", "--", "--", "--", "A06R", "A06R", "A06R", "--", "--", "--", "A06R"], "dayCodes": [5, 8, 8, 8, 8, 5, 5, 5, 8, 8, 8, 5], "lineColorCode": 5}, {"lineNbr": "41", "lineDesc": "SOM", "days": ["--", "--", "--", "A06R", "A06R", "--", "--", "--", "A06R", "A06R", "A06R", "--"], "dayCodes": [8, 8, 8, 5, 5, 8, 8, 8, 5, 5, 5, 8], "lineColorCode": 5}, {"lineNbr": "42", "lineDesc": "SOM", "days": ["A06S", "A06S", "--", "--", "--", "A06S", "A06S", "--", "--", "--", "--", "A06S"], "dayCodes": [5, 5, 8, 8, 8, 5, 5, 8, 8, 8, 8, 5], "lineColorCode": 5}, {"lineNbr": "43", "lineDesc": "SOM", "days": ["--", "--", "A06S", "A06S", "A06S", "--", "--", "--", "--", "A06S", "A06S", "--"], "dayCodes": [8, 8, 5, 5, 5, 8, 8, 8, 8, 5, 5, 8], "lineColorCode": 5}, {"lineNbr": "44", "lineDesc": "SOM", "days": ["--", "A06U", "A06U", "--", "--", "--", "--", "A06U", "A06U", "A06U", "--", "--"], "dayCodes": [8, 5, 5, 8, 8, 8, 8, 5, 5, 5, 8, 8], "lineColorCode": 5}, {"lineNbr": "45", "lineDesc": "SOM", "days": ["A06U", "--", "--", "--", "--", "A06U", "A06U", "--", "--", "--", "A06U", "A06U"], "dayCodes": [5, 8, 8, 8, 8, 5, 5, 8, 8, 8, 5, 5], "lineColorCode": 5}, {"lineNbr": "46", "lineDesc": "SOM", "days": ["A06V", "A06V", "A06V", "--", "--", "--", "A06V", "A06V", "--", "--", "--", "--"], "dayCodes": [5, 5, 5, 8, 8, 8, 5, 5, 8, 8, 8, 8], "lineColorCode": 5}, {"lineNbr": "47", "lineDesc": "SOM", "days": ["--", "--", "--", "A06V", "A06V", "A06V", "--", "--", "--", "--", "A06V", "A06V"], "dayCodes": [8, 8, 8, 5, 5, 5, 8, 8, 8, 8, 5, 5], "lineColorCode": 5}, {"lineNbr": "48", "lineDesc": "SOM", "days": ["--", "A06W", "A06W", "--", "--", "--", "--", "A06W", "A06W", "A06W", "--", "--"], "dayCodes": [8, 5, 5, 8, 8, 8, 8, 5, 5, 5, 8, 8], "lineColorCode": 5}, {"lineNbr": "49", "lineDesc": "SOM", "days": ["A06W", "--", "--", "--", "--", "A06W", "A06W", "--", "--", "--", "A06W", "A06W"], "dayCodes": [5, 8, 8, 8, 8, 5, 5, 8, 8, 8, 5, 5], "lineColorCode": 5}, {"lineNbr": "50", "lineDesc": "SOM", "days": ["A06X", "--", "--", "--", "--", "A06X", "A06X", "A06X", "--", "--", "--", "A06X"], "dayCodes": [5, 8, 8, 8, 8, 5, 5, 5, 8, 8, 8, 5], "lineColorCode": 5}, {"lineNbr": "51", "lineDesc": "SOM", "days": ["--", "--", "--", "A06X", "A06X", "--", "--", "--", "A06X", "A06X", "A06X", "--"], "dayCodes": [8, 8, 8, 5, 5, 8, 8, 8, 5, 5, 5, 8], "lineColorCode": 5}, {"lineNbr": "52", "lineDesc": "SOM", "days": ["A06Y", "A06Y", "A06Y", "--", "--", "--", "A06Y", "A06Y", "--", "--", "--", "--"], "dayCodes": [5, 5, 5, 8, 8, 8, 5, 5, 8, 8, 8, 8], "lineColorCode": 5}, {"lineNbr": "53", "lineDesc": "SOM", "days": ["--", "--", "--", "A06Y", "A06Y", "A06Y", "--", "--", "--", "--", "A06Y", "A06Y"], "dayCodes": [8, 8, 8, 5, 5, 5, 8, 8, 8, 8, 5, 5], "lineColorCode": 5}, {"lineNbr": "54", "lineDesc": "SOM", "days": ["--", "A06X", "A06X", "--", "--", "--", "--", "A06J", "A06V", "A06V", "--", "--"], "dayCodes": [8, 5, 5, 8, 8, 8, 8, 4, 5, 5, 8, 8], "lineColorCode": 99}, {"lineNbr": "55", "lineDesc": "SOM", "days": ["--", "--", "A06R", "A06W", "A06W", "--", "--", "--", "A06N", "A06N", "--", "--"], "dayCodes": [8, 8, 5, 5, 5, 8, 8, 8, 5, 5, 8, 8], "lineColorCode": 99}, {"lineNbr": "56", "lineDesc": "SOM", "days": ["--", "A06R", "A06Q", "A06Q", "--", "--", "--", "A06S", "A06S", "--", "--", "--"], "dayCodes": [8, 5, 5, 5, 8, 8, 8, 5, 5, 8, 8, 8], "lineColorCode": 99}, {"lineNbr": "57", "lineDesc": "SOM", "days": ["--", "--", "--", "A06U", "A06U", "--", "--", "--", "A06Y", "A06Y", "XX", "--"], "dayCodes": [8, 8, 8, 5, 5, 8, 8, 8, 5, 5, 7, 8], "lineColorCode": 99}, {"lineNbr": "58", "lineDesc": "SOM", "days": ["--", "--", "--", "M18N", "M18N", "M18N", "--", "--", "--", "--", "M18N", "M18N"], "dayCodes": [8, 8, 8, 6, 6, 6, 8, 8, 8, 8, 6, 6], "lineColorCode": 6}, {"lineNbr": "59", "lineDesc": "SOM", "days": ["M18N", "M18N", "M18N", "--", "--", "--", "M18N", "M18N", "--", "--", "--", "--"], "dayCodes": [6, 6, 6, 8, 8, 8, 6, 6, 8, 8, 8, 8], "lineColorCode": 6}, {"lineNbr": "60", "lineDesc": "SOM", "days": ["M18Q", "M18Q", "--", "--", "--", "--", "M18Q", "M18Q", "M18Q", "--", "--", "--"], "dayCodes": [6, 6, 8, 8, 8, 8, 6, 6, 6, 8, 8, 8], "lineColorCode": 6}, {"lineNbr": "61", "lineDesc": "SOM", "days": ["--", "--", "--", "--", "M18Q", "M18Q", "--", "--", "--", "M18Q", "M18Q", "M18Q"], "dayCodes": [8, 8, 8, 8, 6, 6, 8, 8, 8, 6, 6, 6], "lineColorCode": 6}, {"lineNbr": "62", "lineDesc": "SOM", "days": ["M18R", "--", "--", "--", "--", "M18R", "M18R", "M18R", "--", "--", "--", "M18R"], "dayCodes": [6, 8, 8, 8, 8, 6, 6, 6, 8, 8, 8, 6], "lineColorCode": 6}, {"lineNbr": "63", "lineDesc": "SOM", "days": ["--", "--", "--", "M18R", "M18R", "--", "--", "--", "M18R", "M18R", "M18R", "--"], "dayCodes": [8, 8, 8, 6, 6, 8, 8, 8, 6, 6, 6, 8], "lineColorCode": 6}, {"lineNbr": "64", "lineDesc": "SOM", "days": ["M18S", "M18S", "--", "--", "--", "M18S", "M18S", "--", "--", "--", "--", "M18S"], "dayCodes": [6, 6, 8, 8, 8, 6, 6, 8, 8, 8, 8, 6], "lineColorCode": 6}, {"lineNbr": "65", "lineDesc": "SOM", "days": ["--", "--", "M18S", "M18S", "M18S", "--", "--", "--", "--", "M18S", "M18S", "--"], "dayCodes": [8, 8, 6, 6, 6, 8, 8, 8, 8, 6, 6, 8], "lineColorCode": 6}, {"lineNbr": "66", "lineDesc": "SOM", "days": ["--", "--", "M18U", "M18U", "M18U", "--", "--", "--", "M18U", "M18U", "--", "--"], "dayCodes": [8, 8, 6, 6, 6, 8, 8, 8, 6, 6, 8, 8], "lineColorCode": 6}, {"lineNbr": "67", "lineDesc": "SOM", "days": ["M18U", "M18U", "--", "--", "--", "M18U", "M18U", "M18U", "--", "--", "--", "--"], "dayCodes": [6, 6, 8, 8, 8, 6, 6, 6, 8, 8, 8, 8], "lineColorCode": 6}, {"lineNbr": "68", "lineDesc": "SOM", "days": ["--", "M18V", "M18V", "--", "--", "--", "--", "M18V", "M18V", "M18V", "--", "--"], "dayCodes": [8, 6, 6, 8, 8, 8, 8, 6, 6, 6, 8, 8], "lineColorCode": 6}, {"lineNbr": "69", "lineDesc": "SOM", "days": ["M18V", "--", "--", "--", "--", "M18V", "M18V", "--", "--", "--", "M18V", "M18V"], "dayCodes": [6, 8, 8, 8, 8, 6, 6, 8, 8, 8, 6, 6], "lineColorCode": 6}, {"lineNbr": "70", "lineDesc": "SOM", "days": ["--", "M18W", "M18W", "--", "--", "--", "--", "M18W", "M18W", "M18W", "--", "--"], "dayCodes": [8, 6, 6, 8, 8, 8, 8, 6, 6, 6, 8, 8], "lineColorCode": 6}, {"lineNbr": "71", "lineDesc": "SOM", "days": ["M18W", "--", "--", "--", "--", "M18W", "M18W", "--", "--", "--", "M18W", "M18W"], "dayCodes": [6, 8, 8, 8, 8, 6, 6, 8, 8, 8, 6, 6], "lineColorCode": 6}, {"lineNbr": "72", "lineDesc": "SOM", "days": ["--", "M18X", "M18X", "M18X", "--", "--", "--", "M18X", "M18X", "--", "--", "--"], "dayCodes": [8, 6, 6, 6, 8, 8, 8, 6, 6, 8, 8, 8], "lineColorCode": 6}, {"lineNbr": "73", "lineDesc": "SOM", "days": ["M18X", "--", "--", "--", "M18X", "M18X", "M18X", "--", "--", "--", "--", "M18X"], "dayCodes": [6, 8, 8, 8, 6, 6, 6, 8, 8, 8, 8, 6], "lineColorCode": 6}, {"lineNbr": "74", "lineDesc": "SOM", "days": ["M18Y", "M18Y", "M18Y", "--", "--", "--", "M18Y", "M18Y", "--", "--", "--", "--"], "dayCodes": [6, 6, 6, 8, 8, 8, 6, 6, 8, 8, 8, 8], "lineColorCode": 6}, {"lineNbr": "75", "lineDesc": "SOM", "days": ["--", "--", "--", "M18Y", "M18Y", "M18Y", "--", "--", "--", "--", "M18Y", "M18Y"], "dayCodes": [8, 8, 8, 6, 6, 6, 8, 8, 8, 8, 6, 6], "lineColorCode": 6}, {"lineNbr": "76", "lineDesc": "SOM", "days": ["--", "--", "--", "M18V", "M18V", "--", "--", "--", "--", "M18X", "M18X", "M18U"], "dayCodes": [8, 8, 8, 6, 6, 8, 8, 8, 8, 6, 6, 6], "lineColorCode": 99}, {"lineNbr": "77", "lineDesc": "SOM", "days": ["--", "--", "M18R", "M18W", "M18W", "--", "--", "--", "M18N", "M18N", "--", "--"], "dayCodes": [8, 8, 6, 6, 6, 8, 8, 8, 6, 6, 8, 8], "lineColorCode": 99}, {"lineNbr": "78", "lineDesc": "SOM", "days": ["--", "M18R", "M18Q", "M18Q", "--", "--", "--", "M18S", "M18S", "--", "--", "--"], "dayCodes": [8, 6, 6, 6, 8, 8, 8, 6, 6, 8, 8, 8], "lineColorCode": 99}, {"lineNbr": "79", "lineDesc": "SOM", "days": ["--", "--", "--", "A10O", "A10O", "--", "--", "--", "M18Y", "M18Y", "M18U", "--"], "dayCodes": [8, 8, 8, 9, 9, 8, 8, 8, 6, 6, 6, 8], "lineColorCode": 99}, {"lineNbr": "80", "lineDesc": "SOM", "days": ["--", "XX", "XX", "XX", "--", "--", "--", "--", "XX", "XX", "--", "--"], "dayCodes": [8, 7, 7, 7, 8, 8, 8, 8, 7, 7, 8, 8], "lineColorCode": 7}, {"lineNbr": "81", "lineDesc": "SOM", "days": ["--", "--", "XX", "XX", "XX", "--", "--", "--", "--", "XX", "XX", "--"], "dayCodes": [8, 8, 7, 7, 7, 8, 8, 8, 8, 7, 7, 8], "lineColorCode": 7}, {"lineNbr": "82", "lineDesc": "SOM", "days": ["--", "--", "--", "XX", "XX", "XX", "--", "--", "--", "--", "XX", "XX"], "dayCodes": [8, 8, 8, 7, 7, 7, 8, 8, 8, 8, 7, 7], "lineColorCode": 7}, {"lineNbr": "83", "lineDesc": "SOM", "days": ["XX", "--", "--", "--", "XX", "XX", "XX", "--", "--", "--", "--", "XX"], "dayCodes": [7, 8, 8, 8, 7, 7, 7, 8, 8, 8, 8, 7], "lineColorCode": 7}, {"lineNbr": "84", "lineDesc": "SOM", "days": ["XX", "XX", "--", "--", "--", "XX", "XX", "XX", "--", "--", "--", "--"], "dayCodes": [7, 7, 8, 8, 8, 7, 7, 7, 8, 8, 8, 8], "lineColorCode": 7}, {"lineNbr": "85", "lineDesc": "SOM", "days": ["--", "XX", "XX", "--", "--", "--", "XX", "XX", "XX", "--", "--", "--"], "dayCodes": [8, 7, 7, 8, 8, 8, 7, 7, 7, 8, 8, 8], "lineColorCode": 7}, {"lineNbr": "86", "lineDesc": "SOM", "days": ["--", "--", "XX", "XX", "--", "--", "--", "XX", "XX", "XX", "--", "--"], "dayCodes": [8, 8, 7, 7, 8, 8, 8, 7, 7, 7, 8, 8], "lineColorCode": 7}, {"lineNbr": "87", "lineDesc": "SOM", "days": ["--", "--", "--", "XX", "XX", "--", "--", "--", "XX", "XX", "XX", "--"], "dayCodes": [8, 8, 8, 7, 7, 8, 8, 8, 7, 7, 7, 8], "lineColorCode": 7}, {"lineNbr": "88", "lineDesc": "SOM", "days": ["XX", "--", "--", "--", "XX", "XX", "--", "--", "--", "--", "XX", "XX"], "dayCodes": [7, 8, 8, 8, 7, 7, 8, 8, 8, 8, 7, 7], "lineColorCode": 7}, {"lineNbr": "89", "lineDesc": "SOM", "days": ["XX", "--", "--", "--", "--", "XX", "XX", "--", "--", "--", "XX", "XX"], "dayCodes": [7, 8, 8, 8, 8, 7, 7, 8, 8, 8, 7, 7], "lineColorCode": 7}, {"lineNbr": "90", "lineDesc": "SOM", "days": ["XX", "XX", "--", "--", "--", "--", "XX", "XX", "--", "--", "--", "XX"], "dayCodes": [7, 7, 8, 8, 8, 8, 7, 7, 8, 8, 8, 7], "lineColorCode": 7}, {"lineNbr": "91", "lineDesc": "SOM", "days": ["XX", "XX", "XX", "--", "--", "--", "--", "XX", "XX", "--", "--", "--"], "dayCodes": [7, 7, 7, 8, 8, 8, 8, 7, 7, 8, 8, 8], "lineColorCode": 7}, {"lineNbr": "92", "lineDesc": "SOM", "days": ["--", "XX", "XX", "XX", "--", "--", "--", "--", "XX", "XX", "--", "--"], "dayCodes": [8, 7, 7, 7, 8, 8, 8, 8, 7, 7, 8, 8], "lineColorCode": 7}, {"lineNbr": "93", "lineDesc": "SOM", "days": ["XX", "--", "--", "--", "XX", "XX", "XX", "--", "--", "--", "--", "XX"], "dayCodes": [7, 8, 8, 8, 7, 7, 7, 8, 8, 8, 8, 7], "lineColorCode": 7}, {"lineNbr": "94", "lineDesc": "SOM", "days": ["--", "--", "XX", "XX", "--", "--", "--", "XX", "XX", "XX", "--", "--"], "dayCodes": [8, 8, 7, 7, 8, 8, 8, 7, 7, 7, 8, 8], "lineColorCode": 7}, {"lineNbr": "95", "lineDesc": "SOM", "days": ["--", "--", "--", "--", "XX", "XX", "--", "--", "--", "XX", "XX", "XX"], "dayCodes": [8, 8, 8, 8, 7, 7, 8, 8, 8, 7, 7, 7], "lineColorCode": 7}];

    let assignments = {};
    let isAdmin = false;
    let refreshInterval = null;
    let currentCalendarLine = null;

    document.addEventListener('DOMContentLoaded', async () => {
        if (sessionStorage.getItem('polish_bid_admin') === 'true') {
            isAdmin = true;
            enableAdminMode();
        }
        await initCloud();
        renderAll();

        // Check for line parameter in URL to auto-open calendar
        const urlParams = new URLSearchParams(window.location.search);
        const lineParam = urlParams.get('line');
        if (lineParam) {
            const lineNbr = lineParam;
            const lineExists = ANNUAL_BID.some(line => line.lineNbr === lineNbr);
            if (lineExists) {
                showCalendar(lineNbr);
            }
        }

        // Check for promptAdmin parameter to auto-show password prompt
        const promptAdminParam = urlParams.get('promptAdmin');
        if (promptAdminParam === 'true' && !isAdmin) {
            setTimeout(() => {
                showPasswordModal();
            }, 500);
        }

        // Auto-refresh every 5 minutes for viewers
        if (!isAdmin) {
            refreshInterval = setInterval(loadFromCloud, 300000);
        }
    });

    async function initCloud() {
        await loadFromCloud();
    }

    async function loadFromCloud() {
        setSyncStatus('syncing', 'Loading...');
        try {
            const response = await fetch(`${FIREBASE_URL}/bid.json`);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            if (data && typeof data === 'object') {
                // Create hash of current data to detect changes
                const newDataHash = JSON.stringify(data.assignments || {});
                const dataChanged = lastDataHash !== '' && lastDataHash !== newDataHash;
                lastDataHash = newDataHash;
                
                assignments = data.assignments || {};
		confirmations = data.confirmations || {};
                bidHistory = data.bidHistory || {};
                rollbackStack = data.rollbackStack || [];
                
                // Backup to localStorage
                saveHistoryToLocal();
                
                renderAll();
                updateUndoRollbackDropdown();
                const time = new Date().toISOString().substr(11, 8) + 'Z';
                setSyncStatus('ok', `Loaded`);
                document.getElementById('lastRefresh').textContent = time;
                
                // Alert on data change (for viewers)
                if (dataChanged && !isAdmin) {
                    showDataChangeAlert();
                }
            } else {
                const time = new Date().toISOString().substr(11, 8) + 'Z';
                setSyncStatus('ok', 'No data yet');
                document.getElementById('lastRefresh').textContent = time;
            }
        } catch (err) {
            console.error('Failed to load from cloud:', err);
            setSyncStatus('error', 'Load failed');
            // Try to load from localStorage backup
            loadHistoryFromLocal();
        }
    }
    
    function saveHistoryToLocal() {
        try {
            localStorage.setItem('polish_bid_history_backup', JSON.stringify({
                bidHistory: bidHistory,
                rollbackStack: rollbackStack,
                timestamp: new Date().toISOString()
            }));
        } catch (e) {
            console.error('Error saving history to localStorage:', e);
        }
    }
    
    function loadHistoryFromLocal() {
        try {
            const stored = localStorage.getItem('polish_bid_history_backup');
            if (stored) {
                const data = JSON.parse(stored);
                bidHistory = data.bidHistory || {};
                rollbackStack = data.rollbackStack || [];
                console.log('Loaded history from localStorage backup');
            }
        } catch (e) {
            console.error('Error loading history from localStorage:', e);
        }
    }
    
    function showDataChangeAlert() {
        // Play sound
        playAlertSound();
        
        // Visual flash
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(78, 204, 163, 0.3);
            pointer-events: none;
            z-index: 9999;
            animation: flashFade 0.5s ease-out forwards;
        `;
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 500);
        
        // Show notification banner
        showNotificationBanner('🔔 Bid data updated!');
    }
    
    function playAlertSound() {
        try {
            // Create a simple beep using Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            console.log('Could not play alert sound:', e);
        }
    }
    
    function showNotificationBanner(message) {
        // Remove any existing banner
        const existing = document.getElementById('notificationBanner');
        if (existing) existing.remove();
        
        const banner = document.createElement('div');
        banner.id = 'notificationBanner';
        banner.style.cssText = `
            position: fixed;
            top: 60px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #4ecca3 0%, #45b393 100%);
            color: #1a1a2e;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 4px 15px rgba(78, 204, 163, 0.4);
            animation: slideDown 0.3s ease-out;
        `;
        banner.textContent = message;
        document.body.appendChild(banner);
        
        setTimeout(() => {
            banner.style.animation = 'slideUp 0.3s ease-in forwards';
            setTimeout(() => banner.remove(), 300);
        }, 3000);
    }

    async function saveToCloud() {
        if (!isAdmin) return;

        setSyncStatus('syncing', 'Saving...');
        try {
            await fetch(`${FIREBASE_URL}/bid.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    assignments: assignments,
                    confirmations: confirmations,
                    bidHistory: bidHistory,
                    rollbackStack: rollbackStack,
                    lastUpdated: new Date().toISOString()
                })
            });
            const time = new Date().toISOString().substr(11, 8) + 'Z';
            setSyncStatus('ok', `Saved`);
            document.getElementById('lastRefresh').textContent = time;
        } catch (err) {
            console.error('Failed to save to cloud:', err);
            setSyncStatus('error', 'Save failed');
        }
    }

    function setSyncStatus(status, text) {
        const dot = document.getElementById('syncDot');
        const txt = document.getElementById('syncText');
        dot.className = 'sync-dot' + (status === 'syncing' ? ' syncing' : status === 'error' ? ' error' : '');
        txt.textContent = text;
    }

    function saveLocal() {
        localStorage.setItem('polish_bid_assignments_v4', JSON.stringify(assignments));
    }

    function showPasswordModal() {
        document.getElementById('passwordModal').classList.add('show');
        document.getElementById('passwordInput').value = '';
        document.getElementById('passwordError').style.display = 'none';
        document.getElementById('passwordInput').focus();
    }

    function hidePasswordModal() {
        document.getElementById('passwordModal').classList.remove('show');
    }

    async function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    const errorDiv = document.getElementById('passwordError');
    
    // Show loading state
    errorDiv.textContent = 'Checking...';
    errorDiv.style.display = 'block';
    errorDiv.style.color = '#4ecca3';
    
    try {
        // Sign in with Firebase Authentication
        const email = 'chris.delta.occ@gmail.com';
        await firebase.auth().signInWithEmailAndPassword(email, input);
        
        // Success!
        isAdmin = true;
        sessionStorage.setItem('polish_bid_admin', 'true');
        hidePasswordModal();
        enableAdminMode();
        
        // Stop auto-refresh for admin
        if (refreshInterval) {
            clearInterval(refreshInterval);
            refreshInterval = null;
        }
        
        // Clear the password input
        document.getElementById('passwordInput').value = '';
        errorDiv.style.display = 'none';
        
    } catch (error) {
        // Failed - show error
        errorDiv.textContent = 'Incorrect password';
        errorDiv.style.display = 'block';
        errorDiv.style.color = '#e94560';
        console.error('Login error:', error);
    }
}

    function enableAdminMode() {
        document.getElementById('modeIndicator').textContent = 'ADMIN';
        document.getElementById('modeIndicator').className = 'mode-indicator admin';
        document.getElementById('adminBtn').textContent = 'Logout';
        document.getElementById('adminBtn').onclick = logout;
        document.getElementById('clearBtn').disabled = false;
        document.getElementById('ascentBtn').style.display = 'inline-block';
        if (document.getElementById('mayBalanceBtn')) {
            document.getElementById('mayBalanceBtn').style.display = 'inline-block';
        }
        if (document.getElementById('undoBtn')) {
            updateUndoButton();
        }
        if (document.getElementById('auditBtn')) {
            document.getElementById('auditBtn').style.display = 'inline-block';
        }
        if (document.getElementById('undoRollbackContainer')) {
            document.getElementById('undoRollbackContainer').style.display = 'inline-block';
            updateUndoRollbackDropdown();
        }
        if (document.getElementById('liveModeBtn')) {
            document.getElementById('liveModeBtn').style.display = 'inline-block';
        }
        if (document.getElementById('escalationBtn')) {
            document.getElementById('escalationBtn').style.display = 'inline-block';
        }
        if (document.getElementById('nextYearSetupBtn')) {
            document.getElementById('nextYearSetupBtn').style.display = 'inline-block';
        }
        renderAll(); // Re-render to show admin controls in history dropdown
    }

    function logout() {
        isAdmin = false;
        sessionStorage.removeItem('polish_bid_admin');
        document.getElementById('modeIndicator').textContent = 'VIEWER';
        document.getElementById('modeIndicator').className = 'mode-indicator viewer';
        document.getElementById('adminBtn').textContent = 'Admin Login';
        document.getElementById('adminBtn').onclick = showPasswordModal;
        document.getElementById('clearBtn').disabled = true;
        document.getElementById('ascentBtn').style.display = 'none';
        if (document.getElementById('mayBalanceBtn')) {
            document.getElementById('mayBalanceBtn').style.display = 'none';
        }
        if (document.getElementById('undoBtn')) {
            document.getElementById('undoBtn').style.display = 'none';
        }
        if (document.getElementById('auditBtn')) {
            document.getElementById('auditBtn').style.display = 'none';
        }
        if (document.getElementById('undoRollbackContainer')) {
            document.getElementById('undoRollbackContainer').style.display = 'none';
        }
        if (document.getElementById('liveModeBtn')) {
            document.getElementById('liveModeBtn').style.display = 'none';
            // Turn off live mode if it was on
            if (liveMode) {
                liveMode = false;
                if (liveRefreshInterval) {
                    clearInterval(liveRefreshInterval);
                    liveRefreshInterval = null;
                }
            }
        }
        if (document.getElementById('escalationBtn')) {
            document.getElementById('escalationBtn').style.display = 'none';
        }
        if (document.getElementById('nextYearSetupBtn')) {
            document.getElementById('nextYearSetupBtn').style.display = 'none';
        }

        // Restart auto-refresh for viewer
        refreshInterval = setInterval(loadFromCloud, 300000);

        renderAll(); // Re-render to hide admin controls in history dropdown
    }

    function renderAll() {
        document.getElementById('group1Title').textContent = `SSOM (${GROUP1.length})`;
        document.getElementById('group2Title').textContent = `SOM (${GROUP2.length})`;
        renderGroup(GROUP1, 'group1List', 'g1');
        renderGroup(GROUP2, 'group2List', 'g2');
        renderAllLines();
        updateStats();
    }

    function getLineToBidder() {
        const lineToName = {};
        Object.entries(assignments).forEach(([key, lineNbr]) => {
            const [prefix, nbr] = key.split('-');
            const group = prefix === 'g1' ? GROUP1 : GROUP2;
            const person = group.find(p => p.nbr === parseInt(nbr));
            if (person) lineToName[lineNbr] = person.name;
        });
        return lineToName;
    }

    function renderGroup(group, containerId, prefix) {
        const container = document.getElementById(containerId);
        const withPrevClass = showBidHistory ? ' with-prev' : '';
        
        container.innerHTML = group.map(person => {
            const key = prefix + '-' + person.nbr;
            const assignedLine = assignments[key] || '';
            const history = bidHistory[key] || [];
            // Handle both new format {line, timestamp} and legacy format (just line string)
            const prevEntry = history.length > 0 ? history[0] : null;
            const prevLine = prevEntry ? (typeof prevEntry === 'object' ? prevEntry.line : prevEntry) : '';
            const isConfirmed = confirmations[key] ? true : false;
            const lockIcon = isConfirmed ? ' 🔒' : '';

            if (isAdmin) {
                const deleteBtn = assignedLine ? `<button class="sen-delete" onclick="performRollback('${key}')">&times;</button>` : '<span></span>';
                let prevCol = '';
                if (showBidHistory) {
                    if (prevLine) {
                        prevCol = `<div class="prev-col"><div class="prev-cell" onclick="showHistoryDropdown(event, '${key}')">${prevLine}</div></div>`;
                    } else {
                        prevCol = `<div class="prev-col"><div class="prev-cell empty"></div></div>`;
                    }
                }
                
                return `
                    <div class="seniority-entry ${assignedLine ? 'assigned' : ''}${withPrevClass}" id="entry-${key}">
                        <div class="sen-nbr">${person.nbr}</div>
                        <div class="sen-name" onclick="sendBidNotification('${person.name}')" style="cursor: pointer; text-decoration: underline;" title="Click to send bid notification">${person.name}${lockIcon}</div>
                        <input type="text"
                               class="sen-input ${assignedLine ? 'filled' : ''}"
                               id="input-${key}"
                               value="${assignedLine}"
                               placeholder="—"
                               onchange="assignLine('${key}', this.value)"
                               onkeydown="handleKeyDown(event, '${key}')">
                        ${prevCol}
                        ${deleteBtn}
                    </div>
                `;
            } else {
                const clickHandler = assignedLine ? `onclick="showCalendar('${assignedLine}')" style="cursor:pointer;"` : '';
                let prevCol = '';
                if (showBidHistory) {
                    if (prevLine) {
                        prevCol = `<div class="prev-col"><div class="prev-cell" onclick="showHistoryDropdown(event, '${key}')">${prevLine}</div></div>`;
                    } else {
                        prevCol = `<div class="prev-col"><div class="prev-cell empty"></div></div>`;
                    }
                }
                
                return `
                    <div class="seniority-entry ${assignedLine ? 'assigned' : ''}${withPrevClass}" id="entry-${key}">
                        <div class="sen-nbr">${person.nbr}</div>
                        <div class="sen-name">${person.name}${lockIcon}</div>
                        <div class="sen-line-display ${assignedLine ? '' : 'empty'}" ${clickHandler}>${assignedLine || '—'}</div>
                        ${prevCol}
                        <span></span>
                    </div>
                `;
            }
        }).join('');
    }

    function renderAllLines() {
        var container = document.getElementById('allLinesList');
        var lineToBidder = getLineToBidder();
        var favorites = loadFavorites();
        var showFavsOnly = document.getElementById('favoritesBtn').classList.contains('active');

        container.innerHTML = ANNUAL_BID.map(function(line) {
            var bidder = lineToBidder[line.lineNbr];
            var isTaken = !!bidder;
            var isFavorite = favorites.indexOf(line.lineNbr) !== -1;

            var lineColor = COLOR_MAP[line.lineColorCode] || '#ddd';
            var lineTextColor = LIGHT_TEXT_CODES.includes(line.lineColorCode) ? '#fff' : '#000';

            var dayCells = '';
            for (var i = 0; i < 12; i++) {
                var val = line.days[i] || '-';
                var dayCode = line.dayCodes[i] || 0;
                var dayColor = COLOR_MAP[dayCode] || '#ddd';
                var dayTextColor = LIGHT_TEXT_CODES.includes(dayCode) ? '#fff' : '#000';
                dayCells += '<div class="day-cell" style="background:' + dayColor + '; color:' + dayTextColor + ';">' + val + '</div>';
            }

            var hiddenClass = (showFavsOnly && !isFavorite) ? ' hidden-fav' : '';
            var favClass = isFavorite ? ' favorite' : '';

            return '<div class="line-row ' + (isTaken ? 'taken' : '') + favClass + hiddenClass + '">' +
                '<div class="line-nbr">' + line.lineNbr + '</div>' +
                '<div class="fav-star ' + (isFavorite ? 'active' : 'inactive') + '" onclick="toggleFavorite(\'' + line.lineNbr + '\')">★</div>' +
                '<div class="line-desc line-desc-clickable" style="background:' + lineColor + '; color:' + lineTextColor + ';" onclick="showCalendar(\'' + line.lineNbr + '\')">' + line.lineDesc + '</div>' +
                '<div class="line-bidder ' + (isTaken ? 'taken' : 'available') + '">' + (isTaken && isLineConfirmed(line.lineNbr) ? '🔒 ' : '') + (bidder || 'Available') + '</div>' +
                dayCells +
            '</div>';
        }).join('');
        
        updateFavoriteCount();
    }

function isLineConfirmed(lineNbr) {
    for (const [key, assignedLine] of Object.entries(assignments)) {
        if (assignedLine == lineNbr && confirmations[key] === true) {
            return true;
        }
    }
    return false;
}

    function handleKeyDown(event, key) {
        if (event.key === 'Enter') {
            event.preventDefault();
            assignLine(key, event.target.value);
            const inputs = document.querySelectorAll('.sen-input');
            const currentIndex = Array.from(inputs).findIndex(inp => inp.id === 'input-' + key);
            if (currentIndex < inputs.length - 1) {
                inputs[currentIndex + 1].focus();
            }
        }
    }

    function sendBidNotification(personName) {
        // Get clean page URL without admin parameter (viewer link only)
        const baseUrl = window.location.origin + window.location.pathname;

        // Create the message
        const message = `You're up for Pre-Bid, no rush\n\n${baseUrl}`;

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(message);

        // Open SMS app with pre-filled message
        // This will open on phones; on desktop it may open default messaging app
        window.location.href = `sms:?body=${encodedMessage}`;
    }

    function deleteLine(key) {
        if (!isAdmin) return;
        
        // Get person name and line for logging
        var parts = key.split('-');
        var prefix = parts[0];
        var nbr = parseInt(parts[1]);
        var group = prefix === 'g1' ? GROUP1 : GROUP2;
        var person = group.find(function(p) { return p.nbr === nbr; });
        var personName = person ? person.name : key;
        var previousLine = assignments[key];
        
        delete assignments[key];
        delete confirmations[key];
        
        // Log the action
        if (previousLine) {
            logBidAction('REMOVE', personName, previousLine, previousLine);
        }
        
        saveLocal();
        saveToCloud();
        renderAll();
    }

    // ===========================================
    // BID HISTORY & ROLLBACK FUNCTIONS
    // ===========================================
    
    function toggleBidHistoryView() {
        showBidHistory = !showBidHistory;
        updateBidHistoryView();
        renderAll();
    }
    
    function updateBidHistoryView() {
        const btn = document.getElementById('bidHistoryBtn');
        const header = document.getElementById('entryHeader');
        const prevHeaders = document.querySelectorAll('.prev-col-header');
        const mainContainer = document.querySelector('.main-container');
        
        if (showBidHistory) {
            btn.style.background = '#4ecca3';
            btn.textContent = '📜 Bid History ✓';
            header.classList.add('with-prev');
            prevHeaders.forEach(h => h.style.display = 'block');
            if (mainContainer) mainContainer.classList.add('with-history');
        } else {
            btn.style.background = '#ff6b35';
            btn.textContent = '📜 Bid History';
            header.classList.remove('with-prev');
            prevHeaders.forEach(h => h.style.display = 'none');
            if (mainContainer) mainContainer.classList.remove('with-history');
        }
    }
    
    function toggleLiveMode() {
        liveMode = !liveMode;
        const btn = document.getElementById('liveModeBtn');
        
        if (liveMode) {
            btn.style.background = '#e94560';
            btn.style.color = 'white';
            btn.style.border = '1px solid #e94560';
            btn.innerHTML = '🔴 LIVE <span style="font-size:10px;">(10s)</span>';
            btn.style.animation = 'pulse 2s infinite';
            
            // Clear existing refresh interval
            if (refreshInterval) {
                clearInterval(refreshInterval);
                refreshInterval = null;
            }
            
            // Start fast refresh (every 10 seconds)
            liveRefreshInterval = setInterval(loadFromCloud, 10000);
            
            showNotificationBanner('🔴 Live Mode ON - Refreshing every 10 seconds');
        } else {
            btn.style.background = '#16213e';
            btn.style.color = '#4ecca3';
            btn.style.border = '1px solid #4ecca3';
            btn.innerHTML = '🔴 Live Mode';
            btn.style.animation = 'none';
            
            // Clear live refresh
            if (liveRefreshInterval) {
                clearInterval(liveRefreshInterval);
                liveRefreshInterval = null;
            }
            
            // Restore normal refresh for viewers
            if (!isAdmin) {
                refreshInterval = setInterval(loadFromCloud, 300000);
            }
            
            showNotificationBanner('Live Mode OFF - Normal refresh restored');
        }
    }
    
    function performRollback(key) {
        if (!isAdmin) return;
        
        var parts = key.split('-');
        var prefix = parts[0];
        var nbr = parseInt(parts[1]);
        var group = prefix === 'g1' ? GROUP1 : GROUP2;
        var person = group.find(function(p) { return p.nbr === nbr; });
        var personName = person ? person.name : key;
        
        // Count how many people will be affected (this person and all below in same group)
        var affectedCount = 0;
        var affectedNames = [];
        for (var i = nbr; i <= group.length; i++) {
            var checkKey = prefix + '-' + i;
            if (assignments[checkKey]) {
                affectedCount++;
                var p = group.find(function(x) { return x.nbr === i; });
                if (p) affectedNames.push(p.name + ' (Line ' + assignments[checkKey] + ')');
            }
        }
        
        if (affectedCount === 0) {
            alert('No assignments to rollback from this point.');
            return;
        }
        
        var confirmMsg = 'ROLLBACK from ' + personName + '\n\n';
        confirmMsg += 'This will clear ' + affectedCount + ' assignment(s):\n';
        affectedNames.forEach(function(n) { confirmMsg += '• ' + n + '\n'; });
        confirmMsg += '\nAll cleared bids will be saved to history.\nContinue?';
        
        if (!confirm(confirmMsg)) return;
        
        var rollbackTimestamp = new Date().toISOString();
        
        // Create rollback snapshot for undo
        var snapshot = {
            timestamp: rollbackTimestamp,
            triggerKey: key,
            triggerName: personName,
            affectedCount: affectedCount,
            savedAssignments: {},
            savedConfirmations: {}
        };
        
        // Perform the rollback - clear from this person down, save to history
        for (var i = nbr; i <= group.length; i++) {
            var clearKey = prefix + '-' + i;
            var currentLine = assignments[clearKey];
            
            if (currentLine) {
                // Save to snapshot for undo
                snapshot.savedAssignments[clearKey] = currentLine;
                if (confirmations[clearKey]) {
                    snapshot.savedConfirmations[clearKey] = confirmations[clearKey];
                }
                
                // Push current line to history WITH TIMESTAMP
                if (!bidHistory[clearKey]) {
                    bidHistory[clearKey] = [];
                }
                bidHistory[clearKey].unshift({
                    line: currentLine,
                    timestamp: rollbackTimestamp
                });
                
                // Keep history manageable (max 20 entries per person)
                if (bidHistory[clearKey].length > 20) {
                    bidHistory[clearKey] = bidHistory[clearKey].slice(0, 20);
                }
                
                // Clear the assignment
                delete assignments[clearKey];
                delete confirmations[clearKey];
                
                // Log action
                var p = group.find(function(x) { return x.nbr === i; });
                logBidAction('ROLLBACK', p ? p.name : clearKey, currentLine, currentLine);
            }
        }
        
        // Add to rollback stack
        rollbackStack.unshift(snapshot);
        
        // Keep rollback stack manageable (max 50 entries)
        if (rollbackStack.length > 50) {
            rollbackStack = rollbackStack.slice(0, 50);
        }
        
        // Auto-show history view after rollback
        if (!showBidHistory) {
            showBidHistory = true;
            updateBidHistoryView();
        }
        
        saveLocal();
        saveToCloud();
        renderAll();
        updateUndoRollbackDropdown();
    }
    
    function showHistoryDropdown(event, key) {
        event.stopPropagation();
        
        // Close any existing dropdowns
        document.querySelectorAll('.history-dropdown').forEach(d => d.remove());
        
        var history = bidHistory[key] || [];
        if (history.length === 0) return;
        
        var parts = key.split('-');
        var prefix = parts[0];
        var nbr = parseInt(parts[1]);
        var group = prefix === 'g1' ? GROUP1 : GROUP2;
        var person = group.find(function(p) { return p.nbr === nbr; });
        var personName = person ? person.name : key;
        
        // Get all currently taken lines
        var takenLines = Object.values(assignments);
        // Get this person's current line (if any) - their own line shouldn't show as taken
        var currentLine = assignments[key] || '';
        
        var dropdown = document.createElement('div');
        dropdown.className = 'history-dropdown show';
        dropdown.innerHTML = '<div style="color:#ff6b35; font-weight:bold; font-size:11px; margin-bottom:8px; border-bottom:1px solid #ff6b35; padding-bottom:5px;">History for ' + personName + '</div>';
        
        history.forEach(function(entry, index) {
            // Handle both new format {line, timestamp} and legacy format (just line string)
            var line = typeof entry === 'object' ? entry.line : entry;
            var timestamp = typeof entry === 'object' && entry.timestamp ? entry.timestamp : null;
            var timeStr = '';
            if (timestamp) {
                var date = new Date(timestamp);
                timeStr = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' ' + date.toLocaleDateString([], {month:'short', day:'numeric'});
            }
            
            // Check if this line is now taken by someone else
            var isTaken = takenLines.includes(line) && line !== currentLine;
            var strikeStyle = isTaken ? 'text-decoration: line-through; color: #666;' : '';
            
            var item = document.createElement('div');
            item.className = 'history-item';
            
            // Only show action buttons in admin mode
            var actionButtons = isAdmin ? `
                <div class="history-actions">
                    <button class="restore-btn" onclick="restoreFromHistory('${key}', ${index}); event.stopPropagation();">🔄</button>
                    <button class="delete-btn" onclick="deleteFromHistory('${key}', ${index}); event.stopPropagation();">🗑️</button>
                </div>
            ` : '';
            
            item.innerHTML = `
                <div>
                    <span class="line-num" style="${strikeStyle}">Line ${line}</span>
                    <span class="history-num">#${index + 1}</span>
                    ${timeStr ? `<div style="font-size:9px; color:#888; margin-top:2px;">${timeStr}</div>` : ''}
                </div>
                ${actionButtons}
            `;
            dropdown.appendChild(item);
        });
        
        // Position dropdown
        var cell = event.target;
        var rect = cell.getBoundingClientRect();
        dropdown.style.position = 'fixed';
        dropdown.style.left = rect.left + 'px';
        dropdown.style.top = (rect.bottom + 5) + 'px';
        
        document.body.appendChild(dropdown);
        
        // Close on click outside
        setTimeout(function() {
            document.addEventListener('click', closeHistoryDropdown);
        }, 10);
    }
    
    function closeHistoryDropdown() {
        document.querySelectorAll('.history-dropdown').forEach(d => d.remove());
        document.removeEventListener('click', closeHistoryDropdown);
    }
    
    function restoreFromHistory(key, historyIndex) {
        if (!isAdmin) return;
        
        var history = bidHistory[key] || [];
        if (historyIndex >= history.length) return;
        
        // Handle both new format {line, timestamp} and legacy format (just line string)
        var entry = history[historyIndex];
        var lineToRestore = typeof entry === 'object' ? entry.line : entry;
        
        var parts = key.split('-');
        var prefix = parts[0];
        var nbr = parseInt(parts[1]);
        var group = prefix === 'g1' ? GROUP1 : GROUP2;
        var person = group.find(function(p) { return p.nbr === nbr; });
        var personName = person ? person.name : key;
        
        // Check if line is already taken
        var existingKey = null;
        for (var k in assignments) {
            if (assignments[k] === lineToRestore && k !== key) {
                existingKey = k;
                break;
            }
        }
        
        if (existingKey) {
            var eParts = existingKey.split('-');
            var ePrefix = eParts[0];
            var eNbr = parseInt(eParts[1]);
            var eGroup = ePrefix === 'g1' ? GROUP1 : GROUP2;
            var ePerson = eGroup.find(function(p) { return p.nbr === eNbr; });
            alert('Cannot restore: Line ' + lineToRestore + ' is already assigned to ' + (ePerson ? ePerson.name : existingKey));
            closeHistoryDropdown();
            return;
        }
        
        // Count affected people (this person and all below)
        var affectedCount = 0;
        for (var i = nbr; i <= group.length; i++) {
            var checkKey = prefix + '-' + i;
            var histArr = bidHistory[checkKey] || [];
            if (histArr.length > historyIndex) {
                affectedCount++;
            }
        }
        
        var confirmMsg = 'RESTORE from history #' + (historyIndex + 1) + ' for ' + personName + '\n\n';
        if (affectedCount > 1) {
            confirmMsg += 'This will also restore ' + (affectedCount - 1) + ' other person(s) below in seniority from the same history point.\n\n';
        }
        confirmMsg += 'Restore Line ' + lineToRestore + ' to ' + personName + '?';
        
        if (!confirm(confirmMsg)) {
            closeHistoryDropdown();
            return;
        }
        
        // Create rollback snapshot for this restore action
        var snapshot = {
            timestamp: new Date().toISOString(),
            triggerKey: key,
            triggerName: personName,
            affectedCount: affectedCount,
            savedAssignments: {},
            savedHistory: {},
            type: 'restore'
        };
        
        // Restore this person and everyone below from the same history index
        for (var i = nbr; i <= group.length; i++) {
            var restoreKey = prefix + '-' + i;
            var histArr = bidHistory[restoreKey] || [];
            
            if (histArr.length > historyIndex) {
                var histEntry = histArr[historyIndex];
                // Handle both new format {line, timestamp} and legacy format (just line string)
                var restoreLine = typeof histEntry === 'object' ? histEntry.line : histEntry;
                
                // Check if this line is available
                var taken = false;
                for (var k in assignments) {
                    if (assignments[k] === restoreLine) {
                        taken = true;
                        break;
                    }
                }
                
                if (!taken) {
                    // Save current state for undo
                    if (assignments[restoreKey]) {
                        snapshot.savedAssignments[restoreKey] = assignments[restoreKey];
                    }
                    snapshot.savedHistory[restoreKey] = histArr.slice();
                    
                    // Restore the assignment
                    assignments[restoreKey] = restoreLine;
                    
                    // Remove from history (this entry and all older ones for this restore point)
                    bidHistory[restoreKey] = histArr.slice(0, historyIndex);
                    
                    var p = group.find(function(x) { return x.nbr === i; });
                    logBidAction('RESTORE', p ? p.name : restoreKey, restoreLine, null);
                }
            }
        }
        
        // Add to rollback stack
        rollbackStack.unshift(snapshot);
        if (rollbackStack.length > 50) {
            rollbackStack = rollbackStack.slice(0, 50);
        }
        
        closeHistoryDropdown();
        saveLocal();
        saveToCloud();
        renderAll();
        updateUndoRollbackDropdown();
    }
    
    function deleteFromHistory(key, historyIndex) {
        if (!isAdmin) return;
        
        var history = bidHistory[key] || [];
        if (historyIndex >= history.length) return;
        
        var entry = history[historyIndex];
        // Handle both new format {line, timestamp} and legacy format (just line string)
        var lineToDelete = typeof entry === 'object' ? entry.line : entry;
        
        if (!confirm('Delete Line ' + lineToDelete + ' from history?')) {
            return;
        }
        
        // Remove from history
        history.splice(historyIndex, 1);
        bidHistory[key] = history;
        
        closeHistoryDropdown();
        saveLocal();
        saveToCloud();
        saveHistoryToLocal();
        renderAll();
    }
    
    function toggleUndoRollbackDropdown() {
        var dropdown = document.getElementById('undoRollbackDropdown');
        dropdown.classList.toggle('show');
        
        if (dropdown.classList.contains('show')) {
            // Check if dropdown goes off screen and adjust position
            setTimeout(function() {
                var rect = dropdown.getBoundingClientRect();
                var container = document.getElementById('undoRollbackContainer');
                var containerRect = container.getBoundingClientRect();
                
                // Reset positioning
                dropdown.style.left = 'auto';
                dropdown.style.right = '0';
                
                // Check if it goes off the right edge
                if (rect.right > window.innerWidth) {
                    dropdown.style.right = '0';
                    dropdown.style.left = 'auto';
                }
                
                // Check if it goes off the left edge
                rect = dropdown.getBoundingClientRect();
                if (rect.left < 0) {
                    dropdown.style.left = '0';
                    dropdown.style.right = 'auto';
                }
            }, 10);
            
            // Close on click outside
            setTimeout(function() {
                document.addEventListener('click', closeUndoRollbackDropdown);
            }, 10);
        }
    }
    
    function closeUndoRollbackDropdown(event) {
        if (event && event.target.closest('.undo-rollback-container')) return;
        var dropdown = document.getElementById('undoRollbackDropdown');
        dropdown.classList.remove('show');
        document.removeEventListener('click', closeUndoRollbackDropdown);
    }
    
    function updateUndoRollbackDropdown() {
        var dropdown = document.getElementById('undoRollbackDropdown');
        if (!dropdown) return;
        
        if (rollbackStack.length === 0) {
            dropdown.innerHTML = '<div class="no-rollbacks">No rollbacks to undo</div>';
            return;
        }
        
        var html = '<div style="color:#f0a500; font-weight:bold; font-size:11px; margin-bottom:8px; border-bottom:1px solid #f0a500; padding-bottom:5px;">Click to undo a rollback</div>';
        
        rollbackStack.forEach(function(snapshot, index) {
            var time = new Date(snapshot.timestamp);
            var timeStr = time.toLocaleTimeString() + ' ' + time.toLocaleDateString();
            var typeLabel = snapshot.type === 'restore' ? 'Restore' : 'Rollback';
            
            html += `
                <div class="rollback-item" onclick="undoRollback(${index})">
                    <div class="rollback-time">${timeStr}</div>
                    <div class="rollback-info">${typeLabel} #${index + 1}: ${snapshot.triggerName}</div>
                    <div class="rollback-details">${snapshot.affectedCount} assignment(s) affected</div>
                </div>
            `;
        });
        
        dropdown.innerHTML = html;
    }
    
    function undoRollback(stackIndex) {
        if (!isAdmin) return;
        if (stackIndex >= rollbackStack.length) return;
        
        var snapshot = rollbackStack[stackIndex];
        var typeLabel = snapshot.type === 'restore' ? 'restore' : 'rollback';
        
        var confirmMsg = 'UNDO ' + typeLabel + ' from ' + new Date(snapshot.timestamp).toLocaleString() + '\n\n';
        confirmMsg += 'Triggered by: ' + snapshot.triggerName + '\n';
        confirmMsg += 'Affected: ' + snapshot.affectedCount + ' assignment(s)\n\n';
        confirmMsg += 'This will restore the state before this ' + typeLabel + '.\nContinue?';
        
        if (!confirm(confirmMsg)) return;
        
        // Restore saved assignments
        for (var key in snapshot.savedAssignments) {
            assignments[key] = snapshot.savedAssignments[key];
            logBidAction('UNDO-ROLLBACK', key, snapshot.savedAssignments[key], null);
        }
        
        // Restore saved confirmations if any
        if (snapshot.savedConfirmations) {
            for (var key in snapshot.savedConfirmations) {
                confirmations[key] = snapshot.savedConfirmations[key];
            }
        }
        
        // If this was a restore, we need to put history back
        if (snapshot.savedHistory) {
            for (var key in snapshot.savedHistory) {
                bidHistory[key] = snapshot.savedHistory[key];
            }
        } else {
            // If this was a rollback, remove from history what we added
            for (var key in snapshot.savedAssignments) {
                if (bidHistory[key] && bidHistory[key].length > 0) {
                    // Remove the first item (most recent) that matches
                    var idx = bidHistory[key].indexOf(snapshot.savedAssignments[key]);
                    if (idx === 0) {
                        bidHistory[key].shift();
                    }
                }
            }
        }
        
        // Remove this and all newer rollbacks from stack
        rollbackStack = rollbackStack.slice(stackIndex + 1);
        
        closeUndoRollbackDropdown(null);
        saveLocal();
        saveToCloud();
        renderAll();
        updateUndoRollbackDropdown();
    }

    function assignLine(key, value) {
        if (!isAdmin) return;
        var lineNbr = value.trim();
        
        // Get person name for logging
        var parts = key.split('-');
        var prefix = parts[0];
        var nbr = parseInt(parts[1]);
        var group = prefix === 'g1' ? GROUP1 : GROUP2;
        var person = group.find(function(p) { return p.nbr === nbr; });
        var personName = person ? person.name : key;
        var previousLine = assignments[key];

        if (lineNbr === '') {
            if (previousLine) {
                logBidAction('REMOVE', personName, previousLine, previousLine);
            }
            delete assignments[key];
            delete confirmations[key];
        } else {
            var line = ANNUAL_BID.find(function(l) { return l.lineNbr === lineNbr; });
            if (!line) {
                alert('Line ' + lineNbr + ' not found!');
                document.getElementById('input-' + key).value = assignments[key] || '';
                return;
            }

            var existingKey = null;
            for (var k in assignments) {
                if (assignments[k] === lineNbr && k !== key) {
                    existingKey = k;
                    break;
                }
            }
            if (existingKey) {
                var eParts = existingKey.split('-');
                var ePrefix = eParts[0];
                var eNbr = parseInt(eParts[1]);
                var eGroup = ePrefix === 'g1' ? GROUP1 : GROUP2;
                var ePerson = eGroup.find(function(p) { return p.nbr === eNbr; });
                alert('Line ' + lineNbr + ' is already assigned to ' + ePerson.name);
                document.getElementById('input-' + key).value = assignments[key] || '';
                return;
            }

            assignments[key] = lineNbr;
            logBidAction('ASSIGN', personName, lineNbr, previousLine);
        }

        saveLocal();
        saveToCloud();
        renderAll();
    }

    function updateStats() {
        let takenSSOM = 0;
        let takenSOM = 0;
        Object.keys(assignments).forEach(key => {
            if (key.startsWith('g1-')) takenSSOM++;
            else if (key.startsWith('g2-')) takenSOM++;
        });
        document.getElementById('statTakenSSOM').textContent = takenSSOM;
        document.getElementById('statAvailSSOM').textContent = GROUP1.length - takenSSOM;
        document.getElementById('statTakenSOM').textContent = takenSOM;
        document.getElementById('statAvailSOM').textContent = GROUP2.length - takenSOM;
    }

    function showLegend() {
        document.getElementById('legendModal').classList.add('show');
    }

    function hideLegend() {
        document.getElementById('legendModal').classList.remove('show');
    }

    // Holiday Summary Functions
    const HOLIDAY_PATTERN_MAP = {
        'SUPER': { day: 1, date: '2027-2-14', name: 'Super Bowl', fullDate: 'Feb 14, 2027' },
        'EAST2': { day: 2, date: '2027-3-28', name: 'Easter Sunday', fullDate: 'Mar 28, 2027' },
        'STPAT': { day: 3, date: '2027-3-17', name: "St. Patrick's Day", fullDate: 'Mar 17, 2027' },
        'LABOR': { day: 4, date: '2026-9-7', name: 'Labor Day', fullDate: 'Sep 7, 2026' },
        'MOM': { day: 4, date: '2026-5-10', name: "Mother's Day", fullDate: 'May 10, 2026' },
        'XMAS': { day: 5, date: '2026-12-25', name: 'Christmas', fullDate: 'Dec 25, 2026' },
        'EAST1': { day: 5, date: '2026-4-5', name: 'Easter Sunday', fullDate: 'Apr 5, 2026' },
        'MEMOR': { day: 7, date: '2026-5-25', name: 'Memorial Day', fullDate: 'May 25, 2026' },
        'DAD': { day: 10, date: '2026-6-21', name: "Father's Day", fullDate: 'Jun 21, 2026' },
        '4TH': { day: 11, date: '2026-7-4', name: 'July 4th', fullDate: 'Jul 4, 2026' },
        'NYD': { day: 12, date: '2027-1-1', name: "New Year's Day", fullDate: 'Jan 1, 2027' },
        'THX': { day: 12, date: '2026-11-26', name: 'Thanksgiving', fullDate: 'Nov 26, 2026' }
    };

    function generateHolidaySummary() {
        // Create sorted holiday list for legend with emojis
        const holidayEmojis = {
            'EAST1': '🐰',
            'EAST2': '🐰',
            'MOM': '💐',
            'MEMOR': '🎖️',
            'DAD': '👔',
            '4TH': '🎆',
            'LABOR': '⚒️',
            'THX': '🦃',
            'XMAS': '🎄',
            'NYD': '🎉',
            'SUPER': '🏈',
            'STPAT': '☘️'
        };

        const sortedHolidays = Object.entries(HOLIDAY_PATTERN_MAP).sort((a, b) => {
            const dateA = new Date(a[1].date.replace(/-/g, '/'));
            const dateB = new Date(b[1].date.replace(/-/g, '/'));
            return dateA - dateB;
        });

        let html = `
            <div style="background:#0f3460; border-radius:8px; padding:15px; margin-bottom:20px;">
                <h4 style="color:#e94560; margin-bottom:12px; font-size:13px;">🎊 Holiday Abbreviations (2026-2027)</h4>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:8px;">
        `;

        sortedHolidays.forEach(([abbrev, info]) => {
            const emoji = holidayEmojis[abbrev] || '🎉';
            html += `
                <div style="display:flex; gap:8px; padding:5px 0; font-size:11px; border-bottom:1px solid rgba(233,69,96,0.2);">
                    <span style="font-size:16px;">${emoji}</span>
                    <span style="color:#4ecca3; font-weight:bold; min-width:55px;">${abbrev}</span>
                    <span style="color:#eee; flex:1;">${info.name}</span>
                    <span style="color:#888; font-size:10px;">${info.fullDate}</span>
                </div>
            `;
        });

        html += `
                </div>
            </div>

            <div style="margin-top:10px;">
                <h4 style="color:#4ecca3; margin-bottom:15px; font-size:14px;">📋 Quick Reference by Line</h4>
                <div style="max-height:400px; overflow-y:auto;">
                    <table style="width:100%; border-collapse:collapse; font-size:11px;">
                        <thead>
                            <tr style="background:#0f3460; position:sticky; top:0;">
                                <th style="padding:8px 6px; text-align:left; color:#e94560;">Line</th>
                                <th style="padding:8px 6px; text-align:left; color:#e94560;">Description</th>
                                <th style="padding:8px 6px; text-align:left; color:#e94560;">Holidays Off</th>
                                <th style="padding:8px 6px; text-align:center; color:#e94560;">#</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        ANNUAL_BID.forEach(line => {
            const holidaysOff = [];
            Object.entries(HOLIDAY_PATTERN_MAP).forEach(([abbrev, info]) => {
                const patternDayIndex = info.day - 1;
                const dayValue = line.days[patternDayIndex];
                if (dayValue === '--' || dayValue === '-') {
                    holidaysOff.push(abbrev);
                }
            });

            // Sort holidays chronologically
            holidaysOff.sort((a, b) => {
                const dateA = new Date(HOLIDAY_PATTERN_MAP[a].date.replace(/-/g, '/'));
                const dateB = new Date(HOLIDAY_PATTERN_MAP[b].date.replace(/-/g, '/'));
                return dateA - dateB;
            });

            const bgColor = holidaysOff.length >= 6 ? 'rgba(78,204,163,0.15)' :
                           holidaysOff.length >= 4 ? 'rgba(240,165,0,0.15)' :
                           'transparent';

            html += `
                <tr style="border-bottom:1px solid #0f3460; background:${bgColor};">
                    <td style="padding:6px; color:#4ecca3; font-weight:bold;">${line.lineNbr}</td>
                    <td style="padding:6px; color:#888;">${line.lineDesc}</td>
                    <td style="padding:6px; color:#eee;">${holidaysOff.join(', ') || '<span style="color:#555;">None</span>'}</td>
                    <td style="padding:6px; text-align:center; color:${holidaysOff.length >= 6 ? '#4ecca3' : holidaysOff.length >= 4 ? '#f0a500' : '#888'}; font-weight:bold;">${holidaysOff.length}</td>
                </tr>
            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>
                <div style="margin-top:10px; font-size:10px; color:#888;">
                    <span style="display:inline-block; width:12px; height:12px; background:rgba(78,204,163,0.15); border-radius:2px; margin-right:4px; vertical-align:middle;"></span> 6+ holidays off
                    <span style="display:inline-block; width:12px; height:12px; background:rgba(240,165,0,0.15); border-radius:2px; margin-left:15px; margin-right:4px; vertical-align:middle;"></span> 4-5 holidays off
                </div>
            </div>
        `;

        return html;
    }

    function showHolidaySummary() {
        document.getElementById('holidaySummaryContent').innerHTML = generateHolidaySummary();
        document.getElementById('holidaySummaryModal').classList.add('show');
    }

    function hideHolidaySummary() {
        document.getElementById('holidaySummaryModal').classList.remove('show');
    }

    // Swap Compare Functions
    let currentSwapCategory = 'fiveSevenOff';
    let swapAnalysisCache = null;

    function getShiftStartHour(shiftCode) {
        if (!shiftCode || shiftCode === '--' || shiftCode === '-') return null;
        const match = shiftCode.match(/[EAMP](\d{2})/);
        if (match) return parseInt(match[1]);
        if (shiftCode.startsWith('XX')) return 6;
        return null;
    }

    function getShiftEndHour(startHour) {
        if (startHour === null) return null;
        return (startHour + 12) % 24;
    }

    function has8HourRest(shiftCodeA, shiftCodeB) {
        const startA = getShiftStartHour(shiftCodeA);
        const startB = getShiftStartHour(shiftCodeB);
        if (startA === null || startB === null) return true;
        const endA = getShiftEndHour(startA);
        let restHours = startB >= endA ? startB - endA : (24 - endA) + startB;
        return restHours >= 8;
    }

    function getWorkDays(line) {
        return line.days.map((d, i) => (d !== '--' && d !== '-') ? i : -1).filter(i => i !== -1);
    }

    function getOffDays(line) {
        return line.days.map((d, i) => (d === '--' || d === '-') ? i : -1).filter(i => i !== -1);
    }

    function getWorkBlocks(line) {
        const workDays = getWorkDays(line);
        if (workDays.length === 0) return [];
        const blocks = [];
        let start = workDays[0], end = workDays[0];
        for (let i = 1; i < workDays.length; i++) {
            if (workDays[i] === end + 1) { end = workDays[i]; }
            else {
                blocks.push({ start, end, days: [] });
                for (let d = start; d <= end; d++) blocks[blocks.length-1].days.push(d);
                start = workDays[i]; end = workDays[i];
            }
        }
        blocks.push({ start, end, days: [] });
        for (let d = start; d <= end; d++) blocks[blocks.length-1].days.push(d);
        return blocks;
    }

    function canPickupBlock(lineA, lineB, block) {
        const offA = getOffDays(lineA);
        if (!block.days.every(d => offA.includes(d))) return false;
        const dayBefore = (block.start - 1 + 12) % 12;
        const dayAfter = (block.end + 1) % 12;
        if (!has8HourRest(lineA.days[dayBefore], lineB.days[block.start])) return false;
        if (!has8HourRest(lineB.days[block.end], lineA.days[dayAfter])) return false;
        return true;
    }

    function areConsecutive(days) {
        if (days.length <= 1) return true;
        const sorted = [...days].sort((a,b) => a - b);
        for (let i = 1; i < sorted.length; i++) {
            if (sorted[i] !== sorted[i-1] + 1) return false;
        }
        return true;
    }

    function getMaxConsecutiveFromSet(offDays) {
        if (offDays.length === 0) return 0;
        const sorted = [...offDays].sort((a,b) => a - b);
        let max = 1, curr = 1;
        for (let i = 1; i < sorted.length; i++) {
            if (sorted[i] === sorted[i-1] + 1) { curr++; max = Math.max(max, curr); }
            else { curr = 1; }
        }
        if (sorted.includes(11) && sorted.includes(0)) {
            let wrap = 0;
            for (let d = 11; d >= 0 && sorted.includes(d); d--) wrap++;
            for (let d = 0; d < 12 && sorted.includes(d); d++) wrap++;
            max = Math.max(max, wrap);
        }
        return max;
    }

    function analyzeSwapPairs() {
        if (swapAnalysisCache) return swapAnalysisCache;
        const ssomLines = ANNUAL_BID.filter(l => parseInt(l.lineNbr) <= 14);
        const somLines = ANNUAL_BID.filter(l => parseInt(l.lineNbr) >= 15);
        const results = { fiveSevenOff: { ssom: [], som: [] }, twoDayPickup: { ssom: [], som: [] } };
        analyzeGroup(ssomLines, results, 'ssom');
        analyzeGroup(somLines, results, 'som');
        swapAnalysisCache = results;
        return results;
    }

    function analyzeGroup(lines, results, groupKey) {
        for (let i = 0; i < lines.length; i++) {
            for (let j = i + 1; j < lines.length; j++) {
                const lineA = lines[i], lineB = lines[j];
                const blocksA = getWorkBlocks(lineA), blocksB = getWorkBlocks(lineB);
                const twoBlocksA = blocksA.filter(b => b.days.length === 2);
                const twoBlocksB = blocksB.filter(b => b.days.length === 2);
                const threeBlocksA = blocksA.filter(b => b.days.length === 3);
                const threeBlocksB = blocksB.filter(b => b.days.length === 3);

                // 5 ON / 7 OFF - A picks up B's 2-day + A's own 3-day = 5 consecutive
                twoBlocksB.forEach(blockB2 => {
                    threeBlocksA.forEach(blockA3 => {
                        const combinedA = [...blockB2.days, ...blockA3.days].sort((a,b) => a - b);
                        if (combinedA.length === 5 && areConsecutive(combinedA) && canPickupBlock(lineA, lineB, blockB2)) {
                            twoBlocksA.forEach(blockA2 => {
                                threeBlocksB.forEach(blockB3 => {
                                    const combinedB = [...blockA2.days, ...blockB3.days].sort((a,b) => a - b);
                                    if (combinedB.length === 5 && areConsecutive(combinedB) && canPickupBlock(lineB, lineA, blockA2)) {
                                        const offA = getOffDays(lineA), offB = getOffDays(lineB);
                                        const newOffA = offA.filter(d => !blockB2.days.includes(d));
                                        blockA2.days.forEach(d => { if (!newOffA.includes(d)) newOffA.push(d); });
                                        const newOffB = offB.filter(d => !blockA2.days.includes(d));
                                        blockB2.days.forEach(d => { if (!newOffB.includes(d)) newOffB.push(d); });
                                        const consOffA = getMaxConsecutiveFromSet(newOffA);
                                        const consOffB = getMaxConsecutiveFromSet(newOffB);
                                        if (consOffA >= 7 && consOffB >= 7) {
                                            results.fiveSevenOff[groupKey].push({
                                                lineA, lineB, aPicksUp: blockB2, aOwn3Day: blockA3, aResult: combinedA,
                                                bPicksUp: blockA2, bOwn3Day: blockB3, bResult: combinedB, consOffA, consOffB
                                            });
                                        }
                                    }
                                });
                            });
                        }
                    });
                });

                // 2-DAY PICKUP - Find adjacent 2-day blocks between lines
                twoBlocksA.forEach(blockA2 => {
                    twoBlocksB.forEach(blockB2 => {
                        // Check if blocks are adjacent (A then B, or B then A)
                        const aEnd = Math.max(...blockA2.days);
                        const aStart = Math.min(...blockA2.days);
                        const bEnd = Math.max(...blockB2.days);
                        const bStart = Math.min(...blockB2.days);

                        let combined = null;
                        let order = null;

                        // A's block then B's block (A ends, B starts next day)
                        if (bStart === aEnd + 1) {
                            combined = [...blockA2.days, ...blockB2.days].sort((a,b) => a - b);
                            order = 'AB';
                        }
                        // B's block then A's block (B ends, A starts next day)
                        else if (aStart === bEnd + 1) {
                            combined = [...blockB2.days, ...blockA2.days].sort((a,b) => a - b);
                            order = 'BA';
                        }

                        if (!combined || combined.length !== 4) return;

                        // Check Line A is off on Block B days and can pick it up
                        const offA = getOffDays(lineA);
                        if (!blockB2.days.every(d => offA.includes(d))) return;
                        if (!canPickupBlock(lineA, lineB, blockB2)) return;

                        // Check Line B is off on Block A days and can pick it up
                        const offB = getOffDays(lineB);
                        if (!blockA2.days.every(d => offB.includes(d))) return;
                        if (!canPickupBlock(lineB, lineA, blockA2)) return;

                        // Valid pair! Both can pick up each other's adjacent block
                        results.twoDayPickup[groupKey].push({
                            lineA, lineB,
                            blockA: blockA2,
                            blockB: blockB2,
                            combined: combined,
                            order: order
                        });
                    });
                });
            }
        }
    }

    function renderPatternVisual(days, highlightDays, highlightColor) {
        highlightDays = highlightDays || [];
        highlightColor = highlightColor || '#e94560';
        return '<div style="display:flex; gap:1px; flex-wrap:wrap;">' + days.map(function(d, i) {
            var isOff = d === '--' || d === '-';
            var isHL = highlightDays.includes(i);
            var bg = isOff ? '#00FF00' : '#FFC000';
            var border = isHL ? '2px solid ' + highlightColor : '1px solid #333';
            var text = isOff ? '--' : d.substring(0, 3);
            return '<div style="width:32px; height:24px; display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:7px; background:' + bg + '; color:#000; border-radius:2px; border:' + border + ';"><span style="font-size:6px; opacity:0.7;">' + (i+1) + '</span><span style="font-weight:bold;">' + text + '</span></div>';
        }).join('') + '</div>';
    }

    function renderFiveSevenPair(pair) {
        var ltb = getLineToBidder();
        var bA = ltb[pair.lineA.lineNbr] || '<span style="color:#4ecca3;">Available</span>';
        var bB = ltb[pair.lineB.lineNbr] || '<span style="color:#4ecca3;">Available</span>';
        return '<div style="background:#0f3460; border-radius:8px; padding:15px; margin-bottom:12px;">' +
            '<div style="display:flex; justify-content:space-between; margin-bottom:12px;"><span style="color:#e94560; font-weight:bold; font-size:14px;">Line ' + pair.lineA.lineNbr + ' (' + pair.lineA.lineDesc + ') ↔ Line ' + pair.lineB.lineNbr + ' (' + pair.lineB.lineDesc + ')</span><span style="color:#4ecca3; font-size:11px;">5 On / 7 Off</span></div>' +
            '<div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">' +
                '<div style="background:#1a1a2e; padding:10px; border-radius:6px;"><div style="font-size:11px; color:#888; margin-bottom:6px;"><strong style="color:#eee;">Line ' + pair.lineA.lineNbr + ' (' + pair.lineA.lineDesc + ')</strong> <span style="color:#f0a500;">' + bA + '</span></div>' + renderPatternVisual(pair.lineA.days, pair.aPicksUp.days, '#e94560') + '<div style="font-size:10px; color:#888; margin-top:6px;">Picks up days ' + pair.aPicksUp.days.map(function(d){return d+1;}).join(',') + ' <span style="color:#e94560;">(red)</span></div></div>' +
                '<div style="background:#1a1a2e; padding:10px; border-radius:6px;"><div style="font-size:11px; color:#888; margin-bottom:6px;"><strong style="color:#eee;">Line ' + pair.lineB.lineNbr + ' (' + pair.lineB.lineDesc + ')</strong> <span style="color:#f0a500;">' + bB + '</span></div>' + renderPatternVisual(pair.lineB.days, pair.bPicksUp.days, '#9b59b6') + '<div style="font-size:10px; color:#888; margin-top:6px;">Picks up days ' + pair.bPicksUp.days.map(function(d){return d+1;}).join(',') + ' <span style="color:#9b59b6;">(purple)</span></div></div>' +
            '</div>' +
            '<div style="background:#1a1a2e; padding:12px; border-radius:6px;"><div style="font-size:12px; color:#4ecca3; font-weight:bold; margin-bottom:8px;">After Swap:</div>' +
                '<div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; font-size:11px;">' +
                    '<div><div style="color:#e94560; font-weight:bold;">Line ' + pair.lineA.lineNbr + ' (' + pair.lineA.lineDesc + '):</div><div style="color:#eee;">Works days ' + pair.aResult.map(function(d){return d+1;}).join(',') + ' <span style="color:#4ecca3;">(5 consecutive)</span></div><div style="color:#888;">' + pair.consOffA + ' consecutive days off</div></div>' +
                    '<div><div style="color:#9b59b6; font-weight:bold;">Line ' + pair.lineB.lineNbr + ' (' + pair.lineB.lineDesc + '):</div><div style="color:#eee;">Works days ' + pair.bResult.map(function(d){return d+1;}).join(',') + ' <span style="color:#4ecca3;">(5 consecutive)</span></div><div style="color:#888;">' + pair.consOffB + ' consecutive days off</div></div>' +
                '</div></div></div>';
    }

    function renderTwoDayPickupPair(pair) {
        var ltb = getLineToBidder();
        var bA = ltb[pair.lineA.lineNbr] || '<span style="color:#4ecca3;">Available</span>';
        var bB = ltb[pair.lineB.lineNbr] || '<span style="color:#4ecca3;">Available</span>';
        var daysStr = pair.combined.map(function(d){return d+1;}).join(',');
        return '<div style="background:#0f3460; border-radius:8px; padding:15px; margin-bottom:12px;">' +
            '<div style="display:flex; justify-content:space-between; margin-bottom:12px;"><span style="color:#e94560; font-weight:bold; font-size:14px;">Line ' + pair.lineA.lineNbr + ' (' + pair.lineA.lineDesc + ') ↔ Line ' + pair.lineB.lineNbr + ' (' + pair.lineB.lineDesc + ')</span><span style="color:#9b59b6; font-size:11px;">2-Day Pickup (4 On)</span></div>' +
            '<div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">' +
                '<div style="background:#1a1a2e; padding:10px; border-radius:6px;"><div style="font-size:11px; color:#888; margin-bottom:6px;"><strong style="color:#eee;">Line ' + pair.lineA.lineNbr + ' (' + pair.lineA.lineDesc + ')</strong> <span style="color:#f0a500;">' + bA + '</span></div>' + renderPatternVisual(pair.lineA.days, pair.blockA.days, '#e94560') + '<div style="font-size:10px; color:#888; margin-top:6px;">Has days ' + pair.blockA.days.map(function(d){return d+1;}).join(',') + ' <span style="color:#e94560;">(red)</span></div></div>' +
                '<div style="background:#1a1a2e; padding:10px; border-radius:6px;"><div style="font-size:11px; color:#888; margin-bottom:6px;"><strong style="color:#eee;">Line ' + pair.lineB.lineNbr + ' (' + pair.lineB.lineDesc + ')</strong> <span style="color:#f0a500;">' + bB + '</span></div>' + renderPatternVisual(pair.lineB.days, pair.blockB.days, '#9b59b6') + '<div style="font-size:10px; color:#888; margin-top:6px;">Has days ' + pair.blockB.days.map(function(d){return d+1;}).join(',') + ' <span style="color:#9b59b6;">(purple)</span></div></div>' +
            '</div>' +
            '<div style="background:#1a1a2e; padding:12px; border-radius:6px;"><div style="font-size:12px; color:#4ecca3; font-weight:bold; margin-bottom:8px;">Alternating Cycles - Both work days ' + daysStr + ' (4 consecutive):</div>' +
                '<div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; font-size:11px;">' +
                    '<div><div style="color:#e94560; font-weight:bold;">Cycle 1 - Line ' + pair.lineA.lineNbr + ' (' + pair.lineA.lineDesc + ') picks up:</div><div style="color:#eee;">Picks up days ' + pair.blockB.days.map(function(d){return d+1;}).join(',') + ' + own days ' + pair.blockA.days.map(function(d){return d+1;}).join(',') + '</div><div style="color:#888;">Line ' + pair.lineB.lineNbr + ' (' + pair.lineB.lineDesc + ') gets extended off</div></div>' +
                    '<div><div style="color:#9b59b6; font-weight:bold;">Cycle 2 - Line ' + pair.lineB.lineNbr + ' (' + pair.lineB.lineDesc + ') picks up:</div><div style="color:#eee;">Picks up days ' + pair.blockA.days.map(function(d){return d+1;}).join(',') + ' + own days ' + pair.blockB.days.map(function(d){return d+1;}).join(',') + '</div><div style="color:#888;">Line ' + pair.lineA.lineNbr + ' (' + pair.lineA.lineDesc + ') gets extended off</div></div>' +
                '</div></div></div>';
    }

    function renderExampleDiagram(category) {
        var html = '<div style="background:#1a1a2e; padding:15px; border-radius:8px; margin-bottom:20px;"><h4 style="color:#4ecca3; margin-bottom:10px; font-size:13px;">📖 How This Works</h4>';
        if (category === 'fiveSevenOff') {
            html += '<div style="color:#eee; font-size:12px; line-height:1.6;"><p style="margin-bottom:10px;">Each person picks up the other\'s 2-day block to combine with their own 3-day block = 5 consecutive work days and 7 consecutive off.</p>' +
                '<div style="background:#0f3460; padding:12px; border-radius:6px; font-size:11px;"><div style="color:#e94560; font-weight:bold; margin-bottom:4px;">Example with Lines 1 & 2:</div>' +
                '<div style="color:#888; margin-bottom:8px;">Line 1 original: Works 3,4,5 (3-day) and 9,10 (2-day) | Off 1,2,6,7,8,11,12<br>Line 2 original: Works 1,2 (2-day) and 6,7,8 (3-day) | Off 3,4,5,9,10,11,12</div>' +
                '<div style="color:#4ecca3; font-weight:bold; margin-bottom:4px;">After Swap:</div>' +
                '<div style="color:#eee;">Line 1 picks up days 1,2 → Works 1,2,3,4,5 (5 on) | Off 6-12 (7 off)<br>Line 2 picks up days 9,10 → Works 6,7,8,9,10 (5 on) | Off 1-5,11,12 (7 off)</div></div></div>';
        } else {
            html += '<div style="color:#eee; font-size:12px; line-height:1.6;"><p style="margin-bottom:10px;">Each person picks up the other\'s 2-day block on alternating cycles to work 4 consecutive days.</p>' +
                '<div style="background:#0f3460; padding:12px; border-radius:6px; font-size:11px;"><div style="color:#e94560; font-weight:bold; margin-bottom:4px;">Cycle 1:</div>' +
                '<div style="color:#888; margin-bottom:8px;">Line A picks up Line B\'s 2-day → A works 4 consecutive (own 2 + pickup 2)<br>Line B gives up 2 days → B gets extended off</div>' +
                '<div style="color:#9b59b6; font-weight:bold; margin-bottom:4px;">Cycle 2:</div>' +
                '<div style="color:#888;">Line B picks up Line A\'s 2-day → B works 4 consecutive<br>Line A gives up 2 days → A gets extended off</div></div></div>';
        }
        return html + '</div>';
    }

    // Custom Dropdown Functions
    function handleLineInput(id, value) {
        var lineNbr = value.trim();
        var hidden = document.getElementById('manualCompareLine' + id);
        var selected = document.querySelector('#dropdown' + id + ' .dropdown-selected');
        var input = document.getElementById('lineInput' + id);
        
        if (!lineNbr) {
            // Clear selection
            hidden.value = '';
            var placeholder = (id === 'A' || id === 'B') ? 'or Select' : '(optional)';
            selected.innerHTML = '<span>' + placeholder + '</span><span style="margin-left:auto;color:#4ecca3;">▼</span>';
            input.style.borderColor = '#4ecca3';
            return;
        }
        
        // Check if valid line number
        var lineData = ANNUAL_BID.find(function(l) { return l.lineNbr === lineNbr; });
        if (lineData) {
            hidden.value = lineNbr;
            var displayHtml = '<span style="color:#4ecca3; font-weight:bold;">Line ' + lineNbr + '</span> <span style="color:#888;">(' + lineData.lineDesc + ')</span>';
            selected.innerHTML = displayHtml + '<span style="margin-left:auto;color:#4ecca3;">▼</span>';
            input.style.borderColor = '#4ecca3';
        } else {
            // Invalid line number
            hidden.value = '';
            input.style.borderColor = '#e94560';
        }
    }
    
    function toggleDropdown(id) {
        var options = document.getElementById('options' + id);
        var allOptions = document.querySelectorAll('.dropdown-options');
        
        // Close all other dropdowns
        for (var i = 0; i < allOptions.length; i++) {
            if (allOptions[i].id !== 'options' + id) {
                allOptions[i].classList.remove('show');
            }
        }
        
        // Toggle this dropdown
        options.classList.toggle('show');
    }
    
    function selectDropdownOption(id, lineNbr, lineDesc) {
        var selected = document.querySelector('#dropdown' + id + ' .dropdown-selected');
        var hidden = document.getElementById('manualCompareLine' + id);
        var options = document.getElementById('options' + id);
        var input = document.getElementById('lineInput' + id);
        
        var displayHtml = '<span style="color:#4ecca3; font-weight:bold;">Line ' + lineNbr + '</span> <span style="color:#888;">(' + lineDesc + ')</span>';
        selected.innerHTML = displayHtml + '<span style="margin-left:auto;color:#4ecca3;">▼</span>';
        hidden.value = lineNbr;
        if (input) {
            input.value = lineNbr;
            input.style.borderColor = '#4ecca3';
        }
        options.classList.remove('show');
    }
    
    function clearDropdownSelection(id, placeholder) {
        var selected = document.querySelector('#dropdown' + id + ' .dropdown-selected');
        var hidden = document.getElementById('manualCompareLine' + id);
        var options = document.getElementById('options' + id);
        var input = document.getElementById('lineInput' + id);
        
        selected.innerHTML = '<span>' + placeholder + '</span><span style="margin-left:auto;color:#4ecca3;">▼</span>';
        hidden.value = '';
        if (input) {
            input.value = '';
            input.style.borderColor = '#4ecca3';
        }
        options.classList.remove('show');
    }
    
    function generatePatternPreview(lineData) {
        var html = '<div class="pattern-preview">';
        lineData.days.forEach(function(day, idx) {
            var colorCode = lineData.dayCodes[idx];
            var bgColor = COLOR_MAP[colorCode] || '#00FF00';
            var textColor = LIGHT_TEXT_CODES.includes(colorCode) ? '#fff' : '#000';
            var displayText = day === '--' ? 'OFF' : day;
            html += '<div class="pattern-day" style="background:' + bgColor + '; color:' + textColor + ';">' + displayText + '</div>';
        });
        html += '</div>';
        return html;
    }
    
    function populateManualCompareDropdowns() {
        var dropdownIds = ['A', 'B', 'C', 'D', 'E'];
        var placeholders = ['or Select', 'or Select', '(optional)', '(optional)', '(optional)'];
        
        dropdownIds.forEach(function(id, idx) {
            var optionsContainer = document.getElementById('options' + id);
            if (!optionsContainer) return;
            
            var html = '<div class="dropdown-clear" onclick="clearDropdownSelection(\'' + id + '\', \'' + placeholders[idx] + '\')">' + (placeholders[idx] === 'or Select' ? 'Clear' : placeholders[idx]) + '</div>';
            
            // Add all lines with pattern preview
            ANNUAL_BID.forEach(function(line) {
                var lineNbr = line.lineNbr;
                var lineDesc = line.lineDesc;
                var patternPreview = generatePatternPreview(line);
                
                html += '<div class="dropdown-option" onclick="selectDropdownOption(\'' + id + '\', \'' + lineNbr + '\', \'' + lineDesc + '\')">' +
                    '<span class="line-info">Line ' + lineNbr + ' (' + lineDesc + ')</span>' +
                    patternPreview +
                '</div>';
            });
            
            optionsContainer.innerHTML = html;
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.custom-dropdown')) {
            var allOptions = document.querySelectorAll('.dropdown-options');
            for (var i = 0; i < allOptions.length; i++) {
                allOptions[i].classList.remove('show');
            }
        }
    });

    function showManualComparison() {
    const lineA = document.getElementById('manualCompareLineA').value;
    const lineB = document.getElementById('manualCompareLineB').value;
    const lineC = document.getElementById('manualCompareLineC').value;
    const lineD = document.getElementById('manualCompareLineD').value;
    const lineE = document.getElementById('manualCompareLineE').value;

    // Build array of selected lines (at least 2 required)
    const selectedLines = [lineA, lineB, lineC, lineD, lineE].filter(l => l !== '');

    if (selectedLines.length < 2) {
        alert('Please select at least 2 lines to compare');
        return;
    }

    // Check for duplicates
    const uniqueLines = [...new Set(selectedLines)];
    if (uniqueLines.length !== selectedLines.length) {
        alert('Please select different lines (no duplicates)');
        return;
    }

    // Get data for all selected lines
    const linesData = [];
    for (const lineNbr of selectedLines) {
        const calData = ALL_LINES_CALENDAR[lineNbr];
        const lineInfo = ANNUAL_BID.find(l => l.lineNbr === lineNbr);
        if (!calData || !lineInfo) {
            alert(`Line ${lineNbr} data not found`);
            return;
        }
        linesData.push({
            nbr: lineNbr,
            desc: lineInfo.lineDesc,
            cal: calData
        });
    }

    // Build comparison view
    const months = [
        { name: 'APRIL', year: 2026, month: 3 },
        { name: 'MAY', year: 2026, month: 4 },
        { name: 'JUNE', year: 2026, month: 5 },
        { name: 'JULY', year: 2026, month: 6 },
        { name: 'AUGUST', year: 2026, month: 7 },
        { name: 'SEPTEMBER', year: 2026, month: 8 },
        { name: 'OCTOBER', year: 2026, month: 9 },
        { name: 'NOVEMBER', year: 2026, month: 10 },
        { name: 'DECEMBER', year: 2026, month: 11 },
        { name: 'JANUARY', year: 2027, month: 0 },
        { name: 'FEBRUARY', year: 2027, month: 1 },
        { name: 'MARCH', year: 2027, month: 2 }
    ];

    const titleParts = linesData.map(l => `Line ${l.nbr} (${l.desc})`).join(' vs ');
    let html = `<div style="text-align:center; color:#4ecca3; font-weight:bold; margin-bottom:10px; font-size:12px;">${titleParts} | April 2026 - March 2027</div>`;
    html += '<div class="manual-compare-container">';

    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    months.forEach(m => {
        const lastDay = new Date(m.year, m.month + 1, 0);
        const daysInMonth = lastDay.getDate();

        html += '<div class="manual-compare-month">';
        html += `<div class="manual-compare-label">${m.name}</div>`;
        html += '<div class="manual-compare-data">';

        // Combined day/dow row
        html += '<div class="manual-compare-row">';
        for (let day = 1; day <= 31; day++) {
            const cellClass = day <= daysInMonth ? 'manual-compare-cell day-dow' : 'manual-compare-cell day-dow empty';
            if (day <= daysInMonth) {
                const date = new Date(m.year, m.month, day);
                const dow = dayNames[date.getDay()];
                html += `<div class="${cellClass}">${day}<br>${dow}</div>`;
            } else {
                html += `<div class="${cellClass}"></div>`;
            }
        }
        html += '</div>';

        // Row for each selected line
        linesData.forEach(lineData => {
            html += '<div class="manual-compare-row">';
            for (let day = 1; day <= 31; day++) {
                if (day <= daysInMonth) {
                    const dateKey = `${m.year}-${m.month + 1}-${day}`;
                    const dayData = lineData.cal.days[dateKey] || { s: '--', b: 0 };
                    const holiday = HOLIDAYS[dateKey];
                    const isBalanceDay = dayData.b === 1;
                    const isOffDay = (dayData.s === '--' || dayData.s === '-' || !dayData.s);

                    let bgColor = '#FFFFFF';
                    let textColor = '#000';
                    let classes = 'manual-compare-cell';

                    if (isBalanceDay) {
                        bgColor = '#FF0000';
                        textColor = '#FFFFFF';
                    } else if (!isOffDay) {
                        bgColor = '#FFC000';
                        textColor = '#000';
                    } else {
                        classes += ' off-day';
                    }

                    let style = `background:${bgColor}; color:${textColor};`;
                    if (holiday) style += ' border: 2px solid #e94560;';

                    html += `<div class="${classes}" style="${style}">${dayData.s}</div>`;
                } else {
                    html += '<div class="manual-compare-cell empty"></div>';
                }
            }
            html += '</div>';
        });

        html += '</div></div>';
    });

    html += '</div>';

    document.getElementById('manualCompareContent').innerHTML = html;
    document.getElementById('manualCompareView').style.display = 'block';
}

    function clearManualComparison() {
    // Clear hidden inputs
    document.getElementById('manualCompareLineA').value = '';
    document.getElementById('manualCompareLineB').value = '';
    document.getElementById('manualCompareLineC').value = '';
    document.getElementById('manualCompareLineD').value = '';
    document.getElementById('manualCompareLineE').value = '';
    
    // Reset dropdown displays and text inputs
    const dropdowns = [
        { id: 'A', placeholder: 'or Select' },
        { id: 'B', placeholder: 'or Select' },
        { id: 'C', placeholder: '(optional)' },
        { id: 'D', placeholder: '(optional)' },
        { id: 'E', placeholder: '(optional)' }
    ];
    dropdowns.forEach(d => {
        const selected = document.querySelector('#dropdown' + d.id + ' .dropdown-selected');
        if (selected) {
            selected.innerHTML = '<span>' + d.placeholder + '</span><span style="margin-left:auto;color:#4ecca3;">▼</span>';
        }
        const input = document.getElementById('lineInput' + d.id);
        if (input) {
            input.value = '';
            input.style.borderColor = '#4ecca3';
        }
    });
    
    document.getElementById('manualCompareView').style.display = 'none';
    document.getElementById('manualCompareContent').innerHTML = '';
}

    function printManualComparison() {
    const lineA = document.getElementById('manualCompareLineA').value;
    const lineB = document.getElementById('manualCompareLineB').value;
    const lineC = document.getElementById('manualCompareLineC').value;
    const lineD = document.getElementById('manualCompareLineD').value;
    const lineE = document.getElementById('manualCompareLineE').value;
    const selectedLines = [lineA, lineB, lineC, lineD, lineE].filter(l => l !== '');
    
    const titleParts = selectedLines.map(nbr => {
        const lineData = ANNUAL_BID.find(l => l.lineNbr === nbr);
        return `Line ${nbr} (${lineData ? lineData.lineDesc : nbr})`;
    }).join(' vs ');
    
    const content = document.getElementById('manualCompareContent').innerHTML;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${titleParts} Comparison</title>
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                html, body { height: 100%; width: 100%; margin: 0; padding: 0; }
                body {
                    font-family: Arial, sans-serif;
                    padding: 5px;
                    display: flex;
                    flex-direction: column;
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
                body > div:first-child { flex-shrink: 0; color: #000 !important; }
                .manual-compare-container { display: flex; flex-direction: column; flex: 1; height: 100%; }
                .manual-compare-month { display: flex; margin-bottom: 0px; page-break-inside: avoid; flex: 1; }
                .manual-compare-label { width: 50px; font-size: 7px; font-weight: bold; text-align: center; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
                .manual-compare-data { flex: 1; display: flex; flex-direction: column; gap: 0px; min-width: 0; }
                .manual-compare-row { display: grid; grid-template-columns: repeat(31, 1fr); gap: 0px; width: 100%; }
                .manual-compare-cell { height: 9px; font-size: 6px; border: 0.5px solid #666; display: flex; align-items: center; justify-content: center; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; position: relative; overflow: hidden; }
                .manual-compare-cell.day-dow { height: 12px; font-size: 5px; background: #ddd; font-weight: bold; line-height: 1.1; flex-direction: column; padding: 1px 0; }
                .manual-compare-cell.empty { background: #1a1a2e; border-color: #1a1a2e; }
                .manual-compare-cell.off-day::after { content: ''; position: absolute; top: 1px; right: 1px; width: 3px; height: 3px; background: #00DD00; border-radius: 50%; border: 1px solid #00AA00; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                @page { size: landscape; margin: 0.15in; }
                @media print {
                    html, body { height: 100% !important; margin: 0 !important; padding: 0 !important; }
                    body { padding: 0px; display: flex !important; flex-direction: column !important; max-height: calc(100vh - 0.3in); }
                    body > div:first-child { flex-shrink: 0 !important; color: #000 !important; margin-bottom: 3px !important; }
                    .manual-compare-container { flex: 1 !important; display: flex !important; flex-direction: column !important; max-height: calc(100vh - 0.5in); overflow: hidden; }
                    .manual-compare-month { flex: 1 !important; min-height: 0; }
                }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);
}

    function renderCompatibilityGrid(pairs, isSsom) {
        if (pairs.length === 0) {
            return '<div style="color:#888; font-size:12px; padding:15px; background:#0f3460; border-radius:5px;">No valid swap combinations found.</div>';
        }

        var linesSet = new Set();
        pairs.forEach(function(p) {
            linesSet.add(p.lineA.lineNbr);
            linesSet.add(p.lineB.lineNbr);
        });
        var lines = Array.from(linesSet).sort(function(a,b) { return parseInt(a) - parseInt(b); });

        var matrix = {};
        lines.forEach(function(line) {
            matrix[line] = {};
            lines.forEach(function(otherLine) {
                matrix[line][otherLine] = false;
            });
        });

        pairs.forEach(function(p) {
            matrix[p.lineA.lineNbr][p.lineB.lineNbr] = true;
            matrix[p.lineB.lineNbr][p.lineA.lineNbr] = true;
        });

        var html = '<div style="overflow-x:auto; max-height:500px; overflow-y:auto; border-radius:5px; background:#1a1a2e;">';
        html += '<table style="border-collapse:collapse; font-size:10px; margin:0 auto; position:relative;">';
        html += '<tr><th style="position:sticky; left:0; top:0; z-index:30; padding:5px 8px; border:1px solid #333; background:#16213e; color:#4ecca3; font-weight:bold; white-space:nowrap; box-shadow:2px 0 5px rgba(0,0,0,0.3);">Line</th>';
        lines.forEach(function(line) {
            var lineData = ANNUAL_BID.find(function(l) { return l.lineNbr === line; });
            var lineDesc = lineData ? lineData.lineDesc : line;
            html += '<th style="position:sticky; top:0; z-index:20; padding:3px 2px; border:1px solid #333; background:#16213e; color:#4ecca3; font-weight:bold; writing-mode:vertical-rl; text-orientation:mixed; min-width:24px; max-width:24px; font-size:9px; line-height:1.1;">' + line + '<br>(' + lineDesc + ')</th>';
        });
        html += '</tr>';
        lines.forEach(function(lineA) {
            var lineDataA = ANNUAL_BID.find(function(l) { return l.lineNbr === lineA; });
            var lineDescA = lineDataA ? lineDataA.lineDesc : lineA;
            html += '<tr><td style="position:sticky; left:0; z-index:10; padding:5px 8px; border:1px solid #333; background:#16213e; color:#4ecca3; font-weight:bold; white-space:nowrap; box-shadow:2px 0 5px rgba(0,0,0,0.3);">' + lineA + ' (' + lineDescA + ')</td>';
            lines.forEach(function(lineB) {
                var isCompatible = matrix[lineA][lineB];
                var isSameLine = lineA === lineB;
                var bgColor = isSameLine ? '#0a0a0a' : (isCompatible ? '#2d5016' : '#1a1a2e');
                var text = isSameLine ? '—' : (isCompatible ? '✓' : '');
                var textColor = isCompatible ? '#4ecca3' : '#555';
                html += '<td style="padding:4px 2px; border:1px solid #333; background:' + bgColor + '; color:' + textColor + '; text-align:center; font-weight:bold; font-size:13px; min-width:24px; max-width:24px;">' + text + '</td>';
            });
            html += '</tr>';
        });
        html += '</table></div>';
        return html;
    }

    function showSwapCategory(category) {
        currentSwapCategory = category;
        ['fiveSevenOff', 'twoDayPickup'].forEach(function(cat) {
            var btn = document.getElementById('btn-' + cat);
            if (btn) { btn.style.background = cat === category ? '#4ecca3' : '#0f3460'; btn.style.color = cat === category ? '#1a1a2e' : '#eee'; }
        });
        var results = analyzeSwapPairs();
        var catRes = results[category];
        var html = renderExampleDiagram(category);
        html += '<div style="font-size:10px; color:#888; margin-bottom:15px;"><span style="color:#4ecca3;">✓ = Lines are compatible for this swap type (8-hour rest rule enforced)</span></div>';
        html += '<div style="margin-bottom:30px;"><h4 style="color:#e94560; margin-bottom:10px; font-size:14px;">SSOM Lines Compatibility Grid</h4>';
        html += renderCompatibilityGrid(catRes.ssom, true);
        html += '</div>';
        html += '<div><h4 style="color:#e94560; margin-bottom:10px; font-size:14px;">SOM Lines Compatibility Grid</h4>';
        html += renderCompatibilityGrid(catRes.som, false);
        html += '</div>';
        document.getElementById('swapCompareContent').innerHTML = html;
    }

    function showSwapCompare() { swapAnalysisCache = null; populateManualCompareDropdowns(); showSwapCategory('fiveSevenOff'); document.getElementById('swapCompareModal').classList.add('show'); }
    function hideSwapCompare() { document.getElementById('swapCompareModal').classList.remove('show'); }

    function printSwapCompare() {
        const content = document.getElementById('swapCompareContent').innerHTML;
        const categoryTitle = currentSwapCategory === 'fiveSevenOff' ? '5 On / 7 Off Swaps' : '2-Day Pickup Swaps';
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Swap Compatibility - ${categoryTitle}</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    html, body {
                        height: 100%;
                        margin: 0;
                        padding: 0;
                    }
                    body {
                        font-family: Arial, sans-serif;
                        background: white;
                        padding: 15px;
                        font-size: 9px;
                        display: flex;
                        flex-direction: column;
                        height: 100vh;
                    }
                    h3 {
                        color: #e94560;
                        margin-bottom: 5px;
                        font-size: 14px;
                        text-align: center;
                        flex-shrink: 0;
                    }
                    h4 {
                        color: #e94560;
                        margin: 8px 0 5px 0;
                        font-size: 11px;
                    }
                    .content-wrapper {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                    }
                    @media print {
                        @page {
                            size: portrait;
                            margin: 0.3in;
                        }
                        html, body {
                            height: 100%;
                            margin: 0;
                            padding: 0;
                        }
                        body {
                            padding: 0;
                            height: 100vh;
                            display: flex;
                            flex-direction: column;
                        }
                        h3 {
                            flex-shrink: 0;
                        }
                        .content-wrapper {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            overflow: visible;
                            height: calc(100vh - 30px);
                        }
                        .swap-section {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                        }
                        .pair-container {
                            display: flex;
                            flex-direction: column;
                            gap: 3px;
                        }
                    }
                </style>
            </head>
            <body>
                <h3>🔄 Swap Compatibility Analyzer - ${categoryTitle}</h3>
                <div class="content-wrapper">
                    ${content}
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 250);
    }

    function showCalendar(lineNbr) {
        const calData = ALL_LINES_CALENDAR[lineNbr];
        if (!calData) return;

        currentCalendarLine = lineNbr; // Store current line for link generation

        // Find who this line is assigned to
        let assignedTo = '';
        for (const [key, assignedLine] of Object.entries(assignments)) {
            if (assignedLine === lineNbr) {
                const name = getNameFromKey(key);
                assignedTo = ` - ${name}`;
                break;
            }
        }

        document.getElementById('calendarTitle').textContent = `Year Calendar - Line ${lineNbr} (${calData.desc})${assignedTo}`;

        const grid = document.getElementById('calendarGrid');
        grid.innerHTML = '';

        const months = [
            { name: 'April 2026', year: 2026, month: 3 },
            { name: 'May 2026', year: 2026, month: 4 },
            { name: 'June 2026', year: 2026, month: 5 },
            { name: 'July 2026', year: 2026, month: 6 },
            { name: 'August 2026', year: 2026, month: 7 },
            { name: 'September 2026', year: 2026, month: 8 },
            { name: 'October 2026', year: 2026, month: 9 },
            { name: 'November 2026', year: 2026, month: 10 },
            { name: 'December 2026', year: 2026, month: 11 },
            { name: 'January 2027', year: 2027, month: 0 },
            { name: 'February 2027', year: 2027, month: 1 },
            { name: 'March 2027', year: 2027, month: 2 }
        ];

        function getShiftColor(shift) {
            if (shift === '--' || shift === '-' || !shift) {
                return { bg: '#FFFFFF', text: '#000', isOffDay: true };
            }
            return { bg: '#FFC000', text: '#000', isOffDay: false };
        }

        months.forEach(m => {
            const monthBlock = document.createElement('div');
            monthBlock.className = 'month-block';

            const title = document.createElement('div');
            title.className = 'month-title';
            title.textContent = m.name;
            monthBlock.appendChild(title);

            const header = document.createElement('div');
            header.className = 'month-header';
            ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(d => {
                const span = document.createElement('span');
                span.textContent = d;
                header.appendChild(span);
            });
            monthBlock.appendChild(header);

            const daysContainer = document.createElement('div');
            daysContainer.className = 'month-days';

            const firstDay = new Date(m.year, m.month, 1);
            const lastDay = new Date(m.year, m.month + 1, 0);
            const startDayOfWeek = firstDay.getDay();

            for (let i = 0; i < startDayOfWeek; i++) {
                const empty = document.createElement('div');
                empty.className = 'cal-day empty';
                daysContainer.appendChild(empty);
            }

            for (let day = 1; day <= lastDay.getDate(); day++) {
                const dateKey = `${m.year}-${m.month + 1}-${day}`;
                const dayData = calData.days[dateKey] || { s: '--', b: 0 };
                const holiday = HOLIDAYS[dateKey];
                const isBalanceDay = dayData.b === 1;
                const isPTO = isPTODate(dateKey);

                const colors = getShiftColor(dayData.s);

                let bgColor = colors.bg;
                let textColor = colors.text;
                if (isBalanceDay) {
                    bgColor = '#FF0000';
                    textColor = '#FFFFFF';
                }

                const dayCell = document.createElement('div');
                dayCell.className = 'cal-day' + (holiday ? ' holiday' : '') + (colors.isOffDay && !isBalanceDay ? ' off-day' : '') + (isPTO ? ' pto-day' : '');
                dayCell.style.background = bgColor;
                dayCell.style.color = textColor;

                const dayNum = document.createElement('span');
                dayNum.className = 'day-num';
                dayNum.textContent = day;
                dayCell.appendChild(dayNum);

                const shiftCode = document.createElement('span');
                shiftCode.className = 'shift-code';
                shiftCode.textContent = dayData.s;
                dayCell.appendChild(shiftCode);

                if (holiday) {
                    const tag = document.createElement('span');
                    tag.className = 'holiday-tag';
                    tag.textContent = holiday;
                    dayCell.appendChild(tag);
                }

                daysContainer.appendChild(dayCell);
            }

            monthBlock.appendChild(daysContainer);
            grid.appendChild(monthBlock);
        });

        // Always show calendar grid view by default
        document.getElementById('calendarGrid').style.display = 'grid';
        document.getElementById('traditionalView').style.display = 'none';

        document.getElementById('calendarModal').classList.add('show');
    }

    function hideCalendar() {
        document.getElementById('calendarModal').classList.remove('show');
    }
    
    function exportCurrentLineICS() {
        if (currentCalendarLine) {
            exportLineToICS(currentCalendarLine);
        }
    }
    
    function printCurrentLineSummary() {
        if (currentCalendarLine) {
            printBidSummary(currentCalendarLine);
        }
    }

    function toggleCalendarView() {
        const gridView = document.getElementById('calendarGrid');
        const traditionalView = document.getElementById('traditionalView');

        if (gridView.style.display === 'none') {
            // Switch to grid view
            gridView.style.display = 'grid';
            traditionalView.style.display = 'none';
        } else {
            // Switch to traditional view
            gridView.style.display = 'none';
            traditionalView.style.display = 'block';
            buildTraditionalView();
        }
    }

    function buildTraditionalView() {
        if (!currentCalendarLine) return;

        const calData = ALL_LINES_CALENDAR[currentCalendarLine];
        if (!calData) return;

        const traditionalView = document.getElementById('traditionalView');
        traditionalView.innerHTML = '';

        // Add date range header
        const headerDiv = document.createElement('div');
        headerDiv.style.textAlign = 'center';
        headerDiv.style.fontSize = '14px';
        headerDiv.style.fontWeight = 'bold';
        headerDiv.style.marginBottom = '10px';
        headerDiv.style.color = '#e94560';
        headerDiv.textContent = 'April 2026 - March 2027';
        traditionalView.appendChild(headerDiv);

        const months = [
            { name: 'APRIL', year: 2026, month: 3 },
            { name: 'MAY', year: 2026, month: 4 },
            { name: 'JUNE', year: 2026, month: 5 },
            { name: 'JULY', year: 2026, month: 6 },
            { name: 'AUGUST', year: 2026, month: 7 },
            { name: 'SEPTEMBER', year: 2026, month: 8 },
            { name: 'OCTOBER', year: 2026, month: 9 },
            { name: 'NOVEMBER', year: 2026, month: 10 },
            { name: 'DECEMBER', year: 2026, month: 11 },
            { name: 'JANUARY', year: 2027, month: 0 },
            { name: 'FEBRUARY', year: 2027, month: 1 },
            { name: 'MARCH', year: 2027, month: 2 }
        ];

        // Each month - ALWAYS 31 COLUMNS
        months.forEach(m => {
            const lastDay = new Date(m.year, m.month + 1, 0);
            const daysInMonth = lastDay.getDate();

            // Create month row container
            const monthRow = document.createElement('div');
            monthRow.className = 'traditional-month-row';
            monthRow.style.marginBottom = '3px';

            // Left month label
            const leftLabel = document.createElement('div');
            leftLabel.className = 'traditional-month-label';
            leftLabel.textContent = m.name;
            monthRow.appendChild(leftLabel);

            // Month data container
            const monthData = document.createElement('div');
            monthData.className = 'traditional-month-data';

            // Row 1: Numbers 1-31 (ALWAYS 31 cells)
            const topNumbersRow = document.createElement('div');
            topNumbersRow.className = 'traditional-row';
            for (let day = 1; day <= 31; day++) {
                const cell = document.createElement('div');
                cell.className = 'traditional-day-cell header';
                cell.textContent = day;
                topNumbersRow.appendChild(cell);
            }
            monthData.appendChild(topNumbersRow);

            // Row 2: Day of week (31 cells, blank after month ends)
            const dowRow = document.createElement('div');
            dowRow.className = 'traditional-row';
            const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
            for (let day = 1; day <= 31; day++) {
                const cell = document.createElement('div');
                cell.className = 'traditional-day-cell dow';
                if (day <= daysInMonth) {
                    const date = new Date(m.year, m.month, day);
                    const dow = date.getDay();
                    cell.textContent = dayNames[dow];
                } else {
                    // Beyond end of month - leave blank but visible
                    cell.style.background = '#1a1a2e';
                }
                dowRow.appendChild(cell);
            }
            monthData.appendChild(dowRow);

            // Row 3: Schedule data (31 cells, blank after month ends)
            const scheduleRow = document.createElement('div');
            scheduleRow.className = 'traditional-row';
            for (let day = 1; day <= 31; day++) {
                const cell = document.createElement('div');
                cell.className = 'traditional-day-cell';

                if (day <= daysInMonth) {
                    const dateKey = `${m.year}-${m.month + 1}-${day}`;
                    const dayData = calData.days[dateKey] || { s: '--', b: 0 };
                    const holiday = HOLIDAYS[dateKey];
                    const isBalanceDay = dayData.b === 1;

                    // Apply colors
                    let bgColor = '#FFFFFF';
                    let textColor = '#000';
                    const isOffDay = (dayData.s === '--' || dayData.s === '-' || !dayData.s);

                    if (isBalanceDay) {
                        bgColor = '#FF0000';
                        textColor = '#FFFFFF';
                    } else if (!isOffDay) {
                        bgColor = '#FFC000';
                        textColor = '#000';
                    }

                    if (isOffDay && !isBalanceDay) {
                        cell.classList.add('off-day');
                    }

                    if (holiday) {
                        cell.style.border = '2px solid #e94560';
                    }

                    cell.style.background = bgColor;
                    cell.style.color = textColor;
                    cell.textContent = dayData.s;
                } else {
                    // Beyond end of month - leave blank but visible
                    cell.style.background = '#1a1a2e';
                }

                scheduleRow.appendChild(cell);
            }
            monthData.appendChild(scheduleRow);

            monthRow.appendChild(monthData);

            traditionalView.appendChild(monthRow);
        });
    }

    function copyCalendarLink() {
        if (!currentCalendarLine) return;

        // Get the current page URL without parameters
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrl = `${baseUrl}?line=${currentCalendarLine}`;

        // Copy to clipboard
        navigator.clipboard.writeText(shareUrl).then(() => {
            // Show visual feedback
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = '✓ Copied!';
            btn.style.background = '#4ecca3';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 2000);
        }).catch(err => {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = shareUrl;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            alert('Link copied: ' + shareUrl);
        });
    }

    function printCalendar() {
        const title = document.getElementById('calendarTitle').textContent;
        const gridView = document.getElementById('calendarGrid');
        const traditionalView = document.getElementById('traditionalView');

        // Check which view is active
        const isTraditionalView = traditionalView.style.display !== 'none';
        const contentHtml = isTraditionalView ? traditionalView.innerHTML : gridView.innerHTML;
        const viewClass = isTraditionalView ? 'traditional-view' : 'calendar-grid';

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${title}</title>
                <style>
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    html, body {
                        height: 100%;
                        width: 100%;
                    }
                    body {
                        font-family: Arial, sans-serif;
                        padding: 3px;
                        display: flex;
                        flex-direction: column;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        color-adjust: exact !important;
                    }
                    h3 {
                        font-size: 16px;
                        margin-bottom: 6px;
                        flex-shrink: 0;
                    }
                    .calendar-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        grid-template-rows: repeat(4, 1fr);
                        gap: 5px;
                        flex: 1;
                        height: 100%;
                    }
                    .month-block {
                        background: #f5f5f5;
                        border: 1px solid #999;
                        padding: 4px;
                        border-radius: 3px;
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .month-title {
                        font-weight: bold;
                        text-align: center;
                        margin-bottom: 2px;
                        font-size: 11px;
                        flex-shrink: 0;
                    }
                    .month-header {
                        display: grid;
                        grid-template-columns: repeat(7, 1fr);
                        gap: 1px;
                        margin-bottom: 2px;
                        flex-shrink: 0;
                    }
                    .month-header span {
                        text-align: center;
                        font-size: 8px;
                        color: #666;
                        font-weight: bold;
                    }
                    .month-days {
                        display: grid;
                        grid-template-columns: repeat(7, 1fr);
                        gap: 1px;
                        flex: 1;
                    }
                    .cal-day {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        border-radius: 2px;
                        border: 1px solid #ccc;
                        position: relative;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    .cal-day.empty { background: transparent; border: none; }
                    .cal-day .day-num { font-size: 7px; opacity: 0.7; }
                    .cal-day .shift-code { font-weight: bold; font-size: 8px; }
                    .cal-day.holiday { border: 2px solid #e94560 !important; }
                    .cal-day .holiday-tag {
                        position: absolute;
                        bottom: 0;
                        font-size: 5px;
                        font-weight: bold;
                        color: #e94560;
                        background: rgba(255,255,255,0.8);
                        padding: 0 1px;
                    }
                    .calendar-legend {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                        margin-top: 8px;
                        padding: 6px;
                        background: #f5f5f5;
                        border: 1px solid #999;
                        border-radius: 4px;
                        justify-content: center;
                    }
                    .calendar-legend-item {
                        font-size: 8px;
                        padding: 2px 6px;
                        border-radius: 3px;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    /* Traditional View Styles */
                    .traditional-view {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                    }
                    .traditional-view > div:first-child {
                        flex-shrink: 0;
                        text-align: center;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    .traditional-month-row {
                        display: flex;
                        margin-bottom: 0px;
                        flex: 1;
                        page-break-inside: avoid;
                    }
                    .traditional-month-label {
                        width: 50px;
                        font-weight: bold;
                        color: #000;
                        text-align: center;
                        flex-shrink: 0;
                        font-size: 8px;
                    }
                    .traditional-month-data {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        gap: 0px;
                        min-width: 0;
                    }
                    .traditional-row {
                        display: grid;
                        grid-template-columns: repeat(31, 1fr);
                        gap: 0px;
                        width: 100%;
                    }
                    .traditional-day-cell {
                        height: 11px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 9px;
                        border: 0.5px solid #666;
                        position: relative;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        box-sizing: border-box;
                    }
                    .traditional-day-cell.header {
                        background: #ddd;
                        font-weight: bold;
                        font-size: 9px;
                    }
                    .traditional-day-cell.dow {
                        background: #eee;
                        font-size: 8px;
                    }
                    .traditional-day-cell.notes {
                        background: #ffffff;
                        border: 1px solid #666;
                        min-height: 11px;
                    }
                    .traditional-day-cell.off-day::after {
                        content: '';
                        position: absolute;
                        top: 2px;
                        right: 2px;
                        width: 3px;
                        height: 3px;
                        background: #00DD00;
                        border-radius: 50%;
                        border: 1px solid #00AA00;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    @page {
                        size: landscape;
                        margin: 0.15in;
                    }
                    @media print {
                        body { padding: 0px; }
                        .calendar-grid {
                            gap: 5px;
                            grid-template-columns: repeat(3, 1fr);
                        }
                        .month-block { padding: 4px; }
                        .cal-day { min-height: 18px; }
                    }
                </style>
            </head>
            <body>
                <h3>${title}</h3>
                <div class="${viewClass}">${contentHtml}</div>
            </body>
            </html>
        `);
        printWindow.document.close();
        setTimeout(function() {
            printWindow.print();
        }, 300);
    }

    function clearAll() {
        if (!isAdmin) return;
        if (confirm('Clear all assignments? This cannot be undone.')) {
            assignments = {};
            saveLocal();
            saveToCloud();
            renderAll();
        }
    }

    // =====================================================
    // ASCENT EXPORT FUNCTIONS - Full 365-Day Format
    // Names loaded from LOCAL file only (never stored on web)
    // =====================================================
    
    // Employee mapping loaded from local CSV at export time
    let employeeData = {};
    let ascentExportData = [];

    // Shift code translation: Polish Bid code -> ASCENT format
    // Pattern: [Letter][Hour][Hour][Desk] -> [StartTime]-[EndTime]@[Desk]
    // Relief: XXX/XX -> 0900R2100 (placeholder that can be assigned anything)
    function translateShiftCode(code) {
        if (!code || code === '--' || code === '-') return 'OFF';
        
        // Relief lines - use R format (placeholder)
        if (code === 'XXX' || code === 'XX') return '0900R2100';
        
        // Parse the code: E05A, A06M, P12B, M18M, etc.
        const match = code.match(/^([A-Z])(\d{2})([A-Z])$/);
        if (!match) return 'OFF';
        
        const [, prefix, hourStr, desk] = match;
        const startHour = parseInt(hourStr);
        
        // Determine end time (all 12-hour shifts)
        const endHour = (startHour + 12) % 24;
        
        // Format times as HHMM
        const startStr = String(startHour).padStart(2, '0') + '00';
        const endStr = String(endHour).padStart(2, '0') + '00';
        
        return `${startStr}-${endStr}@${desk}`;
    }

    // Generate all dates from Apr 1, 2026 to Mar 31, 2027
    function generateDateRange() {
        const dates = [];
        const startDate = new Date(2026, 3, 1); // April 1, 2026 (months are 0-indexed)
        const endDate = new Date(2027, 2, 31);   // March 31, 2027
        
        let current = new Date(startDate);
        while (current <= endDate) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        return dates;
    }

    // Format date as "D-Mon-YY" (e.g., "1-Apr-26")
    function formatDateHeader(date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = String(date.getFullYear()).slice(-2);
        return `${day}-${month}-${year}`;
    }

    // Calculate which pattern day (0-11) a given date falls on
    // April 1, 2026 is pattern day 1 (index 0)
    function getPatternDayIndex(date) {
        const startDate = new Date(2026, 3, 1); // April 1, 2026
        const diffTime = date.getTime() - startDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays % 12;
    }

    // Get shift for a given line and date
    function getShiftForDate(lineData, date) {
        const patternIndex = getPatternDayIndex(date);
        const shiftCode = lineData.days[patternIndex];
        return translateShiftCode(shiftCode);
    }
    
    function showAscentExport() {
        if (!isAdmin) return;
        document.getElementById('ascentExportModal').classList.add('show');
        // Reset state
        employeeData = {};
        ascentExportData = [];
        document.getElementById('employeeParseStatus').textContent = '';
        document.getElementById('generateExportBtn').disabled = true;
        document.getElementById('generateExportBtn').style.background = '#888';
        document.getElementById('downloadExportBtn').disabled = true;
        document.getElementById('downloadExportBtn').style.background = '#888';
        document.getElementById('ascentExportPreview').style.display = 'none';
        document.getElementById('employeeDataPaste').value = '';
    }
    
    function hideAscentExport() {
        document.getElementById('ascentExportModal').classList.remove('show');
    }
    
    function parseEmployeeData() {
        const textArea = document.getElementById('employeeDataPaste');
        const statusEl = document.getElementById('employeeParseStatus');
        const text = textArea.value.trim();
        
        if (!text) {
            statusEl.textContent = '⚠️ Please paste employee data';
            statusEl.style.color = '#e94560';
            return;
        }
        
        try {
            const lines = text.split(/\r?\n/).filter(line => line.trim());
            
            // Check if first line looks like a header
            const firstLine = lines[0].toUpperCase();
            const startIdx = (firstLine.includes('ABBREVIATED') || firstLine.includes('NAME') || firstLine.includes('WORKER')) ? 1 : 0;
            
            employeeData = {};
            let count = 0;
            
            for (let i = startIdx; i < lines.length; i++) {
                const parts = lines[i].split('\t');
                if (parts.length >= 3) {
                    const abbrevName = parts[0].trim();
                    const fullName = parts[1].trim();
                    const workerId = parts[2].trim();
                    const workerType = parts[3] ? parts[3].trim().replace('-', '') : 'SOM'; // SOM-QA -> SOMQA
                    const hireType = parts[4] ? parts[4].trim() : 'Full Time';
                    
                    if (abbrevName && fullName && workerId) {
                        employeeData[abbrevName] = {
                            name: fullName,
                            workerId: workerId,
                            workerType: workerType,
                            hireType: hireType
                        };
                        count++;
                    }
                }
            }
            
            if (count === 0) {
                statusEl.textContent = '⚠️ No valid rows found. Check tab separation.';
                statusEl.style.color = '#e94560';
                return;
            }
            
            statusEl.textContent = `✓ Parsed ${count} employees`;
            statusEl.style.color = '#4ecca3';
            
            // Enable generate button
            document.getElementById('generateExportBtn').disabled = false;
            document.getElementById('generateExportBtn').style.background = '#4ecca3';
            
        } catch (err) {
            statusEl.textContent = '⚠️ Error parsing data: ' + err.message;
            statusEl.style.color = '#e94560';
        }
    }
    
    // Helper to convert "Last, First" to "First Last" format
    function formatNameFirstLast(name) {
        if (!name || !name.includes(',')) return name;
        const parts = name.split(',').map(p => p.trim());
        if (parts.length >= 2) {
            return parts[1] + ' ' + parts[0];
        }
        return name;
    }
    
    function generateAscentExport() {
        if (Object.keys(employeeData).length === 0) {
            alert('Please load your employee data file first');
            return;
        }
        
        const dates = generateDateRange();
        ascentExportData = [];
        const unmatched = [];
        let matched = 0;
        
        // Process all assignments
        const allGroups = [
            { group: GROUP1, prefix: 'g1', groupName: 'SSOM' },
            { group: GROUP2, prefix: 'g2', groupName: 'SOM' }
        ];
        
        allGroups.forEach(({ group, prefix, groupName }) => {
            group.forEach(person => {
                const key = prefix + '-' + person.nbr;
                const lineNbr = assignments[key];
                
                if (lineNbr) {
                    const empInfo = employeeData[person.name];
                    const lineData = ANNUAL_BID.find(l => l.lineNbr === lineNbr);
                    
                    if (empInfo && lineData) {
                        matched++;
                        
                        // Generate shifts for all 365 days
                        const dailyShifts = dates.map(date => getShiftForDate(lineData, date));
                        
                        ascentExportData.push({
                            status: 'matched',
                            workerId: empInfo.workerId,
                            worker: formatNameFirstLast(empInfo.name),
                            workerType: empInfo.workerType,
                            hireType: empInfo.hireType,
                            lineNumber: lineNbr,
                            shifts: dailyShifts
                        });
                    } else if (lineData) {
                        unmatched.push(person.name);
                        ascentExportData.push({
                            status: 'unmatched',
                            workerId: '???',
                            worker: formatNameFirstLast(person.name) + ' (NOT IN FILE)',
                            workerType: groupName,
                            hireType: 'Full Time',
                            lineNumber: lineNbr,
                            shifts: dates.map(() => 'OFF')
                        });
                    }
                }
            });
        });
        
        // Sort by line number
        ascentExportData.sort((a, b) => parseInt(a.lineNumber) - parseInt(b.lineNumber));
        
        // Update stats
        document.getElementById('matchedCount').textContent = matched;
        document.getElementById('unmatchedCount').textContent = unmatched.length;
        document.getElementById('totalAssignments').textContent = ascentExportData.length;
        
        // Show unmatched warning if any
        if (unmatched.length > 0) {
            document.getElementById('unmatchedWarning').style.display = 'block';
            document.getElementById('unmatchedList').textContent = unmatched.join(', ');
        } else {
            document.getElementById('unmatchedWarning').style.display = 'none';
        }
        
        // Build preview table (show first few columns only)
        const tableBody = document.getElementById('ascentExportTable');
        tableBody.innerHTML = ascentExportData.map(row => `
            <tr style="border-bottom:1px solid #0f3460; color:${row.status === 'matched' ? '#ccc' : '#e94560'};">
                <td style="padding:5px;">${row.status === 'matched' ? '✓' : '✗'}</td>
                <td style="padding:5px;">${row.worker}</td>
                <td style="padding:5px;">${row.workerId}</td>
                <td style="padding:5px;">${row.workerType}</td>
                <td style="padding:5px;">${row.lineNumber}</td>
                <td style="padding:5px;">${row.shifts[0]}</td>
                <td style="padding:5px;">${row.shifts[1]}</td>
            </tr>
        `).join('');
        
        // Show preview
        document.getElementById('ascentExportPreview').style.display = 'block';
        
        // Enable download button
        document.getElementById('downloadExportBtn').disabled = false;
        document.getElementById('downloadExportBtn').style.background = '#2563eb';
    }
    
    function downloadAscentExport() {
        if (ascentExportData.length === 0) {
            alert('Please generate export first');
            return;
        }
        
        const dates = generateDateRange();
        const lines = [];
        
        // Helper to escape CSV fields (wrap in quotes if contains comma)
        function csvField(val) {
            if (val && (val.includes(',') || val.includes('"'))) {
                return '"' + val.replace(/"/g, '""') + '"';
            }
            return val;
        }
        
        // Header block - dynamic bid year
        const bidYearStart = 2026;
        const bidYearEnd = (bidYearStart + 1) % 100; // 27
        const bidYearStr = bidYearStart + '-' + (bidYearEnd < 10 ? '0' + bidYearEnd : bidYearEnd);
        
        lines.push('Work schedule,' + bidYearStr + 'SOM');
        lines.push('Start date,1-Apr-' + (bidYearStart % 100));
        lines.push('End date,31-Mar-' + bidYearEnd);
        lines.push('Site,ATL');
        lines.push('CDID,DL_OCC');
        lines.push('Worker types,SOM SOMQA SSOM');
        
        // Column headers
        const dateHeaders = dates.map(d => formatDateHeader(d));
        const headerRow = ['Worker ID', 'Worker', 'Worker type', 'Hire type', 'Line number', ...dateHeaders];
        lines.push(headerRow.join(','));
        
        // Data rows
        ascentExportData.forEach(row => {
            const dataRow = [
                row.workerId,
                csvField(row.worker),
                row.workerType,
                row.hireType,
                row.lineNumber,
                ...row.shifts
            ];
            lines.push(dataRow.join(','));
        });
        
        // Join with newlines
        const csv = lines.join('\n');
        
        // Generate filename with date
        const today = new Date();
        const dateStr = today.toISOString().split('T')[0];
        const filename = `polish_bid_ascent_2026-27_${dateStr}.csv`;
        
        // Download as CSV file
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    // ===========================================
    // FAVORITES/WATCHLIST FUNCTIONS
    // ===========================================
    
    function loadFavorites() {
        try {
            var stored = localStorage.getItem('polishBidFavorites');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    }
    
    function saveFavorites(favorites) {
        try {
            localStorage.setItem('polishBidFavorites', JSON.stringify(favorites));
        } catch (e) {
            console.error('Error saving favorites:', e);
        }
    }
    
    function toggleFavorite(lineNbr) {
        var favorites = loadFavorites();
        var idx = favorites.indexOf(lineNbr);
        if (idx === -1) {
            favorites.push(lineNbr);
        } else {
            favorites.splice(idx, 1);
        }
        saveFavorites(favorites);
        renderAllLines();
    }
    
    function updateFavoriteCount() {
        var favorites = loadFavorites();
        var countEl = document.getElementById('favCount');
        if (countEl) {
            countEl.textContent = favorites.length;
        }
    }
    
    function toggleFavoritesView() {
        var btn = document.getElementById('favoritesBtn');
        btn.classList.toggle('active');
        if (btn.classList.contains('active')) {
            btn.style.background = '#e94560';
            btn.innerHTML = '⭐ Show All';
        } else {
            btn.style.background = '#f0a500';
            btn.innerHTML = '⭐ Favorites (<span id="favCount">' + loadFavorites().length + '</span>)';
        }
        renderAllLines();
    }

    // ===========================================
    // CALENDAR EXPORT (ICS) FUNCTIONS
    // ===========================================
    
    function exportLineToICS(lineNbr) {
        var lineData = ANNUAL_BID.find(function(l) { return l.lineNbr === lineNbr; });
        if (!lineData) {
            alert('Line not found');
            return;
        }
        
        var calendar = ALL_LINES_CALENDAR[lineNbr];
        if (!calendar) {
            alert('Calendar data not found');
            return;
        }
        
        var icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Polish Bid 2026-27//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'X-WR-CALNAME:Line ' + lineNbr + ' (' + lineData.lineDesc + ')'
        ];
        
        // Generate events for each day
        var startDate = new Date(2026, 3, 1); // April 1, 2026
        var endDate = new Date(2027, 2, 31); // March 31, 2027
        
        var currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            var dateStr = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
            var dayData = calendar.days[dateStr];
            
            if (dayData && dayData.s !== '--') {
                var shift = dayData.s;
                var hour = parseInt(shift.substring(1, 3), 10);
                if (isNaN(hour)) hour = 6;
                
                var year = currentDate.getFullYear();
                var month = String(currentDate.getMonth() + 1).padStart(2, '0');
                var day = String(currentDate.getDate()).padStart(2, '0');
                var startHour = String(hour).padStart(2, '0');
                
                var endHourNum = (hour + 12) % 24;
                var endHour = String(endHourNum).padStart(2, '0');
                
                // Handle overnight shifts - end date is next day
                var endYear = year;
                var endMonth = month;
                var endDay = day;
                if (hour + 12 >= 24) {
                    var nextDate = new Date(currentDate);
                    nextDate.setDate(nextDate.getDate() + 1);
                    endYear = nextDate.getFullYear();
                    endMonth = String(nextDate.getMonth() + 1).padStart(2, '0');
                    endDay = String(nextDate.getDate()).padStart(2, '0');
                }
                
                icsContent.push('BEGIN:VEVENT');
                icsContent.push('DTSTART:' + year + month + day + 'T' + startHour + '0000');
                icsContent.push('DTEND:' + endYear + endMonth + endDay + 'T' + endHour + '0000');
                icsContent.push('SUMMARY:' + shift);
                icsContent.push('DESCRIPTION:Line ' + lineNbr + ' - ' + lineData.lineDesc);
                icsContent.push('UID:' + year + month + day + '-line' + lineNbr + '@polishbid');
                icsContent.push('END:VEVENT');
            }
            
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        icsContent.push('END:VCALENDAR');
        
        var blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'Line_' + lineNbr + '_' + lineData.lineDesc + '_2026-27.ics';
        a.click();
        URL.revokeObjectURL(url);
    }
    
    function getShiftTimes(shiftCode) {
        // Parse shift code to determine times
        // Format: X##Y where X=shift type, ##=hour, Y=desk
        var hour = parseInt(shiftCode.substring(1, 3), 10);
        if (isNaN(hour)) hour = 6;
        
        var startHour = String(hour).padStart(2, '0');
        var endHour = String((hour + 12) % 24).padStart(2, '0');
        
        return {
            start: startHour + '00',
            end: endHour + '00'
        };
    }

    // ===========================================
    // PTO OVERLAY FUNCTIONS
    // ===========================================
    
    function loadPTODates() {
        try {
            var stored = localStorage.getItem('polishBidPTO');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    }
    
    function savePTODates(dates) {
        try {
            localStorage.setItem('polishBidPTO', JSON.stringify(dates));
        } catch (e) {
            console.error('Error saving PTO dates:', e);
        }
    }
    
    function showPTOModal() {
        document.getElementById('ptoModal').classList.add('show');
        renderPTOList();
    }
    
    function hidePTOModal() {
        document.getElementById('ptoModal').classList.remove('show');
    }
    
    function addPTORange() {
        var startInput = document.getElementById('ptoStartDate');
        var endInput = document.getElementById('ptoEndDate');
        
        var startDate = startInput.value;
        var endDate = endInput.value;
        
        if (!startDate || !endDate) {
            alert('Please select both start and end dates');
            return;
        }
        
        if (new Date(startDate) > new Date(endDate)) {
            alert('Start date must be before end date');
            return;
        }
        
        var ptoDates = loadPTODates();
        ptoDates.push({ start: startDate, end: endDate });
        savePTODates(ptoDates);
        
        startInput.value = '';
        endInput.value = '';
        
        renderPTOList();
    }
    
    function deletePTORange(index) {
        var ptoDates = loadPTODates();
        ptoDates.splice(index, 1);
        savePTODates(ptoDates);
        renderPTOList();
    }
    
    function clearAllPTO() {
        if (confirm('Clear all PTO dates?')) {
            savePTODates([]);
            renderPTOList();
        }
    }
    
    function renderPTOList() {
        var container = document.getElementById('ptoDatesList');
        var ptoDates = loadPTODates();
        
        if (ptoDates.length === 0) {
            container.innerHTML = '<p style="color:#888; font-size:12px;">No PTO dates added yet.</p>';
            return;
        }
        
        var html = '';
        ptoDates.forEach(function(range, idx) {
            var start = new Date(range.start);
            var end = new Date(range.end);
            var days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
            
            html += '<div class="pto-date-item">' +
                '<div>' +
                    '<span class="pto-date-range">' + formatDateDisplay(range.start) + ' - ' + formatDateDisplay(range.end) + '</span> ' +
                    '<span class="pto-date-days">(' + days + ' day' + (days > 1 ? 's' : '') + ')</span>' +
                '</div>' +
                '<button class="pto-delete-btn" onclick="deletePTORange(' + idx + ')">✕</button>' +
            '</div>';
        });
        
        container.innerHTML = html;
    }
    
    function formatDateDisplay(dateStr) {
        var date = new Date(dateStr + 'T12:00:00');
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    }
    
    function isPTODate(dateStr) {
        var ptoDates = loadPTODates();
        // Convert dateStr format "2026-4-15" to comparable date
        var parts = dateStr.split('-');
        var checkDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        
        for (var i = 0; i < ptoDates.length; i++) {
            var start = new Date(ptoDates[i].start);
            var end = new Date(ptoDates[i].end);
            if (checkDate >= start && checkDate <= end) {
                return true;
            }
        }
        return false;
    }
    
    function countPTOConflicts(lineNbr) {
        var calendar = ALL_LINES_CALENDAR[lineNbr];
        if (!calendar) return 0;
        
        var conflicts = 0;
        var ptoDates = loadPTODates();
        
        for (var dateStr in calendar.days) {
            var dayData = calendar.days[dateStr];
            if (dayData.s !== '--' && isPTODate(dateStr)) {
                conflicts++;
            }
        }
        
        return conflicts;
    }

    // ===========================================
    // AUDIT LOG FUNCTIONS
    // ===========================================
    
    var auditLog = [];
    var lastAction = null;
    
    function logBidAction(action, personName, lineNbr, previousLine) {
        var entry = {
            timestamp: new Date().toISOString(),
            action: action,
            person: personName,
            line: lineNbr,
            previousLine: previousLine || null,
            admin: isAdmin ? 'Admin' : 'System'
        };
        
        auditLog.unshift(entry);
        
        // Keep last 500 entries in memory
        if (auditLog.length > 500) {
            auditLog = auditLog.slice(0, 500);
        }
        
        // Save to localStorage for persistence
        try {
            localStorage.setItem('polishBidAuditLog', JSON.stringify(auditLog));
        } catch (e) {
            console.error('Error saving audit log:', e);
        }
        
        // Track for undo
        if (action === 'ASSIGN' || action === 'REMOVE') {
            lastAction = entry;
            updateUndoButton();
        }
    }
    
    function loadAuditLog() {
        try {
            var stored = localStorage.getItem('polishBidAuditLog');
            auditLog = stored ? JSON.parse(stored) : [];
        } catch (e) {
            auditLog = [];
        }
    }
    
    function showAuditLog() {
        document.getElementById('auditLogModal').classList.add('show');
        refreshAuditLog();
    }
    
    function hideAuditLog() {
        document.getElementById('auditLogModal').classList.remove('show');
    }
    
    function refreshAuditLog() {
        loadAuditLog();
        var tbody = document.getElementById('auditLogTable');
        
        if (auditLog.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="padding:20px; text-align:center; color:#888;">No bid actions recorded yet.</td></tr>';
            return;
        }
        
        var html = '';
        auditLog.forEach(function(entry) {
            var time = new Date(entry.timestamp);
            var timeStr = time.toLocaleDateString() + ' ' + time.toLocaleTimeString();
            
            var actionColor = entry.action === 'ASSIGN' ? '#4ecca3' : (entry.action === 'REMOVE' ? '#e94560' : '#f0a500');
            
            html += '<tr style="border-bottom:1px solid #16213e;">' +
                '<td style="padding:8px; color:#888;">' + timeStr + '</td>' +
                '<td style="padding:8px; color:' + actionColor + '; font-weight:bold;">' + entry.action + '</td>' +
                '<td style="padding:8px; color:#fff;">' + entry.person + '</td>' +
                '<td style="padding:8px; color:#4ecca3;">' + entry.line + '</td>' +
                '<td style="padding:8px; color:#888;">' + entry.admin + '</td>' +
            '</tr>';
        });
        
        tbody.innerHTML = html;
    }
    
    function exportAuditLog() {
        loadAuditLog();
        
        if (auditLog.length === 0) {
            alert('No audit log entries to export');
            return;
        }
        
        var csv = 'Timestamp,Action,Person,Line,By\n';
        auditLog.forEach(function(entry) {
            csv += '"' + entry.timestamp + '","' + entry.action + '","' + entry.person + '","' + entry.line + '","' + entry.admin + '"\n';
        });
        
        var blob = new Blob([csv], { type: 'text/csv' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'polish_bid_audit_log_' + new Date().toISOString().split('T')[0] + '.csv';
        a.click();
        URL.revokeObjectURL(url);
    }

    // ===========================================
    // UNDO FUNCTIONS
    // ===========================================
    
    function updateUndoButton() {
        var btn = document.getElementById('undoBtn');
        if (btn && isAdmin) {
            btn.style.display = lastAction ? 'inline-block' : 'none';
            if (lastAction) {
                btn.title = 'Undo: ' + lastAction.action + ' ' + lastAction.person + ' on Line ' + lastAction.line;
            }
        }
    }
    
    function undoLastAction() {
        if (!lastAction) {
            alert('Nothing to undo');
            return;
        }
        
        var confirmMsg = 'Undo last action?\n\n' +
            'Action: ' + lastAction.action + '\n' +
            'Person: ' + lastAction.person + '\n' +
            'Line: ' + lastAction.line;
        
        if (!confirm(confirmMsg)) return;
        
        // Find the person's key
        var personKey = null;
        var allGroups = [
            { group: GROUP1, prefix: 'g1' },
            { group: GROUP2, prefix: 'g2' }
        ];
        
        for (var g = 0; g < allGroups.length; g++) {
            var groupInfo = allGroups[g];
            for (var p = 0; p < groupInfo.group.length; p++) {
                if (groupInfo.group[p].name === lastAction.person) {
                    personKey = groupInfo.prefix + '-' + groupInfo.group[p].nbr;
                    break;
                }
            }
            if (personKey) break;
        }
        
        if (!personKey) {
            alert('Could not find person to undo');
            return;
        }
        
        if (lastAction.action === 'ASSIGN') {
            // Undo assignment - remove the bid
            delete assignments[personKey];
            delete confirmations[personKey];
            logBidAction('UNDO-REMOVE', lastAction.person, lastAction.line, null);
        } else if (lastAction.action === 'REMOVE') {
            // Undo removal - restore the bid
            if (lastAction.previousLine) {
                assignments[personKey] = lastAction.previousLine;
                logBidAction('UNDO-RESTORE', lastAction.person, lastAction.previousLine, null);
            }
        }
        
        lastAction = null;
        updateUndoButton();
        saveToCloud();
        renderAll();
    }

    // ===========================================
    // PRINT BID SUMMARY FUNCTIONS
    // ===========================================
    
    function printBidSummary(lineNbr) {
        var lineData = ANNUAL_BID.find(function(l) { return l.lineNbr === lineNbr; });
        if (!lineData) return;
        
        var calendar = ALL_LINES_CALENDAR[lineNbr];
        if (!calendar) return;
        
        var lineToBidder = getLineToBidder();
        var bidder = lineToBidder[lineNbr] || 'Not Assigned';
        var ptoDates = loadPTODates();
        
        // Count work days, off days, holidays off
        var workDays = 0;
        var offDays = 0;
        var holidaysOff = 0;
        var ptoConflicts = 0;
        
        // Use the same HOLIDAYS constant
        for (var dateStr in calendar.days) {
            var dayData = calendar.days[dateStr];
            if (dayData.s === '--') {
                offDays++;
                if (HOLIDAYS[dateStr]) {
                    holidaysOff++;
                }
            } else {
                workDays++;
                if (isPTODate(dateStr)) {
                    ptoConflicts++;
                }
            }
        }
        
        // Build print content
        var html = '<!DOCTYPE html><html><head><title>Line ' + lineNbr + ' Summary</title>' +
            '<style>' +
            'body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }' +
            'h1 { color: #e94560; border-bottom: 2px solid #e94560; padding-bottom: 10px; }' +
            'h2 { color: #4ecca3; margin-top: 25px; }' +
            '.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0; }' +
            '.stat-box { background: #f5f5f5; padding: 15px; border-radius: 8px; text-align: center; }' +
            '.stat-value { font-size: 28px; font-weight: bold; color: #16213e; }' +
            '.stat-label { font-size: 12px; color: #666; }' +
            '.pattern { display: flex; gap: 5px; margin: 15px 0; }' +
            '.pattern-day { width: 50px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 5px; font-weight: bold; font-size: 12px; }' +
            '.holidays { margin-top: 20px; }' +
            '.holiday-row { display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid #eee; }' +
            '.holiday-off { color: #4ecca3; font-weight: bold; }' +
            '.holiday-work { color: #e94560; }' +
            '@media print { body { padding: 0; } }' +
            '</style></head><body>';
        
        html += '<h1>Line ' + lineNbr + ' (' + lineData.lineDesc + ')</h1>';
        html += '<p><strong>Bidder:</strong> ' + bidder + '</p>';
        
        html += '<h2>12-Day Pattern</h2>';
        html += '<div class="pattern">';
        for (var i = 0; i < 12; i++) {
            var dayCode = lineData.dayCodes[i];
            var bgColor = COLOR_MAP[dayCode] || '#ddd';
            var textColor = LIGHT_TEXT_CODES.includes(dayCode) ? '#fff' : '#000';
            html += '<div class="pattern-day" style="background:' + bgColor + '; color:' + textColor + ';">' + lineData.days[i] + '</div>';
        }
        html += '</div>';
        
        html += '<h2>Annual Statistics</h2>';
        html += '<div class="stats">';
        html += '<div class="stat-box"><div class="stat-value">' + workDays + '</div><div class="stat-label">Work Days</div></div>';
        html += '<div class="stat-box"><div class="stat-value">' + offDays + '</div><div class="stat-label">Off Days</div></div>';
        html += '<div class="stat-box"><div class="stat-value">' + holidaysOff + '/12</div><div class="stat-label">Holidays Off</div></div>';
        html += '</div>';
        
        if (ptoDates.length > 0) {
            html += '<div class="stats">';
            html += '<div class="stat-box" style="background:#ffe5e5;"><div class="stat-value" style="color:#e94560;">' + ptoConflicts + '</div><div class="stat-label">PTO Conflicts</div></div>';
            html += '</div>';
        }
        
        html += '<h2>Holiday Schedule</h2>';
        html += '<div class="holidays">';
        
        var holidayList = [
            { date: '2026-4-5', name: 'Easter 1' },
            { date: '2026-5-10', name: 'Mothers Day' },
            { date: '2026-5-25', name: 'Memorial Day' },
            { date: '2026-6-21', name: 'Fathers Day' },
            { date: '2026-7-4', name: 'July 4th' },
            { date: '2026-9-7', name: 'Labor Day' },
            { date: '2026-11-26', name: 'Thanksgiving' },
            { date: '2026-12-25', name: 'Christmas' },
            { date: '2027-1-1', name: 'New Years Day' },
            { date: '2027-2-14', name: 'Super Bowl Sunday' },
            { date: '2027-3-17', name: 'St Patricks Day' },
            { date: '2027-3-28', name: 'Easter 2' }
        ];
        
        holidayList.forEach(function(h) {
            var dayData = calendar.days[h.date];
            var isOff = dayData && dayData.s === '--';
            html += '<div class="holiday-row">' +
                '<span>' + h.name + '</span>' +
                '<span class="' + (isOff ? 'holiday-off' : 'holiday-work') + '">' + (isOff ? '✓ OFF' : (dayData ? dayData.s : 'WORK')) + '</span>' +
            '</div>';
        });
        
        html += '</div>';
        
        html += '<p style="margin-top:30px; color:#888; font-size:11px;">Generated ' + new Date().toLocaleString() + '</p>';
        html += '</body></html>';
        
        var printWindow = window.open('', '_blank');
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.print();
    }

    // Initialize audit log on load
    loadAuditLog();

    // ===========================================
    // NEXT YEAR SETUP FUNCTIONS
    // ===========================================
    
    // All holidays data from 2025-2051
    const ALL_HOLIDAYS_DATA = {
        "2025-2026": {
            holidays: [
                { name: "Easter", date: "2025-04-20", patternDay: 8, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2025-05-11", patternDay: 5, abbrev: "MOM" },
                { name: "Memorial Day", date: "2025-05-26", patternDay: 8, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2025-06-15", patternDay: 4, abbrev: "DAD" },
                { name: "Independence Day", date: "2025-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2025-09-01", patternDay: 10, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2025-11-27", patternDay: 1, abbrev: "THX" },
                { name: "Christmas", date: "2025-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2026-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2026-02-08", patternDay: 2, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2026-03-17", patternDay: 3, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: false
        },
        "2026-2027": {
            holidays: [
                { name: "Easter", date: "2026-04-05", patternDay: 5, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2026-05-10", patternDay: 4, abbrev: "MOM" },
                { name: "Memorial Day", date: "2026-05-25", patternDay: 7, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2026-06-21", patternDay: 10, abbrev: "DAD" },
                { name: "Independence Day", date: "2026-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2026-09-07", patternDay: 4, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2026-11-26", patternDay: 12, abbrev: "THX" },
                { name: "Christmas", date: "2026-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2027-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2027-02-14", patternDay: 8, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2027-03-17", patternDay: 3, abbrev: "STPAT" },
                { name: "Easter (2nd)", date: "2027-03-28", patternDay: 2, abbrev: "EAST2" }
            ],
            twoEasters: true, noEaster: false
        },
        "2027-2028": {
            holidays: [
                { name: "Mother's Day", date: "2027-05-09", patternDay: 3, abbrev: "MOM" },
                { name: "Memorial Day", date: "2027-05-31", patternDay: 1, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2027-06-20", patternDay: 9, abbrev: "DAD" },
                { name: "Independence Day", date: "2027-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2027-09-06", patternDay: 3, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2027-11-25", patternDay: 11, abbrev: "THX" },
                { name: "Christmas", date: "2027-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2028-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2028-02-13", patternDay: 7, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2028-03-17", patternDay: 4, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: true
        },
        "2028-2029": {
            holidays: [
                { name: "Easter", date: "2028-04-16", patternDay: 4, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2028-05-14", patternDay: 8, abbrev: "MOM" },
                { name: "Memorial Day", date: "2028-05-29", patternDay: 11, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2028-06-18", patternDay: 7, abbrev: "DAD" },
                { name: "Independence Day", date: "2028-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2028-09-04", patternDay: 1, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2028-11-23", patternDay: 9, abbrev: "THX" },
                { name: "Christmas", date: "2028-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2029-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2029-02-11", patternDay: 5, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2029-03-17", patternDay: 3, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: false
        },
        "2029-2030": {
            holidays: [
                { name: "Easter", date: "2029-04-01", patternDay: 1, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2029-05-13", patternDay: 7, abbrev: "MOM" },
                { name: "Memorial Day", date: "2029-05-28", patternDay: 10, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2029-06-17", patternDay: 6, abbrev: "DAD" },
                { name: "Independence Day", date: "2029-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2029-09-03", patternDay: 12, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2029-11-22", patternDay: 8, abbrev: "THX" },
                { name: "Christmas", date: "2029-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2030-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2030-02-10", patternDay: 4, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2030-03-17", patternDay: 3, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: false
        },
        "2030-2031": {
            holidays: [
                { name: "Easter", date: "2030-04-21", patternDay: 9, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2030-05-12", patternDay: 6, abbrev: "MOM" },
                { name: "Memorial Day", date: "2030-05-27", patternDay: 9, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2030-06-16", patternDay: 5, abbrev: "DAD" },
                { name: "Independence Day", date: "2030-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2030-09-02", patternDay: 11, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2030-11-28", patternDay: 2, abbrev: "THX" },
                { name: "Christmas", date: "2030-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2031-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2031-02-09", patternDay: 3, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2031-03-17", patternDay: 3, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: false
        },
        "2031-2032": {
            holidays: [
                { name: "Easter", date: "2031-04-13", patternDay: 1, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2031-05-11", patternDay: 5, abbrev: "MOM" },
                { name: "Memorial Day", date: "2031-05-26", patternDay: 8, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2031-06-15", patternDay: 4, abbrev: "DAD" },
                { name: "Independence Day", date: "2031-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2031-09-01", patternDay: 10, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2031-11-27", patternDay: 1, abbrev: "THX" },
                { name: "Christmas", date: "2031-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2032-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2032-02-08", patternDay: 2, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2032-03-17", patternDay: 4, abbrev: "STPAT" },
                { name: "Easter (2nd)", date: "2032-03-28", patternDay: 3, abbrev: "EAST2" }
            ],
            twoEasters: true, noEaster: false
        },
        "2032-2033": {
            holidays: [
                { name: "Mother's Day", date: "2032-05-09", patternDay: 3, abbrev: "MOM" },
                { name: "Memorial Day", date: "2032-05-31", patternDay: 1, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2032-06-20", patternDay: 9, abbrev: "DAD" },
                { name: "Independence Day", date: "2032-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2032-09-06", patternDay: 3, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2032-11-25", patternDay: 11, abbrev: "THX" },
                { name: "Christmas", date: "2032-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2033-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2033-02-13", patternDay: 7, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2033-03-17", patternDay: 3, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: true
        },
        "2033-2034": {
            holidays: [
                { name: "Easter", date: "2033-04-17", patternDay: 5, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2033-05-08", patternDay: 2, abbrev: "MOM" },
                { name: "Memorial Day", date: "2033-05-30", patternDay: 12, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2033-06-19", patternDay: 8, abbrev: "DAD" },
                { name: "Independence Day", date: "2033-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2033-09-05", patternDay: 2, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2033-11-24", patternDay: 10, abbrev: "THX" },
                { name: "Christmas", date: "2033-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2034-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2034-02-12", patternDay: 6, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2034-03-17", patternDay: 3, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: false
        },
        "2034-2035": {
            holidays: [
                { name: "Easter", date: "2034-04-09", patternDay: 9, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2034-05-14", patternDay: 8, abbrev: "MOM" },
                { name: "Memorial Day", date: "2034-05-29", patternDay: 11, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2034-06-18", patternDay: 7, abbrev: "DAD" },
                { name: "Independence Day", date: "2034-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2034-09-04", patternDay: 1, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2034-11-23", patternDay: 9, abbrev: "THX" },
                { name: "Christmas", date: "2034-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2035-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2035-02-11", patternDay: 5, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2035-03-17", patternDay: 3, abbrev: "STPAT" },
                { name: "Easter (2nd)", date: "2035-03-25", patternDay: 11, abbrev: "EAST2" }
            ],
            twoEasters: true, noEaster: false
        },
        "2035-2036": {
            holidays: [
                { name: "Mother's Day", date: "2035-05-13", patternDay: 7, abbrev: "MOM" },
                { name: "Memorial Day", date: "2035-05-28", patternDay: 10, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2035-06-17", patternDay: 6, abbrev: "DAD" },
                { name: "Independence Day", date: "2035-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2035-09-03", patternDay: 12, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2035-11-22", patternDay: 8, abbrev: "THX" },
                { name: "Christmas", date: "2035-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2036-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2036-02-10", patternDay: 4, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2036-03-17", patternDay: 4, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: true
        },
        "2036-2037": {
            holidays: [
                { name: "Easter", date: "2036-04-13", patternDay: 1, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2036-05-11", patternDay: 5, abbrev: "MOM" },
                { name: "Memorial Day", date: "2036-05-26", patternDay: 8, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2036-06-15", patternDay: 4, abbrev: "DAD" },
                { name: "Independence Day", date: "2036-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2036-09-01", patternDay: 10, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2036-11-27", patternDay: 1, abbrev: "THX" },
                { name: "Christmas", date: "2036-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2037-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2037-02-08", patternDay: 2, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2037-03-17", patternDay: 3, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: false
        },
        "2037-2038": {
            holidays: [
                { name: "Easter", date: "2037-04-05", patternDay: 5, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2037-05-10", patternDay: 4, abbrev: "MOM" },
                { name: "Memorial Day", date: "2037-05-25", patternDay: 7, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2037-06-21", patternDay: 10, abbrev: "DAD" },
                { name: "Independence Day", date: "2037-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2037-09-07", patternDay: 4, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2037-11-26", patternDay: 12, abbrev: "THX" },
                { name: "Christmas", date: "2037-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2038-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2038-02-14", patternDay: 8, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2038-03-17", patternDay: 3, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: false
        },
        "2038-2039": {
            holidays: [
                { name: "Easter", date: "2038-04-25", patternDay: 1, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2038-05-09", patternDay: 3, abbrev: "MOM" },
                { name: "Memorial Day", date: "2038-05-31", patternDay: 1, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2038-06-20", patternDay: 9, abbrev: "DAD" },
                { name: "Independence Day", date: "2038-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2038-09-06", patternDay: 3, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2038-11-25", patternDay: 11, abbrev: "THX" },
                { name: "Christmas", date: "2038-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2039-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2039-02-13", patternDay: 7, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2039-03-17", patternDay: 3, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: false
        },
        "2039-2040": {
            holidays: [
                { name: "Easter", date: "2039-04-10", patternDay: 10, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2039-05-08", patternDay: 2, abbrev: "MOM" },
                { name: "Memorial Day", date: "2039-05-30", patternDay: 12, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2039-06-19", patternDay: 8, abbrev: "DAD" },
                { name: "Independence Day", date: "2039-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2039-09-05", patternDay: 2, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2039-11-24", patternDay: 10, abbrev: "THX" },
                { name: "Christmas", date: "2039-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2040-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2040-02-12", patternDay: 6, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2040-03-17", patternDay: 4, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: false
        },
        "2040-2041": {
            holidays: [
                { name: "Easter", date: "2040-04-01", patternDay: 1, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2040-05-13", patternDay: 7, abbrev: "MOM" },
                { name: "Memorial Day", date: "2040-05-28", patternDay: 10, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2040-06-17", patternDay: 6, abbrev: "DAD" },
                { name: "Independence Day", date: "2040-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2040-09-03", patternDay: 12, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2040-11-22", patternDay: 8, abbrev: "THX" },
                { name: "Christmas", date: "2040-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2041-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2041-02-10", patternDay: 4, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2041-03-17", patternDay: 3, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: false
        },
        "2041-2042": {
            holidays: [
                { name: "Easter", date: "2041-04-21", patternDay: 9, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2041-05-12", patternDay: 6, abbrev: "MOM" },
                { name: "Memorial Day", date: "2041-05-27", patternDay: 9, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2041-06-16", patternDay: 5, abbrev: "DAD" },
                { name: "Independence Day", date: "2041-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2041-09-02", patternDay: 11, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2041-11-28", patternDay: 2, abbrev: "THX" },
                { name: "Christmas", date: "2041-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2042-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2042-02-09", patternDay: 3, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2042-03-17", patternDay: 3, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: false
        },
        "2042-2043": {
            holidays: [
                { name: "Easter", date: "2042-04-06", patternDay: 6, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2042-05-11", patternDay: 5, abbrev: "MOM" },
                { name: "Memorial Day", date: "2042-05-26", patternDay: 8, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2042-06-15", patternDay: 4, abbrev: "DAD" },
                { name: "Independence Day", date: "2042-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2042-09-01", patternDay: 10, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2042-11-27", patternDay: 1, abbrev: "THX" },
                { name: "Christmas", date: "2042-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2043-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2043-02-08", patternDay: 2, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2043-03-17", patternDay: 3, abbrev: "STPAT" },
                { name: "Easter (2nd)", date: "2043-03-29", patternDay: 3, abbrev: "EAST2" }
            ],
            twoEasters: true, noEaster: false
        },
        "2043-2044": {
            holidays: [
                { name: "Mother's Day", date: "2043-05-10", patternDay: 4, abbrev: "MOM" },
                { name: "Memorial Day", date: "2043-05-25", patternDay: 7, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2043-06-21", patternDay: 10, abbrev: "DAD" },
                { name: "Independence Day", date: "2043-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2043-09-07", patternDay: 4, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2043-11-26", patternDay: 12, abbrev: "THX" },
                { name: "Christmas", date: "2043-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2044-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2044-02-14", patternDay: 8, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2044-03-17", patternDay: 4, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: true
        },
        "2044-2045": {
            holidays: [
                { name: "Easter", date: "2044-04-17", patternDay: 5, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2044-05-08", patternDay: 2, abbrev: "MOM" },
                { name: "Memorial Day", date: "2044-05-30", patternDay: 12, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2044-06-19", patternDay: 8, abbrev: "DAD" },
                { name: "Independence Day", date: "2044-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2044-09-05", patternDay: 2, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2044-11-24", patternDay: 10, abbrev: "THX" },
                { name: "Christmas", date: "2044-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2045-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2045-02-12", patternDay: 6, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2045-03-17", patternDay: 3, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: false
        },
        "2045-2046": {
            holidays: [
                { name: "Easter", date: "2045-04-09", patternDay: 9, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2045-05-14", patternDay: 8, abbrev: "MOM" },
                { name: "Memorial Day", date: "2045-05-29", patternDay: 11, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2045-06-18", patternDay: 7, abbrev: "DAD" },
                { name: "Independence Day", date: "2045-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2045-09-04", patternDay: 1, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2045-11-23", patternDay: 9, abbrev: "THX" },
                { name: "Christmas", date: "2045-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2046-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2046-02-11", patternDay: 5, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2046-03-17", patternDay: 3, abbrev: "STPAT" },
                { name: "Easter (2nd)", date: "2046-03-25", patternDay: 11, abbrev: "EAST2" }
            ],
            twoEasters: true, noEaster: false
        },
        "2046-2047": {
            holidays: [
                { name: "Mother's Day", date: "2046-05-13", patternDay: 7, abbrev: "MOM" },
                { name: "Memorial Day", date: "2046-05-28", patternDay: 10, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2046-06-17", patternDay: 6, abbrev: "DAD" },
                { name: "Independence Day", date: "2046-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2046-09-03", patternDay: 12, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2046-11-22", patternDay: 8, abbrev: "THX" },
                { name: "Christmas", date: "2046-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2047-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2047-02-10", patternDay: 4, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2047-03-17", patternDay: 3, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: true
        },
        "2047-2048": {
            holidays: [
                { name: "Easter", date: "2047-04-14", patternDay: 2, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2047-05-12", patternDay: 6, abbrev: "MOM" },
                { name: "Memorial Day", date: "2047-05-27", patternDay: 9, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2047-06-16", patternDay: 5, abbrev: "DAD" },
                { name: "Independence Day", date: "2047-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2047-09-02", patternDay: 11, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2047-11-28", patternDay: 2, abbrev: "THX" },
                { name: "Christmas", date: "2047-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2048-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2048-02-09", patternDay: 3, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2048-03-17", patternDay: 4, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: false
        },
        "2048-2049": {
            holidays: [
                { name: "Easter", date: "2048-04-05", patternDay: 5, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2048-05-10", patternDay: 4, abbrev: "MOM" },
                { name: "Memorial Day", date: "2048-05-25", patternDay: 7, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2048-06-21", patternDay: 10, abbrev: "DAD" },
                { name: "Independence Day", date: "2048-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2048-09-07", patternDay: 4, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2048-11-26", patternDay: 12, abbrev: "THX" },
                { name: "Christmas", date: "2048-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2049-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2049-02-14", patternDay: 8, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2049-03-17", patternDay: 3, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: false
        },
        "2049-2050": {
            holidays: [
                { name: "Easter", date: "2049-04-18", patternDay: 6, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2049-05-09", patternDay: 3, abbrev: "MOM" },
                { name: "Memorial Day", date: "2049-05-31", patternDay: 1, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2049-06-20", patternDay: 9, abbrev: "DAD" },
                { name: "Independence Day", date: "2049-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2049-09-06", patternDay: 3, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2049-11-25", patternDay: 11, abbrev: "THX" },
                { name: "Christmas", date: "2049-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2050-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2050-02-13", patternDay: 7, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2050-03-17", patternDay: 3, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: false
        },
        "2050-2051": {
            holidays: [
                { name: "Easter", date: "2050-04-10", patternDay: 10, abbrev: "EAST1" },
                { name: "Mother's Day", date: "2050-05-08", patternDay: 2, abbrev: "MOM" },
                { name: "Memorial Day", date: "2050-05-30", patternDay: 12, abbrev: "MEMOR" },
                { name: "Father's Day", date: "2050-06-19", patternDay: 8, abbrev: "DAD" },
                { name: "Independence Day", date: "2050-07-04", patternDay: 11, abbrev: "4TH" },
                { name: "Labor Day", date: "2050-09-05", patternDay: 2, abbrev: "LABOR" },
                { name: "Thanksgiving", date: "2050-11-24", patternDay: 10, abbrev: "THX" },
                { name: "Christmas", date: "2050-12-25", patternDay: 5, abbrev: "XMAS" },
                { name: "New Year's Day", date: "2051-01-01", patternDay: 12, abbrev: "NYD" },
                { name: "Super Bowl", date: "2051-02-12", patternDay: 6, abbrev: "SUPER" },
                { name: "St. Patrick's Day", date: "2051-03-17", patternDay: 3, abbrev: "STPAT" }
            ],
            twoEasters: false, noEaster: false
        }
    };
    
    // Setup data storage
    let setupData = {
        bidYear: null,
        holidays: [],
        superBowlDate: null,
        bidStartDate: null,
        bidStartTime: '05:00',
        bidInterval: 10,
        ssomList: [],
        somList: [],
        linePatterns: []
    };
    
    function showNextYearSetup() {
        document.getElementById('nextYearSetupModal').classList.add('show');
        populateBidYearDropdown();
    }
    
    function hideNextYearSetup() {
        document.getElementById('nextYearSetupModal').classList.remove('show');
    }
    
    function populateBidYearDropdown() {
        const select = document.getElementById('setupBidYear');
        select.innerHTML = '<option value="">-- Select Bid Year --</option>';
        
        Object.keys(ALL_HOLIDAYS_DATA).sort().forEach(year => {
            const data = ALL_HOLIDAYS_DATA[year];
            let label = year;
            if (data.twoEasters) label += ' ✨ (Two Easters!)';
            if (data.noEaster) label += ' ❌ (No Easter)';
            
            const option = document.createElement('option');
            option.value = year;
            option.textContent = label;
            select.appendChild(option);
        });
    }
    
    function loadHolidaysForYear() {
        const bidYear = document.getElementById('setupBidYear').value;
        if (!bidYear || !ALL_HOLIDAYS_DATA[bidYear]) {
            document.getElementById('bidYearInfo').textContent = '';
            document.getElementById('holidaysPreviewSection').style.display = 'none';
            return;
        }
        
        const data = ALL_HOLIDAYS_DATA[bidYear];
        setupData.bidYear = bidYear;
        setupData.holidays = data.holidays;
        
        // Update info text
        let info = `${data.holidays.length} holidays`;
        if (data.twoEasters) info += ' • ✨ Two Easters this year!';
        if (data.noEaster) info += ' • ❌ No Easter this year';
        document.getElementById('bidYearInfo').innerHTML = `<span style="color:#4ecca3;">${info}</span>`;
        
        // Find and set Super Bowl date
        const superBowl = data.holidays.find(h => h.abbrev === 'SUPER');
        if (superBowl) {
            document.getElementById('setupSuperBowlDate').value = superBowl.date;
            setupData.superBowlDate = superBowl.date;
            updateSuperBowlDayOfWeek();
        }
        
        // Show holidays preview
        displayHolidaysPreview(data);
    }
    
    function updateSuperBowlDayOfWeek() {
        const dateInput = document.getElementById('setupSuperBowlDate').value;
        if (!dateInput) {
            document.getElementById('superBowlDayOfWeek').textContent = '';
            return;
        }
        
        const date = new Date(dateInput + 'T12:00:00');
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = days[date.getDay()];
        
        const isCorrect = dayName === 'Sunday';
        document.getElementById('superBowlDayOfWeek').innerHTML = isCorrect 
            ? `<span style="color:#4ecca3;">✓ ${dayName}</span>`
            : `<span style="color:#e94560;">⚠️ ${dayName} - Super Bowl should be Sunday!</span>`;
    }
    
    // Add event listener for Super Bowl date change
    document.getElementById('setupSuperBowlDate')?.addEventListener('change', updateSuperBowlDayOfWeek);
    
    function displayHolidaysPreview(data) {
        const container = document.getElementById('holidaysPreviewContent');
        let html = '<table style="width:100%; font-size:11px; border-collapse:collapse;">';
        html += '<tr style="color:#4ecca3; border-bottom:1px solid #4ecca3;"><th style="padding:5px; text-align:left;">Holiday</th><th style="padding:5px;">Date</th><th style="padding:5px;">Pattern Day</th><th style="padding:5px;">Abbrev</th></tr>';
        
        data.holidays.forEach(h => {
            const date = new Date(h.date + 'T12:00:00');
            const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
            const isSuperBowl = h.abbrev === 'SUPER';
            const rowStyle = isSuperBowl ? 'background:#f0a50033;' : '';
            
            html += `<tr style="${rowStyle}">
                <td style="padding:5px; color:#fff;">${h.name}${isSuperBowl ? ' 🏈' : ''}</td>
                <td style="padding:5px; color:#888; text-align:center;">${dateStr}</td>
                <td style="padding:5px; color:#4ecca3; text-align:center; font-weight:bold;">${h.patternDay}</td>
                <td style="padding:5px; color:#f0a500; text-align:center;">${h.abbrev}</td>
            </tr>`;
        });
        
        html += '</table>';
        container.innerHTML = html;
        document.getElementById('holidaysPreviewSection').style.display = 'block';
    }
    
    function parseSSOMList() {
        const text = document.getElementById('setupSSOMList').value.trim();
        if (!text) {
            document.getElementById('ssomParseStatus').innerHTML = '<span style="color:#e94560;">Please paste SSOM list</span>';
            return;
        }
        
        const lines = text.split('\n').filter(l => l.trim());
        const parsed = [];
        
        lines.forEach((line, index) => {
            const parts = line.split('\t');
            if (parts.length >= 2) {
                const name = parts[1] ? parts[1].trim() : parts[0].trim();
                parsed.push({ nbr: index + 1, name: name });
            } else if (parts[0].trim()) {
                parsed.push({ nbr: index + 1, name: parts[0].trim() });
            }
        });
        
        if (parsed.length > 0) {
            setupData.ssomList = parsed;
            document.getElementById('ssomParseStatus').innerHTML = `<span style="color:#4ecca3;">✓ Parsed ${parsed.length} SSOM bidders</span>`;
        } else {
            document.getElementById('ssomParseStatus').innerHTML = '<span style="color:#e94560;">Could not parse - check format</span>';
        }
    }
    
    function parseSOMList() {
        const text = document.getElementById('setupSOMList').value.trim();
        if (!text) {
            document.getElementById('somParseStatus').innerHTML = '<span style="color:#e94560;">Please paste SOM list</span>';
            return;
        }
        
        const lines = text.split('\n').filter(l => l.trim());
        const parsed = [];
        
        lines.forEach((line, index) => {
            const parts = line.split('\t');
            if (parts.length >= 2) {
                const name = parts[1] ? parts[1].trim() : parts[0].trim();
                parsed.push({ nbr: index + 1, name: name });
            } else if (parts[0].trim()) {
                parsed.push({ nbr: index + 1, name: parts[0].trim() });
            }
        });
        
        if (parsed.length > 0) {
            setupData.somList = parsed;
            document.getElementById('somParseStatus').innerHTML = `<span style="color:#4ecca3;">✓ Parsed ${parsed.length} SOM bidders</span>`;
        } else {
            document.getElementById('somParseStatus').innerHTML = '<span style="color:#e94560;">Could not parse - check format</span>';
        }
    }
    
    function parseLinePatterns() {
        const text = document.getElementById('setupLinePatterns').value.trim();
        if (!text) {
            document.getElementById('linePatternsParseStatus').innerHTML = '<span style="color:#e94560;">Please paste line patterns</span>';
            return;
        }
        
        const lines = text.split('\n').filter(l => l.trim());
        const parsed = [];
        
        lines.forEach(line => {
            const parts = line.split('\t');
            if (parts.length >= 14) {
                const lineNbr = parts[0].trim();
                const lineDesc = parts[1].trim();
                const days = parts.slice(2, 14).map(d => d.trim() || '--');
                const colorCode = parseInt(parts[14]) || 8;
                
                // Generate day codes based on shift values
                const dayCodes = days.map(d => d === '--' ? 8 : 1);
                
                parsed.push({
                    lineNbr: lineNbr,
                    lineDesc: lineDesc,
                    days: days,
                    dayCodes: dayCodes,
                    lineColorCode: colorCode
                });
            }
        });
        
        if (parsed.length > 0) {
            setupData.linePatterns = parsed;
            document.getElementById('linePatternsParseStatus').innerHTML = `<span style="color:#4ecca3;">✓ Parsed ${parsed.length} lines</span>`;
        } else {
            document.getElementById('linePatternsParseStatus').innerHTML = '<span style="color:#e94560;">Could not parse - check format (need 15 columns)</span>';
        }
    }
    
    function generateNextYearPreview() {
        // Validate all inputs
        const errors = [];
        
        if (!setupData.bidYear) errors.push('Select a bid year');
        if (!document.getElementById('setupBidStartDate').value) errors.push('Enter bid start date');
        if (setupData.ssomList.length === 0) errors.push('Parse SSOM seniority list');
        if (setupData.somList.length === 0) errors.push('Parse SOM seniority list');
        if (setupData.linePatterns.length === 0) errors.push('Parse line patterns');
        
        if (errors.length > 0) {
            document.getElementById('setupPreviewContent').innerHTML = `<div style="color:#e94560;"><strong>Missing required data:</strong><ul>${errors.map(e => '<li>' + e + '</li>').join('')}</ul></div>`;
            document.getElementById('setupPreviewArea').style.display = 'block';
            return;
        }
        
        // Store bid schedule settings
        setupData.bidStartDate = document.getElementById('setupBidStartDate').value;
        setupData.bidStartTime = document.getElementById('setupBidStartTime').value;
        setupData.bidInterval = parseInt(document.getElementById('setupBidInterval').value) || 10;
        setupData.superBowlDate = document.getElementById('setupSuperBowlDate').value;
        
        // Generate preview
        let html = '<div style="color:#4ecca3; margin-bottom:15px;"><strong>✓ All data validated successfully!</strong></div>';
        
        html += '<table style="width:100%; font-size:12px; border-collapse:collapse;">';
        html += '<tr><td style="padding:5px; color:#888;">Bid Year:</td><td style="padding:5px; color:#fff; font-weight:bold;">' + setupData.bidYear + '</td></tr>';
        html += '<tr><td style="padding:5px; color:#888;">Holidays:</td><td style="padding:5px; color:#fff;">' + setupData.holidays.length + ' holidays configured</td></tr>';
        html += '<tr><td style="padding:5px; color:#888;">Bid Start:</td><td style="padding:5px; color:#fff;">' + setupData.bidStartDate + ' at ' + setupData.bidStartTime + '</td></tr>';
        html += '<tr><td style="padding:5px; color:#888;">Interval:</td><td style="padding:5px; color:#fff;">' + setupData.bidInterval + ' minutes</td></tr>';
        html += '<tr><td style="padding:5px; color:#888;">SSOM Bidders:</td><td style="padding:5px; color:#fff;">' + setupData.ssomList.length + '</td></tr>';
        html += '<tr><td style="padding:5px; color:#888;">SOM Bidders:</td><td style="padding:5px; color:#fff;">' + setupData.somList.length + '</td></tr>';
        html += '<tr><td style="padding:5px; color:#888;">Total Bidders:</td><td style="padding:5px; color:#4ecca3; font-weight:bold;">' + (setupData.ssomList.length + setupData.somList.length) + '</td></tr>';
        html += '<tr><td style="padding:5px; color:#888;">Line Patterns:</td><td style="padding:5px; color:#fff;">' + setupData.linePatterns.length + ' lines</td></tr>';
        html += '</table>';
        
        html += '<div style="margin-top:15px; padding:10px; background:#4ecca333; border-radius:5px;">';
        html += '<strong style="color:#4ecca3;">Files that will be generated:</strong>';
        html += '<ul style="margin:10px 0 0 20px; color:#ccc;">';
        html += '<li>bidding_final.js (with new GROUP1, GROUP2, HOLIDAYS)</li>';
        html += '<li>annual_bid_data.js (line patterns)</li>';
        html += '<li>bid_times.html (bid schedule)</li>';
        html += '</ul>';
        html += '</div>';
        
        document.getElementById('setupPreviewContent').innerHTML = html;
        document.getElementById('setupPreviewArea').style.display = 'block';
        document.getElementById('downloadFilesBtn').disabled = false;
        document.getElementById('downloadFilesBtn').style.background = '#4ecca3';
        document.getElementById('downloadFilesBtn').style.color = '#1a1a2e';
    }
    
    function downloadGeneratedFiles() {
        if (!setupData.bidYear) {
            alert('Please generate preview first');
            return;
        }
        
        // Generate and download each file
        generateAndDownloadBiddingFinalJS();
        setTimeout(() => generateAndDownloadAnnualBidDataJS(), 500);
        setTimeout(() => generateAndDownloadBidTimesHTML(), 1000);
        
        showNotificationBanner('✓ Files downloaded! Check your Downloads folder.');
    }
    
    function generateAndDownloadBiddingFinalJS() {
        const years = setupData.bidYear.split('-');
        const startYear = parseInt(years[0]);
        const endYear = parseInt(years[1]);
        
        // Generate HOLIDAYS object
        let holidaysCode = '    const HOLIDAYS = {\n';
        setupData.holidays.forEach(h => {
            const dateParts = h.date.split('-');
            const dateKey = `'${dateParts[0]}-${parseInt(dateParts[1])}-${parseInt(dateParts[2])}'`;
            holidaysCode += `        ${dateKey}: '${h.abbrev}',\n`;
        });
        holidaysCode = holidaysCode.slice(0, -2) + '\n    };\n';
        
        // Generate GROUP1 and GROUP2
        const group1Code = '    const GROUP1 = ' + JSON.stringify(setupData.ssomList) + ';\n';
        const group2Code = '    const GROUP2 = ' + JSON.stringify(setupData.somList) + ';\n';
        
        // Create instructions file content
        let content = `// ============================================
// GENERATED CONFIGURATION FOR BID YEAR ${setupData.bidYear}
// Generated: ${new Date().toISOString()}
// ============================================

// INSTRUCTIONS:
// 1. Open your current bidding_final.js file
// 2. Find and replace the HOLIDAYS object (around line 20-40)
// 3. Find and replace GROUP1 and GROUP2 arrays (around line 43-44)
// 4. Update year references throughout the file (search for ${startYear - 1} and ${startYear})

// ============================================
// NEW HOLIDAYS OBJECT - Replace existing HOLIDAYS
// ============================================
${holidaysCode}

// ============================================
// NEW SENIORITY LISTS - Replace existing GROUP1 and GROUP2
// ============================================
${group1Code}
${group2Code}

// ============================================
// HOLIDAY_PATTERN_MAP - Update this section too
// ============================================
    const HOLIDAY_PATTERN_MAP = {
`;
        
        setupData.holidays.forEach(h => {
            const date = new Date(h.date + 'T12:00:00');
            const fullDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            content += `        '${h.abbrev}': { day: ${h.patternDay}, date: '${h.date.replace(/-/g, '-')}', name: '${h.name}', fullDate: '${fullDate}' },\n`;
        });
        
        content += '    };\n';
        
        downloadFile(content, `bidding_config_${setupData.bidYear}.js`, 'text/javascript');
    }
    
    function generateAndDownloadAnnualBidDataJS() {
        let content = `// Annual Bid Data - 12-day patterns for all ${setupData.linePatterns.length} lines
// Generated for bid year ${setupData.bidYear}
const ANNUAL_BID = ${JSON.stringify(setupData.linePatterns, null, 2)};
`;
        
        downloadFile(content, `annual_bid_data_${setupData.bidYear}.js`, 'text/javascript');
    }
    
    function generateAndDownloadBidTimesHTML() {
        const years = setupData.bidYear.split('-');
        const allBidders = [
            ...setupData.ssomList.map(b => ({ ...b, group: 'SSOM' })),
            ...setupData.somList.map(b => ({ ...b, group: 'SOM' }))
        ];
        
        // Calculate bid times
        const startDate = new Date(setupData.bidStartDate + 'T' + setupData.bidStartTime);
        const interval = setupData.bidInterval;
        
        let content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${setupData.bidYear} Bid Times</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; }
        .container { max-width: 900px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { font-size: 2.5em; margin-bottom: 10px; }
        .content { padding: 20px; }
        .group-header { background: #667eea; color: white; padding: 15px; font-size: 1.2em; font-weight: bold; margin-top: 20px; border-radius: 8px 8px 0 0; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th { background: #f8f9fa; padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6; }
        td { padding: 10px 12px; border-bottom: 1px solid #dee2e6; }
        tr:hover { background: #f8f9fa; }
        .rank { font-weight: bold; color: #667eea; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${setupData.bidYear} Bid Schedule</h1>
            <p>Starting ${startDate.toLocaleDateString()} at ${setupData.bidStartTime}</p>
        </div>
        <div class="content">
`;
        
        // SSOM Section
        content += `            <div class="group-header">SSOM (${setupData.ssomList.length})</div>
            <table>
                <thead><tr><th>Rank</th><th>Name</th><th>Date</th><th>Time</th></tr></thead>
                <tbody>
`;
        
        let currentTime = new Date(startDate);
        setupData.ssomList.forEach(bidder => {
            const dateStr = currentTime.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' }).replace(',', '');
            const timeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            content += `                    <tr><td class="rank">${bidder.nbr}</td><td>${bidder.name}</td><td>${dateStr}</td><td>${timeStr}</td></tr>\n`;
            currentTime = new Date(currentTime.getTime() + interval * 60000);
        });
        
        content += `                </tbody>
            </table>
`;
        
        // SOM Section
        content += `            <div class="group-header">SOM (${setupData.somList.length})</div>
            <table>
                <thead><tr><th>Rank</th><th>Name</th><th>Date</th><th>Time</th></tr></thead>
                <tbody>
`;
        
        setupData.somList.forEach(bidder => {
            const dateStr = currentTime.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' }).replace(',', '');
            const timeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            content += `                    <tr><td class="rank">${bidder.nbr}</td><td>${bidder.name}</td><td>${dateStr}</td><td>${timeStr}</td></tr>\n`;
            currentTime = new Date(currentTime.getTime() + interval * 60000);
        });
        
        content += `                </tbody>
            </table>
        </div>
    </div>
</body>
</html>`;
        
        downloadFile(content, `bid_times_${setupData.bidYear}.html`, 'text/html');
    }
    
    function downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    function confirmClearFirebase() {
        const confirmMsg = '⚠️ DANGER! This will permanently delete:\n\n' +
            '• All bid assignments\n' +
            '• All bid history\n' +
            '• All rollback data\n' +
            '• All confirmations\n\n' +
            'This cannot be undone!\n\n' +
            'Type "DELETE" to confirm:';
        
        const input = prompt(confirmMsg);
        if (input === 'DELETE') {
            clearFirebaseData();
        } else if (input !== null) {
            alert('Cancelled - you must type "DELETE" exactly to confirm.');
        }
    }
    
    async function clearFirebaseData() {
        try {
            await fetch(`${FIREBASE_URL}/bid.json`, {
                method: 'DELETE'
            });
            
            // Clear local data too
            assignments = {};
            confirmations = {};
            bidHistory = {};
            rollbackStack = [];
            
            localStorage.removeItem('polish_bid_assignments_v4');
            localStorage.removeItem('polish_bid_history_backup');
            localStorage.removeItem('polishBidAuditLog');
            
            alert('✓ Firebase data cleared successfully!\n\nThe database is now empty and ready for a new bid year.');
            renderAll();
            
        } catch (err) {
            console.error('Failed to clear Firebase:', err);
            alert('Error clearing Firebase data: ' + err.message);
        }
    }

    // ===========================================
    // ESCALATION MANAGER FUNCTIONS
    // ===========================================
    
    let escalationData = {
        active: false,
        deadlineDate: null,
        deadlineTime: null,
        message: '',
        ssomVacant: [],
        somVacant: [],
        ssomGroup: false,
        somGroup: false,
        newSSOMList: [],
        newSOMList: [],
        newLines: [],
        results: []
    };
    
    // Track vacant lines separately (they show as VACANT but line still exists)
    let vacantLines = {
        ssom: [],  // Line numbers that are vacant
        som: []
    };
    
    function showEscalationManager() {
        document.getElementById('escalationModal').classList.add('show');
        loadEscalationStatus();
    }
    
    function hideEscalationManager() {
        document.getElementById('escalationModal').classList.remove('show');
    }
    
    function loadEscalationStatus() {
        // Load escalation state from Firebase if it exists
        fetch(`${FIREBASE_URL}/escalation.json`)
            .then(response => response.json())
            .then(data => {
                if (data && data.active) {
                    escalationData = { ...escalationData, ...data };
                    vacantLines = data.vacantLines || { ssom: [], som: [] };
                    updateEscalationStatusDisplay();
                    showEscalationBanner();
                } else {
                    updateEscalationStatusDisplay();
                }
            })
            .catch(err => {
                console.error('Error loading escalation status:', err);
            });
    }
    
    function updateEscalationStatusDisplay() {
        const statusDiv = document.getElementById('escalationCurrentStatus');
        
        if (escalationData.active) {
            let html = `<div style="color:#f39c12; font-weight:bold; margin-bottom:10px;">⚠️ ESCALATION IS ACTIVE</div>`;
            html += `<div style="color:#fff;">Deadline: ${escalationData.deadlineDate} at ${escalationData.deadlineTime}</div>`;
            
            if (vacantLines.ssom.length > 0) {
                html += `<div style="color:#888; margin-top:5px;">SSOM Vacant Lines: <span style="color:#e94560;">${vacantLines.ssom.join(', ')}</span></div>`;
            }
            if (vacantLines.som.length > 0) {
                html += `<div style="color:#888; margin-top:5px;">SOM Vacant Lines: <span style="color:#e94560;">${vacantLines.som.join(', ')}</span></div>`;
            }
            
            statusDiv.innerHTML = html;
        } else {
            statusDiv.innerHTML = '<span style="color:#4ecca3;">No active escalation</span>';
        }
    }
    
    function showEscalationBanner() {
        if (!escalationData.active) return;
        
        const banner = document.getElementById('escalationBanner');
        const details = document.getElementById('escalationBannerDetails');
        
        let vacantText = [];
        if (vacantLines.ssom.length > 0) {
            vacantText.push(`SSOM Lines: ${vacantLines.ssom.join(', ')}`);
        }
        if (vacantLines.som.length > 0) {
            vacantText.push(`SOM Lines: ${vacantLines.som.join(', ')}`);
        }
        
        let detailsHtml = `<div>Vacant: ${vacantText.join(' | ')}</div>`;
        detailsHtml += `<div style="margin-top:5px;">Deadline: ${escalationData.deadlineDate} at ${escalationData.deadlineTime}</div>`;
        if (escalationData.message) {
            detailsHtml += `<div style="margin-top:5px; font-style:italic;">${escalationData.message}</div>`;
        }
        
        details.innerHTML = detailsHtml;
        banner.style.display = 'block';
    }
    
    function hideEscalationBanner() {
        document.getElementById('escalationBanner').style.display = 'none';
    }
    
    function previewVacancies() {
        const ssomInput = document.getElementById('escalationVacantSSOM').value.trim();
        const somInput = document.getElementById('escalationVacantSOM').value.trim();
        
        const ssomLines = ssomInput ? ssomInput.split(',').map(l => l.trim()).filter(l => l) : [];
        const somLines = somInput ? somInput.split(',').map(l => l.trim()).filter(l => l) : [];
        
        if (ssomLines.length === 0 && somLines.length === 0) {
            alert('Please enter at least one vacant line number.');
            return;
        }
        
        let html = '<div style="color:#4ecca3; font-weight:bold; margin-bottom:10px;">Preview of Vacancies:</div>';
        
        if (ssomLines.length > 0) {
            html += '<div style="margin-bottom:10px;"><strong style="color:#e94560;">SSOM:</strong>';
            ssomLines.forEach(lineNum => {
                // Find who currently has this line
                let currentHolder = 'Unknown';
                for (let key in assignments) {
                    if (key.startsWith('g1-') && assignments[key] === lineNum) {
                        const nbr = parseInt(key.split('-')[1]);
                        const person = GROUP1.find(p => p.nbr === nbr);
                        if (person) currentHolder = person.name;
                        break;
                    }
                }
                html += `<div style="margin-left:15px; color:#ccc;">Line ${lineNum}: Currently held by <span style="color:#f39c12;">${currentHolder}</span> → Will be VACANT</div>`;
            });
            html += '</div>';
        }
        
        if (somLines.length > 0) {
            html += '<div><strong style="color:#e94560;">SOM:</strong>';
            somLines.forEach(lineNum => {
                let currentHolder = 'Unknown';
                for (let key in assignments) {
                    if (key.startsWith('g2-') && assignments[key] === lineNum) {
                        const nbr = parseInt(key.split('-')[1]);
                        const person = GROUP2.find(p => p.nbr === nbr);
                        if (person) currentHolder = person.name;
                        break;
                    }
                }
                html += `<div style="margin-left:15px; color:#ccc;">Line ${lineNum}: Currently held by <span style="color:#f39c12;">${currentHolder}</span> → Will be VACANT</div>`;
            });
            html += '</div>';
        }
        
        document.getElementById('vacancyPreview').innerHTML = html;
        document.getElementById('vacancyPreview').style.display = 'block';
    }
    
    function activateEscalation() {
        const deadlineDate = document.getElementById('escalationDeadlineDate').value;
        const deadlineTime = document.getElementById('escalationDeadlineTime').value;
        const message = document.getElementById('escalationMessage').value.trim();
        const ssomGroup = document.getElementById('escalationSSOM').checked;
        const somGroup = document.getElementById('escalationSOM').checked;
        
        const ssomInput = document.getElementById('escalationVacantSSOM').value.trim();
        const somInput = document.getElementById('escalationVacantSOM').value.trim();
        
        const ssomLines = ssomInput ? ssomInput.split(',').map(l => l.trim()).filter(l => l) : [];
        const somLines = somInput ? somInput.split(',').map(l => l.trim()).filter(l => l) : [];
        
        // Validation
        if (!deadlineDate) {
            alert('Please enter a deadline date.');
            return;
        }
        if (!ssomGroup && !somGroup) {
            alert('Please select at least one group (SSOM or SOM).');
            return;
        }
        if (ssomLines.length === 0 && somLines.length === 0) {
            alert('Please enter at least one vacant line number.');
            return;
        }
        
        const confirmMsg = `Activate Escalation?\n\n` +
            `Deadline: ${deadlineDate} at ${deadlineTime}\n` +
            `SSOM Vacant Lines: ${ssomLines.length > 0 ? ssomLines.join(', ') : 'None'}\n` +
            `SOM Vacant Lines: ${somLines.length > 0 ? somLines.join(', ') : 'None'}\n\n` +
            `This will show a banner to ALL users.`;
        
        if (!confirm(confirmMsg)) return;
        
        // Mark lines as vacant (remove assignment but keep line available)
        ssomLines.forEach(lineNum => {
            for (let key in assignments) {
                if (key.startsWith('g1-') && assignments[key] === lineNum) {
                    delete assignments[key];
                    delete confirmations[key];
                    break;
                }
            }
        });
        
        somLines.forEach(lineNum => {
            for (let key in assignments) {
                if (key.startsWith('g2-') && assignments[key] === lineNum) {
                    delete assignments[key];
                    delete confirmations[key];
                    break;
                }
            }
        });
        
        // Store escalation data
        escalationData = {
            active: true,
            deadlineDate: deadlineDate,
            deadlineTime: deadlineTime,
            message: message,
            ssomGroup: ssomGroup,
            somGroup: somGroup,
            ssomVacant: ssomLines,
            somVacant: somLines,
            newSSOMList: [],
            newSOMList: [],
            newLines: [],
            results: []
        };
        
        vacantLines = {
            ssom: ssomLines,
            som: somLines
        };
        
        // Save to Firebase
        saveEscalationToFirebase();
        saveToCloud();
        
        // Update UI
        showEscalationBanner();
        updateEscalationStatusDisplay();
        renderAll();
        
        alert('✓ Escalation activated!\n\nUsers will now see the escalation banner.');
    }
    
    async function saveEscalationToFirebase() {
        try {
            await fetch(`${FIREBASE_URL}/escalation.json`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...escalationData,
                    vacantLines: vacantLines
                })
            });
        } catch (err) {
            console.error('Error saving escalation:', err);
        }
    }
    
    function parseEscalationSSOM() {
        const text = document.getElementById('escalationNewSSOM').value.trim();
        if (!text) {
            document.getElementById('escalationSSOMStatus').innerHTML = '<span style="color:#e94560;">Please paste list</span>';
            return;
        }
        
        const lines = text.split('\n').filter(l => l.trim());
        const parsed = [];
        
        lines.forEach((line, index) => {
            const parts = line.split('\t');
            if (parts.length >= 2) {
                const name = parts[1] ? parts[1].trim() : parts[0].trim();
                parsed.push({ nbr: index + 1, name: name });
            } else if (parts[0].trim()) {
                parsed.push({ nbr: index + 1, name: parts[0].trim() });
            }
        });
        
        if (parsed.length > 0) {
            escalationData.newSSOMList = parsed;
            document.getElementById('escalationSSOMStatus').innerHTML = `<span style="color:#4ecca3;">✓ ${parsed.length} people</span>`;
        } else {
            document.getElementById('escalationSSOMStatus').innerHTML = '<span style="color:#e94560;">Parse error</span>';
        }
    }
    
    function parseEscalationSOM() {
        const text = document.getElementById('escalationNewSOM').value.trim();
        if (!text) {
            document.getElementById('escalationSOMStatus').innerHTML = '<span style="color:#e94560;">Please paste list</span>';
            return;
        }
        
        const lines = text.split('\n').filter(l => l.trim());
        const parsed = [];
        
        lines.forEach((line, index) => {
            const parts = line.split('\t');
            if (parts.length >= 2) {
                const name = parts[1] ? parts[1].trim() : parts[0].trim();
                parsed.push({ nbr: index + 1, name: name });
            } else if (parts[0].trim()) {
                parsed.push({ nbr: index + 1, name: parts[0].trim() });
            }
        });
        
        if (parsed.length > 0) {
            escalationData.newSOMList = parsed;
            document.getElementById('escalationSOMStatus').innerHTML = `<span style="color:#4ecca3;">✓ ${parsed.length} people</span>`;
        } else {
            document.getElementById('escalationSOMStatus').innerHTML = '<span style="color:#e94560;">Parse error</span>';
        }
    }
    
    function parseNewLines() {
        const text = document.getElementById('escalationNewLines').value.trim();
        if (!text) {
            document.getElementById('newLinesStatus').innerHTML = '<span style="color:#888;">No new lines</span>';
            escalationData.newLines = [];
            return;
        }
        
        const lines = text.split('\n').filter(l => l.trim());
        const parsed = [];
        
        lines.forEach(line => {
            const parts = line.split('\t');
            if (parts.length >= 14) {
                const lineNbr = parts[0].trim();
                const lineDesc = parts[1].trim();
                const days = parts.slice(2, 14).map(d => d.trim() || '--');
                const colorCode = parseInt(parts[14]) || 8;
                const dayCodes = days.map(d => d === '--' ? 8 : 1);
                
                parsed.push({
                    lineNbr: lineNbr,
                    lineDesc: lineDesc,
                    days: days,
                    dayCodes: dayCodes,
                    lineColorCode: colorCode
                });
            }
        });
        
        if (parsed.length > 0) {
            escalationData.newLines = parsed;
            document.getElementById('newLinesStatus').innerHTML = `<span style="color:#4ecca3;">✓ ${parsed.length} new line(s)</span>`;
        } else {
            document.getElementById('newLinesStatus').innerHTML = '<span style="color:#e94560;">Parse error - need 15 columns</span>';
        }
    }
    
    function parseEscalationResults() {
        const text = document.getElementById('escalationResults').value.trim();
        if (!text) {
            alert('Please paste escalation results.');
            return;
        }
        
        const lines = text.split('\n').filter(l => l.trim());
        const parsed = [];
        const errors = [];
        
        lines.forEach((line, index) => {
            // Support formats: "NAME → Line#" or "NAME -> Line#" or "NAME, Line#"
            let match = line.match(/(.+?)\s*(?:→|->|,)\s*(\d+)/);
            if (match) {
                const name = match[1].trim();
                const lineNum = match[2].trim();
                parsed.push({ name: name, line: lineNum });
            } else {
                errors.push(`Line ${index + 1}: "${line}" - could not parse`);
            }
        });
        
        if (errors.length > 0) {
            document.getElementById('escalationResultsPreview').innerHTML = 
                `<div style="color:#e94560;"><strong>Errors:</strong><br>${errors.join('<br>')}</div>`;
            document.getElementById('escalationResultsPreview').style.display = 'block';
            return;
        }
        
        if (parsed.length > 0) {
            escalationData.results = parsed;
            
            let html = `<div style="color:#4ecca3; font-weight:bold; margin-bottom:10px;">✓ Parsed ${parsed.length} assignment(s):</div>`;
            html += '<table style="width:100%; font-size:12px;">';
            parsed.forEach(r => {
                html += `<tr><td style="color:#fff; padding:3px;">${r.name}</td><td style="color:#888;">→</td><td style="color:#f39c12; padding:3px;">Line ${r.line}</td></tr>`;
            });
            html += '</table>';
            
            document.getElementById('escalationResultsPreview').innerHTML = html;
            document.getElementById('escalationResultsPreview').style.display = 'block';
        }
    }
    
    function showInteractiveAssignment() {
        document.getElementById('interactiveAssignmentModal').classList.add('show');
        generateInteractiveAssignmentUI();
    }
    
    function hideInteractiveAssignment() {
        document.getElementById('interactiveAssignmentModal').classList.remove('show');
    }
    
    function generateInteractiveAssignmentUI() {
        // Get all available lines (not currently assigned)
        const takenLines = Object.values(assignments);
        const allLines = ANNUAL_BID.map(l => l.lineNbr);
        const availableLines = allLines.filter(l => !takenLines.includes(l));
        
        let html = '';
        
        // SSOM Section
        if (escalationData.ssomGroup || vacantLines.ssom.length > 0) {
            const ssomList = escalationData.newSSOMList.length > 0 ? escalationData.newSSOMList : GROUP1;
            html += '<h4 style="color:#e94560; margin-bottom:10px;">SSOM</h4>';
            html += '<table style="width:100%; margin-bottom:20px;">';
            ssomList.forEach(person => {
                const currentKey = 'g1-' + person.nbr;
                const currentLine = assignments[currentKey] || '';
                
                html += `<tr style="border-bottom:1px solid #333;">
                    <td style="padding:5px; color:#888;">#${person.nbr}</td>
                    <td style="padding:5px; color:#fff;">${person.name}</td>
                    <td style="padding:5px;">
                        <select id="interactive-g1-${person.nbr}" style="padding:5px; background:#16213e; color:#fff; border:1px solid #4ecca3; border-radius:3px;">
                            <option value="">-- No Change --</option>
                            <option value="${currentLine}" ${currentLine ? 'selected' : ''}>${currentLine ? 'Line ' + currentLine + ' (current)' : ''}</option>
                            ${availableLines.map(l => `<option value="${l}">Line ${l}</option>`).join('')}
                            ${vacantLines.ssom.map(l => `<option value="${l}" style="color:#f39c12;">Line ${l} (VACANT)</option>`).join('')}
                        </select>
                    </td>
                </tr>`;
            });
            html += '</table>';
        }
        
        // SOM Section
        if (escalationData.somGroup || vacantLines.som.length > 0) {
            const somList = escalationData.newSOMList.length > 0 ? escalationData.newSOMList : GROUP2;
            html += '<h4 style="color:#e94560; margin-bottom:10px;">SOM</h4>';
            html += '<table style="width:100%; margin-bottom:20px;">';
            somList.forEach(person => {
                const currentKey = 'g2-' + person.nbr;
                const currentLine = assignments[currentKey] || '';
                
                html += `<tr style="border-bottom:1px solid #333;">
                    <td style="padding:5px; color:#888;">#${person.nbr}</td>
                    <td style="padding:5px; color:#fff;">${person.name}</td>
                    <td style="padding:5px;">
                        <select id="interactive-g2-${person.nbr}" style="padding:5px; background:#16213e; color:#fff; border:1px solid #4ecca3; border-radius:3px;">
                            <option value="">-- No Change --</option>
                            <option value="${currentLine}" ${currentLine ? 'selected' : ''}>${currentLine ? 'Line ' + currentLine + ' (current)' : ''}</option>
                            ${availableLines.map(l => `<option value="${l}">Line ${l}</option>`).join('')}
                            ${vacantLines.som.map(l => `<option value="${l}" style="color:#f39c12;">Line ${l} (VACANT)</option>`).join('')}
                        </select>
                    </td>
                </tr>`;
            });
            html += '</table>';
        }
        
        document.getElementById('interactiveAssignmentContent').innerHTML = html;
    }
    
    function applyInteractiveAssignments() {
        const results = [];
        
        // Collect SSOM changes
        const ssomList = escalationData.newSSOMList.length > 0 ? escalationData.newSSOMList : GROUP1;
        ssomList.forEach(person => {
            const select = document.getElementById(`interactive-g1-${person.nbr}`);
            if (select && select.value) {
                results.push({ key: 'g1-' + person.nbr, name: person.name, line: select.value });
            }
        });
        
        // Collect SOM changes
        const somList = escalationData.newSOMList.length > 0 ? escalationData.newSOMList : GROUP2;
        somList.forEach(person => {
            const select = document.getElementById(`interactive-g2-${person.nbr}`);
            if (select && select.value) {
                results.push({ key: 'g2-' + person.nbr, name: person.name, line: select.value });
            }
        });
        
        // Check for duplicates
        const lineAssignments = results.map(r => r.line);
        const duplicates = lineAssignments.filter((l, i) => lineAssignments.indexOf(l) !== i);
        
        if (duplicates.length > 0) {
            alert(`Duplicate line assignments detected: ${[...new Set(duplicates)].join(', ')}\n\nPlease fix before applying.`);
            return;
        }
        
        // Store results
        escalationData.results = results.map(r => ({ name: r.name, line: r.line, key: r.key }));
        
        hideInteractiveAssignment();
        
        // Show preview
        let html = `<div style="color:#4ecca3; font-weight:bold; margin-bottom:10px;">✓ ${results.length} assignment(s) ready to apply:</div>`;
        html += '<table style="width:100%; font-size:12px;">';
        results.forEach(r => {
            html += `<tr><td style="color:#fff; padding:3px;">${r.name}</td><td style="color:#888;">→</td><td style="color:#f39c12; padding:3px;">Line ${r.line}</td></tr>`;
        });
        html += '</table>';
        
        document.getElementById('escalationResultsPreview').innerHTML = html;
        document.getElementById('escalationResultsPreview').style.display = 'block';
    }
    
    function applyEscalationChanges() {
        if (escalationData.results.length === 0) {
            alert('No results to apply. Please parse results or use interactive assignment first.');
            return;
        }
        
        const confirmMsg = `Apply Escalation Changes?\n\n` +
            `${escalationData.results.length} assignment(s) will be updated.\n` +
            `${escalationData.newSSOMList.length > 0 ? 'SSOM seniority list will be updated.\n' : ''}` +
            `${escalationData.newSOMList.length > 0 ? 'SOM seniority list will be updated.\n' : ''}` +
            `${escalationData.newLines.length > 0 ? escalationData.newLines.length + ' new line(s) will be added.\n' : ''}` +
            `\nThe escalation banner will be removed.`;
        
        if (!confirm(confirmMsg)) return;
        
        // Apply assignment results
        escalationData.results.forEach(result => {
            if (result.key) {
                // From interactive assignment
                assignments[result.key] = result.line;
            } else {
                // From paste format - find the person
                let found = false;
                
                // Check SSOM
                const ssomList = escalationData.newSSOMList.length > 0 ? escalationData.newSSOMList : GROUP1;
                ssomList.forEach(person => {
                    if (person.name === result.name) {
                        assignments['g1-' + person.nbr] = result.line;
                        found = true;
                    }
                });
                
                // Check SOM
                if (!found) {
                    const somList = escalationData.newSOMList.length > 0 ? escalationData.newSOMList : GROUP2;
                    somList.forEach(person => {
                        if (person.name === result.name) {
                            assignments['g2-' + person.nbr] = result.line;
                            found = true;
                        }
                    });
                }
                
                if (!found) {
                    console.warn(`Could not find person: ${result.name}`);
                }
            }
        });
        
        // Clear escalation state
        escalationData.active = false;
        vacantLines = { ssom: [], som: [] };
        
        // Clear Firebase escalation
        fetch(`${FIREBASE_URL}/escalation.json`, { method: 'DELETE' });
        
        // Save assignments
        saveToCloud();
        
        // Hide banner
        hideEscalationBanner();
        
        // Update UI
        updateEscalationStatusDisplay();
        renderAll();
        
        alert('✓ Escalation completed successfully!\n\n' +
            `${escalationData.results.length} assignment(s) updated.\n\n` +
            'Remember to:\n' +
            '1. Update seniority lists in the code if needed\n' +
            '2. Export to ASCENT');
        
        // Reset escalation data
        escalationData = {
            active: false,
            deadlineDate: null,
            deadlineTime: null,
            message: '',
            ssomVacant: [],
            somVacant: [],
            ssomGroup: false,
            somGroup: false,
            newSSOMList: [],
            newSOMList: [],
            newLines: [],
            results: []
        };
    }
    
    function cancelEscalation() {
        if (!confirm('Cancel the escalation?\n\nThis will remove the banner but will NOT restore the vacated line assignments.')) {
            return;
        }
        
        // Clear escalation state
        escalationData.active = false;
        vacantLines = { ssom: [], som: [] };
        
        // Clear Firebase escalation
        fetch(`${FIREBASE_URL}/escalation.json`, { method: 'DELETE' });
        
        // Hide banner
        hideEscalationBanner();
        
        // Update UI
        updateEscalationStatusDisplay();
        
        alert('Escalation cancelled.');
    }
    
    // Check for active escalation on page load
    function checkEscalationOnLoad() {
        fetch(`${FIREBASE_URL}/escalation.json`)
            .then(response => response.json())
            .then(data => {
                if (data && data.active) {
                    escalationData = { ...escalationData, ...data };
                    vacantLines = data.vacantLines || { ssom: [], som: [] };
                    showEscalationBanner();
                }
            })
            .catch(err => {
                console.error('Error checking escalation:', err);
            });
    }
    
    // Call on page load
    setTimeout(checkEscalationOnLoad, 1000);
    
    // ===========================================
    // ESCALATION FILE DOWNLOAD FUNCTIONS
    // ===========================================
    
    function downloadAllEscalationFiles() {
        // Determine which seniority lists to use
        const ssomList = escalationData.newSSOMList.length > 0 ? escalationData.newSSOMList : GROUP1;
        const somList = escalationData.newSOMList.length > 0 ? escalationData.newSOMList : GROUP2;
        
        if (escalationData.newSSOMList.length === 0 && escalationData.newSOMList.length === 0) {
            if (!confirm('No new seniority lists have been parsed.\n\nDownload files with CURRENT seniority lists?\n\n(If you want updated lists, paste them in Step 3 first and click Parse)')) {
                return;
            }
        }
        
        const statusDiv = document.getElementById('escalationFilesStatus');
        statusDiv.innerHTML = '<span style="color:#f39c12;">Generating files...</span>';
        
        try {
            // Generate all 4 files
            downloadEscalationBiddingFinalJS(ssomList, somList);
            setTimeout(() => downloadEscalationBidConfirmationHTML(ssomList, somList), 300);
            setTimeout(() => downloadEscalationBidTimesHTML(ssomList, somList), 600);
            setTimeout(() => downloadEscalationSwapBuilderHTML(ssomList, somList), 900);
            
            setTimeout(() => {
                statusDiv.innerHTML = `<span style="color:#4ecca3;">✓ 4 files downloaded!</span>
                    <div style="margin-top:10px; color:#888; font-size:11px;">
                        <strong>Files to upload to GitHub:</strong><br>
                        1. bidding_final.js<br>
                        2. bid_confirmation.html<br>
                        3. bid_times.html<br>
                        4. swap_builder.html
                    </div>`;
            }, 1200);
            
        } catch (err) {
            statusDiv.innerHTML = `<span style="color:#e94560;">Error: ${err.message}</span>`;
        }
    }
    
    function downloadEscalationBiddingFinalJS(ssomList, somList) {
        // We need to create a modified version with the new GROUP1 and GROUP2
        // This is a simplified approach - generates just the key changes needed
        
        const group1JSON = JSON.stringify(ssomList);
        const group2JSON = JSON.stringify(somList);
        
        const content = `// ===========================================
// ESCALATION UPDATE - Seniority List Changes
// Generated: ${new Date().toISOString()}
// ===========================================
// 
// INSTRUCTIONS:
// 1. Open your current bidding_final.js file
// 2. Find the GROUP1 line (around line 43) and replace it with:

    const GROUP1 = ${group1JSON};

// 3. Find the GROUP2 line (around line 44) and replace it with:

    const GROUP2 = ${group2JSON};

// 4. Save and upload to GitHub
//
// SSOM Count: ${ssomList.length}
// SOM Count: ${somList.length}
// ===========================================
`;
        
        downloadFile(content, 'ESCALATION_bidding_final_UPDATE.js', 'text/javascript');
    }
    
    function downloadEscalationBidConfirmationHTML(ssomList, somList) {
        const group1JSON = JSON.stringify(ssomList);
        const group2JSON = JSON.stringify(somList);
        
        const content = `<!-- ===========================================
     ESCALATION UPDATE - bid_confirmation.html
     Generated: ${new Date().toISOString()}
     ===========================================
     
     INSTRUCTIONS:
     1. Open your current bid_confirmation.html file
     2. Find the GROUP1 line (search for "const GROUP1") and replace it with:
-->

        const GROUP1 = ${group1JSON};

<!-- 3. Find the GROUP2 line (search for "const GROUP2") and replace it with: -->

        const GROUP2 = ${group2JSON};

<!-- 
     4. Save and upload to GitHub
     
     SSOM Count: ${ssomList.length}
     SOM Count: ${somList.length}
-->
`;
        
        downloadFile(content, 'ESCALATION_bid_confirmation_UPDATE.html', 'text/html');
    }
    
    function downloadEscalationBidTimesHTML(ssomList, somList) {
        // Generate the full bid times HTML structure
        // Use current bid settings or defaults
        const bidStartDate = escalationData.bidStartDate || '2026-01-06';
        const bidStartTime = escalationData.bidStartTime || '05:00';
        const interval = escalationData.bidInterval || 10;
        
        let content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2026-2027 Bid Times (Updated)</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; }
        .container { max-width: 900px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { font-size: 2.5em; margin-bottom: 10px; }
        .header p { font-size: 1.1em; opacity: 0.9; }
        .info-banner { background: #f7fafc; padding: 20px; border-bottom: 2px solid #e2e8f0; text-align: center; color: #4a5568; }
        .content { padding: 20px; }
        .group-section { margin-bottom: 30px; }
        .group-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 20px; font-size: 1.3em; font-weight: bold; border-radius: 8px 8px 0 0; }
        .bid-table { border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; overflow: hidden; }
        .bid-table-row { display: grid; grid-template-columns: 50px 1fr 150px; border-bottom: 1px solid #e2e8f0; }
        .bid-table-row:last-child { border-bottom: none; }
        .bid-table-row:nth-child(even) { background: #f7fafc; }
        .bid-table-row > div { padding: 12px 15px; }
        .nbr { font-weight: bold; color: #667eea; text-align: center; }
        .name { font-weight: 500; }
        .bid-time { color: #e53e3e; font-weight: bold; text-align: right; }
        .vacant { color: #a0aec0; font-style: italic; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>2026-2027 Polish Bid Schedule</h1>
            <p>Official Bid Times (Updated after Escalation)</p>
        </div>
        <div class="info-banner">
            <strong>Bid Start:</strong> ${bidStartDate} at ${bidStartTime} | <strong>Interval:</strong> ${interval} minutes
        </div>
        <div class="content">
            <div class="group-section">
                <div class="group-header">SSOM (${ssomList.length} bidders)</div>
                <div class="bid-table">
`;
        
        // Generate SSOM rows
        let currentTime = new Date(bidStartDate + 'T' + bidStartTime);
        ssomList.forEach(person => {
            const timeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            const dateStr = currentTime.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '').replace(',', '');
            const isVacant = person.name === '(VACANT)';
            
            content += `                    <div class="bid-table-row">
                        <div class="nbr">${person.nbr}</div>
                        <div class="name${isVacant ? ' vacant' : ''}">${person.name}</div>
                        <div class="bid-time">${timeStr} ${dateStr}</div>
                    </div>
`;
            currentTime = new Date(currentTime.getTime() + interval * 60000);
        });
        
        content += `                </div>
            </div>
            <div class="group-section">
                <div class="group-header">SOM (${somList.length} bidders)</div>
                <div class="bid-table">
`;
        
        // Generate SOM rows
        somList.forEach(person => {
            const timeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            const dateStr = currentTime.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' }).replace(/ /g, '').replace(',', '');
            const isVacant = person.name === '(VACANT)';
            
            content += `                    <div class="bid-table-row">
                        <div class="nbr">${person.nbr}</div>
                        <div class="name${isVacant ? ' vacant' : ''}">${person.name}</div>
                        <div class="bid-time">${timeStr} ${dateStr}</div>
                    </div>
`;
            currentTime = new Date(currentTime.getTime() + interval * 60000);
        });
        
        content += `                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
        
        downloadFile(content, 'ESCALATION_bid_times.html', 'text/html');
    }
    
    function downloadEscalationSwapBuilderHTML(ssomList, somList) {
        const group1JSON = JSON.stringify(ssomList);
        const group2JSON = JSON.stringify(somList);
        
        const content = `<!-- ===========================================
     ESCALATION UPDATE - swap_builder.html
     Generated: ${new Date().toISOString()}
     ===========================================
     
     INSTRUCTIONS:
     1. Open your current swap_builder.html file
     2. Find the GROUP1 line (search for "var GROUP1") and replace it with:
-->

        var GROUP1 = ${group1JSON};

<!-- 3. Find the GROUP2 line (search for "var GROUP2") and replace it with: -->

        var GROUP2 = ${group2JSON};

<!-- 
     4. Save and upload to GitHub
     
     SSOM Count: ${ssomList.length}
     SOM Count: ${somList.length}
-->
`;
        
        downloadFile(content, 'ESCALATION_swap_builder_UPDATE.html', 'text/html');
    }
