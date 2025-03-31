
import { collection, query, where, updateDoc, doc } from "firebase/firestore";



class Querying {
    async addData(collectionName = '', obj = {}) {
        try {
            await addData(collectionName, obj);
                return "Data added";
            } catch (e) {
                throw { message: e.message, type: "error" };
            }

        }

        async updateData(collectionName, idDoc, newDataObj) {
            const docRef = doc(db, collectionName, idDoc);
            await updateDoc(docRef, newDataObj);
        }

        async finBy (collectionName, clauses) {
            const collectionRef = collection(db, collectionName);
            let q = collectionRef;

            clauses.forEach(clause => {
                q = query(q, where(clause.finBy, clause.where, clause.clause));
            });
        }
    }


const QueryingClass = new Querying();
export default QueryingClass;


 