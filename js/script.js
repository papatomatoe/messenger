const messageList = document.querySelector('.messages');
const messageTemplate = document.querySelector('#msg').content;
const form = document.querySelector('form');

const getDataFromForm = () => {
  const elements = form.elements;
  const data = {};

  Array.from(elements)
    .forEach(el => data[el.name] = el.value);

  return data;
}

const addMessage = (name, text) => {
  const messageCopy = messageTemplate.cloneNode(true);
  const username = messageCopy.querySelector('.message__username');
  const message = messageCopy.querySelector('.message__text');
  const delBtn = messageCopy.querySelector('.message__del')
  const date = messageCopy.querySelector('.message__date');
  const currentDate = new Date();

  username.innerText = name;
  message.innerText = text;

  date.innerText = currentDate.toLocaleString();
  date.setAttribute('datetime', currentDate);

  delBtn.addEventListener('click', evt => evt.target.parentNode.remove());

  messageList.append(messageCopy);
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const { username, usermessage } = getDataFromForm();
  addMessage(username, usermessage);
  form.reset();
})

