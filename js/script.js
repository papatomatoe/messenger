const messageList = document.querySelector('.messages');
const messageTemplate = document.querySelector('#msg').content;
const form = document.querySelector('form');

const savedMessages = JSON.parse(localStorage.getItem('savedMessages')) || {};

const getDataFromForm = () => {
  const elements = form.elements;
  const data = {};

  Array.from(elements)
    .forEach(el => data[el.name] = el.value);

  return data;
}

const addMessage = (name, text, savedDate) => {
  const messageCopy = messageTemplate.cloneNode(true);
  const username = messageCopy.querySelector('.message__username');
  const message = messageCopy.querySelector('.message__text');
  const delBtn = messageCopy.querySelector('.message__del')
  const date = messageCopy.querySelector('.message__date');
  const currentDate = new Date(savedDate);

  username.innerText = name;
  message.innerText = text;

  date.innerText = currentDate.toLocaleString();
  date.setAttribute('datetime', currentDate);

  delBtn.addEventListener('click', evt => {
    delete savedMessages[name]
    localStorage.setItem('savedMessages', JSON.stringify(savedMessages));
    evt.target.parentNode.remove();
  });

  messageList.append(messageCopy);
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const { username, usermessage } = getDataFromForm();
  const date = Date.now();

  savedMessages[username] = {};
  savedMessages[username].message = usermessage;
  savedMessages[username].date = date;


  localStorage.setItem('savedMessages', JSON.stringify(savedMessages))
  addMessage(username, usermessage, date);
  form.reset();
})


Object.entries(savedMessages).sort(([, b], [, d]) => b.date - d.date).forEach(([name, { message, date }]) => addMessage(name, message, date));
