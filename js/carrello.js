function toggleMobileMenu() {
    document.getElementById("mobile-overlay-menu").classList.toggle("open");
}

function renderCarrello() {
    const container = document.getElementById('cart-items-container');
    const totalValue = document.getElementById('cart-total-value');
    const checkoutBtn = document.getElementById('checkout-btn');
    const carrello = JSON.parse(localStorage.getItem('carrello')) || [];

    // STATO VUOTO
    if (carrello.length === 0) {
        container.innerHTML = `
            <div class="empty-state-msg">
                Non sembra esserci nulla qui dentro...<br>
                sicuro che non ti serva proprio niente?
            </div>`;
        
        if(checkoutBtn) {
            checkoutBtn.className = 'main-btn btn-disabled';
            checkoutBtn.disabled = true;
            checkoutBtn.innerText = "Carrello Vuoto";
        }
        if(totalValue) totalValue.innerText = "0 ore";
        return;
    }

    let htmlContent = "";
    let totaleOre = 0;

    carrello.forEach((item, index) => {
        const qty = item.quantita || 1;
        totaleOre += (item.prezzo * qty);

        // Generazione HTML che corrisponde al nuovo CSS
        htmlContent += `
            <div class="cart-item-row">
                <div class="item-category-sidebar">
                    ${item.categoria || 'Prodotto'}
                </div>
                
                <div class="item-main-content">
                    
                    <div class="item-info">
                        <img src="${item.immagine}" class="item-img" alt="${item.nome}">
                        <span class="item-name" style="color: ${item.colore || '#000'}">${item.nome}</span>
                    </div>

                    <div class="quantity-selector">
                        <button class="qty-btn" onclick="cambiaQuantita(${index}, -1)">-</button>
                        <span class="qty-number">${qty}</span>
                        <button class="qty-btn" onclick="cambiaQuantita(${index}, 1)">+</button>
                    </div>

                    <div class="item-price">
                        <b>${item.prezzo * qty} ore</b>
                    </div>

                    <div class="delete-item" onclick="rimuoviProdotto(${index})">✕</div>
                </div>
            </div>`;
    });

    container.innerHTML = htmlContent;
    if(totalValue) totalValue.innerText = `${totaleOre} ore`;
    
    if(checkoutBtn) {
        checkoutBtn.className = 'main-btn';
        checkoutBtn.disabled = false;
        checkoutBtn.innerText = "Procedi al cambiamento";
    }
}

function cambiaQuantita(index, delta) {
    let carrello = JSON.parse(localStorage.getItem('carrello')) || [];
    
    if (!carrello[index].quantita) {
        carrello[index].quantita = 1;
    }

    carrello[index].quantita += delta;

    if (carrello[index].quantita < 1) {
        carrello[index].quantita = 1;
    }

    localStorage.setItem('carrello', JSON.stringify(carrello));
    renderCarrello();
}

function rimuoviProdotto(index) {
    let carrello = JSON.parse(localStorage.getItem('carrello')) || [];
    carrello.splice(index, 1);
    localStorage.setItem('carrello', JSON.stringify(carrello));
    renderCarrello();
}

document.addEventListener('DOMContentLoaded', renderCarrello);