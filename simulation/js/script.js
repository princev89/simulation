var stepno = 0;
var result = ["0.2 ml (V0)", "5.0 ml", "7.2 ml", "11.1 ml", "13.2ml", "19.3(v∞)"];
if (!localStorage.repeatCount) {
    localStorage.setItem("repeatCount", 0);
} else if (localStorage.repeatCount === 6) {
    localStorage.setItem("repeatCount", 0);
}
step = prompt("Enter the step number, If start new experment enter 1")
if (step == 1) {
    localStorage.setItem("repeatCount", 0);
} else if (step > 1) startSimulator();
11

function startSimulator() {

    console.log(localStorage.repeatCount);
    localStorage.repeatCount++;
    document.getElementById("animation_burette").style.display = "none";
    document.getElementById("repeatAgain").style.display = "none";
    document.getElementById("next").innerHTML = "";
    document.getElementById("ouputValue").style.display = "none";
    main.style.display = "none";
    simulator.style.display = "block";
    process.innerHTML = "Add Appratus by clicking button name ADD Appratus <br> and select hcl and reagent bottle.";
}

document.getElementById("experimentname").innerHTML = "To determine the rate constant of the hydrolysis of Ethyl acetate using an acid as a catalyst.";

document.getElementById("add_appratus").addEventListener("click", function() {
    document.getElementById("add_appratus_menu").style.display = "block";
});

document.getElementById("back").addEventListener("click", function() {
    document.getElementById("simulator").style.display = "none";
    document.getElementById("main").style.display = "flex";
    localStorage.repeatCount = 0;
});

document.getElementById("add_appratus_ok").addEventListener("click", function() {
    document.getElementById("add_appratus_menu").style.display = "none";
    if (stepno === 0) {
        stepno = 1;
        process.innerHTML = "Select a Reagent Bottle & HCL.";
    }
});
document.getElementById("hcl_bottle").addEventListener("click", function() {
    process.innerHTML = "Select Ethyl Acetate and add into Reagent Bottle";
    stepno = 3;
    document.getElementById("hcl_bottle").classList.toggle("hcl_bottle_animation");
    document.getElementById("reagentbottle").classList.toggle("reagentbottle_animation");
});
document.getElementById("ethyleacitate").addEventListener("click", function() {
    document.getElementById("ethyleacitate").classList.toggle("ethyleacitate_bottle_animation");
    process.innerHTML = "Stlr the mixture";
    next.innerHTML = "Strl mixture";
    next.classList.toggle("stlr");
});

document.getElementById("next").addEventListener("click", function() {
    switch (next.className) {
        case "stlr":
            document.getElementById("reagentbottle").classList.toggle("stlr");
            document.getElementById("ethyleacitate").style.display = "none";
            process.innerHTML = "Add 10(ml) of mixture in 100(ml) conical flask containing ice.";
            next.innerHTML = "";
            next.classList.remove("stlr");
            break;
        case "addphenolpthalein":
            document.getElementById("reagentbottle").style.display = "none";
            document.getElementById("peppet").style.display = "none";
            process.innerHTML = "Bring Conical Flask under the burette.";
            setTimeout(function() {
                document.getElementById("peppet").style.display = "block";
            }, 1000);
            next.style.display = "none";
            break;
        case "fillnaoh":
            document.getElementById("peppet").classList.remove("animatepeppet");
            document.getElementById("peppet").style.display = "block";
            document.getElementById("peppet").style.left = "45%";
            document.getElementById("peppet").style.bottom = "0%";
            document.getElementById("conical_flask_png").style.display = "none";
            document.getElementById("peppet").classList.toggle("dropnaoh");
            process.innerHTML = "Start adding NaOH drop until color of the solution become pink.";
            next.innerHTML = "Start Adding";
            next.classList.remove("fillnaoh");
            setTimeout(function() {
                document.getElementById("burette").style.display = "none";
                document.getElementById("animation_burette").style.display = "block";
                document.getElementById("animation_burette").style.bottom = "10%";
            }, 4000);
            next.classList.toggle("fillnaohdrop");
            break;
        case "showgraph":
            document.getElementById("animation_burette").style.display = "none";
            document.getElementById("table").style.display = "none";
            document.getElementById("graph_div").style.display = "block";
            document.getElementById("animate_div").style.backgroundColor = "white";
            drawChart();
            break;
        case "fillnaohdrop":
            document.getElementById("peppet").style.display = "none";
            document.getElementById("naoh").style.display = "none";
            document.getElementById("conical_flask_png").style.display = "none";
            document.getElementById("burette").style.display = "none";
            document.getElementById("animation_burette").style.display = "block";
            document.getElementById("animation_burette").style.bottom = "13%";
            document.getElementById("animation_burette").classList.toggle("animation_burette");
            setTimeout(function() {
                document.getElementById("animation_burette").setAttribute("src", "../images/objects/burette/image_part_017.png");
                document.getElementById("repeatAgain").style.display = "block";
                process.innerHTML = "Repeat process " + (6 - localStorage.repeatCount) + " times.";
                document.getElementById("ouputValue").style.display = "block";
                document.getElementById("ouputValue").innerHTML = result[localStorage.repeatCount - 1];
                if (localStorage.repeatCount === "5") {
                    process.innerHTML = "heat and cold";
                }
                if (localStorage.repeatCount === "6") {

                    document.getElementById("repeatAgain").style.display = "none";
                    document.getElementById("next").style.display = "none";
                    document.getElementById("ouputValue").style.display = "none";

                    document.getElementById("animation_burette").style.display = "none";
                    document.getElementById("table").style.display = "none";
                    document.getElementById("graph_div").style.display = "block";
                    document.getElementById("animate_div").style.backgroundColor = "white";
                    drawChart();
                }
            }, 5000);


    }
});



