
async function addContact() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  await fetch('/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });
  loadContacts();
}

async function loadContacts() {
  const res = await fetch('/list');
  const contacts = await res.json();
  const list = document.getElementById('contacts');
  list.innerHTML = '';
  contacts.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c.name} - ${c.email}`;
    list.appendChild(li);
  });
}

window.onload = loadContacts;
