const grpc = require('@grpc/grpc-js');
const PROTO_PATH = './MyProto.proto';
const protoLoader = require('@grpc/proto-loader');
const data = require('./data');

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const emojiProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(emojiProto.EmojiService.service, {
    /**
     * @param {*} call call contains metadata and properties related to the request, such as the request payload and the client's metadata.
     * @param {*} callback The callback functions are used to send the response back to the client, and they are passed two arguments: an error and the response message
     * @returns 
     */
    GetOneEmoji: (call, callback) => {
        const id = call.request.id;
        if (typeof id !== 'number' || id <= 0) {
            return callback(new Error('Invalid input, id should be an integer'), null);
        }
        callback(
            undefined,
            data.data.find((element) => element?.id === id) ?? {
                id: 0,
                emoji: 'TSY MISY FA TENA VENDRANA',
            }
        );
    },

    GetAllEmoji: (_, callback) => {
        callback(null, { emojis: data.data });
    },
});

server.bindAsync('127.0.0.1:8000', grpc.ServerCredentials.createInsecure(), (error, port) => {
    console.log('Server running at http://127.0.0.1:8000');
    console.log(error);
    server.start();
});
