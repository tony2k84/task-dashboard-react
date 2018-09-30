export const validationNewTask = (type, group, description, nextRun, owner) => {
    if(!type){
        return "Type is Mandatory."
    }
    if(!group){
        return "Group is Mandatory."
    }
    if(!description){
        return "Description is Mandatory."
    }
    if(!nextRun){
        return "NextRun is Mandatory."
    }
    if(!owner){
        return "Owner is Mandatory."
    }
}

export const validationCompleteTask = (lastRun) => {
    if(!lastRun){
        return "Completion Date is Mandatory."
    }
}