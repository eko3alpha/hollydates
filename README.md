## HollyDate

Javascript library used when you want to execute a certain function on any of the registered dates.

## Use Cases

- You want to hide "Call us now at 555-5555" when you know your closed on weekends and holidays
- If you want to change background images to holiday themes on your website
- Redirect your site to another support site if call center is closed for the day
- Display special messages on your site on special occasions

## Usage

Get an instance of HollyDate with a list of US federal holidays
```javascript
    var h = HollyDates();
```
If you don't want to check for any of the preloaded holidays you can clear the list and add your own.
```javascript
    h.reset();
```
Add custom floating holidays that occur on certain days of the month
```javascript
    h.addByOccurrence('Memorial Day', h.LAST, h.MON, h.MAY);
    h.addByOccurrence('Labor Day', h.FIRST, h.MON, h.SEP);
```
Add custom holidays that fall on the same date every year
```javascript
    h.addByDate('Christmas', h.DEC, 25);
    h.addByDate('New Years', h.JAN, 1);
    h.addByDate('My Super Soft Birthday Party!', h.AUG, 16);
```
Check to see what holiday (occurrence or custom date) falls on a given date
```javascript
    // returns "New Years"
    h.getHoliday(new Date('1/1/2020'));

    // returns "Labor Day"
    h.getHoliday(new Date('9/7/2020'));

    // returns "My Super Soft Birthday Party!"
    h.getHoliday(new Date('8/16/2020'));
```
If no holidays are found it will return null
```javascript
    // returns null if no holidays are found
    h.getHoliday(new Date('6/1/2020'));
```
If you only need to check if there is a holiday
```javascript
    // returns true or false
    h.isHoliday(new Date('6/1/2020'));
```
You can also check for weekends ( Saturday or Sunday)
```javascript
    // returns false
    h.isWeekend(new Date('9/1/2020'));

    // returns true
    h.isWeekend(new Date('9/5/2020'));
```
## Preloaded Federal Holidays

These holidays are the defaults.  No need to load them unless you reset.

New Year’s Day :: January 1st
```javascript
    h.addByDate('Christmas', h.JAN, 1);
```
Martin Luther King Day :: 3rd Monday of January
```javascript
    h.addByOccurrence('Memorial Day', h.THIRD, h.MON, h.JAN);
```
Washington’s Birthday :: February 17th
```javascript
    h.addByDate('Christmas', h.FEB, 17);
```
Memorial Day :: Last Monday of May
```javascript
    h.addByOccurrence('Memorial Day', h.LAST, h.MON, h.MAY);
```
Independence Day :: July 4th
```javascript
    h.addByDate('Christmas', h.JUL, 4);
```
Labor Day :: 1st Monday of September
```javascript
    h.addByOccurrence('Memorial Day', h.FIRST, h.MON, h.SEP);
```
Columbus Day :: 2nd Monday of October
```javascript
    h.addByOccurrence('Memorial Day', h.SECOND, h.MON, h.OCT);
```
Veterans Day :: November 11th
```javascript
    h.addByDate('Christmas', h.NOV, 11);
```
Thanksgiving Day :: Last Thursday of November
```javascript
    h.addByOccurrence('Memorial Day', h.LAST, h.THU, h.NOV);
```
Christmas Day :: December 25th
```javascript
    h.addByDate('Christmas', h.DEC, 25);
```
## Register Custom Holidays

In order to make registering dates easier there are some properties available to you.  These values store numerical values starting at 1.  Generally Date() values start at 0 index.  However when we think of dates we don't think 0 for January, we think 1.  Same applies to weekdays, we dont say Sunday is the 0 day of the week.

**Occurrences**
- h.FIRST
- h.SECOND
- h.THIRD
- h.FOURTH
- h.LAST

**Weekdays**
- h.SUN
- h.MON
- h.TUE
- h.WED
- h.THU
- h.FRI
- h.SAT

**Months**
- h.JAN
- h.FEB
- h.MAR
- h.APR
- h.MAY
- h.JUN
- h.JUL
- h.AUG
- h.SEP
- h.OCT
- h.NOV
- h.DEC

Some holidays like MLK, Labor Day and Thanksgiving fall on floating holidays that are different every year.  You use this to register them

 **addByOccurrence( name, occurrence, weekDay, month )**

- **name**: name of holiday or custom date
- **occurrence**: what week in the month the holiday occurs,  1 for 1st, 2 for 2nd... -1 for last week
- **weekDay**: day of week, 1 for Sunday, 2 for Monday...
- **month**: month number 1 for January, 2 for Feb...
<!-- end of the list -->

```javascript
    // using helpers
    h.addByOccurrence('My Fav Holiday', h.LAST, h.FRI, h.JUN);

    // using numbers
    h.addByOccurrence('My Fav Holiday', -1, 6, 6);
```

 Some holidays like New Years and Christmas fall on the same date every year, thats when you would use this to register them

 **addByDate( name, month, date )**

- **name**: name of holiday or custom date
- **month**: month number 1 for January, 2 for Feb...
- **date**: numeric date, 1 ~ 31
<!-- end of the list -->

```javascript
    // using helpers
    h.addByDate('My Fav Holiday', h.NOV, 5);

    // using numbers
    h.addByDate('My Fav Holiday', 11, 5);
```

## Checking For Holidays

**HollyDates( ) :: object**

Returns a fresh HollyDates object

```javascript
    var h = HollyDates();
```
  **reset( )**

Clears all registered holidays and custom dates
```javascript
    h.reset();
```
**isWeekend( ... ) :: true | false**

- optional Date object

if no value passed it will check to see if today is a weekend
```javascript
    h.isWeekend();
```
Pass in a date object to check if it's a weekend
```javascript
    h.isWeekend(new Date('1/1/2000));
```
**isHoliday( ... ) :: true | false**

- optional Date object

if no value passed it will check to see if today is a holiday
```javascript
    h.isHoliday();
```
Pass in a date object to check if it's a holiday, in this case this will return true as 9/7/2020 is Labor Day
```javascript
    h.isHoliday(new Date('9/7/2020)); // returns true;
```
 **getHoliday( ... ) :: null | string**

- optional Date object

if no value passed it will check today to see if it's a registered holiday or custom date
```javascript
    h.getHoliday();
```
Pass in a date object to check if it's a holiday
```javascript
    h.getHoliday(new Date('9/7/2020)); // returns "Labor Day"
```
## Callbacks

You can register a callback to execute if you have provided one.  Two parameters will be passed to you for the callback, first is the matching holiday text, the second is the date object that matched.

 **onMatch( ... )**

- optional callback

Pass a callback during registration
```javascript
    h.addByOccurrence('My Fav Holiday', h.LAST, h.FRI, h.JUN)
    .onMatch(function(holiday, date) {

        // do something here

    });

    h.addByDate('My Second Fav Holiday', h.NOV, 5)
    .onMatch(function(holiday, date) {

        // do something here

    });
```

**trigger( ... ) :: true | false**

- optional Date object

To trigger a callback you can pass in a date to check or by default it will check if today is a holiday and trigger any registered callbacks

Check to see if today is a holiday, if so check for any callbacks and execute
```javascript
    h.trigger()
```
Check to see if today is the provided date is a holiday, if so check for any callbacks and execute
```javascript
    h.trigger(new Date('11/5/2020'))
```