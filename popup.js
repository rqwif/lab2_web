document.addEventListener('DOMContentLoaded', function() {
  const saveBtn = document.getElementById('saveBtn');
  const linkTitleInput = document.getElementById('linkTitle');
  const linkInput = document.getElementById('linkInput');
  const linksList = document.getElementById('linksList');

  // Виведення збережених посилань при завантаженні
  loadLinks();

  // Збереження нового посилання з назвою
  saveBtn.addEventListener('click', () => {
      const title = linkTitleInput.value;
      const url = linkInput.value;
      if (title && url) {
          saveLink(title, url);
          linkTitleInput.value = '';
          linkInput.value = '';
          loadLinks();
      }
  });

  // Збереження посилання у локальне сховище разом із назвою
  function saveLink(title, url) {
      let links = getLinks();
      links.push({ title: title, url: url });
      localStorage.setItem('links', JSON.stringify(links));
  }

  // Отримання всіх збережених посилань
  function getLinks() {
      let links = localStorage.getItem('links');
      return links ? JSON.parse(links) : [];
  }

  // Завантаження збережених посилань
  function loadLinks() {
      const links = getLinks();
      linksList.innerHTML = '';
      links.forEach((link, index) => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="${link.url}" target="_blank">${link.title}</a> <button data-index="${index}">Видалити</button>`;
          linksList.appendChild(li);
      });
      attachDeleteEvents();
  }

  // Видалення посилання
  function attachDeleteEvents() {
      const deleteButtons = document.querySelectorAll('li button');
      deleteButtons.forEach(btn => {
          btn.addEventListener('click', function() {
              const index = this.getAttribute('data-index');
              deleteLink(index);
          });
      });
  }

  function deleteLink(index) {
      let links = getLinks();
      links.splice(index, 1);
      localStorage.setItem('links', JSON.stringify(links));
      loadLinks();
  }
});
