const state = {
  cart: [],
  subscription: null,
  cdStock: Number(localStorage.getItem('cdStock') || 25)
};

const money = (value) => `$${value.toFixed(2)}`;

const stockEl = document.getElementById('cdStock');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('taxAmount');
const totalEl = document.getElementById('totalAmount');
const activeSubEl = document.getElementById('activeSub');
const emailPreviewEl = document.getElementById('emailPreview');
const cancelResultEl = document.getElementById('cancelResult');

function getTaxRate(location) {
  if (location === 'nyc') return 0.08875;
  if (location === 'albany') return 0.08;
  return 0.08;
}

function render() {
  stockEl.textContent = state.cdStock;
  activeSubEl.textContent = state.subscription ? state.subscription.name : 'None selected';

  const subtotal = state.cart.reduce((sum, item) => sum + item.price, 0);
  const taxRate = getTaxRate(document.getElementById('address').value);
  const taxable = state.cart.filter((item) => item.taxable).reduce((sum, item) => sum + item.price, 0);
  const tax = taxable * taxRate;
  subtotalEl.textContent = money(subtotal);
  taxEl.textContent = money(tax);
  totalEl.textContent = money(subtotal + tax);
}

function addItem(name, price, taxable) {
  state.cart.push({ name, price, taxable });
  render();
}

document.querySelectorAll('[data-product]').forEach((button) => {
  button.addEventListener('click', () => {
    const type = button.dataset.product;

    if (type === 'digital') {
      const amount = Math.max(1, Number(document.getElementById('digitalPrice').value || 1));
      document.getElementById('digitalPrice').value = amount;
      addItem('Digital Download', amount, false);
    }

    if (type === 'cd') {
      if (state.cdStock <= 0) {
        alert('CD inventory sold out in this demo.');
        return;
      }
      state.cdStock -= 1;
      localStorage.setItem('cdStock', String(state.cdStock));
      addItem('Physical CD', 15, true);
    }

    if (type === 'merch') {
      const select = document.getElementById('merchItem');
      const price = Number(select.value);
      addItem(`Merch: ${select.options[select.selectedIndex].text}`, price, true);
    }
  });
});

document.querySelectorAll('[data-subscription]').forEach((button) => {
  button.addEventListener('click', () => {
    state.subscription = {
      id: button.dataset.subscription,
      name: button.parentElement.querySelector('h3').textContent,
      price: Number(button.dataset.price)
    };
    state.cart = state.cart.filter((item) => !item.recurring);
    state.cart.push({ name: `${state.subscription.name} (monthly)`, price: state.subscription.price, taxable: false, recurring: true });
    render();
  });
});

document.getElementById('address').addEventListener('change', render);

document.getElementById('completeCheckout').addEventListener('click', () => {
  const hasRecurring = state.cart.some((item) => item.recurring);
  const consent = document.getElementById('autoRenewConsent').checked;

  if (hasRecurring && !consent) {
    alert('To continue, check the NYS auto-renewal disclosure consent box.');
    return;
  }

  const city = document.getElementById('address').value;
  const subtotal = state.cart.reduce((sum, item) => sum + item.price, 0);
  const taxRate = getTaxRate(city);
  const taxable = state.cart.filter((item) => item.taxable).reduce((sum, item) => sum + item.price, 0);
  const tax = taxable * taxRate;

  emailPreviewEl.textContent = `To: supporter@example.com\nSubject: Julia Lumina Rae Order Confirmation\n\nThanks for your order!\nItems:\n- ${state.cart.map((i) => i.name).join('\n- ') || 'No items'}\n\nSubtotal: ${money(subtotal)}\nTax: ${money(tax)}\nTotal: ${money(subtotal + tax)}\n\nAuto-renewal consent: ${hasRecurring ? (consent ? 'Provided' : 'Missing') : 'Not applicable'}\nManage subscription: Click-to-cancel from account area.`;
});

document.getElementById('cancelSubscription').addEventListener('click', () => {
  if (!state.subscription) {
    cancelResultEl.textContent = 'No active subscription to cancel.';
    return;
  }

  state.subscription = null;
  state.cart = state.cart.filter((item) => !item.recurring);
  cancelResultEl.textContent = 'Subscription canceled immediately (demo one-click flow).';
  render();
});

render();
