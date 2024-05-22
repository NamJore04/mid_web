document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const employeeForm = document.getElementById('employee-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            login(username, password);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            register(username, password);
        });
    }

    if (employeeForm) {
        employeeForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const id = document.getElementById('employee-id').value;
            if (id) {
                updateEmployee(id);
            } else {
                createEmployee();
            }
        });
    }

    checkAuth();
});

function register(username, password) {
    fetch('api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${username}&password=${password}`
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return response.json();
        })
        .then(data => {
            console.log('Registration successful:', data.message);
            window.location.href = 'index.html'; // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
        })
        .catch(error => {
            console.error('Registration failed:', error.message);
            document.getElementById('register-message').textContent = 'Username already exists';
        });
}

let currentPage = 1;
const limit = 2;

function loadEmployees(page = 1) {
    fetch(`api/read.php?page=${page}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            const employeeList = document.getElementById('employee-list');
            employeeList.innerHTML = '';
            data.forEach(employee => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${employee.name} - ${employee.position} - ${employee.department} - ${employee.salary}
                    <button onclick="editEmployee(${employee.id}, '${employee.name}', '${employee.position}', '${employee.department}', ${employee.salary})">Edit</button>
                    <button onclick="deleteEmployee(${employee.id})">Delete</button>
                `;
                employeeList.appendChild(li);
            });

            // Update pagination info
            document.getElementById('page-info').textContent = `Page ${currentPage}`;
        });
}

function checkAuth() {
    fetch('api/authenticate.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Unauthorized');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('employee-container').style.display = 'block';
            loadEmployees(currentPage);
        })
        .catch(error => {
            console.error('Authentication failed:', error.message);
            document.getElementById('login-container').style.display = 'block';
            document.getElementById('employee-container').style.display = 'none';
        });
}

function login(username, password) {
    fetch('api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${username}&password=${password}`
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            console.log('Login successful:', data.message);
            document.getElementById('login-message').textContent = '';
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('employee-container').style.display = 'block';
            loadEmployees(currentPage);
        })
        .catch(error => {
            console.error('Login failed:', error.message);
            document.getElementById('login-message').textContent = 'Invalid credentials';
        });
}

function logout() {
    fetch('api/logout.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            return response.json();
        })
        .then(data => {
            console.log('Logout successful:', data.message);
            document.getElementById('login-container').style.display = 'block';
            document.getElementById('employee-container').style.display = 'none';
            document.getElementById('employee-list').innerHTML = '';
        })
        .catch(error => {
            console.error('Logout failed:', error.message);
        });
}

function createEmployee() {
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;
    const salary = document.getElementById('salary').value;

    fetch('api/create.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `name=${name}&position=${position}&department=${department}&salary=${salary}`
    })
        .then(response => response.json())
        .then(employee => {
            loadEmployees(currentPage);
            document.getElementById('employee-form').reset();
        });
}

function editEmployee(id, name, position, department, salary) {
    document.getElementById('employee-id').value = id;
    document.getElementById('name').value = name;
    document.getElementById('position').value = position;
    document.getElementById('department').value = department;
    document.getElementById('salary').value = salary;
    // document.querySelector('form button[type="submit"]').textContent = 'Update Employee';
}

function updateEmployee(id) {
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const department = document.getElementById('department').value;
    const salary = document.getElementById('salary').value;

    fetch('api/update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${id}&name=${name}&position=${position}&department=${department}&salary=${salary}`
    })
        .then(response => response.json())
        .then(employee => {
            loadEmployees(currentPage);
            document.getElementById('employee-form').reset();
            // document.querySelector('form button[type="submit"]').textContent = 'Update Employee';
            document.getElementById('employee-id').value = ''; // Reset hidden input for employee ID
        })
        .catch(error => {
            console.error('Error updating employee:', error);
        });
}


function deleteEmployee(id) {
    fetch('api/delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${id}`
    })
        .then(response => response.json())
        .then(result => {
            loadEmployees(currentPage);
        });
}

function searchEmployees() {
    const searchTerm = document.getElementById('search').value;

    fetch(`api/search.php?term=${searchTerm}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            const employeeList = document.getElementById('employee-list');
            employeeList.innerHTML = '';
            data.forEach(employee => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${employee.name} - ${employee.position} - ${employee.department} - ${employee.salary}
                    <button onclick="editEmployee(${employee.id}, '${employee.name}', '${employee.position}', '${employee.department}', ${employee.salary})">Edit</button>
                    <button onclick="deleteEmployee(${employee.id})">Delete</button>
                `;
                employeeList.appendChild(li);
            });
        });
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadEmployees(currentPage);
    }
}

function nextPage() {
    currentPage++;
    loadEmployees(currentPage);
}
