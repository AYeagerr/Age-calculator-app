'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var errorMessages = document.querySelectorAll('.error-message');

    // Hide all error messages initially
    errorMessages.forEach(function (error) {
        error.style.display = 'none';
    });

    var dayInput = document.getElementById('day');
    var monthInput = document.getElementById('month');
    var yearInput = document.getElementById('year');
    var calculateButton = document.querySelector('.circle-btn');

    calculateButton.addEventListener('click', function () {
        var day = parseInt(dayInput.value, 10);
        var month = parseInt(monthInput.value, 10);
        var year = parseInt(yearInput.value, 10);

        var valid = true;

        // Clear previous errors
        clearErrors();

        if (isNaN(day) || day < 1 || day > 31) {
            showError(dayInput, 'day-error', 'Please enter a valid day.');
            valid = false;
        }

        if (isNaN(month) || month < 1 || month > 12) {
            showError(monthInput, 'month-error', 'Please enter a valid month.');
            valid = false;
        }

        if (isNaN(year) || year < 1) {
            showError(yearInput, 'year-error', 'Please enter a valid year.');
            valid = false;
        }

        if (valid) {
            var birthDate = new Date(year, month - 1, day);
            var today = new Date();

            var age = calculateAge(birthDate, today);

            document.getElementById('y').textContent = age.years;
            document.getElementById('m').textContent = age.months;
            document.getElementById('d').textContent = age.days;
        }
    });

    function calculateAge(birthDate, today) {
        var years = today.getFullYear() - birthDate.getFullYear();
        var months = today.getMonth() - birthDate.getMonth();
        var days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        return {
            years: years,
            months: months,
            days: days
        };
    }

    function showError(inputElement, errorId, message) {
        inputElement.classList.add('error');
        var errorElement = document.getElementById(errorId);
        errorElement.textContent = message;
        errorElement.style.display = 'block'; // Show the error message

        var label = inputElement.parentElement.querySelector('label');
        label.style.color = '#FF4D4D'; 
    }

    function clearErrors() {
        var inputs = document.querySelectorAll('input');
        inputs.forEach(function (input) {
            input.classList.remove('error');

            // Reset label color to original
            var label = input.parentElement.querySelector('label');
            label.style.color = 'var(--color-smokey-grey)'; 
        });

        var errors = document.querySelectorAll('.error-message');
        errors.forEach(function (error) {
            error.style.display = 'none'; // Hide all error messages
        });
    }
});
