// 一小时的时间(ms)
export const hours = 3600000;
// 一天的时间(ms)
export const OneDay = 86400000;
// 一周的天数
export const WeekLength = 7;
// 一周的时间(ms)
export const OneWeek = OneDay * WeekLength;
// 一个月显示的周的个数
export const MonthLength = 6;
// 一年的月个数
export const YearLength = 12;
// 一周的名字
export const WeekText = '日一二三四五六';

/**
 * 通过时间戳获取年月日和星期
 * @param  {Number} time 时间戳
 * @return {Object} 返回年月日和星期
 */
export const getDate = (time) => {
    let date = new Date(time);
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        day: date.getDay(),
    };
};

/**
 * 通过年月日获取时间戳
 * @param  {Number} options.year  年
 * @param  {Number} options.month 月
 * @param  {Number} options.date  日
 * @return {Number} 返回时间戳
 */
export const getTime = ({ year, month, date }) => {
    return new Date(year, month - 1, date).getTime();
};

/**
 * 时间格式化
 * @param  {Any} date 时间戳或时间字符串或getDate返回的对象
 * @param  {String} format 格式化的字符串
 * @return {String} 返回格式化后的字符串
 */
export const dateFormat = (date, format = 'yyyy-mm-dd') => {
    if (date && date.year && date.month && date.date) date = getTime(date);
    date = new Date(date);
    const o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    if (/(w)/.test(format))
        format = format.replace(RegExp.$1, WeekText[date.getDay()]);
    for (let k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return format;
};

/**
 * 判断是否是同一月
 * @param  {Object} day1 getDate返回的对象
 * @param  {Object} day2 getDate返回的对象
 * @return {Boolean} 返回是否同一月
 */
export const isSameMonth = (day1, day2) => {
    return day1.year === day2.year && day1.month === day2.month;
};

/**
 * 判断是否是同一天
 * @param  {Object} day1 getDate返回的对象
 * @param  {Object} day2 getDate返回的对象
 * @return {Boolean} 返回是否相同
 */
export const isSameDay = (day1, day2) => {
    return isSameMonth(day1, day2) && day1.date === day2.date;
};

/**
 * 比较两个时间的大小
 * @param  {Any} time1 时间1
 * @param  {Any} time2 时间2
 * @return {Number} 返回比较结果，负数正数或零
 */
export const compareTime = (time1, time2) => {
    time1 = new Date(time1).getTime();
    time2 = new Date(time2).getTime();
    return time1 - time2;
};

/**
 * 日相关的类
 */
export class Day {
    /**
     * 初始化函数
     * @param  {Number} today 当天的时间戳
     */
    constructor(today = Date.now()) {
        this.today = today;
        this.setCurDay(today);
    }

    /**
     * 设置当前时间
     * @param {Date} time 设置的时间
     */
    setCurDay(time) {
        this.curDay = getDate(time);
    }

    /**
     * 根据格式生成标题
     * @param  {String} format 格式
     * @return {String} 格式化后当天的标题
     */
    getTitle(format = 'yyyy-MM-dd') {
        return dateFormat(this.curDay, format);
    }

    /**
     * 上一天
     * @return {Day} 返回该实例
     */
    prev() {
        this.setCurDay(getTime(this.curDay) - OneDay);
        return this;
    }

    /**
     * 下一天
     * @return {Day} 返回该实例
     */
    next() {
        this.setCurDay(getTime(this.curDay) + OneDay);
        return this;
    }

    /**
     * 设置事件
     * @param {Array} events 事件列表
     * @return {Array} 返回处理后的事件列表
     */
    setEvents(events) {
        let dayEvents = [];
        // debugger
        for (let event of events) {
            let { start, end } = event;

            let startHour = Number(start.split(':')[0]);
            let startMinite = Number(start.split(':')[1]);
            let endHour = Number(end.split(':')[0]);
            let endMinite = Number(end.split(':')[1]);
            let top = (startHour * 2 + startMinite / 30) * 21 + 42;
            let height = ((endHour - startHour) * 2 + (endMinite - startMinite) / 30) * 21;
            dayEvents.push({
                top,
                height,
                title: event.title,
                data: event
            });
        }
        return dayEvents;
    }
}

/**
 * 周相关的类
 */
export class Week {
    /**
     * 初始化函数
     * @param  {Number} today 当天的时间戳
     * @param  {Number} start 每周从星期几开始
     */
    constructor(today = Date.now(), start = 1) {
        this.today = today;
        this.start = start;
        this.setStartDay(today);
        this.updateList();
    }

    /**
     * 根据给定的时间戳设置一周的起始日
     * @param {Number} time 时间戳
     * @return {Week} 返回该实例
     */
    setStartDay(time) {
        while (new Date(time).getDay() !== this.start) {
            time -= OneDay;
        }
        this.curWeek = getDate(time);
        return this;
    }

    /**
     * 更新一周的信息
     * @return {Array} 返回一个一周数据的列表
     */
    updateList() {
        let list = [];
        let today = getDate(this.today);
        let time = getTime(this.curWeek);
        for (let i = 0; i < WeekLength; i++, time += OneDay) {
            let day = getDate(time);
            day.isToday = isSameDay(day, today);
            list.push(day);
        }
        this.list = list;
        return list;
    }

    /**
     * 获取一周范围的标题
     * @param  {String} format 格式
     * @return {String} 返回按格式的起始日到结束日
     */
    getTitle(format = 'yyyy-MM') {
        let start = dateFormat(this.list[0], format);
        let end = dateFormat(this.list[WeekLength - 1], format);
        return `${start} - ${end}`;
    }

    /**
     * 获取一周的标题
     * @param  {String} format 格式
     * @return {String} 返回按格式的一周
     */
    getWeekTitles(format = 'MM-dd') {
        return this.list.map((day) => {
            return dateFormat(day, format);
        });
    }

    /**
     * 上一周
     * @return {Week} 返回该实例
     */
    prev() {
        this.setStartDay(getTime(this.curWeek) - OneWeek).updateList();
        return this;
    }

    /**
     * 下一周
     * @return {Week} 返回该实例
     */
    next() {
        this.setStartDay(getTime(this.curWeek) + OneWeek).updateList();
        return this;
    }
}

/**
 * 月相关的类
 */
export class Month {
    /**
     * 初始化函数
     * @param  {Number} today 当天的时间戳
     * @param  {Number} start 每周从星期几开始
     */
    constructor(today = Date.now(), start = 0) {
        this.today = today;
        this.start = start;
        this.curMonth = getDate(today);
        this.curMonth.date = 1;
        this.updateList();
    }

    /**
     * 更新一月的信息
     * @return {Array} 返回一个一月数据的列表(二维数组)
     */
    updateList() {
        let list = [];
        let today = getDate(this.today);
        let time = getTime(this.curMonth);
        let week = new Week(time, this.start);
        for (let i = 0; i < MonthLength; i++) {
            let weekList = week.list;
            weekList.forEach((day) => {
                day.isToday = isSameDay(day, today);
                day.isCurMonth = isSameMonth(day, this.curMonth);
            });
            list.push(weekList);
            week.next();
        }
        this.list = list;
        return list;
    }

    /**
     * 获取一月范围的标题
     * @param  {String} format 格式
     * @return {String} 返回按格式的月标题
     */
    getTitle(format = 'yyyy-MM') {
        return dateFormat(this.curMonth, format);
    }

    /**
     * 上一月
     * @return {Month} 返回该实例
     */
    prev() {
        let { year, month } = this.curMonth;
        month -= 1;
        if (month < 1) {
            year -= 1;
            month = YearLength;
        }
        this.curMonth.year = year;
        this.curMonth.month = month;
        this.updateList();
        return this;
    }

    /**
     * 下一月
     * @return {Month} 返回该实例
     */
    next() {
        let { year, month } = this.curMonth;
        month += 1;
        if (month > YearLength) {
            year += 1;
            month = 1;
        }
        this.curMonth.year = year;
        this.curMonth.month = month;
        this.updateList();
        return this;
    }
}

/**
 * 年相关的类
 */
export class Year {
    /**
     * 初始化函数
     * @param  {Number} today 当天的时间戳
     * @param  {Number} start 每周从星期几开始
     */
    constructor(today = Date.now(), start = 0) {
        this.today = today;
        this.start = start;
        this.curYear = getDate(today);
        this.curYear.month = 1;
        this.curYear.date = 1;
        this.updateList();
    }

    /**
     * 更新一月的信息
     * @return {Array} 返回一个一月数据的列表(二维数组)
     */
    updateList() {
        let list = [];
        let today = getDate(this.today);
        let time = getTime(this.curYear);
        let month = new Month(time, this.start);
        for (let i = 0; i < YearLength; i++) {

            month.isCurMonth = isSameMonth(month.curMonth, today);
            let monthList = month.list;
            monthList.forEach((weekList) => {
                weekList.forEach((day) => {
                    day.isToday = isSameDay(day, today);
                    // day.isCurMonth = isSameMonth(day, this.curYear);
                });

            });
            list.push(monthList);
            month.next();
        }
        this.list = list;
        return list;
    }

    /**
     * 获取一月范围的标题
     * @param  {String} format 格式
     * @return {String} 返回按格式的月标题
     */
    getTitle(format = 'yyyy年') {
        return dateFormat(this.curYear, format);
    }

    /**
     * 上一月
     * @return {Year} 返回该实例
     */
    prev() {
        let { year, month } = this.curYear;
        year -= 1;
        this.curYear.year = year;
        this.updateList();
        return this;
    }

    /**
     * 下一月
     * @return {Year} 返回该实例
     */
    next() {
        let { year, month } = this.curYear;
        year += 1;
        // if (month > YearLength) {
        //     year += 1;
        //     month = 1;
        // }
        this.curYear.year = year;
        // this.curYear.month = month;
        this.updateList();
        return this;
    }
}

/**
 * 日程安排相关的类
 */
export class Schedule {
    /**
     * 初始化函数
     * @param  {Number} today  当天的时间戳
     * @param  {Number} start  每周从星期几开始
     * @param  {Array}  events 事件列表
     */
    constructor(today = Date.now(), start = 0, events = []) {
        this.today = today;
        this.start = start;
        this.day = new Day(today);
        this.week = new Week(today, start);
        this.month = new Month(today, start);
        this.year = new Year(today, start);
        this.setEvents(events);
    }

    /**
     * 设置事件
     * @param {Array} events 事件的对象列表必须含有start和end字段
     */
    setEvents(events) {

        events.sort((event1, event2) => {
            let result = compareTime(event1.start, event2.start);
            if (result === 0) return compareTime(event1.end, event2.end);
            return result;
        });
        this.events = events.reverse();
        return this;
    }

    /**
     * 获取月信息
     * @param  {Number} maxLines 事件显示最大行数
     * @return {Array} 返回一个月信息列表,每个对象含有week和table
     */
    getMonth(maxLines = Infinity) {
        return this.month.list.map(week => this.setMonthEvents(week, maxLines));
    }

    /**
     * 获取年信息
     * @param  {Number} maxLines 事件显示最大行数
     * @return {Array} 返回一个年信息列表,每个对象含有month和week
     */
    getYear(maxLines = Infinity) {
        return this.year.list.map(month => this.setYearEvents(month, maxLines));
    }

    /**
     * 获取月标题
     * @param  {String} format 格式化字符串
     * @return {String} 返回格式化后的月标题
     */
    getMonthTitle(format) {
        return this.month.getTitle(format);
    }

    /**
     * 获取年标题
     * @param  {String} format 格式化字符串
     * @return {String} 返回格式化后的月标题
     */
    getYearTitle(format) {
        return this.year.getTitle(format);
    }

    /**
     * 上一月
     * @return {Schedule} 返回该实例
     */
    prevMonth() {
            this.month.prev();
            return this;
        }
        /**
         * 上一年
         * @return {Schedule} 返回该实例
         */
    prevYear() {
        this.year.prev();
        return this;
    }

    /**
     * 下一月
     * @return {Schedule} 返回该实例
     */
    nextMonth() {
        this.month.next();
        return this;
    }

    /**
     * 下一年
     * @return {Schedule} 返回该实例
     */
    nextYear() {
        this.year.next();
        return this;
    }

    /**
     * 重置月
     * @param  {Number} today  当天的时间戳
     * @param  {Number} start  每周从星期几开始
     * @return {Schedule} 返回该实例
     */
    resetMonth(today, start) {
        this.month = new Month(today, start);
        return this;
    }


    /**
     * 重置年
     * @param  {Number} today  当天的时间戳
     * @param  {Number} start  每周从星期几开始
     * @return {Schedule} 返回该实例
     */
    resetYear(today, start) {
        this.year = new Year(today, start);
        return this;
    }

    /**
     * 获取周信息
     * @param  {Number} maxLines 事件显示最大行数
     * @return {Object} 返回一个对象含有week和table
     */
    getWeek(maxLines = Infinity) {
        return this.setWeekEvents(this.week.list, maxLines);
    }

    /**
     * 获取一周范围的标题
     * @param  {String} format 格式化字符串
     * @return {String} 返回格式化后的周范围标题
     */
    getWeekTitle(format) {
        return this.week.getTitle(format);
    }

    /**
     * 获取一周每天的标题
     * @param  {String} format 格式化字符串
     * @return {Array} 返回格式化后的每天的标题列表
     */
    getWeekTitles(format) {
        return this.week.getWeekTitles(format);
    }

    /**
     * 上一周
     * @return {Schedule} 返回该实例
     */
    prevWeek() {
        this.week.prev();
        return this;
    }

    /**
     * 下一周
     * @return {Schedule} 返回该实例
     */
    nextWeek() {
        this.week.next();
        return this;
    }

    /**
     * 重置周
     * @param  {Number} today  当天的时间戳
     * @param  {Number} start  每周从星期几开始
     * @return {Schedule} 返回该实例
     */
    resetWeek(today, start) {
        this.week = new Week(today, start);
        return this;
    }

    /**
     * 获取天信息
     * @return {Object} 返回一个含有事件信息的列表
     */
    getDay() {
        return this.day.setEvents(this.events);
    }

    /**
     * 获取当天时间对象
     * @return {Object} 返回一个getDate对象
     */
    getDayDate() {
        return this.day.curDay;
    }

    /**
     * 获取当天的标题
     * @param  {String} format 格式化字符串
     * @return {String} 返回格式化后当天的标题
     */
    getDayTitle(format) {
        return this.day.getTitle(format);
    }

    /**
     * 上一天
     * @return {Schedule} 返回该实例
     */
    prevDay() {
        this.day.prev();
        return this;
    }

    /**
     * 下一天
     * @return {Schedule} 返回该实例
     */
    nextDay() {
        this.day.next();
        return this;
    }

    /**
     * 重置日
     * @param  {Number} today  当天的时间戳
     * @return {Schedule} 返回该实例
     */
    resetDay(today) {
        this.day = new Day(today);
        return this;
    }

    /**
     * 设置日
     * @param  {Number} day 该天的时间戳
     * @return {Schedule} 返回该实例
     */
    setDay(day) {
            this.day.setCurDay(day);
            return this;
        }
        /**
         * @param {Array} month 年日历的月
         */
    setYearEvents(month) {
        //但凡有预约 就给颜色
        for (let week of month) {
            for (let day of week) {
                day.hasOrder = false;
                for (let event of this.events) {
                    let { startTime } = event;
                    day.formatDate = dateFormat(new Date(day.year, day.month - 1, day.date), 'yyyy/MM/dd');
                    //日期相同就有预约
                    let result = compareTime(day.formatDate, startTime.split(' ')[0]);
                    if (result == 0) {
                        day.hasOrder = true;
                    }
                }
            }
        }
        return {
            month
        }
    }

    /**
     * 
     * @param {Array} week 月日历的周 
     */
    setMonthEvents(week) {
        // 初始化每天的事件列表
        for (let day of week) {
            day.events = [];
        }
        // 遍历每个事件
        for (let event of this.events) {
            let { start, end, startTime } = event;

            let startHour = Number(start.split(':')[0]);
            let startMinite = Number(start.split(':')[1]);
            let endHour = Number(end.split(':')[0]);
            let endMinite = Number(end.split(':')[1]);
            let orderStart = (startHour * 2 + startMinite / 30) * 5;

            for (let day of week) {
                let top = day.events.length * 30 + 20; //(startHour * 2 + startMinite / 30) * 5
                let height = 20; //((endHour - startHour) * 2 + (endMinite - startMinite) / 30) * 5
                day.formatDate = dateFormat(new Date(day.year, day.month - 1, day.date), 'yyyy/MM/dd');

                if (startTime.split(' ')[0] === day.formatDate) {
                    day.events.push({
                        orderStart,
                        top,
                        height,
                        title: event.title,
                        data: event
                    });
                }
            }
        }

        return {
            week
        }
    }

    setWeekEvents(week, maxLines) {
        // 初始化每天的事件列表
        for (let day of week) {
            day.events = [];
        }
        // 遍历每个事件
        for (let event of this.events) {
            let { start, end, startTime } = event;

            let startHour = Number(start.split(':')[0]);
            let startMinite = Number(start.split(':')[1]);
            let endHour = Number(end.split(':')[0]);
            let endMinite = Number(end.split(':')[1]);
            let top = (startHour * 2 + startMinite / 30) * 21;
            let height = ((endHour - startHour) * 2 + (endMinite - startMinite) / 30) * 21;
            for (let day of week) {

                day.formatDate = dateFormat(new Date(day.year, day.month - 1, day.date), 'yyyy/MM/dd');
                if (startTime.split(' ')[0] === day.formatDate) {
                    day.events.push({
                        top,
                        height,
                        title: event.title,
                        data: event
                    });
                }
            }
        }

        // // 遍历每个事件
        // for (let event of this.events) {
        //     let { start, end } = event;
        //     debugger;
        //     let i;
        //     for (let day of week) {
        //         let result1 = compareTime(start, getTime(day) + OneDay);
        //         let result2 = compareTime(end, getTime(day));
        //         // 起始时间要比当天结束时间大的继续循环
        //         if (result1 >= 0) continue;
        //         // 结束时间要比当天起始时间小的跳出循环
        //         if (result2 <= 0) break;
        //         // 这里检查哪里能插入该事件
        //         if (i === undefined) {
        //             i = 0;
        //             while (day.events[i] !== undefined) i++;
        //         }
        //         day.events[i] = event;
        //     }
        // }
        // // 下边生成表格结构
        // let table = [];
        // while (true) {
        //     let count = 0;
        //     let event = undefined;
        //     let index = table.length;
        //     // 一行的信息
        //     let tr = [];
        //     for (let day of week) {
        //         if (day.events[index] === event) count++;
        //         else {
        //             if (count > 0) tr.push({ event, count });
        //             event = day.events[index];
        //             count = 1;
        //         }
        //     }
        //     if (count > 0) tr.push({ event, count });
        //     // 如果一行全是空时间则退出循环
        //     if (event === undefined && count === WeekLength) break;
        //     table.push(tr);
        //     // 当表格行数与最大限制数一致时退出循环
        //     if (table.length === maxLines) break;
        // }
        // // 统计每天未展示的事件数
        // for (let day of week) {
        //     let num = 0;
        //     for (let j = day.events.length; j >= maxLines; j--) {
        //         if (day.events[j]) num++;
        //     }
        //     day.remainder = num;
        //     day.events = day.events.filter(event => !!event);
        // }
        return {
            week,
            // table,
        }
    }
}

export default {
    Week,
    Month,
    Schedule,
}