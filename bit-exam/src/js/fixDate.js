import moment from "moment-timezone";

function fixDate(data) {
    // console.log('DUOMENYS ', data)
    return data.map((e, i) =>  {
        return({
            id: e.id,
            renginys: e.renginys,
            kaina: e.kaina,
            data: moment.tz(e.data, "Europe/Vilnius").format('YYYY-MM-DD'),
            laikas: e.laikas,
            renginioadresas: e.renginioadresas,
            vietostipas: e.vietostipas,
            vietosnr: e.vietosnr,
        })
    })
}

export default fixDate;