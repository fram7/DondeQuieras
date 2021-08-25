import uuid from 'uuid/v4'; //Genera un Id unico npm i uuid

export const getSemanaIX = (indicador) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let fechaHoy = new Date();
    let dia = fechaHoy.getDay();

    if (days[fechaHoy.getDay()] == 'Saturday') {
        dia = -1; //Para que  muestre el lunes de la siguiente semana
    }

    let fechaLunes = addDays(fechaHoy, 1 - dia);
    fechaLunes = addDays(fechaLunes, 7 * indicador);

    return getSemana(fechaLunes);
}

const addDays = (date, days) => {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
}

const getSemana = (fechaLunes) => {
    let semana = [
        { id: uuid(), dia: "Lunes", fecha: fechaLunes.toShortDate() },
        { id: uuid(), dia: "Martes", fecha: addDays(fechaLunes, 1).toShortDate() },
        { id: uuid(), dia: "Miercoles", fecha: addDays(fechaLunes, 2).toShortDate() },
        { id: uuid(), dia: "Jueves", fecha: addDays(fechaLunes, 3).toShortDate() },
        { id: uuid(), dia: "Viernes", fecha: addDays(fechaLunes, 4).toShortDate() },
    ];
    return semana;
}

Date.prototype.toShortDate = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
};

