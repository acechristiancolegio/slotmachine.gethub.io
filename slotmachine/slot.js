// Declare global variables
let spinInterval = null;
let autoSpinInterval = null;
let autoSpinning = false;
let balance = 1000; // Initial balance of the player
let betAmount = 0; // Initial bet amount

// Function to simulate spinning of the slot machine
function spin() {
    if (betAmount === 0) {
        alert("Please place a bet before spinning.");
        return;
    }

    const slots = document.querySelectorAll('.slot');
    
    // Number of spins
    const spins = 1;

    // Milliseconds between each spin
    const interval = 0;

    // Array of symbols
    const symbols = ['1.jfif', '20.jpg', '10.jpg'];

    // Function to randomly select a symbol
    function getRandomSymbol() {
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

// Function to stop spinning and check for winning combinations
function stopSpinning() {
    clearInterval(spinInterval);

    // Get symbols for each slot
    const symbolsArray = Array.from(slots).map(slot => slot.firstChild.getAttribute('src'));

    // Adjust the conditions for winning combinations to make them less frequent
    // For example, require more matching symbols in a row
    if ((symbolsArray[0] === symbolsArray[1] && symbolsArray[1] === symbolsArray[2] && Math.random() < 0.2) ||
        (symbolsArray[0] === symbolsArray[3] && symbolsArray[3] === symbolsArray[6] && Math.random() < 0.2) ||
        (symbolsArray[0] === symbolsArray[4] && symbolsArray[4] === symbolsArray[8] && Math.random() < 0.2) ||
        (symbolsArray[2] === symbolsArray[4] && symbolsArray[4] === symbolsArray[6] && Math.random() < 0.2)) {
        // Any winning combination with a lower chance (adjust the probability as needed)
        alert('Congratulations! You won!');
        balance += betAmount * 2; // Double the bet amount and add it to the balance
        updateBalance(); // Update balance on the dashboard
        stopAutoSpin(); // Stop auto spin if a win occurs
    } else {
        // No winning combination
        balance -= betAmount; // Deduct the bet amount from the balance
        updateBalance(); // Update balance on the dashboard
    }
}


    let spinCount = 0;
    spinInterval = setInterval(() => {
        // Set random symbols for each slot
        slots.forEach(slot => {
            slot.innerHTML = `<img src="${getRandomSymbol()}" alt="Image">`;
        });
        
        spinCount++;

        // Stop spinning after specified number of spins
        if (spinCount === spins) {
            stopSpinning();
        }
    }, interval);
}

// Function to start auto spin
function autoSpin() {
    // Check if auto spin is already running
    if (!autoSpinning) {
        autoSpinning = true;
        autoSpinInterval = setInterval(spin, 1000); // Adjust the interval as needed (milliseconds)
        updateAutoSpinButton(); // Update button text
    }
}

// Function to stop auto spin
function stopAutoSpin() {
    clearInterval(autoSpinInterval); // Clear auto spin interval
    clearInterval(spinInterval); // Clear spinning interval
    autoSpinning = false;
    updateAutoSpinButton(); // Update button text
}

// Function to toggle auto spin
function toggleAutoSpin() {
    if (!autoSpinning) {
        autoSpin(); // Start auto spin
    } else {
        stopAutoSpin(); // Stop auto spin
    }
}

// Function to update button text based on auto spinning status
function updateAutoSpinButton() {
    const autoSpinButton = document.querySelector('.auto-spin-button');
    autoSpinButton.textContent = autoSpinning ? 'Stop Auto Spin' : 'Start Auto Spin';
}

// Function to place a bet
function placeBet() {
    if (balance === 0) {
        alert("You have insufficient balance.");
        return;
    }

    const betInput = prompt("Enter your bet amount:");
    const betValue = parseInt(betInput);

    if (!isNaN(betValue) && betValue % 2 === 0 && betValue <= balance) {
        betAmount = betValue;
        updateBetAmount(); // Update bet amount on the dashboard
        balance -= betAmount; // Deduct the bet amount from the balance
        updateBalance(); // Update balance on the dashboard
    } else {
        alert("Please enter a valid even bet amount within your balance.");
    }
}

// Function to update bet amount on the dashboard
function updateBetAmount() {
    document.getElementById('bet-amount').textContent = "$" + betAmount;
}

// Function to update balance on the dashboard
function updateBalance() {
    document.getElementById('balance').textContent = "$" + balance;
}
