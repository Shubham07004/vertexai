

export const buildTree=(files)=>{
let map={}
let tree=[]
// // map ={
//    id:{
//     file,
//     children:[]
//    }
// }
files.forEach(file => {
    map[file._id.toString()]={
        ...file.toObject(),
        children:[]
    }   
});

files.forEach(file=>{
    const id=file._id.toString()
    if(file.parentId){
        let parent=map[file.parentId.toString()]
         if(parent){
            parent.children.push(map[id])
         }
    }else{
        tree.push(map[id])
    }
})
  
return tree

}


