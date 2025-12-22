// Calendar Generator - builds full year from 12-day pattern + overrides
function generateCalendar() {
    const calendar = {};
    const startDate = new Date(2026, 3, 1);  // April 1, 2026
    const endDate = new Date(2027, 2, 31);   // March 31, 2027
    
    ANNUAL_BID.forEach(line => {
        const lineNbr = line.lineNbr;
        calendar[lineNbr] = {
            desc: line.lineDesc,
            days: {}
        };
        
        let currentDate = new Date(startDate);
        let dayIndex = 0;
        
        while (currentDate <= endDate) {
            const dateStr = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();
            const patternIndex = dayIndex % 12;
            const shift = line.days[patternIndex];
            
            calendar[lineNbr].days[dateStr] = {
                s: shift,
                b: 0
            };
            
            currentDate.setDate(currentDate.getDate() + 1);
            dayIndex++;
        }
        
        // Apply May overrides for this line (and mark with b:1 for red highlighting)
        if (typeof MAY_OVERRIDES !== 'undefined' && MAY_OVERRIDES[lineNbr]) {
            Object.keys(MAY_OVERRIDES[lineNbr]).forEach(dateStr => {
                if (calendar[lineNbr].days[dateStr]) {
                    calendar[lineNbr].days[dateStr].s = MAY_OVERRIDES[lineNbr][dateStr];
                    calendar[lineNbr].days[dateStr].b = 1;
                }
            });
        }
    });
    
    return calendar;
}

// Generate and assign on load
const ALL_LINES_CALENDAR = generateCalendar();
console.log('Calendar generated:', Object.keys(ALL_LINES_CALENDAR).length, 'lines');
