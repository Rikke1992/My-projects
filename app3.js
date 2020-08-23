let list = document.querySelector('.list');
let inputText = document.getElementById('inputText');
let inputDate = document.getElementById('inputDate');
let buttonInput = document.getElementById('buttonInpput');
let buttonDelete = document.getElementById('delete');
let buttonEdit = document.querySelectorAll('#buttonEdit');
let toDoList = [];


if(localStorage.getItem('todo')){
    toDoList=JSON.parse(localStorage.getItem('todo'))
    printIntoLocalStor()
   
    
}



buttonInput.addEventListener('click', ()=>{
    
    
    if(!inputText.value || !inputDate.value){ alert ('Введите Данные в строку')}else{

    let newToDoList ={
        todo: inputText.value,
        date: inputDate.value,
        id: getId(),
        checked: false
    };

    let checkedCopy = toDoList.some((element)=>{ return  element.todo.toLowerCase()== newToDoList.todo.toLowerCase() });
    

    if(checkedCopy){

        alert('Введено повторно событие')

    }else{

    toDoList.push(newToDoList)
    localStorage.setItem('todo', JSON.stringify(toDoList));
    console.log(toDoList)
    let lastEl = toDoList[toDoList.length-1];
        list.insertAdjacentHTML('beforeend',`<div class="task ${lastEl.id}" id="${lastEl.id}">
        <input type="checkbox" ${lastEl.checked} ? 'checked': ''}>
        <span id='toDoText${lastEl.id}'>${lastEl.todo}</span>
        <span id='toDoDate${lastEl.id}'>${lastEl.date}</span>
        <button id="buttonDelete${lastEl.id}" >удаление</button>
        <button id='buttonEdit${lastEl.id}'>редактирование</button>
     </div>`)
    

    }
}

});


buttonDelete.addEventListener('click', ()=>{
    deleteTask()
})

// delete task after clicking of the delete buttom
list.addEventListener('click', (event)=>{
    
    
    let result ;
    let getId = event.target.parentNode.getAttribute('id');
    let eventTarg = document.getElementById(getId);

    if ( event.target.getAttribute('id') ==`buttonDelete${getId}`){
        result = toDoList.filter((item)=>{
         return item.id != getId  
            
        })
        
        console.log (result)
        toDoList = result
        localStorage.setItem('todo', JSON.stringify(toDoList));
        eventTarg.remove()
    }
    
    


})

//edit task after clicking of the edit buttom
list.addEventListener ('click', ()=>{
    
    let getId = event.target.parentNode.getAttribute('id');
    let blockEdit = document.getElementById('edit');
    let editOk = document.getElementById('editOk');
    let editInput = document.getElementById('editInput');
    let editDate = document.getElementById('editDate');
    
       if ( event.target.getAttribute('id') ==`buttonEdit${getId}`){
        blockEdit.hidden = false;
        
        editOk.addEventListener('click', ()=>{
            console.log(editOk)
            if (editOk){
                
                if(!editInput.value || !editDate.value){ alert ('Введите Данные в строку')
            }else{
                 
                    let checkedCopy = toDoList.some((element)=>{ return  element.todo.toLowerCase()== editInput.value.toLowerCase() });
                    console.log(checkedCopy)
                
                    if(checkedCopy){
                
                        alert('Введено повторно событие')
                
                    }else{
                        
                       let newTodoEdit = toDoList.map((item)=>{
                        
                        if (item.id == getId) {
                            item.todo = editInput.value,
                            item.date = editDate.value
                          return item
                        } else {
                            return item
                        }

                            
                        });
                        toDoList = newTodoEdit,
                        localStorage.setItem('todo', JSON.stringify(toDoList));
                        document.getElementById(`toDoDate${getId}`).textContent = editDate.value 
                        document.getElementById(`toDoText${getId}`).textContent = editInput.value
                    
                
                    }
                }
                
                        

            }
        })
        editCancel.addEventListener('click', ()=>{
            blockEdit.hidden = true;

        })
        
       }

    })
   

list.addEventListener('change', (event)=>{

    let eventTarg = event.target.parentNode.getAttribute('id');
    
    

    toDoList.forEach((item)=>{
        if (item.id === eventTarg){ 
            item.checked = !item.checked
            editchecbox(item)
            
        }else{
            item.checked = item.checked  
            editchecbox(item)
        }
        localStorage.setItem('todo', JSON.stringify(toDoList));

        

    })
   

})

function editchecbox(item){
   if(item.checked){
    document.getElementById(`toDoText${item.id}`).classList.add('lineThrough')
   }else{
    document.getElementById(`toDoText${item.id}`).classList.remove('lineThrough')  
   }


}


function getId(){

    let simv = 'qwertyuiopasdfghjklzxcvbnm1234567890';
    let randomize = function (){return Math.floor(Math.random()*36)};
    let id='';
    for (let i=0; i<simv.length;i++){
        id += simv[randomize()]
    }
    return id
}


 function printIntoLocalStor (){


    let postList='';
    
    toDoList.forEach((item)=>{
        if (item.checked == true){
            postList+=  `<div class="task ${item.id}" id="${item.id}">
            <input type="checkbox" ${item.checked ? 'checked': ''}>
            <span id='toDoText${item.id}' class='lineThrough'>${item.todo}</span>
            <span id='toDoDate${item.id}'>${item.date}</span>
            <button id="buttonDelete${item.id}" >удаление</button>
            <button id='buttonEdit${item.id}'>редактирование</button>
         </div>`   
        }else{
        postList+=  `<div class="task ${item.id}" id="${item.id}">
   <input type="checkbox" ${item.checked ? 'checked': ''}>
   <span id='toDoText${item.id}'>${item.todo}</span>
   <span id='toDoDate${item.id}'>${item.date}</span>
   <button id="buttonDelete${item.id}" >удаление</button>
   <button id='buttonEdit${item.id}'>редактирование</button>
</div>`}
})

 list.innerHTML = postList
    
    
    }
    
    

function deleteTask(){

    let result=[];
    let delTask = toDoList.map((item)=>{

    item.checked == false ?  result.push(item) : document.getElementById(item.id).remove();
         
    });
    toDoList = result
    localStorage.setItem('todo', JSON.stringify(toDoList));
   

}


