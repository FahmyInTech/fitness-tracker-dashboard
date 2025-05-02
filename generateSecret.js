const crypto = require('crypto');

function generateSecureSecret() {
    // Generate a random 64-byte string (512 bits)
    const secret = crypto.randomBytes(64).toString('hex');
    
    // Add some special characters to increase complexity
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
    
    // Combine and ensure minimum length of 64 characters
    const finalSecret = secret + randomSpecialChar;
    
    console.log('\n=== Generated Secure JWT Secret ===');
    console.log(finalSecret);
    console.log('\nLength:', finalSecret.length);
    console.log('\nCopy this secret and paste it into your .env file as:');
    console.log('JWT_SECRET=' + finalSecret);
    console.log('\n===================================');
}

generateSecureSecret(); 