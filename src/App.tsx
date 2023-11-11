import React, { useState, useEffect } from 'react'
import Alert from './components/alert'
import List from './components/list'

// function for get the items for localStorage
const getItemsLocalStorage = () => {
  let list = localStorage.getItem('items')
  if(list){
    return JSON.parse(localStorage.getItem('items'))
  }else {
    return []
  }
}

function App() {

  const [name, setName] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [list, setList] = useState(getItemsLocalStorage)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState(
    {
      show:false, 
      msg:'', 
      background:''
    })

    // Function for show the alert
    const showAlert = (show=false, msg:'', background:'') => {
      setAlert({show, msg, background})
    }

  const handleForm = (e) => {
    e.preventDefault()

    if(!name){
      showAlert(true, 'Enter the value', 'bg-red-300')

    }else if(name && isEdit){
      // function for edit the item
      setList(list.map((item) => {
        if(item.id === editID){
          return {...item, title:name}
        }
        return item
      }))
      setIsEdit(false)
      setEditID(null)
      setName('')
      showAlert(true, 'The item is edit', 'bg-green-300')

    }else{
      // Show alert
      const newItem = {id:new Date().getTime().toString(), title:name}
      setList([...list, newItem])
      setName('')
      // setAlert({show:true, msg:'The item is added', background:'bg-green-300'})
      showAlert(true, 'The item is added', 'bg-green-300')
    }
  }

  // Function for add items to the local storage
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(list))
  }, [list])

  // Function for clear the list from object
  const clearList = () => {
    setList([])
    showAlert(true, 'The list is empty', 'bg-red-300')
  }

  // Function for remove item from the list
  const removeItem = (id) => {
    showAlert(true, 'The item is removed', 'bg-red-300')
    setList(list.filter((item) => item.id !== id))
  }

  // Function for editing an item 
  const editItem = (id) => {
    // Find the item we want to edit
    const specificItem = list.find((item) => item.id === id)
    // set edit to true
    setIsEdit(true)
    setEditID(id)
    setName(specificItem.title)
  }

  return (
    <section className='bg-blue-200 h-screen grid items-center justify-center'>
      <div className="container-grocery w-[100%] lg:w-[600px] bg-white p-2 grid gap-5 rounded-lg" style={{boxShadow:'1px 1px 10px blue'}}>
        <form onSubmit={handleForm} className='grid gap-3' action="">
          {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
          <h3 className='text-center text-2xl font-bold tracking-widest'>Grocery Bud</h3>
          <div className="form-control flex gap-1 justify-between">
            <input type="text" className='bg-blue-200 w-[100%] rounded-lg p-1' placeholder='ex......'  name="" id="" value={name} onChange={(e) => setName(e.target.value)}/>
            <button type='submit' className='submit-btn text-white w-[100px] rounded-xl cursor-pointer bg-blue-500'>
              {isEdit ? 'Edit' : 'Submit'}
            </button>
          </div>
        </form>
        {
          list.length > 0 && 
          <div className="grocery-info grid items-center">
            <List removeItem = {removeItem} editingItem={editItem} items={list} list={list}/>
            <button className='clear-btn grid items-center justify-center text-center text-red-600 font-bold tracking-widest cursor-pointer' onClick={clearList}>Clear items</button>
          </div>
        }
      </div>
    </section>
  )
}

export default App
