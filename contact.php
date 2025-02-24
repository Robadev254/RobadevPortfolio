<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate form inputs
    $firstName = htmlspecialchars(trim($_POST['first_name']));
    $lastName = htmlspecialchars(trim($_POST['last_name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Invalid email format. Please provide a valid email address.'); window.history.back();</script>";
        exit;
    }

    // Validate required fields
    if (empty($firstName) || empty($lastName) || empty($message)) {
        echo "<script>alert('All fields are required. Please fill out the form completely.'); window.history.back();</script>";
        exit;
    }

    // Set recipient email (replace with your actual email)
    $to = "your-email@example.com"; // Change this to your email address

    // Set email subject
    $subject = "New Contact Form Submission from $firstName $lastName";

    // Set email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Compose the email body
    $body = "You have received a new message from your website contact form.\n\n";
    $body .= "First Name: $firstName\n";
    $body .= "Last Name: $lastName\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // Success message
        echo "<script>alert('Message sent successfully!'); window.location.href='index.html';</script>";
    } else {
        // Error message
        echo "<script>alert('Failed to send the message. Please try again later.'); window.history.back();</script>";
    }
} else {
    // If the form is not submitted, show an error
    echo "<script>alert('Invalid request.'); window.location.href='index.html';</script>";
}
?>