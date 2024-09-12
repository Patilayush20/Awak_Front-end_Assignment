document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
  
    
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';
  
    
    let valid = true;
  
    if (!email) {
      document.getElementById('emailError').innerText = 'Email is required';
      valid = false;
    } else if (!validateEmail(email)) {
      document.getElementById('emailError').innerText = 'Enter a valid email address';
      valid = false;
    }
  
    if (!password) {
      document.getElementById('passwordError').innerText = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      document.getElementById('passwordError').innerText = 'Password must be at least 6 characters long';
      valid = false;
    }
  
    
    if (valid) {
      login(email, password, rememberMe);
    }
  });
  
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  
  document.querySelector('.show-password').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      this.innerText = 'Hide';
    } else {
      passwordInput.type = 'password';
      this.innerText = 'Show';
    }
  });

  
  function login(email, password, rememberMe) {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    const spinner = document.getElementById('loadingSpinner');
    spinner.style.display = 'block';  

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: email,
        password: password
      })
    })
    .then(response => {
      spinner.style.display = 'none';  
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Login failed');
      }
    })
    .then(data => {
      alert('Login successful!');
      console.log('Response data:', data);

      
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      
    })
    .catch(error => {
      alert('Login failed: ' + error.message);
    });
  }

  
  window.onload = function() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      document.getElementById('email').value = rememberedEmail;
      document.getElementById('rememberMe').checked = true;
    }
  };
