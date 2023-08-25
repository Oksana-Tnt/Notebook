function markupForm(name = "", content = "") {
    return `    
    <form class="form" id="form">
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <button type="button" class="btn-close" aria-label="Close" id="btnClose"></button>
    </div>    
    <div class="mb-3">
    <label for="formGroupExampleInput" class="form-label">Name</label>
    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Input name of note" name="name" value="${name}">
    </div>
    <div class="mb-3">
    <label for="formGroupExampleInput2" class="form-label">Created</label>
    <input type="text" class="form-control js-flatpicker" id="formGroupExampleInput2" placeholder="Choose data of created" name="created">
    </div>
    <div class="mb-3">
    <label for="formGroupExampleInput" class="form-label">Category</label>
    <select class="form-select" aria-label="Default select example" name="category" id="select"> 
    <option selected>Choose category</option>   
    <option value="Task">Task</option>
    <option value="Randon">Random Thought</option>
    <option value="Idea">Idea</option>
    </select>
    </div>
    <div class="mb-3">
    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" name="content">${content}</textarea>
    <label for="floatingTextarea">Content</label>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
     <button class="btn btn-secondary me-md-2 js-btn" type="submit" id="btnAdd">Add note</button  
    </div>
    </form>
 `
}

function markupNote({id, name, created, category, content}) {
    return `
    <tr class="item" data-id="${id}">    
    <td><span class = "name">${name}</span></td>
    <td><span class = "created">${created}</span></td>
    <td><span class = "category">${category}</span></td>
    <td><span class = "content">${content}</span></td>    
    <td>
      <button type="button" class="btn-edit"> </button>  
    </td> 
    <td>
      <button type="button" class="btn-delete"> </button>  
    </td> 
  </tr>  
  `
};


function markupNotes(arr=[]){
  return arr.map(({id, name, created, category, content}) => `
    <tr class="item" data-id="${id}">    
    <td><span class = "name">${name}</span></td>
    <td><span class = "created">${created}</span></td>
    <td><span class = "category">${category}</span></td>
    <td><span class = "content">${content}</span></td>     
    <td>
      <button type="button" class="btn-edit"> </button>  
    </td> 
    <td>
      <button type="button" class="btn-delete"> </button>  
    </td>
  </tr>  
  `).join('')
};
export{markupForm, markupNote, markupNotes}


