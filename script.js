// ===== CAROUSEL =====
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.carousel-arrow.prev');
const nextBtn = document.querySelector('.carousel-arrow.next');

function showSlide(index) {
    const totalSlides = slides.length;
    
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });

    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentSlide);
    });
}

prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        const slideIndex = parseInt(indicator.getAttribute('data-slide'));
        showSlide(slideIndex);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') showSlide(currentSlide - 1);
    if (e.key === 'ArrowRight') showSlide(currentSlide + 1);
});

// ===== PRICE CALCULATOR =====
const basePrices = {
    'Twin': 1500,
    'Full': 1800,
    'Queen': 2200,
    'Cal King': 2500,
    'King': 2500
};

function extractPrice(text) {
    const match = text.match(/\+\$(\d+)/);
    return match ? parseInt(match[1]) : 0;
}

function updatePrice() {
    const size = document.getElementById('size').value;
    const wood = document.getElementById('wood').value;
    const stain = document.getElementById('stain').value;
    const rush = document.getElementById('rush').checked;
    const delivery = document.getElementById('delivery').checked;

    let total = basePrices[size] || 2500;
    total += extractPrice(wood);
    total += extractPrice(stain);
    if (rush) total += 75;
    if (delivery) total += 100;

    document.getElementById('estimatedPrice').textContent = '$' + total.toLocaleString();
}

// Add listeners
['size', 'wood', 'stain', 'rush', 'delivery'].forEach(id => {
    const element = document.getElementById(id);
    const event = element.type === 'checkbox' ? 'change' : 'change';
    element.addEventListener(event, updatePrice);
});

// Initialize price
updatePrice();

// ===== FORM SUBMISSION =====
document.getElementById('bedConfigForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        size: document.getElementById('size').value,
        headboard: document.getElementById('headboard').value,
        wood: document.getElementById('wood').value,
        stain: document.getElementById('stain').value,
        rush: document.getElementById('rush').checked ? 'Yes' : 'No',
        delivery: document.getElementById('delivery').checked ? 'Yes' : 'No',
        notes: document.getElementById('notes').value,
        name: document.getElementById('customerName').value,
        email: document.getElementById('customerEmail').value,
        phone: document.getElementById('customerPhone').value,
        price: document.getElementById('estimatedPrice').textContent
    };

    const emailBody = `
New Bed Configuration Request

Customer Information:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Bed Configuration:
Size: ${formData.size}
Headboard: ${formData.headboard}
Wood Species: ${formData.wood}
Stain/Finish: ${formData.stain}
Rush Build: ${formData.rush}
Delivery & Install: ${formData.delivery}

Estimated Price: ${formData.price}

Customer Notes:
${formData.notes || 'None'}
    `.trim();

    const subject = encodeURIComponent('New Bed Configuration - ' + formData.name);
    const body = encodeURIComponent(emailBody);

    // Hide form, show success
    document.getElementById('configForm').style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');

    // Open email client
    window.location.href = `mailto:info@corvcollection.com?subject=${subject}&body=${body}`;
});

// ===== HEADER SCROLL =====
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});