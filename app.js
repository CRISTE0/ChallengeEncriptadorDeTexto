document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const outputText = document.getElementById('output-text');
    const outputContainer = document.getElementById('output-container');
    const copyBtn = document.getElementById('copy-btn');


    const encryptionRules = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    function removeTildes(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    inputText.addEventListener('input', function(e) {
        let filteredText = removeTildes(e.target.value.toLowerCase());
        filteredText = filteredText.replace(/[^a-z\s]/g, '');
        e.target.value = filteredText;
    });

    function encrypt(text) {
        return text.replace(/[aeiou]/g, letter => encryptionRules[letter]);
    }

    function decrypt(text) {
        let decrypted = text;
        for (let [key, value] of Object.entries(encryptionRules)) {
            decrypted = decrypted.replace(new RegExp(value, 'g'), key);
        }
        return decrypted;
    }

    function updateOutput(text) {
        if (text) {
            outputText.textContent = text;
            outputContainer.style.display = 'none';
            outputText.style.display = 'block';
            copyBtn.style.display = 'block';
        } else {
            outputText.textContent = '';
            outputContainer.style.display = 'flex';
            outputText.style.display = 'none';
            copyBtn.style.display = 'none';
        }
    }

    encryptBtn.addEventListener('click', () => {
        const text = inputText.value;
        if (text) {
            const encryptedText = encrypt(text);
            updateOutput(encryptedText);
        }
    });

    decryptBtn.addEventListener('click', () => {
        const text = inputText.value;
        if (text) {
            const decryptedText = decrypt(text);
            updateOutput(decryptedText);
        }
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(outputText.textContent).then(() => {
            // Cambiar el texto del botón temporalmente para dar feedback
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '¡Copiado!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
    });

});