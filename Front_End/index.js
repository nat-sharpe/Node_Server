let container = document.querySelector('.contacts');
let contactTemplate = document.querySelector('#contact-template').content;

let renderContact = contact => {
  console.log(contact);
  let contactRow = contactTemplate.cloneNode(true);
  Object.entries(contact).forEach(([prop, val]) => {
    contactRow.querySelector(`.contact-${prop}`).textContent = val;
  })

  let root = contactRow.children[0];

  contactRow.querySelector('.contact-remove')
    .addEventListener('click', () => removeContact(contact, root));

  return contactRow;
};

let removeContact = async (contact, row) => {
  await fetch(`/hobbits/${contact.id}`, { method: 'DELETE' });
  container.removeChild(row);
};

(async () => {
  let contacts = await(await fetch('/hobbits')).json();
  let contactsArray = Object.values(contacts);
  let contactRows = contactsArray.map(contact => renderContact(contact));
  for (let row of contactRows) {
    container.appendChild(row);
  }
})()
