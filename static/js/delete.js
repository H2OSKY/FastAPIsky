document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const deleteItemBtn = document.getElementById('Delete');
    const updateItemBtn = document.getElementById('Update');
    async function deleteItem(itemId) {
        const id = itemId;
        const response = await fetch(`/delete/${id}`, {
            method: 'DELETE', // Specify the HTTP method
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Respuesta del servidor:', result);
            Swal.fire({
                title: "Alert!",
                text: "You ok?",
                icon: "warning"
            }).then(() => {
                // This code will run after the user clicks the "OK" button
                window.location.href = '/';
            });
        } else {
            console.error('Failed to delete item');
        }
    }

    deleteButtons.forEach(button => {
        button.addEventListener('click', async function () {
            deleteItemBtn.classList.remove('d-none')
            updateItemBtn.classList.add('d-none');
            const itemId = button.dataset.itemId;
            const response = await fetch(`/get_item/${itemId}`);  // Adjust the endpoint based on your backend
            const itemDetails = await response.json();

            // Update the modal content with the item details
            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="input-group mb-3">
                    <span class="input-group-text">Name:</span>
                    <input type="text" class="form-control" id="nameInput" value="${itemDetails.name}" readonly>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Email:</span>
                    <input type="text" class="form-control" id="emailInput" value="${itemDetails.email}" readonly>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text">Password:</span>
                    <input type="text" class="form-control" id="passwordInput" value="${itemDetails.password}" readonly>
                </div>
            `;

            // You might also want to update the modal title if needed
            const modalTitle = document.querySelector('.modal-title');
            modalTitle.textContent = 'Delete Item';

            // Open the modal
            const myModal = new bootstrap.Modal(document.getElementById('myModal'));
            myModal.show();

            deleteItemBtn.addEventListener('click', async function () {
                await deleteItem(itemId);
            });
        });
    });


});




    
