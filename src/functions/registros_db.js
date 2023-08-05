
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
    const q = query(collection(DB,"Registros",id,"collection"),
    orderBy("year", "desc"), 
    orderBy("month","desc"),
    orderBy("day", "desc")
    );
    // const q = query(collection(DB,"Registros",id,"collection"));
    const querySnapshot = await getDocs(q);
    const response=[];
    console.log('paso por aqui prueba 2');
    console.log(querySnapshot.length);  
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.data())
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
export const ObtenerRegistrosCollectionToday=async(date=new Date(),id)=>{
  try {
    console.log(date);
    var hoy = ObtenerFechaHoy(date);
    console.log(hoy)
    const response=[];
    const q = query(collection(DB, "Registros",id,"collection"),where("fecha_codigo","==",hoy.toString()));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      response.push({id:doc.id,...doc.data()})
    });
    // verificar si el array esta vacio
    if(response.length>0){
      return response[0];
    }
    else{
      // const date = new Date();
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
      return {id:idRegistro,...evento};;
    }
  } catch (error) {
    console.log(error);
    return false
  }
}
//  Crear un nuevo registro en la colleccion
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
// obtener registro collection por id
export const ObtenerRegistrosCollectionId=async(id,idCollection)=>{
  try{
    const docRef=await doc(DB,"Registros",id,"collection",idCollection);
    const docSnap=await getDoc(docRef);
    if(docSnap.exists()){
      console.log('Document data: ',docSnap.data());
      return docSnap.data();
    }
  }catch(error){
    console.log(error);
    return false;
  }
}

// actualizar el registro del dia de hoy segun el id
export const EditarRegistrosCollection = async (idRegistro, idCollection, cantidad, fecha = new Date()) => {
  try {
    const docRef = doc(DB, 'Registros', idRegistro, 'collection', idCollection);
    const respuesta = await updateDoc(docRef, { cantidad });
    console.log('Document updated:', JSON.stringify(docRef));
    return docRef;
  } catch (error) {
    console.log(error);
  }
};

//obetener el registro  por fecha 
export const ObtenerRegistrosCollectionFecha=async(id,fecha)=>{
  try{
    const docRef=await doc(DB,"Registros",id,"collection",fecha);
    const docSnap=await getDoc(docRef);
    if(docSnap.exists()){
      console.log('Document data: ',docSnap.data());
      return docSnap.data();
    }
  }catch(error){
    console.log(error);
  }

}

// borrar registro de la colleccion
export const BorrarRegistrosCollectionIdCollection=async(id,idCollection)=>{
  try{
    const docRef=await doc(DB,"Registros",id,"collection",idCollection);
    await deleteDoc(docRef);
    console.log("Document deleted");
    return true;
  }catch(error){
    console.log(error);
    return false;
  }
}
// obtener la fecha del dia de hoy 
export const ObtenerFechaHoy=(date=new Date())=>{
  // const date = new Date();
  console.log(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const fecha = `${day}${month}${year}`;
  return fecha;
}

