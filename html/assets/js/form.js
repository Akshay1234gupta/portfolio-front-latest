document.getElementById("form-contact").addEventListener("submit", function (event) {
    event.preventDefault();

    // Select the button and its status components
    const button = event.target.querySelector("button");
    const spinner = button.querySelector(".spinner");
    const statusIcon = button.querySelector(".status-icon");

    // Prevent multiple submissions while already processing
    if (button.classList.contains("processing")) {
        return;
    }

    // Show spinner and dim the button text
    button.classList.add("processing");

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    fetch('https://portfolio-latest-ruyj.onrender.com/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`
    })
        .then(response => {
            // Check if the response is successful (status 200–299)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text(); // Parse the response text
        })
        .then(data => {
            // Clear previous alerts
            document.getElementById('alert-container').innerHTML = '';

            // Create a success alert
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success d-flex align-items-center';
            successAlert.role = 'alert';
            successAlert.innerHTML = `
                <i class="bi bi-check-circle-fill me-2"></i>
                <div>
                    Your email has been sent successfully!
                </div>
            `;

            // Append the success alert to the alert container
            document.getElementById('alert-container').appendChild(successAlert);

            // Remove the success alert after 5 seconds
            setTimeout(() => {
                successAlert.parentNode.removeChild(successAlert);
            }, 5000);

            // Update button state
            button.classList.remove("processing");
            button.classList.add("done");
            if (statusIcon) statusIcon.classList.add("valid");
        })
        .catch(error => {
            // Clear previous alerts
            document.getElementById('alert-container').innerHTML = '';

            // Create an error alert
            const errorAlert = document.createElement('div');
            errorAlert.className = 'alert alert-danger d-flex align-items-center';
            errorAlert.role = 'alert';
            errorAlert.innerHTML = `
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                <div>
                    There was an error sending your email. Please try again later.
                </div>
            `;

            // Append the error alert to the alert container
            document.getElementById('alert-container').appendChild(errorAlert);

            // Remove the error alert after 5 seconds
            setTimeout(() => {
                errorAlert.parentNode.removeChild(errorAlert);
            }, 5000);

            // Update button state
            button.classList.remove("processing");
            button.classList.add("done");
            if (statusIcon) statusIcon.classList.add("invalid");
        })
        .finally(() => {
            // Reset the button state after 5 seconds
            setTimeout(() => {
                button.classList.remove("done");
                if (statusIcon) {
                    statusIcon.classList.remove("valid", "invalid");
                }
            }, 5000);
        });
});
