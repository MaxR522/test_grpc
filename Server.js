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
    GetAllEmoji: (smt, callback) => {
        console.log(smt);
        callback(null, { emojis: data.data });
    },

    GetOneEmoji: (parameter, callback) => {
        callback(
            null,
            data.data.find((element) => element?.id === parameter?.request.id) ?? {
                id: 0,
                emoji: 'TSY MISY FA TENA VENDRANA',
            }
        );
    },
});

server.bindAsync('127.0.0.1:8000', grpc.ServerCredentials.createInsecure(), (error, port) => {
    console.log('Server running at http://127.0.0.1:8000');
    console.log(error);
    server.start();
});
