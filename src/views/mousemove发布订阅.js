export class Observer {
    constructor() {
        this.events = {};
    };
    addEvent = (type, fn) => {
        this.events[type] = fn;
    };
    fireEvent = ({ type, col, row, time }) => {
        if (this.events[type]) {
            this.events[type](col, row, time);
        }
    };
    removeEvent = (type) => {
        delete this.events[type];
    };

};
export class MouseEventHandler {
    constructor(calTypeId) {
        this.calTypeId = calTypeId;
        let observer = new Observer(),
            downRow,
            downCol,
            hasMouseDown = false;

        let handleEvent = (event) => {
            let target = event.target,
                type = event.type,
                col = target.dataset.col,
                row = target.dataset.row,
                time = target.dataset.time;
            switch (type) {
                case 'mousedown':
                    if (col && row && !hasMouseDown) {
                        //保存下鼠标点击的行和列
                        downRow = row;
                        downCol = col;
                        hasMouseDown = true;
                        observer.fireEvent({ type, col: downCol, row: downRow, time });
                    };
                    break;
                case 'mousemove':
                    //如果滑过的范围再表格内 并且与开始为同一列
                    if (row && col && col == downCol) {
                        observer.fireEvent({ type, col, row, time });
                    };
                    break;
                case 'mouseup':
                    //鼠标在同列抬起
                    if (row && col && col == downCol) {
                        observer.fireEvent({ type, col, row, time });
                    }
            }
        }
        observer.enable = () => {
            document.getElementById(this.calTypeId).onmousedown = handleEvent;
            document.getElementById(this.calTypeId).onmousemove = handleEvent;
            document.getElementById(this.calTypeId).onmouseup = handleEvent;
        };
        observer.reset = () => {
            downRow = null;
            downCol = null;
            hasMouseDown = false;
        }
        observer.clearMouseEvent = () => {
            observer.events = {};
            document.getElementById(this.calTypeId).onmousedown = null;
            document.getElementById(this.calTypeId).onmousemove = null;
            document.getElementById(this.calTypeId).onmouseup = null;
        }
        return observer;
    };
}
export const timeArray = [
    { time: '00:00', showtime: true },
    { time: '00:30', showtime: false },
    { time: '01:00', showtime: true },
    { time: '01:30', showtime: false },
    { time: '02:00', showtime: true },
    { time: '02:30', showtime: false },
    { time: '03:00', showtime: true },
    { time: '03:30', showtime: false },
    { time: '04:00', showtime: true },
    { time: '04:30', showtime: false },
    { time: '05:00', showtime: true },
    { time: '05:30', showtime: false },
    { time: '06:00', showtime: true },
    { time: '06:30', showtime: false },
    { time: '07:00', showtime: true },
    { time: '07:30', showtime: false },
    { time: '08:00', showtime: true },
    { time: '08:30', showtime: false },
    { time: '09:00', showtime: true },
    { time: '09:30', showtime: false },
    { time: '10:00', showtime: true },
    { time: '10:30', showtime: false },
    { time: '11:00', showtime: true },
    { time: '11:30', showtime: false },
    { time: '12:00', showtime: true },
    { time: '12:30', showtime: false },
    { time: '13:00', showtime: true },
    { time: '13:30', showtime: false },
    { time: '14:00', showtime: true },
    { time: '14:30', showtime: false },
    { time: '15:00', showtime: true },
    { time: '15:30', showtime: false },
    { time: '16:00', showtime: true },
    { time: '16:30', showtime: false },
    { time: '17:00', showtime: true },
    { time: '17:30', showtime: false },
    { time: '18:00', showtime: true },
    { time: '18:30', showtime: false },
    { time: '19:00', showtime: true },
    { time: '19:30', showtime: false },
    { time: '20:00', showtime: true },
    { time: '20:30', showtime: false },
    { time: '21:00', showtime: true },
    { time: '21:30', showtime: false },
    { time: '22:00', showtime: true },
    { time: '22:30', showtime: false },
    { time: '23:00', showtime: true },
    { time: '23:30', showtime: false },
];