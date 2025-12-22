    
    // Firebase Realtime Database - 50,000 reads/day FREE, resets daily!
    const FIREBASE_URL = 'https://bid2026-58308-default-rtdb.firebaseio.com';
	let confirmations = {};

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
    const GROUP2 = [{"nbr": 1, "name": "BIRD, DAN"}, {"nbr": 2, "name": "FRAN, DAV"}, {"nbr": 3, "name": "CHAR, CAR"}, {"nbr": 4, "name": "SPRA, PER"}, {"nbr": 5, "name": "OLSE, ED"}, {"nbr": 6, "name": "HARR, JIM"}, {"nbr": 7, "name": "BAIL, RIC"}, {"nbr": 8, "name": "CLAR, JUD"}, {"nbr": 9, "name": "GWIN, BRI"}, {"nbr": 10, "name": "DANI, JEF"}, {"nbr": 11, "name": "SMIT, BAR"}, {"nbr": 12, "name": "RIEL, WAL"}, {"nbr": 13, "name": "ROHL, MIK"}, {"nbr": 14, "name": "HOUC, DAV"}, {"nbr": 15, "name": "STAN, LAN"}, {"nbr": 16, "name": "HOBS, MAR"}, {"nbr": 17, "name": "HOFF, DAN"}, {"nbr": 18, "name": "BAKE, ERI"}, {"nbr": 19, "name": "PUSZ, JIM"}, {"nbr": 20, "name": "HARA, DUD"}, {"nbr": 21, "name": "BATT, JAI"}, {"nbr": 22, "name": "SUCH, CHR"}, {"nbr": 23, "name": "VOGT, DAV"}, {"nbr": 24, "name": "HURL, JAC"}, {"nbr": 25, "name": "MCEL, KEV"}, {"nbr": 26, "name": "REED, MIK"}, {"nbr": 27, "name": "FUJI, ROX"}, {"nbr": 28, "name": "O'DO, BRI"}, {"nbr": 29, "name": "HAMI, ADA"}, {"nbr": 30, "name": "GEIG, GEO"}, {"nbr": 31, "name": "O'DO, WEN"}, {"nbr": 32, "name": "ESTE, KAT"}, {"nbr": 33, "name": "RINE, RAL"}, {"nbr": 34, "name": "ROMA, KEN"}, {"nbr": 35, "name": "HALL, CHA"}, {"nbr": 36, "name": "LONG, AND"}, {"nbr": 37, "name": "PAPP, ROB"}, {"nbr": 38, "name": "GAGN, JUL"}, {"nbr": 39, "name": "MALE, TOD"}, {"nbr": 40, "name": "MISN, HUO"}, {"nbr": 41, "name": "O'BR, DAV"}, {"nbr": 42, "name": "DELA, WIL"}, {"nbr": 43, "name": "BETC, MIC"}, {"nbr": 44, "name": "JOLL, DAV"}, {"nbr": 45, "name": "TOZZ, GIN"}, {"nbr": 46, "name": "MCMO, SHA"}, {"nbr": 47, "name": "RUCK, RIC"}, {"nbr": 48, "name": "WARN, DEE"}, {"nbr": 49, "name": "HENE, AND"}, {"nbr": 50, "name": "OSOJ, MER"}, {"nbr": 51, "name": "FOLE, RYA"}, {"nbr": 52, "name": "HILL, SEA"}, {"nbr": 53, "name": "MUGE, JEN"}, {"nbr": 54, "name": "DENM, JOH"}, {"nbr": 55, "name": "MAKI, RYA"}, {"nbr": 56, "name": "MCGR, DEA"}, {"nbr": 57, "name": "BRAD, LAT"}, {"nbr": 58, "name": "HATL, HER"}, {"nbr": 59, "name": "HAYE, JOH"}, {"nbr": 60, "name": "HARR, ELE"}, {"nbr": 61, "name": "PIOT, MAR"}, {"nbr": 62, "name": "CART, WES"}, {"nbr": 63, "name": "GAUL, PET"}, {"nbr": 64, "name": "BOST, GRE"}, {"nbr": 65, "name": "HINT, SEL"}, {"nbr": 66, "name": "TJAD, AND"}, {"nbr": 67, "name": "GEUR, STE"}, {"nbr": 68, "name": "KENT, AND"}, {"nbr": 69, "name": "SAMU, CHA"}, {"nbr": 70, "name": "CORN, DAN"}, {"nbr": 71, "name": "FATT, KEL"}, {"nbr": 72, "name": "STAR, JIM"}, {"nbr": 73, "name": "ALLE, JOS"}, {"nbr": 74, "name": "LATT, WIL"}, {"nbr": 75, "name": "TURI, LAU"}, {"nbr": 76, "name": "AUST, STE"}, {"nbr": 77, "name": "RAIN, MIK"}, {"nbr": 78, "name": "MILL, CRA"}, {"nbr": 79, "name": "LITT, CLA"}, {"nbr": 80, "name": "PIER, MAR"}, {"nbr": 81, "name": "HARN, ZAC"}];

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
                assignments = data.assignments || {};
		confirmations = data.confirmations || {};
                renderAll();
                const time = new Date().toISOString().substr(11, 8) + 'Z';
                setSyncStatus('ok', `Loaded`);
                document.getElementById('lastRefresh').textContent = time;
            } else {
                const time = new Date().toISOString().substr(11, 8) + 'Z';
                setSyncStatus('ok', 'No data yet');
                document.getElementById('lastRefresh').textContent = time;
            }
        } catch (err) {
            console.error('Failed to load from cloud:', err);
            setSyncStatus('error', 'Load failed');
        }
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

        // Restart auto-refresh for viewer
        refreshInterval = setInterval(loadFromCloud, 300000);

        renderAll();
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
        container.innerHTML = group.map(person => {
            const key = prefix + '-' + person.nbr;
            const assignedLine = assignments[key] || '';

            if (isAdmin) {
                const deleteBtn = assignedLine ? `<button class="sen-delete" onclick="deleteLine('${key}')">&times;</button>` : '<span></span>';
                return `
                    <div class="seniority-entry ${assignedLine ? 'assigned' : ''}" id="entry-${key}">
                        <div class="sen-nbr">${person.nbr}</div>
                        <div class="sen-name" onclick="sendBidNotification('${person.name}')" style="cursor: pointer; text-decoration: underline;" title="Click to send bid notification">${person.name}</div>
                        <input type="text"
                               class="sen-input ${assignedLine ? 'filled' : ''}"
                               id="input-${key}"
                               value="${assignedLine}"
                               placeholder="—"
                               onchange="assignLine('${key}', this.value)"
                               onkeydown="handleKeyDown(event, '${key}')">
                        ${deleteBtn}
                    </div>
                `;
            } else {
                const clickHandler = assignedLine ? `onclick="showCalendar('${assignedLine}')" style="cursor:pointer;"` : '';
                return `
                    <div class="seniority-entry ${assignedLine ? 'assigned' : ''}" id="entry-${key}">
                        <div class="sen-nbr">${person.nbr}</div>
                        <div class="sen-name">${person.name}</div>
                        <div class="sen-line-display ${assignedLine ? '' : 'empty'}" ${clickHandler}>${assignedLine || '—'}</div>
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
                        font-size: 14px;
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
                        font-size: 9px;
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
                        font-size: 6px;
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
                    .cal-day .day-num { font-size: 5px; opacity: 0.7; }
                    .cal-day .shift-code { font-weight: bold; font-size: 6px; }
                    .cal-day.holiday { border: 2px solid #e94560 !important; }
                    .cal-day .holiday-tag {
                        position: absolute;
                        bottom: 0;
                        font-size: 4px;
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
                        font-size: 6px;
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
                        font-size: 8px;
                        border: 0.5px solid #666;
                        position: relative;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        box-sizing: border-box;
                    }
                    .traditional-day-cell.header {
                        background: #ddd;
                        font-weight: bold;
                        font-size: 7.5px;
                    }
                    .traditional-day-cell.dow {
                        background: #eee;
                        font-size: 7px;
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
                var shiftTimes = getShiftTimes(shift);
                
                var year = currentDate.getFullYear();
                var month = String(currentDate.getMonth() + 1).padStart(2, '0');
                var day = String(currentDate.getDate()).padStart(2, '0');
                
                icsContent.push('BEGIN:VEVENT');
                icsContent.push('DTSTART:' + year + month + day + 'T' + shiftTimes.start + '00');
                icsContent.push('DTEND:' + year + month + day + 'T' + shiftTimes.end + '00');
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
        var endHour = String((hour + 8) % 24).padStart(2, '0');
        
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
