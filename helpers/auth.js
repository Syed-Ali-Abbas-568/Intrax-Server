import bcrypt from 'bcrypt';

// This applies salting and hashing on the password before passing it to the database
const hashPassword = password => new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
        if (err) {
            reject(err);
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                reject(err);
            }
            resolve(hash);
        });
    });
});

const comparePassword = (password, hashed) => bcrypt.compare(password, hashed);



// Function to generate a random password
const generateRandomPassword = (length) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
}

export {
    hashPassword,
    comparePassword,
    generateRandomPassword
};
