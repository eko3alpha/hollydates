var h = HollyDates();

var module = QUnit.module;
var test = QUnit.test;

module('getMonthAWeekFromDate', function () {
    test('check month of following week', function (assert) {
        assert.equal(
            h._.getMonthAWeekFromDate(new Date('12/31/2020')),
            h.JAN,
            'a week after Dec 31 2020 is Jan'
        );

        assert.equal(
            h._.getMonthAWeekFromDate(new Date('12/24/2020')),
            h.DEC,
            'a week after Dec 24 2020 is still Dec'
        );
    });
});

module('isDay', function () {
    test('sunday in month', function (assert) {

        assert.true(
            h._.isDay(new Date('7/1/2018'), h.FIRST, h.SUN, h.JUL),
            '7/1/2018 first instance on first day of the month'
        );

        assert.true(
            h._.isDay(new Date('1/7/2018'), h.FIRST, h.SUN, h.JAN),
            '1/7/2018 first instance on second week'
        );

        assert.true(
            h._.isDay(new Date('12/31/2017'), h.LAST, h.SUN, h.DEC),
            '12/31/2017 last instance on last day of the month'
        );

    });

    test('friday in month', function (assert) {

        assert.true(
            h._.isDay(new Date('12/1/2017'), h.FIRST, h.FRI, h.DEC),
            '12/1/2017 first instance falls on first of the month'
        );

        assert.true(
            h._.isDay(new Date('9/7/2018'), h.FIRST, h.FRI, h.SEP),
            '9/7/2018 first instance on second week'
        );

        assert.true(
            h._.isDay(new Date('11/30/2018'), h.LAST, h.FRI, h.NOV),
            '11/30/2018 last instance on last day of the month'
        );

    });
});

module('getHoliday', function () {
    test('Martin Luther King, Jr. Day', function (assert) {

        var HOLIDAY = 'Martin Luther King, Jr. Day';

        assert.equal(
            h.getHoliday(new Date('1/18/2021')),
            HOLIDAY,
            '1/18/2021'
        );

        assert.equal(
            h.getHoliday(new Date('1/15/2103')),
            HOLIDAY,
            '1/15/2103'
        );

        assert.equal(
            h.getHoliday(new Date('1/20/1986')),
            HOLIDAY,
            '1/20/1986'
        );

    });

    test('Thanksgiving Day', function (assert) {

        var HOLIDAY = 'Thanksgiving Day';

        assert.equal(
            h.getHoliday(new Date('11/26/2015')),
            HOLIDAY,
            '11/26/2015'
        );

        assert.equal(
            h.getHoliday(new Date('11/30/2023')),
            HOLIDAY,
            '11/30/2023'
        );

        assert.equal(
            h.getHoliday(new Date('11/27/2025')),
            HOLIDAY,
            '11/27/2025'
        );

    });
});

module('getDate', function () {
    test('custom dates', function (assert) {

        var HOLIDAY = 'Christmas';

        assert.equal(
            h._.getDate(new Date('12/25/2021')),
            HOLIDAY,
            '1/25/2021 is Christmas'
        );

        var HOLIDAY = "New Year's Day";

        assert.equal(
            h._.getDate(new Date('1/1/2021')),
            HOLIDAY,
            "1/1/2021 is New Year's Day"
        );

    });
});


module('isHoliday', function () {
    test('closed for holidays', function (assert) {

        assert.true(
            h.isHoliday(new Date('9/7/2020')),
            '9/7/2020 Labor Day'
        );

        assert.true(
            h.isHoliday(new Date('1/16/2023')),
            '1/16/2023 MLK'
        );

    });

    test('closed for dates', function (assert) {

        assert.true(
            h.isHoliday(new Date('1/1/2020')),
            "1/1/2020 New Year's Day"
        );

        assert.true(
            h.isHoliday(new Date('12/25/2023')),
            '12/25/2023 Christmas'
        );

    });
});

module('isDate', function () {
    test('8/16/1979', function (assert) {

        assert.true(
            h._.isDate(new Date('8/16/1979'), h.AUG, 16),
            '8/16/1979'
        );

    });

    test('8/17/1979', function (assert) {

        assert.false(
            h._.isDate(new Date('8/17/1979'), h.AUG, 16),
            'wrong day 8/17/1979 is not 8/16'
        );

        assert.false(
            h._.isDate(new Date('7/16/1979'), h.AUG, 16),
            'wrong month 7/16/1979 is not 8/16'
        );

    });
});

module('addByOccurance', function () {
    test('Last Day of School', function (assert) {

        h.addByOccurance('Last Day of School', h.LAST, h.FRI, h.JUN);

        assert.equal(
            h.getHoliday(new Date('6/26/2020')),
            'Last Day of School'
        );
    });
});

module('addByDate', function () {

    test('My Birthday', function (assert) {

        h.addByDate('My Birthday', h.AUG, 16);

        assert.equal(
            h._.getDate(new Date('8/16/2020')),
            'My Birthday'
        );
    });
});

module('reset', function () {
    test('reset', function (assert) {

        var h = HollyDates();
        h.reset();

        assert.deepEqual(
            h._.getHolidays(),
            {},
            'reset should clear all holidays'
        );

        assert.deepEqual(
            h._.getCustomDates(),
            {},
            'reset should clear all custom dates'
        );
    });
});

module('isWeekend', function () {
    test('check weekends', function (assert) {

        assert.true(
            h.isWeekend(new Date('9/5/2020')),
            '9/5/2020 falls on a saturday'
        );

        assert.true(
            h.isWeekend(new Date('9/6/2020')),
            '9/6/2020 falls on a sunday'
        );
    });

    test('check weekdays', function (assert) {

        assert.false(
            h.isWeekend(new Date('9/4/2020')),
            '9/5/2020 falls on a friday'
        );

        assert.false(
            h.isWeekend(new Date('9/7/2020')),
            '9/6/2020 falls on a monday'
        );
    });
});

module('getCallBacks', function () {
    test('add callbacks', function (assert) {

        var h = HollyDates();
        h.reset();

        var testMe;

        h.addByOccurance('Last Day of School', h.LAST, h.FRI, h.JUN)
            .onMatch(function(holiday)
            {
                testMe = 'fired';
            });

        assert.equal(
            typeof h._.getCallBacks()['Last Day of School'],
            'function',
            'callback should be a function'
        );

        assert.equal(
            typeof h._.getCallBacks()['no callback registered'],
            'undefined',
            'no callback for holiday should return undefined'
        );

    });
});