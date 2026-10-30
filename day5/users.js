// We'll store the fetched users here so we can filter them later
let usersData = []; 

async function loadUsers() {
    const loadButton = document.getElementById('load-users');
    const statusText = document.getElementById('status');
    
    // Disable the button and update status while fetching
    loadButton.disabled = true;
    statusText.textContent = "Loading...";

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Always check if the HTTP response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        usersData = await response.json();
        statusText.textContent = "Success!";
        
        // We will write this function in the next step
        renderUsers(usersData); 
        
    } catch (error) {
        statusText.textContent = "Error loading users.";
        console.error("Fetch error:", error);
    } finally {
        // Re-enable the button regardless of success or failure
        loadButton.disabled = false;
    }
}

// Attach the loadUsers function to the button click
document.getElementById('load-users').addEventListener('click', loadUsers);

function renderUsers(list) {
    const usersList = document.getElementById('users-list');
    const statusText = document.getElementById('status');
    
    // Clear out any existing users before rendering new ones
    usersList.innerHTML = '';

    // If the list is empty (useful for our next filtering step), show a message
    if (list.length === 0) {
        statusText.textContent = "No users match your filter.";
        return;
    }

    // Loop through the array of users
    list.forEach(user => {
        // Create a new list item for each user
        const li = document.createElement('li');
        
        // Set the text to include the name, email, city, and company name
        li.textContent = `${user.name} | ${user.email} | ${user.address.city} | ${user.company.name}`;
        
        // Add the list item to the page
        usersList.appendChild(li);
    });
}

// Listen for typing in the filter input box
document.getElementById('filter-input').addEventListener('input', (event) => {
    // Get the typed text and make it lowercase for case-insensitive comparison
    const searchTerm = event.target.value.toLowerCase();
    
    // Filter the stored usersData array
    const filteredUsers = usersData.filter(user => {
        return user.name.toLowerCase().includes(searchTerm);
    });
    
    // Update the UI with the filtered list
    renderUsers(filteredUsers);
});