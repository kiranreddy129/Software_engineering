// Shared My Bookings Drawer — works on all pages
(function () {
    // Inject drawer HTML
    const drawer = document.createElement('div');
    drawer.id = 'bookings-drawer';
    drawer.innerHTML = `
        <div id="bookings-drawer-overlay"></div>
        <div id="bookings-drawer-panel">
            <div id="bookings-drawer-header">
                <h2>🎫 My Bookings</h2>
                <button id="bookings-drawer-close">✕</button>
            </div>
            <div id="bookings-drawer-body"></div>
        </div>
    `;
    document.body.appendChild(drawer);

    function openBookingsDrawer() {
        const bookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
        const body = document.getElementById('bookings-drawer-body');

        if (bookings.length === 0) {
            body.innerHTML = `
                <div style="text-align:center; padding: 4rem 2rem; color: #888;">
                    <div style="font-size:4rem;">🎟️</div>
                    <p style="margin-top:1rem; font-size:1.1rem; font-weight:500;">You haven't booked any buses yet.</p>
                    <a href="index.html" style="display:inline-block; margin-top:1.5rem; padding:0.7rem 1.5rem; background:var(--primary-color,#00a699); color:white; border-radius:25px; text-decoration:none; font-weight:600;">Search Buses →</a>
                </div>`;
        } else {
            body.innerHTML = [...bookings].reverse().map(b => `
                <div class="my-booking-card">
                    <div class="my-booking-header">
                        <span class="my-booking-id">${b.id}</span>
                        <span class="my-booking-date">${b.bookedAt}</span>
                    </div>
                    <div class="my-booking-route">${b.source || '—'} → ${b.destination || '—'}</div>
                    <div class="my-booking-detail"><strong>Bus:</strong> ${b.busName}</div>
                    <div class="my-booking-detail"><strong>Passenger:</strong> ${b.passengerName}</div>
                    <div class="my-booking-detail"><strong>Seat:</strong> ${b.seatNo} &nbsp;|&nbsp; <strong>Departure:</strong> ${b.busTime}</div>
                    <div class="my-booking-detail"><strong>Fare:</strong> ${b.busFare} &nbsp;|&nbsp; <strong>Date:</strong> ${b.date}</div>
                    <div class="my-booking-status">✅ Confirmed</div>
                </div>`).join('');
        }

        document.getElementById('bookings-drawer').classList.add('open');
    }

    // Wire up link
    const link = document.getElementById('my-bookings-link');
    if (link) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openBookingsDrawer();
        });
    }

    document.getElementById('bookings-drawer-close').addEventListener('click', () => {
        document.getElementById('bookings-drawer').classList.remove('open');
    });
    document.getElementById('bookings-drawer-overlay').addEventListener('click', () => {
        document.getElementById('bookings-drawer').classList.remove('open');
    });
})();
