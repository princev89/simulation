var stepno = 0;
var result = ["0.2 ml (V0)", "5.0 ml", "7.2 ml", "11.1 ml", "13.2ml", "19.3(v∞)"];

var iscompleted = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var processno = 1;
const doc = document.querySelector("body").innerHTML;

function startSimulator() {
    // localStorage.repeatCount++;
    document.getElementById("back").innerHTML = `Step No: ` + processno;
    document.getElementById("animation_burette").style.display = "none";
    document.getElementById("repeatAgain").style.display = "none";
    document.getElementById("next").innerHTML = "";
    document.getElementById("ouputValue").style.display = "none";
    main.style.display = "none";
    simulator.style.display = "block";
    process.innerHTML = "Add Appratus by clicking button named <span>ADD Appratus<span>";
}

document.getElementById("experimentname").innerHTML = "To determine the rate constant of the hydrolysis of Ethyl acetate using an acid as a catalyst.";

function addAppratus() {
    document.getElementById("add_appratus_menu").style.display = "block";
}

function back() {
    getStepValue();
}

function addAppratusOk() {
    document.getElementById("add_appratus").style.display = "none";
    document.getElementById("add_appratus_menu").style.display = "none";
    if (stepno === 0) {
        stepno = 1;
        process.innerHTML = "Select a Reagent Bottle & HCL.";
    }
}

function hclBottle() {
    if (isdone(2)) {
        iscompleted[2] = 1;
        process.innerHTML = "Select Ethyl Acetate and add into Reagent Bottle";
        stepno = 3;
        document.getElementById("hcl_bottle").classList.toggle("hcl_bottle_animation");
        document.getElementById("reagentbottle").classList.toggle("reagentbottle_animation");
    } else {
        window.reload();
    }

}

function ethyleacitate() {
    if (isdone(4)) {
        iscompleted[4] = 1;
        document.getElementById("ethyleacitate").classList.toggle("ethyleacitate_bottle_animation");
        process.innerHTML = "Stlr the mixture";
        next.innerHTML = "Stirr mixture";
        next.classList.toggle("stlr");
    } else {
        window.reload();
    }


}

