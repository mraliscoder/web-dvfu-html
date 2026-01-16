function setErr(fieldEl, errEl, msg) {
    fieldEl.classList.add("error");
    errEl.textContent = msg;
}
function clearErr(fieldEl, errEl) {
    fieldEl.classList.remove("error");
    errEl.textContent = "";
}
function clearErrors(form) {
    const z1xField = form.querySelector("#z1xField");
    const z1yField = form.querySelector("#z1yField");
    const z2xField = form.querySelector("#z2xField");
    const z2yField = form.querySelector("#z2yField");

    const z1xErr = form.querySelector("#z1xErr");
    const z1yErr = form.querySelector("#z1yErr");
    const z2xErr = form.querySelector("#z2xErr");
    const z2yErr = form.querySelector("#z2yErr");

    clearErr(z1xField, z1xErr);
    clearErr(z1yField, z1yErr);
    clearErr(z2xField, z2xErr);
    clearErr(z2yField, z2yErr);
    opsHint.style.display = "none";
}

function parseNum(raw) {
    const s = raw.trim().replace(",", ".");
    if (!s) return null;
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
}

function formatZero(n) {
    return Math.abs(n) < 1e-12 ? 0 : Math.floor((n*10000))/10000;
}

function formatAlg(z) {
    const sign = z.im >= 0 ? " + " : " - ";
    return formatZero(z.re) + sign + formatZero(Math.abs(z.im)) + "i";
}

function fromPolar(r, phi) {
    return {
        re: r * Math.cos(phi),
        im: r * Math.sin(phi)
    };
}
function toPolar(z) {
    return {
        r: Math.hypot(z.re, z.im),
        phi: Math.atan2(z.im, z.re)
    };
}

function formatExp(z) {
    const p = toPolar(z);
    return formatZero(p.r) + " · e^{i" + formatZero(p.phi) + "}";
}

function hideResults(form) {
    const resAddLine = form.querySelector("#resAddLine");
    const resSubLine = form.querySelector("#resSubLine");
    const resMulLine = form.querySelector("#resMulLine");
    const resAdd = form.querySelector("#resAdd");
    const resSub = form.querySelector("#resSub");
    const resMul = form.querySelector("#resMul");

    resAddLine.classList.add("hidden");
    resSubLine.classList.add("hidden");
    resMulLine.classList.add("hidden");
    resAdd.textContent = "";
    resSub.textContent = "";
    resMul.textContent = "";
}

function changeMode(form) {
    const z1xLabel = form.querySelector("#z1xLabel");
    const z1yLabel = form.querySelector("#z1yLabel");
    const z2xLabel = form.querySelector("#z2xLabel");
    const z2yLabel = form.querySelector("#z2yLabel");
    const algBox = form.querySelector("#AlgBox");
    const expBox = form.querySelector("#ExpBox");


    if (formSelect.value === "alg") {
        z1xLabel.textContent = "a";
        z1yLabel.textContent = "b";
        z2xLabel.textContent = "a";
        z2yLabel.textContent = "b";
        algBox.classList.remove("hidden");
        expBox.classList.add("hidden");
    } else {
        z1xLabel.textContent = "r (>= 0)";
        z1yLabel.textContent = "φ (рад)";
        z2xLabel.textContent = "r (>= 0)";
        z2yLabel.textContent = "φ (рад)";
        algBox.classList.add("hidden");
        expBox.classList.remove("hidden");
    }
}

function readComplex(form) {
    clearErrors(form);

    const z1xField = form.querySelector("#z1xField");
    const z1yField = form.querySelector("#z1yField");
    const z2xField = form.querySelector("#z2xField");
    const z2yField = form.querySelector("#z2yField");

    const z1xErr = form.querySelector("#z1xErr");
    const z1yErr = form.querySelector("#z1yErr");
    const z2xErr = form.querySelector("#z2xErr");
    const z2yErr = form.querySelector("#z2yErr");


    const a1 = parseNum(form.z1x.value);
    const b1 = parseNum(form.z1y.value);
    const a2 = parseNum(form.z2x.value);
    const b2 = parseNum(form.z2y.value);

    let ok = true;
    if (a1 === null) { ok = false; setErr(z1xField, z1xErr, "Введите число"); }
    if (b1 === null) { ok = false; setErr(z1yField, z1yErr, "Введите число"); }
    if (a2 === null) { ok = false; setErr(z2xField, z2xErr, "Введите число"); }
    if (b2 === null) { ok = false; setErr(z2yField, z2yErr, "Введите число"); }
    if (!ok) return { ok: false };

    const type = form.type.value;
    if (type === "alg") {
        return { ok: true, z1: { re: a1, im: b1 }, z2: { re: a2, im: b2 } };
    }

    if (a1 < 0) { ok = false; setErr(z1xField, z1xErr, "r не может быть < 0"); }
    if (a2 < 0) { ok = false; setErr(z2xField, z2xErr, "r не может быть < 0"); }
    if (!ok) return { ok: false };

    return { ok: true, z1: fromPolar(a1, b1), z2: fromPolar(a2, b2) };
}

function add(z1, z2) {
    return { re: z1.re + z2.re, im: z1.im + z2.im };
}
function sub(z1, z2) {
    return { re: z1.re - z2.re, im: z1.im - z2.im };
}
function mul(z1, z2) {
    return { re: z1.re*z2.re - z1.im*z2.im, im: z1.re*z2.im + z1.im*z2.re };
}

function format(z, type) {
    return type === "alg" ? formatAlg(z) : formatExp(z);
}

function onShow(form) {
    changeMode(form);
    clearErrors(form);
    hideResults(form);
}

function onClear(e) {
    clearErrors(e.target);
    hideResults(e.target);
}

function onSubmit(e) {
    e.preventDefault();

    hideResults(e.target);
    clearErrors(e.target);

    const opsHint = e.target.querySelector("#opsHint");    
    const anyOp = e.target.ops_sum.checked || e.target.ops_sub.checked || e.target.ops_mul.checked;
    if (!anyOp) opsHint.style.display = "inline";

    const data = readComplex(e.target);
    if (!data.ok || !anyOp) return;

    const z1 = data.z1, z2 = data.z2;


    const resAddLine = form.querySelector("#resAddLine");
    const resSubLine = form.querySelector("#resSubLine");
    const resMulLine = form.querySelector("#resMulLine");
    const resAdd = form.querySelector("#resAdd");
    const resSub = form.querySelector("#resSub");
    const resMul = form.querySelector("#resMul");

    if (e.target.ops_sum.checked) {
        resAdd.textContent = format(add(z1, z2, e.target.type.value), e.target.type.value);
        resAddLine.classList.remove("hidden");
    }
    if (e.target.ops_sub.checked) {
        resSub.textContent = format(sub(z1, z2, e.target.type.value), e.target.type.value);
        resSubLine.classList.remove("hidden");
    }
    if (e.target.ops_mul.checked) {
        resMul.textContent = format(mul(z1, z2, e.target.type.value), e.target.type.value);
        resMulLine.classList.remove("hidden");
    }
}

const form = document.querySelector("#form");

showBtn.addEventListener("click", () => onShow(form));
form.addEventListener('submit', onSubmit);
form.addEventListener('reset', onClear);

Object.keys(['z1x', 'z1y', 'z2x', 'z2y']).forEach((elkey) => {
    form.elements[elkey].addEventListener('focus', (e) => {        
        clearErr(e.target.parentElement, e.target.nextElementSibling);
    })
});