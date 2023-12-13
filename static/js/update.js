document.addEventListener('DOMContentLoaded', function () {
    const updateButtons = document.querySelectorAll('.update-btn');
    const deleteItemBtn = document.getElementById('Delete');
    const updateItemBtn = document.getElementById('Update');
    
    async function updateItem(itemId) {
        const id = itemId;
        const name = document.getElementById('nameInput').value;
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;
        
        const response = await fetch(`/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Respuesta del servidor:', result);
            Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success"
            }).then(() => {
                // This code will run after the user clicks the "OK" button
                window.location.href = '/';
            });
        } else {
            console.error('Failed to update item');
        }
    }

    updateButtons.forEach(button => {
        button.addEventListener('click', async function () {
            updateItemBtn.classList.remove('d-none');
            deleteItemBtn.classList.add('d-none');
            const itemId = button.dataset.itemId;
            const response = await fetch(`/get_item/${itemId}`);  // Adjust the endpoint based on your backend
            const itemDetails = await response.json();
            console.log(itemDetails)
            // Update the modal content with the item details
            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="input-group mb-3">
                    <span class="input-group-text">Name:</span>
                    <input type="text" class="form-control" id="nameInput" value="${itemDetails.name}">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Email:</span>
                    <input type="text" class="form-control" id="emailInput" value="${itemDetails.email}">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Password:</span>
                    <input type="text" class="form-control" id="passwordInput" value="${itemDetails.password}">
                </div>
            `;

            // You might also want to update the modal title if needed
            const modalTitle = document.querySelector('.modal-title');
            modalTitle.textContent = 'Update Item';

            // Open the modal
            const myModal = new bootstrap.Modal(document.getElementById('myModal'));
            myModal.show();

            updateItemBtn.addEventListener('click', async function () {
                await updateItem(itemId);
            });
        });
    });


});