function putOnTable(id) {

    switch (id) {
        case 'reagent_bottle_icon':
            document.getElementById("reagentbottle").style.display = "block";
            break;
        case 'conical_flask':
            document.getElementById("conical_flask_png").style.left = "50%";
            document.getElementById("conical_flask_png").style.display = "block";
            document.getElementById("reagentbottle").style.left = "10%";
            document.getElementById("peppet").classList.toggle("animatepeppet");
            document.getElementById("peppet").style.display = "block";
            document.getElementById("conical_flask_png").classList.toggle("conical_flask_animate");
            process.innerHTML = "In Solution add some drops of phenolphthalein Indicator.";
            next.innerHTML = "Add Phenolpthalein";
            next.classList.toggle("addphenolpthalein");
            break;
        case 'ethyleacitate_icon':
            document.getElementById("hcl_bottle").style.display = "none";
            document.getElementById("ethyleacitate").style.display = "block";
            break;
        case 'hcl_bottle_icon':
            process.innerHTML = "Add 100(ml) of 0.1 N HCL into Reagent Bottle";
            stepno = 2;
            document.getElementById("hcl_bottle").style.display = "block";
            break;
        case 'naoh_icon':
            document.getElementById("naoh").style.display = "block";
            process.innerHTML = "Fill the burette with NaOH.";
            next.classList.remove("addphenolpthalein");
            document.getElementById("conical_flask_png").style.display = "none";
            next.style.display = "block";
            next.classList.toggle("fillnaoh");
            next.innerHTML = "Fill NaOH";
            break;
        case 'burette_icon':
            document.getElementById("burette").style.display = "block";
            document.getElementById("peppet").style.display = "none";
            document.getElementById("conical_flask_png").style.display = "none";
            process.innerHTML = "Select NaOH bottle.";
            break;
    }
}

function showanimate(id) {
    var elem = document.getElementById("beaker");
    elem.style.display = "block";
}

function imageId(id) {
    var src = "./images/icons/" + id + ".png"
    var elem = document.createElement("img");
    elem.setAttribute("src", src);
    elem.setAttribute("height", "80");
    elem.setAttribute("width", "80");
    elem.setAttribute("id", id);
    elem.setAttribute("onclick", "putOnTable(this.id)");
    document.getElementById("appratus_area").appendChild(elem);
}






google.charts.load('current', { 'packages': ['line'] });
var item = document.getElementById('graph')

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Time (min)');
    data.addColumn('number', 'Log(V∞-Vt)');
    data.addRows([
        [0, 1.28],
        [10, 1.155],
        [20, 1.03],
        [30, 0.914],
        [40, 0.785],

    ]);
    var options = {
        chart: {
            title: 'graph for rate constant of hydrolysis of ester',
            subtitle: 'at (~28) degree celsius'
        },
        width: 700,
        height: 400
    };

    var chart = new google.charts.Line(document.getElementById('linechart_material'));

    chart.draw(data, google.charts.Line.convertOptions(options));
};