document.getElementById('onboardingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const ageSelected = document.querySelector('input[name="age"]:checked').value;
    const allergies = Array.from(document.querySelectorAll('input[name="allergy"]:checked')).map(cb => cb.value);

    localStorage.setItem('shokids_age', ageSelected);
    localStorage.setItem('shokids_allergies', JSON.stringify(allergies));

    localStorage.removeItem('shokids_active_order');
    localStorage.removeItem('shokids_order_total');
    localStorage.removeItem('shokids_subscription');
    localStorage.removeItem('shokids_sub_items');
    localStorage.removeItem('shokids_sub_total');

    window.location.href = 'menu.html';
});