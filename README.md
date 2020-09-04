## HollyDates

Javascript library to see if a given date falls on a holiday or matches custom dates.  Useful for when you want to show/hide elements in the DOM based on holiday messaging.

## Usage

Get an instance of HollyDate with a list of US federal holidays

    var h = HollyDates();

If you don't want to check for any of the preloaded holidays you can clear the list and add your own.

    h.reset();

Add custom floating holidays that occur on certain days of the month

    h.addByOccurance('Memorial Day', h.LAST, h.MON, h.MAY);
    h.addByOccurance('Labor Day', h.FIRST, h.MON, h.SEP);

Add custom holidays that fall on the same date every year

    h.addByDate('Christmas', h.DEC, 25);
    h.addByDate('New Years', h.JAN, 1);
    h.addByDate('My Super Soft Birthday Party!', h.AUG, 16);

Check to see what holiday falls on a given date

    h.getHoliday(new Date('1/1/2020'));
    // returns "New Years"

    h.getHoliday(new Date('12/25/1999'));
    // returns "Christmas"

    h.getHoliday(new Date('8/16/2020'));
    // returns "My Super Soft Birthday Party!"

If no holidays are found it will return null

    h.getHoliday(new Date('6/1/2020'));
    // returns null if no holidays are found

If you only need to check if there is a holiday

    h.isHoliday(new Date('6/1/2020'));
    // returns true or false

You can also check for weekends ( Saturday or Sunday)

    h.isWeekend(new Date('9/1/2020'));
    // returns false

    h.isWeekend(new Date('9/5/2020'));
    // returns true

## Preloaded Federal Holidays

-   New Year’s Day :: January 1st
-   Martin Luther King Day :: 3rd Monday of January
-   Washington’s Birthday :: February 17th
-   Memorial Day :: Last Monday of May
-   Independence Day :: July 4th
-   Labor Day :: 1st Monday of September
-   Columbus Day :: 2nd Monday of October
-   Veterans Day :: November 11th
-   Thanksgiving Day :: Last Thursday of November
-   Christmas Day :: December 25th