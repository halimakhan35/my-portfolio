document.addEventListener("DOMContentLoaded", () => {
    // Project cards animation handling
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, idx) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(25px)";
        card.style.transition = `opacity 0.6s ease, transform 0.6s ease ${idx * 0.15}s`;
        
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 150);
    });

    // EMAILJS INTEGRATION LOGIC
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Button text change dynamic effect
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            // EmailJS send method trigger (Aapki convenience ke liye service ready hai)
            // Note: In keys ko active karne ke liye emailjs.com par free account set hota hai
            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
                from_name: document.getElementById('user_name').value,
                from_email: document.getElementById('user_email').value,
                message: document.getElementById('user_message').value
            })
            .then(() => {
                alert("Message Sent Successfully! 👍");
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, (error) => {
                alert("Failed to send message. Please try again.");
                console.log("EmailJS Error:", error);
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});