function nextStep() {
    switch (next.className) {
        case "stlr":
            if (isdone(5)) {
                iscompleted[5] = 1;
                document.getElementById("reagentbottle").classList.toggle("stlr");
                document.getElementById("ethyleacitate").style.display = "none";
                process.innerHTML = "Add 10(ml) of mixture in 100(ml) conical flask containing ice.";
                next.innerHTML = "";
                next.classList.remove("stlr");
            } else {
                window.reload();
            }

            break;
        case "addphenolpthalein":
            if (isdone(7)) {
                iscompleted[7] = 1;
                document.getElementById("reagentbottle").style.display = "none";
                document.getElementById("peppet").style.display = "none";
                process.innerHTML = "Bring Conical Flask under the burette.";
                setTimeout(function() {
                    document.getElementById("peppet").style.display = "block";
                }, 1000);
                next.style.display = "none";
            } else {
                window.reload();
            }
            break;
        case "fillnaoh":
            if (isdone(10)) {
                iscompleted[10] = 1;
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
            } else {
                window.reload();
            }

            break;
        case "showgraph":
            document.getElementById("animation_burette").style.display = "none";
            document.getElementById("table").style.display = "none";
            document.getElementById("graph_div").style.display = "block";
            document.getElementById("animate_div").style.backgroundColor = "white";
            drawChart();
            break;
        case "fillnaohdrop":
            if (isdone(11)) {
                iscompleted[11] = 1;
                document.getElementById("peppet").style.display = "none";
                document.getElementById("naoh").style.display = "none";
                document.getElementById("conical_flask_png").style.display = "none";
                document.getElementById("burette").style.display = "none";
                document.getElementById("animation_burette").style.display = "block";
                document.getElementById("animation_burette").style.bottom = "13%";
                document.getElementById("animation_burette").classList.toggle("animation_burette");
                setTimeout(function() {
                    document.getElementById("animation_burette").setAttribute("src", "./images/objects/burette/image_part_017.png");
                    document.getElementById("repeatAgain").style.display = "block";
                    if (processno < 6) {
                        process.innerHTML = "Repeat process " + (6 - processno) + " times.";
                    } else {
                        process.innerHTML = "Experiment is completed.";
                    }
                    document.getElementById("ouputValue").style.display = "block";
                    document.getElementById("ouputValue").innerHTML = result[processno - 1];
                    if (processno === "5") {
                        process.innerHTML = "Remaining solution to be kept on water bath at 60.c for 10 min and cool down then repeat steps for calculating v∞.";
                    }
                    if (processno === "6") {

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
            } else {
                window.reload();
            }
            break;


    }
}





function putOnTable(id) {

    switch (id) {
        case 'reagent_bottle_icon':
            iscompleted[0] = 1;
            document.getElementById("reagentbottle").style.display = "block";
            break;
        case 'conical_flask':
            if (isdone(6)) {
                iscompleted[6] = 1;
                document.getElementById("conical_flask_png").style.left = "50%";
                document.getElementById("conical_flask_png").style.display = "block";
                document.getElementById("reagentbottle").style.left = "10%";
                document.getElementById("peppet").classList.toggle("animatepeppet");
                document.getElementById("peppet").style.display = "block";
                document.getElementById("conical_flask_png").classList.toggle("conical_flask_animate");
                process.innerHTML = "In Solution add some drops of phenolphthalein Indicator.";
                next.innerHTML = "Add Phenolpthalein";
                next.classList.toggle("addphenolpthalein");
            } else {
                window.reload();
            }
            break;
        case 'ethyleacitate_icon':
            if (isdone(3)) {
                iscompleted[3] = 1;
                document.getElementById("hcl_bottle").style.display = "none";
                document.getElementById("ethyleacitate").style.display = "block";
            } else {
                window.reload();
            }
            break;
        case 'hcl_bottle_icon':
            if (isdone(1)) {
                iscompleted[1] = 1;
                process.innerHTML = "Add 100(ml) of 0.1 N HCL into Reagent Bottle";
                stepno = 2;
                document.getElementById("hcl_bottle").style.display = "block";

            } else {
                window.reload();
            }
            break;
        case 'naoh_icon':
            if (isdone(9)) {
                iscompleted[9] = 1;
                document.getElementById("naoh").style.display = "block";
                process.innerHTML = "Fill the burette with NaOH.";
                next.classList.remove("addphenolpthalein");
                document.getElementById("conical_flask_png").style.display = "none";
                next.style.display = "block";
                next.classList.toggle("fillnaoh");
                next.innerHTML = "Fill NaOH";
            } else {
                window.reload();
            }

            break;
        case 'burette_icon':
            if (isdone(8)) {
                iscompleted[8] = 1;
                document.getElementById("burette").style.display = "block";
                document.getElementById("peppet").style.display = "none";
                document.getElementById("conical_flask_png").style.display = "none";
                process.innerHTML = "Select NaOH bottle.";

            } else {
                window.reload();
            }
            break;

    }
}

function showanimate(id) {
    var elem = document.getElementById("beaker");
    elem.style.display = "block";
}

function imageId(id) {
    document.getElementById(id).style.opacity = "0.3";
    var src = "./images/icons/" + id + ".png"
    var elem = document.createElement("img");
    elem.setAttribute("src", src);
    elem.setAttribute("height", "80");
    elem.setAttribute("width", "80");
    elem.setAttribute("id", id);
    elem.setAttribute("onclick", "putOnTable(this.id)");
    document.getElementById("appratus_area").appendChild(elem);
}

function isdone(i) {
    for (j = 0; j < i; j++) {
        if (iscompleted[j] == 0 || iscompleted[i] == 1) {
            // window.reload();
            processno--;
            alert("Your have done wrong procedure, You need to restart simulator");
            return false;
        }
    }
    return true;
}



if (!localStorage.repeatCount) {
    localStorage.setItem("repeatCount", 0);
} else if (localStorage.repeatCount === 6) {
    localStorage.setItem("repeatCount", 0);
}
// step = prompt("Enter the step number, If start new experment enter 1");
// localStorage.setItem("repeatCount", step);
// if (step > 1) startSimulator();
var start_btn = document.getElementById("start_button");


function getStepValue() {
    if (processno == 1) {
        document.getElementById("experiment_value").style.display = "none";
    } else {
        document.getElementById("experiment_value").style.display = "inline-block";

    }
    document.getElementById("alert-div").style.display = "grid";
    processno = document.getElementById("stepvalue").value;

    if (processno > 6 || processno < 1) {

    } else {

        document.getElementById("alert-div").style.display = "none";
        document.getElementById("back").innerHTML = `Step No: ` + processno;

    }
    document.getElementById("back").innerHTML = `Step No: ` + processno;
}




function reload() {
    // document.getElementById("alert-div").style.display = "block";
    processno++;
    if (processno > 6) {
        document.getElementById("repeatAgain").style.display = "none";
    }
    document.querySelector("body").innerHTML = doc;
    for (i = 0; i < 13; i++) iscompleted[i] = 0;
    startSimulator();
}
var isdisplayedtable = 0;

function displayTableValue() {
    document.getElementById("experiment_table_hover").innerHTML = "";
    for (i = 0; i < processno - 1; i++) {
        var elem = document.createElement("p");
        elem.innerHTML = `Step ` + (i + 1) + ` : ` + result[i] + `<br>`;

        elem.style.fontSize = "20px";
        elem.style.fontWeight = "800";
        elem.style.float = "left";
        elem.style.margin = "0px 4px";
        document.getElementById("experiment_table_hover").appendChild(elem);

    }
    if (isdisplayedtable) {
        document.getElementById("experiment_table_hover").style.display = "none";
        isdisplayedtable = 0;
    } else {
        document.getElementById("experiment_table_hover").style.display = "grid";
        isdisplayedtable = 1;
    }
}

if (processno == 1) {
    document.getElementById("experiment_value").style.display = "none";
} else {
    document.getElementById("experiment_value").style.display = "inline-block";

}
