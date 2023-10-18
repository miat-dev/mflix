import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    const client = await clientPromise;
    console.warn(client)
   try {
       const db = client.db("sample_mflix");

       const movies = await db
           .collection("movies")
           .find({})
           .sort({ metacritic: -1 })
           .limit(5)
           .toArray();

       res.json(movies);
   } 
   catch (e) {
       console.error(e);
       res.json('Error')
   }
};