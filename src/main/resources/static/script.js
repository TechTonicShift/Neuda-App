// Function to make HTTP POST request to create a new user
async function createUser(data) {
    try {
        const response = await fetch('/api/accounts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('User created successfully:', result);
        return result;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

// Function to make HTTP GET request to check balance
async function checkBalance(accountNumber) {
    try {
        const response = await fetch(`/api/accounts/balance/${accountNumber}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const balance = await response.json();
        console.log('Balance:', balance);
        alert(`Account Balance: ${balance}`);
    } catch (error) {
        console.error('Error checking balance:', error);
        // Handle error (show message to user, retry, etc.)
    }
}

// Function to make HTTP POST request to deposit money
async function depositMoney(accountNumber, amount) {
    try {
        const response = await fetch(`/api/accounts/deposit?accountNumber=${accountNumber}&amount=${amount}`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedAccount = await response.json();
        console.log('Deposit successful. Updated Account:', updatedAccount);
        alert(`Deposit successful. Updated Balance: ${updatedAccount.balance}`);
    } catch (error) {
        console.error('Error depositing money:', error);
        // Handle error (show message to user, retry, etc.)
    }
}

// Function to make HTTP POST request to transfer money
async function transferMoney(fromAccount, toAccount, amount) {
    try {
        const response = await fetch(`/api/accounts/transfer?fromAccount=${fromAccount}&toAccount=${toAccount}&amount=${amount}`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Transfer successful:', result);
        alert('Transfer successful');
    } catch (error) {
        console.error('Error transferring money:', error);
        // Handle error (show message to user, retry, etc.)
    }
}

// Function to make HTTP GET request to fetch transaction history
async function getTransactionHistory(accountNumber) {
    try {
        const response = await fetch(`/api/accounts/transactions/${accountNumber}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const transactions = await response.json();
        console.log('Transaction History:', transactions);
        alert('Transaction History: ' + JSON.stringify(transactions));
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        // Handle error (show message to user, retry, etc.)
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const createUserForm = document.getElementById('createUser');
    const createUserBtn = document.getElementById('createUserBtn');
    const userOptionsDiv = document.getElementById('userOptions');

    // Event listener for creating user
    createUserForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const accountNumber = document.getElementById('accountNumber').value;
        const accountHolderName = document.getElementById('accountHolderName').value;
        const initialBalance = parseFloat(document.getElementById('initialBalance').value);

        try {
            const newUser = await createUser({
                accountNumber,
                accountHolderName,
                balance: initialBalance
            });

            // Hide create user form and show user options
            document.getElementById('createUserForm').style.display = 'none';
            userOptionsDiv.style.display = 'block';

        } catch (error) {
            console.error('Error creating user:', error);
            // Handle error (show message to user, retry, etc.)
        }
    });

    // Event listener for checking balance
    document.getElementById('checkBalanceBtn').addEventListener('click', async function() {
        const accountNumber = prompt('Enter Account Number:');
        if (accountNumber) {
            await checkBalance(accountNumber);
        }
    });

    // Event listener for depositing money
    document.getElementById('depositBtn').addEventListener('click', async function() {
        const accountNumber = prompt('Enter Account Number:');
        const amount = prompt('Enter Amount to Deposit:');
        if (accountNumber && amount) {
            await depositMoney(accountNumber, parseFloat(amount));
        }
    });

    // Event listener for transferring money
    document.getElementById('transferBtn').addEventListener('click', async function() {
        const fromAccount = prompt('Enter From Account Number:');
        const toAccount = prompt('Enter To Account Number:');
        const amount = prompt('Enter Amount to Transfer:');
        if (fromAccount && toAccount && amount) {
            await transferMoney(fromAccount, toAccount, parseFloat(amount));
        }
    });

    // Event listener for transaction history
    document.getElementById('transactionHistoryBtn').addEventListener('click', async function() {
        const accountNumber = prompt('Enter Account Number:');
        if (accountNumber) {
            await getTransactionHistory(accountNumber);
        }
    });
});
