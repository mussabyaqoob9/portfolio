// ==========================
// Contact Form (Backend API + EmailJS)
// ==========================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

           

            try {
                // 1️⃣ Save to backend API (add your endpoint here)
                // Example: const res = await fetch("/api/contact", { method: "POST", body: formData });
                // Uncomment and update the line below with your actual API endpoint if needed
                // const res = await fetch("/api/contact", { method: "POST", body: formData });
                // const result = await res.json();
                // if (!result.success) throw new Error("Database save failed");

                // 2️⃣ Send email via EmailJS
                await emailjs.send(
                    "service_d482h8l",   // replace with your EmailJS Service ID
                    "template_y4bxj2p",  // replace with your EmailJS Template ID
                    {
                        from_name: data.name,
                        from_email: data.email,
                        company: data.company || "N/A",
                        phone: data.phone || "N/A",
                        subject: data.subject,
                        budget: data.budget || "Not specified",
                        timeline: data.timeline || "Not specified",
                        message: data.message
                    },
                    "6_1Zey6b07TZ6pbae"    // replace with your EmailJS Public Key
                );

                // ✅ Success
                contactForm.reset();
                showNotification("Thank you! Your message has been sent successfully.", "success");
            } catch (err) {
                console.error("❌ Error:", err);
                showNotification("Error: Could not send message. Try again later.", "error");
            }

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }
}
