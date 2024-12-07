const net = require('net');
const readline = require('readline');

// Setup input/output interface for client input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Connect to the server
const client = net.createConnection({ host: '127.0.0.1', port: 12345 }, () => {
    console.log('Connected to server.');
    askUserInput();
});

// Function to prompt user for input
const askUserInput = () => {
    rl.question('You: ', (message) => {
        client.write(message);
        if (message.toLowerCase() === 'exit') {
            rl.close(); // Close the input stream
        }
    });
};

// Handle data from the server
client.on('data', (data) => {
    console.log('Server:', data.toString().trim());
    if (!rl.closed) {
        askUserInput(); // Ask for the next message if still connected
    }
});

// Handle connection close
client.on('end', () => {
    console.log('Disconnected from server.');
    rl.close();
});
