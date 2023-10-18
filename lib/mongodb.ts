import { MongoClient, ServerApiVersion } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

let uri = process.env.MONGODB_URI  
if (uri===undefined)
 uri= "mongodb+srv://mdaug19cs:agQutquQBHx3BGeZ@cluster0.ogsom3d.mongodb.net/?retryWrites=true&w=majority"
//"mongodb://myuser:password@127.0.0.1:27017/?retryWrites=true&w=majority"
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}

let client
let clientPromise: Promise<MongoClient>
if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }
  
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
  //console.log("Helli",clientPromise)
  //throw new Error('Logging OK'+JSON.stringify(global._mongoClientPromise))
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
