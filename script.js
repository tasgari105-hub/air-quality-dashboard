let factories = [
    { name: "Factory A", emission: 120 },
    { name: "Factory B", emission: 80 },
    { name: "Factory C", emission: 40 }
];

let chart;
let chartA;
let chartB;
let chartC;

let aqiHistory = [];

let historyA = [];
let historyB = [];
let historyC = [];

function createCharts(){

    // AQI کلی
    let ctx = document.getElementById("aqiChart").getContext("2d");

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Total AQI',
                data: [],
                borderColor: 'red',
                fill: false
            }]
        }
    });

    // Factory A
    let ctxA = document.getElementById("factoryAChart").getContext("2d");

    chartA = new Chart(ctxA, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Factory A',
                data: [],
                borderColor: 'blue',
                fill: false
            }]
        }
    });

    // Factory B
    let ctxB = document.getElementById("factoryBChart").getContext("2d");

    chartB = new Chart(ctxB, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Factory B',
                data: [],
                borderColor: 'green',
                fill: false
            }]
        }
    });

    // Factory C
    let ctxC = document.getElementById("factoryCChart").getContext("2d");

    chartC = new Chart(ctxC, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Factory C',
                data: [],
                borderColor: 'orange',
                fill: false
            }]
        }
    });
}

function updateData(){

    // تغییر تصادفی داده‌ها
    for(let i = 0; i < factories.length; i++){

        let change = Math.floor(Math.random() * 21) - 10;

        factories[i].emission += change;

        if(factories[i].emission < 0){
            factories[i].emission = 0;
        }
    }

    // محاسبه AQI
    let totalAQI = 0;

    let maxFactory = factories[0];

    for(let i = 0; i < factories.length; i++){

        totalAQI += factories[i].emission;

        if(factories[i].emission > maxFactory.emission){
            maxFactory = factories[i];
        }
    }

    // وضعیت هوا
    let status = "";

    if(totalAQI <= 50){
        status = "Good";
    }
    else if(totalAQI <= 100){
        status = "Moderate";
    }
    else{
        status = "Unhealthy";
    }

    // نمایش اطلاعات
    document.getElementById("aqi").innerText =
        "Total AQI: " + totalAQI;

    document.getElementById("status").innerText =
        "Status: " + status;

    document.getElementById("source").innerText =
        "Main Polluter: " + maxFactory.name;

    document.getElementById("warning").innerText =
        "Industrial Pollution Monitoring Active";

    // نمایش کارخانه‌ها
    document.getElementById("factoryA").innerText =
        "Factory A: " + factories[0].emission;

    document.getElementById("factoryB").innerText =
        "Factory B: " + factories[1].emission;

    document.getElementById("factoryC").innerText =
        "Factory C: " + factories[2].emission;

    // رنگ کارت
    let card = document.getElementById("card");

    if(totalAQI <= 50){
        card.style.background = "#b6fcb6";
    }
    else if(totalAQI <= 100){
        card.style.background = "#fff3a0";
    }
    else{
        card.style.background = "#ffb3b3";
    }

    // ذخیره تاریخچه AQI
    aqiHistory.push(totalAQI);

    historyA.push(factories[0].emission);
    historyB.push(factories[1].emission);
    historyC.push(factories[2].emission);

    // محدودیت تاریخچه
    if(aqiHistory.length > 10){
        aqiHistory.shift();
        historyA.shift();
        historyB.shift();
        historyC.shift();
    }

    // آپدیت نمودار کلی
    chart.data.labels = aqiHistory.map((_, i) => i);

    chart.data.datasets[0].data = aqiHistory;

    chart.update();

    // آپدیت Factory A
    chartA.data.labels = historyA.map((_, i) => i);

    chartA.data.datasets[0].data = historyA;

    chartA.update();

    // آپدیت Factory B
    chartB.data.labels = historyB.map((_, i) => i);

    chartB.data.datasets[0].data = historyB;

    chartB.update();

    // آپدیت Factory C
    chartC.data.labels = historyC.map((_, i) => i);

    chartC.data.datasets[0].data = historyC;

    chartC.update();
}

// کنترل آلودگی
function reducePollution(){

    for(let i = 0; i < factories.length; i++){

        factories[i].emission -= 20;

        if(factories[i].emission < 0){
            factories[i].emission = 0;
        }
    }

    document.getElementById("warning").innerText =
        "Control System Activated";
}

// اجرا
createCharts();

updateData();

setInterval(updateData, 2000);