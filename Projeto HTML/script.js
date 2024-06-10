const userList = document.getElementById('user-list');
const refreshBtn = document.getElementById('refresh-btn');

function fetchUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
      userList.innerHTML = '';
      data.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user.name;

        const actionButtons = createActionButtonContainer(user);
        listItem.appendChild(actionButtons);

        userList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.log('Ocorreu um erro: ', error);
    });
}
refreshBtn.addEventListener('click', fetchUsers);
fetchUsers();

function createActionButtonContainer(user) {
    const container = document.createElement('div');
    container.classList.add('action-buttons');
  
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Atualizar';
    updateButton.addEventListener('click', () => updateUser(user.id));
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.addEventListener('click', () => deleteUser(user.id));
  
    container.appendChild(updateButton);
    container.appendChild(deleteButton);
  
    return container;
  }

  function updateUser(userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: 'Novo nome do usuário',
        email: 'novoemail@example.com',
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Usuário atualizado:', data);
        // Aqui você pode adicionar lógica para atualizar a interface com os dados atualizados do usuário
      })
      .catch(error => {
        console.log('Ocorreu um erro ao atualizar o usuário: ', error);
      });
  }
  
  function deleteUser(userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Usuário excluído:', data);
        // Aqui você pode adicionar lógica para remover o usuário da interface
      })
      .catch(error => {
        console.log('Ocorreu um erro ao excluir o usuário: ', error);
  
      });
    }

const userForm = document.getElementById('user-form');

userForm.addEventListener('submit', event => {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');

  const newUser = {
    name: nameInput.value,
    email: emailInput.value
  };

  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Novo usuário cadastrado:', data);
      // Atualizar a lista de usuários após o cadastro. 
     // Obs.: O Usuário cadastrtado aqui não aparecerá na lista, pois o endpoint é apenas um mock. 
     fetchUsers();
    })
    .catch(error => {
      console.log('Ocorreu um erro: ', error);
    });

  // Limpar os campos do formulário
  nameInput.value = '';
  emailInput.value = '';
});
