// DigitalToolsNepal Authentication System
// Uses local storage to remember users - no server needed

// Check if user is already logged in on page load
document.addEventListener('DOMContentLoaded', function() {
  const currentUser = localStorage.getItem('digitaltoolsnepal_user');
  if (currentUser) {
    // User is logged in
    const userData = JSON.parse(currentUser);
    showLoggedInState(userData.name);
  } else {
    // User is not logged in
    showLoggedOutState();
  }
  
  // Setup event listeners
  setupAuthListeners();
});

// Setup all event listeners
function setupAuthListeners() {
  // Auth button
  document.getElementById('authBtn').addEventListener('click', openAuthModal);
  
  // Logout button
  document.getElementById('logoutBtn').addEventListener('click', handleLogout);
  
  // Close modal when clicking backdrop or close button
  document.querySelectorAll('[data-auth-close]').forEach(el => {
    el.addEventListener('click', closeAuthModal);
  });
  
  // Close modal when clicking outside
  document.getElementById('authModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeAuthModal();
    }
  });
}

// Open authentication modal
function openAuthModal() {
  document.getElementById('authModal').classList.remove('hidden');
  document.getElementById('authModal').setAttribute('aria-hidden', 'false');
  document.getElementById('signInForm').classList.remove('hidden');
  document.getElementById('signUpForm').classList.add('hidden');
  // Clear form fields
  document.getElementById('signin-email').value = '';
  document.getElementById('signin-password').value = '';
  document.getElementById('signup-name').value = '';
  document.getElementById('signup-email').value = '';
  document.getElementById('signup-password').value = '';
  document.getElementById('signup-confirm').value = '';
}

// Close authentication modal
function closeAuthModal() {
  document.getElementById('authModal').classList.add('hidden');
  document.getElementById('authModal').setAttribute('aria-hidden', 'true');
}

// Switch to sign up form
function switchToSignUp() {
  document.getElementById('signInForm').classList.add('hidden');
  document.getElementById('signUpForm').classList.remove('hidden');
}

// Switch to sign in form
function switchToSignIn() {
  document.getElementById('signUpForm').classList.add('hidden');
  document.getElementById('signInForm').classList.remove('hidden');
}

// Handle Sign In
function handleSignIn(event) {
  event.preventDefault();
  
  const email = document.getElementById('signin-email').value.trim();
  const password = document.getElementById('signin-password').value;
  
  // Validate
  if (!email || !password) {
    showError('Please fill in all fields');
    return;
  }
  
  // Get all users from storage
  const allUsers = JSON.parse(localStorage.getItem('digitaltoolsnepal_users') || '[]');
  
  // Find user with matching email and password
  const user = allUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Sign in successful
    localStorage.setItem('digitaltoolsnepal_user', JSON.stringify({
      name: user.name,
      email: user.email,
      signedInAt: new Date().toISOString()
    }));
    
    showSuccess(`Welcome back, ${user.name}! 🎉`);
    closeAuthModal();
    showLoggedInState(user.name);
  } else {
    // Invalid credentials
    showError('Invalid email or password');
    document.getElementById('signin-password').value = '';
  }
}

// Handle Sign Up
function handleSignUp(event) {
  event.preventDefault();
  
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  
  // Validate
  if (!name || !email || !password || !confirm) {
    showError('Please fill in all fields');
    return;
  }
  
  if (password.length < 6) {
    showError('Password must be at least 6 characters');
    return;
  }
  
  if (password !== confirm) {
    showError('Passwords do not match');
    document.getElementById('signup-confirm').value = '';
    return;
  }
  
  // Check if email already exists
  const allUsers = JSON.parse(localStorage.getItem('digitaltoolsnepal_users') || '[]');
  if (allUsers.some(u => u.email === email)) {
    showError('Email already registered. Please sign in instead.');
    return;
  }
  
  // Create new user
  const newUser = {
    name: name,
    email: email,
    password: password, // In production, this should be hashed
    createdAt: new Date().toISOString()
  };
  
  // Save to storage
  allUsers.push(newUser);
  localStorage.setItem('digitaltoolsnepal_users', JSON.stringify(allUsers));
  
  // Log the user in
  localStorage.setItem('digitaltoolsnepal_user', JSON.stringify({
    name: name,
    email: email,
    signedInAt: new Date().toISOString()
  }));
  
  showSuccess(`Welcome ${name}! 🎊 Account created successfully!`);
  closeAuthModal();
  showLoggedInState(name);
}

// Handle Logout
function handleLogout() {
  localStorage.removeItem('digitaltoolsnepal_user');
  showSuccess('Logged out successfully');
  showLoggedOutState();
}

// Show logged in state
function showLoggedInState(userName) {
  document.getElementById('authBtn').classList.add('hidden');
  document.getElementById('logoutBtn').classList.remove('hidden');
  
  // Update navbar with user greeting (optional)
  // You can add more personalization here
}

// Show logged out state
function showLoggedOutState() {
  document.getElementById('authBtn').classList.remove('hidden');
  document.getElementById('logoutBtn').classList.add('hidden');
}

// Show error message
function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #e84c3d;
    color: white;
    padding: 14px 18px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(232, 76, 61, 0.3);
    animation: slideInRight 0.4s ease-out;
    z-index: 300;
    font-size: 12px;
    font-weight: 600;
  `;
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);
  
  setTimeout(() => {
    errorDiv.remove();
  }, 4000);
}

// Show success message
function showSuccess(message) {
  const successDiv = document.createElement('div');
  successDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #1DB954;
    color: white;
    padding: 14px 18px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(29, 185, 84, 0.3);
    animation: slideInRight 0.4s ease-out;
    z-index: 300;
    font-size: 12px;
    font-weight: 600;
  `;
  successDiv.textContent = message;
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.remove();
  }, 3000);
}

// Test data - you can create a test account with these credentials
console.log('%c🔐 DigitalToolsNepal Auth System Ready', 'color: #7853ff; font-weight: bold;');
console.log('%cTest Account: email: test@example.com | password: test123', 'color: #a26bff;');

// Optional: Create a test account on first load
document.addEventListener('DOMContentLoaded', function() {
  const users = JSON.parse(localStorage.getItem('digitaltoolsnepal_users') || '[]');
  if (users.length === 0) {
    // Create test account
    const testUsers = [
      {
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem('digitaltoolsnepal_users', JSON.stringify(testUsers));
  }
});
