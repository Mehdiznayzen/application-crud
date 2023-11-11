import React from 'react'
import { FaEdit, FaTrash} from 'react-icons/fa'

function List({ items, removeItem, editingItem }) {
    return (
        <div className="grocery-list">
            {
                items.map((item) => {
                    const {id, title} = item
                    return (
                        <article key={id} className='flex items-center justify-between px-3 gap-3'>
                            <div className="item-container">
                                <p className='w-[100%]'>{title}</p>
                            </div>
                            <div className="btns-container flex gap-2">
                                <button onClick={() => editingItem(id)} className='text-green-500 text-lg cursor-pointer'>
                                    <FaEdit/>
                                </button>
                                <button onClick={() => removeItem(id)} className='text-red-600 cursor-pointer text-lg'>
                                    <FaTrash/>
                                </button>
                            </div>
                        </article>
                    )
                })
            }
        </div>
    )
}

export default List