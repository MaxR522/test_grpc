const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './MyProto.proto';

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const EmojiService = grpc.loadPackageDefinition(packageDefinition).EmojiService;

const client = new EmojiService('127.0.0.1:8000', grpc.credentials.createInsecure());

client.GetOneEmoji({id: 2}, (error, emoji) => {
    console.log(error)
    console.log(emoji)
})

client.GetAllEmoji({}, (error, emoji) => {
    console.log(error)
    console.log(emoji)
})
