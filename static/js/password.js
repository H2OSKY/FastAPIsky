document.addEventListener("DOMContentLoaded", init);

function init() {
    const passwordBtn = document.getElementById('Password');
    hideBtn();
    passwordBtn.addEventListener("click", async function () {
        generatePassword();
    });
}

function hideBtn() {
    const createBtn = document.querySelector('#submitButton');
    createBtn.classList.add('btn-disabled');
}

function showBtn() {
    const createBtn = document.querySelector('#submitButton');
    createBtn.classList.remove('btn-disabled');
}

async function generatePassword() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeDigits = document.getElementById('includeDigits').checked;
    const includeSpecialChars = document.getElementById('includeSpecialChars').checked;
    const password = document.querySelector('#Passw');

    const formData = new FormData();
    formData.append('length', length);
    formData.append('include_uppercase', includeUppercase);
    formData.append('include_digits', includeDigits);
    formData.append('include_special_chars', includeSpecialChars);

    const response = await fetch('/generate-password', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        const result = await response.json();
        console.log('Respuesta del servidor:', result);
        Swal.fire({
            title: "Generate Password",
            text: `${result.password}`,
            icon: "success"
        }).then(() => {
            password.value = result.password;
            showBtn();
        });

    } else {
        console.error('Failed to generate password');
    }
}

