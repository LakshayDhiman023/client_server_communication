const net = require('net');
const readline = require('readline');

// Setup input/output interface for server input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create a server
const server = net.createServer((socket) => {
    console.log('Client connected.');

    // Send a message to the client
    const sendMessageToClient = () => {
        rl.question('', (message) => {
            socket.write(message);
            if (message.toLowerCase() === 'exit') {
                console.log('Closing connection with the client.');
                socket.end(); // Close the connection
            } else {
                sendMessageToClient(); // Continue sending messages
            }
        });
    };

    // Start the server input loop
    

    // Handle incoming data from the client
    socket.on('data', (data) => {
        console.log('Client:', data.toString().trim());
        sendMessageToClient()
    });

    

    // Handle client disconnection
    socket.on('end', () => {
        console.log('Client disconnected.');
    });

    // Handle socket errors
    socket.on('error', (err) => {
        console.error('Socket error:', err.message);
    });
});

// Start the server
server.listen(12345, () => {
    console.log('Server listening on port 12345...');
});
