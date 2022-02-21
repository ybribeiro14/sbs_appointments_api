"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
var generateTimesNeeds = function (time, grids) {
    try {
        var timesGridsNeeds = [];
        var newTime = time;
        for (var index = 0; index < grids; index++) {
            if ((0, date_fns_1.format)(time, 'yyyy-MM-dd') !== (0, date_fns_1.format)(newTime, 'yyyy-MM-dd')) {
                throw new Error('Não há espaço suficiente na grade para este agendamento');
            }
            var formatedTime = (0, date_fns_1.format)(newTime, 'HH:mm');
            timesGridsNeeds.push(formatedTime);
            newTime = (0, date_fns_1.addMinutes)(newTime, 30);
        }
        return timesGridsNeeds;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.default = generateTimesNeeds;
