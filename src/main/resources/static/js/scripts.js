// scripts.js

document.addEventListener('DOMContentLoaded', function() {
	
	// Create Account Form Submission
    document.getElementById('createAccountForm')?.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const accountData = {
            accountNumber: formData.get('accountNumber'),
            accountHolderName: formData.get('accountHolderName'),
            balance: parseFloat(formData.get('balance'))
        };
        fetch('/api/accounts/create', {
            method: 'POST',
            body: JSON.stringify(accountData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error creating account');
            }
        })
        .then(data => {
            alert('Account created successfully!');
            console.log(data); // Log response from backend
            // Handle success as needed
        })
        .catch(error => {
            alert('Error creating account');
            console.error('Error:', error);
        });
    });
	
	// Deposit Form Submission
    document.getElementById('depositForm')?.addEventListener('submit', function(event) {
        event.preventDefault();
        const accountNumber = document.getElementById('accountNumber').value;
        const amount = document.getElementById('amount').value;

        // Construct FormData object to send as POST request
        const formData = new FormData();
        formData.append('accountNumber', accountNumber);
        formData.append('amount', amount);

        fetch('/api/accounts/deposit', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error depositing funds');
            }
        })
        .then(data => {
            alert('Funds deposited successfully');
            console.log(data); // Log deposit response
            // Handle success as needed
        })
        .catch(error => {
            alert('Error depositing funds');
            console.error('Error:', error);
        });
    });
   
    
	// Withdraw Form Submission
	document.getElementById('withdrawForm')?.addEventListener('submit', function(event) {
	    event.preventDefault();
	    
	    const formData = new FormData(this);
	    const formDataObject = {};
	    formData.forEach((value, key) => {
	        formDataObject[key] = value;
	    });
	
	    fetch('/api/accounts/withdraw', {
	        method: 'POST',
	        body: JSON.stringify(formDataObject),
	        headers: {
	            'Content-Type': 'application/json'
	        }
	    })
	    .then(response => {
	        if (response.ok) {
	            return response.json();
	        } else {
	            throw new Error('Error withdrawing funds');
	        }
	    })
	    .then(data => {
	        alert('Withdrawal successful!');
	        console.log(data); // Log response from backend
	        // Handle success as needed
	    })
	    .catch(error => {
	        alert('Error withdrawing funds');
	        console.error('Error:', error);
	    });
	});
	
	    // Transfer Form Submission
	    document.getElementById('transferForm')?.addEventListener('submit', function(event) {
	        event.preventDefault();
	        const formData = new FormData(this);
	        fetch('/api/accounts/transfer', {
	            method: 'POST',
	            body: JSON.stringify(Object.fromEntries(formData)),
	            headers: {
	                'Content-Type': 'application/json'
	            }
	        })
	        .then(response => {
	            if (response.ok) {
	                alert('Funds transferred successfully!');
	                // Handle success as needed
	            } else {
	                throw new Error('Error transferring funds');
	            }
	        })
	        .catch(error => {
	            alert(error.message);
	            console.error('Error:', error);
	        });
	    });

    // Transaction History Form Submission
    document.getElementById('transactionHistoryForm')?.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        fetch(`/api/accounts/transactions/${formData.get('accountNumber')}`)
        .then(response => response.json())
        .then(data => {
            let transactionHtml = '<h4>Transaction History:</h4><ul>';
            data.forEach(transaction => {
                transactionHtml += `<li>Type: ${transaction.type}, Amount: ${transaction.amount}, Timestamp: ${transaction.timestamp}</li>`;
            });
            transactionHtml += '</ul>';
            document.getElementById('transactionHistoryResult').innerHTML = transactionHtml;
        })
        .catch(error => {
            alert('Error fetching transaction history');
            console.error('Error:', error);
        });
    });
    
	// JavaScript for handling form submission
	document.getElementById('transferForm')?.addEventListener('submit', function(event) {
	    event.preventDefault();
	    const formData = new FormData(this);
	    fetch('/api/accounts/transfer', {
	        method: 'POST',
	        body: JSON.stringify(Object.fromEntries(formData)),
	        headers: {
	            'Content-Type': 'application/json'
	        }
	    })
	    .then(response => {
	        if (response.ok) {
	            alert('Funds transferred successfully!');
	            // Handle success as needed
	        } else {
	            throw new Error('Error transferring funds');
	        }
	    })
	    .catch(error => {
	        alert(error.message);
	        console.error('Error:', error);
	    });
	});

});
