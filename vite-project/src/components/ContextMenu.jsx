import React from 'react'

 function ContextMenu({X,Y ,setX,setY ,setExpenses ,Expenses,rowid ,setForm ,editing , setediting}) {
  if(X==0 && Y==0) return;
  const handleDelete = (e)=>{
    setX(0); setY(0);
    setExpenses((prevstate) => {
      return prevstate.filter((item)=>item.id!==rowid)
    })
    
  }
  const handleEdit = (e)=>{
    setX(0); setY(0);
    const {title , category , amount} = Expenses.filter((item)=>item.id==rowid)[0];
    setForm({title:title , category:category , amount :amount});
    setediting(1);
  }
 
  return (
    <div className="context-menu" style={{left:X+4,top:Y+4}}>
            <div onClick = {handleEdit}>Edit</div>
            <div onClick={handleDelete}>Delete</div>
    </div>
  )
}

export default ContextMenu;
