document.addEventListener("DOMContentLoaded", () => {
    const age = localStorage.getItem('shokids_age') || 'Not Set';
    const allergies = JSON.parse(localStorage.getItem('shokids_allergies')) || [];

    document.getElementById('planDisplay').innerText = age.charAt(0).toUpperCase() + age.slice(1) + " Stage";
    document.getElementById('allergyDisplay').innerText = allergies.length > 0 ? allergies.join(', ') : "None";

    const isSubscribed = localStorage.getItem('shokids_subscription') === 'true';

    if (isSubscribed) {
        document.getElementById('noSubSection').style.display = 'none';
        document.getElementById('activeSubSection').style.display = 'flex';

        const subItems = JSON.parse(localStorage.getItem('shokids_sub_items')) || [];
        const subTotal = localStorage.getItem('shokids_sub_total') || '0.00';

        const names = subItems.map(item => item.name).join('<br>• ');
        document.getElementById('subItemsList').innerHTML = subItems.length > 0 ? `• ${names}` : 'No specific meals selected';
        document.getElementById('subTotalDisplay').innerText = `Total: €${subTotal} / week`;
    } else {
        document.getElementById('noSubSection').style.display = 'block';
        document.getElementById('activeSubSection').style.display = 'none';
    }
});

window.createSubscription = function () {
    localStorage.setItem('shokids_build_mode', 'subscription');
    window.location.href = 'menu.html';
};

window.openCancelModal = function () {
    document.getElementById('cancelModal').classList.add('active');
};

window.closeCancelModal = function () {
    document.getElementById('cancelModal').classList.remove('active');
};

window.confirmCancel = function () {
    localStorage.setItem('shokids_subscription', 'false');
    localStorage.removeItem('shokids_sub_items');
    localStorage.removeItem('shokids_sub_total');
    location.reload();
};