
import {DB} from '../auth/FirebaseContext'
import { collection, addDoc,doc,getDoc,query,where,getDocs } from "firebase/firestore";


export const CrearRegistros=async(evento)=>{
    try {
        const docRef = await addDoc(collection(DB, "Registros"),evento);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const ObtenerRegistroId=async(id)=>{
  try {
    
    const docRef=doc(DB,"Registros",id);
    const docSnap=await getDoc(docRef);
    const response=[];
    if(docSnap.exists()){
      console.log('Document data: ',docSnap.data());
      return docSnap.data();
    }else{
      console.log('No such document!')
      return null;
    }
       

  } catch (error) {
    console.log(error);
    return false;
  }
}

export const ObtenerRegistros=async()=>{
  try {
    const q = query(collection(DB, "Registros"));
    const querySnapshot = await getDocs(q);
    const response=[];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      response.push({id:doc.id,...doc.data()})
    });
    
    return response;
  } catch (error) {
    console.log(error);
    return []
  }
}
.
export const obtenerCollectionRegistros=async(id)=>{

  try {
    console.log(id);
      const q = query(collection(DB, "Registros",id,"collection"));
      const querySnapshot = await getDocs(q);
      var response=[];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        response.push({id:doc.id,...doc.data()})
      });
      
      return response;
  } catch (error) {
    console.log(error);
    return false;
    
  }
}

export const guardarRegistroCollection=async(id,evento)=>{

  try {
    const docRef = await addDoc(collection(DB, "Registros",id,"collection"),evento);
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) { 
    console.log(error);
    return false; 
  }


}