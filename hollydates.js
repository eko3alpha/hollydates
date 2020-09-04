(function(window){

    window.HollyDates = function() {

        var DAYS_IN_WEEK = 7;

        var SUN = 1,
            MON = 2,
            TUE = 3,
            WED = 4,
            THU = 5,
            FRI = 6,
            SAT = 7;

        var JAN = 1,
            FEB = 2,
            MAR = 3,
            APR = 4,
            MAY = 5,
            JUN = 6,
            JUL = 7,
            AUG = 8,
            SEP = 9,
            OCT = 10,
            NOV = 11,
            DEC = 12;

        var FIRST  = 1,
            SECOND = 2,
            THIRD  = 3,
            FOURTH = 4,
            LAST   = -1;

        var CUSTOM_DATES = {
            "New Year's Day": [JAN, 1],
            "Washington's Birthday": [FEB, 17],
            "Independence Day": [JUL, 4],
            "Veterans Day": [NOV, 11],
            "Christmas": [DEC, 25],
        }

        var HOLIDAYS = {
            "Martin Luther King, Jr. Day": [THIRD, MON, JAN],
            "Memorial Day": [LAST, MON, MAY],
            "Labor Day": [FIRST, MON, SEP],
            "Columbus Day": [SECOND, MON, OCT],
            "Thanksgiving Day": [LAST, THU, NOV]
        }

        var CALLBACKS = {}

        var reset = function()
        {
            CUSTOM_DATES = {};
            HOLIDAYS = {};
            CALLBACKS = {};
        }

        var onMatch = function(holiday)
        {
            return function(callBack)
            {
                CALLBACKS[holiday] = callBack;
            }
        }

        var trigger = function(date)
        {
            if(isHoliday(date))
            {
                return;
            }

            if(isDate(date))
            {
                return;
            }

            if(typeof CALLBACKS[holiday] == 'function')
            {
                CALLBACKS[holiday](holiday);
            }
        }

        var addByOccurrence = function(holiday, occurrence, weekDay, month)
        {
            HOLIDAYS[holiday] = [occurrence, weekDay, month];
            return {'onMatch' : onMatch(holiday)};
        }

        var addByDate = function(customDate, month, date)
        {
            CUSTOM_DATES[customDate] = [month, date];
            return {'onMatch' : onMatch(customDate)};
        }

        var getMonthAWeekFromDate = function(date) {
            var newDate = new Date(date);
            newDate.setDate(date.getDate() + DAYS_IN_WEEK);
            return newDate.getMonth() + 1;
        }

        var isDate = function(date, month, day) {
            if (date.getMonth() != month - 1) {
                return false;
            }

            if (date.getDate() != day) {
                return false;
            }

            return true;
        }

        var isDay = function(date, occurrence, weekDay, month) {

            if (date.getMonth() != month - 1) {
                return false;
            }

            if (date.getDay() != weekDay - 1) {
                return false;
            }

            if (occurrence == Math.ceil(date.getDate() / DAYS_IN_WEEK)) {
                return true;
            }

            if (occurrence != LAST) {
                return false;
            }

            return month != getMonthAWeekFromDate(date);

        }

        var getRegisteredOccurrence = function(date) {
            var results = Object.keys(HOLIDAYS).filter(function(val, index) {
                var occurrence = HOLIDAYS[val][0];
                var weekDay = HOLIDAYS[val][1];
                var month = HOLIDAYS[val][2];

                if (isDay(date, occurrence, weekDay, month)) {
                    return true;
                }

                return false;
            });

            if (results) {
                return results[0];
            }

            return null;

        }

        var getRegisteredDate = function(date) {
            var results = Object.keys(CUSTOM_DATES).filter(function(val, index) {
                var month = CUSTOM_DATES[val][0];
                var day = CUSTOM_DATES[val][1];

                if (isDate(date, month, day)) {
                    return true;
                }

                return false;
            });

            if (results) {
                return results[0];
            }

            return null;
        }

        var isWeekend = function(date)
        {
            if(date.getDay() == SAT -1)
            {
                return true;
            }

            if(date.getDay() == SUN -1)
            {
                return true;
            }

            return false;
        }

        var isHoliday = function(date) {

            if (getRegisteredOccurrence(date)) {
                return true;
            }

            if (getRegisteredDate(date)) {
                return true;
            }

            return false;
        }

        var getHoliday = function(date)
        {
            var holiday;
            if (( holiday = getRegisteredOccurrence(date)) != null) {
                return holiday;
            }

            if (( holiday = getRegisteredDate(date)) != null) {
                return holiday;
            }

            return null;
        }


        var getRegisteredOccurrences = function()
        {
            return HOLIDAYS;
        }

        var getCustomDates = function()
        {
            return CUSTOM_DATES;
        }

        var getCallBacks = function()
        {
            return CALLBACKS;
        }

        return {
            'isHoliday': isHoliday,
            'isWeekend': isWeekend,
            'addByOccurrence': addByOccurrence,
            'addByDate': addByDate,
            'getHoliday': getHoliday,
            'trigger': trigger,
            'reset': reset,

            'SUN': 1,
            'MON': 2,
            'TUE': 3,
            'WED': 4,
            'THU': 5,
            'FRI': 6,
            'SAT': 7,

            'JAN': 1,
            'FEB': 2,
            'MAR': 3,
            'APR': 4,
            'MAY': 5,
            'JUN': 6,
            'JUL': 7,
            'AUG': 8,
            'SEP': 9,
            'OCT': 0,
            'NOV': 11,
            'DEC': 12,

            'FIRST': 1,
            'SECOND': 2,
            'THIRD': 3,
            'FOURTH': 4,
            'LAST': -1,

            '_': {
                'getRegisteredOccurrences': getRegisteredOccurrences,
                'getCustomDates': getCustomDates,
                'getCallBacks': getCallBacks,
                'getRegisteredDate': getRegisteredDate,
                'getRegisteredOccurrence': getRegisteredOccurrence,
                'isDay': isDay,
                'isDate': isDate,
                'getMonthAWeekFromDate': getMonthAWeekFromDate
            }
        }
    }


})(window);
