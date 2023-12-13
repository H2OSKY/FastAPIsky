document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.querySelector('#submitButton');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        const name = document.querySelector('#Name').value;
        const email = document.querySelector('#Email').value;
        const password = document.querySelector('#Passw').value;
        apiSubmitForm(name, email, password);
    });

});

async function apiSubmitForm(name, email, password) {
    const url = 'add/';
    const body = {
        name: name,
        email: email,
        password: password
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        console.log(response);
        if (response.ok) {
            // The response status is in the successful range (200-299)
            const result = await response.json();
            console.log('Respuesta del servidor:', result);
            Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success"
            }).then(() => {
                window.location.href = '/';
            });
        } else {

            if (response.status == 422) {
                Swal.fire({
                    title: "Alert",
                    text: "La longitud no es adecuada, debe tener más de un carácter y menos de 30",
                    icon: "warning"
                }).then(() => {
                    window.location.href = '/';
                });
            }
            // The response status is not in the successful range
            console.error('Error en la respuesta del servidor:', response.status);
            // You can handle the error accordingly, e.g., display an error message
        }

    } catch (error) {
        console.log(error);
    }
}


