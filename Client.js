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

const client = new EmojiService('localhost:8000', grpc.credentials.createInsecure());

client.GetAllEmoji({}, (error, emoji) => {
    console.log(error)
    console.log(emoji);
});