let mortgageAmount = document.getElementById("mortgage-amount");
let interestRate = document.getElementById("interest-rate");
let mortgageTerm = document.getElementById("mortgage-term");
let repayment = document.getElementById("repayment");
let interestOnly = document.getElementById("interest-only");
let calculateButton = document.querySelector(".calculate");
let emptyResults = document.querySelector(".Empty-results");
let completedResults = document.querySelector(".Completed-results");
let monthlyPayment = document.querySelector(".value");
let totalPayment = document.querySelector(".value-total");
let errorAmount = document.querySelector(".E-amount");
let errorRate = document.querySelector(".E-rate");
let errorTerm = document.querySelector(".E-term");
let errorType = document.querySelector(".E-type");
let clearButton = document.querySelector(".clear");

calculateButton.addEventListener("click", function() {
    let amount = parseFloat(mortgageAmount.value);
    let rate = parseFloat(interestRate.value) / 100 / 12;
    let term = parseInt(mortgageTerm.value) * 12;
    
    let hasErrors = false;

    if (isNaN(amount) || amount <= 0) {
        errorAmount.style.display = "block";
        hasErrors = true;
    }
    else {
        errorAmount.style.display = "none";
    }

    if (isNaN(rate) || rate < 0) {
        errorRate.style.display = "block";
        hasErrors = true;
    }
    else{   
        errorRate.style.display = "none";
    }

    if (isNaN(term) || term <= 0) {
        errorTerm.style.display = "block";
        hasErrors = true;
    }
    else
    {
        errorTerm.style.display = "none";
    }

    if (!repayment.checked && !interestOnly.checked) {
        errorType.style.display = "block";
        hasErrors = true;
    } else {
        errorType.style.display = "none";
    }
    
    if (!hasErrors) {
        if (repayment.checked) {
            let monthly = (amount * rate) / (1 - Math.pow(1 + rate, -term));
            let total = monthly * term;
            monthlyPayment.textContent = `£${monthly.toFixed(2)}`;
            totalPayment.textContent = `£${total.toFixed(2)}`;
        } else if (interestOnly.checked) {
            let monthly = amount * rate;
            let total = (monthly * term) + amount; // Interest payments + principal
            monthlyPayment.textContent = `£${monthly.toFixed(2)}`;
            totalPayment.textContent = `£${total.toFixed(2)}`;
        }

        emptyResults.style.display = "none";
        completedResults.style.display = "block";
    }
});

clearButton.addEventListener("click", function() {
    mortgageAmount.value = "";
    interestRate.value = "";
    mortgageTerm.value = "";
    
    repayment.checked = false;
    interestOnly.checked = false;
    

    errorAmount.style.display = "none";
    errorRate.style.display = "none";
    errorTerm.style.display = "none";
    errorType.style.display = "none";
    
    emptyResults.style.display = "flex";
    completedResults.style.display = "none";
});