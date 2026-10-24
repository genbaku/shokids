document.addEventListener("DOMContentLoaded", () => {
    const hasOrder = localStorage.getItem('shokids_active_order') === 'true';
    const orderTotal = localStorage.getItem('shokids_order_total');

    const hasSub = localStorage.getItem('shokids_subscription') === 'true';
    const subTotal = localStorage.getItem('shokids_sub_total');

    const container = document.getElementById('trackingContainer');
    container.innerHTML = '';
    let activeDeliveries = 0;

    if (hasOrder) {
        activeDeliveries++;
        container.innerHTML += `
            <div class="status-box">
                <h3 style="margin-bottom: 8px; color: var(--brand-blue);">Order Confirmed</h3>
                <p style="font-family: 'Inter', sans-serif; font-weight: 600;">Preparing in Kitchen</p>
                <p style="font-size: 0.9rem; margin-top: 8px;">Total: €${orderTotal}</p>
                <p style="font-size: 0.9rem; margin-top: 16px;">Estimated delivery: Tomorrow between 8:00 - 10:00</p>
            </div>
        `;
    }

    if (hasSub) {
        activeDeliveries++;
        container.innerHTML += `
            <div class="status-box" style="border-left-color: var(--brand-blue);">
                <h3 style="margin-bottom: 8px; color: var(--brand-blue);">Weekly Subscription</h3>
                <p style="font-family: 'Inter', sans-serif; font-weight: 600;">Scheduled for Monday</p>
                <p style="font-size: 0.9rem; margin-top: 8px; color: var(--brand-pink); font-weight: 700;">✓ Subscription Active</p>
                <p style="font-size: 0.9rem; margin-top: 8px;">Weekly Total: €${subTotal}</p>
            </div>
        `;
    }

    if (activeDeliveries === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3 style="color: var(--brand-blue);">No active deliveries</h3>
                <p style="margin-top: 8px; margin-bottom: 24px;">Looks like you haven't ordered anything yet.</p>
                <a href="menu.html" class="btn btn-blue" style="max-width: 200px;">Go to Menu</a>
            </div>
        `;
    }
});