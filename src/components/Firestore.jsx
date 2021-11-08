import React from "react";
import {db} from "../firebase"
import moment from "moment";
import 'moment/locale/es'

function Firestore(props) {

  const [tareas,setTareas] = React.useState([])
  const [tarea,setTarea] = React.useState('')
  const [modoEdicion,setModoEdicion] = React.useState(false)
  const [id , setId] = React.useState('')


  React.useEffect(() => {

    const obtenerDatos = async()=>{
      try {


    
        const data = await db.collection(props.user.uid).get();

        const arrayData = data.docs.map(doc=>({id: doc.id,...doc.data() }))

        
        setTareas(arrayData)


      } catch (error) {
        console.log(error)
      }
    }
    obtenerDatos()


  }, [props.user.uid])

    const agregar = async(e) =>{
      e.preventDefault()
      if(!tarea.trim()){
        console.log('esta vacio')
        return
      }
      try {


        const nuevaTarea = {
          name: tarea,
          fecha: Date.now()
        }
        const data = await db.collection(props.user.uid).add(nuevaTarea)
        setTareas([...tareas,{
          ...nuevaTarea,id:data.id
        }])
        setTarea('')

        
      } catch (error) {
        console.log(error)
      }
      
      
    }
    const eliminar = async(id)=>{

      try {
       
        await db.collection(props.user.uid).doc(id).delete()

        const arrayFiltrado = tareas.filter(item=>item.id !== id)
        setTareas(arrayFiltrado)

      } catch (error) {
        console.log(error)
      }
    }

    const activarEdicion = (item) =>{
      setModoEdicion(true)
      setTarea(item.name)
      setId(item.id)
    }
    const editar = async(e) =>{
      e.preventDefault()
      if(!tarea.trim()){
        console.log('esta vacio')
        return
      }
      try {
       
        await db.collection(props.user.uid).doc(id).update({
          name: tarea
        })
        const arrayEditado = tareas.map(item =>(
          item.id === id ? {id:item.id,fecha:item.fecha,name:tarea} : item
        ))
        setTareas(arrayEditado)
        setModoEdicion(false)
        setTarea('')
        setId('')

      } catch (error) {
        console.log(error)
      }
    }



  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
            <h3>Lista de tareas</h3>
          <ul className="list-group">
           
            {
              tareas.map(item=>(
                 
                <li className="list-group-item" key={item.id}>
                  {item.name} -{moment(item.fecha).format('lll')}
                  <button className="btn btn-danger btn-sm float-end" onClick={()=>eliminar(item.id)}>eliminar</button>
                  <button className="btn btn-warning btn-sm float-end mx-2" onClick={()=>activarEdicion(item)}>editar</button>
                </li>
                
              ))
            }
          </ul>
        </div>
        <div className="col-md-6">
          <h3>{
            modoEdicion ? 'editar tarea' : 'agregar tarea'
          }</h3>
          <form onSubmit={modoEdicion ? editar : agregar}>
            <input
              type="text"
              placeholder="ingrese tarea"
              className="form-control mb-2"
              onChange={(e)=>setTarea(e.target.value)}
              value={tarea}
              />
              <button className={
                modoEdicion ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block'
              } type="submit">
                {
                  modoEdicion ? 'Editar' : 'Agregar'
                }
              </button>
          </form>
        </div>
      </div>
    </div> 
  );
}

export default Firestore;
