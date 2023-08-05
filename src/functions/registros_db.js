
import {DB} from '../auth/FirebaseContext'
import { collection, addDoc,doc,getDoc,query,where,getDocs,updateDoc,orderBy,deleteDoc } from "firebase/firestore";


export const CrearRegistros=async(evento)=>{
    try {
        const docRef = await addDoc(collection(DB, "Registros"),evento);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
      } catch (e) {
        console.error("Error adding document: ", e);
        return null; 
      }
}

// Editar Registros 
export const EditarRegistros=async(id,evento)=>{
  try {
    // Actualizar el registro 
    const docRef = doc(DB, "Registros", id);
    const response=await updateDoc(docRef, evento);
    console.log("Document written with ID: ", response);
    return response;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
}

// Borrar Registro 
export const BorrarRegistros=async(id)=>{
  try {
    // Borrar el registro 
    const docRef = doc(DB, "Registros", id);
    const response=await deleteDoc(docRef);
    return response;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
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