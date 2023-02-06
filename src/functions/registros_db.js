
import {DB} from '../auth/FirebaseContext'
import { collection, addDoc,doc,getDoc,query,where,getDocs,updateDoc } from "firebase/firestore";


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

export const ObtenerRegistroName=async()=>{
  try {
    
    const docRef=doc(DB,"Registros");
    const docSnap=await getDoc(docRef);
    const response=[];
    if(docSnap.exists()){
      console.log('Document data: ',docSnap.data());
    }else{
      console.log('No such document!')
    }
       

  } catch (error) {
    console.log(error);
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

// Obtener la colleccion de un Registro
export const ObtenerRegistrosCollection=async(id)=>{
  try {
    const q = query(collection(DB, "Registros",id,"collection"));
    const querySnapshot = await getDocs(q);
    const response=[];
    console.log('paso por aqui');
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

// obtener el registro por el id 

export const ObtenerRegistrosId=async(id)=>{
  try {
    const q = doc(DB, "Registros",id);
    const querySnapshot = await getDoc(q);
    if(querySnapshot.exists()){
      console.log('Document data: ',querySnapshot.data());
      return querySnapshot.data();
    }else{
      console.log('No such document!')
    }
  } catch (error) {
    console.log(error);
    return []
  }
}

// obteneer el registro del dia de hoy segun la colleccion
export const ObtenerRegistrosCollectionToday=async(id)=>{
  try {
    var hoy = ObtenerFecha();
    console.log("hoy "+ hoy);
    console.log(id)
    const response=[];
    const q = query(collection(DB, "Registros",id,"collection"),where("fecha_codigo","==",hoy));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      response.push({id:doc.id,...doc.data()})
    });
    console.log("paso por aqui today" + response);
    // verificar si el array esta vacio
    
    if(response.length>0){
      return response[0];
    }
    else{
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const fecha_codigo = `${day}${month}${year}`;
      const evento={
        cantidad:0,
        fecha:date,
        fecha_codigo:fecha_codigo,
        day:day,
        month:month,
        year:year
      }
      const idRegistro=await CrearRegistrosCollection(id,evento);
      console.log(idRegistro);
      return {id:idRegistro,...evento};
    }

  } catch (error) {
    console.log(error);
    return false
 
  }
}
// obtener el registro del dia de hoy segun el id
export const CrearRegistrosCollection=async(id,evento)=>{
  try {
      const docRef = await addDoc(collection(DB, "Registros",id,"collection"),evento);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      return null; 
    }
}

// actualizar el registro del dia de hoy segun el id
export const EditarRegistrosCollection=async(idRegistro,idCollection,cantidad)=>{
  try{
    const docRef=await doc(DB,"Registros",idRegistro,"collection",idCollection);
    await updateDoc(docRef,{
      cantidad:cantidad
    });

    console.log("Document updated");
    console.log(JSON.stringify(docRef));
    return docRef;

  }catch(error){
    console.log(error);
  }

}

// obtener la fecha del dia de hoy 
export const ObtenerFecha=()=>{
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const fecha = `${day}${month}${year}`;
  return fecha;
}