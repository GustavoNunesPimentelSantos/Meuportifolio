function diffYMD(d1, d2) {
    let start = new Date(d1);
    let end = new Date(d2);

    let anos = end.getFullYear() - start.getFullYear();
    let meses = end.getMonth() - start.getMonth();
    let dias = end.getDate() - start.getDate();

    if (dias < 0) {
        meses--;
        let prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        dias += prevMonth.getDate();
    }

    if (meses < 0) {
        anos--;
        meses += 12;
    }

    return { anos, meses, dias };
}

function isLeap(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function calcular() {
    let d1 = new Date(document.getElementById("date1").value);
    let d2 = new Date(document.getElementById("date2").value);

    if (isNaN(d1) || isNaN(d2)) {
        document.getElementById("resultado").innerHTML = "Selecione as duas datas.";
        return;
    }

    let start = d1 < d2 ? d1 : d2;
    let end = d1 < d2 ? d2 : d1;

    let ymd = diffYMD(start, end);

    let diffMs = Math.abs(end - start);

    let totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    let hours = Math.floor(diffMs / (1000 * 60 * 60));
    let minutes = Math.floor(diffMs / (1000 * 60));
    let seconds = Math.floor(diffMs / 1000);

    let weekday = start.toLocaleDateString("pt-BR", { weekday: "long" });

    let temp = new Date(start);
    let businessDays = 0;

    while (temp <= end) {
        let day = temp.getDay();
        if (day !== 0 && day !== 6) businessDays++;
        temp.setDate(temp.getDate() + 1);
    }

    document.getElementById("resultado").innerHTML = `
        <b>📅 Diferença exata:</b><br>
        ${ymd.anos} anos, ${ymd.meses} meses e ${ymd.dias} dias<br><br>

        <b>📊 Total:</b><br>
        ${totalDays} dias<br>
        ${hours} horas<br>
        ${minutes} minutos<br>
        ${seconds} segundos<br><br>

        <b>📆 Dia da semana:</b> ${weekday}<br>
        <b>💼 Dias úteis:</b> ${businessDays}<br>
        <b>🧮 Ano inicial bissexto?</b> ${isLeap(start.getFullYear()) ? "Sim" : "Não"}<br><br>

        <b>📌 Data inicial:</b> ${start.toLocaleDateString("pt-BR")}<br>
        <b>📌 Data final:</b> ${end.toLocaleDateString("pt-BR")}
    `;
}

function somarDias() {
    let d1 = new Date(document.getElementById("date1").value);
    let dias = parseInt(document.getElementById("dias").value);

    if (isNaN(d1) || isNaN(dias)) return;

    let result = new Date(d1);
    result.setDate(result.getDate() + dias);

    document.getElementById("resultado").innerHTML = `
        <b>📅 Nova data:</b> ${result.toLocaleDateString("pt-BR")}<br>
        <b>📆 Dia da semana:</b> ${result.toLocaleDateString("pt-BR", { weekday: "long" })}<br>
        <b>🧮 Ano bissexto?</b> ${isLeap(result.getFullYear()) ? "Sim" : "Não"}
    `;
}
