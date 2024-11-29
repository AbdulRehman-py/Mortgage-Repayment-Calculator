// seclecting all the input fields for taking user input

const mortage_amount = document.getElementById('mortgage-amount');
const interest_rate = document.getElementById('interest-rate');
const loan_years = document.getElementById('mortgage-term');
const check_box_repayment = document.getElementById('repayment');
const check_box_interset = document.getElementById('interest-only');
const clear_all_fields = document.querySelector('.clear-all');
const monthly_Payment_result = document.querySelector('.monthly-payment');
const total_payment_result = document.querySelector('.total-payment');
const replace_loan_montly = document.querySelector('.shift-load-monthly');
const button = document.querySelector('.button');
const section = document.getElementById('final-results');
const section2 = document.getElementById('result-section');
const button2 = document.querySelectorAll('.button-c');


function getvalue() {
    // getting the value of the input fields
   
        const mortage_amount_value = mortage_amount.value;
        const interest_rate_value = interest_rate.value;
        const loan_years_value = loan_years.value;

        return {
            mortage_amount_value,
            interest_rate_value,
            loan_years_value
        }

}

function clearFields() {
    mortage_amount.value = '';
    interest_rate.value = '';
    loan_years.value = '';
    monthly_Payment_result.textContent = '';
    total_payment_result.textContent = '';
    check_box_repayment.checked = false;
    check_box_interset.checked = false;
}


function repaymentCalculation() {
    const { mortage_amount_value, interest_rate_value, loan_years_value } = getvalue();

    const loan_amount = parseFloat(mortage_amount_value);
    const interest_rate = parseFloat(interest_rate_value) / 100; // Convert percentage to decimal
    const loan_years_term = parseInt(loan_years_value);


    const interest_rate_per_month = interest_rate / 12; // monthly interest rate which is currently 5 percent and by dividing it by 12 we get the monthly interest rate
    const numberOfPayments = loan_years_term * 12; // geting the total number of payments by multiplying the loan years (25) by 12

    // calculating the monthly payment

    const compoundInterestFactor = Math.pow(1 + interest_rate_per_month, numberOfPayments);

    const numerator_factor = loan_amount * interest_rate_per_month * compoundInterestFactor;

    const denominator_factor = compoundInterestFactor - 1;


    const monthly_payment = numerator_factor / denominator_factor;

    const total_payment = monthly_payment * numberOfPayments;
    
    const only_interset_rate = total_payment - loan_amount;

    return {
        monthly_payment: monthly_payment.toFixed(2),
        total_payment: total_payment.toFixed(2),
        only_interset_rate: only_interset_rate.toFixed(2)
    };
}






function checkBox_repayment () {
   
    const { monthly_payment, total_payment } = repaymentCalculation();
    total_payment_result.textContent = '';
    monthly_Payment_result.textContent = `${monthly_payment}`;
    total_payment_result.textContent = `${total_payment}`;

}

function checkBox_interset_only () {
    
    const { only_interset_rate } = repaymentCalculation();
    replace_loan_montly.textContent = '';
    replace_loan_montly.textContent = 'Your total interset payment';
    monthly_Payment_result.textContent = `${only_interset_rate}`;
    total_payment_result.textContent = "0.00";
}


function checkBoxes () {
    
    if (check_box_repayment.checked) {
        checkBox_repayment();
        console.log('repayment checked');
    } else if (check_box_interset.checked) {
        checkBox_interset_only();
        console.log('interest only checked');
    }
}




// --------------------------------------

// Add event listeners to checkboxes to ensure only one can be checked at a time
check_box_repayment.addEventListener('change', () => {
    if (check_box_repayment.checked) {
        check_box_interset.checked = false;
    }
});

check_box_interset.addEventListener('change', () => {
    if (check_box_interset.checked) {
        check_box_repayment.checked = false;
    }
});


function validateInput() {
    const { mortage_amount_value, interest_rate_value, loan_years_value } = getvalue();
    let isvalid = true;

    if (!mortage_amount_value) {
        mortage_amount.style.border = '1px solid red';
        isvalid = false;
    } else {
        mortage_amount.style.border = '';
    }

    if (!interest_rate_value) {
        interest_rate.style.border = '1px solid red';
        isvalid = false;
    } else {
        interest_rate.style.border = '';
    }

    if (!loan_years_value) {
        loan_years.style.border = '1px solid red';
        isvalid = false;
    }else {
        loan_years.style.border = '';
    }

   

    return isvalid;
}

function buttonClick() {
   button.addEventListener ('click', (e) => {
        e.preventDefault();
        if (validateInput()) {
            section.classList.remove('hide');
            section2.classList.add('hide2');
            checkBoxes();
        } else  {
            console.log('Please fill all the fields');
        }
   })
}

buttonClick();

clear_all_fields.addEventListener('click', clearFields);