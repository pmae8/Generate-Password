const characters = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(",
    ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"
];

function generatePassword(length, includeSymbols, includeNumbers) {
    let charPool = characters.slice(0, 52); // Start with letters

    if (includeSymbols) charPool = charPool.concat(characters.slice(62, 94));
    if (includeNumbers) charPool = charPool.concat(characters.slice(52, 62));

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    return password;
}

document.getElementById('generate-btn').addEventListener('click', function() {
    const length = parseInt(document.getElementById('password-length').value);
    const includeSymbols = document.getElementById('include-symbols').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;

    const password1 = generatePassword(length, includeSymbols, includeNumbers);
    const password2 = generatePassword(length, includeSymbols, includeNumbers);

    const copyButton1 = document.getElementById('copy-btn1');
    const copyButton2 = document.getElementById('copy-btn2');

    copyButton1.textContent = password1;
    copyButton2.textContent = password2;
});

document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function() {
        const passwordText = button.textContent;

        navigator.clipboard.writeText(passwordText).then(() => {
            alert(`Password copied: ${passwordText}`);
        }).catch(err => {
            alert('Failed to copy: ' + err);
        });
    });
});

document.getElementById('reset-btn').addEventListener('click', function() {
    document.getElementById('copy-btn1').textContent = "Copy";
    document.getElementById('copy-btn2').textContent = "Copy";

    document.getElementById('password-length').value = 15;
    document.getElementById('include-symbols').checked = true;
    document.getElementById('include-numbers').checked = true;
});
