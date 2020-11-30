
const submmitBtn = document.querySelector("#loan-form");
loadEventListeners();
console.log("1");
function loadEventListeners() {
    //calculate
    submmitBtn.addEventListener('submit', calculate);
}

function calculate(e) {
    //show the result div
    try{
        let results=document.getElementById('results');
        results.style.display="block";
    }
    catch(e){
        console.log(e);
    }
    //Var
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {

        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
  
        //let loading = document.querySelector("#loading");
        document.querySelector("#loading").style.display = "block";
        // Hide loader
        document.querySelector("#loading").style.display = "none";

    } else {
        //console.log('Please check your numbers');
        showError('Please check your numbers');
    }
    
    e.preventDefault();
}

function showError(message){
    //hide the result div
    let results=document.getElementById('results');
    results.style.display="none";

    //create error node
    const errorDiv=document.createElement('div');
    errorDiv.className="alert alert-danger";
    errorDiv.appendChild(document.createTextNode(message));

    //get node
    const card=document.querySelector(".card");
    const head=document.querySelector(".heading");

    card.insertBefore(errorDiv,head);

    setTimeout(clearError,3000);
}

function clearError(){

    document.querySelector(".alert").remove();
}